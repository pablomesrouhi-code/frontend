'use client'
import Link from 'next/link'
import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCartStore } from '@/stores/cart-store'
import { getPublicApiBase } from '@/lib/api'
import { getBestUpsell, formatSarAmount, getUpsellPriceSar } from '@/lib/products'
import { CHECKOUT_UI_REV } from '@/lib/checkout-rev'
import UpsellModal from './UpsellModal'
import { newTrackingEventId, setTrackingUser } from '@/lib/tracking/client'

const TEST_PHONES = ['055000000']

async function captureFailedCheckout(
  base: string,
  data: FormValues,
  cartItems: { productId: string; offerQty: 1 | 2 | 3 }[],
  failureStatus: number | null,
  failureDetail: string | null,
) {
  const payload = JSON.stringify({
    customer_name: data.name,
    phone: data.phone,
    items: cartItems.map((i) => ({
      product_id: i.productId,
      offer_qty: i.offerQty,
    })),
    failure_status: failureStatus ?? undefined,
    failure_detail: failureDetail?.slice(0, 400) ?? undefined,
    source_page: typeof window !== 'undefined' ? window.location.href : undefined,
  })
  const url = `${base.replace(/\/$/, '')}/api/leads/checkout-capture`
  for (let i = 0; i < 2; i++) {
    try {
      const res = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-store',
        credentials: 'omit',
        headers: { 'Content-Type': 'application/json' },
        body: payload,
      })
      if (res.ok) return
    } catch {
      /* retry once */
    }
    await new Promise((r) => setTimeout(r, 600))
  }
}

/** Canonical `05xxxxxxxx` for API payload (matches backend `normalize_sa_phone` intent). */
function canonicalSaCheckoutPhone(raw: string): string {
  const t = raw.trim()
  if (TEST_PHONES.includes(t)) return t
  const d = t.replace(/\D/g, '')
  if (d.length === 10 && d.startsWith('05')) return d
  if (d.length === 9 && d.startsWith('5')) return `0${d}`
  // e.g. 96650475233 (+966…) → 050475233
  if (d.startsWith('966') && d.length >= 12 && d[3] === '5') return `0${d.slice(-9)}`
  return t
}

