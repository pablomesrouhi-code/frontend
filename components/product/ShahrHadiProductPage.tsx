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
const ACCENT = STORE_BUTTON_COLOR
const SOFT = '#F0E9F0'
const TEST_PHONES = ['055000000']

const V3 = {
  hero: '/products/shahr-hadi-v3/shahr-hadi-v3-01-split-transform.png',
  problem: '/products/shahr-hadi-v3/shahr-hadi-v3-02-problem.png',
  drinking: '/products/shahr-hadi-v3/shahr-hadi-v3-03-drinking.png',
  relaxed: '/products/shahr-hadi-v3/shahr-hadi-v3-04-relaxed-product.png',
  product: '/products/shahr-hadi-v3/shahr-hadi-v3-05-product-hero.png',
} as const

const STORY = [
  {
    src: V3.hero,
    title: 'من ألم الدورة… لشهر أهدأ',
    sub: 'مسحوق دعم هرموني · COD · المملكة',
  },
  {
    src: V3.problem,
    title: 'تعرفين هذا الإحساس؟',
    sub: 'تقلّب · ألم · تعب قبل الدورة — مو لازم تتحملي بصمت',
  },
  {
    src: V3.drinking,
    title: 'كوب واحد يومياً',
    sub: 'فراولة آساي · مكيال · روتين بسيط',
  },
  {
    src: V3.relaxed,
    title: 'بعد الروتين — راحة أوضح',
    sub: 'مكمّل SFDA · النتيجة تختلف حسب الالتزام',
  },
  {
    src: V3.product,
    title: 'شهر هادئ — Hormonal Balance',
    sub: 'مايو-إينوسيتول · فيتكس · مغنيسيوم · B6',
  },
]

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

const OFFERS = [
  { qty: 1 as const, label: 'عبوة واحدة', sub: 'شهر تجربة · 30 مكيال', compare: 249, badge: null as string | null },
  { qty: 2 as const, label: 'عبوتان', sub: 'دورتان — الأكثر اختياراً', compare: 558, badge: 'الأكثر اختياراً · وفر 50%' },
  { qty: 3 as const, label: '3 عبوات', sub: '3 دورات — أفضل صفقة', compare: 747, badge: 'أفضل صفقة · وفر 53%' },
]

const FAQS = [
  { q: 'هل يعالج PCOS؟', a: 'مكمّل غذائي فقط — مو علاج طبي. استشيري الطبيب إذا عندك تشخيص رسمي.' },
  { q: 'متى أبدأ؟', a: 'يومياً وبشكل مستمر — الفائدة تتراكم مع الوقت.' },
  { q: 'كم دورة قبل فرق؟', a: 'غالباً 2–3 دورات من الاستخدام اليومي.' },
  { q: 'COD؟', a: 'نعم — دفع كاش عند الباب لكل مناطق المملكة.' },
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
        { productId: rawnaq.id, offerQty: 1 as const, price: rawnaqShare, nameAr: rawnaq.nameAr, accentColor: rawnaq.accentColor, bgColor: rawnaq.bgColor },
        { productId: product.id, offerQty: 2 as const, price: shahrShare, nameAr: product.nameAr, accentColor: product.accentColor, bgColor: product.bgColor },
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
        { productId: product.id, offerQty: 1 as const, price: share, nameAr: product.nameAr, accentColor: product.accentColor, bgColor: product.bgColor },
        { productId: naseej.id, offerQty: 1 as const, price: share, nameAr: naseej.nameAr, accentColor: naseej.accentColor, bgColor: naseej.bgColor },
        { productId: vitaflow.id, offerQty: 1 as const, price: last, nameAr: vitaflow.nameAr, accentColor: vitaflow.accentColor, bgColor: vitaflow.bgColor },
      ] satisfies OrderSummaryItem[],
      total: combo,
      label: 'باك المساحيق الثلاثي',
    }
  }
  const price = getPriceForQty(selectedQty, PRODUCT_ID)
  return {
    items: [{ product_id: PRODUCT_ID, offer_qty: selectedQty }] satisfies PlaceOrderLine[],
    summaryItems: [{
      productId: product.id,
      offerQty: selectedQty,
      price,
      nameAr: product.nameAr,
      accentColor: product.accentColor,
      bgColor: product.bgColor,
    }] satisfies OrderSummaryItem[],
    total: price,
    label: selectedQty === 1 ? 'عبوة واحدة' : selectedQty === 2 ? 'عبوتان' : '3 عبوات',
  }
}

