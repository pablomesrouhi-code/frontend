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
  { value: formatSoldCount(STORE_SOLD_HEADLINE), label: 'طلب مؤكّد', sub: 'في المملكة' },
  { value: '4.8/5', label: `${STORE_REVIEW_HEADLINE}+ تقييم`, sub: '🇸🇦' },
  { value: '6', label: 'منتجات', sub: 'علكة + مسحوق' },
  { value: '2-4', label: 'أيام توصيل', sub: 'كل المناطق' },
] as const

const STEPS = [
  { n: '01', icon: '✨', title: 'اختاري اللي يناسبك', desc: 'علكة يومية أو ساشيه مسحوق — ستة منتجات، كل واحد له هدف واضح.' },
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
  { name: 'ديمة خ.', city: 'الدمام', text: 'ليل ماج خلّى وقت النوم أهدأ. علكتين قبل النوم وصار روتيني أسهل.', rating: 5, product: 'ليل ماج', accent: BRAND.rose },
  { name: 'هدى ر.', city: 'مكة', text: 'جربت الثلاثة معاً — روتيني صار أكتمل من الصباح للمساء.', rating: 5, product: 'الباقة', accent: BRAND.roseDeep },
] as const

const GUMMY_PRODUCTS = PRODUCTS.filter((p) => !p.format || p.format === 'gummy')
const POWDER_PRODUCTS = PRODUCTS.filter((p) => p.format === 'powder_sachet')
const TOP_GUMMIES = [...GUMMY_PRODUCTS].sort((a, b) => (b.soldCount ?? 0) - (a.soldCount ?? 0)).slice(0, 2)
const TOP_POWDER = [...POWDER_PRODUCTS].sort((a, b) => (b.soldCount ?? 0) - (a.soldCount ?? 0))[0]

function FormatDivider({ label, accent }: { label: string; accent: string }) {
  return (
    <div className="my-8 flex items-center gap-3 sm:my-10" aria-hidden>
      <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, transparent, ${accent}55, transparent)` }} />
      <span
        className="shrink-0 rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] sm:text-[11px]"
        style={{ color: accent, borderColor: `${accent}44`, background: `${accent}0c` }}
      >
        {label}
      </span>
      <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, transparent, ${accent}55, transparent)` }} />
    </div>
  )
}

// ───────────────────────────────────────────────

