import Image from 'next/image'
import Link from 'next/link'
import { PRODUCTS, STORE_REVIEW_HEADLINE, STORE_SOLD_HEADLINE, formatSoldCount } from '@/lib/products'
import ProductCard from '@/components/product/ProductCard'
import HomeTrustStrip from '@/components/home/HomeTrustStrip'

const GUMMIES = PRODUCTS.filter((p) => !p.format || p.format === 'gummy')
const POWDERS = PRODUCTS.filter((p) => p.format === 'powder_sachet')

const REVIEWS = [
  { name: 'سارة م.', city: 'الرياض', text: 'رونق C دخل روتيني الصباحي وما طلع منه. طعمه خفيف وما حسّيت إني آكل دواء.', rating: 5, badge: 'رونق C', accent: '#b8485c' },
  { name: 'نور ع.', city: 'جدة', text: 'خفّة بيوتك فرّق فعلاً بعد الغداء. كنت أحس بثقل كل يوم — الآن خفّ الإحساس.', rating: 5, badge: 'خفّة بيوتك', accent: '#a86b5e' },
  { name: 'ديمة خ.', city: 'الدمام', text: 'ليل ماج خلّى المساء أهدأ. أول مرة أنام بدون ما أحوّل وجهي في التفكير.', rating: 5, badge: 'ليل ماج', accent: '#b8485c' },
  { name: 'هدى ر.', city: 'مكة', text: 'جربت الثلاثة مع بعض — روتيني صار أكتمل وأحس إني أهتم بنفسي فعلاً لأول مرة.', rating: 5, badge: 'الثلاثة معاً', accent: '#943c50' },
] as const

const FAQS = [
  { q: 'هل الدفع عند الاستلام متاح في كل المناطق؟', a: 'نعم — جميع طلبات نبتة لابو بنظام COD فقط. ما في دفع إلكتروني ولا بطاقة مطلوبة من الموقع.' },
  { q: 'ما الفرق بين العلكة والساشيه المسحوق؟', a: 'العلكة (رونق C، خفّة بيوتك، ليل ماج) تُمضغ مباشرة — مثالية للروتين السريع. الساشيه المسحوق (قوة شعر، وضوح، شهر هادئ) يُذاب في كوب ماء — تركيزات أعلى لمشاكل أعمق.' },
  { q: 'كم يستغرق التوصيل؟', a: '2-4 أيام عمل لجميع مناطق المملكة. فريقنا يتواصل معك قبل التوصيل للتأكيد.' },
  { q: 'متى أرى نتيجة واضحة؟', a: '4–8 أسابيع من الاستخدام اليومي المنتظم — المكمّل الغذائي يبني تأثيره مع الوقت، ليس في ليلة.' },
  { q: 'هل نبتة لابو صيدلية؟', a: 'لا — نبتة لابو متجر مكمّلات غذائية. SFDA · حلال · مو وصفة طبية. استشيري طبيبكِ عند أي حالة مزمنة.' },
] as const

