'use client'

import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import StarRating from '@/components/ui/StarRating'
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
const LP_SOFT = '#F0E9F0'

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

const SINGLE_OFFERS = [
  {
    qty: 1 as const,
    label: 'عبوة واحدة',
    sub: 'شهر تجربة · 30 مكيال',
    compare: 249,
    badge: null as string | null,
  },
  {
    qty: 2 as const,
    label: 'عبوتان',
    sub: 'دورتان — الأكثر اختياراً',
    compare: 558,
    badge: 'الأكثر اختياراً · وفر 50%',
  },
  {
    qty: 3 as const,
    label: '3 عبوات',
    sub: '3 دورات — أفضل صفقة',
    compare: 747,
    badge: 'أفضل صفقة · وفر 53%',
  },
]

const BENEFITS = [
  { icon: '🌸', title: 'توازن هرموني', text: 'دعم أيام الدورة من الداخل — أهدأ كل شهر' },
  { icon: '💆‍♀️', title: 'ألم وانتفاخ أخف', text: 'تقلّبات أقل قبل وأثناء الدورة' },
  { icon: '😌', title: 'مزاج أوضح', text: 'إحساس إنكِ مسيطرة — مو نسخة متعبة' },
  { icon: '🧪', title: 'مكوّنات معروفة', text: 'مايو-إينوسيتول · فيتكس · مغنيسيوم · B6' },
  { icon: '🥄', title: 'مكيال واحد يومياً', text: 'روتين بسيط — بدون حبوب متعددة' },
  { icon: '🇸🇦', title: 'COD للمملكة', text: 'تدفعي كاش عند الباب — بدون دفع مسبق' },
]

const REVIEWS = [
  {
    name: 'فاطمة — الرياض',
    text: 'ألم قبل الدورة كان يوقف يومي؛ دورتين ووصلت نتيجة — أعراض أخف بكثير.',
    img: '/lp/shahr-hadi/hb-testimonial-01-grey-khimar-hold.png',
    rating: 5,
  },
  {
    name: 'أمل — جدة',
    text: 'شهرين يومياً: انتفاخ ومزاج أهدأ قبل الدورة. أنصح فيه.',
    img: '/lp/shahr-hadi/hb-testimonial-02-brown-living-hold.png',
    rating: 5,
  },
  {
    name: 'نورة — مكة',
    text: '3 دورات — شهر أهدأ بشكل ملحوظ. COD سهل وتوصيل سريع.',
    img: '/lp/shahr-hadi/hb-testimonial-03-black-hijab-curtains-hold.png',
    rating: 5,
  },
  {
    name: 'ريم — الدمام',
    text: 'روتين بسيط — كوب واحد يومياً. حسيت فرق من الدورة الثانية.',
    img: '/lp/shahr-hadi/hb-testimonial-04-garden-hold.png',
    rating: 5,
  },
  {
    name: 'لين — الخبر',
    text: 'طلبت عبوتين — توصيل سريع وتأكيد هاتفي محترم.',
    img: '/lp/shahr-hadi/hb-testimonial-05-showroom-hold.png',
    rating: 5,
  },
]

const FAQS = [
  {
    q: 'هل يعالج PCOS؟',
    a: 'مكمّل غذائي فقط — مو علاج طبي. من لديها تشخيص رسمي تستشير الطبيب قبل أي مكمّل.',
  },
  {
    q: 'متى أبدأ؟',
    a: 'يومياً وبشكل مستمر — الفائدة تتراكم مع الوقت، مو غير أيام الألم فقط.',
  },
  {
    q: 'كم دورة قبل أشوف فرقاً؟',
    a: 'غالباً 2–3 دورات من الاستخدام اليومي المنتظم.',
  },
  {
    q: 'هل الدفع عند الاستلام؟',
    a: 'نعم — COD لكل مناطق المملكة. تدفعي كاش عند استلام الطلب.',
  },
  {
    q: 'هل يتعارض مع حبوب منع الحمل؟',
    a: 'يُنصح باستشارة الطبيب إذا كنتِ على أي دواء هرموني.',
  },
  {
    q: 'كيف أستخدمه؟',
    a: 'مكيال واحد يومياً مع ماء أو عصير — نكهة فراولة آساي.',
  },
]

