import Image from 'next/image'
import Link from 'next/link'
import { PRODUCTS, STORE_REVIEW_HEADLINE, STORE_SOLD_HEADLINE, formatSoldCount } from '@/lib/products'
import ProductCard from '@/components/product/ProductCard'
import HomeMixedBundle from '@/components/home/HomeMixedBundle'

// ───────── Brand palette (refined warm) ─────────
const BRAND = {
  rose: '#b8485c',
  roseDeep: '#8A3242',
  peach: '#c9937e',
  teal: '#146b70',
  tealDeep: '#0F3A3D',
  cream: '#FBF7F3',
  blush: '#F5E6E0',
  blushSoft: '#F1E6E4',
  border: '#E7DDD3',
  charcoal: '#1A1815',
  muted: '#6B635C',
  sage: '#7A9484',
  cognac: '#B5896A',
  mauve: '#8E6C8E',
} as const

const STAT_NUMBERS = [
  { value: formatSoldCount(STORE_SOLD_HEADLINE), label: 'طلب مؤكّد', sub: 'في المملكة' },
  { value: '4.8/5', label: `${STORE_REVIEW_HEADLINE}+ تقييم`, sub: '🇸🇦' },
  { value: '4', label: 'منتجات', sub: 'علكة + مسحوق' },
  { value: '2-4', label: 'أيام توصيل', sub: 'كل المناطق' },
] as const

const STEPS = [
  { n: '01', icon: '✨', title: 'اختاري اللي يناسبك', desc: 'علكة يومية أو عبوة مسحوق مع مكيال — أربعة منتجات، كل واحد له هدف واضح.' },
  { n: '02', icon: '💎', title: 'على قد ما تستخدمين', desc: 'قطعة، اثنتين، أو ثلاث حسب وتيرتك؛ السعر يتفصّل معك بدون ضغط.' },
  { n: '03', icon: '☎️', title: 'تأكيد بسيط وبراحتك', desc: 'اسمك ورقم جوال سعودي يكفيان؛ ما نطلب بطاقة، ونتواصل للتأكيد.' },
  { n: '04', icon: '📦', title: 'لمّا يوصلك الطلب', desc: 'نوصل لمناطق المملكة، نخبرك قبل التوصيل، وتدفعين كاش عند الاستلام.' },
] as const

const JOURNEY = [
  { n: 1, range: 'اليوم 1–7', title: 'الامتصاص', desc: 'المكوّنات تبدأ العمل على المستوى الخلوي', icon: '🌱', accent: BRAND.rose },
  { n: 2, range: 'اليوم 8–21', title: 'الإصلاح الداخلي', desc: 'ترميم وتجديد من الداخل للخارج', icon: '✨', accent: BRAND.teal },
  { n: 3, range: 'اليوم 22–30', title: 'النتائج المرئية', desc: 'فرق واضح تلاحظينه أنتِ ومن حولك', icon: '💎', accent: BRAND.cognac },
] as const

const FAQS = [
  { q: 'هل الدفع عند الاستلام متاح؟', a: 'نعم، جميع طلبات نبتة لابو بنظام الدفع عند الاستلام فقط.' },
  { q: 'ما الفرق بين العلكة ومنتجات المسحوق؟', a: 'منتجات المسحوق تأتي في عبوة قابلة للإغلاق ومعها مكيال للجرعة اليومية. كل تركيبة لها هدف مختلف؛ التفاصيل والجرعة على صفحة كل منتج.' },
  { q: 'كيف يتم تأكيد الطلب؟', a: 'يتواصل فريقنا معكِ على رقم جوّالك لتأكيد الطلب وترتيب التوصيل.' },
  { q: 'كم يستغرق التوصيل؟', a: 'يتم التوصيل إلى جميع مناطق المملكة خلال 2-4 أيام عمل.' },
  { q: 'متى أرى النتائج؟', a: 'تختلف من شخص لآخر؛ المداومة على الروتين 4–8 أسابيع هي الأقرب لفائدة حقيقية.' },
  { q: 'هل نبتة لابو معتمدة؟', a: 'نعم — مكمّلات غذائية مرخّصة وفق SFDA · حلال · لا نشخّص ولا نصف؛ استشيري الطبيب عند أي حالة.' },
] as const