export default function HomePage() {
  return (
    <div className="overflow-x-hidden">

      {/* ════════════════════════════════════════════════
          1. HERO — full-height, image dominates
      ════════════════════════════════════════════════ */}
      <section
        id="top"
        className="relative flex min-h-[92vh] flex-col lg:flex-row lg:min-h-screen"
        style={{ background: '#0f1a1b' }}
      >
        {/* Left: Text panel */}
        <div className="relative z-10 flex flex-col justify-center px-6 py-16 text-start sm:px-10 lg:w-[46%] lg:px-16 lg:py-20 xl:px-24">

          {/* badges row */}
          <div className="mb-6 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-[11px] font-bold text-white/90 backdrop-blur-sm">
              <span>🇸🇦</span> للسعوديات · كل المناطق
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#b8485c]/40 bg-[#b8485c]/15 px-3.5 py-1.5 text-[11px] font-bold text-[#e8909f] backdrop-blur-sm">
              🔥 <span dir="ltr" className="tabular-nums">{formatSoldCount(STORE_SOLD_HEADLINE)}</span> طلب مؤكّد
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-[11px] font-bold text-white/90 backdrop-blur-sm">
              SFDA · حلال · COD
            </span>
          </div>

          {/* Main headline */}
          <h1 className="mb-5 text-[2.6rem] font-black leading-[1.12] tracking-tight text-white sm:text-5xl lg:text-[3.25rem] xl:text-[3.75rem]">
            مشكلة واحدة
            <br />
            <span style={{ color: '#e8909f' }}>منتج واحد</span>
            <br />
            من الداخل.
          </h1>

          <p className="mb-8 max-w-sm text-base leading-relaxed text-white/70 sm:text-lg">
            6 منتجات — علكات وسواشيه مسحوق. شعر، بشرة، هضم، نوم، ودورة شهرية. دفع كاش عند الباب.
          </p>

          {/* CTAs */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="#gummies"
              className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-base font-black text-white transition hover:-translate-y-0.5 hover:brightness-110"
              style={{ background: 'linear-gradient(135deg, #b8485c 0%, #943c50 100%)', boxShadow: '0 12px 36px -8px rgba(184,72,92,0.5)' }}
            >
              شوفي المنتجات
            </Link>
            <Link
              href="#powders"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/8 px-8 py-4 text-base font-bold text-white backdrop-blur-sm transition hover:bg-white/15"
            >
              خط المسحوق الجديد
            </Link>
          </div>

          {/* Stars */}
          <div className="mt-8 flex items-center gap-3">
            <span className="text-lg tracking-tight text-yellow-400">★★★★★</span>
            <span className="text-sm font-semibold text-white/60">
              <span className="font-bold text-white">{STORE_REVIEW_HEADLINE}</span> تقييم في المملكة
            </span>
          </div>
        </div>

        {/* Right: Image — fills remaining space */}
        <div className="relative order-first h-[50vw] w-full lg:order-last lg:h-auto lg:flex-1">
          {/* Dark gradient overlay on left edge to blend with text panel */}
          <div
            className="absolute inset-y-0 start-0 z-10 w-1/4 lg:w-1/3"
            style={{ background: 'linear-gradient(to right, #0f1a1b, transparent)' }}
            aria-hidden
          />
          <Image
            src="/hero-store-trio.jpg"
            alt="منتجات نبتة لابو — علكات وسواشيه مسحوق لجمال حقيقي من الداخل"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 56vw"
            className="object-cover object-center"
          />
          {/* sold badge on image */}
          <div
            className="absolute bottom-5 end-5 z-20 rounded-2xl px-4 py-3 text-center"
            style={{ background: 'rgba(15,26,27,0.82)', border: '1px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(12px)' }}
          >
            <p dir="ltr" className="text-xl font-black tabular-nums text-white">{formatSoldCount(STORE_SOLD_HEADLINE)}</p>
            <p className="text-[10px] font-bold text-white/70">طلب مؤكّد في السعودية</p>
          </div>
        </div>
      </section>

      <HomeTrustStrip />

      {/* ════════════════════════════════════════════════
          2. TWO LINES — quick intro
      ════════════════════════════════════════════════ */}
      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-10 text-start">
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#146b70]">خطّان — هدفان</p>
            <h2 className="text-3xl font-black leading-tight text-[#1C1C1C] sm:text-4xl">
              علكات يومية، أو مسحوق مركّز.
              <br />
              <span className="text-[#b8485c]">اختاري حسب مشكلتك.</span>
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {/* Gummy line card */}
            <a href="#gummies" className="group relative overflow-hidden rounded-3xl p-8 transition hover:-translate-y-0.5 hover:shadow-xl sm:p-10" style={{ background: 'linear-gradient(135deg, #f8ece9 0%, #fdf8f6 100%)', border: '1px solid #e8d8d4' }}>
              <div className="mb-4 text-3xl">🍬</div>
              <p className="mb-1 text-[10px] font-black uppercase tracking-widest text-[#b8485c]">خط العلكات</p>
              <h3 className="mb-3 text-xl font-black text-[#1C1C1C]">رونق C · خفّة بيوتك · ليل ماج</h3>
              <p className="text-sm leading-relaxed text-[#5c5656]">علكتان في اليوم — صباح، بعد الأكل، أو مساء. سهلة الالتزام، طعم خفيف.</p>
              <p className="mt-4 text-sm font-bold text-[#b8485c] group-hover:underline">شوفي العلكات ←</p>
            </a>
            {/* Powder line card */}
            <a href="#powders" className="group relative overflow-hidden rounded-3xl p-8 transition hover:-translate-y-0.5 hover:shadow-xl sm:p-10" style={{ background: 'linear-gradient(135deg, #e8f5f0 0%, #f4fbf8 100%)', border: '1px solid #bde0d6' }}>
              <div className="mb-4 flex items-center gap-2">
                <span className="text-3xl">🌿</span>
                <span className="rounded-full bg-[#2D7D6F] px-2.5 py-0.5 text-[10px] font-black uppercase text-white">جديد</span>
              </div>
              <p className="mb-1 text-[10px] font-black uppercase tracking-widest text-[#2D7D6F]">خط المسحوق</p>
              <h3 className="mb-3 text-xl font-black text-[#1C1C1C]">قوة شعر · وضوح · شهر هادئ</h3>
              <p className="text-sm leading-relaxed text-[#5c5656]">ساشيه في كوب ماء كل يوم. تركيزات أعلى لمشاكل تحتاج أكثر من علكة.</p>
              <p className="mt-4 text-sm font-bold text-[#2D7D6F] group-hover:underline">شوفي المسحوق ←</p>
            </a>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          3. GUMMIES LINE
      ════════════════════════════════════════════════ */}
      <section id="gummies" className="scroll-mt-20 py-16 sm:py-20" style={{ background: '#faf8f7' }}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-12 text-start">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#b8485c] px-4 py-1.5 text-[11px] font-black uppercase tracking-widest text-white">
              🍬 خط العلكات
            </div>
            <h2 className="text-3xl font-black text-[#1C1C1C] sm:text-4xl">من الصباح للمساء — علكة واحدة لكل وقت</h2>
            <p className="mt-3 max-w-lg text-base text-[#5c5656]">
              ثلاثة أهداف مختلفة، تأكيد هاتفي، دفع عند الباب.
            </p>
          </div>
          <div className="grid grid-cols-1 items-stretch gap-5 md:grid-cols-3 md:gap-6">
            {GUMMIES.map((p) => (
              <ProductCard key={p.id} product={p} useHomeCardImage />
            ))}
          </div>

          {/* Bundle CTA */}
          <div
            className="mt-8 flex flex-col items-start justify-between gap-6 overflow-hidden rounded-3xl p-8 sm:flex-row sm:items-center"
            style={{ background: 'linear-gradient(135deg, #1C1C1C 0%, #3a2028 100%)' }}
          >
            <div className="text-white">
              <p className="mb-1 text-[11px] font-black uppercase tracking-widest text-[#e8909f]">العرض الأكثر طلباً</p>
              <h3 className="text-xl font-black sm:text-2xl">جربي الثلاثة معاً — روتين يوم كامل</h3>
              <p className="mt-1 text-sm text-white/60">رونق C صباحاً · خفّة بيوتك بعد الأكل · ليل ماج مساءً</p>
            </div>
            <div className="flex shrink-0 flex-col items-start gap-3 sm:items-end">
              <div>
                <p className="text-3xl font-black text-white">349 <span className="text-lg font-bold text-white/70">ريال</span></p>
                <p className="text-xs text-white/50">3 منتجات · COD · توفير</p>
              </div>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3 text-sm font-black text-[#1C1C1C] transition hover:bg-[#f1e6e4]"
              >
                شوفي كل العروض ←
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          4. POWDER LINE
      ════════════════════════════════════════════════ */}
      <section id="powders" className="scroll-mt-20 bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-12 text-start">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#2D7D6F] px-4 py-1.5 text-[11px] font-black uppercase tracking-widest text-white">
              🌿 خط المسحوق — جديد
            </div>
            <h2 className="text-3xl font-black text-[#1C1C1C] sm:text-4xl">
              شعر، بشرة، دورة — مشاكل أعمق
              <br />
              <span className="text-[#2D7D6F]">تحتاج تركيبة أقوى.</span>
            </h2>
            <p className="mt-3 max-w-lg text-base text-[#5c5656]">
              ساشيه واحد يومياً في كوب ماء أو عصير. كولاجين بحري، غلوتاثيون، مايو-إينوسيتول.
            </p>
          </div>
          <div className="grid grid-cols-1 items-stretch gap-5 md:grid-cols-3 md:gap-6">
            {POWDERS.map((p) => (
              <ProductCard key={p.id} product={p} useHomeCardImage />
            ))}
          </div>

          {/* Coming soon note */}
          <div
            className="mt-8 flex items-start gap-4 rounded-2xl p-5 sm:p-6"
            style={{ background: '#f0faf7', border: '1.5px solid #bde0d6' }}
          >
            <span className="mt-0.5 text-2xl">📦</span>
            <div>
              <p className="font-bold text-[#1C1C1C]">الصور الرسمية قادمة قريباً</p>
              <p className="mt-1 text-sm text-[#5c5656]">
                المنتجات متاحة للطلب الآن — نعمل على التصوير الاحترافي للمنتجات الجديدة. كل طلب يُؤكَّد بمكالمة ويُسلَّم COD كالمعتاد.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          5. PROOF STRIP — numbers + benefits
      ════════════════════════════════════════════════ */}
      <section className="py-14 sm:py-16" style={{ background: 'linear-gradient(135deg, #0f3a3d 0%, #146b70 100%)' }}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-8 sm:grid-cols-3">
            {[
              { num: formatSoldCount(STORE_SOLD_HEADLINE), label: 'طلب مؤكّد في المملكة', sub: 'من الرياض لجدة للدمام' },
              { num: `${STORE_REVIEW_HEADLINE}+`, label: 'تقييم موثّق', sub: '4.8 متوسط — ★★★★★' },
              { num: '6', label: 'منتجات متخصصة', sub: 'لكل مشكلة حلّها الخاص' },
            ].map((stat) => (
              <div key={stat.label} className="text-start">
                <p dir="ltr" className="text-4xl font-black text-white sm:text-5xl">{stat.num}</p>
                <p className="mt-1 font-bold text-white">{stat.label}</p>
                <p className="mt-0.5 text-sm text-white/60">{stat.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          6. HOW IT WORKS
      ════════════════════════════════════════════════ */}
      <section id="how" className="scroll-mt-20 bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-12 text-start">
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#b8485c]">كيف الطلب</p>
            <h2 className="text-3xl font-black text-[#1C1C1C] sm:text-4xl">4 خطوات من الاختيار للباب</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { n: '01', icon: '✨', title: 'اختاري المنتج', desc: 'علكة أو ساشيه مسحوق حسب مشكلتك — شعر، بشرة، هضم، نوم، أو دورة.' },
              { n: '02', icon: '💎', title: 'حدّدي الكمية', desc: 'قطعة للتجربة أو عرض 2–3 للتوفير. السعر يتفصّل بلا ضغط.' },
              { n: '03', icon: '☎️', title: 'تأكيد هاتفي', desc: 'فريقنا يتصل بك لتأكيد العنوان والطلب — مو رد آلي، شخص حقيقي.' },
              { n: '04', icon: '📦', title: 'الدفع عند الباب', desc: 'كاش عند الاستلام. توصيل 2–4 أيام لكل مناطق المملكة.' },
            ].map((step) => (
              <div
                key={step.n}
                className="flex flex-col gap-4 rounded-3xl p-6 sm:p-7"
                style={{ background: '#faf8f7', border: '1px solid #ece5e2' }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-black text-[#e0d0cc]" aria-hidden>{step.n}</span>
                  <span className="text-2xl" aria-hidden>{step.icon}</span>
                </div>
                <h3 className="text-lg font-black text-[#1C1C1C]">{step.title}</h3>
                <p className="text-sm leading-relaxed text-[#5c5656]">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          7. INGREDIENTS — 6 products
      ════════════════════════════════════════════════ */}
      <section className="py-14 sm:py-16" style={{ background: '#faf8f7' }}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-10 text-start">
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#146b70]">شفافية كاملة</p>
            <h2 className="text-3xl font-black text-[#1C1C1C] sm:text-4xl">المكوّنات — مو أسرار</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { code: 'NL-01', name: 'بيوتين + زنك + D', latin: 'Biotin · Zinc · Vit D', product: 'رونق C', accent: '#b8485c', bg: '#fdf5f6' },
              { code: 'NL-02', name: 'بروبيوتيك + ألياف', latin: 'Probiotics · Fiber', product: 'خفّة بيوتك', accent: '#a86b5e', bg: '#fdf5f0' },
              { code: 'NL-03', name: 'مغنيسيوم + L-Theanine', latin: 'Magnesium · L-Theanine', product: 'ليل ماج', accent: '#b8485c', bg: '#fdf5f6' },
              { code: 'NL-04', name: 'كولاجين بحري + بيوتين + زنك + حديد', latin: 'Marine Collagen · Biotin · Zinc · Iron', product: 'قوة شعر', accent: '#8B6248', bg: '#fef9f4' },
              { code: 'NL-05', name: 'غلوتاثيون + كولاجين + زنك + فيتامين C', latin: 'Glutathione · Collagen · Zinc · Vit C', product: 'وضوح', accent: '#2D7D6F', bg: '#f0faf7' },
              { code: 'NL-06', name: 'مايو-إينوسيتول + فيتكس + مغنيسيوم + B6', latin: 'Myo-Inositol · Vitex · Magnesium · B6', product: 'شهر هادئ', accent: '#7B5EA7', bg: '#f6f2fb' },
            ].map((ing) => (
              <div key={ing.code} className="flex flex-col gap-2 rounded-2xl p-5" style={{ background: ing.bg, border: `1.5px solid ${ing.accent}22` }}>
                <div className="flex items-center justify-between">
                  <span className="rounded-lg px-2 py-0.5 text-[10px] font-mono font-black" style={{ background: `${ing.accent}18`, color: ing.accent }}>{ing.code}</span>
                  <span className="text-[10px] font-bold text-[#5c5656]">{ing.product}</span>
                </div>
                <p className="font-black text-[#1C1C1C]">{ing.name}</p>
                <p className="text-[11px] font-mono leading-snug text-[#5c5656]">{ing.latin}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          8. REVIEWS
      ════════════════════════════════════════════════ */}
      <section id="reviews" className="scroll-mt-20 bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-12 text-start">
            <div className="mb-4 inline-flex items-center gap-3 rounded-2xl border border-[#e8d8d4] bg-[#fdf8f6] px-5 py-3">
              <span className="text-xl text-yellow-400">★★★★★</span>
              <div>
                <span className="text-lg font-black text-[#1C1C1C]">4.8</span>
                <span className="mr-1.5 text-sm text-[#5c5656]">/ 5 من {STORE_REVIEW_HEADLINE} تقييم</span>
              </div>
            </div>
            <h2 className="text-3xl font-black text-[#1C1C1C] sm:text-4xl">قالت عميلاتنا — بكلامهن</h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {REVIEWS.map((r) => (
              <div
                key={r.name}
                className="flex flex-col gap-5 rounded-3xl p-7"
                style={{ background: '#faf8f7', border: '1.5px solid #ece5e2' }}
              >
                <p className="text-base leading-relaxed text-[#1C1C1C]">&ldquo;{r.text}&rdquo;</p>
                <div className="flex items-center justify-between border-t border-[#ece5e2] pt-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-black text-white"
                      style={{ background: r.accent }}
                    >
                      {r.name[0]}
                    </div>
                    <div>
                      <p className="font-bold text-[#1C1C1C]">{r.name}</p>
                      <p className="text-xs text-[#5c5656]">{r.city} · عميلة موثّقة</p>
                    </div>
                  </div>
                  <span className="rounded-full px-3 py-1 text-[11px] font-bold text-white" style={{ background: r.accent }}>
                    {r.badge}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          9. FAQ
      ════════════════════════════════════════════════ */}
      <section id="faq" className="scroll-mt-20 py-14 sm:py-16" style={{ background: '#faf8f7' }}>
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="mb-10 text-start">
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#c9937e]">أسئلة شائعة</p>
            <h2 className="text-3xl font-black text-[#1C1C1C] sm:text-4xl">عندك سؤال؟</h2>
          </div>
          <div className="flex flex-col gap-2">
            {FAQS.map((faq) => (
              <details key={faq.q} className="group overflow-hidden rounded-2xl border border-[#e0d8d5] bg-white">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 font-bold text-[#1C1C1C] hover:bg-[#faf5f3]">
                  {faq.q}
                  <span className="shrink-0 text-[#b8485c] transition-transform group-open:rotate-180">▼</span>
                </summary>
                <div className="border-t border-[#e0d8d5] bg-[#fdf8f6] px-6 py-5 text-sm leading-relaxed text-[#5c5656]">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          10. FINAL CTA
      ════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-20 sm:py-24">
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, #0f1a1b 0%, #1a2f30 40%, #3a1e26 80%, #1C1C1C 100%)' }}
          aria-hidden
        />
        {/* decorative circles */}
        <div className="absolute -top-20 -start-20 h-80 w-80 rounded-full opacity-10" style={{ background: '#b8485c' }} aria-hidden />
        <div className="absolute -bottom-20 -end-20 h-80 w-80 rounded-full opacity-10" style={{ background: '#2D7D6F' }} aria-hidden />

        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
          <p className="mb-4 text-[11px] font-black uppercase tracking-widest text-[#e8909f]">ابدئي من هنا</p>
          <h2 className="mb-5 text-4xl font-black text-white sm:text-5xl">
            6 منتجات — مشكلة واحدة لكل.
            <br />
            <span className="text-[#e8909f]">اختاري خطوتك الأولى.</span>
          </h2>
          <p className="mx-auto mb-10 max-w-md text-base leading-relaxed text-white/65">
            COD · تأكيد هاتفي · توصيل كل المناطق · SFDA · حلال
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="#gummies"
              className="inline-flex items-center gap-2 rounded-full px-10 py-4 text-base font-black text-white shadow-2xl transition hover:-translate-y-0.5"
              style={{ background: 'linear-gradient(135deg, #b8485c 0%, #943c50 100%)', boxShadow: '0 16px 48px -12px rgba(184,72,92,0.55)' }}
            >
              🍬 خط العلكات
            </Link>
            <Link
              href="#powders"
              className="inline-flex items-center gap-2 rounded-full px-10 py-4 text-base font-black text-white shadow-2xl transition hover:-translate-y-0.5"
              style={{ background: 'linear-gradient(135deg, #2D7D6F 0%, #1e5e52 100%)', boxShadow: '0 16px 48px -12px rgba(45,125,111,0.45)' }}
            >
              🌿 خط المسحوق
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
