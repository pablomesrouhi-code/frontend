'use client'
import { useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { PRODUCTS, type Product } from '@/lib/products'
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

export default function ThankYouPage() {
  const [order, setOrder] = useState<OrderData | null>(null)
  const [hydrated, setHydrated] = useState(false)
  const pixelsFired = useRef(false)

  useEffect(() => {
    const raw = sessionStorage.getItem('nabtalabo_order')
    if (raw) {
      try {
        setOrder(JSON.parse(raw))
      } catch {}
    }
    setHydrated(true)
  }, [])

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

  /** Same-line cross-sell hints from catalogue (first match per ordered id). */
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
      <div className="flex min-h-screen justify-center bg-canvas px-4 py-24">
        <p className="text-sm text-muted">جاري التحميل…</p>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-white px-4 py-12">
        <div className="mx-auto max-w-xl rounded-3xl border border-amber-200 bg-amber-50/70 px-6 py-10 text-center">
          <p className="mb-3 text-lg font-bold text-amber-900">لم نجد تفاصيل طلب لهذه الصفحة</p>
          <p className="mb-6 text-sm leading-relaxed text-muted">
            يحدث هذا إذا لم يُكمَّل المتصفّح الطلب بنجاح (مثل تعطُّل الـ API)، أو تم فتح الرابط يدويًا.
            تأكّدي من رسالة النجاح بعد خطوة الإتمام، أو أعيدي الطلب بعد التحقق من عمل الـ API.
          </p>
          <Link
            href="/"
            className="inline-block rounded-full bg-primary px-8 py-3 font-bold text-white transition-colors hover:bg-primary-dark"
          >
            العودة للمتجر
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-canvas pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-2">
      {/* ——— Confirmation banner — unknown caller + COD priority — */}
      <div className="mx-auto mb-6 max-w-2xl px-4 sm:px-6">
        <div className="overflow-hidden rounded-2xl border-2 border-authority/35 bg-gradient-to-br from-authority/[0.08] via-white to-peach-tint shadow-[0_8px_32px_-8px_rgba(20,107,112,0.18)]">
          <div className="flex items-start gap-3 px-4 py-4 sm:px-5 sm:py-5">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-authority text-2xl text-white shadow-inner sm:h-14 sm:w-14" aria-hidden>
              📞
            </span>
            <div className="min-w-0 flex-1 text-right">
              <p className="text-base font-black leading-snug text-charcoal sm:text-lg">
                الخطوة الأهم الآن: الردّ على اتصال التأكيد
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                قد يظهر الرقم غير مسجّل لديك — هو من فريق <strong className="text-charcoal">نبتة لابو</strong> لتأكيد{' '}
                <strong className="text-charcoal">العنوان</strong> و<strong className="text-charcoal">موعد التوصيل</strong> قبل الشحن (
                نظام الدفع عند الاستلام). ردُّك السريع يساعِدُنا على تأكيد طلبك أولًا وتجهيزه بثقة أكبر.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        {/* ——— Success hero — لا اسم ولا جوال في الصفحة — */}
        <div className="mb-6 rounded-3xl bg-gradient-to-br from-primary to-primary-dark p-8 text-center text-white shadow-[0_12px_40px_rgba(184,72,92,0.35)]">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-white/25 text-4xl shadow-inner backdrop-blur-sm">
            ✅
          </div>
          <h1 className="text-2xl font-black leading-tight sm:text-3xl">طلبُك مسجَّل بنجاح</h1>
          <p className="mt-3 text-[15px] leading-relaxed text-white/85 sm:text-base">
            شكرًا لثقتك مع نبتة لابو. الخطوة التالية لتأكيد الطلب ستكون اتصالًا قصيرًا من الفريق قبل الشحن —
            وبعد التأكيد نجهّز الطلب للتوصيل داخل المملكة مع الدفع النقد عند الاستلام.
          </p>
          {order.orderNumber && (
            <p className="mt-4 inline-block rounded-full bg-black/15 px-4 py-2 text-[13px] text-white backdrop-blur-sm" dir="ltr">
              رقم المرجع: <strong className="ml-1 font-mono">{order.orderNumber}</strong>
            </p>
          )}
        </div>

        {/* ——— Call SLA — وقت السعودية — */}
        <div
          className={`mb-6 rounded-2xl border px-5 py-4 sm:py-5 ${
            callWindowOk
              ? 'border-teal-200 bg-gradient-to-br from-teal-50/90 to-white'
              : 'border-amber-200 bg-gradient-to-br from-amber-50 to-white'
          }`}
        >
          <p className={`text-base font-black ${callWindowOk ? 'text-authority' : 'text-amber-900'}`}>
            {callWindowOk ? 'نتصل لتأكيد الطلب خلال أقل من عشر دقائق تقريبًا' : 'طلبُك خارج ساعات الاتصال المباشر'}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            {callWindowOk ? (
              <>
                ساعات المتابعة (بتوقيت السعودية): من <strong className="text-charcoal">9 صباحًا</strong> إلى{' '}
                <strong className="text-charcoal">9 مساءً</strong>. إذا جاء الطلب الآن ضمن هذا الإطار، فاحتسبي أن الاتصال قادم قريبًا على
                رقم تمّ إدخاله مع الطلب.
              </>
            ) : (
              <>
                هذا الطلب وُضع خارج نافذة الاتصال السريعة. سيتابع فريق نبتة لابو الطلب وبإذن الله تتلقين اتصال
                تأكيد <strong className="text-charcoal">في وقت مبكر من صباح يوم العمل التالي</strong> (ضمن ذات الساعات 9
                ص — 9 م بتوقيت السعودية)، أو في أول فرصة بعد إعادة تشغيل جدولة المكالمات.
              </>
            )}
          </p>
          <ul className="mt-4 space-y-2 text-right text-sm text-muted">
            <li className="flex items-start gap-2">
              <span className="text-lg leading-none text-primary">•</span>
              <span>لا نطلب بيانات بطاقة؛ التأكيد يخص العنوان والموعد قبل الشحن.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-lg leading-none text-primary">•</span>
              <span>إن كانت لديك حاجة عاجلة، يمكن المراسلة عبر بريد الموقع من صفحة «تواصل معنا».</span>
            </li>
          </ul>
        </div>

        {/* ——— Order summary — عمود واحد؛ العنوان لا يشارك مساحته مع السعر — */}
        <div className="mb-6 rounded-3xl border border-border bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-5 flex flex-col gap-1 border-b border-border pb-4 text-right">
            <h2 className="text-lg font-black text-charcoal sm:text-xl">ملخص الطلب</h2>
            <p className="text-xs text-muted">الكميات وسعر كل بند؛ المجموع في الأسفل</p>
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
                      <p className="whitespace-nowrap text-lg font-black tabular-nums text-primary sm:text-xl">{item.price}</p>
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-muted">SAR</p>
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
                    عرض مكمِّل
                  </span>
                  <p className="mt-1 break-words text-sm font-bold text-charcoal">{order.upsellProduct.nameAr}</p>
                </div>
                <p className="shrink-0 text-lg font-black tabular-nums text-primary" dir="ltr">
                  {order.upsellPrice} <span className="text-xs font-semibold text-muted">SAR</span>
                </p>
              </div>
            </div>
          )}

          <div className="mt-6 flex flex-col gap-3 border-t border-border pt-5">
            <div className="flex flex-wrap items-end justify-between gap-2">
              <span className="text-base font-black text-charcoal">الإجمالي</span>
              <span className="text-3xl font-black tabular-nums text-primary" dir="ltr">
                {order.finalTotal}
                <span className="ms-2 text-base font-bold text-muted">ريال سعودي</span>
              </span>
            </div>
            <div className="rounded-2xl border border-authority/25 bg-authority/[0.06] px-4 py-3 text-sm leading-relaxed text-charcoal">
              <strong className="text-authority">دفع عند الاستلام</strong> فقط — لا نطلب رسومًا مسبقة على البطاقة. تُدفع القيمة
              نقدًا عند تسليم الشحنة.
            </div>
          </div>
        </div>

        {/* ——— Path to delivery — copy يدعم التأكيد والتوصيل — */}
        <div className="mb-6 rounded-3xl border border-border bg-white p-5 shadow-sm sm:p-6">
          <h2 className="mb-5 text-lg font-black text-charcoal">من تأكيد المكالمة إلى نتائج الرِوتين</h2>
          <ol className="space-y-4 text-right">
            {[
              {
                title: 'اتصال قصير بثقة',
                body:
                  'نؤكّد معك عنوان التوصيل والملاحظات المهمة. لا حاجة لبطاقات — فقط جوابًا واضحًا لإتمام تأكيد الطلب.',
              },
              {
                title: 'تجهيز ومراجعة',
                body:
                  'بعد الموافقة، يُطبَّق نفس الانضباط الذي تبحثين عنه في نقاط الجودة: تجهيز وترقيم الطلب للشحن داخل المملكة.',
              },
              {
                title: 'توصيل ودفع نقدًا',
                body:
                  'تستلمين الشحنة بحسب الموعد المتفق عليه؛ تدفعين نقدًا عند الاستلام. التزامك بالمداومة على المكمِّل جزء أساسي من تجربة تفيد أكثر مع الوقت.',
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

        {/* ——— Social proof — */}
        <div className="mb-6 rounded-3xl border border-border bg-gradient-to-br from-white to-peach-tint/50 p-5 sm:p-6">
          <h2 className="mb-4 text-lg font-black text-charcoal">لماذا ترتاحين للمكالمة؟</h2>
          <div className="flex flex-wrap gap-3">
            <div className="min-w-[9rem] flex-1 rounded-2xl bg-white px-4 py-3 text-center shadow-sm ring-1 ring-border/70">
              <p className="text-2xl font-black tabular-nums text-authority">4.8</p>
              <p className="text-[11px] font-semibold text-muted">تقييم متوسط تجارب عميلات</p>
            </div>
            <div className="min-w-[9rem] flex-1 rounded-2xl bg-white px-4 py-3 text-center shadow-sm ring-1 ring-border/70">
              <p className="text-2xl">🛡️</p>
              <p className="mt-1 text-[11px] font-semibold leading-snug text-charcoal">مكمّلات بتراخيص يُراعى فيها وضوح التصنيف</p>
            </div>
            <div className="min-w-[9rem] flex-1 rounded-2xl bg-white px-4 py-3 text-center shadow-sm ring-1 ring-border/70">
              <p className="text-sm font-black text-charcoal">دفع عند الاستلام</p>
              <p className="text-[11px] text-muted">بدون وسطاء دفع قبل التسليم</p>
            </div>
          </div>
          <div className="mt-5 rounded-2xl border border-border bg-white px-4 py-4">
            <div className="flex items-start gap-3">
              <span className="text-peach text-lg">★★★★★</span>
              <p className="min-w-0 text-sm italic leading-relaxed text-charcoal">
                «التزام اليوم مع المكمِّل أسهل بلذعة؛ والتنسيق قبل الشحن يعطيك انطباع صيدلي منظم وليس أي متجر.»
              </p>
            </div>
            <p className="mt-3 text-[11px] text-muted">تجربة عميلات — عنوان موجَّه لطبيعة المنتجات الغذائية المكمّلة</p>
          </div>
        </div>

        {/* ——— Suggested pairing (حقول catalogue crossSells) — */}
        {suggestedExtras.length > 0 && (
          <div className="mb-8 rounded-3xl border border-authority/20 bg-white p-5 shadow-sm">
            <h2 className="mb-1 text-lg font-black text-charcoal">مقترحات قبل التأكيد</h2>
            <p className="mb-4 text-sm text-muted">
              إذا رغبتِ بدمج أكثر من روتين، يمكنك طلب ذلك أثناء الاتصال مع الفريق قبل الشحن حيث يسمح المخزون — أو بطلب ثانٍ
              من الموقع.
            </p>
            <div className="flex flex-col gap-3">
              {suggestedExtras.map((p) => (
                <SuggestedRow key={`x-${p.id}`} product={p} />
              ))}
            </div>
          </div>
        )}

        {/* ——— Full catalogue reco — */}
        {recommendations.length > 0 ? (
          <div className="mb-10">
            <h2 className="mb-1 text-center text-2xl font-black text-charcoal">كمّلي روتين المنزل قبل الشحن أو لاحقًا</h2>
            <p className="mb-8 text-center text-sm text-muted">
              منتجات متوافقة مع نفس الانضباط في التسمية؛ التحقق والدفع بعد التسليم كنظامكم الحالي.
            </p>
            <div className="grid gap-6 sm:grid-cols-2">
              {recommendations.map((p) => (
                <div key={p.id} className="min-h-0">
                  <ThankYouMiniCard product={p} />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="mb-10 rounded-3xl border border-border bg-white p-8 text-center">
            <p className="text-lg font-black text-charcoal">جمعتِ تشكيلة كاملة — أحسنتِ</p>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted leading-relaxed">
              في زيارتك القادمة جرّبي استكمال قطع احتياطية أو إهداء؛ التوصيل والدفع عند الاستلام يبقى كما اعتمدتُم.
            </p>
            <Link
              href="/products"
              className="mt-6 inline-block rounded-full bg-primary px-8 py-3 text-sm font-bold text-white hover:bg-primary-dark"
            >
              تصفّح كل المنتجات
            </Link>
          </div>
        )}

        <div className="flex flex-col items-center gap-3 pb-6 text-center">
          <Link href="/contact" className="text-sm font-bold text-authority underline-offset-4 hover:underline">
            تواصل معنا — أسئلة بعد الطلب
          </Link>
          <Link href="/" className="inline-block rounded-full bg-charcoal px-10 py-3.5 font-bold text-white hover:bg-charcoal/90">
            متجر البداية
          </Link>
        </div>
      </div>
    </div>
  )
}

function SuggestedRow({ product }: { product: Product }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-border bg-peach-soft/30 p-3">
      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-border bg-white">
        <Image src={product.coverImage} alt={product.nameAr} fill className="object-cover" sizes="64px" />
      </div>
      <div className="min-w-0 flex-1 text-right">
        <p className="truncate font-bold text-charcoal">{product.nameAr}</p>
        <p className="line-clamp-1 text-xs text-muted">{product.subtitleAr}</p>
      </div>
      <Link
        href={`/products/${product.slug}`}
        className="touch-manipulation shrink-0 rounded-full bg-primary px-4 py-2.5 text-xs font-bold text-white active:scale-[0.98]"
      >
        صفحة المنتج
      </Link>
    </div>
  )
}

function ThankYouMiniCard({ product }: { product: Product }) {
  return (
    <article className="flex h-full min-h-[11rem] flex-col overflow-hidden rounded-3xl border border-border bg-white shadow-sm transition-[box-shadow,border-color] hover:border-authority/30 hover:shadow-md">
      <div className="relative aspect-[16/11] w-full shrink-0 bg-peach-soft/40">
        <Image src={product.coverImage} alt={product.nameAr} fill className="object-cover" sizes="(max-width:640px) 100vw, 50vw" />
      </div>
      <div className="flex flex-1 flex-col p-4 text-right">
        <p className="text-xs font-bold text-authority">{product.badgeAr}</p>
        <h3 className="mt-1 line-clamp-2 text-base font-black text-charcoal">{product.nameAr}</h3>
        <p className="mt-1 line-clamp-2 flex-1 text-xs leading-relaxed text-muted">{product.subtitleAr}</p>
        <Link
          href={`/products/${product.slug}`}
          className="mt-3 touch-manipulation text-center text-sm font-bold text-primary underline-offset-2 hover:underline"
        >
          عرض وتفاصيل المنتج
        </Link>
      </div>
    </article>
  )
}
