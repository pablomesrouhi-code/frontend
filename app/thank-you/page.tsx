'use client'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { PRODUCTS, type Product, formatSarAmount, getPriceForQty } from '@/lib/products'
import {
  newTrackingEventId,
  trackMeta,
  trackSnap,
  trackTikTok,
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
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <circle cx="24" cy="24" r="22" fill="currentColor" fillOpacity="0.12" />
      <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="2" strokeOpacity="0.35" />
      <path
        d="M15 24.5l6 6L34 18"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
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
        strokeWidth="1.6"
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
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function ThankYouPage() {
  const [order, setOrder] = useState<OrderData | null>(null)
  const [hydrated, setHydrated] = useState(false)
  const [copied, setCopied] = useState(false)
  const pixelsFired = useRef(false)

  useEffect(() => {
    const raw = sessionStorage.getItem('nabtalabo_order')
    if (raw) {
      try {
        setOrder(JSON.parse(raw))
      } catch {
        /* ignore */
      }
    }
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
    () => PRODUCTS.filter((p) => !orderedIds.includes(p.id)),
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
        if (add && !seen.has(add.id)) {
          seen.add(add.id)
          out.push(add)
        }
      }
    }
    return out.slice(0, 3)
  }, [order, orderedIds])

  useEffect(() => {
    if (!order) return

    const contentIds = order.items.map((i) => i.productId)
    if (order.upsellAccepted && order.upsellProduct) {
      contentIds.push(order.upsellProduct.id)
    }
    const base = {
      value: order.finalTotal,
      currency: 'SAR',
      content_ids: contentIds,
      content_type: 'product',
    }

    const cancel = whenFbqReady(() => {
      if (pixelsFired.current) return
      pixelsFired.current = true
      const purchaseEid = newTrackingEventId()
      const leadEid = newTrackingEventId()
      trackMeta('Purchase', base, { eventID: purchaseEid })
      trackMeta('Lead', base, { eventID: leadEid })

      trackTikTok('CompletePayment', {
        value: order.finalTotal,
        currency: 'SAR',
        content_id: contentIds.join(','),
      })
      trackSnap('PURCHASE', { price: order.finalTotal, currency: 'SAR' })
    })

    return cancel
  }, [order])

  if (!hydrated) {
    return (
      <div className="min-h-screen bg-canvas px-4 pb-28 pt-8">
        <div className="mx-auto max-w-2xl animate-pulse space-y-4">
          <div className="h-36 rounded-3xl bg-white/80 ring-1 ring-border/80" />
          <div className="h-24 rounded-2xl bg-white/60 ring-1 ring-border/60" />
          <div className="h-64 rounded-3xl bg-white/70 ring-1 ring-border/70" />
        </div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-canvas px-4 py-12">
        <div className="mx-auto max-w-xl rounded-3xl border border-amber-200/90 bg-white px-6 py-10 text-center shadow-sm ring-1 ring-amber-100">
          <p className="mb-2 text-lg font-black text-charcoal">ما لقيناش تفاصيل الطلب</p>
          <p className="mb-6 text-sm leading-relaxed text-muted">
            غالباً الصفحة تفتحت من رابط مباشر، أو الطلب ما اكتملش بنجاح. رجعي للمتجر وأكملي الطلب، أو تواصلي معنا إذا
            دفعتي وتأكدتي من الخطأ.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/products"
              className="inline-flex min-h-[48px] items-center justify-center rounded-2xl bg-primary px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-primary-dark"
            >
              تصفّح المنتجات
            </Link>
            <Link
              href="/"
              className="inline-flex min-h-[48px] items-center justify-center rounded-2xl border border-border bg-white px-6 py-3 text-sm font-bold text-charcoal hover:bg-peach-tint/50"
            >
              الصفحة الرئيسية
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const fromPrice = formatSarAmount(getPriceForQty(1))

  return (
    <div className="min-h-screen bg-canvas pb-[max(7.5rem,env(safe-area-inset-bottom,0px)+6rem)] pt-2">
      {/* Conversion: أهم رسالة أولاً */}
      <div className="mx-auto mb-5 max-w-2xl px-4 sm:px-6">
        <div className="overflow-hidden rounded-2xl border border-authority/25 bg-white shadow-[0_8px_28px_-12px_rgba(20,107,112,0.2)] ring-1 ring-black/[0.02]">
          <div className="h-1 bg-gradient-to-l from-authority to-primary/80" aria-hidden />
          <div className="flex items-start gap-3 px-4 py-4 sm:gap-4 sm:px-5 sm:py-5">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-authority/10 text-authority sm:h-14 sm:w-14">
              <IconPhone className="h-6 w-6 sm:h-7 sm:w-7" />
            </span>
            <div className="min-w-0 flex-1 text-right">
              <p className="text-base font-black leading-snug text-charcoal sm:text-lg">ردّي على اتصال التأكيد — هادي أهم خطوة</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                الرقم قد يبان غير مسجّل: فريق <strong className="text-charcoal">نبتة لابو</strong> كيتصل باش يثبّت{' '}
                <strong className="text-charcoal">العنوان</strong> و<strong className="text-charcoal">موعد التوصيل</strong> قبل
                الشحن (دفع عند الاستلام). ردّ سريع = تأكيد أسرع وتجهيز أنظف.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <div className="mb-6 overflow-hidden rounded-3xl border border-border/90 bg-white shadow-[0_12px_40px_-18px_rgba(26,25,21,0.12)] ring-1 ring-black/[0.03]">
          <div className="bg-gradient-to-br from-primary via-primary to-primary-dark px-6 pb-8 pt-10 text-center text-white sm:px-10 sm:pb-10 sm:pt-12">
            <div className="mx-auto mb-5 flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full bg-white/20 text-white shadow-inner backdrop-blur-sm sm:h-20 sm:w-20">
              <IconSuccess className="h-14 w-14 sm:h-16 sm:w-16" />
            </div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/75">Nabta Labo</p>
            <h1 className="mt-2 text-2xl font-black leading-tight sm:text-3xl">تم استلام طلبك — شكرًا على ثقتك</h1>
            <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-white/90 sm:text-base">
              الطلب مسجّل عندنا. غادي نتواصلو معاك باش نأكدو التفاصيل؛ الدفع كاش عند الاستلام فقط — بلا بطاقة ولا دفع مسبق.
            </p>
            {order.orderNumber ? (
              <div className="mt-6 flex flex-col items-center gap-2 sm:flex-row sm:justify-center sm:gap-3">
                <p
                  className="inline-flex flex-wrap items-center justify-center gap-2 rounded-2xl bg-black/20 px-4 py-2.5 text-[13px] text-white backdrop-blur-sm"
                  dir="ltr"
                >
                  <span className="text-white/80">رقم المرجع</span>
                  <strong className="font-mono text-sm tracking-tight text-white sm:text-base">{order.orderNumber}</strong>
                </p>
                <button
                  type="button"
                  onClick={() => void copyOrderRef()}
                  className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-2xl border border-white/40 bg-white/15 px-4 py-2 text-sm font-bold text-white transition-[background-color,border-color] hover:bg-white/25"
                >
                  <IconCopy className="h-4 w-4 shrink-0 opacity-90" />
                  {copied ? 'تم النسخ' : 'نسخ رقم الطلب'}
                </button>
              </div>
            ) : null}
          </div>
        </div>

        <div
          className={`mb-6 rounded-2xl border px-5 py-4 sm:py-5 ${
            callWindowOk
              ? 'border-teal-200/90 bg-gradient-to-br from-teal-50/95 to-white'
              : 'border-amber-200/90 bg-gradient-to-br from-amber-50/90 to-white'
          }`}
        >
          <p className={`text-base font-black ${callWindowOk ? 'text-authority' : 'text-amber-900'}`}>
            {callWindowOk ? 'نتصل لتأكيد الطلب خلال دقائق (تقريبًا)' : 'طلبك خارج ساعات الاتصال المباشر'}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            {callWindowOk ? (
              <>
                ساعات المتابعة (بتوقيت السعودية): <strong className="text-charcoal">9 ص — 9 م</strong>. إذا الطلب دابا ضمن
                النافذة، استعدي لرنة من فريق نبتة لابو على الرقم اللي سجّلتي به.
              </>
            ) : (
              <>
                غادي نتابع الطلب وبإذن الله تتواصلي معاك <strong className="text-charcoal">فصباح يوم العمل الجاي</strong>{' '}
                ضمن نفس الساعات (9 ص — 9 م، توقيت السعودية).
              </>
            )}
          </p>
          <ul className="mt-4 space-y-2 text-right text-sm text-muted">
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-authority">✓</span>
              <span>ما كنطلبوش بيانات بطاقة؛ المكالمة للعنوان والموعد قبل الشحن.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-authority">✓</span>
              <span>عندك استعجال؟ صفحة «تواصل معنا» — ذكّري برقم المرجع فوق.</span>
            </li>
          </ul>
        </div>

        <div className="mb-6 rounded-3xl border border-border bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-5 flex flex-col gap-1 border-b border-border pb-4 text-right">
            <h2 className="text-lg font-black text-charcoal sm:text-xl">ملخص الطلب</h2>
            <p className="text-xs text-muted">الكميات والأسعار كما تم اعتمادها عند الإرسال</p>
          </div>

          <ul className="flex flex-col gap-4">
            {order.items.map((item) => {
              const accent = productTone(item.accentColor)
              return (
                <li
                  key={item.productId}
                  className="rounded-2xl border border-border/80 bg-[#fdfcfc] p-4 text-right shadow-[0_1px_6px_rgba(28,28,28,0.04)]"
                >
                  <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
                    <div className="min-w-0 flex-1">
                      <p className="break-words text-[15px] font-bold leading-snug text-charcoal sm:text-base">{item.nameAr}</p>
                      <span
                        className="mt-2 inline-block rounded-full px-3 py-1 text-[11px] font-bold text-charcoal ring-1 ring-border"
                        style={{ background: `${accent}14` }}
                      >
                        {qtyLabel(item.offerQty)}
                      </span>
                    </div>
                    <div className="shrink-0 text-left sm:text-right" dir="ltr">
                      <p className="sar-price whitespace-nowrap text-lg font-black tabular-nums text-primary sm:text-xl">
                        {formatSarAmount(item.price)}
                      </p>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>

          {order.upsellAccepted && order.upsellProduct && (
            <div className="mt-4 rounded-2xl border border-primary/35 bg-peach-tint px-4 py-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="min-w-0 text-right">
                  <span className="mr-2 inline-block rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-bold text-primary">
                    عرض مكمّل
                  </span>
                  <p className="mt-1 break-words text-sm font-bold text-charcoal">{order.upsellProduct.nameAr}</p>
                </div>
                <p className="sar-price shrink-0 text-lg font-black tabular-nums text-primary" dir="ltr">
                  {formatSarAmount(order.upsellPrice)}
                </p>
              </div>
            </div>
          )}

          <div className="mt-6 flex flex-col gap-3 border-t border-border pt-5">
            <div className="flex flex-wrap items-end justify-between gap-2">
              <span className="text-base font-black text-charcoal">الإجمالي</span>
              <span className="sar-price text-3xl font-black tabular-nums text-primary" dir="ltr">
                {formatSarAmount(order.finalTotal)}
              </span>
            </div>
            <div className="rounded-2xl border border-authority/25 bg-authority/[0.06] px-4 py-3 text-sm leading-relaxed text-charcoal">
              <strong className="text-authority">دفع عند الاستلام</strong> فقط — القيمة تُدفع نقدًا عند تسليم الشحنة، بلا
              رسوم مسبقة على البطاقة.
            </div>
          </div>
        </div>

        <div className="mb-6 rounded-3xl border border-border bg-white p-5 shadow-sm sm:p-6">
          <h2 className="mb-5 text-lg font-black text-charcoal">ماذا يحدث بعد ذلك؟</h2>
          <ol className="space-y-4 text-right">
            {[
              {
                title: 'مكالمة تأكيد قصيرة',
                body: 'نثبت العنوان والملاحظات المهمة. ما محتاجين بطاقة — غير جواب واضح باش نكمّلو التجهيز.',
              },
              {
                title: 'تجهيز وترقيم للشحن',
                body: 'بعد الموافقة كنوجّو الطلب داخل المملكة بنفس الانضباط اللي كتشوفيه فالموقع.',
              },
              {
                title: 'توصيل + دفع كاش',
                body: 'تستلمي الشحنة حسب الموعد؛ الدفع كاش عند الاستلام. الالتزام بالجرعة حسب الغلاف يبقى أساس التجربة.',
              },
            ].map((step, idx) => (
              <li key={step.title} className="flex gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-peach-soft text-sm font-black text-primary">
                  {idx + 1}
                </span>
                <div className="min-w-0">
                  <p className="font-bold text-charcoal">{step.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="mb-6 rounded-3xl border border-border bg-gradient-to-br from-white to-peach-tint/40 p-5 sm:p-6">
          <h2 className="mb-4 text-lg font-black text-charcoal">ليش ترتاحي للمكالمة؟</h2>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl bg-white px-4 py-3 text-center shadow-sm ring-1 ring-border/70">
              <p className="text-2xl font-black tabular-nums text-authority">4.8</p>
              <p className="text-[11px] font-semibold leading-snug text-muted">متوسط تقييم تجارب عميلات</p>
            </div>
            <div className="rounded-2xl bg-white px-4 py-3 text-center shadow-sm ring-1 ring-border/70">
              <p className="text-lg font-black text-charcoal">SFDA</p>
              <p className="mt-1 text-[11px] font-semibold leading-snug text-muted">مكمّلات غذائية بترخيص وتصنيف واضح</p>
            </div>
            <div className="rounded-2xl bg-white px-4 py-3 text-center shadow-sm ring-1 ring-border/70">
              <p className="text-sm font-black text-charcoal">كاش عند الاستلام</p>
              <p className="mt-1 text-[11px] text-muted">بلا وسطاء دفع قبل التسليم</p>
            </div>
          </div>
          <div className="mt-5 rounded-2xl border border-border bg-white px-4 py-4">
            <div className="flex items-start gap-3">
              <span className="shrink-0 text-amber-500" aria-hidden>
                ★★★★★
              </span>
              <p className="min-w-0 text-sm italic leading-relaxed text-charcoal">
                «التنسيق قبل الشحن يعطي انطباع منظم؛ والالتزام بالروتين أسهل بلذعة.»
              </p>
            </div>
            <p className="mt-3 text-[11px] text-muted">تجربة عميلات — مكمّلات غذائية وفق الغلاف المعتمد</p>
          </div>
        </div>

        {suggestedExtras.length > 0 && (
          <div className="mb-8 rounded-3xl border border-authority/20 bg-white p-5 shadow-sm">
            <h2 className="mb-1 text-lg font-black text-charcoal">كمّلي الطلبية — قبل أو بعد المكالمة</h2>
            <p className="mb-4 text-sm leading-relaxed text-muted">
              هاد المنتجات كتكمّل اللي طلبتي. تقدري تزيدي من الموقع الآن، أو تطلبي الدمج وقت اتصال التأكيد إذا السماح
              بالمخزون.
            </p>
            <div className="flex flex-col gap-3">
              {suggestedExtras.map((p) => (
                <SuggestedRow key={`x-${p.id}`} product={p} fromPrice={fromPrice} />
              ))}
            </div>
          </div>
        )}

        {recommendations.length > 0 ? (
          <div className="mb-10">
            <h2 className="mb-2 text-center text-2xl font-black leading-snug text-charcoal sm:text-3xl">
              زيدي منتج قبل ما يوصل الطلب
            </h2>
            <p className="mx-auto mb-8 max-w-lg text-center text-sm leading-relaxed text-muted">
              نفس نظام الدفع عند الاستلام والتوصيل داخل المملكة. طلب جديد = تجهيز منفصل — من الأحسن تجمّعي اللي بغيتي
              قبل التأكيد إذا بغيتي توفّري على الشحن.
            </p>
            <div className="grid gap-6 sm:grid-cols-2">
              {recommendations.map((p) => (
                <div key={p.id} className="min-h-0">
                  <ThankYouMiniCard product={p} fromPrice={fromPrice} />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="mb-10 rounded-3xl border border-border bg-white p-8 text-center shadow-sm">
            <p className="text-lg font-black text-charcoal">جمعتي تشكيلة قوية</p>
            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted">
              في الزيارة الجاية جرّبي هدية أو قطع احتياطية؛ الدفع عند الاستلام كيبقى كما هو.
            </p>
            <Link
              href="/products"
              className="mt-6 inline-flex min-h-[48px] items-center justify-center rounded-full bg-primary px-8 py-3 text-sm font-bold text-white transition-colors hover:bg-primary-dark"
            >
              تصفّح كل المنتجات
            </Link>
          </div>
        )}

        <div className="flex flex-col items-stretch gap-3 pb-4 sm:flex-row sm:justify-center">
          <Link
            href="/products"
            className="inline-flex min-h-[48px] items-center justify-center rounded-2xl border border-border bg-white px-6 py-3 text-sm font-bold text-charcoal shadow-sm hover:bg-peach-tint/60"
          >
            متجر المنتجات
          </Link>
          <Link
            href="/contact"
            className="inline-flex min-h-[48px] items-center justify-center rounded-2xl bg-charcoal px-6 py-3 text-sm font-bold text-white hover:bg-charcoal/90"
          >
            تواصل بعد الطلب
          </Link>
        </div>
      </div>

      {/* شريط إجراءات ثابت — CRO */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border/80 bg-white/95 px-4 py-3 shadow-[0_-8px_32px_-12px_rgba(26,25,21,0.12)] backdrop-blur-md supports-[backdrop-filter]:bg-white/88 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <div className="mx-auto flex max-w-2xl gap-2 sm:gap-3">
          <Link
            href="/products"
            className="flex min-h-[48px] flex-[1.15] items-center justify-center rounded-2xl bg-primary px-3 text-center text-sm font-black text-white shadow-sm transition-colors hover:bg-primary-dark sm:text-base"
          >
            زيدي على طلبك
          </Link>
          <Link
            href="/"
            className="flex min-h-[48px] flex-1 items-center justify-center rounded-2xl border border-border bg-white px-3 text-center text-sm font-bold text-charcoal hover:bg-peach-tint/50 sm:text-base"
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
    <div className="flex items-center gap-3 rounded-2xl border border-border bg-peach-soft/25 p-3 sm:p-4">
      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-border bg-white">
        <Image src={product.coverImage} alt={product.nameAr} fill className="object-cover" sizes="64px" />
      </div>
      <div className="min-w-0 flex-1 text-right">
        <p className="truncate font-bold text-charcoal">{product.nameAr}</p>
        <p className="line-clamp-1 text-xs text-muted">{product.subtitleAr}</p>
        <p className="mt-1 text-[11px] font-semibold text-authority">من {fromPrice}</p>
      </div>
      <Link
        href={`/products/${product.slug}`}
        className="touch-manipulation shrink-0 rounded-2xl bg-primary px-4 py-2.5 text-xs font-black text-white shadow-sm transition-transform active:scale-[0.98] sm:px-5 sm:text-sm"
      >
        اطلبي
      </Link>
    </div>
  )
}

function ThankYouMiniCard({ product, fromPrice }: { product: Product; fromPrice: string }) {
  return (
    <article className="flex h-full min-h-[12rem] flex-col overflow-hidden rounded-3xl border border-border bg-white shadow-sm transition-[box-shadow,border-color] hover:border-authority/35 hover:shadow-md">
      <div className="relative aspect-[16/11] w-full shrink-0 bg-peach-soft/40">
        <Image
          src={product.coverImage}
          alt={product.nameAr}
          fill
          className="object-cover"
          sizes="(max-width:640px) 100vw, 50vw"
        />
      </div>
      <div className="flex flex-1 flex-col p-4 text-right">
        <p className="text-xs font-bold text-authority">{product.badgeAr}</p>
        <h3 className="mt-1 line-clamp-2 text-base font-black text-charcoal">{product.nameAr}</h3>
        <p className="mt-1 line-clamp-2 flex-1 text-xs leading-relaxed text-muted">{product.subtitleAr}</p>
        <p className="mt-2 text-sm font-black text-primary">
          <span className="sar-price tabular-nums">{fromPrice}</span>
          <span className="mr-1.5 text-[10px] font-semibold text-muted">(قطعة — عروض أخرى فالصفحة)</span>
        </p>
        <Link
          href={`/products/${product.slug}`}
          className="mt-4 flex min-h-[44px] w-full items-center justify-center rounded-2xl bg-charcoal text-center text-sm font-black text-white transition-colors hover:bg-charcoal/90"
        >
          اطلبي من صفحة المنتج
        </Link>
      </div>
    </article>
  )
}
