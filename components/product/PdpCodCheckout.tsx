'use client'

import dynamic from 'next/dynamic'
import { useCallback, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { getPublicApiBase } from '@/lib/api'
import {
  placeCodOrder,
  redirectToThankYou,
  type OrderSummaryItem,
} from '@/lib/place-order'
import {
  formatSarAmount,
  getBestUpsell,
  getPriceForQty,
  type Product,
} from '@/lib/products'
import { CHECKOUT_UI_REV } from '@/lib/checkout-rev'
import { trackInitiateCheckout } from '@/lib/tracking/client'

const UpsellModal = dynamic(() => import('@/components/checkout/UpsellModal'), { ssr: false })

const TEST_PHONES = ['055000000']

function canonicalSaPhone(raw: string): string {
  const t = raw.trim()
  if (TEST_PHONES.includes(t)) return t
  const d = t.replace(/\D/g, '')
  if (d.length === 10 && d.startsWith('05')) return d
  if (d.length === 9 && d.startsWith('5')) return `0${d}`
  if (d.startsWith('966') && d.length >= 12 && d[3] === '5') return `0${d.slice(-9)}`
  return t
}

const schema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'الاسم يجب أن يكون حرفين على الأقل')
    .refine((v) => /[\u0600-\u06FFa-zA-Z]/.test(v), 'يرجى إدخال اسمك الحقيقي'),
  phone: z
    .string()
    .transform(canonicalSaPhone)
    .refine(
      (v) => TEST_PHONES.includes(v) || /^05(?:0|[3-9])\d{7}$/.test(v),
      'يرجى إدخال جوال سعودي صحيح (05XXXXXXXX)',
    ),
})

type FormValues = z.infer<typeof schema>

type Props = {
  product: Product
  qty: 1 | 2 | 3
  onClose: () => void
}

export default function PdpCodCheckout({ product, qty, onClose }: Props) {
  const [showUpsell, setShowUpsell] = useState(false)
  const [formData, setFormData] = useState<FormValues | null>(null)
  const [placingOrder, setPlacingOrder] = useState(false)
  const [checkoutError, setCheckoutError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) })

  const price = getPriceForQty(qty, product.id)
  const label = qty === 1 ? 'عبوة واحدة' : qty === 2 ? 'عبوتان' : '3 عبوات'

  const summaryItems: OrderSummaryItem[] = useMemo(
    () => [
      {
        productId: product.id,
        offerQty: qty,
        price,
        nameAr: product.nameAr,
        accentColor: product.accentColor,
        bgColor: product.bgColor,
      },
    ],
    [product, qty, price],
  )

  const upsell = getBestUpsell([product.id])

  const finalizeOrder = useCallback(
    async (data: FormValues, upsellAccepted: boolean) => {
      setCheckoutError(null)
      setPlacingOrder(true)
      const result = await placeCodOrder({
        base: getPublicApiBase(),
        customerName: data.name,
        phone: data.phone,
        items: [{ product_id: product.id, offer_qty: qty }],
        summaryItems,
        summaryTotal: price,
        upsellAccepted,
        upsellProduct: upsell,
      })
      if (!result.ok) {
        setCheckoutError(result.error)
        setPlacingOrder(false)
        return
      }
      redirectToThankYou()
    },
    [product.id, qty, summaryItems, price, upsell],
  )

  function onSubmit(data: FormValues) {
    setCheckoutError(null)
    sessionStorage.removeItem('nabtalabo_order')
    sessionStorage.removeItem('nabtalabo_pixels_fired')
    trackInitiateCheckout({
      content_ids: [product.id],
      value: price,
      currency: 'SAR',
      num_items: qty,
    })
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
        onAccept={() => void finalizeOrder(formData, true)}
        onSkip={() => void finalizeOrder(formData, false)}
      />
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 px-4 pt-4 pb-[max(12px,env(safe-area-inset-bottom))] sm:items-center sm:p-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="pdp-cod-title"
        className="flex w-full max-w-md flex-col overflow-hidden rounded-t-3xl border-4 border-[#b8485c] bg-white shadow-[0_0_0_8px_rgba(184,72,92,0.22)] sm:rounded-3xl"
      >
        <div className="bg-[#b8485c] px-5 py-4 text-white">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 id="pdp-cod-title" className="text-xl font-bold">
                أكّدي طلبك
              </h2>
              <p className="mt-1 text-sm text-white/85">
                {product.nameAr} · {label} · {formatSarAmount(price)}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-white/80"
              aria-label="إغلاق"
            >
              ✕
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 px-5 py-5">
          {checkoutError && (
            <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {checkoutError}
            </p>
          )}
          <div>
            <label htmlFor="pdp-cod-name" className="mb-1.5 block text-sm font-semibold text-charcoal">
              الاسم
            </label>
            <input
              id="pdp-cod-name"
              {...register('name')}
              placeholder="اسمك الكريم"
              autoComplete="name"
              className="w-full rounded-xl border-2 border-gray-200 px-4 py-3.5 text-base outline-none focus:border-[#b8485c]"
            />
            {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>}
          </div>
          <div>
            <label htmlFor="pdp-cod-phone" className="mb-1.5 block text-sm font-semibold text-charcoal">
              رقم الجوال
            </label>
            <input
              id="pdp-cod-phone"
              {...register('phone')}
              type="tel"
              dir="ltr"
              placeholder="05XXXXXXXX"
              autoComplete="tel"
              className="w-full rounded-xl border-2 border-gray-200 px-4 py-3.5 text-left text-base outline-none focus:border-[#b8485c]"
            />
            {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p>}
          </div>
          <button
            type="submit"
            disabled={isSubmitting || placingOrder}
            className="w-full rounded-full bg-[#b8485c] py-4 text-lg font-bold text-white disabled:opacity-60"
          >
            {placingOrder || isSubmitting ? 'جاري الإرسال…' : 'تأكيد الطلب · COD'}
          </button>
          <p className="text-center text-[11px] text-muted">نقداً عند الاستلام · نتصل للتأكيد</p>
          <p className="sr-only">{CHECKOUT_UI_REV}</p>
        </form>
      </div>
    </div>
  )
}
