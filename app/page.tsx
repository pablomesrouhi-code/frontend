import Image from 'next/image'
import Link from 'next/link'
import { PRODUCTS, STORE_REVIEW_HEADLINE, STORE_SOLD_HEADLINE, formatSoldCount } from '@/lib/products'
import { BRAND_CONTACT_EMAIL } from '@/lib/brand'
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

const JOURNEY = [
  { n: 1, range: 'اليوم 1–7', title: 'الامتصاص', desc: 'المكوّنات تبدأ العمل على المستوى الخلوي', icon: '🌱', accent: BRAND.rose },
  { n: 2, range: 'اليوم 8–21', title: 'الإصلاح الداخلي', desc: 'ترميم وتجديد من الداخل للخارج', icon: '✨', accent: BRAND.teal },
  { n: 3, range: 'اليوم 22–30', title: 'النتائج المرئية', desc: 'فرق واضح تلاحظينه أنتِ ومن حولك', icon: '💎', accent: BRAND.cognac },
] as const

const GOALS = [
  { slug: 'rawnaq-c-collagen-gummies', icon: '✨', color: BRAND.rose, bg: '#f9efed', title: 'مقاومة التجاعيد', product: 'رونق C', desc: 'بيوتين + زنك + D3 — بشرة ثم شعر وأظافر' },
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
  {
    name: 'سارة م.',
    city: 'الرياض',
    text: 'بعد 6 أسابيع التزام على رونق C وصلت نتيجة: خطوط الوجه أخف، بشرتي أنعم، وشعري أقل تكسّr.',
    rating: 5,
    product: 'رونق C',
    accent: BRAND.rose,
  },
  {
    name: 'نور ع.',
    city: 'جدة',
    text: 'كنت أتأخر بعد الغداء؛ مع خفّة بيوتك و4 أسابيع وصلت نتيجة — انتفاخ أخف وإحساس أهدأ بعد الأكل.',
    rating: 5,
    product: 'خفّة بيوتك',
    accent: BRAND.peach,
  },
  {
    name: 'ديمة خ.',
    city: 'الدمام',
    text: 'ليل ماج قبل النوم بساعة — بعد شهر وصلت نتيجة: أنام أسرع وصباحي ما أصحى مرهقة زي أول.',
    rating: 5,
    product: 'ليل ماج',
    accent: BRAND.rose,
  },
  {
    name: 'ريم س.',
    city: 'الرياض',
    text: 'تساقط الفرشاة كان يخوفني؛ قوة شعر يومياً و8 أسابيع — وصلت نتيجة: شعر أقل في الوسادة والفرشاة.',
    rating: 5,
    product: 'قوة شعر',
    accent: BRAND.cognac,
  },
  {
    name: 'لينا ح.',
    city: 'جدة',
    text: 'حبوب stubborn وكنت أجرّب كل شيء؛ وضوح 7 أسابيع ووصلت نتيجة — بشرتي أنقى وإشراق خفيف ظهر.',
    rating: 5,
    product: 'وضوح',
    accent: BRAND.sage,
  },
  {
    name: 'فاطمة ن.',
    city: 'مكة',
    text: 'أيام الدورة كانت توقف حياتي؛ شهر هادئ دورتين متتاليتين ووصلت نتيجة — ألم أخف ومزاج أهدأ.',
    rating: 5,
    product: 'شهر هادئ',
    accent: BRAND.mauve,
  },
] as const

