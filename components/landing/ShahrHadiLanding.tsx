'use client'

import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { getPublicApiBase } from '@/lib/api'
import {
  placeCodOrder,
  redirectToThankYou,
  type OrderSummaryItem,
  type PlaceOrderLine,
} from '@/lib/place-order'
import {
  formatSarAmount,
  formatSarCompact,
  getBestUpsell,
  getComboPrice,
  getPriceForQty,
  getProductById,
} from '@/lib/products'
import { useStorePricing } from '@/components/pricing/StorePricingProvider'
import { getProductSolidButtonStyle, STORE_BUTTON_COLOR } from '@/lib/product-accent'
import { trackInitiateCheckout, trackViewContent } from '@/lib/tracking/client'

const UpsellModal = dynamic(() => import('@/components/checkout/UpsellModal'), { ssr: false })

const PRODUCT_ID = 'shahr-hadi'
const LP_ACCENT = STORE_BUTTON_COLOR

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

const formSchema = z.object({
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

type FormValues = z.infer<typeof formSchema>
type PackMode = 'single' | 'rawnaq_shahr' | 'powder_trio'

const HERO_IMAGE = '/lp/shahr-hadi/hb-cta-lifestyle-05-period.png'

const STORY_IMAGES = [
  { src: '/lp/shahr-hadi/hb-cta-lifestyle-01-routine.png', alt: 'روتينك اليومي — شهر هادئ' },
  { src: '/lp/shahr-hadi/hb-cta-lifestyle-02-balance.png', alt: 'توازن هرموني — شهر هادئ' },
  { src: '/lp/shahr-hadi/hb-cta-lifestyle-03-care.png', alt: 'عناية يومية — شهر هادئ' },
  { src: '/lp/shahr-hadi/hb-cta-lifestyle-04-daily.png', alt: 'يومياً — شهر هادئ' },
  { src: '/lp/shahr-hadi/hb-cta-lifestyle-06-easy.png', alt: 'سهل الاستخدام — شهر هادئ' },
  { src: '/lp/shahr-hadi/hb-cta-lifestyle-07-start.png', alt: 'ابدئي اليوم — شهر هادئ' },
  { src: '/lp/shahr-hadi/hb-cta-lifestyle-08-powder.png', alt: 'مسحوق شهر هادئ' },
  { src: '/lp/shahr-hadi/hb-cta-lifestyle-09-try.png', alt: 'جرّبي شهر هادئ' },
  { src: '/lp/shahr-hadi/hb-cta-lifestyle-10-now.png', alt: 'اطلبي الآن — شهر هادئ' },
  { src: '/lp/shahr-hadi/glass-hero.png', alt: 'كوب شهر هادئ — فراولة وآساي' },
]

const TESTIMONIAL_IMAGES = [
  { src: '/lp/shahr-hadi/hb-testimonial-01-grey-khimar-hold.png', alt: 'عميلة — شهر هادئ' },
  { src: '/lp/shahr-hadi/hb-testimonial-02-brown-living-hold.png', alt: 'عميلة — شهر هادئ' },
  { src: '/lp/shahr-hadi/hb-testimonial-03-black-hijab-curtains-hold.png', alt: 'عميلة — شهر هادئ' },
  { src: '/lp/shahr-hadi/hb-testimonial-04-garden-hold.png', alt: 'عميلة — شهر هادئ' },
  { src: '/lp/shahr-hadi/hb-testimonial-05-showroom-hold.png', alt: 'عميلة — شهر هادئ' },
]

const SINGLE_OFFERS = [
  { qty: 1 as const, label: 'عبوة واحدة', sub: '30 مكيال', compare: 249 },
  { qty: 2 as const, label: 'عبوتان', sub: 'الأكثر اختياراً', compare: 558, badge: '⭐ الأكثر' },
  { qty: 3 as const, label: '3 عبوات', sub: 'أفضل صفقة', compare: 747, badge: '🔥 وفر أكثر' },
]

function buildCart(
  packMode: PackMode,
  selectedQty: 1 | 2 | 3,
  product: NonNullable<ReturnType<typeof getProductById>>,
) {
  if (packMode === 'rawnaq_shahr') {
    const rawnaq = getProductById('rawnaq-c')
    if (!rawnaq) throw new Error('missing rawnaq')
    const combo = getComboPrice('rawnaq_shahr')
    const rawnaqShare = Math.round(combo / 3)
    const shahrShare = combo - rawnaqShare
    return {
      items: [
        { product_id: 'rawnaq-c', offer_qty: 1 as const },
        { product_id: PRODUCT_ID, offer_qty: 2 as const },
      ] satisfies PlaceOrderLine[],
      summaryItems: [
        {
          productId: rawnaq.id,
          offerQty: 1 as const,
          price: rawnaqShare,
          nameAr: rawnaq.nameAr,
          accentColor: rawnaq.accentColor,
          bgColor: rawnaq.bgColor,
        },
        {
          productId: product.id,
          offerQty: 2 as const,
          price: shahrShare,
          nameAr: product.nameAr,
          accentColor: product.accentColor,
          bgColor: product.bgColor,
        },
      ] satisfies OrderSummaryItem[],
      total: combo,
      label: 'باك رونق C + شهر هادئ ×2',
    }
  }

  if (packMode === 'powder_trio') {
    const naseej = getProductById('naseej')
    const vitaflow = getProductById('vitaflow')
    if (!naseej || !vitaflow) throw new Error('missing trio')
    const combo = getComboPrice('powder_trio')
    const share = Math.round(combo / 3)
    const last = combo - share * 2
    return {
      items: [
        { product_id: PRODUCT_ID, offer_qty: 1 as const },
        { product_id: 'naseej', offer_qty: 1 as const },
        { product_id: 'vitaflow', offer_qty: 1 as const },
      ] satisfies PlaceOrderLine[],
      summaryItems: [
        {
          productId: product.id,
          offerQty: 1 as const,
          price: share,
          nameAr: product.nameAr,
          accentColor: product.accentColor,
          bgColor: product.bgColor,
        },
        {
          productId: naseej.id,
          offerQty: 1 as const,
          price: share,
          nameAr: naseej.nameAr,
          accentColor: naseej.accentColor,
          bgColor: naseej.bgColor,
        },
        {
          productId: vitaflow.id,
          offerQty: 1 as const,
          price: last,
          nameAr: vitaflow.nameAr,
          accentColor: vitaflow.accentColor,
          bgColor: vitaflow.bgColor,
        },
      ] satisfies OrderSummaryItem[],
      total: combo,
      label: 'باك المساحيق الثلاثي',
    }
  }

  const price = getPriceForQty(selectedQty, PRODUCT_ID)
  return {
    items: [{ product_id: PRODUCT_ID, offer_qty: selectedQty }] satisfies PlaceOrderLine[],
    summaryItems: [
      {
        productId: product.id,
        offerQty: selectedQty,
        price,
        nameAr: product.nameAr,
        accentColor: product.accentColor,
        bgColor: product.bgColor,
      },
    ] satisfies OrderSummaryItem[],
    total: price,
    label:
      selectedQty === 1
        ? 'عبوة واحدة — شهر هادئ'
        : selectedQty === 2
          ? 'عبوتان — شهر هادئ'
          : '3 عبوات — شهر هادئ',
  }
}

function LpFullBleedImage({
  src,
  alt,
  priority = false,
  onTap,
}: {
  src: string
  alt: string
  priority?: boolean
  onTap?: () => void
}) {
  const inner = (
    <div className="relative aspect-[2/3] w-full bg-[#f5f0ee]">
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="(max-width: 640px) 100vw, 480px"
        className="object-cover object-center"
      />
    </div>
  )

  if (onTap) {
    return (
      <button type="button" onClick={onTap} className="block w-full text-right">
        {inner}
      </button>
    )
  }

  return inner
}

export default function ShahrHadiLanding() {
  useStorePricing()
  const product = getProductById(PRODUCT_ID)
  const orderRef = useRef<HTMLElement>(null)

  const [selectedQty, setSelectedQty] = useState<1 | 2 | 3>(2)
  const [packMode, setPackMode] = useState<PackMode>('single')
  const [showUpsell, setShowUpsell] = useState(false)
  const [formData, setFormData] = useState<FormValues | null>(null)
  const [placingOrder, setPlacingOrder] = useState(false)
  const [checkoutError, setCheckoutError] = useState<string | null>(null)
  const [showSticky, setShowSticky] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(formSchema) })

  const cart = useMemo(() => {
    if (!product) return null
    return buildCart(packMode, selectedQty, product)
  }, [packMode, selectedQty, product])

  const upsell = useMemo(
    () => (cart ? getBestUpsell(cart.items.map((i) => i.product_id)) : null),
    [cart],
  )

  useEffect(() => {
    if (!product) return
    trackViewContent({
      content_ids: [product.id],
      value: getPriceForQty(1, product.id),
      currency: 'SAR',
    })
  }, [product])

  useEffect(() => {
    const onScroll = () => setShowSticky(window.scrollY > 480)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToOrder = useCallback(() => {
    orderRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  const finalizeOrder = useCallback(
    async (data: FormValues, upsellAccepted: boolean) => {
      if (!product || !cart) return
      setCheckoutError(null)
      setPlacingOrder(true)
      const base = getPublicApiBase()
      const result = await placeCodOrder({
        base,
        customerName: data.name,
        phone: data.phone,
        items: cart.items,
        summaryItems: cart.summaryItems,
        summaryTotal: cart.total,
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
    [cart, product, upsell],
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
    if (!cart) return
    setCheckoutError(null)
    sessionStorage.removeItem('nabtalabo_order')
    sessionStorage.removeItem('nabtalabo_pixels_fired')
    trackInitiateCheckout({
      content_ids: cart.items.map((i) => i.product_id),
      value: cart.total,
      currency: 'SAR',
      num_items: cart.items.reduce((n, i) => n + i.offer_qty, 0),
    })
    setFormData(data)
    if (upsell) {
      setShowUpsell(true)
    } else {
      void finalizeOrder(data, false)
    }
  }

  if (!product) return null

  const entryPrice = getPriceForQty(1, PRODUCT_ID)

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
    <div className="min-h-screen bg-[#faf8f9]" dir="rtl">
      <header className="sticky top-0 z-40 border-b border-[#e8dcd8]/80 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-lg items-center justify-between gap-3 px-4 py-2.5">
          <Link href="/" className="shrink-0">
            <Image src="/nabta-lab-brand.png" alt="نبتة لابو" width={112} height={36} className="h-8 w-auto" />
          </Link>
          <span className="rounded-full bg-[#f1e6e4] px-3 py-1 text-[10px] font-black text-[#b8485c]">
            💵 COD · 🇸🇦
          </span>
        </div>
      </header>

      <div className="mx-auto w-full max-w-lg">
        <LpFullBleedImage
          src={HERO_IMAGE}
          alt="شهر هادئ — لأيام الدورة"
          priority
          onTap={scrollToOrder}
        />

        <section ref={orderRef} id="order" className="scroll-mt-14 px-3 pb-2 pt-1">
          <div className="overflow-hidden rounded-3xl bg-white shadow-[0_20px_60px_-24px_rgba(26,25,21,0.28)]">
            <div className="bg-[#b8485c] px-5 py-4 text-white">
              <h1 className="text-xl font-bold">اطلبي شهر هادئ — COD</h1>
              <p className="mt-1 text-sm text-white/85">اختاري العرض · اسم + جوال · تأكيد</p>
            </div>

            <div className="space-y-4 px-5 py-5">
              {packMode !== 'single' && cart ? (
                <div className="rounded-2xl border-2 border-[#b8485c]/25 bg-[#fdf6f5] p-3">
                  <p className="text-xs font-bold text-[#b8485c]">الباك المختار</p>
                  <p className="font-black text-charcoal">{cart.label}</p>
                  <p className="text-2xl font-black tabular-nums text-[#b8485c]">
                    {formatSarCompact(cart.total)}
                  </p>
                  <button
                    type="button"
                    onClick={() => setPackMode('single')}
                    className="mt-1 text-xs font-bold text-muted underline"
                  >
                    العودة للعروض العادية
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-2" role="radiogroup" aria-label="العروض">
                  {SINGLE_OFFERS.map((offer) => {
                    const active = selectedQty === offer.qty
                    const price = getPriceForQty(offer.qty, PRODUCT_ID)
                    return (
                      <button
                        key={offer.qty}
                        type="button"
                        role="radio"
                        aria-checked={active}
                        onClick={() => {
                          setPackMode('single')
                          setSelectedQty(offer.qty)
                        }}
                        className={`flex w-full items-center justify-between gap-3 rounded-2xl border-2 px-4 py-3 text-right transition ${
                          active
                            ? 'border-[#b8485c] bg-[#fdf6f5]'
                            : 'border-gray-200 bg-white'
                        }`}
                      >
                        <div>
                          <p className="font-bold text-charcoal">
                            {offer.badge ? `${offer.badge} · ` : ''}
                            {offer.label}
                          </p>
                          <p className="text-xs text-muted">{offer.sub}</p>
                        </div>
                        <div className="text-left">
                          <p className="text-lg font-black tabular-nums text-[#b8485c]">
                            {formatSarCompact(price)}
                          </p>
                          <p className="text-[11px] text-muted line-through">
                            {formatSarCompact(offer.compare)}
                          </p>
                        </div>
                      </button>
                    )
                  })}
                </div>
              )}

              <div className="rounded-2xl bg-[#f8f4f2] px-3 py-2 text-xs leading-relaxed text-charcoal">
                ☎️ تأكيد هاتفي · 📦 توصيل 2–4 أيام · ✅ SFDA · 💵 كاش عند الباب
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
                <div>
                  <label htmlFor="lp-name" className="mb-1 block text-sm font-semibold text-charcoal">
                    الاسم
                  </label>
                  <input
                    id="lp-name"
                    {...register('name')}
                    placeholder="اسمك الكريم"
                    autoComplete="name"
                    className="w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-base outline-none focus:border-[#b8485c]"
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="lp-phone" className="mb-1 block text-sm font-semibold text-charcoal">
                    رقم الجوال
                  </label>
                  <input
                    id="lp-phone"
                    {...register('phone')}
                    type="tel"
                    dir="ltr"
                    placeholder="05XXXXXXXX"
                    autoComplete="tel"
                    className="w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-left text-base outline-none focus:border-[#b8485c]"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p>
                  )}
                </div>

                {checkoutError && (
                  <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                    {checkoutError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting || placingOrder}
                  className="w-full rounded-full bg-[#b8485c] py-4 text-lg font-bold text-white transition hover:bg-[#943c50] disabled:opacity-60"
                >
                  {placingOrder || isSubmitting
                    ? 'جاري الإرسال…'
                    : `تأكيد الطلب · ${formatSarAmount(cart?.total ?? entryPrice)}`}
                </button>
              </form>

              <p className="text-center text-[11px] leading-relaxed text-muted">
                بدون بطاقة · نتصل للتأكيد · الدفع نقداً عند الاستلام
              </p>
            </div>
          </div>
        </section>

        <div className="flex flex-col">
          {STORY_IMAGES.map((img) => (
            <LpFullBleedImage key={img.src} src={img.src} alt={img.alt} onTap={scrollToOrder} />
          ))}
        </div>

        <section className="px-3 py-4">
          <p className="mb-2 text-center text-sm font-black text-charcoal">تجارب عميلاتنا</p>
          <div className="flex flex-col gap-1">
            {TESTIMONIAL_IMAGES.map((img) => (
              <LpFullBleedImage key={img.src} src={img.src} alt={img.alt} onTap={scrollToOrder} />
            ))}
          </div>
        </section>

        <section className="px-3 pb-6">
          <p className="mb-2 text-center text-sm font-black text-charcoal">باكات توفير</p>
          <div className="flex flex-col gap-2">
            {[
              {
                id: 'rawnaq_shahr' as const,
                title: 'باك الدورة + البشرة',
                price: getComboPrice('rawnaq_shahr'),
                img: '/products/home-rawnaq-c.png',
              },
              {
                id: 'powder_trio' as const,
                title: 'باك المساحيق الثلاثي',
                price: getComboPrice('powder_trio'),
                img: '/lp/shahr-hadi/trio-pack.png',
              },
            ].map((pack) => (
              <button
                key={pack.id}
                type="button"
                onClick={() => {
                  setPackMode(pack.id)
                  scrollToOrder()
                }}
                className="flex items-center gap-3 rounded-2xl border border-border/70 bg-white p-3 text-right shadow-sm"
              >
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-[#faf9f8]">
                  <Image src={pack.img} alt="" fill className="object-cover" sizes="64px" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-charcoal">{pack.title}</p>
                  <p className="text-lg font-black tabular-nums text-[#b8485c]">
                    {formatSarCompact(pack.price)}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </section>

        <footer className="border-t border-border/50 px-4 py-6 text-center text-[11px] text-muted">
          <p>© نبتة لابو · مكمّل غذائي SFDA — مو علاج طبي</p>
          <div className="mt-2 flex flex-wrap justify-center gap-3">
            <Link href="/privacy-policy" className="underline">
              الخصوصية
            </Link>
            <Link href="/shipping-policy" className="underline">
              الشحن
            </Link>
            <Link href="/cod-policy" className="underline">
              COD
            </Link>
          </div>
        </footer>
      </div>

      {showSticky && (
        <div className="fixed inset-x-0 bottom-0 z-50 mx-auto max-w-lg border-t border-border/80 bg-white/95 p-3 pb-[max(12px,env(safe-area-inset-bottom))] backdrop-blur-md">
          <button
            type="button"
            onClick={scrollToOrder}
            className="flex min-h-[3rem] w-full items-center justify-center rounded-full text-base font-bold text-white"
            style={getProductSolidButtonStyle(LP_ACCENT)}
          >
            اطلبي · {formatSarCompact(cart?.total ?? entryPrice)} · COD
          </button>
        </div>
      )}
    </div>
  )
}