function StoryBlock({
  src,
  title,
  sub,
  priority,
  onTap,
}: {
  src: string
  title: string
  sub: string
  priority?: boolean
  onTap?: () => void
}) {
  const inner = (
    <div className="relative aspect-square w-full overflow-hidden bg-[#f5f0ee]">
      <Image src={src} alt={title} fill priority={priority} sizes="(max-width:640px) 100vw, 672px" className="object-cover object-center" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1a1815]/75 via-[#1a1815]/15 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
        <h2 className="text-xl font-black leading-tight text-white sm:text-2xl">{title}</h2>
        <p className="mt-1.5 text-sm font-medium text-white/90">{sub}</p>
      </div>
    </div>
  )
  if (onTap) {
    return (
      <button type="button" onClick={onTap} className="block w-full">
        {inner}
      </button>
    )
  }
  return inner
}

export default function ShahrHadiProductPage() {
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

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  })

  const cart = useMemo(() => (product ? buildCart(packMode, selectedQty, product) : null), [packMode, selectedQty, product])
  const upsell = useMemo(() => (cart ? getBestUpsell(cart.items.map((i) => i.product_id)) : null), [cart])

  useEffect(() => {
    if (!product) return
    trackViewContent({ content_ids: [product.id], value: getPriceForQty(1, product.id), currency: 'SAR' })
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
      const result = await placeCodOrder({
        base: getPublicApiBase(),
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

  if (!product) return null
  const entryPrice = getPriceForQty(1, PRODUCT_ID)

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
    if (upsell) setShowUpsell(true)
    else void finalizeOrder(data, false)
  }

  return (
    <div className="min-h-screen bg-[#faf8f9]" dir="rtl">
      <header className="sticky top-0 z-40 border-b border-[#e8dcd8]/80 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-lg items-center justify-between gap-3 px-4 py-2.5 sm:max-w-2xl">
          <Link href="/" className="shrink-0">
            <Image src="/nabta-lab-brand.png" alt="نبتة لابو" width={112} height={36} className="h-8 w-auto" />
          </Link>
          <span className="rounded-full bg-[#f1e6e4] px-3 py-1 text-[10px] font-black text-[#b8485c]">💵 COD · 🇸🇦</span>
        </div>
      </header>

      <div className="mx-auto max-w-lg sm:max-w-2xl">
        <StoryBlock {...STORY[0]!} priority onTap={scrollToOrder} />

        <div className="px-4 sm:px-6">
          <section className="-mt-5 relative z-10 rounded-3xl border border-border/60 bg-white p-5 shadow-lg sm:p-6">
            <StarRating rating={product.rating} count={1247} size="lg" accentColor={ACCENT} />
            <p className="mt-2 text-sm font-semibold text-muted">+1,200 عميلة · شهر هادئ</p>
            <p className="mt-3 text-4xl font-black tabular-nums" style={{ color: ACCENT }}>
              {formatSarCompact(cart?.total ?? entryPrice)}
            </p>
          </section>

          {packMode === 'single' && (
            <section className="mt-5">
              <h2 className="text-lg font-black text-charcoal">اختاري عرضك</h2>
              <div className="mt-3 flex flex-col gap-2">
                {OFFERS.map((offer) => {
                  const active = selectedQty === offer.qty
                  const price = getPriceForQty(offer.qty, PRODUCT_ID)
                  return (
                    <button
                      key={offer.qty}
                      type="button"
                      onClick={() => setSelectedQty(offer.qty)}
                      className={`relative rounded-2xl border-2 p-4 text-right ${active ? 'border-[#b8485c] bg-[#fdf6f5]' : 'border-border bg-white'}`}
                    >
                      {offer.badge && (
                        <span className="absolute -top-2.5 left-4 rounded-full px-3 py-0.5 text-[10px] font-black text-white" style={{ background: ACCENT }}>
                          {offer.badge}
                        </span>
                      )}
                      <div className="flex justify-between gap-3">
                        <div>
                          <p className="font-black">{offer.label}</p>
                          <p className="text-xs text-muted">{offer.sub}</p>
                        </div>
                        <div className="text-left">
                          <p className="text-xl font-black tabular-nums text-[#b8485c]">{formatSarCompact(price)}</p>
                          <p className="text-xs text-muted line-through">{formatSarCompact(offer.compare)}</p>
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </section>
          )}

          <section ref={orderRef} id="order" className="mt-5 scroll-mt-16 rounded-3xl border-2 border-[#b8485c]/25 bg-white p-5 shadow-lg">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-black">اطلبي الآن — COD</h2>
              <span className="rounded-full bg-red-50 px-2 py-1 text-[10px] font-black text-red-600">🔥 {stockLeft} متبقية</span>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-3">
              <input {...register('name')} placeholder="اسمك الكريم" className="w-full rounded-xl border-2 border-gray-200 px-4 py-3.5 outline-none focus:border-[#b8485c]" />
              {errors.name && <p className="text-xs text-red-600">{errors.name.message}</p>}
              <input {...register('phone')} type="tel" dir="ltr" placeholder="05XXXXXXXX" className="w-full rounded-xl border-2 border-gray-200 px-4 py-3.5 text-left outline-none focus:border-[#b8485c]" />
              {errors.phone && <p className="text-xs text-red-600">{errors.phone.message}</p>}
              {checkoutError && <p className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700">{checkoutError}</p>}
              <button
                type="submit"
                disabled={isSubmitting || placingOrder}
                className="w-full rounded-full py-4 text-lg font-black text-white disabled:opacity-60"
                style={getProductSolidButtonStyle(ACCENT)}
              >
                {placingOrder || isSubmitting ? 'جاري الإرسال…' : `تأكيد الطلب · ${formatSarAmount(cart?.total ?? entryPrice)}`}
              </button>
            </form>
          </section>
        </div>

        {STORY.slice(1).map((block) => (
          <StoryBlock key={block.src} {...block} onTap={scrollToOrder} />
        ))}

        <div className="px-4 py-8 sm:px-6">
          <h2 className="text-lg font-black text-charcoal">أسئلة شائعة</h2>
          <div className="mt-3 flex flex-col gap-2">
            {FAQS.map((f, i) => (
              <div key={f.q} className="overflow-hidden rounded-2xl border bg-white">
                <button type="button" onClick={() => setOpenFaq(openFaq === i ? null : i)} className="flex w-full justify-between px-4 py-3 font-bold">
                  <span>{f.q}</span>
                  <span>{openFaq === i ? '−' : '+'}</span>
                </button>
                {openFaq === i && <p className="border-t px-4 py-3 text-sm text-muted">{f.a}</p>}
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={scrollToOrder}
            className="mt-6 flex min-h-[3.25rem] w-full items-center justify-center rounded-2xl text-lg font-black text-white"
            style={getProductSolidButtonStyle(ACCENT)}
          >
            اطلبي · {formatSarCompact(cart?.total ?? entryPrice)} · COD
          </button>
          <p className="mt-3 text-center text-[11px] text-muted">مكمّل غذائي SFDA — مو علاج طبي</p>
        </div>
      </div>

      {showSticky && (
        <div className="fixed inset-x-0 bottom-0 z-50 mx-auto max-w-lg border-t bg-white/95 p-3 pb-[max(12px,env(safe-area-inset-bottom))] backdrop-blur-md">
          <button type="button" onClick={scrollToOrder} className="flex min-h-[3rem] w-full items-center justify-center rounded-full font-bold text-white" style={getProductSolidButtonStyle(ACCENT)}>
            اطلبي · {formatSarCompact(cart?.total ?? entryPrice)} · COD
          </button>
        </div>
      )}
    </div>
  )
}
