'use client'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { PRODUCTS, type Product, formatSarAmount, getPriceForQty, isProductAvailable } from '@/lib/products'
import { getPublicApiBase } from '@/lib/api'
import { ensureSheetDelivery } from '@/lib/sheet-ensure'
import { ensureCodNetworkDelivery } from '@/lib/cod-ensure'
import { ensureLeadCapi } from '@/lib/lead-capi-ensure'
import {
  setTrackingUser,
  trackLead,
  trackPurchase,
  whenFbqReady,
} from '@/lib/tracking/client'
import { isRiyadhCallWindow } from '@/lib/riyadh-hours'

type OrderItem = {
  productId: string
  offerQty: number
  price: number
  nameAr: string
  accentColor?: string
}

type OrderData = {
  name: string
  phone: string
  items: OrderItem[]
  total: number
  upsellAccepted: boolean
  upsellProduct: { id: string; nameAr: string } | null
  upsellPrice: number
  finalTotal: number
  createdAt: string
  orderNumber?: string
  orderId?: string
  purchaseEventId?: string
  leadEventId?: string
}

function qtyLabel(q: number) {
  if (q === 1) return 'قطعة واحدة'
  if (q === 2) return 'قطعتين'
  return `${q} قطع`
}

function productTone(accent?: string): string {
  if (!accent) return '#b8485c'
  return accent
}

function IconSuccess({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="1.5" className="text-authority/25" />
      <path
        d="M12 20.5l5 5L29 14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-authority"
      />
    </svg>
  )
}

