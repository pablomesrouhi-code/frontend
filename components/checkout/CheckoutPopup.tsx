'use client'
import Link from 'next/link'
import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCartStore } from '@/stores/cart-store'
import { getPublicApiBase } from '@/lib/api'
import { getBestUpsell } from '@/lib/products'
import UpsellModal from './UpsellModal'

const TEST_PHONES = ['055000000']

const schema = z.object({
  name: z.string().min(2, 'الاسم يجب أن يكون حرفين على الأقل'),
  phone: z.string().refine(
    (v) => TEST_PHONES.includes(v) || /^05\d{8}$/.test(v),
    'يرجى إدخال رقم جوال سعودي صحيح (مثال: 05XXXXXXXX)'
  ),
})

type FormValues = z.infer<typeof schema>

type Props = { onClose: () => void }

export default function CheckoutPopup({ onClose }: Props) {
  const { items, total, clearCart } = useCartStore()
  const [showUpsell, setShowUpsell] = useState(false)
  const [formData, setFormData] = useState<FormValues | null>(null)
  const [placingOrder, setPlacingOrder] = useState(false)
  const [checkoutError, setCheckoutError] = useState<string | null>(null)

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(schema),
  })

  const upsell = getBestUpsell(items.map((i) => i.productId))

  const finalizeOrder = useCallback(
    async (data: FormValues, upsellAccepted: boolean) => {
      setCheckoutError(null)
      const base = getPublicApiBase()
      setPlacingOrder(true)
      try {
        const upsellAcceptedOk = upsellAccepted && !!upsell
        const payload = {
          customer_name: data.name,
          phone: data.phone,
          items: items.map((i) => ({
            product_id: i.productId,
            offer_qty: i.offerQty,
          })),
          accepted_upsell: upsellAcceptedOk,
          upsell_product_id:
            upsellAcceptedOk && upsell ? upsell.id : undefined,
          payment_method: 'cash_on_delivery' as const,
          source_page:
            typeof window !== 'undefined' ? window.location.href : undefined,
        }
        const fetchOpts: RequestInit = {
          method: 'POST',
          mode: 'cors',
          cache: 'no-store',
          credentials: 'omit',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }
        let res: Response
        try {
          res = await fetch(`${base}/api/orders`, fetchOpts)
        } catch (e1) {
          if (e1 instanceof TypeError) {
            await new Promise((r) => setTimeout(r, 900))
            res = await fetch(`${base}/api/orders`, fetchOpts)
          } else {
            throw e1
          }
        }

      let parsed: Record<string, unknown> = {}
      try {
        parsed = (await res.json()) as Record<string, unknown>
      } catch {
        /* empty or non-JSON */
      }

      function formatFastApiDetail(body: Record<string, unknown>): string | null {
        const d = body.detail
        if (typeof d === 'string') return d
        if (Array.isArray(d)) {
          const msgs = d
            .map((item) =>
              typeof item === 'object' &&
              item !== null &&
              'msg' in item &&
              typeof (item as { msg: unknown }).msg === 'string'
                ? (item as { msg: string }).msg
                : null
            )
            .filter(Boolean) as string[]
          if (msgs.length > 0) return msgs.join('، ')
        }
        return null
      }

      if (!res.ok) {
        const msg =
          formatFastApiDetail(parsed) ||
          `تعذّر إرسال الطلب (${res.status}). جرّبوا بعد قليل أو تواصلوا مع الدعم.`
        const hint403 =
          res.status === 403
            ? ' إن كنت تختبرين من خارج السعودية أو مع VPN، جرّبي الرقم 055000000 أو اطلبي من الإدارة تعطيل MaxMind مؤقتاً (MAXMIND_ENABLED=false).'
            : ''
        const hint502 =
          res.status === 502 || res.status === 504
            ? ' الخادم غير متاح مؤقتاً (غالباً الصفحة https://api…/health لا تستجيب — راجع EasyPanel والاتصال بقاعدة البيانات).'
            : ''
        const hint503 =
          res.status === 503
            ? ' غالباً قاعدة البيانات أو الاتصال DATABASE_URL — راجع سجلات الـ API.'
            : ''
        setCheckoutError(msg + hint403 + hint502 + hint503)
        setPlacingOrder(false)
        return
      }

      const orderNumber =
        typeof parsed.order_number === 'string' ? parsed.order_number : undefined
      const orderId =
        typeof parsed.order_id === 'string' ? parsed.order_id : undefined

      const finalTotalResolved =
        typeof parsed.total_sar === 'number'
          ? parsed.total_sar
          : total() + (upsellAcceptedOk ? 99 : 0)

      const orderSummary = {
        name: data.name,
        phone: data.phone,
        items: [...items],
        total: total(),
        upsellAccepted: upsellAcceptedOk,
        upsellProduct: upsellAcceptedOk && upsell ? upsell : null,
        upsellPrice: upsellAcceptedOk ? 99 : 0,
        finalTotal: finalTotalResolved,
        createdAt: new Date().toISOString(),
        orderNumber,
        orderId,
      }
      sessionStorage.setItem('nabtalabo_order', JSON.stringify(orderSummary))
      clearCart()
      onClose()
      window.location.href = '/thank-you'
    } catch (err) {
      if (typeof window !== 'undefined') {
        // Helps DevTools diagnostics (no secrets in payload).
        // eslint-disable-next-line no-console
        console.error('[nabtalabo checkout] POST /api/orders network error', base, err)
      }
      const liveStoreHost = (() => {
        if (typeof window === 'undefined') return false
        const hn = window.location.hostname.toLowerCase()
        return hn === 'nabtalabo.store' || hn === 'www.nabtalabo.store'
      })()
      const net =
        err instanceof TypeError
          ? liveStoreHost
            ? ' تعذّر الوصول إلى واجهة الطلبات. تأكّدوا من أن إصدار الموقع بُني بـ NEXT_PUBLIC_API_URL=https://api.nabtalabo.store وأن https://api.nabtalabo.store/health يعمل من المتصفّح؛ إذا كان الـ API متوقّفًا (مهاجرة DB مثلاً) لن يُقبل أي طلب.'
            : ' تعذّر الاتصال بالـ API (عنوان خاطئ، حاجز شبكة، أو السيرفر غير نشط؛ أحياناً VPN من خارج المملكة مع MaxMind على السيرفر).'
          : ''
      setCheckoutError(
        `تعذّر الاتصال بالخادم.${net} تأكّدوا من الإنترنت أو جرّبوا بعد قليل.`
      )
      setPlacingOrder(false)
    }
  },
    [items, total, upsell, clearCart, onClose]
  )

  const onUpsellAccept = useCallback(() => {
    if (!formData) return
    void finalizeOrder(formData, true)
  }, [formData, finalizeOrder])

  const onUpsellSkip = useCallback(() => {
    if (!formData) return
    void finalizeOrder(formData, false)
  }, [formData, finalizeOrder])

  function onSubmit(data: FormValues) {
    setFormData(data)
    if (upsell) {
      setShowUpsell(true)
    } else {
      void finalizeOrder(data, false)
    }
  }

  if (showUpsell && upsell && formData) {
    return (
      <UpsellModal
        product={upsell}
        placingOrder={placingOrder}
        checkoutError={checkoutError}
        onAccept={onUpsellAccept}
        onSkip={onUpsellSkip}
      />
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm px-4 pt-4 pb-[max(12px,env(safe-area-inset-bottom))] sm:p-4 sm:pb-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="checkout-modal-title"
        className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col min-h-0 max-h-[min(92vh,92dvh)] sm:max-h-[min(88vh,720px)]"
      >
        {/* Header */}
        <div className="bg-[#b8485c] px-6 py-5 text-white shrink-0">
          <div className="flex justify-between items-start gap-3">
            <div className="min-w-0">
              <h2 id="checkout-modal-title" className="text-xl font-bold">
                خطوة أخيرة لتأكيد طلبك
              </h2>
              <p className="text-sm text-white/80 mt-1">أدخلي اسمك ورقم جوالك فقط</p>
            </div>
            <button type="button" onClick={onClose} className="text-white/70 hover:text-white transition p-1 shrink-0 rounded-lg min-h-[44px] min-w-[44px] flex items-center justify-center" aria-label="إغلاق">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="px-6 py-5 flex flex-col gap-5 flex-1 min-h-0 overflow-y-auto overscroll-y-contain touch-pan-y pb-6 sm:pb-5">
          {checkoutError && (
            <div className="rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm px-4 py-3">
              {checkoutError}
            </div>
          )}
          {/* Order Summary */}
          <div className="bg-[#FFFFFF] rounded-xl p-4">
            <p className="text-sm font-bold text-[#1C1C1C] mb-3">ملخص طلبك:</p>
            {items.map((item) => (
              <div
                key={item.productId}
                className="flex justify-between items-start gap-3 py-1.5 border-b border-gray-200 last:border-0"
              >
                <span className="text-sm text-[#1C1C1C] min-w-0 flex-1 text-right leading-snug break-words">
                  {item.nameAr} — {item.offerQty === 1 ? 'قطعة' : item.offerQty === 2 ? 'قطعتين' : '3 قطع'}
                </span>
                <span className="font-bold text-[#b8485c] text-sm shrink-0 tabular-nums">{item.price} ريال</span>
              </div>
            ))}
            <div className="flex justify-between items-center mt-2 pt-2">
              <span className="font-bold text-[#1C1C1C]">المجموع</span>
              <span className="font-bold text-[#b8485c] text-lg">{total()} ريال</span>
            </div>
          </div>

          {/* Social Proof */}
          <div className="flex items-center gap-2 bg-[#f1e6e4] rounded-xl px-4 py-3">
            <span className="text-xl">⭐</span>
            <p className="text-sm text-[#b8485c] font-medium">
              عملاء كثير اختاروا نبتة لابو لأنها سهلة وتدخل في الروتين بدون تعقيد
            </p>
          </div>

          {/* Scarcity */}
          <div className="flex items-center gap-2 text-sm text-amber-700 bg-amber-50 px-4 py-2 rounded-xl border border-amber-200">
            <span>⏰</span>
            <span>الكميات المتاحة محدودة حسب توفر المخزون</span>
          </div>

          {/* COD — single payment path (no cards) */}
          <div className="rounded-2xl border-2 border-[#c5ddd0] bg-gradient-to-br from-[#f3faf5] to-white px-4 py-3.5 text-right shadow-[0_2px_12px_rgba(22,101,52,0.06)]">
            <p className="text-[11px] font-bold text-[#166534] tracking-wide">طريقة الدفع لهذا الطلب</p>
            <p className="text-base font-bold text-[#1C1C1C] mt-1">نقدًا عند الاستلام فقط</p>
            <p className="text-xs text-[#5c5656] mt-1.5 leading-relaxed">
              بدون بطاقة ولا تحويل مسبق — تدفعين النقد عند توصيل الطلب. فريقنا يتصل عليك لتأكيد العنوان والمجموع.
            </p>
            <Link
              href="/cod-policy"
              className="inline-block mt-2 text-xs font-semibold text-[#b8485c] underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#b8485c]/40 rounded-sm"
            >
              سياسة الدفع عند الاستلام
            </Link>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-semibold text-[#1C1C1C] mb-1.5">الاسم</label>
              <input
                {...register('name')}
                placeholder="اسمك الكريم"
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-right focus:outline-none focus:border-[#b8485c] transition bg-white text-[#1C1C1C]"
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#1C1C1C] mb-1.5">رقم الجوال</label>
              <input
                {...register('phone')}
                placeholder="05XXXXXXXX"
                dir="ltr"
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-left focus:outline-none focus:border-[#b8485c] transition bg-white text-[#1C1C1C]"
              />
              <p className="text-xs text-[#5c5656] mt-1">مثال: 05XXXXXXXX</p>
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting || placingOrder}
              className="w-full bg-[#b8485c] text-white font-bold py-4 rounded-full text-lg hover:bg-[#943c50] transition-colors disabled:opacity-60"
            >
              {placingOrder ? 'جاري الإرسال...' : 'تأكيد الطلب'}
            </button>
          </form>

          <p className="text-center text-xs text-[#5c5656] leading-relaxed">
            بعد التأكيد: اتصال من الفريق + جدولة التوصيل — الدفع نقدًا عند الاستلام
          </p>
        </div>
      </div>
    </div>
  )
}