const schema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'الاسم يجب أن يكون حرفين على الأقل')
    .refine((v) => /[\u0600-\u06FFa-zA-Z]/.test(v), 'يرجى إدخال اسمك الحقيقي')
    .refine((v) => !/^[\d\s\-+().]+$/.test(v), 'الاسم لا يمكن أن يكون أرقاماً فقط')
    .refine((v) => {
      const c = v.replace(/\s/g, '')
      return c.length >= 2 && !/^(.)\1{2,}$/.test(c)
    }, 'يرجى إدخال اسم صحيح'),
  phone: z
    .string()
    .transform(canonicalSaCheckoutPhone)
    .refine(
      (v) => TEST_PHONES.includes(v) || /^05(?:0|[3-9])\d{7}$/.test(v),
      'يرجى إدخال جوال سعودي صحيح (05XXXXXXXX)'
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
      const purchaseEventId = newTrackingEventId()
      const leadEventId = newTrackingEventId()
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
          purchase_event_id: purchaseEventId,
          client_event_id: leadEventId,
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
            ? ' إن كنتِ تختبرين من خارج السعودية، استخدمي الرقم 055000000 أو اطلبي من الإدارة تفعيل MAXMIND_RELAXED=true مؤقتاً.'
            : ''
        const hint502 =
          res.status === 502 || res.status === 504
            ? ' الخادم غير متاح مؤقتاً (غالباً الصفحة https://api…/health لا تستجيب — راجع EasyPanel والاتصال بقاعدة البيانات).'
            : ''
        const hint503 =
          res.status === 503
            ? ' تحققي من https://api.nabtalabo.store/ready (يجب أن يعيد ok)، وأن خدمة الـ API تعمل بدون SKIP_AUTO_MIGRATE=true بحيث تُطبَّق مهاجرات قاعدة البيانات. راجع أيضاً DATABASE_URL وسجلات الـ API.'
            : ''
        void captureFailedCheckout(base, data, items, res.status, msg)
        setCheckoutError(msg + hint403 + hint502 + hint503)
        setPlacingOrder(false)
        return
      }

      const orderNumber =
        typeof parsed.order_number === 'string' ? parsed.order_number.trim() : ''
      const orderId =
        typeof parsed.order_id === 'string' ? parsed.order_id.trim() : ''
      const totalSarOk = typeof parsed.total_sar === 'number'

      if (!orderNumber || !orderId || !totalSarOk) {
        void captureFailedCheckout(
          base,
          data,
          items,
          res.status,
          'invalid_order_response',
        )
        setCheckoutError(
          'تعذّر تأكيد الطلب: المتصفّح لم يستلم تأكيدًا صالحًا من الخادم (قد يكون بروكسي أو كاش يعيد صفحة بدل الطلب الفعلي). حدّثي الصفحة، جرّبي نافذة خاصة، أو تأكدي من أنّ الطلب على https://api.nabtalabo.store يعمل.'
        )
        setPlacingOrder(false)
        return
      }

      const orderSummary = {
        name: data.name,
        phone: data.phone,
        items: [...items],
        total: total(),
        upsellAccepted: upsellAcceptedOk,
        upsellProduct: upsellAcceptedOk && upsell ? upsell : null,
        upsellPrice: upsellAcceptedOk ? getUpsellPriceSar() : 0,
        finalTotal: parsed.total_sar as number,
        createdAt: new Date().toISOString(),
        orderNumber,
        orderId,
        purchaseEventId,
        leadEventId,
      }
      setTrackingUser({ phone: data.phone })
      sessionStorage.removeItem('nabtalabo_pixels_fired')
      sessionStorage.setItem('nabtalabo_order', JSON.stringify(orderSummary))
      sessionStorage.setItem('nbta-skip-intro', '1')
      clearCart()
      onClose()
      window.location.replace('/thank-you')
    } catch (err) {
      if (typeof window !== 'undefined') {
        // eslint-disable-next-line no-console
        console.error('[nabtalabo checkout] POST /api/orders failed', base, err)
      }
      void captureFailedCheckout(base, data, items, null, err instanceof Error ? err.message : 'network')
      const hn =
        typeof window !== 'undefined' ? window.location.hostname.toLowerCase() : ''
      const liveStoreHost = hn === 'nabtalabo.store' || hn === 'www.nabtalabo.store'

      if (liveStoreHost) {
        setCheckoutError(
          'تعذّر إتمام الطلب من المتصفّح. تحقّقوا أنّ https://api.nabtalabo.store/health تجيب OK، وأعيدوا نشر الواجهة بعد آخر تحديث. إذا ظهر نصًا قديماً ومكرّراً عن «CORS» فهذا غالباً ذاكرة تخزين مؤقت — امسحوا بيانات الموقع لـ nabtalabo.store أو نفّذوا Purge على Cloudflare.'
        )
      } else if (err instanceof TypeError) {
        setCheckoutError(
          'تعذّر إتمام الطلب: لم يتوصّل المتصفّح بالـ API (شغّلي الباكند، أو جهِّزي NEXT_PUBLIC_API_URL أو USE_LOCAL وفق دليل الكومبوز المحلي، أو جرّبي شبكة أخرى).'
        )
      } else {
        setCheckoutError('تعذّر إتمام الطلب؛ حدّثي الصفحة وأعدي المحاولة.')
      }
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
    setCheckoutError(null)
    sessionStorage.removeItem('nabtalabo_order')
    sessionStorage.removeItem('nabtalabo_pixels_fired')
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
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 px-4 pt-4 pb-[max(12px,env(safe-area-inset-bottom))] sm:p-4 sm:pb-4">
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
                <span className="text-sm text-[#1C1C1C] min-w-0 flex-1 text-start leading-snug break-words">
                  {item.nameAr} — {item.offerQty === 1 ? 'قطعة' : item.offerQty === 2 ? 'قطعتين' : '3 قطع'}
                </span>
                <span className="shrink-0 text-sm font-bold text-[#b8485c]">
                  <span className="sar-price tabular-nums">{formatSarAmount(item.price)}</span>
                </span>
              </div>
            ))}
            <div className="flex justify-between items-center mt-2 pt-2">
              <span className="font-bold text-[#1C1C1C]">المجموع</span>
              <span className="text-lg font-bold text-[#b8485c]">
                <span className="sar-price tabular-nums">{formatSarAmount(total())}</span>
              </span>
            </div>
          </div>

          {/* Trust — compact */}
          <ul className="grid gap-2 text-xs text-[#1C1C1C]">
            {[
              '☎️ اتصال تأكيد خلال ساعات العمل (9ص–9م)',
              '📦 توصيل 2–4 أيام · دفع كاش عند الباب',
              '✅ SFDA · حلال · بدون بطاقة',
            ].map((line) => (
              <li key={line} className="rounded-xl bg-[#f8f4f2] px-3 py-2 leading-relaxed">
                {line}
              </li>
            ))}
          </ul>

          {/* COD — single payment path (no cards) */}
          <div className="rounded-2xl border-2 border-[#c5ddd0] bg-gradient-to-br from-[#f3faf5] to-white px-4 py-3.5 text-start shadow-[0_2px_12px_rgba(22,101,52,0.06)]">
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
                className="w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-[0.875rem] text-start text-charcoal shadow-sm transition-colors focus:border-[#b8485c] focus:outline-none"
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#1C1C1C] mb-1.5">رقم الجوال</label>
              <input
                {...register('phone')}
                placeholder="05XXXXXXXX"
                dir="ltr"
                className="w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-[0.875rem] text-left text-charcoal shadow-sm transition-colors focus:border-[#b8485c] focus:outline-none"
              />
              <p className="text-xs text-[#5c5656] mt-1">
                مسموح: <span dir="ltr" className="font-mono whitespace-nowrap">05XXXXXXXX</span> أو{' '}
                <span dir="ltr" className="font-mono whitespace-nowrap">9665XXXXXXXX</span> (مسافات اختيارية)
              </p>
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting || placingOrder}
              className="touch-manipulation w-full rounded-full bg-[#b8485c] py-4 text-lg font-bold text-white transition-all hover:bg-[#943c50] active:scale-[0.99] disabled:opacity-60 motion-reduce:active:scale-100"
            >
              {placingOrder ? 'جاري الإرسال...' : 'تأكيد الطلب'}
            </button>
          </form>

          <p className="text-center text-xs text-[#5c5656] leading-relaxed">
            بعد التأكيد: اتصال من الفريق + جدولة التوصيل — الدفع نقدًا عند الاستلام
          </p>
          <p className="sr-only" aria-hidden>
            {CHECKOUT_UI_REV}
          </p>
        </div>
      </div>
    </div>
  )
}