const HERO_IMG = '/products/shahr-hadi-hero.png'
const PROBLEM_IMG = '/products/shahr-hadi-pain.png'
const SOLUTION_IMG = '/products/shahr-hadi-after.png'
const PRODUCT_IMG = '/products/shahr-hadi-powder.png'
const PRODUCT_DETAIL_IMG = '/products/shahr-hadi-product-v4.png'

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

function TrustStrip({ className = '' }: { className?: string }) {
  const items = [
    { icon: '💵', text: 'دفع عند الاستلام' },
    { icon: '🚚', text: 'توصيل 2–4 أيام' },
    { icon: '📞', text: 'تأكيد هاتفي' },
    { icon: '✅', text: 'مكمّل SFDA' },
  ]
  return (
    <div className={`grid grid-cols-2 gap-2 sm:grid-cols-4 ${className}`}>
      {items.map((t) => (
        <div
          key={t.text}
          className="flex items-center justify-center gap-1.5 rounded-xl border border-white/80 bg-white/90 px-2 py-2.5 text-center text-[11px] font-bold text-charcoal shadow-sm sm:text-xs"
        >
          <span aria-hidden>{t.icon}</span>
          <span>{t.text}</span>
        </div>
      ))}
    </div>
  )
}

function LpImage({
  src,
  alt,
  priority = false,
  onTap,
  className = '',
}: {
  src: string
  alt: string
  priority?: boolean
  onTap?: () => void
  className?: string
}) {
  const img = (
    <div className={`relative aspect-[2/3] w-full overflow-hidden bg-[#f5f0ee] ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="(max-width: 640px) 100vw, 672px"
        className="object-cover object-center"
      />
    </div>
  )
  if (onTap) {
    return (
      <button type="button" onClick={onTap} className="block w-full">
        {img}
      </button>
    )
  }
  return img
}

export default function ShahrHadiLanding() {
  useStorePricing()
  const product = getProductById(PRODUCT_ID)
  const orderRef = useRef<HTMLElement>(null)

  const [selectedQty, setSelectedQty] = useState<1 | 2 | 3>(2)
  const [packMode, setPackMode] = useState<PackMode>('single')
  const [stockLeft] = useState(() => 11 + (Math.floor(Date.now() / 86400000) % 5))
  const [showUpsell, setShowUpsell] = useState(false)
  const [formData, setFormData] = useState<FormValues | null>(null)
  const [placingOrder, setPlacingOrder] = useState(false)
  const [checkoutError, setCheckoutError] = useState<string | null>(null)
  const [openFaq, setOpenFaq] = useState<number | null>(0)
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
    const onScroll = () => setShowSticky(window.scrollY > 520)
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
  const bullets = product.persuasionBlock?.bullets ?? []

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
        <div className="mx-auto flex max-w-lg items-center justify-between gap-3 px-4 py-2.5 sm:max-w-2xl sm:px-6">
          <Link href="/" className="shrink-0">
            <Image src="/nabta-lab-brand.png" alt="نبتة لابو" width={112} height={36} className="h-8 w-auto" />
          </Link>
          <span className="rounded-full bg-[#f1e6e4] px-3 py-1 text-[10px] font-black tracking-wide text-[#b8485c] sm:text-xs">
            💵 COD · 🇸🇦 توصيل المملكة
          </span>
        </div>
      </header>

      {/* Hero — before / product / after */}
      <LpImage
        src={HERO_IMG}
        alt="شهر هادئ — قبل وبعد"
        priority
        onTap={scrollToOrder}
        className="aspect-square"
      />

      <div className="mx-auto max-w-lg px-4 pb-28 sm:max-w-2xl sm:px-6">
        {/* Social proof + price */}
        <section className="-mt-5 relative z-10 rounded-3xl border border-border/60 bg-white p-5 shadow-[0_16px_48px_-20px_rgba(26,25,21,0.15)] sm:p-6">
          <StarRating rating={product.rating} count={1247} size="lg" accentColor={LP_ACCENT} />
          <p className="mt-3 text-sm font-semibold text-muted">+1,200 عميلة في السعودية</p>
          <div className="mt-4 flex flex-wrap items-end gap-3">
            <p className="text-4xl font-black tabular-nums sm:text-5xl" style={{ color: LP_ACCENT }}>
              {formatSarCompact(cart?.total ?? entryPrice)}
            </p>
            {packMode === 'single' && (
              <p className="pb-1 text-lg text-muted line-through">
                {formatSarCompact(SINGLE_OFFERS.find((o) => o.qty === selectedQty)?.compare ?? 249)}
              </p>
            )}
          </div>
          <p className="mt-2 text-xs leading-relaxed text-muted">
            مكمّل غذائي · 30 مكيال · فراولة آساي · COD — النتيجة تختلف حسب الجسم والالتزام.
          </p>
        </section>

        {/* Offers */}
        {packMode === 'single' && (
          <section className="mt-6">
            <h2 className="text-lg font-black text-charcoal">اختاري عرضك</h2>
            <div className="mt-3 flex flex-col gap-2.5" role="radiogroup" aria-label="العروض">
              {SINGLE_OFFERS.map((offer) => {
                const active = selectedQty === offer.qty
                const price = getPriceForQty(offer.qty, PRODUCT_ID)
                const save = offer.compare - price
                return (
                  <button
                    key={offer.qty}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    onClick={() => setSelectedQty(offer.qty)}
                    className={`relative w-full rounded-2xl border-2 p-4 text-right transition-all ${
                      active
                        ? 'border-[#b8485c] shadow-[0_12px_36px_-12px_rgba(184,72,92,0.45)]'
                        : 'border-border/70 bg-white'
                    }`}
                    style={
                      active ? { background: `linear-gradient(135deg, ${LP_SOFT} 0%, #fff 100%)` } : undefined
                    }
                  >
                    {offer.badge && (
                      <span
                        className="absolute -top-2.5 left-4 rounded-full px-3 py-0.5 text-[10px] font-black text-white"
                        style={{ background: LP_ACCENT }}
                      >
                        {offer.badge}
                      </span>
                    )}
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="font-black text-charcoal">{offer.label}</p>
                        <p className="mt-0.5 text-xs text-muted">{offer.sub}</p>
                      </div>
                      <div className="text-left">
                        <p className="text-xl font-black tabular-nums" style={{ color: LP_ACCENT }}>
                          {formatSarCompact(price)}
                        </p>
                        <p className="text-xs text-muted line-through">{formatSarCompact(offer.compare)}</p>
                        {save > 0 && (
                          <p className="text-[10px] font-bold text-[#146b70]">وفر {formatSarCompact(save)}</p>
                        )}
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </section>
        )}

        {packMode !== 'single' && cart && (
          <section className="mt-6 rounded-2xl border-2 border-[#b8485c]/30 bg-[#f1e6e4]/60 p-4">
            <p className="text-xs font-bold text-[#b8485c]">الباك المختار</p>
            <p className="mt-1 font-black text-charcoal">{cart.label}</p>
            <p className="mt-1 text-2xl font-black tabular-nums text-[#b8485c]">
              {formatSarCompact(cart.total)}
            </p>
            <button
              type="button"
              onClick={() => setPackMode('single')}
              className="mt-2 text-xs font-bold text-muted underline"
            >
              العودة للعروض العادية
            </button>
          </section>
        )}

        {/* Order form — b7al checkout */}
        <section
          ref={orderRef}
          id="order"
          className="mt-6 scroll-mt-20 rounded-3xl border-2 border-[#b8485c]/25 bg-white p-5 shadow-lg sm:p-6"
        >
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-xl font-black text-charcoal">اطلبي الآن — COD</h2>
            <span className="rounded-full bg-red-50 px-2.5 py-1 text-[10px] font-black text-red-600">
              🔥 {stockLeft} عبوة متبقية
            </span>
          </div>
          <p className="mt-1 text-sm text-muted">اسم + جوال — نتصل للتأكيد قبل الشحن</p>

          <div className="mt-4 rounded-2xl border-2 border-[#c5ddd0] bg-gradient-to-br from-[#f3faf5] to-white px-4 py-3 text-start">
            <p className="text-[11px] font-bold text-[#166534]">طريقة الدفع</p>
            <p className="text-base font-bold text-charcoal mt-1">نقدًا عند الاستلام فقط</p>
            <Link href="/cod-policy" className="mt-1 inline-block text-xs font-semibold text-[#b8485c] underline">
              سياسة COD
            </Link>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-5 space-y-4">
            <div>
              <label htmlFor="lp-name" className="mb-1.5 block text-sm font-bold text-charcoal">
                الاسم الكامل
              </label>
              <input
                id="lp-name"
                {...register('name')}
                className="w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3.5 text-base outline-none focus:border-[#b8485c]"
                placeholder="مثال: سارة العتيبي"
                autoComplete="name"
              />
              {errors.name && <p className="mt-1 text-xs font-semibold text-red-600">{errors.name.message}</p>}
            </div>
            <div>
              <label htmlFor="lp-phone" className="mb-1.5 block text-sm font-bold text-charcoal">
                رقم الجوال
              </label>
              <input
                id="lp-phone"
                {...register('phone')}
                type="tel"
                dir="ltr"
                className="w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3.5 text-base text-left outline-none focus:border-[#b8485c]"
                placeholder="05XXXXXXXX"
                autoComplete="tel"
              />
              {errors.phone && <p className="mt-1 text-xs font-semibold text-red-600">{errors.phone.message}</p>}
            </div>

            {checkoutError && (
              <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-700">
                {checkoutError}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting || placingOrder}
              className="flex min-h-[3.25rem] w-full touch-manipulation items-center justify-center rounded-full text-lg font-black text-white transition active:scale-[0.99] disabled:opacity-60"
              style={getProductSolidButtonStyle(LP_ACCENT)}
            >
              {placingOrder || isSubmitting
                ? 'جاري إرسال الطلب…'
                : `تأكيد الطلب · ${formatSarAmount(cart?.total ?? entryPrice)} · COD`}
            </button>
          </form>

          <TrustStrip className="mt-5" />
        </section>

        {/* Problem — mra kat3ani */}
        <LpImage
          src={PROBLEM_IMG}
          alt="أيام الدورة صعبة"
          onTap={scrollToOrder}
          className="mt-8 rounded-3xl aspect-square"
        />

        {/* Benefits */}
        <section className="mt-10">
          <h2 className="text-xl font-black text-charcoal">ليش آلاف السعوديات اختاروا شهر هادئ؟</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {BENEFITS.map((b) => (
              <div key={b.title} className="rounded-2xl border border-border/60 bg-white p-4 shadow-sm">
                <span className="text-2xl" aria-hidden>
                  {b.icon}
                </span>
                <p className="mt-2 font-black text-charcoal">{b.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted">{b.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Solution — mra katchreb w mertaha */}
        <LpImage src={SOLUTION_IMG} alt="مرتاحة مع شهر هادئ" onTap={scrollToOrder} className="mt-8 rounded-3xl aspect-square" />

        {/* Before / Product / After — 3 col */}
        <section className="mt-10 overflow-hidden rounded-3xl border border-border/60 bg-white">
          <div className="grid grid-cols-3">
            <div className="relative aspect-[3/4]">
              <Image
                src={PROBLEM_IMG}
                alt="قبل — أيام صعبة"
                fill
                className="object-cover"
                sizes="33vw"
              />
              <span className="absolute top-3 right-3 rounded-full bg-black/60 px-3 py-1 text-[10px] font-black text-white sm:text-xs">
                قبل
              </span>
            </div>
            <div className="relative aspect-[3/4] bg-[#faf9f8]">
              <Image
                src={PRODUCT_DETAIL_IMG}
                alt="شهر هادئ"
                fill
                className="object-contain p-2"
                sizes="33vw"
              />
            </div>
            <div className="relative aspect-[3/4]">
              <Image
                src={SOLUTION_IMG}
                alt="بعد — شهر أهدأ"
                fill
                className="object-cover"
                sizes="33vw"
              />
              <span
                className="absolute top-3 right-3 rounded-full px-3 py-1 text-[10px] font-black text-white sm:text-xs"
                style={{ background: LP_ACCENT }}
              >
                بعد
              </span>
            </div>
          </div>
          <div className="p-5">
            <h3 className="text-lg font-black text-charcoal">
              {product.extraStory?.titleAr ?? 'من أيام ثقيلة… لشهر تتحكمين فيه'}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {product.persuasionBlock?.bodyAr?.slice(0, 220)}…
            </p>
          </div>
        </section>

        {/* Ingredients + product */}
        <section className="mt-10 overflow-hidden rounded-3xl border border-border/60 bg-white">
          <div className="relative aspect-square w-full max-h-[420px]">
            <Image
              src={PRODUCT_DETAIL_IMG}
              alt="شهر هادئ — المكوّنات"
              fill
              className="object-contain bg-[#faf9f8] p-4"
              sizes="672px"
            />
          </div>
          <div className="p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-[#b8485c]">
              {product.persuasionBlock?.eyebrowAr}
            </p>
            <h3 className="mt-1 text-lg font-black text-charcoal">{product.persuasionBlock?.titleAr}</h3>
            <ul className="mt-4 flex flex-col gap-2">
              {bullets.map((line) => (
                <li key={line} className="flex gap-2 text-sm leading-relaxed text-muted">
                  <span className="shrink-0 text-[#b8485c]">✓</span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Product shot — qualité */}
        <LpImage src={PRODUCT_IMG} alt="شهر هادئ — Hormonal Balance" onTap={scrollToOrder} className="mt-8 rounded-3xl aspect-square" />

        {/* Reviews with text */}
        <section className="mt-10">
          <h2 className="text-xl font-black text-charcoal">تجارب عميلاتنا</h2>
          <div className="mt-4 flex flex-col gap-3">
            {REVIEWS.map((r) => (
              <article key={r.name} className="flex gap-3 rounded-2xl border border-border/60 bg-white p-4 shadow-sm">
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-[#faf9f8]">
                  <Image src={r.img} alt="" fill className="object-cover" sizes="80px" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-black text-charcoal">{r.name}</p>
                    <span className="text-sm" style={{ color: LP_ACCENT }} aria-hidden>
                      {'★'.repeat(r.rating)}
                    </span>
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{r.text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-10">
          <h2 className="text-xl font-black text-charcoal">أسئلة شائعة</h2>
          <div className="mt-4 flex flex-col gap-2">
            {FAQS.map((f, i) => (
              <div key={f.q} className="overflow-hidden rounded-2xl border border-border/60 bg-white">
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-right font-bold text-charcoal"
                >
                  <span>{f.q}</span>
                  <span className="text-xl text-muted">{openFaq === i ? '−' : '+'}</span>
                </button>
                {openFaq === i && (
                  <p className="border-t border-border/50 px-4 py-3 text-sm leading-relaxed text-muted">{f.a}</p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Combo packs — AOV */}
        <section className="mt-10 rounded-3xl border-2 border-[#146b70]/20 bg-gradient-to-b from-[#eef6f6] to-white p-5 sm:p-6">
          <h2 className="text-xl font-black text-charcoal">📦 باكات توفير — للي بغت تكمّل الروتين</h2>
          <p className="mt-1 text-sm text-muted">أسعار ثابتة — أوفر من الشراء منفصل</p>
          <div className="mt-4 flex flex-col gap-3">
            {[
              {
                id: 'rawnaq_shahr' as const,
                title: 'باك الدورة + البشرة',
                sub: '1× رونق C علكة + 2× شهر هادئ',
                price: getComboPrice('rawnaq_shahr'),
                compare: getPriceForQty(1, 'rawnaq-c') + getPriceForQty(2, PRODUCT_ID),
                img: '/products/home-rawnaq-c.png',
              },
              {
                id: 'powder_trio' as const,
                title: 'باك المساحيق الثلاثي',
                sub: 'شهر هادئ + نسيج + فيتا فلو',
                price: getComboPrice('powder_trio'),
                compare:
                  getPriceForQty(1, PRODUCT_ID) +
                  getPriceForQty(1, 'naseej') +
                  getPriceForQty(1, 'vitaflow'),
                img: '/lp/shahr-hadi/trio-pack.png',
              },
            ].map((pack) => {
              const save = pack.compare - pack.price
              return (
                <button
                  key={pack.id}
                  type="button"
                  onClick={() => {
                    setPackMode(pack.id)
                    scrollToOrder()
                  }}
                  className="flex w-full items-center gap-3 rounded-2xl border border-border/70 bg-white p-3 text-right shadow-sm transition hover:border-[#b8485c]/40"
                >
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-[#faf9f8]">
                    <Image src={pack.img} alt="" fill className="object-cover" sizes="80px" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-black text-charcoal">{pack.title}</p>
                    <p className="text-xs text-muted">{pack.sub}</p>
                    <div className="mt-1 flex flex-wrap items-center gap-2">
                      <span className="text-lg font-black tabular-nums text-[#b8485c]">
                        {formatSarCompact(pack.price)}
                      </span>
                      <span className="text-xs text-muted line-through">{formatSarCompact(pack.compare)}</span>
                      {save > 0 && (
                        <span className="rounded-full bg-[#146b70]/10 px-2 py-0.5 text-[10px] font-black text-[#146b70]">
                          وفر {formatSarCompact(save)}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </section>

        {/* Closing persuasion */}
        {product.closingPersuasion && (
          <section className="mt-8 rounded-3xl border border-[#b8485c]/20 bg-[#fdf6f5] p-5">
            <p className="text-xs font-bold text-[#b8485c]">{product.closingPersuasion.eyebrowAr}</p>
            <h3 className="mt-1 text-lg font-black text-charcoal">{product.closingPersuasion.titleAr}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{product.closingPersuasion.bodyAr}</p>
          </section>
        )}

        {/* Final CTA */}
        <section className="mt-8 mb-4 text-center">
          <button
            type="button"
            onClick={scrollToOrder}
            className="inline-flex min-h-[3.25rem] w-full max-w-md items-center justify-center rounded-2xl text-lg font-black text-white"
            style={getProductSolidButtonStyle(LP_ACCENT)}
          >
            اطلبي الآن · COD · {formatSarCompact(cart?.total ?? entryPrice)}
          </button>
          <p className="mt-3 text-xs text-muted">مكمّل غذائي SFDA — مو علاج طبي</p>
        </section>

        <footer className="border-t border-border/50 py-6 text-center text-[11px] text-muted">
          <p>© نبتة لابو · nabtalabo.store</p>
          <div className="mt-2 flex flex-wrap justify-center gap-3">
            <Link href="/privacy-policy" className="underline">
              الخصوصية
            </Link>
            <Link href="/shipping-policy" className="underline">
              الشحن
            </Link>
            <Link href="/returns-refunds" className="underline">
              الإرجاع
            </Link>
          </div>
        </footer>
      </div>

      {showSticky && (
        <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border/80 bg-white/95 p-3 pb-[max(12px,env(safe-area-inset-bottom))] backdrop-blur-md sm:hidden">
          <button
            type="button"
            onClick={scrollToOrder}
            className="flex min-h-[3rem] w-full items-center justify-center rounded-2xl text-base font-black text-white"
            style={getProductSolidButtonStyle(LP_ACCENT)}
          >
            اطلبي · {formatSarCompact(cart?.total ?? entryPrice)} · COD
          </button>
        </div>
      )}
    </div>
  )
}