const REVIEWS = [
  {
    name: 'سارة العتيبي',
    age: '32',
    city: 'الرياض',
    text: 'أنا قاريّة لكل ingredient label من زمان، وأغلب البراندات السعودية تحطّ مكونات عامة بدون جرعات. نبتة لابو أول براند يكتب الجرعة بالملجم بوضوح — رونق C فيه كولاجين 5000 ملجم وبيوتين مذكور بالضبط. هذا كافي إنه يخلّيني أثق فيهم.',
    product: 'رونق C',
    accent: BRAND.rose,
  },
  {
    name: 'نورة الدوسري',
    age: '38',
    city: 'جدة',
    text: 'قبل ما أطلب قريت المكونات بتمعّن — التركيبة والجرعة واضحتان مو مجرد أسماء. الباك جمع لي البيوتين مع التوازن الهرموني في طلب واحد والتأكيد الهاتفي ريّحني.',
    product: 'باك الجمال والتوازن',
    accent: BRAND.cognac,
  },
  {
    name: 'فاطمة الخالدي',
    age: '35',
    city: 'الدمام',
    text: 'أهم شي عندي إن المنتجات SFDA و حلال — عندي بناتي وما أحطّ شي ما أعرف مصدره. نبتة لابو واضحين من أول الموقع: المكونات والجرعات ونظام الدفع عند الاستلام كله مكتوب بدون لف ودوران.',
    product: 'موثوقية',
    accent: BRAND.teal,
  },
] as const

const COMPARE = [
  { feature: 'الجرعة مكتوبة بالملجم على العلبة', us: true, them: false },
  { feature: 'مصدر كل مكوّن مذكور بوضوح', us: true, them: false },
  { feature: 'مرخّص SFDA · حلال', us: true, them: false },
  { feature: 'دفع عند الاستلام — بدون بطاقة', us: true, them: false },
  { feature: 'تأكيد بشري قبل الشحن', us: true, them: false },
  { feature: 'توصيل 2–4 أيام لكل المملكة', us: true, them: false },
] as const

// ───────────────────────────────────────────────

