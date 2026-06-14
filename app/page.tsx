import Image from 'next/image'
import Link from 'next/link'
import { PRODUCTS, STORE_REVIEW_HEADLINE, STORE_SOLD_HEADLINE, formatSoldCount } from '@/lib/products'
import ProductCard from '@/components/product/ProductCard'
import HomeTrustStrip from '@/components/home/HomeTrustStrip'

const GUMMIES = PRODUCTS.filter((p) => !p.format || p.format === 'gummy')
const POWDERS = PRODUCTS.filter((p) => p.format === 'powder_sachet')

const REVIEWS = [
  { name: 'سارة م.', city: 'الرياض', text: 'رونق C دخل روتيني الصباحي وما طلع — طعمه خفيف وما أحس إني آكل دواء، بالعكس تذكريني بنفسي.', rating: 5, badge: 'رونق C', accent: '#b8485c' },
  { name: 'نور ع.', city: 'جدة', text: 'خفّة بيوتك فرّق فعلاً بعد الغداء. كنت أشكي من الثقل كل يوم — الآن خفّ الإحساس وكأن جسمي ارتاح.', rating: 5, badge: 'خفّة بيوتك', accent: '#a86b5e' },
  { name: 'ديمة خ.', city: 'الدمام', text: 'ليل ماج خلّى المساء أهدأ. أول مرة من زمان أنام بدون ما يدور في رأسي كل شيء.', rating: 5, badge: 'ليل ماج', accent: '#b8485c' },
  { name: 'هدى ر.', city: 'مكة', text: 'طلبت الثلاثة مع بعض وهذا القرار الصح. روتيني صار متكامل وأحس إني أهتم بنفسي فعلاً.', rating: 5, badge: 'الثلاثة معاً', accent: '#943c50' },
] as const

const FAQS = [
  { q: 'هل الدفع عند الاستلام متاح في كل مناطق المملكة؟', a: 'نعم — جميع طلبات نبتة لابو بنظام COD كاش عند الباب. ما في دفع إلكتروني ولا بطاقة من الموقع.' },
  { q: 'ما الفرق بين العلكة والساشيه المسحوق؟', a: 'العلكة (رونق C، خفّة بيوتك، ليل ماج) تُمضغ مباشرة — مثالية للروتين اليومي السريع. ساشيه المسحوق (قوة شعر، وضوح، شهر هادئ) يُذاب في كوب ماء أو عصير — تركيزات أعلى وتركيبة مركّزة لمشاكل أعمق.' },
  { q: 'كم يستغرق التوصيل؟', a: '2–4 أيام عمل لجميع مناطق المملكة. فريقنا يتواصل معك هاتفياً قبل التوصيل للتأكيد.' },
  { q: 'متى أرى نتيجة واضحة؟', a: '4–8 أسابيع استخدام يومي منتظم — المكمّل الغذائي يبني تأثيره مع الوقت. الالتزام هو الفرق.' },
  { q: 'هل نبتة لابو صيدلية؟', a: 'لا — نبتة لابو متجر مكمّلات غذائية. SFDA · حلال · مو وصفة طبية. استشيري طبيبكِ عند أي حالة مزمنة أو حمل.' },
] as const

