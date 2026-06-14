import Image from 'next/image'
import Link from 'next/link'
import { PRODUCTS, STORE_REVIEW_HEADLINE, STORE_SOLD_HEADLINE, formatSoldCount } from '@/lib/products'
import ProductCard from '@/components/product/ProductCard'
import ProductsSoldProofBar from '@/components/product/ProductsSoldProofBar'
import HomeTrustStrip from '@/components/home/HomeTrustStrip'
import HomeBundleNudge from '@/components/home/HomeBundleNudge'

const GUMMIES = PRODUCTS.filter((p) => !p.format || p.format === 'gummy')
const POWDERS = PRODUCTS.filter((p) => p.format === 'powder_sachet')

const ORDER_FLOW_TAGS = ['سلطة كما تقرّ الصيدلية', 'خصوصية', 'مرونة في الطلب', 'دفع عند الاستلام'] as const

const STEPS = [
  {
    icon: '✨',
    title: 'اختاري اللي يحسّ بيومك',
    desc: 'علكة يومية أو ساشيه مسحوق مركّز — حسب مشكلتك واحتياج جسمك.',
  },
  {
    icon: '💎',
    title: 'على قد ما تستخدمين',
    desc: 'قطعة، اثنتين، أو ثلاث حسب وتيرتك؛ السعر يتفصّل معك، بدون ضغط.',
  },
  {
    icon: '☎️',
    title: 'تأكيد بسيط وبراحتك',
    desc: 'اسمك ورقم جوال سعودي يكفيان؛ ما نطلب بطاقة، ونتواصل للتأكيد.',
  },
  {
    icon: '📦',
    title: 'لما يوصلك الطلب',
    desc: 'نوصل لمناطق المملكة، نخبرك قبل التوصيل، وتدفعين كاش عند الاستلام.',
  },
] as const

const GOALS = [
  { slug: 'rawnaq-c-collagen-gummies', icon: '✨', color: '#b8485c', bg: '#f1e6e4', border: '#d8c9c6', title: 'الجمال من الداخل', product: 'رونق C', desc: 'بيوتين وزنك وفيتامين D — شعر، أظافر، وبشرة.' },
  { slug: 'khiffabiotic-probiotic-gummies', icon: '🍃', color: '#b8485c', bg: '#eae2df', border: '#d8c9c6', title: 'خفّة بعد الأكل', product: 'خفّة بيوتك', desc: 'بروبيوتيك وألياف — راحة ما بعد الوجبات.' },
  { slug: 'laylmag-magnesium-gummies', icon: '🌙', color: '#c9937e', bg: '#f3eeeb', border: '#d8c9c6', title: 'هدوء المساء', product: 'ليل ماج', desc: 'مغنيسيوم و L-Theanine — روتين قبل النوم.' },
  { slug: 'quwwat-sha3r-collagen-powder', icon: '💆🏻‍♀️', color: '#B5896A', bg: '#FAF1E8', border: '#e8d4ba', title: 'قوة الشعر', product: 'قوة شعر', desc: 'كولاجين بحري + بيوتين + حديد — للتساقط.' },
  { slug: 'wudouh-glow-skin-powder', icon: '🌿', color: '#7A9484', bg: '#EDF2EE', border: '#c8d8cc', title: 'بشرة نقية', product: 'وضوح', desc: 'غلوتاثيون + كولاجين + زنك — للحبوب والإشراق.' },
  { slug: 'shahr-hadi-pms-powder', icon: '🌸', color: '#8E6C8E', bg: '#F0E9F0', border: '#d8c4d8', title: 'دورة هادئة', product: 'شهر هادئ', desc: 'مايو-إينوسيتول + فيتكس + مغنيسيوم — للدورة.' },
] as const

const ORDER_FLOW_GRADIENT = 'linear-gradient(135deg, #b8485c 0%, #943c50 100%)'