export default function HomePage() {
  return (
    <div style={{ background: BRAND.cream }}>

      {/* ═══ 1. HERO — Editorial asymmetric, warm cream, BIG image ═══ */}
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
                ستة منتجات مرخّصة — علكات يومية وسواشيه مسحوق. جمال، هضم، نوم، شعر، بشرة، وأيام الدورة. تأكيد على 05 · COD · 2–4 أيام.
              </p>

              <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
                <Link
                  href="#best-sellers"
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

            {/* IMAGE — square card, image centered filling the frame (original style) */}
            <div className="order-1 w-full md:order-2">
              <div
                className="w-full rounded-3xl bg-white p-3 sm:p-4 md:p-5"
                style={{
                  border: '1px solid #EADFD6',
                  boxShadow: '0 22px 60px -24px rgba(28, 28, 28, 0.1), inset 0 1px 0 rgba(255,255,255,0.85)',
                }}
              >
                <div className="relative overflow-hidden rounded-2xl bg-[#FDF8F9]">
                  <div
                    className="absolute top-2 end-2 z-10 rounded-lg px-2 py-1.5 sm:top-3 sm:end-3 sm:px-2.5 sm:py-2"
                    style={{ background: '#b8485cee', border: '1px solid rgba(255,255,255,0.35)' }}
                  >
                    <p dir="ltr" className="text-[10px] font-black tabular-nums text-white sm:text-[11px]">
                      {formatSoldCount(STORE_SOLD_HEADLINE)}
                    </p>
                    <p className="text-[9px] font-bold text-white/90">مباع في السعودية</p>
                  </div>

                  <Image
                    src="/hero-store-trio.jpg"
                    alt="منتجات نبتة لابو — ستة منتجات علكة ومسحوق"
                    width={1024}
                    height={1024}
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 560px"
                    className="block h-auto w-full object-contain"
                  />

                  <div
                    className="absolute bottom-2 start-2 z-10 max-w-[6.5rem] rounded-lg px-2 py-1.5 sm:bottom-3 sm:start-3 sm:px-2.5 sm:py-2"
                    style={{ background: '#ffffffee', border: '1px solid rgba(20,107,112,0.35)' }}
                  >
                    <p className="text-[9px] font-bold uppercase text-[#146b70]">مرخّص SFDA</p>
                    <p className="text-[10px] font-black text-[#1C1C1C]">علكة + مسحوق</p>
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

      {/* ═══ 3. BEST SELLERS — 3 products, line by format ═══ */}
      <section id="best-sellers" className="scroll-mt-24 bg-white py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-8 text-start sm:mb-10">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em]" style={{ color: BRAND.rose }}>
              الأكثر مبيعاً
            </p>
            <h2 className="text-2xl font-bold leading-tight sm:text-3xl" style={{ color: BRAND.charcoal }}>
              اختيارات عميلات نبتة لابو
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed sm:text-base" style={{ color: BRAND.muted }}>
              علكتان الأكثر طلباً — وساشيه مسحوق مركّز. نفس العروض والتأكيد على 05.
            </p>
          </div>

          <p className="mb-4 text-[10px] font-black uppercase tracking-[0.16em] sm:text-[11px]" style={{ color: BRAND.peach }}>
            🍬 علكة يومية
          </p>
          <div className="grid min-w-0 grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:gap-8">
            {TOP_GUMMIES.map((p) => (
              <ProductCard key={p.id} product={p} useHomeCardImage />
            ))}
          </div>

          {TOP_POWDER ? (
            <>
              <FormatDivider label="ساشيه مسحوق" accent={TOP_POWDER.accentColor} />
              <div className="mx-auto w-full max-w-md sm:max-w-lg">
                <ProductCard product={TOP_POWDER} useHomeCardImage />
              </div>
            </>
          ) : null}
        </div>
      </section>

      {/* ═══ 4. ALL PRODUCTS — full catalog ═══ */}
      <section id="products" className="scroll-mt-24 border-t border-[#E7DDD3] bg-[#faf9f8] py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-8 text-start sm:mb-10">
            <h2 className="text-2xl font-bold leading-tight sm:text-3xl" style={{ color: BRAND.charcoal }}>
              منتجاتنا — علكة ومسحوق
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed sm:text-base" style={{ color: BRAND.muted }}>
              ستة منتجات مرخّصة — جمال، هضم، نوم، شعر، بشرة، وأيام الدورة. SFDA · COD · 2–4 أيام.
            </p>
          </div>

          <div className="mb-8 flex flex-wrap gap-2 sm:mb-10">
            {GOALS.map((item) => (
              <Link
                key={item.slug}
                href={`/products/${item.slug}`}
                className="rounded-full border border-[#d8c9c6] bg-white px-4 py-2 text-xs font-semibold text-[#5c5656] transition-colors hover:border-[#b8485c] hover:bg-[#b8485c] hover:text-white sm:text-sm"
              >
                {item.product}
              </Link>
            ))}
          </div>

          <div className="grid min-w-0 grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {PRODUCTS.map((p) => (
              <ProductCard key={p.id} product={p} useHomeCardImage />
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

      {/* ═══ 5. HOW IT WORKS ═══ */}
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

      {/* ═══ 6. INGREDIENTS ═══ */}
      <section className="bg-white py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-8 text-start">
            <h2 className="text-2xl font-bold sm:text-3xl" style={{ color: BRAND.charcoal }}>
              مكوّنات واضحة — علكة ومسحوق، هدف لكل منتج
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
                className="flex flex-col gap-2 rounded-2xl border border-[#d8c9c6] bg-[#faf9f8] p-4"
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

      {/* ═══ 7. REVIEWS ═══ */}
      <section id="reviews" className="scroll-mt-24 py-14 sm:py-16" style={{ background: '#f1e6e4' }}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-8 text-start">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#dfd6d4] bg-white px-4 py-2">
              <span style={{ color: BRAND.peach }}>★★★★★</span>
              <span className="text-sm font-bold">4.8</span>
              <span className="text-xs text-[#5c5656]">من {STORE_REVIEW_HEADLINE} تقييم · 🇸🇦</span>
            </div>
            <h2 className="text-2xl font-bold sm:text-3xl" style={{ color: BRAND.charcoal }}>
              قالت عميلاتنا في المملكة
            </h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {REVIEWS.map((r) => (
              <div
                key={r.name}
                className="flex flex-col gap-4 rounded-2xl border border-[#ebe4e0] bg-white p-6 shadow-sm"
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

      {/* ═══ 9. FINAL CTA ═══ */}
      <section className="relative overflow-hidden py-16 sm:py-20">
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(155deg, #0f3a3d 0%, #146b70 32%, #6b3038 88%, #943c50 100%)' }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="mb-4 text-3xl font-black text-white sm:text-4xl">جاهزة لروتين نبتة لابو؟</h2>
          <p className="mx-auto mb-8 max-w-xl text-base leading-relaxed text-white/85">
            علكة ومسحوق — ستة منتجات لكل احتياج. اختاري الأقرب ليومك، أكّدي على 05، وادفعي عند الاستلام.
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