const SUPP_FACTS = [
  {
    product: 'رونق C',
    goal: 'بشرة مشرقة + مقاومة التجاعيد',
    accent: BRAND.rose,
    rows: [
      { ar: 'كولاجين متحلل', latin: 'Hydrolyzed Collagen', dose: '5000 mg' },
      { ar: 'فيتامين C', latin: 'Vitamin C', dose: '250 mg' },
      { ar: 'بيوتين', latin: 'Biotin', dose: '5000 mcg' },
      { ar: 'زنك', latin: 'Zinc', dose: '10 mg' },
      { ar: 'فيتامين D3', latin: 'Vitamin D3', dose: '1000 IU' },
      { ar: 'حمض الهيالورونيك', latin: 'Hyaluronic Acid', dose: '80 mg' },
    ],
  },
  {
    product: 'خفّة بيوتك',
    goal: 'هضم مريح + تقليل الانتفاخ',
    accent: BRAND.peach,
    rows: [
      { ar: 'خليط بروبيوتيك', latin: 'Probiotic Blend', dose: '10B CFU' },
      { ar: 'إينولين (ألياف)', latin: 'Inulin', dose: '3000 mg' },
      { ar: 'إنزيمات هاضمة', latin: 'Digestive Enzymes', dose: '150 mg' },
      { ar: 'خلاصة الزنجبيل', latin: 'Ginger Extract', dose: '150 mg' },
    ],
  },
  {
    product: 'ليل ماج',
    goal: 'نوم أعمق + استرخاء',
    accent: BRAND.rose,
    rows: [
      { ar: 'مغنيسيوم غليسينات', latin: 'Magnesium Glycinate', dose: '250 mg' },
      { ar: 'غلايسين', latin: 'Glycine', dose: '2000 mg' },
      { ar: 'ل-ثيانين', latin: 'L-Theanine', dose: '200 mg' },
      { ar: 'أشواغاندا', latin: 'Ashwagandha KSM-66', dose: '300 mg' },
      { ar: 'فيتامين B6', latin: 'Vitamin B6', dose: '2 mg' },
    ],
  },
  {
    product: 'قوة شعر',
    goal: 'تقليل التساقط + شعر أقوى',
    accent: BRAND.cognac,
    rows: [
      { ar: 'كولاجين بحري', latin: 'Marine Collagen', dose: '5000 mg' },
      { ar: 'بيوتين', latin: 'Biotin', dose: '5000 mcg' },
      { ar: 'زنك', latin: 'Zinc', dose: '15 mg' },
      { ar: 'حديد', latin: 'Iron Bisglycinate', dose: '14 mg' },
      { ar: 'حمض الفوليك', latin: 'Folic Acid', dose: '400 mcg' },
      { ar: 'فيتامين D3', latin: 'Vitamin D3', dose: '2000 IU' },
      { ar: 'كيراتين متحلل', latin: 'Hydrolyzed Keratin', dose: '500 mg' },
    ],
  },
  {
    product: 'وضوح',
    goal: 'تصفية البشرة + إشراق',
    accent: BRAND.sage,
    rows: [
      { ar: 'كولاجين بحري', latin: 'Marine Collagen', dose: '3000 mg' },
      { ar: 'غلوتاثيون', latin: 'Glutathione', dose: '500 mg' },
      { ar: 'فيتامين C', latin: 'Vitamin C', dose: '250 mg' },
      { ar: 'زنك', latin: 'Zinc', dose: '15 mg' },
      { ar: 'ن-أسيتيل سيستئين', latin: 'NAC', dose: '300 mg' },
      { ar: 'خلاصة الكركم', latin: 'Turmeric Extract', dose: '150 mg' },
    ],
  },
  {
    product: 'شهر هادئ',
    goal: 'تخفيف آلام الدورة + توازن',
    accent: BRAND.mauve,
    rows: [
      { ar: 'مايو-إينوسيتول', latin: 'Myo-Inositol', dose: '2000 mg' },
      { ar: 'مغنيسيوم', latin: 'Magnesium', dose: '250 mg' },
      { ar: 'فيتكس (كف مريم)', latin: 'Vitex', dose: '300 mg' },
      { ar: 'كالسيوم', latin: 'Calcium', dose: '300 mg' },
      { ar: 'فيتامين B6', latin: 'Vitamin B6', dose: '5 mg' },
      { ar: 'فيتامين D3', latin: 'Vitamin D3', dose: '1000 IU' },
      { ar: 'خلاصة الزنجبيل', latin: 'Ginger Extract', dose: '150 mg' },
    ],
  },
] as const