const FAQS = [
  { q: 'هل الدفع عند الاستلام متاح؟', a: 'نعم، جميع طلبات نبتة لابو بنظام الدفع عند الاستلام فقط.' },
  { q: 'ما الفرق بين العلكة والساشيه المسحوق؟', a: 'العلكة سهلة الالتزام للروتين اليومي (رونق C، خفّة بيوتك، ليل ماج). الساشيه المسحوق تركيبة مركّزة لمشاكل أعمق (قوة شعر، وضوح، شهر هادئ).' },
  { q: 'كيف يتم تأكيد الطلب؟', a: 'سيتواصل فريقنا معك على رقم جوالك لتأكيد الطلب وترتيب التوصيل.' },
  { q: 'كم يستغرق التوصيل؟', a: 'يتم التوصيل إلى جميع مناطق المملكة خلال 2-4 أيام عمل.' },
  { q: 'هل يمكنني طلب أكثر من منتج؟', a: 'بالتأكيد، يمكنك إضافة أكثر من منتج والاستفادة من الأسعار المميزة.' },
  { q: 'هل نبتة لابو صيدلية؟', a: 'نبتة لابو متجر مكمّلات غذائية — SFDA · حلال · لا تشخّص ولا توصف؛ استشيري الطبيب عند أي حالة.' },
  { q: 'متى أرى النتائج؟', a: 'تختلف من شخص لآخر؛ المداومة على الروتين 4–8 أسابيع هي الأقرب لفائدة حقيقية.' },
] as const

const REVIEWS = [
  { name: 'سارة م.', text: 'رونق C طعمه خفيف وصار جزء من صباحي.', rating: 5, badge: 'رونق C', accent: '#b8485c', verified: true },
  { name: 'نور ع.', text: 'خفّة بيوتك فرّق معي بعد الغداء.', rating: 5, badge: 'خفّة بيوتك', accent: '#c9937e', verified: true },
  { name: 'ديمة خ.', text: 'ليل ماج خلّى المساء أهدأ.', rating: 5, badge: 'ليل ماج', accent: '#b8485c', verified: true },
  { name: 'هدى ر.', text: 'جربت الثلاثة مع بعض — روتيني صار أكتمل.', rating: 5, badge: 'الثلاثة معاً', accent: '#b8485c', verified: true },
] as const

const HERO_JUMP = [
  { href: '#gummies', label: 'العلكات' },
  { href: '#powders', label: 'المسحوق' },
  { href: '#how', label: 'كيف الطلب' },
  { href: '#reviews', label: 'التقييمات' },
] as const

