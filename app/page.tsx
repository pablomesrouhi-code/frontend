import Image from 'next/image'
import Link from 'next/link'
import { PRODUCTS, STORE_REVIEW_HEADLINE, STORE_SOLD_HEADLINE, formatSoldCount } from '@/lib/products'
import ProductCard from '@/components/product/ProductCard'

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
  { value: formatSoldCount(STORE_SOLD_HEADLINE), label: 'طلب مؤكّد', sub: 'من بداية المتجر' },
  { value: '4.8/5', label: `${STORE_REVIEW_HEADLINE}+ تقييم`, sub: 'موثّقة 🇸🇦' },
  { value: '6', label: 'منتجات', sub: 'مكمّلات غذائية مرخّصة' },
  { value: '2-4', label: 'أيام توصيل', sub: 'كل مناطق المملكة' },
] as const

const STEPS = [
  { n: '01', icon: '✨', title: 'اختاري اللي يحسّ بيومك', desc: 'ستة منتجات — كل واحد له هدف واضح حسب احتياجك اليومي.' },
  { n: '02', icon: '💎', title: 'على قد ما تستخدمين', desc: 'قطعة، اثنتين، أو ثلاث حسب وتيرتك؛ السعر يتفصّل معك بدون ضغط.' },
  { n: '03', icon: '☎️', title: 'تأكيد بسيط وبراحتك', desc: 'اسمك ورقم جوال سعودي يكفيان؛ ما نطلب بطاقة، ونتواصل للتأكيد.' },
  { n: '04', icon: '📦', title: 'لمّا يوصلك الطلب', desc: 'نوصل لمناطق المملكة، نخبرك قبل التوصيل، وتدفعين كاش عند الاستلام.' },
] as const

const GOALS = [
  { slug: 'rawnaq-c-collagen-gummies', icon: '✨', color: BRAND.rose, bg: '#f9efed', title: 'الجمال من الداخل', product: 'رونق C', desc: 'بيوتين + زنك + فيتامين D' },
  { slug: 'khiffabiotic-probiotic-gummies', icon: '🍃', color: BRAND.peach, bg: '#f6eee9', title: 'خفّة بعد الأكل', product: 'خفّة بيوتك', desc: 'بروبيوتيك + ألياف' },
  { slug: 'laylmag-magnesium-gummies', icon: '🌙', color: BRAND.rose, bg: '#f3e9e7', title: 'هدوء المساء', product: 'ليل ماج', desc: 'مغنيسيوم + L-Theanine' },
  { slug: 'quwwat-sha3r-collagen-powder', icon: '💆🏻‍♀️', color: BRAND.cognac, bg: '#FAF1E8', title: 'قوة الشعر', product: 'قوة شعر', desc: 'كولاجين بحري + بيوتين + حديد' },
  { slug: 'wudouh-glow-skin-powder', icon: '🌿', color: BRAND.sage, bg: '#EDF2EE', title: 'بشرة نقية', product: 'وضوح', desc: 'غلوتاثيون + كولاجين + زنك' },
  { slug: 'shahr-hadi-pms-powder', icon: '🌸', color: BRAND.mauve, bg: '#F0E9F0', title: 'دورة هادئة', product: 'شهر هادئ', desc: 'مايو-إينوسيتول + فيتكس' },
] as const

const FAQS = [
  { q: 'هل الدفع عند الاستلام متاح؟', a: 'نعم، جميع طلبات نبتة لابو بنظام الدفع عند الاستلام فقط.' },
  { q: 'ما الفرق بين العلكة والساشيه المسحوق؟', a: 'كل منتج له هدف مختلف — جمال، هضم، نوم، شعر، بشرة، أو دورة شهرية. اختاري الأقرب لاحتياجك؛ التفاصيل على صفحة كل منتج.' },
  { q: 'كيف يتم تأكيد الطلب؟', a: 'يتواصل فريقنا معكِ على رقم جوّالك لتأكيد الطلب وترتيب التوصيل.' },
  { q: 'كم يستغرق التوصيل؟', a: 'يتم التوصيل إلى جميع مناطق المملكة خلال 2-4 أيام عمل.' },
  { q: 'متى أرى النتائج؟', a: 'تختلف من شخص لآخر؛ المداومة على الروتين 4–8 أسابيع هي الأقرب لفائدة حقيقية.' },
  { q: 'هل نبتة لابو معتمدة؟', a: 'نعم — مكمّلات غذائية مرخّصة وفق SFDA · حلال · لا نشخّص ولا نصف؛ استشيري الطبيب عند أي حالة.' },
] as const