const GUMMY_PRODUCTS = PRODUCTS.filter((p) => !p.format || p.format === 'gummy')
const POWDER_PRODUCTS = PRODUCTS.filter((p) => p.format === 'powder_sachet')
const TOP_GUMMIES = [...GUMMY_PRODUCTS].sort((a, b) => (b.soldCount ?? 0) - (a.soldCount ?? 0)).slice(0, 2)
const TOP_POWDER = [...POWDER_PRODUCTS].sort((a, b) => (b.soldCount ?? 0) - (a.soldCount ?? 0))[0]
const BEST_SELLERS = [...TOP_GUMMIES, ...(TOP_POWDER ? [TOP_POWDER] : [])]
const BEST_SELLER_FRAME = BRAND.rose

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
                ستة منتجات مرخّصة — علكات يومية وسواشيه مسحوق. اسم + جوال 05 · تأكيد هاتفي · دفع عند الباب · 2–4 أيام.
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
                      src="/hero-store-trio.jpg"
                      alt="منتجات نبتة لابو — ستة منتجات علكة ومسحوق"
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

      {/* ═══ 3. BEST SELLERS — 3 products side by side, accent frame each ═══ */}
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
              ثلاثة الأكثر طلباً — بإطار واحد يميّزهم.
            </p>
          </div>

          <div className="grid min-w-0 grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {BEST_SELLERS.map((p) => (
              <div
                key={p.id}
                className="h-full rounded-[1.4rem] p-[3px] sm:rounded-[1.5rem] sm:p-[3.5px]"
                style={{
                  background: `linear-gradient(155deg, ${BEST_SELLER_FRAME} 0%, ${BEST_SELLER_FRAME}88 55%, ${BEST_SELLER_FRAME}44 100%)`,
                  boxShadow: `0 16px 48px -20px ${BEST_SELLER_FRAME}55`,
                }}
              >
                <ProductCard product={p} useHomeCardImage />
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ═══ 4. منتجاتنا — كل المنتجات ═══ */}
      <section id="products" className="scroll-mt-24 border-t border-[#E7DDD3] bg-[#faf9f8] py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-8 text-start sm:mb-10">
            <h2 className="text-2xl font-bold leading-tight sm:text-3xl" style={{ color: BRAND.charcoal }}>
              منتجاتنا
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed sm:text-base" style={{ color: BRAND.muted }}>
              ستة منتجات مرخّصة — علكة ومسحوق. جمال، هضم، نوم، شعر، بشرة، وأيام الدورة.
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

      {/* ═══ 5. REVIEWS (moved up — in place of how it works) ═══ */}
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

      {/* ═══ 6. INGREDIENTS — real supplement-facts cards ═══ */}
      <section className="bg-white py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-8 text-start">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em]" style={{ color: BRAND.rose }}>
              شفافية كاملة
            </p>
            <h2 className="text-2xl font-bold sm:text-3xl" style={{ color: BRAND.charcoal }}>
              كل مكوّن بجرعته الحقيقية
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed sm:text-base" style={{ color: BRAND.muted }}>
              نفس التركيبة المكتوبة على العلبة — كل مادة فعّالة بمقدارها بالضبط، بدون وعود فاضية.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SUPP_FACTS.map((card) => (
              <div
                key={card.product}
                className="relative flex flex-col overflow-hidden rounded-2xl border border-[#ebe4e0] bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
              >
                <span
                  aria-hidden
                  className="h-1 w-full"
                  style={{ background: `linear-gradient(90deg, ${card.accent}, ${card.accent}55)` }}
                />
                <div
                  className="flex items-center justify-between px-5 py-3.5"
                  style={{ background: `${card.accent}12`, borderBottom: `1px solid ${card.accent}22` }}
                >
                  <div>
                    <p className="text-base font-black" style={{ color: BRAND.charcoal }}>{card.product}</p>
                    <p className="text-[11px] font-semibold" style={{ color: card.accent }}>{card.goal}</p>
                  </div>
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[10px] font-black text-white"
                    style={{ background: card.accent }}
                  >
                    {card.rows.length}
                  </span>
                </div>
                <ul className="flex flex-col px-5 py-2">
                  {card.rows.map((row) => (
                    <li
                      key={row.latin}
                      className="flex items-center justify-between gap-3 border-b border-dashed border-[#efe8e4] py-2 last:border-b-0"
                    >
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-bold" style={{ color: BRAND.charcoal }}>{row.ar}</span>
                        <span className="block truncate font-mono text-[10px]" style={{ color: BRAND.muted }}>{row.latin}</span>
                      </span>
                      <span
                        dir="ltr"
                        className="shrink-0 rounded-md px-2 py-1 font-mono text-xs font-black tabular-nums"
                        style={{ background: `${card.accent}14`, color: card.accent }}
                      >
                        {row.dose}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="mt-6 text-center text-xs" style={{ color: BRAND.muted }}>
            * القيم اليومية حسب معايير NIH · مكمّل غذائي لا يُشخّص ولا يعالج · استشيري طبيبك عند الحاجة.
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

      {/* ═══ 11. ضمان راحتك — compact trust ribbon ═══ */}
      <section className="border-t border-[#E7DDD3] bg-[#faf9f8] py-10">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="rounded-3xl border border-[#ebe4e0] bg-white p-6 shadow-sm sm:p-8">
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-center">
              {[
                { icon: '🔒', label: 'بدون بطاقة بنكية' },
                { icon: '💵', label: 'دفع عند الاستلام' },
                { icon: '🔬', label: 'SFDA · حلال' },
                { icon: '⚡', label: 'توصيل 2–4 أيام' },
                { icon: '💬', label: 'تأكيد بشري' },
              ].map((t) => (
                <span
                  key={t.label}
                  className="inline-flex items-center gap-2 text-sm font-bold"
                  style={{ color: BRAND.charcoal }}
                >
                  <span aria-hidden>{t.icon}</span>
                  {t.label}
                </span>
              ))}
            </div>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5 border-t border-[#efe8e4] pt-5">
              {[
                { href: '/returns-refunds', label: 'سياسة الاسترجاع' },
                { href: '/shipping-policy', label: 'سياسة الشحن' },
                { href: '/cod-policy', label: 'الدفع عند الاستلام' },
                { href: '/privacy-policy', label: 'الخصوصية' },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="rounded-full border border-[#d8c9c6] bg-white px-4 py-1.5 text-xs font-semibold transition-colors hover:border-[#146b70] hover:text-[#146b70]"
                  style={{ color: BRAND.muted }}
                >
                  {l.label}
                </Link>
              ))}
              <a
                href={`mailto:${BRAND_CONTACT_EMAIL}`}
                className="rounded-full px-4 py-1.5 text-xs font-bold underline decoration-dotted underline-offset-4"
                style={{ color: BRAND.teal }}
              >
                {BRAND_CONTACT_EMAIL}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 12. FINAL CTA ═══ */}
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
