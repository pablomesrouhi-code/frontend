import Image from 'next/image'
import Link from 'next/link'
import { PRODUCTS, STORE_REVIEW_HEADLINE, STORE_SOLD_HEADLINE, formatSoldCount } from '@/lib/products'
import ProductCard from '@/components/product/ProductCard'
import HomeTrustStrip from '@/components/home/HomeTrustStrip'

const GUMMIES = PRODUCTS.filter((p) => !p.format || p.format === 'gummy')
const POWDERS = PRODUCTS.filter((p) => p.format === 'powder_sachet')

const REVIEWS = [
  { name: 'سارة م.', city: 'الرياض', text: 'رونق C دخل روتيني الصباحي وما خرج. طعمه خفيف وما أحس إني آخذ دواء — تذكّرني بنفسي.', rating: 5, badge: 'رونق C', accent: '#b8485c' },
  { name: 'نور ع.', city: 'جدة', text: 'خفّة بيوتك فرّق معي بعد الغداء. كنت أحس بثقل كل يوم — الآن صار يومي أخف.', rating: 5, badge: 'خفّة بيوتك', accent: '#a86b5e' },
  { name: 'ديمة خ.', city: 'الدمام', text: 'ليل ماج خلّى مسائي أهدأ. أول مرة من زمان أنام بدون ما يدور في رأسي ألف فكرة.', rating: 5, badge: 'ليل ماج', accent: '#b8485c' },
  { name: 'هدى ر.', city: 'مكة', text: 'طلبت الثلاثة مع بعض وهذا أفضل قرار. روتيني صار متكامل وأحس إني أعتني بنفسي فعلاً.', rating: 5, badge: 'الثلاثة معاً', accent: '#943c50' },
] as const

const FAQS = [
  { q: 'هل الدفع عند الاستلام متاح في كل مناطق المملكة؟', a: 'نعم — جميع طلبات نبتة لابو بنظام COD كاش عند الباب. ما في دفع إلكتروني ولا بطاقة من الموقع.' },
  { q: 'ما الفرق بين العلكة والساشيه المسحوق؟', a: 'العلكة (رونق C، خفّة بيوتك، ليل ماج) تُمضغ مباشرة — مثالية للروتين اليومي السريع. ساشيه المسحوق (قوة شعر، وضوح، شهر هادئ) يُذاب في كوب ماء أو عصير — تركيز أعلى ومكوّنات أعمق لمشاكل محدّدة.' },
  { q: 'كم يستغرق التوصيل؟', a: '2–4 أيام عمل لجميع مناطق المملكة. فريقنا يتواصل معك هاتفياً قبل التوصيل للتأكيد.' },
  { q: 'متى أرى نتيجة واضحة؟', a: '4–8 أسابيع استخدام يومي منتظم — المكمّل الغذائي يبني تأثيره مع الوقت. الالتزام هو الفرق.' },
  { q: 'هل نبتة لابو صيدلية؟', a: 'لا — نبتة لابو متجر مكمّلات غذائية. SFDA · حلال · مو وصفة طبية. استشيري طبيبكِ عند أي حالة مزمنة أو حمل.' },
] as const