export default function HomePage() {
  return (
    <div>
      {/* ─── 1. Hero — restored original with polish ─── */}
      <section id="top" style={{ background: 'linear-gradient(135deg, #f1e6e4 0%, #FFFFFF 60%, #FFFFFF 100%)' }}>
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-20">
          <div className="grid items-center gap-10 md:grid-cols-2 md:gap-12">
            <div className="order-2 text-start md:order-1">
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold" style={{ background: '#f0faf4', color: '#006C35', border: '1px solid rgba(0, 108, 53, 0.2)' }}>
                  <span aria-hidden>🇸🇦</span>
                  للسعوديات — كل المناطق
                </div>
                <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold" style={{ background: '#f1e6e4', color: '#146b70', border: '1px solid #d8c9c6' }}>
                  <span className="h-1.5 w-1.5 rounded-full bg-[#146b70]" aria-hidden />
                  SFDA · حلال · COD
                </div>
              </div>

              <div
                className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#b8485c]/20 bg-white px-4 py-2 text-sm font-bold shadow-sm"
                style={{ color: '#b8485c' }}
              >
                <span aria-hidden>🔥</span>
                <span dir="ltr" className="tabular-nums">
                  {formatSoldCount(STORE_SOLD_HEADLINE)}
                </span>
                <span className="font-bold text-[#1C1C1C]">طلب مؤكّد في المملكة</span>
              </div>

              <h1 className="mb-3 text-4xl font-bold leading-tight md:text-5xl" style={{ color: '#1C1C1C' }}>
                مكمّل غذائي{' '}
                <span style={{ color: '#b8485c' }}>تثق فيه السعوديات</span>
              </h1>
              <p className="mb-5 max-w-md text-lg leading-relaxed" style={{ color: '#5c5656' }}>
                علكات يومية وسواشيه مسحوق مركّز — لجمال الشعر والبشرة، راحة الهضم، هدوء المساء، وأيام الدورة. تأكيد على 05، توصيل 2–4 أيام، دفع كاش عند الباب.
              </p>

              <div className="mb-6 flex flex-wrap gap-2">
                {HERO_JUMP.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="rounded-full px-3 py-1.5 text-xs font-semibold transition hover:bg-[#f1e6e4]"
                    style={{ color: '#146b70', border: '1px solid #d8c9c6' }}
                  >
                    {link.label}
                  </a>
                ))}
              </div>

              <div className="flex flex-col items-start gap-3 sm:flex-row">
                <Link
                  href="#gummies"
                  className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-base font-bold transition-all hover:-translate-y-0.5 hover:shadow-xl"
                  style={{ background: '#b8485c', color: '#fff', boxShadow: '0 10px 32px -8px rgba(184,72,92,0.38)' }}
                >
                  اختاري منتجك
                  <span aria-hidden>↓</span>
                </Link>
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 rounded-full px-6 py-4 text-sm font-bold"
                  style={{ border: '2px solid #b8485c44', color: '#b8485c' }}
                >
                  كل المنتجات
                </Link>
              </div>
            </div>

            <div
              className="order-1 w-full rounded-3xl bg-white p-3 sm:p-4 md:order-2 md:p-5"
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
                <div
                  className="absolute bottom-2 start-2 z-10 max-w-[6rem] rounded-lg px-2 py-1.5 sm:bottom-3 sm:start-3 sm:px-2.5 sm:py-2"
                  style={{ background: '#ffffffee', border: '1px solid rgba(20,107,112,0.35)' }}
                >
                  <p className="text-[9px] font-bold uppercase text-[#146b70]">مرخّص SFDA</p>
                  <p className="text-[10px] font-black text-[#1C1C1C]">6 منتجات</p>
                </div>
                <Image
                  src="/hero-store-trio.jpg"
                  alt="منتجات نبتة لابو — علكات وسواشيه مسحوق"
                  width={1024}
                  height={1024}
                  priority
                  sizes="(max-width: 768px) 100vw, 560px"
                  className="block h-auto w-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <HomeTrustStrip />

      {/* ─── 2. Gummies (conversion first) ─── */}
      <section id="gummies" className="scroll-mt-24 bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-10 text-start sm:mb-12">
            <p className="mb-2 text-sm font-bold uppercase tracking-widest" style={{ color: '#b8485c' }}>
              🍬 خط العلكات · الأكثر طلباً
            </p>
            <h2 className="text-3xl font-bold leading-tight sm:text-4xl" style={{ color: '#1C1C1C' }}>
              اختاري روتينك اليومي — من 199 ر.س
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-relaxed" style={{ color: '#5c5656' }}>
              ثلاث علكات، كل واحدة لهدف. COD وتأكيد قبل الشحن — كما تفضّل عميلاتنا في السعودية.
            </p>
          </div>
          <ProductsSoldProofBar />
          <div className="grid min-w-0 grid-cols-1 items-stretch gap-6 md:grid-cols-3 md:gap-8">
            {GUMMIES.map((p) => (
              <ProductCard key={p.id} product={p} useHomeCardImage />
            ))}
          </div>
        </div>
      </section>

      <HomeBundleNudge />

      {/* ─── 3. Powder line — new! ─── */}
      <section id="powders" className="scroll-mt-24 bg-white py-16 sm:py-20" style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #FAF7F4 100%)' }}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-10 text-start sm:mb-12">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#7A9484] px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white">
              🌿 خط المسحوق · جديد
            </div>
            <h2 className="text-3xl font-bold leading-tight sm:text-4xl" style={{ color: '#1C1C1C' }}>
              تركيبة مركّزة — للمشاكل الأعمق
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-relaxed" style={{ color: '#5c5656' }}>
              ساشيه واحد يومياً في كوب ماء. تساقط الشعر، حبوب البشرة، وأيام الدورة الصعبة — مشاكل تحتاج أكثر من علكة.
            </p>
          </div>
          <div className="grid min-w-0 grid-cols-1 items-stretch gap-6 md:grid-cols-3 md:gap-8">
            {POWDERS.map((p) => (
              <ProductCard key={p.id} product={p} useHomeCardImage />
            ))}
          </div>
        </div>
      </section>

      {/* ─── 4. Goals — pick by need (now 6) ─── */}
      <section id="goals" className="scroll-mt-24 bg-white py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-10 text-start">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest" style={{ color: '#146b70' }}>
              ستة أهداف
            </p>
            <h2 className="text-2xl font-bold sm:text-3xl" style={{ color: '#1C1C1C' }}>
              أي حاجة تشدّك أكثر؟
            </h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {GOALS.map((item) => (
              <Link
                key={item.slug}
                href={`/products/${item.slug}`}
                className="group flex flex-col gap-3 rounded-2xl p-6 text-center transition hover:-translate-y-0.5 hover:shadow-md"
                style={{ background: item.bg, border: `1px solid ${item.border}` }}
              >
                <div
                  className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl text-2xl"
                  style={{ background: '#fff', border: `1px solid ${item.border}` }}
                >
                  {item.icon}
                </div>
                <p className="text-xs font-bold" style={{ color: item.color }}>
                  {item.product}
                </p>
                <h3 className="text-base font-bold" style={{ color: '#1C1C1C' }}>
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: '#5c5656' }}>
                  {item.desc}
                </p>
                <span className="mt-auto text-sm font-bold group-hover:underline" style={{ color: item.color }}>
                  اكتشفي المنتج ←
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 5. How it works ─── */}
      <section id="how" className="scroll-mt-24 py-16 sm:py-20" style={{ background: '#f1e6e4' }}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div
            className="overflow-hidden rounded-3xl bg-white"
            style={{ border: '1px solid #dfd8d5', boxShadow: '0 12px 48px -20px rgba(184,72,92,0.12)' }}
          >
            <div className="grid lg:grid-cols-12">
              <div
                className="border-b border-[#e0dad7] p-8 text-start sm:p-10 lg:col-span-5 lg:border-b-0 lg:border-s"
                style={{ background: 'linear-gradient(180deg, #eae2df 0%, #FFFFFF 55%)' }}
              >
                <p className="mb-3 text-sm font-bold uppercase tracking-widest" style={{ color: '#b8485c' }}>
                  كيف الطلب
                </p>
                <h2 className="mb-4 text-2xl font-bold leading-tight sm:text-3xl" style={{ color: '#1C1C1C' }}>
                  من الاختيار للتوصيل — 4 خطوات
                </h2>
                <p className="mb-6 text-sm leading-relaxed" style={{ color: '#5c5656' }}>
                  تأكيد بشري، دفع عند الاستلام، وصياغة لا تغرّكِ بوعود خارج نطاق المكمّل الغذائي.
                </p>
                <div className="flex flex-wrap gap-2">
                  {ORDER_FLOW_TAGS.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full px-3 py-1.5 text-xs font-semibold"
                      style={{ background: '#f1e6e4', color: '#b8485c', border: '1px solid #d8c9c6' }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-8 sm:p-10 lg:col-span-7">
                <ol className="space-y-0">
                  {STEPS.map((step, i) => (
                    <li key={step.title} className="relative flex items-start gap-5 pb-10 last:pb-0">
                      <div className="relative flex w-14 shrink-0 flex-col items-center">
                        <div
                          className="z-10 flex h-12 w-12 items-center justify-center rounded-2xl text-lg font-black text-white shadow-md"
                          style={{ background: ORDER_FLOW_GRADIENT }}
                        >
                          {i + 1}
                        </div>
                        {i < STEPS.length - 1 && (
                          <div
                            className="mt-3 min-h-[2.5rem] w-1 flex-1 rounded-full opacity-85"
                            style={{ background: 'linear-gradient(180deg, #b8485c 0%, #c9937e 100%)' }}
                          />
                        )}
                      </div>
                      <div className="min-w-0 flex-1 pt-1 text-start">
                        <div className="mb-1 text-2xl" aria-hidden>
                          {step.icon}
                        </div>
                        <h3 className="mb-1 text-lg font-bold" style={{ color: '#1C1C1C' }}>
                          {step.title}
                        </h3>
                        <p className="text-sm leading-relaxed" style={{ color: '#5c5656' }}>
                          {step.desc}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 6. Ingredients trust (now 6) ─── */}
      <section className="bg-white py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-8 text-start">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest" style={{ color: '#146b70' }}>
              الشفافية
            </p>
            <h2 className="text-2xl font-bold sm:text-3xl" style={{ color: '#1C1C1C' }}>
              مكوّنات واضحة — هدف واحد لكل منتج
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { code: 'NL-01', name: 'بيوتين + زنك + D', latin: 'Biotin · Zinc · Vit D', product: 'رونق C', accent: '#b8485c' },
              { code: 'NL-02', name: 'بروبيوتيك + ألياف', latin: 'Probiotics · Fiber', product: 'خفّة بيوتك', accent: '#c9937e' },
              { code: 'NL-03', name: 'مغنيسيوم + L-Theanine', latin: 'Magnesium · L-Theanine', product: 'ليل ماج', accent: '#b8485c' },
              { code: 'NL-04', name: 'كولاجين بحري + حديد', latin: 'Marine Collagen · Iron', product: 'قوة شعر', accent: '#B5896A' },
              { code: 'NL-05', name: 'غلوتاثيون + كولاجين', latin: 'Glutathione · Collagen', product: 'وضوح', accent: '#7A9484' },
              { code: 'NL-06', name: 'مايو-إينوسيتول + فيتكس', latin: 'Myo-Inositol · Vitex', product: 'شهر هادئ', accent: '#8E6C8E' },
            ].map((ing) => (
              <div
                key={ing.code}
                className="flex flex-col gap-2 rounded-2xl border border-[#d8c9c6] bg-[#faf9f8] p-4"
              >
                <div className="flex items-center justify-between">
                  <span className="w-fit rounded-md px-2 py-0.5 text-xs font-mono font-semibold" style={{ background: `${ing.accent}15`, color: ing.accent }}>
                    {ing.code}
                  </span>
                  <span className="text-[10px] font-bold" style={{ color: ing.accent }}>
                    {ing.product}
                  </span>
                </div>
                <p className="font-bold" style={{ color: '#1C1C1C' }}>
                  {ing.name}
                </p>
                <p className="text-xs font-mono" style={{ color: ing.accent }}>
                  {ing.latin}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 7. Reviews ─── */}
      <section id="reviews" className="scroll-mt-24 py-14 sm:py-16" style={{ background: '#f1e6e4' }}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-10 text-start">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#dfd6d4] bg-white px-4 py-2">
              <span style={{ color: '#c9937e' }}>★★★★★</span>
              <span className="text-sm font-bold">4.8</span>
              <span className="text-xs text-[#5c5656]">من {STORE_REVIEW_HEADLINE} تقييم · 🇸🇦</span>
            </div>
            <h2 className="text-2xl font-bold sm:text-3xl" style={{ color: '#1C1C1C' }}>
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
                  <span style={{ color: '#c9937e' }}>★★★★★</span>
                  <span className="rounded-full px-3 py-1 text-xs font-semibold text-white" style={{ background: r.accent }}>
                    {r.badge}
                  </span>
                </div>
                <p className="leading-relaxed" style={{ color: '#1C1C1C' }}>
                  &ldquo;{r.text}&rdquo;
                </p>
                <div className="flex items-center gap-2 border-t border-[#F0ECE6] pt-3">
                  <div
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
                    style={{ background: r.accent }}
                  >
                    {r.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{r.name}</p>
                    {r.verified ? (
                      <p className="text-xs text-[#146b70]">عميلة موثّقة</p>
                    ) : null}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 8. FAQ ─── */}
      <section id="faq" className="scroll-mt-24 bg-white py-14 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="mb-8 text-start">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest" style={{ color: '#c9937e' }}>
              أسئلة شائعة
            </p>
            <h2 className="text-2xl font-bold sm:text-3xl" style={{ color: '#1C1C1C' }}>
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

      {/* ─── 9. Final CTA ─── */}
      <section className="relative overflow-hidden py-16 sm:py-20">
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(155deg, #0f3a3d 0%, #146b70 32%, #6b3038 88%, #943c50 100%)' }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="mb-4 text-3xl font-black text-white sm:text-4xl">جاهزة لروتين نبتة لابو؟</h2>
          <p className="mx-auto mb-8 max-w-xl text-base leading-relaxed text-white/85">
            ست منتجات لكل احتياج — اختاري الأقرب ليومك، أكّدي على 05، وادفعي عند الاستلام.
          </p>
          <Link
            href="#gummies"
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