export default function HomePage() {
  return (
    <div className="overflow-x-hidden">

      {/* ══════════════════════════════════════════════
          HERO — editorial split, image bleeds full-height
      ══════════════════════════════════════════════ */}
      <section
        id="top"
        className="relative grid min-h-[88vh] grid-cols-1 lg:grid-cols-[1fr_52%] lg:min-h-screen"
        style={{ background: 'linear-gradient(160deg, #fff9f8 0%, #fff 55%)' }}
      >
        {/* Left: copy */}
        <div className="flex flex-col justify-center px-6 py-16 text-start sm:px-10 lg:px-14 xl:px-20">

          {/* top badges */}
          <div className="mb-7 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f1e6e4] px-3.5 py-1.5 text-[11px] font-bold text-[#b8485c]">
              🇸🇦 للسعوديات · كل المناطق
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f0faf4] px-3.5 py-1.5 text-[11px] font-bold text-[#146b70]">
              SFDA · حلال · COD
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#1C1C1C] px-3.5 py-1.5 text-[11px] font-bold text-white">
              🔥 <span dir="ltr">{formatSoldCount(STORE_SOLD_HEADLINE)}</span> طلب مؤكّد
            </span>
          </div>

          {/* headline */}
          <h1 className="mb-5 text-[2.8rem] font-black leading-[1.08] tracking-tight text-[#1C1C1C] sm:text-5xl lg:text-[3.5rem] xl:text-[4rem]">
            جسمك يستاهل
            <br />
            <span style={{ color: '#b8485c' }}>روتين واضح</span>
            <br />
            من الداخل.
          </h1>

          <p className="mb-8 max-w-sm text-base leading-relaxed text-[#5c5656] sm:text-lg">
            6 منتجات — كل واحدة لمشكلة وحدة. شعر، بشرة، هضم، نوم، دورة شهرية. COD · تأكيد هاتفي · توصيل المملكة.
          </p>

          {/* stars */}
          <div className="mb-8 flex items-center gap-3">
            <span className="text-lg text-[#e8b84b]">★★★★★</span>
            <span className="text-sm text-[#5c5656]">
              <span className="font-black text-[#1C1C1C]">{STORE_REVIEW_HEADLINE}+</span> تقييم موثّق في المملكة
            </span>
          </div>

          {/* CTAs */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="#gummies"
              className="inline-flex items-center justify-center rounded-full px-9 py-4 text-base font-black text-white transition hover:brightness-105 hover:-translate-y-0.5"
              style={{
                background: '#b8485c',
                boxShadow: '0 14px 40px -10px rgba(184,72,92,0.45)',
              }}
            >
              اختاري منتجك
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center justify-center rounded-full border-2 border-[#1C1C1C]/10 bg-white px-8 py-4 text-base font-bold text-[#1C1C1C] transition hover:border-[#b8485c]/30 hover:bg-[#fff9f8]"
            >
              كل المنتجات
            </Link>
          </div>
        </div>

        {/* Right: image — bleeds to edges, no box */}
        <div className="relative order-first h-[55vw] w-full overflow-hidden lg:order-last lg:h-auto">
          <Image
            src="/hero-store-trio.jpg"
            alt="منتجات نبتة لابو — علكات وسواشيه مسحوق"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 52vw"
            className="object-cover object-center"
          />
          {/* subtle left fade to blend with white panel */}
          <div
            className="absolute inset-y-0 start-0 w-16 lg:w-24"
            style={{ background: 'linear-gradient(to right, #fff9f8, transparent)' }}
            aria-hidden
          />
          {/* sold floating badge */}
          <div
            className="absolute bottom-5 end-5 rounded-2xl px-4 py-3 text-center"
            style={{
              background: 'rgba(255,255,255,0.95)',
              border: '1px solid #e8d8d4',
              boxShadow: '0 8px 32px -8px rgba(184,72,92,0.2)',
              backdropFilter: 'blur(12px)',
            }}
          >
            <p dir="ltr" className="text-2xl font-black tabular-nums text-[#b8485c]">{formatSoldCount(STORE_SOLD_HEADLINE)}</p>
            <p className="text-[10px] font-bold text-[#5c5656]">طلب مؤكّد في السعودية</p>
          </div>
        </div>
      </section>

      <HomeTrustStrip />

      {/* ══════════════════════════════════════════════
          TWO LINES INTRO
      ══════════════════════════════════════════════ */}
      <section className="bg-white py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-10 text-start">
            <p className="mb-2 text-[11px] font-black uppercase tracking-widest text-[#146b70]">نبتة لابو — خطّان</p>
            <h2 className="text-3xl font-black leading-tight text-[#1C1C1C] sm:text-4xl">
              علكة بسيطة، أو ساشيه مركّز.
              <br />
              <span className="text-[#b8485c]">حسب مشكلتك.</span>
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <a
              href="#gummies"
              className="group flex flex-col gap-4 rounded-3xl p-8 transition hover:shadow-lg sm:p-10"
              style={{ background: 'linear-gradient(145deg, #fdf5f3 0%, #fff 100%)', border: '1.5px solid #ead4cf' }}
            >
              <span className="text-3xl">🍬</span>
              <div>
                <p className="mb-1 text-[10px] font-black uppercase tracking-widest text-[#b8485c]">خط العلكات</p>
                <h3 className="mb-2 text-xl font-black text-[#1C1C1C]">رونق C · خفّة بيوتك · ليل ماج</h3>
                <p className="text-sm leading-relaxed text-[#5c5656]">علكتان في اليوم — صباح أو بعد الأكل أو مساء. سهلة، خفيفة، تمضغها في أي مكان.</p>
              </div>
              <span className="mt-auto font-bold text-[#b8485c] transition group-hover:underline">شوفي العلكات ←</span>
            </a>
            <a
              href="#powders"
              className="group flex flex-col gap-4 rounded-3xl p-8 transition hover:shadow-lg sm:p-10"
              style={{ background: 'linear-gradient(145deg, #eef8f5 0%, #fff 100%)', border: '1.5px solid #b8e0d4' }}
            >
              <div className="flex items-center gap-2">
                <span className="text-3xl">🌿</span>
                <span className="rounded-full bg-[#2D7D6F] px-2.5 py-0.5 text-[10px] font-black text-white">جديد</span>
              </div>
              <div>
                <p className="mb-1 text-[10px] font-black uppercase tracking-widest text-[#2D7D6F]">خط المسحوق</p>
                <h3 className="mb-2 text-xl font-black text-[#1C1C1C]">قوة شعر · وضوح · شهر هادئ</h3>
                <p className="text-sm leading-relaxed text-[#5c5656]">ساشيه في كوب ماء كل يوم. تركيبة مركّزة للمشاكل الأعمق: شعر، بشرة، ودورة شهرية.</p>
              </div>
              <span className="mt-auto font-bold text-[#2D7D6F] transition group-hover:underline">شوفي المسحوق ←</span>
            </a>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          GUMMIES LINE
      ══════════════════════════════════════════════ */}
      <section id="gummies" className="scroll-mt-20 py-16 sm:py-20" style={{ background: '#faf8f7' }}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-12 flex flex-col gap-1 text-start sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#b8485c] px-4 py-1.5 text-[11px] font-black uppercase tracking-widest text-white">
                🍬 خط العلكات
              </div>
              <h2 className="text-2xl font-black text-[#1C1C1C] sm:text-3xl">
                روتين صباح–بعد الأكل–مساء
              </h2>
            </div>
            <Link href="/products#gummies" className="shrink-0 text-sm font-bold text-[#b8485c] hover:underline">
              كل التفاصيل ←
            </Link>
          </div>
          <div className="grid grid-cols-1 items-stretch gap-5 md:grid-cols-3">
            {GUMMIES.map((p) => (
              <ProductCard key={p.id} product={p} useHomeCardImage />
            ))}
          </div>
          {/* bundle banner */}
          <div
            className="mt-8 flex flex-col gap-5 overflow-hidden rounded-3xl p-7 sm:flex-row sm:items-center sm:justify-between sm:p-8"
            style={{ background: 'linear-gradient(135deg, #b8485c 0%, #7a2c3b 100%)' }}
          >
            <div className="text-white">
              <p className="mb-1 text-[11px] font-black uppercase tracking-widest text-white/60">الأكثر طلباً</p>
              <h3 className="text-xl font-black sm:text-2xl">جربي الثلاثة — روتين يوم كامل</h3>
              <p className="mt-1 text-sm text-white/70">رونق C + خفّة بيوتك + ليل ماج</p>
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:items-end">
              <p className="text-3xl font-black text-white">349 <span className="text-base font-bold text-white/70">ريال</span></p>
              <Link href="/products" className="inline-flex items-center justify-center rounded-2xl bg-white px-7 py-3 text-sm font-black text-[#b8485c] transition hover:bg-[#fff5f5]">
                شوفي العروض ←
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          POWDER LINE
      ══════════════════════════════════════════════ */}
      <section id="powders" className="scroll-mt-20 bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-12 flex flex-col gap-1 text-start sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#2D7D6F] px-4 py-1.5 text-[11px] font-black uppercase tracking-widest text-white">
                🌿 خط المسحوق — جديد
              </div>
              <h2 className="text-2xl font-black text-[#1C1C1C] sm:text-3xl">
                شعر، بشرة، ودورة — تركيبة مركّزة
              </h2>
            </div>
            <Link href="/products#powders" className="shrink-0 text-sm font-bold text-[#2D7D6F] hover:underline">
              كل التفاصيل ←
            </Link>
          </div>
          <div className="grid grid-cols-1 items-stretch gap-5 md:grid-cols-3">
            {POWDERS.map((p) => (
              <ProductCard key={p.id} product={p} useHomeCardImage />
            ))}
          </div>
          <div className="mt-6 flex items-start gap-3 rounded-2xl border border-[#b8e0d4] bg-[#eef8f5] p-5">
            <span className="text-xl">📸</span>
            <p className="text-sm text-[#1C1C1C]">
              <strong>الصور الرسمية قادمة قريباً.</strong> المنتجات متاحة للطلب الآن — كل طلب يُؤكَّد بمكالمة ويُسلَّم COD كالمعتاد.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          PROOF NUMBERS
      ══════════════════════════════════════════════ */}
      <section style={{ background: 'linear-gradient(135deg, #0d3538 0%, #146b70 100%)' }} className="py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-8 sm:grid-cols-3">
            {[
              { n: formatSoldCount(STORE_SOLD_HEADLINE), label: 'طلب مؤكّد في المملكة', sub: 'من الرياض لجدة للدمام وكل المناطق' },
              { n: `${STORE_REVIEW_HEADLINE}+`, label: 'تقييم موثّق', sub: 'متوسط 4.8 من 5 ★★★★★' },
              { n: '6', label: 'منتجات — مشكلة واحدة لكل', sub: 'علكات وسواشيه مسحوق' },
            ].map((s) => (
              <div key={s.label} className="text-start">
                <p dir="ltr" className="text-4xl font-black text-white sm:text-5xl">{s.n}</p>
                <p className="mt-2 font-black text-white">{s.label}</p>
                <p className="mt-1 text-sm text-white/55">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          HOW IT WORKS
      ══════════════════════════════════════════════ */}
      <section id="how" className="scroll-mt-20 py-16 sm:py-20" style={{ background: '#faf8f7' }}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-12 text-start">
            <p className="mb-2 text-[11px] font-black uppercase tracking-widest text-[#b8485c]">كيف الطلب</p>
            <h2 className="text-3xl font-black text-[#1C1C1C] sm:text-4xl">4 خطوات — من الاختيار للباب</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { n: '01', icon: '✨', title: 'اختاري المنتج', desc: 'علكة أو ساشيه حسب مشكلتك — شعر، بشرة، هضم، نوم، أو دورة.' },
              { n: '02', icon: '🎯', title: 'حدّدي الكمية', desc: 'قطعة للتجربة أو عرض 2–3 للتوفير. السعر يتفصّل بلا ضغط.' },
              { n: '03', icon: '☎️', title: 'تأكيد هاتفي', desc: 'فريقنا يتصل لتأكيد عنوانك والطلب — شخص حقيقي، مو رد آلي.' },
              { n: '04', icon: '📦', title: 'الدفع عند الباب', desc: 'كاش عند الاستلام. 2–4 أيام لكل مناطق المملكة.' },
            ].map((step) => (
              <div
                key={step.n}
                className="flex flex-col gap-4 rounded-3xl bg-white p-7"
                style={{ border: '1.5px solid #ece5e2', boxShadow: '0 2px 16px -4px rgba(184,72,92,0.06)' }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-[2.5rem] font-black text-[#ead4cf]" aria-hidden>{step.n}</span>
                  <span className="text-2xl" aria-hidden>{step.icon}</span>
                </div>
                <h3 className="text-lg font-black text-[#1C1C1C]">{step.title}</h3>
                <p className="text-sm leading-relaxed text-[#5c5656]">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          INGREDIENTS
      ══════════════════════════════════════════════ */}
      <section className="bg-white py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-10 text-start">
            <p className="mb-2 text-[11px] font-black uppercase tracking-widest text-[#146b70]">شفافية كاملة</p>
            <h2 className="text-3xl font-black text-[#1C1C1C] sm:text-4xl">المكوّنات — مو أسرار</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { code: 'NL-01', name: 'بيوتين + زنك + فيتامين D', latin: 'Biotin · Zinc · Vit D', product: 'رونق C', accent: '#b8485c' },
              { code: 'NL-02', name: 'بروبيوتيك + ألياف', latin: 'Probiotics · Fiber', product: 'خفّة بيوتك', accent: '#a86b5e' },
              { code: 'NL-03', name: 'مغنيسيوم + L-Theanine', latin: 'Magnesium · L-Theanine', product: 'ليل ماج', accent: '#b8485c' },
              { code: 'NL-04', name: 'كولاجين بحري + بيوتين + زنك + حديد', latin: 'Marine Collagen · Biotin · Zinc · Iron', product: 'قوة شعر', accent: '#8B6248' },
              { code: 'NL-05', name: 'غلوتاثيون + كولاجين + زنك + فيتامين C', latin: 'Glutathione · Collagen · Zinc · Vit C', product: 'وضوح', accent: '#2D7D6F' },
              { code: 'NL-06', name: 'مايو-إينوسيتول + فيتكس + مغنيسيوم + B6', latin: 'Myo-Inositol · Vitex · Magnesium · B6', product: 'شهر هادئ', accent: '#7B5EA7' },
            ].map((ing) => (
              <div
                key={ing.code}
                className="flex flex-col gap-2.5 rounded-2xl p-5"
                style={{ background: `${ing.accent}08`, border: `1.5px solid ${ing.accent}20` }}
              >
                <div className="flex items-center justify-between">
                  <span className="rounded-lg px-2 py-0.5 text-[10px] font-black font-mono" style={{ background: `${ing.accent}18`, color: ing.accent }}>{ing.code}</span>
                  <span className="rounded-full px-2.5 py-0.5 text-[10px] font-black text-white" style={{ background: ing.accent }}>{ing.product}</span>
                </div>
                <p className="font-black text-[#1C1C1C]">{ing.name}</p>
                <p className="text-[11px] font-mono text-[#5c5656]">{ing.latin}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          REVIEWS
      ══════════════════════════════════════════════ */}
      <section id="reviews" className="scroll-mt-20 py-16 sm:py-20" style={{ background: '#faf8f7' }}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-12 text-start">
            <div className="mb-4 inline-flex items-center gap-3 rounded-2xl bg-white px-5 py-3" style={{ border: '1.5px solid #ece5e2' }}>
              <span className="text-xl text-[#e8b84b]">★★★★★</span>
              <p className="text-[#1C1C1C]">
                <span className="text-lg font-black">4.8</span>
                <span className="mr-1 text-sm text-[#5c5656]">/ 5 من {STORE_REVIEW_HEADLINE}+ تقييم موثّق</span>
              </p>
            </div>
            <h2 className="text-3xl font-black text-[#1C1C1C] sm:text-4xl">قالت عميلاتنا — بكلامهن</h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {REVIEWS.map((r) => (
              <div
                key={r.name}
                className="flex flex-col gap-5 rounded-3xl bg-white p-7"
                style={{ border: '1.5px solid #ece5e2' }}
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="text-lg text-[#e8b84b]">★★★★★</span>
                  <span className="rounded-full px-3 py-1 text-[11px] font-black text-white" style={{ background: r.accent }}>
                    {r.badge}
                  </span>
                </div>
                <p className="text-base leading-relaxed text-[#1C1C1C]">&ldquo;{r.text}&rdquo;</p>
                <div className="flex items-center justify-between border-t border-[#f0ece8] pt-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-black text-white" style={{ background: r.accent }}>
                      {r.name[0]}
                    </div>
                    <div>
                      <p className="font-black text-[#1C1C1C]">{r.name}</p>
                      <p className="text-xs text-[#5c5656]">{r.city} · عميلة موثّقة ✓</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          FAQ
      ══════════════════════════════════════════════ */}
      <section id="faq" className="scroll-mt-20 bg-white py-14 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="mb-10 text-start">
            <p className="mb-2 text-[11px] font-black uppercase tracking-widest text-[#c9937e]">أسئلة شائعة</p>
            <h2 className="text-3xl font-black text-[#1C1C1C] sm:text-4xl">عندك سؤال؟</h2>
          </div>
          <div className="flex flex-col gap-2">
            {FAQS.map((faq) => (
              <details
                key={faq.q}
                className="group overflow-hidden rounded-2xl border border-[#ece5e2] bg-white"
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

      {/* ══════════════════════════════════════════════
          FINAL CTA
      ══════════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-20 sm:py-24" style={{ background: '#1C1C1C' }}>
        {/* decorative */}
        <div className="pointer-events-none absolute -top-32 end-0 h-[500px] w-[500px] rounded-full opacity-[0.07]" style={{ background: '#b8485c' }} aria-hidden />
        <div className="pointer-events-none absolute -bottom-32 start-0 h-[400px] w-[400px] rounded-full opacity-[0.07]" style={{ background: '#2D7D6F' }} aria-hidden />

        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
          <p className="mb-4 text-[11px] font-black uppercase tracking-widest text-[#e8909f]">ابدئي من هنا</p>
          <h2 className="mb-5 text-4xl font-black text-white sm:text-5xl">
            جسمك يستاهل
            <br />
            <span className="text-[#e8909f]">روتين يثبت.</span>
          </h2>
          <p className="mx-auto mb-10 max-w-md text-base leading-relaxed text-white/55">
            COD · تأكيد هاتفي · توصيل كل المناطق · SFDA · حلال
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="#gummies"
              className="inline-flex items-center justify-center rounded-full px-10 py-4 text-base font-black text-white transition hover:-translate-y-0.5"
              style={{ background: '#b8485c', boxShadow: '0 16px 48px -12px rgba(184,72,92,0.5)' }}
            >
              🍬 خط العلكات
            </Link>
            <Link
              href="#powders"
              className="inline-flex items-center justify-center rounded-full px-10 py-4 text-base font-black text-white transition hover:-translate-y-0.5"
              style={{ background: '#2D7D6F', boxShadow: '0 16px 48px -12px rgba(45,125,111,0.4)' }}
            >
              🌿 خط المسحوق
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