export default function HomePage() {
  return (
    <div className="overflow-x-hidden bg-white">

      {/* ══════════════════════════════════════════════════════
          1. HERO — full-bleed magazine style
      ══════════════════════════════════════════════════════ */}
      <section id="top" className="relative">
        {/* Image — full-bleed on desktop with overlay */}
        <div className="relative h-[78vh] min-h-[640px] w-full overflow-hidden sm:h-[88vh] lg:h-screen lg:max-h-[840px]">
          <Image
            src="/hero-store-trio.jpg"
            alt="منتجات نبتة لابو — علكات وسواشيه مسحوق"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />

          {/* gradient overlay for text legibility */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(105deg, rgba(28,28,28,0.78) 0%, rgba(28,28,28,0.55) 30%, rgba(28,28,28,0.15) 60%, transparent 90%)',
            }}
            aria-hidden
          />

          {/* Content */}
          <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-6 sm:px-10 lg:px-16">
            <div className="max-w-2xl text-start">
              {/* eyebrow */}
              <div className="mb-6 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-[11px] font-bold text-white backdrop-blur-md">
                  🇸🇦 للسعوديات · كل المناطق
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-[11px] font-bold text-white backdrop-blur-md">
                  SFDA · حلال · COD
                </span>
              </div>

              {/* Headline */}
              <h1 className="mb-6 text-[2.75rem] font-black leading-[1.05] tracking-tight text-white sm:text-[3.5rem] lg:text-[4.5rem] xl:text-[5rem]">
                جسمك يستاهل
                <br />
                <span className="text-[#ffb8c4]">روتين واضح</span>
                <br />
                من الداخل.
              </h1>

              {/* Sub */}
              <p className="mb-8 max-w-md text-base leading-relaxed text-white/85 sm:text-lg">
                6 منتجات — لكل مشكلة منتج. شعر، بشرة، هضم، نوم، ودورة شهرية.
              </p>

              {/* CTAs */}
              <div className="mb-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="#products"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-9 py-4 text-base font-black text-[#1C1C1C] transition hover:-translate-y-0.5 hover:bg-[#fdf9f7]"
                  style={{ boxShadow: '0 18px 50px -12px rgba(0,0,0,0.5)' }}
                >
                  اكتشفي منتجاتنا ←
                </Link>
                <Link
                  href="#products"
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/40 bg-white/10 px-7 py-4 text-base font-bold text-white backdrop-blur-md transition hover:bg-white/20"
                >
                  COD · توصيل المملكة
                </Link>
              </div>

              {/* Social proof bar */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg text-[#ffd066]">★★★★★</span>
                  <span className="text-sm font-bold text-white">
                    4.8 <span className="font-normal text-white/65">/ 5</span>
                  </span>
                </div>
                <div className="text-sm font-semibold text-white/85">
                  <span dir="ltr" className="font-black text-white">{formatSoldCount(STORE_SOLD_HEADLINE)}</span> طلب مؤكّد
                </div>
                <div className="text-sm font-semibold text-white/85">
                  <span className="font-black text-white">{STORE_REVIEW_HEADLINE}+</span> تقييم
                </div>
              </div>
            </div>
          </div>

          {/* Bottom scroll hint */}
          <div className="absolute bottom-6 start-1/2 z-10 -translate-x-1/2 text-center">
            <a href="#products" aria-label="انتقلي للمنتجات">
              <div className="mx-auto flex h-10 w-6 items-start justify-center rounded-full border-2 border-white/40 p-1.5">
                <div className="h-2 w-1 animate-bounce rounded-full bg-white/70" />
              </div>
            </a>
          </div>
        </div>
      </section>

      <HomeTrustStrip />

      {/* ══════════════════════════════════════════════════════
          2. PRODUCTS INTRO — line picker
      ══════════════════════════════════════════════════════ */}
      <section id="products" className="scroll-mt-16 bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-12 max-w-2xl text-start">
            <p className="mb-3 text-[11px] font-black uppercase tracking-widest text-[#146b70]">منتجاتنا</p>
            <h2 className="text-4xl font-black leading-tight text-[#1C1C1C] sm:text-5xl">
              خطّان. <span className="text-[#b8485c]">ست منتجات.</span>
              <br />
              مشكلة واحدة لكل.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#5c5656] sm:text-lg">
              اختاري حسب ما يحتاجه جسمك — علكة سريعة للروتين اليومي، أو ساشيه مركّز للمشاكل الأعمق.
            </p>
          </div>

          {/* line picker cards */}
          <div className="grid gap-4 sm:grid-cols-2">
            <a
              href="#gummies-line"
              className="group relative flex flex-col gap-4 overflow-hidden rounded-3xl p-8 transition hover:-translate-y-1 hover:shadow-xl sm:p-10"
              style={{ background: 'linear-gradient(150deg, #fdf2f0 0%, #fff 100%)', border: '1.5px solid #f0d8d2' }}
            >
              <div className="absolute -end-8 -top-8 h-32 w-32 rounded-full bg-[#b8485c] opacity-10 blur-3xl transition group-hover:opacity-20" aria-hidden />
              <span className="text-4xl">🍬</span>
              <div>
                <p className="mb-1 text-[10px] font-black uppercase tracking-widest text-[#b8485c]">خط العلكات · 3 منتجات</p>
                <h3 className="mb-2 text-2xl font-black text-[#1C1C1C]">العلكات اليومية</h3>
                <p className="text-sm leading-relaxed text-[#5c5656]">
                  رونق C صباحاً · خفّة بيوتك بعد الأكل · ليل ماج مساءً. علكتان في اليوم، طعم خفيف.
                </p>
              </div>
              <div className="mt-auto flex items-center justify-between border-t border-[#f0d8d2] pt-4">
                <span className="text-sm font-black text-[#b8485c] group-hover:underline">شوفي الخط ←</span>
                <span className="text-sm font-bold text-[#5c5656]">من <span className="text-[#1C1C1C]">199 ر.س</span></span>
              </div>
            </a>

            <a
              href="#powders-line"
              className="group relative flex flex-col gap-4 overflow-hidden rounded-3xl p-8 transition hover:-translate-y-1 hover:shadow-xl sm:p-10"
              style={{ background: 'linear-gradient(150deg, #ecf6f3 0%, #fff 100%)', border: '1.5px solid #b8e0d4' }}
            >
              <div className="absolute -end-8 -top-8 h-32 w-32 rounded-full bg-[#2D7D6F] opacity-10 blur-3xl transition group-hover:opacity-20" aria-hidden />
              <div className="flex items-center gap-2">
                <span className="text-4xl">🌿</span>
                <span className="rounded-full bg-[#2D7D6F] px-3 py-1 text-[10px] font-black uppercase text-white">جديد</span>
              </div>
              <div>
                <p className="mb-1 text-[10px] font-black uppercase tracking-widest text-[#2D7D6F]">خط المسحوق · 3 منتجات</p>
                <h3 className="mb-2 text-2xl font-black text-[#1C1C1C]">السواشيه المركّزة</h3>
                <p className="text-sm leading-relaxed text-[#5c5656]">
                  قوة شعر · وضوح · شهر هادئ. ساشيه في كوب ماء — تركيبات أعمق للشعر والبشرة والدورة.
                </p>
              </div>
              <div className="mt-auto flex items-center justify-between border-t border-[#b8e0d4] pt-4">
                <span className="text-sm font-black text-[#2D7D6F] group-hover:underline">شوفي الخط ←</span>
                <span className="text-sm font-bold text-[#5c5656]">من <span className="text-[#1C1C1C]">199 ر.س</span></span>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          3. GUMMY LINE
      ══════════════════════════════════════════════════════ */}
      <section id="gummies-line" className="scroll-mt-16 py-16 sm:py-20" style={{ background: '#faf8f7' }}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-10 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <span className="mb-3 inline-block rounded-full bg-[#b8485c] px-4 py-1.5 text-[11px] font-black uppercase tracking-widest text-white">
                🍬 خط العلكات
              </span>
              <h2 className="text-3xl font-black text-[#1C1C1C] sm:text-4xl">روتين صباح–بعد الأكل–مساء</h2>
              <p className="mt-2 max-w-md text-[#5c5656]">ثلاث علكات لثلاث أوقات. سهلة الالتزام كل يوم.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 items-stretch gap-5 md:grid-cols-3">
            {GUMMIES.map((p) => (
              <ProductCard key={p.id} product={p} useHomeCardImage />
            ))}
          </div>

          {/* bundle */}
          <div
            className="mt-8 grid grid-cols-1 items-center gap-6 overflow-hidden rounded-3xl p-7 sm:grid-cols-[1fr_auto] sm:p-9"
            style={{ background: 'linear-gradient(135deg, #b8485c 0%, #7a2c3b 100%)' }}
          >
            <div className="text-white">
              <p className="mb-1 text-[11px] font-black uppercase tracking-widest text-white/55">العرض الأكثر طلباً</p>
              <h3 className="text-2xl font-black sm:text-3xl">جربي الثلاثة — روتين يوم كامل</h3>
              <p className="mt-2 text-sm text-white/70">رونق C صباحاً + خفّة بيوتك بعد الأكل + ليل ماج مساءً</p>
            </div>
            <div className="flex flex-col items-start gap-3 sm:items-end">
              <p className="text-4xl font-black text-white">
                349 <span className="text-lg font-bold text-white/70">ريال</span>
              </p>
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-7 py-3.5 text-sm font-black text-[#b8485c] transition hover:bg-[#fff5f5]"
              >
                اطلبي الباقة ←
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          4. POWDER LINE
      ══════════════════════════════════════════════════════ */}
      <section id="powders-line" className="scroll-mt-16 bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-10 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <span className="mb-3 inline-block rounded-full bg-[#2D7D6F] px-4 py-1.5 text-[11px] font-black uppercase tracking-widest text-white">
                🌿 خط المسحوق · جديد
              </span>
              <h2 className="text-3xl font-black text-[#1C1C1C] sm:text-4xl">
                شعر، بشرة، ودورة — تركيبة مركّزة
              </h2>
              <p className="mt-2 max-w-md text-[#5c5656]">
                ساشيه واحد يومياً في كوب ماء أو عصير. كولاجين بحري، غلوتاثيون، مايو-إينوسيتول.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 items-stretch gap-5 md:grid-cols-3">
            {POWDERS.map((p) => (
              <ProductCard key={p.id} product={p} useHomeCardImage />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          5. PROOF NUMBERS (dark)
      ══════════════════════════════════════════════════════ */}
      <section style={{ background: 'linear-gradient(135deg, #0d3538 0%, #146b70 100%)' }} className="py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-8 sm:grid-cols-3">
            {[
              { n: formatSoldCount(STORE_SOLD_HEADLINE), label: 'طلب مؤكّد', sub: 'من كل مناطق المملكة' },
              { n: `${STORE_REVIEW_HEADLINE}+`, label: 'تقييم موثّق', sub: 'متوسط 4.8 ★★★★★' },
              { n: '6', label: 'منتجات متخصصة', sub: 'علكات + سواشيه' },
            ].map((s) => (
              <div key={s.label} className="text-start">
                <p dir="ltr" className="text-5xl font-black text-white sm:text-6xl">{s.n}</p>
                <p className="mt-3 font-black text-white">{s.label}</p>
                <p className="mt-1 text-sm text-white/55">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          6. HOW IT WORKS
      ══════════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-20" style={{ background: '#faf8f7' }}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-12 max-w-xl text-start">
            <p className="mb-2 text-[11px] font-black uppercase tracking-widest text-[#b8485c]">كيف الطلب</p>
            <h2 className="text-4xl font-black text-[#1C1C1C]">4 خطوات — من الاختيار للباب</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { n: '01', icon: '✨', title: 'اختاري المنتج', desc: 'علكة أو ساشيه حسب مشكلتك.' },
              { n: '02', icon: '🎯', title: 'حدّدي الكمية', desc: 'قطعة للتجربة أو 2–3 للتوفير.' },
              { n: '03', icon: '☎️', title: 'تأكيد هاتفي', desc: 'فريقنا يتصل بك — شخص حقيقي.' },
              { n: '04', icon: '📦', title: 'الدفع عند الباب', desc: 'كاش COD · 2–4 أيام عمل.' },
            ].map((step) => (
              <div
                key={step.n}
                className="flex flex-col gap-4 rounded-3xl bg-white p-7 transition hover:-translate-y-1 hover:shadow-md"
                style={{ border: '1.5px solid #ece5e2' }}
              >
                <div className="flex items-start justify-between">
                  <span className="text-[2.75rem] font-black leading-none text-[#ead4cf]" aria-hidden>{step.n}</span>
                  <span className="text-2xl" aria-hidden>{step.icon}</span>
                </div>
                <h3 className="text-lg font-black text-[#1C1C1C]">{step.title}</h3>
                <p className="text-sm leading-relaxed text-[#5c5656]">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          7. REVIEWS
      ══════════════════════════════════════════════════════ */}
      <section id="reviews" className="scroll-mt-20 bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-12 flex flex-col items-start gap-4 text-start">
            <div className="inline-flex items-center gap-3 rounded-2xl bg-[#faf8f7] px-5 py-3" style={{ border: '1.5px solid #ece5e2' }}>
              <span className="text-xl text-[#e8b84b]">★★★★★</span>
              <p className="text-[#1C1C1C]">
                <span className="text-lg font-black">4.8</span>
                <span className="mr-1 text-sm text-[#5c5656]">/ 5 · {STORE_REVIEW_HEADLINE}+ تقييم موثّق</span>
              </p>
            </div>
            <h2 className="text-4xl font-black text-[#1C1C1C]">قالت عميلاتنا — بكلامهن</h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {REVIEWS.map((r) => (
              <div
                key={r.name}
                className="flex flex-col gap-5 rounded-3xl bg-[#faf8f7] p-7"
                style={{ border: '1.5px solid #ece5e2' }}
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="text-lg text-[#e8b84b]">★★★★★</span>
                  <span className="rounded-full px-3 py-1 text-[11px] font-black text-white" style={{ background: r.accent }}>
                    {r.badge}
                  </span>
                </div>
                <p className="text-base leading-relaxed text-[#1C1C1C]">&ldquo;{r.text}&rdquo;</p>
                <div className="flex items-center gap-3 border-t border-[#ece5e2] pt-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-black text-white" style={{ background: r.accent }}>
                    {r.name[0]}
                  </div>
                  <div>
                    <p className="font-black text-[#1C1C1C]">{r.name}</p>
                    <p className="text-xs text-[#5c5656]">{r.city} · عميلة موثّقة ✓</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          8. FAQ
      ══════════════════════════════════════════════════════ */}
      <section id="faq" className="scroll-mt-20 py-14 sm:py-16" style={{ background: '#faf8f7' }}>
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="mb-10 text-start">
            <p className="mb-2 text-[11px] font-black uppercase tracking-widest text-[#c9937e]">أسئلة شائعة</p>
            <h2 className="text-4xl font-black text-[#1C1C1C]">عندك سؤال؟</h2>
          </div>
          <div className="flex flex-col gap-2">
            {FAQS.map((faq) => (
              <details
                key={faq.q}
                className="group overflow-hidden rounded-2xl bg-white"
                style={{ border: '1.5px solid #ece5e2' }}
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 font-bold text-[#1C1C1C] hover:bg-[#fdf9f7]">
                  {faq.q}
                  <span className="shrink-0 text-[#b8485c] transition-transform group-open:rotate-180">▼</span>
                </summary>
                <div className="border-t border-[#ece5e2] bg-[#fdf9f7] px-6 py-5 text-sm leading-relaxed text-[#5c5656]">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          9. FINAL CTA (dark, dramatic)
      ══════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-20 sm:py-28" style={{ background: '#1C1C1C' }}>
        <div className="pointer-events-none absolute -top-32 end-0 h-[600px] w-[600px] rounded-full opacity-[0.06] blur-3xl" style={{ background: '#b8485c' }} aria-hidden />
        <div className="pointer-events-none absolute -bottom-32 start-0 h-[500px] w-[500px] rounded-full opacity-[0.06] blur-3xl" style={{ background: '#2D7D6F' }} aria-hidden />

        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
          <p className="mb-5 text-[11px] font-black uppercase tracking-widest text-[#ffb8c4]">ابدئي من هنا</p>
          <h2 className="mb-6 text-4xl font-black leading-[1.1] text-white sm:text-6xl">
            جسمك يستاهل
            <br />
            <span className="text-[#ffb8c4]">روتين يثبت.</span>
          </h2>
          <p className="mx-auto mb-12 max-w-md text-base leading-relaxed text-white/55 sm:text-lg">
            COD · تأكيد هاتفي · توصيل كل مناطق المملكة · SFDA · حلال
          </p>
          <Link
            href="#products"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-12 py-5 text-base font-black text-[#1C1C1C] transition hover:-translate-y-0.5 sm:text-lg"
            style={{ boxShadow: '0 24px 60px -12px rgba(255,255,255,0.25)' }}
          >
            اكتشفي منتجاتنا ←
          </Link>
        </div>
      </section>
    </div>
  )
}