export default function HomePage() {
  return (
    <div style={{ background: BRAND.cream }}>

      {/* ═══ 1. HERO — Editorial asymmetric, warm cream ═══ */}
      <section
        id="top"
        className="relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #f1e6e4 0%, #FFFFFF 60%, #FFFFFF 100%)' }}
      >
        <div className="mx-auto max-w-6xl px-4 pb-10 pt-4 sm:px-6 md:pb-14 md:pt-8">
          <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-2 md:gap-10">

            {/* TEXT */}
            <div className="order-2 text-start md:order-1">
              <div
                className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/85 px-3.5 py-1.5 text-[11px] font-bold backdrop-blur"
                style={{ color: BRAND.rose, border: `1px solid ${BRAND.rose}30` }}
              >
                <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ background: BRAND.rose }} aria-hidden />
                <span dir="ltr" className="tabular-nums">{formatSoldCount(STORE_SOLD_HEADLINE)}</span>
                <span>طلب · 🇸🇦</span>
              </div>

              <h1
                className="mb-4 text-3xl font-bold leading-tight sm:text-4xl md:text-[2.75rem]"
                style={{ color: BRAND.charcoal }}
              >
                مكمّلات غذائية{' '}
                <span style={{ color: BRAND.rose }}>علكة ومسحوق — تثق فيه السعوديات</span>
              </h1>

              <p className="mb-6 max-w-md text-base leading-relaxed sm:text-lg" style={{ color: BRAND.muted }}>
                أربعة منتجات مرخّصة — علكة يومية وعبوات مسحوق مع مكاييل. اسم + جوال 05 · تأكيد هاتفي · دفع عند الباب · 2–4 أيام.
              </p>

              <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
                <Link
                  href="#products"
                  className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-base font-bold transition-all hover:-translate-y-0.5 hover:shadow-xl"
                  style={{ background: BRAND.rose, color: '#fff', boxShadow: '0 10px 32px -8px rgba(184,72,92,0.38)' }}
                >
                  اختاري منتجك
                  <span aria-hidden>↓</span>
                </Link>
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 rounded-full px-6 py-4 text-sm font-bold"
                  style={{ border: '2px solid #b8485c44', color: BRAND.rose }}
                >
                  استكشاف الكتالوج
                </Link>
              </div>

              {/* Micro-trust */}
              <div className="mt-7 grid grid-cols-3 gap-2 border-t border-[#E7DDD3] pt-5 text-start">
                {[
                  { k: 'COD', v: 'دفع عند الباب' },
                  { k: 'SFDA', v: 'مرخّص رسمياً' },
                  { k: '2-4', v: 'أيام توصيل' },
                ].map((t) => (
                  <div key={t.k}>
                    <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: BRAND.peach }}>{t.k}</p>
                    <p className="text-xs font-semibold" style={{ color: BRAND.charcoal }}>{t.v}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* IMAGE — khalijkom-style: square cover frame + caption strip (image only) */}
            <div className="order-1 w-full md:order-2">
              <div className="relative mx-auto w-full max-w-[min(90vw,36rem)] md:mx-0 md:ms-auto">
                <span
                  aria-hidden
                  className="pointer-events-none absolute -top-1 -end-1 h-5 w-5 rounded-se-md border-t border-e border-[#B5896A]/50"
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute -top-1 -start-1 h-5 w-5 rounded-ss-md border-t border-s border-[#B5896A]/50"
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute -bottom-1 -end-1 h-5 w-5 rounded-ee-md border-b border-e border-[#B5896A]/50"
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute -bottom-1 -start-1 h-5 w-5 rounded-es-md border-b border-s border-[#B5896A]/50"
                />

                <span
                  className="absolute -top-3 -start-3 z-10 inline-flex flex-col rounded-full px-3 py-1.5 shadow-lg"
                  style={{
                    background: BRAND.rose,
                    border: `1px solid ${BRAND.rose}66`,
                    boxShadow: `0 10px 24px -8px ${BRAND.rose}55`,
                  }}
                >
                  <span dir="ltr" className="text-[10px] font-black tabular-nums text-white">
                    {formatSoldCount(STORE_SOLD_HEADLINE)}
                  </span>
                  <span className="text-[9px] font-bold text-white/90">مباع في السعودية</span>
                </span>

                <div
                  className="relative overflow-hidden rounded-[1.5rem] bg-white ring-1 ring-[#1A1815]/8"
                  style={{ boxShadow: '0 25px 50px -12px rgba(26, 24, 21, 0.18)' }}
                >
                  <div className="relative aspect-square">
                    <Image
                      src="/hero-store-trio-v2.jpg"
                      alt="أربعة منتجات نبتة لابو — بيوتين، توازن هرموني، مغنيسيوم، وغلوتاثيون كولاجين"
                      fill
                      priority
                      sizes="(max-width: 768px) 90vw, 36rem"
                      className="object-cover object-center"
                    />
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#1A1815]/12 via-transparent to-transparent"
                    />
                  </div>
                  <div
                    className="relative border-t px-4 py-2.5"
                    style={{ borderColor: BRAND.border, background: '#fff' }}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span
                        className="text-[10px] font-black uppercase tracking-[0.16em]"
                        style={{ color: BRAND.muted }}
                      >
                        متوافق مع اشتراطات SFDA
                      </span>
                      <span className="text-[10px] font-black tracking-[0.16em]" style={{ color: BRAND.peach }}>
                        علكة + مسحوق
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 2. STATS — one row on mobile (scroll), compact ═══ */}
      <section className="border-y border-[#E7DDD3] bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="-mx-4 flex divide-x divide-[#E7DDD3] overflow-x-auto px-4 scrollbar-none sm:mx-0 sm:px-0 md:grid md:grid-cols-4 md:overflow-visible">
            {STAT_NUMBERS.map((s) => (
              <div
                key={s.label}
                className="flex min-w-[38vw] shrink-0 snap-start flex-col gap-0.5 px-3 py-3 sm:min-w-[22vw] md:min-w-0 md:px-5 md:py-5"
              >
                <p className="text-base font-black leading-none tabular-nums sm:text-xl md:text-2xl" style={{ color: BRAND.rose }}>
                  {s.value}
                </p>
                <p className="text-[10px] font-bold sm:text-xs" style={{ color: BRAND.charcoal }}>{s.label}</p>
                <p className="text-[9px] font-medium sm:text-[10px]" style={{ color: BRAND.muted }}>{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 3. منتجاتنا — كل المنتجات في قسم واحد ═══ */}
      <section id="products" className="scroll-mt-24 bg-[#faf9f8] py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-8 text-start sm:mb-10">
            <h2 className="text-2xl font-bold leading-tight sm:text-3xl" style={{ color: BRAND.charcoal }}>
              منتجاتنا
            </h2>
            <span
              aria-hidden
              className="mt-3 block h-1 w-16 rounded-full"
              style={{ background: `linear-gradient(90deg, ${BRAND.rose}, ${BRAND.peach})` }}
            />
            <p className="mt-3 max-w-2xl text-sm leading-relaxed sm:text-base" style={{ color: BRAND.muted }}>
              أربعة منتجات تكمل بعضها — البيوتين والتوازن الهرموني متوفران الآن، والباقي يعود قريباً.
            </p>
          </div>

          <div className="mb-8 grid gap-3 sm:grid-cols-3">
            {[
              {
                icon: '🔥',
                title: 'الأكثر طلباً الآن',
                text: 'Rawnaq C وHormonal Balance متوفران للطلب',
                color: BRAND.rose,
              },
              {
                icon: '✨',
                title: 'روتين يكمل بعضه',
                text: 'باك 1 بيوتين + 2 توازن هرموني بـ349 ريال',
                color: BRAND.teal,
              },
              {
                icon: '📦',
                title: 'اطلبي براحتك',
                text: 'تأكيد هاتفي ودفع عند الاستلام',
                color: BRAND.cognac,
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex items-center gap-3 rounded-2xl border bg-white p-4 shadow-sm"
                style={{ borderColor: `${item.color}30` }}
              >
                <span
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-lg"
                  style={{ background: `${item.color}14` }}
                  aria-hidden
                >
                  {item.icon}
                </span>
                <div>
                  <p className="text-sm font-black" style={{ color: item.color }}>{item.title}</p>
                  <p className="mt-0.5 text-xs leading-relaxed" style={{ color: BRAND.muted }}>{item.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid min-w-0 grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 lg:gap-5">
            {PRODUCTS.map((p) => (
              <ProductCard key={p.id} product={p} useHomeCardImage showNewImageBanner />
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition hover:-translate-y-0.5"
              style={{ color: BRAND.rose, border: `2px solid ${BRAND.rose}44`, background: 'white' }}
            >
              الكتالوج الكامل ←
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ 5. REVIEWS — verified, few & detailed ═══ */}
      <section id="reviews" className="scroll-mt-24 py-14 sm:py-16" style={{ background: '#f1e6e4' }}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-10 text-center">
            <span
              className="mb-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-[11px] font-bold"
              style={{ color: BRAND.teal, border: `1px solid ${BRAND.teal}30` }}
            >
              <span aria-hidden>✓</span>
              Verified Reviews
              <span style={{ color: BRAND.peach }}>★★★★★</span>
            </span>
            <h2 className="text-2xl font-bold sm:text-3xl" style={{ color: BRAND.charcoal }}>
              عميلات قرأن المكوّنات قبل ما يطلبن
            </h2>
            <span
              aria-hidden
              className="mx-auto mt-3 block h-1 w-16 rounded-full"
              style={{ background: `linear-gradient(90deg, ${BRAND.rose}, ${BRAND.peach})` }}
            />
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed sm:text-base" style={{ color: BRAND.muted }}>
              نبتة لابو اختيار النساء اللي ما يصدّقن أي إعلان — قرأن، تحقّقن، ثم اشترين.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {REVIEWS.map((r) => (
              <figure
                key={r.name}
                className="relative flex flex-col overflow-hidden rounded-2xl border border-[#ebe4e0] bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-1"
                  style={{ background: `linear-gradient(90deg, ${r.accent}, ${r.accent}55)` }}
                />
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm" style={{ color: BRAND.peach }}>★★★★★</span>
                  <span
                    className="rounded-full px-2.5 py-0.5 text-[10px] font-black text-white"
                    style={{ background: r.accent }}
                  >
                    {r.product}
                  </span>
                </div>
                <span
                  aria-hidden
                  className="mb-1 font-serif text-4xl leading-none"
                  style={{ color: `${r.accent}55` }}
                >
                  &ldquo;
                </span>
                <blockquote className="flex-1 text-[13px] leading-relaxed sm:text-sm" style={{ color: BRAND.charcoal }}>
                  {r.text}
                </blockquote>
                <figcaption
                  className="mt-5 flex items-center gap-3 pt-4"
                  style={{ borderTop: `1px solid ${BRAND.border}` }}
                >
                  <div
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-black text-white"
                    style={{ background: r.accent }}
                  >
                    {r.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-bold" style={{ color: BRAND.charcoal }}>{r.name}</p>
                    <p className="text-[11px]" style={{ color: BRAND.muted }}>
                      {r.age} سنة · {r.city} ·{' '}
                      <span className="font-bold" style={{ color: BRAND.teal }}>مشترية مؤكدة ✓</span>
                    </p>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 6. لماذا نبتة لابو — comparison ═══ */}
      <section className="bg-white py-14 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="mb-9 text-center">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em]" style={{ color: BRAND.rose }}>
              الفرق واضح
            </p>
            <h2 className="text-2xl font-bold sm:text-3xl" style={{ color: BRAND.charcoal }}>
              ليش نبتة لابو مختلفة
            </h2>
            <span
              aria-hidden
              className="mx-auto mt-3 block h-1 w-16 rounded-full"
              style={{ background: `linear-gradient(90deg, ${BRAND.rose}, ${BRAND.peach})` }}
            />
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed sm:text-base" style={{ color: BRAND.muted }}>
              ما نبيع وعود — نبيع تركيبة مكتوبة بالجرعة والمصدر، ودفع عند الاستلام.
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-[#ebe4e0] shadow-sm">
            <div className="grid grid-cols-[1.5fr_1fr_1fr] items-stretch">
              <div className="bg-[#faf9f8] px-4 py-4" />
              <div
                className="flex items-center justify-center px-2 py-4 text-center text-xs font-black sm:text-sm"
                style={{ background: BRAND.rose, color: '#fff' }}
              >
                نبتة لابو
              </div>
              <div className="flex items-center justify-center bg-[#f1eeeb] px-2 py-4 text-center text-xs font-bold sm:text-sm" style={{ color: BRAND.muted }}>
                المكمّل العادي
              </div>
            </div>

            {COMPARE.map((row, i) => (
              <div
                key={row.feature}
                className="grid grid-cols-[1.5fr_1fr_1fr] items-stretch border-t border-[#efe8e4]"
                style={{ background: i % 2 === 0 ? '#ffffff' : '#faf9f8' }}
              >
                <div className="flex items-center px-4 py-3.5 text-[13px] font-semibold sm:text-sm" style={{ color: BRAND.charcoal }}>
                  {row.feature}
                </div>
                <div className="flex items-center justify-center px-2 py-3.5" style={{ background: `${BRAND.rose}0c` }}>
                  <span
                    className="flex h-7 w-7 items-center justify-center rounded-full text-sm font-black text-white"
                    style={{ background: BRAND.rose }}
                    aria-label="متوفر"
                  >
                    ✓
                  </span>
                </div>
                <div className="flex items-center justify-center px-2 py-3.5">
                  <span
                    className="flex h-7 w-7 items-center justify-center rounded-full text-sm font-black"
                    style={{ background: '#eee7e3', color: '#b6aaa2' }}
                    aria-label="غير متوفر"
                  >
                    ✕
                  </span>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-6 text-center text-xs" style={{ color: BRAND.muted }}>
            * الجرعات الكاملة بالملجم مكتوبة على صفحة كل منتج · مكمّل غذائي لا يُشخّص ولا يعالج.
          </p>
        </div>
      </section>

      {/* ═══ 7. الوعد — brand promise band (aesthetic) ═══ */}
      <section
        className="relative overflow-hidden py-16 sm:py-20"
        style={{ background: 'linear-gradient(135deg, #FBF7F3 0%, #F5E6E0 55%, #F1E6E4 100%)' }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -start-20 -top-20 h-64 w-64 rounded-full opacity-40 blur-3xl"
          style={{ background: '#c9937e55' }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -end-20 -bottom-24 h-72 w-72 rounded-full opacity-30 blur-3xl"
          style={{ background: '#146b7033' }}
        />

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-10 text-center">
            <span
              className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-1.5 text-[11px] font-bold backdrop-blur"
              style={{ color: BRAND.rose, border: `1px solid ${BRAND.rose}30` }}
            >
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: BRAND.rose }} aria-hidden />
              وعد نبتة لابو
            </span>
            <h2 className="text-2xl font-bold sm:text-3xl" style={{ color: BRAND.charcoal }}>
              ليش تثق فينا آلاف السعوديات
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed sm:text-base" style={{ color: BRAND.muted }}>
              تجربة شراء مريحة من أول نقرة حتى باب البيت — بلا مخاطرة.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {[
              { icon: '🚚', title: 'دفع عند الاستلام', desc: 'ما تدفعين إلا لمّا يوصلك الطلب لباب بيتك', accent: BRAND.rose },
              { icon: '🛡️', title: 'مرخّص SFDA', desc: 'مكمّلات مطابقة للاشتراطات · حلال', accent: BRAND.teal },
              { icon: '⚡', title: 'توصيل 2–4 أيام', desc: 'لكل مناطق المملكة مع إشعار قبل الوصول', accent: BRAND.cognac },
              { icon: '💬', title: 'تأكيد بشري', desc: 'نتواصل معك هاتفياً قبل الشحن للتأكيد', accent: BRAND.mauve },
            ].map((p) => (
              <div
                key={p.title}
                className="group relative flex flex-col gap-2 overflow-hidden rounded-2xl border border-white/60 bg-white/70 p-5 text-start shadow-sm backdrop-blur transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-1 origin-start scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
                  style={{ background: p.accent }}
                />
                <span
                  className="flex h-12 w-12 items-center justify-center rounded-2xl text-2xl"
                  style={{ background: `${p.accent}14` }}
                  aria-hidden
                >
                  {p.icon}
                </span>
                <h3 className="text-sm font-black sm:text-base" style={{ color: BRAND.charcoal }}>{p.title}</h3>
                <p className="text-xs leading-relaxed sm:text-[13px]" style={{ color: BRAND.muted }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 8. FAQ ═══ */}
      <section id="faq" className="scroll-mt-24 bg-white py-14 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="mb-8 text-start">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest" style={{ color: BRAND.peach }}>
              أسئلة شائعة
            </p>
            <h2 className="text-2xl font-bold sm:text-3xl" style={{ color: BRAND.charcoal }}>
              لديك سؤال؟
            </h2>
          </div>
          <div className="flex flex-col gap-2">
            {FAQS.map((faq) => (
              <details
                key={faq.q}
                className="group overflow-hidden rounded-2xl border border-[#d8c9c6] bg-white"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 font-semibold hover:bg-[#f5f0ed]">
                  {faq.q}
                  <span className="mr-2 shrink-0 text-xs text-[#b8485c] transition group-open:rotate-180">▼</span>
                </summary>
                <div className="border-t border-[#d8c9c6] bg-[#eae2df] px-5 py-4 text-sm leading-relaxed">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 9. كيف الطلب — HOW IT WORKS (moved to last) ═══ */}
      <section id="how" className="scroll-mt-24 py-14 sm:py-16" style={{ background: '#f1e6e4' }}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-8 text-start">
            <h2 className="text-2xl font-bold sm:text-3xl" style={{ color: BRAND.charcoal }}>
              كيف الطلب؟
            </h2>
            <p className="mt-2 text-sm leading-relaxed sm:text-base" style={{ color: BRAND.muted }}>
              تأكيد بشري، دفع عند الاستلام، وتوصيل لكل مناطق المملكة.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <div
                key={s.n}
                className="rounded-2xl border border-[#d8c9c6] bg-white p-5 text-start"
              >
                <div
                  className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl text-sm font-black text-white"
                  style={{ background: 'linear-gradient(135deg, #b8485c 0%, #943c50 100%)' }}
                >
                  {i + 1}
                </div>
                <div className="mb-1 text-xl" aria-hidden>{s.icon}</div>
                <h3 className="mb-1 text-base font-bold" style={{ color: BRAND.charcoal }}>{s.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: BRAND.muted }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 10. رحلتك خلال 30 يوم — journey timeline ═══ */}
      <section
        className="relative overflow-hidden py-16 sm:py-20"
        style={{ background: 'linear-gradient(160deg, #FBF7F3 0%, #F1E6E4 100%)' }}
      >
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-12 text-center">
            <span
              className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-1.5 text-[11px] font-bold backdrop-blur"
              style={{ color: BRAND.rose, border: `1px solid ${BRAND.rose}30` }}
            >
              <span aria-hidden>🗓️</span>
              رحلتك مع نبتة لابو
            </span>
            <h2 className="text-2xl font-bold sm:text-3xl" style={{ color: BRAND.charcoal }}>
              رحلتك خلال 30 يوم
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed sm:text-base" style={{ color: BRAND.muted }}>
              النتائج تتراكم مع الالتزام — خطوة بخطوة من أول أسبوع.
            </p>
          </div>

          <div className="relative grid gap-6 md:grid-cols-3 md:gap-8">
            <span
              aria-hidden
              className="pointer-events-none absolute top-[3.25rem] hidden h-0.5 md:block"
              style={{
                insetInlineStart: '16%',
                insetInlineEnd: '16%',
                background: `linear-gradient(90deg, ${BRAND.rose}, ${BRAND.teal}, ${BRAND.cognac})`,
                opacity: 0.35,
              }}
            />
            {JOURNEY.map((j) => (
              <div
                key={j.n}
                className="relative z-10 flex flex-col items-center rounded-2xl border border-[#ebe4e0] bg-white p-6 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div
                  className="mb-4 flex h-14 w-14 items-center justify-center rounded-full text-lg font-black text-white"
                  style={{ background: j.accent, boxShadow: `0 10px 24px -8px ${j.accent}88` }}
                >
                  {j.n}
                </div>
                <span
                  className="mb-3 inline-flex rounded-full px-3 py-1 text-[11px] font-bold"
                  style={{ background: `${j.accent}14`, color: j.accent }}
                >
                  {j.range}
                </span>
                <div className="mb-1 text-2xl" aria-hidden>{j.icon}</div>
                <h3 className="mb-1 text-lg font-black" style={{ color: BRAND.charcoal }}>{j.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: BRAND.muted }}>{j.desc}</p>
              </div>
            ))}
          </div>

          <p className="mx-auto mt-8 max-w-xl text-center text-xs" style={{ color: BRAND.muted }}>
            * النتائج تختلف من شخص لآخر — الالتزام على الروتين هو الأساس.
          </p>
        </div>
      </section>

      {/* ═══ PACK — أسفل الصفحة بنفس ألوان المتجر ═══ */}
      <section className="border-t border-[#E7DDD3] bg-[#faf9f8] py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <HomeMixedBundle />
        </div>
      </section>

      {/* ═══ 11. FINAL CTA ═══ */}
      <section className="relative overflow-hidden py-16 sm:py-20">
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(155deg, #0f3a3d 0%, #146b70 32%, #6b3038 88%, #943c50 100%)' }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-bold text-white backdrop-blur">
            <span style={{ color: '#f4c869' }}>★★★★★</span>
            <span className="tabular-nums">4.8</span>
            <span className="text-white/70">· {STORE_REVIEW_HEADLINE}+ تقييم 🇸🇦</span>
          </div>
          <h2 className="mb-4 text-3xl font-black text-white sm:text-4xl">جاهزة لروتين نبتة لابو؟</h2>
          <p className="mx-auto mb-8 max-w-xl text-base leading-relaxed text-white/85">
            علكة ومسحوق — أربعة منتجات تكمل بعضها. اختاري الأقرب ليومك، أكّدي على 05، وادفعي عند الاستلام.
          </p>
          <Link
            href="#products"
            className="inline-flex items-center gap-2 rounded-full px-10 py-4 text-base font-black text-[#1C1C1C] shadow-lg transition hover:-translate-y-0.5"
            style={{ background: 'linear-gradient(145deg, #fdf6f3 0%, #c9937e 100%)' }}
          >
            اختاري منتجك
            <span aria-hidden>↓</span>
          </Link>
          <p className="mt-5 text-sm font-semibold text-white/75">COD · تأكيد هاتفي · SFDA</p>
        </div>
      </section>
    </div>
  )
}