const REVIEWS = [
  { name: 'سارة م.', city: 'الرياض', text: 'رونق C طعمه خفيف وصار جزء من صباحي. شعرت بفرق على ظفر اليد بعد شهر.', rating: 5, product: 'رونق C', accent: BRAND.rose },
  { name: 'نور ع.', city: 'جدة', text: 'كنت أحس بثقل بعد الغداء. خفّة بيوتك مع روتين أحسن للأكل غيّر إحساسي.', rating: 5, product: 'خفّة بيوتك', accent: BRAND.peach },
  { name: 'ديمة خ.', city: 'الدمام', text: 'ليل ماج خلّى وقت النوم أهدأ. ساشيه مع كتاب وعتمة خفيفة.', rating: 5, product: 'ليل ماج', accent: BRAND.rose },
  { name: 'هدى ر.', city: 'مكة', text: 'جربت الثلاثة معاً — روتيني صار أكتمل من الصباح للمساء.', rating: 5, product: 'الباقة', accent: BRAND.roseDeep },
] as const

// ───────────────────────────────────────────────

export default function HomePage() {
  return (
    <div style={{ background: BRAND.cream }}>

      {/* ═══ 1. HERO — Editorial asymmetric, warm cream, BIG image ═══ */}
      <section
        id="top"
        className="relative overflow-hidden"
        style={{ background: `radial-gradient(ellipse at 100% 0%, ${BRAND.blush} 0%, ${BRAND.cream} 55%, ${BRAND.cream} 100%)` }}
      >
        <div className="mx-auto max-w-7xl px-4 pb-14 pt-4 sm:px-6 md:pb-24 md:pt-10">
          <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-12 md:gap-10 lg:gap-12">

            {/* TEXT — 4 cols (narrower so image dominates) */}
            <div className="order-2 md:order-1 md:col-span-5 lg:col-span-4 md:pt-8 lg:pt-12">
              <div
                className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/85 px-3.5 py-1.5 text-[11px] font-bold backdrop-blur"
                style={{ color: BRAND.rose, border: `1px solid ${BRAND.rose}30` }}
              >
                <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ background: BRAND.rose }} aria-hidden />
                <span dir="ltr" className="tabular-nums">{formatSoldCount(STORE_SOLD_HEADLINE)}</span>
                <span>طلب · 🇸🇦</span>
              </div>

              <h1
                className="mb-6 text-[2.5rem] font-black leading-[1.05] tracking-tight sm:text-5xl lg:text-[3.75rem]"
                style={{ color: BRAND.charcoal }}
              >
                مكمّل غذائي
                <br />
                <span style={{ color: BRAND.rose }}>تثق فيه</span>
                <br />
                السعوديات.
              </h1>

              <p className="mb-7 max-w-md text-base leading-relaxed sm:text-lg" style={{ color: BRAND.muted }}>
                ستة منتجات مرخّصة — جمال، هضم، نوم، شعر، بشرة، وأيام الدورة. اختاري اللي يناسب يومك.
              </p>

              <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
                <Link
                  href="#products"
                  className="group inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-base font-bold text-white transition-all hover:-translate-y-0.5"
                  style={{ background: BRAND.rose, boxShadow: `0 14px 36px -10px ${BRAND.rose}66` }}
                >
                  اختاري منتجك
                  <span className="transition-transform group-hover:-translate-x-1" aria-hidden>←</span>
                </Link>
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-4 text-sm font-bold"
                  style={{ color: BRAND.charcoal, border: `1.5px solid ${BRAND.border}`, background: 'white' }}
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

            {/* IMAGE — 8 cols, BIGGER + higher, full-bleed on mobile */}
            <div className="order-1 -mx-3 sm:mx-0 md:order-2 md:col-span-7 lg:col-span-8">
              <div className="relative">
                {/* Big rose backdrop tag */}
                <div
                  className="absolute -end-2 -top-2 h-32 w-32 rounded-full opacity-30 blur-2xl sm:-end-4 sm:-top-4 sm:h-56 sm:w-56"
                  style={{ background: BRAND.rose }}
                  aria-hidden
                />
                <div
                  className="absolute -bottom-3 -start-3 h-28 w-28 rounded-full opacity-25 blur-2xl sm:-bottom-6 sm:-start-6 sm:h-48 sm:w-48"
                  style={{ background: BRAND.peach }}
                  aria-hidden
                />

                {/* Image card */}
                <div
                  className="relative overflow-hidden rounded-[20px] bg-white p-1.5 sm:rounded-[28px] sm:p-4 md:p-5"
                  style={{
                    border: `1px solid ${BRAND.border}`,
                    boxShadow: '0 40px 80px -32px rgba(184,72,92,0.18), 0 12px 24px -10px rgba(26,24,21,0.08)',
                  }}
                >
                  <div className="relative min-h-[min(92vw,440px)] overflow-hidden rounded-[14px] sm:min-h-0 sm:rounded-[20px]" style={{ background: '#FDF8F9' }}>
                    {/* Floating premium badge */}
                    <div
                      className="absolute top-3 end-3 z-10 rounded-2xl bg-white/95 px-3 py-2 backdrop-blur sm:top-5 sm:end-5"
                      style={{ border: `1px solid ${BRAND.border}`, boxShadow: '0 8px 20px -8px rgba(0,0,0,0.12)' }}
                    >
                      <div className="flex items-center gap-2">
                        <span style={{ color: BRAND.peach }}>★★★★★</span>
                        <span className="text-xs font-black" style={{ color: BRAND.charcoal }}>4.8</span>
                      </div>
                      <p className="text-[9px] font-bold uppercase tracking-wider" style={{ color: BRAND.muted }}>
                        {STORE_REVIEW_HEADLINE}+ تقييم
                      </p>
                    </div>

                    <Image
                      src="/hero-store-trio.jpg"
                      alt="منتجات نبتة لابو"
                      width={1024}
                      height={1024}
                      priority
                      sizes="(max-width: 768px) 100vw, 60vw"
                      className="block h-full min-h-[min(92vw,440px)] w-full object-contain sm:h-auto sm:min-h-0"
                    />

                    {/* Floating SFDA badge */}
                    <div
                      className="absolute bottom-3 start-3 z-10 flex items-center gap-2 rounded-2xl bg-white/95 px-3 py-2 backdrop-blur sm:bottom-5 sm:start-5"
                      style={{ border: `1px solid ${BRAND.teal}40` }}
                    >
                      <div className="flex h-7 w-7 items-center justify-center rounded-full text-xs font-black text-white" style={{ background: BRAND.teal }}>
                        ✓
                      </div>
                      <div className="text-start">
                        <p className="text-[9px] font-bold uppercase" style={{ color: BRAND.teal }}>مرخّص</p>
                        <p className="text-[10px] font-black" style={{ color: BRAND.charcoal }}>SFDA · حلال</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Caption strip below image */}
                <div className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-[10px] font-bold uppercase tracking-wider sm:text-[11px]" style={{ color: BRAND.muted }}>
                  <span>6 منتجات</span>
                  <span style={{ color: BRAND.border }}>·</span>
                  <span>هدف لكل واحد</span>
                  <span style={{ color: BRAND.border }}>·</span>
                  <span style={{ color: BRAND.rose }}>COD · SFDA</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 2. STATS NUMBERS — Proof at scale, magazine row ═══ */}
      <section className="border-y border-[#E7DDD3] bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-2 divide-x divide-[#E7DDD3] md:grid-cols-4">
            {STAT_NUMBERS.map((s, i) => (
              <div
                key={s.label}
                className="flex flex-col items-start gap-1 px-4 py-6 sm:px-6 sm:py-8"
                style={{ borderRight: i === STAT_NUMBERS.length - 1 ? 'none' : undefined }}
              >
                <p className="text-2xl font-black leading-none tabular-nums sm:text-3xl md:text-4xl" style={{ color: BRAND.rose }}>
                  {s.value}
                </p>
                <p className="mt-2 text-xs font-bold sm:text-sm" style={{ color: BRAND.charcoal }}>{s.label}</p>
                <p className="text-[10px] font-medium uppercase tracking-wider sm:text-[11px]" style={{ color: BRAND.muted }}>{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 3. NEEDS NAV — compact pills (intro to products) ═══ */}
      <section id="goals" className="scroll-mt-24 bg-white py-10 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-5 flex flex-wrap items-baseline justify-between gap-3 sm:mb-6">
            <h2 className="text-base font-black sm:text-lg" style={{ color: BRAND.charcoal }}>
              <span className="me-2">←</span>
              اختاري حسب احتياجك
            </h2>
            <a href="#products" className="text-xs font-bold underline-offset-4 hover:underline" style={{ color: BRAND.rose }}>
              كل المنتجات ↓
            </a>
          </div>
          <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
            <div className="flex min-w-max items-stretch gap-2.5 sm:grid sm:min-w-0 sm:grid-cols-3 sm:gap-3 lg:grid-cols-6">
              {GOALS.map((item) => (
                <Link
                  key={item.slug}
                  href={`/products/${item.slug}`}
                  className="group flex shrink-0 items-center gap-2.5 rounded-full px-3.5 py-2.5 transition hover:-translate-y-0.5 sm:rounded-2xl sm:px-3 sm:py-3 lg:flex-col lg:items-start lg:gap-2 lg:px-4 lg:py-4"
                  style={{ background: item.bg, border: `1px solid ${item.color}30` }}
                >
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-base sm:h-9 sm:w-9 lg:h-10 lg:w-10 lg:text-lg"
                    style={{ background: 'white', border: `1px solid ${item.color}30` }}
                    aria-hidden
                  >
                    {item.icon}
                  </span>
                  <div className="text-start">
                    <p className="text-xs font-black leading-tight sm:text-[13px]" style={{ color: BRAND.charcoal }}>
                      {item.title}
                    </p>
                    <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: item.color }}>
                      {item.product}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 4. PRODUCTS — unified catalog ═══ */}
      <section id="products" className="scroll-mt-24 py-16 sm:py-20" style={{ background: BRAND.cream }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4 sm:mb-12">
            <div>
              <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.18em]" style={{ color: BRAND.rose }}>
                منتجاتنا
              </p>
              <h2 className="text-3xl font-black leading-tight sm:text-4xl" style={{ color: BRAND.charcoal }}>
                ستة منتجات. <span style={{ color: BRAND.rose }}>هدف واضح لكل واحد.</span>
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed sm:text-base" style={{ color: BRAND.muted }}>
                من الصباح للمساء — جمال، هضم، نوم، شعر، بشرة، وأيام الدورة. كلها من نبتة لابو · SFDA · COD.
              </p>
            </div>
            <Link
              href="/products"
              className="text-sm font-bold underline-offset-4 hover:underline"
              style={{ color: BRAND.rose }}
            >
              الكتالوج الكامل ←
            </Link>
          </div>
          <div className="grid min-w-0 grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {PRODUCTS.map((p) => (
              <ProductCard key={p.id} product={p} useHomeCardImage />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 7. HOW IT WORKS — Magazine timeline ═══ */}
      <section id="how" className="scroll-mt-24 py-16 sm:py-20" style={{ background: BRAND.blushSoft }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-10 grid items-end gap-4 md:grid-cols-2">
            <div>
              <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.18em]" style={{ color: BRAND.rose }}>
                كيف الطلب
              </p>
              <h2 className="text-3xl font-black leading-tight sm:text-4xl" style={{ color: BRAND.charcoal }}>
                من الاختيار للتوصيل
                <br />
                <span style={{ color: BRAND.rose }}>أربع خطوات بسيطة.</span>
              </h2>
            </div>
            <p className="text-sm leading-relaxed md:text-base" style={{ color: BRAND.muted }}>
              تأكيد بشري قبل الشحن، دفع كاش عند الباب، وصياغة لا تغرّكِ بوعود خارج نطاق المكمّل الغذائي.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s) => (
              <div
                key={s.n}
                className="relative flex flex-col gap-3 rounded-3xl bg-white p-6 sm:p-7"
                style={{ border: `1px solid ${BRAND.border}` }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-3xl font-black" style={{ color: BRAND.rose }}>{s.n}</span>
                  <span className="text-2xl" aria-hidden>{s.icon}</span>
                </div>
                <h3 className="mt-2 text-base font-black sm:text-lg" style={{ color: BRAND.charcoal }}>{s.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: BRAND.muted }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 8. INGREDIENTS — Transparency ═══ */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-10 max-w-2xl">
            <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.18em]" style={{ color: BRAND.teal }}>
              شفافية المكوّنات
            </p>
            <h2 className="text-3xl font-black leading-tight sm:text-4xl" style={{ color: BRAND.charcoal }}>
              مكوّنات واضحة. <span style={{ color: BRAND.teal }}>هدف لكل منتج.</span>
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { code: 'NL-01', name: 'بيوتين + زنك + فيتامين D', latin: 'Biotin · Zinc · Vit D', product: 'رونق C', accent: BRAND.rose },
              { code: 'NL-02', name: 'بروبيوتيك + ألياف', latin: 'Probiotics · Fiber', product: 'خفّة بيوتك', accent: BRAND.peach },
              { code: 'NL-03', name: 'مغنيسيوم + L-Theanine', latin: 'Magnesium · L-Theanine', product: 'ليل ماج', accent: BRAND.rose },
              { code: 'NL-04', name: 'كولاجين بحري + حديد', latin: 'Marine Collagen · Iron', product: 'قوة شعر', accent: BRAND.cognac },
              { code: 'NL-05', name: 'غلوتاثيون + كولاجين + زنك', latin: 'Glutathione · Collagen · Zinc', product: 'وضوح', accent: BRAND.sage },
              { code: 'NL-06', name: 'مايو-إينوسيتول + فيتكس', latin: 'Myo-Inositol · Vitex · B6', product: 'شهر هادئ', accent: BRAND.mauve },
            ].map((ing) => (
              <div
                key={ing.code}
                className="flex flex-col gap-3 rounded-2xl p-5 transition hover:-translate-y-0.5"
                style={{ background: '#FAF7F4', border: `1px solid ${ing.accent}25` }}
              >
                <div className="flex items-center justify-between">
                  <span className="rounded-md px-2 py-0.5 text-[10px] font-mono font-bold" style={{ background: `${ing.accent}15`, color: ing.accent }}>
                    {ing.code}
                  </span>
                  <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: ing.accent }}>
                    {ing.product}
                  </span>
                </div>
                <p className="text-base font-bold" style={{ color: BRAND.charcoal }}>{ing.name}</p>
                <p className="font-mono text-xs" style={{ color: ing.accent }}>{ing.latin}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 9. REVIEWS ═══ */}
      <section id="reviews" className="scroll-mt-24 py-16 sm:py-20" style={{ background: BRAND.blushSoft }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.18em]" style={{ color: BRAND.rose }}>
                تقييمات حقيقية
              </p>
              <h2 className="text-3xl font-black leading-tight sm:text-4xl" style={{ color: BRAND.charcoal }}>
                قالت عميلاتنا
                <br />
                <span style={{ color: BRAND.rose }}>في المملكة.</span>
              </h2>
            </div>
            <div
              className="flex items-center gap-3 rounded-full bg-white px-5 py-3"
              style={{ border: `1px solid ${BRAND.border}` }}
            >
              <div className="flex items-center gap-1.5">
                <span style={{ color: BRAND.peach }}>★★★★★</span>
                <span className="text-lg font-black" style={{ color: BRAND.charcoal }}>4.8</span>
              </div>
              <span className="text-xs font-bold" style={{ color: BRAND.muted }}>· {STORE_REVIEW_HEADLINE}+ تقييم</span>
            </div>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {REVIEWS.map((r) => (
              <div
                key={r.name}
                className="flex flex-col gap-4 rounded-3xl bg-white p-6"
                style={{ border: `1px solid ${BRAND.border}` }}
              >
                <div className="flex items-center justify-between">
                  <span style={{ color: BRAND.peach }}>★★★★★</span>
                  <span className="rounded-full px-2.5 py-0.5 text-[10px] font-black text-white" style={{ background: r.accent }}>
                    {r.product}
                  </span>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: BRAND.charcoal }}>
                  &ldquo;{r.text}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-3" style={{ borderTop: `1px solid ${BRAND.border}` }}>
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-black text-white"
                    style={{ background: r.accent }}
                  >
                    {r.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-bold" style={{ color: BRAND.charcoal }}>{r.name}</p>
                    <p className="text-[11px]" style={{ color: BRAND.teal }}>✓ موثّقة · {r.city}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 10. FAQ ═══ */}
      <section id="faq" className="scroll-mt-24 bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="mb-10 max-w-xl">
            <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.18em]" style={{ color: BRAND.peach }}>
              أسئلة شائعة
            </p>
            <h2 className="text-3xl font-black leading-tight sm:text-4xl" style={{ color: BRAND.charcoal }}>
              لديك سؤال؟
            </h2>
          </div>
          <div className="flex flex-col gap-2">
            {FAQS.map((faq) => (
              <details
                key={faq.q}
                className="group overflow-hidden rounded-2xl bg-[#FBF7F3] transition"
                style={{ border: `1px solid ${BRAND.border}` }}
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-sm font-bold transition hover:bg-[#F5EFE9] sm:text-base" style={{ color: BRAND.charcoal }}>
                  {faq.q}
                  <span className="shrink-0 text-xs transition group-open:rotate-180" style={{ color: BRAND.rose }} aria-hidden>▼</span>
                </summary>
                <div className="border-t bg-white px-6 py-4 text-sm leading-relaxed" style={{ borderColor: BRAND.border, color: BRAND.muted }}>
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 11. FINAL CTA — Dark elegance ═══ */}
      <section className="relative overflow-hidden py-20 sm:py-28">
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(155deg, ${BRAND.tealDeep} 0%, ${BRAND.teal} 35%, ${BRAND.roseDeep} 88%, ${BRAND.rose} 100%)` }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -end-20 -top-20 h-96 w-96 rounded-full opacity-20 blur-3xl"
          style={{ background: BRAND.peach }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
          <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.25em] text-white/80">
            — جاهزة لتجربتك —
          </p>
          <h2 className="mb-5 text-4xl font-black leading-tight text-white sm:text-5xl md:text-6xl">
            روتينك يبدأ
            <br />
            <span style={{ color: BRAND.peach }}>اليوم.</span>
          </h2>
          <p className="mx-auto mb-10 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
            ستة منتجات. هدف واضح لكل واحد. اختاري الأقرب ليومك — أكّدي على 05، وادفعي كاش عند الباب.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="#products"
              className="group inline-flex items-center justify-center gap-2 rounded-full px-10 py-4 text-base font-black shadow-2xl transition hover:-translate-y-0.5"
              style={{ background: `linear-gradient(145deg, #fdf6f3 0%, ${BRAND.peach} 100%)`, color: BRAND.charcoal }}
            >
              اختاري منتجك
              <span className="transition-transform group-hover:-translate-x-1" aria-hidden>←</span>
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-8 py-4 text-sm font-bold text-white backdrop-blur transition hover:bg-white/20"
            >
              كل المنتجات
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11px] font-bold uppercase tracking-widest text-white/70">
            <span>COD</span>
            <span className="text-white/30">·</span>
            <span>تأكيد هاتفي</span>
            <span className="text-white/30">·</span>
            <span>SFDA</span>
            <span className="text-white/30">·</span>
            <span>توصيل المملكة</span>
          </div>
        </div>
      </section>
    </div>
  )
}