function IconPhone({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path
        d="M6.5 4.5h3l1.2 3.2-2.1 1.2a12.1 12.1 0 006.6 6.6l1.2-2.1 3.2 1.2v3c0 .8-.6 1.5-1.4 1.6-4.8.5-14.5-9.2-14-14 .1-.8.8-1.4 1.6-1.4z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function IconCopy({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path
        d="M8 8V5a2 2 0 012-2h9a2 2 0 012 2v11a2 2 0 01-2 2h-3M8 8H5a2 2 0 00-2 2v11a2 2 0 002 2h9a2 2 0 002-2v-3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function readStoredOrder(): OrderData | null {
  if (typeof window === 'undefined') return null
  const raw = sessionStorage.getItem('nabtalabo_order')
  if (!raw) return null
  try {
    return JSON.parse(raw) as OrderData
  } catch {
    return null
  }
}

function productCardImage(product: Product): string {
  return product.homeCardImage ?? product.coverImage
}

export default function ThankYouPage() {
  const [order, setOrder] = useState<OrderData | null>(() => readStoredOrder())
  const [hydrated, setHydrated] = useState(() => typeof window !== 'undefined')
  const [copied, setCopied] = useState(false)
  const pixelsFired = useRef(false)
  const sheetEnsured = useRef(false)
  const codEnsured = useRef(false)
  const leadCapiEnsured = useRef(false)

  useEffect(() => {
    setOrder(readStoredOrder())
    setHydrated(true)
  }, [])

  const copyOrderRef = useCallback(async () => {
    const ref = order?.orderNumber?.trim()
    if (!ref || typeof navigator === 'undefined' || !navigator.clipboard) return
    try {
      await navigator.clipboard.writeText(ref)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2200)
    } catch {
      /* ignore */
    }
  }, [order?.orderNumber])

  const callWindowOk = order ? isRiyadhCallWindow(new Date(order.createdAt)) : false

  const orderedIds = useMemo(() => {
    if (!order) return []
    const ids = order.items.map((i) => i.productId)
    if (order.upsellAccepted && order.upsellProduct) ids.push(order.upsellProduct.id)
    return ids
  }, [order])

  const recommendations = useMemo(
    () => PRODUCTS.filter((p) => isProductAvailable(p) && !orderedIds.includes(p.id)),
    [orderedIds],
  )

  const suggestedExtras = useMemo(() => {
    if (!order) return [] as Product[]
    const seen = new Set<string>()
    const out: Product[] = []
    for (const i of order.items) {
      const p = PRODUCTS.find((x) => x.id === i.productId)
      if (!p) continue
      for (const id of p.crossSells) {
        if (seen.has(id) || orderedIds.includes(id)) continue
        const add = PRODUCTS.find((x) => x.id === id)
        if (isProductAvailable(add) && !seen.has(add.id)) {
          seen.add(add.id)
          out.push(add)
        }
      }
    }
    return out.slice(0, 3)
  }, [order, orderedIds])

  useEffect(() => {
    if (!order) return
    if (!order.purchaseEventId || !order.leadEventId) return

    const firedKey = 'nabtalabo_pixels_fired'
    const firedFor = sessionStorage.getItem(firedKey)
    if (firedFor === order.purchaseEventId) return

    if (pixelsFired.current) return
    pixelsFired.current = true

    const contentIds = order.items.map((i) => i.productId)
    if (order.upsellAccepted && order.upsellProduct) {
      contentIds.push(order.upsellProduct.id)
    }
    const commerce = {
      content_ids: contentIds,
      value: Number(order.finalTotal) || 0,
      currency: 'SAR' as const,
      num_items: contentIds.length,
    }

    setTrackingUser({ phone: order.phone })

    // Lead + Purchase fire only on thank-you — never on checkout form open.
    // TikTok/Snap fire immediately; Meta waits for fbq via whenFbqReady inside track*.
    trackPurchase(commerce, {
      eventId: order.purchaseEventId,
      orderNumber: order.orderNumber,
    })
    trackLead(commerce, { eventId: order.leadEventId })

    // Mark fired only once Meta stub/fbq exists — if pixel never loads, refresh can retry.
    return whenFbqReady(() => {
      if (typeof window.fbq !== 'function') return
      try {
        sessionStorage.setItem(firedKey, order.purchaseEventId!)
      } catch {
        /* ignore */
      }
    })
  }, [order])

  useEffect(() => {
    if (!order?.orderId || !order.leadEventId) return
    if (leadCapiEnsured.current) return
    leadCapiEnsured.current = true

    const base = getPublicApiBase()
    void ensureLeadCapi(base, order.orderId, order.leadEventId)
  }, [order])

  useEffect(() => {
    if (!order?.orderId || !order.leadEventId) return
    if (sheetEnsured.current) return
    sheetEnsured.current = true

    const base = getPublicApiBase()
    void ensureSheetDelivery(base, order.orderId, order.leadEventId)
  }, [order])

  useEffect(() => {
    if (!order?.orderId || !order.leadEventId) return
    if (codEnsured.current) return
    codEnsured.current = true

    const base = getPublicApiBase()
    void ensureCodNetworkDelivery(base, order.orderId, order.leadEventId)
  }, [order])

  if (!hydrated) {
    return null
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-canvas px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-md rounded-[1.75rem] border border-border bg-white px-6 py-10 text-center shadow-[var(--shadow-card)]">
          <p className="text-lg font-semibold text-charcoal">لم نعثر على تفاصيل الطلب</p>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            قد يحدث ذلك عند فتح الرابط مباشرة، أو إن لم يُكمَّل الطلب. يمكنك العودة للمتجر أو التواصل معنا إن لزم.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/products"
              className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-primary px-6 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
            >
              المنتجات
            </Link>
            <Link
              href="/"
              className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-border bg-white px-6 text-sm font-semibold text-charcoal hover:bg-peach-tint/40"
            >
              الرئيسية
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const fromPrice = formatSarAmount(getPriceForQty(1))

  return (
    <div className="min-h-screen bg-canvas pb-24 pt-6 sm:pb-28 sm:pt-10 md:pb-12">
      <div className="mx-auto max-w-lg px-4 sm:px-5">
        {/* بطاقة تأكيد واحدة — أسلوب هادئ */}
        <article className="overflow-hidden rounded-[1.75rem] border border-border/90 bg-white shadow-[var(--shadow-card)] ring-1 ring-black/[0.03]">
          <div className="h-0.5 bg-gradient-to-l from-authority/90 to-primary/60" aria-hidden />
          <div className="px-6 pb-8 pt-8 text-center sm:px-8 sm:pt-10">
            <div className="mx-auto flex h-16 w-16 items-center justify-center text-authority">
              <IconSuccess className="h-16 w-16" />
            </div>
            <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">نبتة لابو</p>
            <h1 className="mt-2 text-xl font-semibold leading-snug text-charcoal sm:text-2xl">شكرًا — تم تسجيل طلبك</h1>
            <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-muted">
              سيتواصل معك فريقنا لتأكيد العنوان وموعد التوصيل. الدفع عند الاستلام فقط، دون بطاقة أو دفع مسبق.
            </p>

            {order.orderNumber ? (
              <div className="mx-auto mt-7 max-w-sm rounded-2xl border border-border bg-canvas/80 px-4 py-3">
                <p className="text-[11px] font-medium text-muted">رقم المرجع</p>
                <p className="mt-1 font-mono text-base font-medium tracking-tight text-charcoal sm:text-lg" dir="ltr">
                  {order.orderNumber}
                </p>
                <button
                  type="button"
                  onClick={() => void copyOrderRef()}
                  className="mt-3 inline-flex w-full min-h-[44px] items-center justify-center gap-2 rounded-xl border border-border bg-white text-sm font-semibold text-charcoal transition-colors hover:border-authority/30 hover:bg-peach-tint/30"
                >
                  <IconCopy className="h-4 w-4 text-muted" />
                  {copied ? 'تم النسخ' : 'نسخ الرقم'}
                </button>
              </div>
            ) : null}
          </div>

          <div className="border-t border-border/80 bg-peach-tint/25 px-6 py-5 sm:px-8">
            <div className="flex gap-3 text-start">
              <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-authority shadow-sm ring-1 ring-border/60">
                <IconPhone className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-charcoal">انتبهي لاتصال التأكيد</p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">
                  قد يظهر الرقم غير مسجّل؛ هو من نبتة لابو. الرد يسرّع تأكيد الطلب وتجهيزه قبل الشحن.
                </p>
              </div>
            </div>
          </div>
        </article>

        {/* نافذة الاتصال */}
        <div
          className={`mt-5 rounded-2xl border px-5 py-4 sm:px-6 sm:py-5 ${
            callWindowOk ? 'border-authority/20 bg-white' : 'border-amber-200/60 bg-amber-50/40'
          }`}
        >
          <p className={`text-sm font-semibold ${callWindowOk ? 'text-authority' : 'text-amber-950'}`}>
            {callWindowOk
              ? 'ضمن ساعات العمل: نتصل لتأكيد الطلب قريبًا'
              : 'خارج ساعات الاتصال — متابعة في أول وقت عمل'}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            {callWindowOk ? (
              <>
                الساعات (بتوقيت السعودية): <span className="font-medium text-charcoal">9 ص — 9 م</span>. استعدي للرد على
                الرقم الذي أدخلتِه مع الطلب.
              </>
            ) : (
              <>
                سيتابع الفريق الطلب ويتصل <span className="font-medium text-charcoal">في صباح يوم العمل التالي</span> ضمن
                نفس الساعات.
              </>
            )}
          </p>
        </div>

        {/* ملخص */}
        <section className="mt-8 rounded-[1.75rem] border border-border bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-base font-semibold text-charcoal">ملخص الطلب</h2>
          <p className="mt-1 text-xs text-muted">الكميات والمبالغ كما وُجدت عند الإتمام</p>

          <ul className="mt-5 flex flex-col gap-3">
            {order.items.map((item) => {
              const accent = productTone(item.accentColor)
              return (
                <li
                  key={item.productId}
                  className="flex flex-wrap items-start justify-between gap-3 rounded-xl border border-border/70 bg-[#faf9f8] px-4 py-3.5"
                >
                  <div className="min-w-0 flex-1 text-start">
                    <p className="text-sm font-medium text-charcoal sm:text-[15px]">{item.nameAr}</p>
                    <span
                      className="mt-2 inline-block rounded-full px-2.5 py-0.5 text-[10px] font-semibold text-charcoal ring-1 ring-border/80"
                      style={{ background: `${accent}12` }}
                    >
                      {qtyLabel(item.offerQty)}
                    </span>
                  </div>
                  <p className="sar-price shrink-0 text-sm font-semibold tabular-nums text-primary sm:text-base" dir="ltr">
                    {formatSarAmount(item.price)}
                  </p>
                </li>
              )
            })}
          </ul>

          {order.upsellAccepted && order.upsellProduct && (
            <div className="mt-3 rounded-xl border border-primary/25 bg-peach-tint/50 px-4 py-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="min-w-0 text-start">
                  <span className="text-[10px] font-semibold text-primary">عرض إضافي</span>
                  <p className="mt-0.5 text-sm font-medium text-charcoal">{order.upsellProduct.nameAr}</p>
                </div>
                <p className="sar-price text-sm font-semibold tabular-nums text-primary" dir="ltr">
                  {formatSarAmount(order.upsellPrice)}
                </p>
              </div>
            </div>
          )}

          <div className="mt-6 border-t border-border/80 pt-5">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <span className="text-sm font-medium text-muted">الإجمالي</span>
              <span className="sar-price text-2xl font-semibold tabular-nums text-primary sm:text-3xl" dir="ltr">
                {formatSarAmount(order.finalTotal)}
              </span>
            </div>
            <p className="mt-4 rounded-xl border border-authority/15 bg-authority/[0.04] px-4 py-3 text-sm leading-relaxed text-charcoal">
              <span className="font-medium text-authority">دفع عند الاستلام</span>
              <span className="text-muted"> — تُسدد القيمة نقدًا عند التسليم.</span>
            </p>
          </div>
        </section>

        {/* خطوات مختصرة */}
        <section className="mt-6 rounded-[1.75rem] border border-border bg-white p-5 sm:p-6">
          <h2 className="text-base font-semibold text-charcoal">ماذا بعد؟</h2>
          <ol className="mt-4 space-y-3 text-start text-sm text-muted">
            {[
              'مكالمة قصيرة: تأكيد العنوان والموعد.',
              'تجهيز الطلب وفق المتفق عليه.',
              'توصيل داخل المملكة — الدفع كاش عند الاستلام.',
            ].map((line, i) => (
              <li key={line} className="flex gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-peach-soft text-xs font-semibold text-primary">
                  {i + 1}
                </span>
                <span className="min-w-0 pt-0.5 leading-relaxed">{line}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* ثقة — سطر واحد */}
        <p className="mt-6 text-center text-xs leading-relaxed text-muted">
          مكمّلات غذائية مرخّصة · دفع عند الاستلام · متابعة واضحة قبل الشحن
        </p>

        {suggestedExtras.length > 0 && (
          <section className="mt-8 rounded-[1.75rem] border border-border bg-white p-5 shadow-sm sm:p-6">
            <h2 className="text-base font-semibold text-charcoal">تكمّل طلبك</h2>
            <p className="mt-1 text-xs text-muted">من الموقع الآن، أو عبر المكالمة إن رغبتِ</p>
            <div className="mt-4 flex flex-col gap-2.5">
              {suggestedExtras.map((p) => (
                <SuggestedRow key={`x-${p.id}`} product={p} fromPrice={fromPrice} />
              ))}
            </div>
          </section>
        )}

        {recommendations.length > 0 ? (
          <section className="mt-10 pb-4">
            <h2 className="text-center text-lg font-semibold text-charcoal sm:text-xl">منتجات أخرى من المتجر</h2>
            <p className="mx-auto mt-2 max-w-md text-center text-xs text-muted sm:text-sm">
              نفس نظام التوصيل والدفع عند الاستلام. لطلب إضافي يُعامل كطلب منفصل.
            </p>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              {recommendations.map((p) => (
                <ThankYouMiniCard key={p.id} product={p} fromPrice={fromPrice} />
              ))}
            </div>
          </section>
        ) : (
          <section className="mt-10 rounded-[1.75rem] border border-border bg-white px-6 py-10 text-center">
            <p className="font-semibold text-charcoal">شكرًا — لديكِ كل ما في الكتالوج الحالي</p>
            <p className="mx-auto mt-2 max-w-sm text-sm text-muted">في زيارة لاحقة يمكنك استكشاف العروض أو الهدايا.</p>
            <Link
              href="/products"
              className="mt-6 inline-flex min-h-[48px] items-center justify-center rounded-xl bg-primary px-8 text-sm font-semibold text-white hover:bg-primary-dark"
            >
              المنتجات
            </Link>
          </section>
        )}

        <nav className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 border-t border-border/60 pt-8 text-sm">
          <Link href="/products" className="font-medium text-primary hover:underline">
            متجر المنتجات
          </Link>
          <Link href="/contact" className="font-medium text-charcoal underline-offset-4 hover:underline">
            تواصل معنا
          </Link>
          <Link href="/" className="font-medium text-muted hover:text-charcoal">
            الرئيسية
          </Link>
        </nav>
      </div>

      {/* شريط خفيف — موبايل فقط */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border/70 bg-white/95 px-4 py-2.5 backdrop-blur-md supports-[backdrop-filter]:bg-white/90 pb-[max(0.5rem,env(safe-area-inset-bottom))] md:hidden">
        <div className="mx-auto flex max-w-lg gap-2">
          <Link
            href="/products"
            className="flex min-h-[44px] flex-1 items-center justify-center rounded-xl bg-primary text-sm font-semibold text-white hover:bg-primary-dark"
          >
            المنتجات
          </Link>
          <Link
            href="/"
            className="flex min-h-[44px] min-w-[5.5rem] items-center justify-center rounded-xl border border-border bg-white text-sm font-medium text-charcoal hover:bg-peach-tint/40"
          >
            الرئيسية
          </Link>
        </div>
      </div>
    </div>
  )
}

function SuggestedRow({ product, fromPrice }: { product: Product; fromPrice: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border/80 bg-white px-3 py-2.5">
      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg border border-border/60 bg-peach-soft/30">
        <Image src={productCardImage(product)} alt={product.nameAr} fill className="object-cover" sizes="56px" />
      </div>
      <div className="min-w-0 flex-1 text-start">
        <p className="truncate text-sm font-medium text-charcoal">{product.nameAr}</p>
        <p className="truncate text-[11px] text-muted">{product.subtitleAr}</p>
        <p className="mt-0.5 text-[11px] text-authority">من {fromPrice}</p>
      </div>
      <Link
        href={`/products/${product.slug}`}
        className="shrink-0 rounded-lg border border-border bg-white px-3 py-2 text-xs font-semibold text-charcoal transition-colors hover:border-primary/40 hover:bg-peach-tint/30"
      >
        التفاصيل
      </Link>
    </div>
  )
}

function ThankYouMiniCard({ product, fromPrice }: { product: Product; fromPrice: string }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-[1.35rem] border border-border bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="relative aspect-[4/3] w-full shrink-0 bg-peach-soft/35">
        <Image
          src={productCardImage(product)}
          alt={product.nameAr}
          fill
          className="object-cover"
          sizes="(max-width:640px) 100vw, 50vw"
        />
      </div>
      <div className="flex flex-1 flex-col p-4 text-start">
        <p className="text-[10px] font-semibold uppercase tracking-wide text-authority">{product.badgeAr}</p>
        <h3 className="mt-1 line-clamp-2 text-sm font-semibold leading-snug text-charcoal">{product.nameAr}</h3>
        <p className="mt-1 line-clamp-2 flex-1 text-[11px] leading-relaxed text-muted">{product.subtitleAr}</p>
        <p className="mt-2 text-xs">
          <span className="sar-price font-semibold tabular-nums text-primary">{fromPrice}</span>
          <span className="mr-1.5 text-[10px] text-muted">قطعة</span>
        </p>
        <Link
          href={`/products/${product.slug}`}
          className="mt-3 flex min-h-[42px] w-full items-center justify-center rounded-xl border border-charcoal/15 bg-charcoal text-center text-xs font-semibold text-white hover:bg-charcoal/90"
        >
          عرض المنتج
        </Link>
      </div>
    </article>
  )
}
