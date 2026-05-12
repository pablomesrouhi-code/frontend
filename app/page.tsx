import Image from 'next/image'
import Link from 'next/link'
import { PRODUCTS } from '@/lib/products'
import ProductCard from '@/components/product/ProductCard'
import StarRating from '@/components/ui/StarRating'

const ORDER_FLOW_TAGS = ['سلطة كما تقرّ الصيدلية', 'خصوصية', 'مرونة في الطلب', 'دفع عند الاستلام'] as const

const STEPS = [
  {
    icon: '✨',
    title: 'اختاري اللي يحسّ بيومك',
    desc: 'تختارين التركيبة وفق احتياجكِ اليومي — كما تفعلين مع المكمّل في الصيدلية — وإن فتحتي السلّة ترين اقتراحات لا تغرّر بوعود طبّية خارج التصنيف.',
  },
  {
    icon: '💎',
    title: 'على قد ما تستخدمين',
    desc: 'قطعة، اثنتين، أو ثلاث حسب وتيرتك؛ السعر يتفصّل معك، بدون ضغط ولا حسابات معقّدة.',
  },
  {
    icon: '☎️',
    title: 'تأكيد بسيط وبراحتك',
    desc: 'اسمك ورقم جوال سعودي يبدأ بـ 05 يكفيين باش نكمّل الطلب؛ ما نطلب بطاقة، ولو احتاجنا شيء بسيط نتواصل برسالة أو اتصال خفيف.',
  },
  {
    icon: '📦',
    title: 'لما يوصلك الطلب',
    desc: 'نوصل لمناطق المملكة، نخبرك قبل التوصيل، وتدفعين وقت ما يكون الطلب بين يديك — كاش عند الاستلام.',
  },
]

const ORDER_FLOW_GRADIENT = 'linear-gradient(135deg, #b8485c 0%, #943c50 100%)'

const FAQS = [
  { q: 'هل الدفع عند الاستلام متاح؟', a: 'نعم، جميع طلبات نبتة لابو بنظام الدفع عند الاستلام فقط.' },
  { q: 'كيف يتم تأكيد الطلب؟', a: 'سيتواصل فريقنا معك على رقم جوالك لتأكيد الطلب وترتيب التوصيل.' },
  { q: 'كم يستغرق التوصيل؟', a: 'يتم التوصيل إلى جميع مناطق المملكة خلال 2-4 أيام عمل.' },
  { q: 'هل يمكنني طلب أكثر من منتج؟', a: 'بالتأكيد، يمكنك إضافة أكثر من منتج لسلّتك والاستفادة من الأسعار المميزة.' },
  { q: 'هل نبتة لابو صيدلية؟', a: 'ليس هذا نقطة تشخّص؛ نبتة لابو متجر مكمّلات غذائيّة على شكل علكة، بتجربة تقترب من صيدلية الثقة من حيث الانضباط والتسمية والترخيص — لا وصفًا طبيًا ولا تعديلًا لدواء يصفه طبيب؛ استشيري الطبيب عند أي حالة أو دواء قائم.' },
  { q: 'متى أرى النتائج؟', a: 'تختلف التجربة من شخص لآخر، لكن المداومة على الروتين اليومي وفق تعليمات المكمّل هي الأقرب لفائدة حقيقية.' },
]

const REVIEWS = [
  { name: 'سارة م.', city: 'الرياض', text: 'من أحسن قرارات روتيني! رونق C طعمه خفيف وما حسيت بثقل. صار جزء من صباحي اليومي.', rating: 5, badge: 'رونق C', accent: '#b8485c', verified: true },
  { name: 'نور ع.', city: 'جدة', text: 'خفّة بيوتك فرّق معي كثير بعد الغداء. ما كنت أتوقع تأثيره يكون واضح بالشكل هذا على روتيني.', rating: 5, badge: 'خفّة بيوتك', accent: '#c9937e', verified: true },
  { name: 'ديمة خ.', city: 'الدمام', text: 'ليل ماج خلّى وقت ما قبل النوم أهدأ. أخذه مع كوب شاي وحسيت بفرق في روتين المساء.', rating: 5, badge: 'ليل ماج', accent: '#b8485c', verified: true },
  { name: 'هدى ر.', city: 'الرياض', text: 'جربت الثلاثة مع بعض وما ندمت. سهل الالتزام، طعمهم لذيذ، وأحس روتيني اليومي صار أكتمل.', rating: 5, badge: 'الثلاثة معاً', accent: '#b8485c', verified: true },
]

export default function HomePage() {
  return (
    <div style={{ background: '#faf9f8' }}>

      {/* ─── Hero ─── */}
      <section style={{ background: 'linear-gradient(135deg, #f1e6e4 0%, #FFFFFF 60%, #FFFFFF 100%)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">

            {/* النص والشعار + العناوين الرئيسية */}
            <div className="text-right order-2 md:order-1">
              {/* شعار جانب العناوين الرئيسية (جنب عمود المحتوى، كما جهة السلة بصرياً لكن داخل الهيرو) */}
              <div className="flex items-start justify-end gap-4 mb-6">
                <div className="min-w-0 flex-1 text-right">
                  <div className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full text-xs font-semibold" style={{ background: '#f1e6e4', color: '#146b70', border: '1px solid #d8c9c6' }}>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#146b70]" />
                    مكمّل غذائي على شكل علكة · سلطة ووضوح يقربان تجربة الصيدلية
                  </div>

                  <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-1" style={{ color: '#1C1C1C' }}>
                    علكة تحمل تركيبة
                  </h1>
                  <p className="text-lg md:text-xl font-semibold mb-2" style={{ color: '#146b70' }}>
                    بثقة تُشبه صيدليتكِ — قبل أن تكون قطعة حلوى
                  </p>
                  <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-5" style={{ color: '#b8485c' }}>
                    جدّية المكمّل، ولذعة تسهّل الالتزام
                  </h1>
                </div>
                <Link href="/" className="shrink-0 hidden sm:block" aria-label="نبتة لابو — إلى الرئيسية">
                  <Image
                    src="/nabta-lab-brand.png"
                    alt=""
                    aria-hidden
                    width={200}
                    height={88}
                    className="h-14 w-auto max-w-[120px] object-contain object-right"
                  />
                </Link>
              </div>
              <div className="flex justify-center sm:hidden mb-5">
                <Link href="/" aria-label="نبتة لابو — الرئيسية">
                  <Image
                    src="/nabta-lab-brand.png"
                    alt=""
                    aria-hidden
                    width={280}
                    height={120}
                    className="h-12 w-auto object-contain"
                  />
                </Link>
              </div>

              {/* Gold accent line */}
              <div className="w-16 h-1 rounded-full mb-5" style={{ background: 'linear-gradient(90deg, #c9937e, #d8c9c6)' }} />

              <p className="text-lg leading-relaxed mb-6 max-w-md" style={{ color: '#5c5656' }}>
                نبتة لابو تقدّم <strong className="font-semibold text-[#1C1C1C]">مكمّلًا غذائيًا على هيئة علكة</strong>
                {' '}لمن تريد الوضوح نفسه الذي تتوقّعينه عند نقطة الدواء والمكمّل: ترخيص SFDA، مكوّنات موسومة وفق المعتاد، وثلاث وجهات واضحة (جمال الهيكل اليومي، راحة ما بعد الأكل، هدوء المساء) — مع شراء بدون بطاقات، تأكيد بشري، ودفع عند الاستلام.
              </p>

              {/* Compliance badges */}
              <div className="flex items-center mb-6 bg-white rounded-xl overflow-hidden w-fit" style={{ border: '1px solid #dfd6d4', boxShadow: '0 1px 4px rgba(26,25,21,0.06)' }}>
                {[
                  { icon: '🛡', label: 'SFDA', sub: 'هيئة الغذاء والدواء', color: '#b8485c' },
                  { icon: '🔬', label: 'GMP', sub: 'Certified', color: '#146b70' },
                  { icon: '✦', label: 'مكمّل غذائي', sub: 'Dietary Supplement', color: '#c9937e' },
                ].map((b, i) => (
                  <div key={b.label} className="flex items-center gap-2 px-4 py-2.5" style={{ borderRight: i < 2 ? '1px solid #dfd6d4' : 'none' }}>
                    <span className="text-sm">{b.icon}</span>
                    <div>
                      <p className="text-xs font-bold leading-none" style={{ color: b.color }}>{b.label}</p>
                      <p className="text-[10px] leading-none mt-0.5" style={{ color: '#5c5656' }}>{b.sub}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 items-start">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 font-bold px-8 py-4 rounded-full text-base transition-all hover:shadow-xl hover:-translate-y-0.5"
                  style={{ background: '#b8485c', color: '#fff', boxShadow: '0 4px 16px rgba(184,72,92,0.28)' }}
                >
                  تسوقي الآن
                  <span>←</span>
                </Link>
                <div className="flex items-center gap-2.5 px-5 py-3 rounded-full" style={{ border: '1.5px dashed #c9937e' }}>
                  <span className="text-lg">↩️</span>
                  <div>
                    <p className="text-xs font-bold leading-none" style={{ color: '#c9937e' }}>ضمان استرجاع</p>
                    <p className="text-xl font-black leading-none" style={{ color: '#1C1C1C' }}>30 يوم</p>
                  </div>
                </div>
              </div>

              {/* Quick trust row */}
              <div className="flex items-center gap-5 mt-5">
                {['🛡️ دفع عند الاستلام', '✅ تأكيد قبل التوصيل', '🚚 توصيل سريع'].map((t) => (
                  <span key={t} className="text-xs" style={{ color: '#5c5656' }}>{t}</span>
                ))}
              </div>
            </div>

            <div
              className="order-1 md:order-2 w-full rounded-3xl bg-white p-3 sm:p-4 md:p-5"
              style={{
                border: '1px solid #EADFD6',
                boxShadow:
                  '0 0 0 1px rgba(184, 104, 116, 0.45), 0 16px 48px rgba(28, 28, 28, 0.07), 0 4px 12px rgba(184, 72, 92, 0.07)',
              }}
            >
              <div className="rounded-2xl overflow-hidden bg-[#FDF8F9] relative">
                <div
                  className="absolute bottom-2 start-2 sm:bottom-3 sm:start-3 z-10 rounded-lg px-2 py-1.5 sm:px-2.5 sm:py-2 text-right max-w-[5.75rem] sm:max-w-[6.75rem]"
                  style={{
                    background: 'linear-gradient(145deg, #ffffffee 0%, #f8fffe 100%)',
                    border: '1px solid rgba(20,107,112,0.35)',
                    boxShadow: '0 2px 10px rgba(20,107,112,0.12)',
                  }}
                  role="note"
                  aria-label="شهادة معيارية — مكمّل غذائي مرخّص من هيئة الغذاء والدواء"
                >
                  <p className="text-[8px] sm:text-[9px] font-bold text-[#146b70] uppercase tracking-wide leading-none mb-0.5">شهادة</p>
                  <p className="text-[10px] sm:text-[11px] font-black text-[#1C1C1C] leading-tight">مرخّص SFDA</p>
                  <p className="text-[7px] sm:text-[8px] text-[#5c5656] leading-tight mt-0.5">مكمّل غذائي</p>
                </div>
                <Image
                  src="/hero-store-trio.jpg"
                  alt="ثلاث علكات Labo Nabta: بروبيوتيك للنساء، مغنيسيوم ١٤ من ١، وجمال الشعر والبشرة والأظافر ببيوتين"
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

      {/* ─── Problems / Solutions ─── */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: '#146b70' }}>ثلاثة روتينات</p>
            <h2 className="text-3xl font-bold" style={{ color: '#1C1C1C' }}>لكل احتياج روتين واضح</h2>
            <p className="mt-2 text-sm" style={{ color: '#5c5656' }}>ثلاث مكمّلات على شكل علكة — كلّها داخل سلطة تصنيف واضح وموسوم وفق المتعارف عليه</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { icon: '✨', color: '#b8485c', bg: '#f1e6e4', border: '#d8c9c6', title: 'الجمال من الداخل', desc: 'كولاجين وفيتامين C لدعم نضارة البشرة وقوة الشعر والأظافر.' },
              { icon: '🍃', color: '#b8485c', bg: '#eae2df', border: '#d8c9c6', title: 'خفّة بعد الأكل', desc: 'بروبيوتيك وألياف لدعم راحة الهضم والإحساس بالخفة بعد الوجبات.' },
              { icon: '🌙', color: '#c9937e', bg: '#f3eeeb', border: '#d8c9c6', title: 'هدوء المساء', desc: 'مغنيسيوم وL-Theanine لروتين استرخاء هادئ قبل النوم.' },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl p-7 text-center flex flex-col items-center gap-3"
                style={{ background: item.bg, border: `1px solid ${item.border}` }}
              >
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl" style={{ background: '#fff', border: `1px solid ${item.border}` }}>
                  {item.icon}
                </div>
                <h3 className="text-base font-bold" style={{ color: '#1C1C1C' }}>{item.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#5c5656' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Products ─── */}
      <section className="py-20" style={{ background: '#FFFFFF' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="text-sm font-bold tracking-widest uppercase mb-3" style={{ color: '#b8485c' }}>مجموعتنا</p>
            <h2 className="text-4xl sm:text-5xl font-bold leading-tight" style={{ color: '#1C1C1C' }}>
              اختاري روتينك اليومي
            </h2>
            <p className="mt-4 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto" style={{ color: '#5c5656' }}>
              صياغة مهنية وبنفس وضوح «رفّ الصيدلية»؛ واللذعة تكمّلكِ على الالتزام اليومي
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-stretch min-w-0 w-full">
            {PRODUCTS.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* ─── Authority Lab ─── */}
      <section className="py-20 overflow-hidden relative" style={{ background: '#f1e6e4' }}>
        {/* subtle dot grid */}
        <div className="absolute inset-0 opacity-[0.35]" style={{ backgroundImage: 'radial-gradient(#c9937e 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 text-xs font-mono px-4 py-1.5 rounded-full mb-4" style={{ background: '#fff', color: '#146b70', border: '1px solid #d8c9c6' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#146b70] animate-pulse" />
              Nabta Labo — مختبر تركيب بسلطة مهنية
            </span>
            <h2 className="text-3xl font-bold" style={{ color: '#1C1C1C' }}>مكوّنات نختارها بذات الحذر الذي تنتظرينه خلف زجاج الدوّاء</h2>
            <p className="mt-2 text-sm" style={{ color: '#5c5656' }}>لا نعبّر عن منتج واحد بحلّ لمئات المشكلات؛ كل علكة لهدف واحد وموسوم وفق المعتاد في المكمّل الغذائي</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { code: 'NL-01', name: 'كولاجين', latin: 'Collagen Peptides', desc: 'بروتين هيكلي يدعم بنية البشرة والشعر والأظافر في روتين يومي ثابت.' },
              { code: 'NL-02', name: 'فيتامين C', latin: 'Ascorbic Acid', desc: 'يدعم الوظائف الطبيعية للجسم ويعزز امتصاص الكولاجين.' },
              { code: 'NL-03', name: 'بروبيوتيك', latin: 'Lactobacillus strains', desc: 'بكتيريا نافعة تدعم التوازن الطبيعي للجهاز الهضمي.' },
              { code: 'NL-04', name: 'مغنيسيوم', latin: 'Magnesium Bisglycinate', desc: 'معدن يساعد في دعم وظائف الجهاز العصبي والاسترخاء المسائي.' },
            ].map((ing) => (
              <div
                key={ing.code}
                className="rounded-2xl p-5 flex flex-col gap-3 bg-white"
                style={{ border: '1px solid #d8c9c6', boxShadow: '0 2px 8px rgba(184,72,92,0.09)' }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-md" style={{ background: '#f1e6e4', color: '#b8485c' }}>{ing.code}</span>
                  <div className="w-2 h-2 rounded-full" style={{ background: '#b8485c' }} />
                </div>
                <div className="h-px" style={{ background: '#e0dad7' }} />
                <div>
                  <p className="font-bold text-lg leading-tight" style={{ color: '#1C1C1C' }}>{ing.name}</p>
                  <p className="text-xs font-mono mt-1" style={{ color: '#c9937e' }}>{ing.latin}</p>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: '#5c5656' }}>{ing.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs font-mono" style={{ color: '#b8485c' }}>
            <span>✦ تركيبة يومية آمنة للاستخدام المستمر</span>
            <span className="hidden sm:block">·</span>
            <span>✦ مكوّنات مختارة بمعايير الجودة</span>
            <span className="hidden sm:block">·</span>
            <span>✦ Nabta Labo Formula 2026</span>
          </div>
        </div>
      </section>

      {/* ─── How it works — split + timeline ─── */}
      <section className="py-20" style={{ background: '#f1e6e4' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="rounded-3xl bg-white overflow-hidden" style={{ border: '1px solid #d8c9c6', boxShadow: '0 8px 32px rgba(184,72,92,0.1)' }}>
            <div className="grid lg:grid-cols-12 gap-0">
              <div className="lg:col-span-5 p-8 sm:p-10 lg:p-12 text-center lg:text-right border-b lg:border-b-0 lg:border-s border-[#e0dad7]" style={{ background: 'linear-gradient(180deg, #eae2df 0%, #FFFFFF 55%)' }}>
                <p className="text-sm font-bold tracking-widest uppercase mb-3" style={{ color: '#b8485c' }}>
                  مع نبتة لابو
                </p>
                <h2 className="text-3xl sm:text-4xl font-bold leading-tight mb-4" style={{ color: '#1C1C1C' }}>
                  من الاختيار للتوصيل — وضوح يشبه نقطة الثقة
                </h2>
                <p className="text-base leading-relaxed mb-6 lg:mb-8" style={{ color: '#5c5656' }}>
                  نعتمد أسلوب صيدلي في ما يمكن قوله وفق تصنيف «مكمّل غذائي»: تأكيد بشري قبل الشحن، دفع عند الاستلام، وصياغة لا تغرّكِ بوعودٍ خارج نطاق المنتج.
                </p>
                <div className="flex lg:hidden flex-wrap gap-2 justify-center mb-2">
                  {ORDER_FLOW_TAGS.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-semibold px-3 py-1.5 rounded-full"
                      style={{ background: '#f1e6e4', color: '#b8485c', border: '1px solid #d8c9c6' }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="hidden lg:flex flex-wrap gap-2 justify-center lg:justify-start">
                  {ORDER_FLOW_TAGS.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-semibold px-3 py-1.5 rounded-full"
                      style={{ background: '#f1e6e4', color: '#b8485c', border: '1px solid #d8c9c6' }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-7 p-8 sm:p-10 lg:p-12">
                <ol className="relative space-y-0">
                  {STEPS.map((step, i) => (
                    <li key={step.title} className="relative flex gap-5 sm:gap-6 items-start pb-10 last:pb-0">
                      <div className="relative flex flex-col items-center shrink-0 w-14 sm:w-16">
                        <div
                          className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center text-white text-lg sm:text-xl font-black shadow-md z-10"
                          style={{ background: ORDER_FLOW_GRADIENT, boxShadow: '0 4px 14px rgba(255,107,107,0.35)' }}
                        >
                          {i + 1}
                        </div>
                        {i < STEPS.length - 1 && (
                          <div
                            className="w-1 flex-1 mt-3 rounded-full min-h-[2.75rem]"
                            style={{ background: 'linear-gradient(180deg, #b8485c 0%, #c9937e 100%)', opacity: 0.85 }}
                          />
                        )}
                      </div>
                      <div className="flex-1 min-w-0 pt-1 text-right pb-2">
                        <div className="flex items-center gap-2 justify-end mb-2 flex-wrap">
                          <span className="text-2xl sm:text-3xl leading-none" aria-hidden>{step.icon}</span>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold leading-snug mb-2" style={{ color: '#1C1C1C' }}>
                          {step.title}
                        </h3>
                        <p className="text-sm sm:text-base leading-relaxed" style={{ color: '#5c5656' }}>
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

      {/* ─── Reviews ─── */}
      <section className="py-16" style={{ background: '#FFFFFF' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <div className="flex items-center gap-2 px-5 py-2 rounded-full bg-white" style={{ border: '1px solid #dfd6d4' }}>
                <span style={{ color: '#c9937e', fontSize: '15px' }}>★★★★★</span>
                <span className="font-bold text-sm" style={{ color: '#1C1C1C' }}>4.8</span>
                <span className="text-xs" style={{ color: '#5c5656' }}>من 378 تقييم</span>
              </div>
            </div>
            <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: '#c9937e' }}>تقييمات العملاء</p>
            <h2 className="text-3xl font-bold" style={{ color: '#1C1C1C' }}>قالت عنا عملاؤنا</h2>
            <p className="mt-2 text-sm" style={{ color: '#5c5656' }}>تقييمات من نساء يقدّرن التزامًا يشبه نقطة الثقة أمام الدوّاء</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {REVIEWS.map((r) => (
              <div
                key={r.name}
                className="rounded-2xl p-6 flex flex-col gap-4"
                style={{ background: '#fff', border: '1px solid #dfd6d4', boxShadow: '0 2px 8px rgba(26,25,21,0.04)' }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i} style={{ color: '#c9937e', fontSize: '15px' }}>★</span>
                    ))}
                  </div>
                  <span className="text-xs font-semibold text-white px-3 py-1 rounded-full" style={{ background: r.accent }}>{r.badge}</span>
                </div>
                <p className="leading-relaxed text-base" style={{ color: '#1C1C1C' }}>&ldquo;{r.text}&rdquo;</p>
                <div className="flex items-center justify-between pt-3" style={{ borderTop: '1px solid #F0ECE6' }}>
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0" style={{ background: r.accent }}>
                      {r.name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-semibold leading-none" style={{ color: '#1C1C1C' }}>{r.name}</p>
                      <p className="text-xs mt-1" style={{ color: '#5c5656' }}>{r.city}</p>
                    </div>
                  </div>
                  {r.verified && (
                    <div className="flex items-center gap-1 text-xs" style={{ color: '#b8485c' }}>
                      <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                      </svg>
                      مشتري موثّق
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: '#c9937e' }}>أسئلة شائعة</p>
            <h2 className="text-3xl font-bold" style={{ color: '#1C1C1C' }}>لديك سؤال؟</h2>
          </div>
          <div className="flex flex-col gap-2">
            {FAQS.map((faq) => (
              <details
                key={faq.q}
                className="rounded-2xl overflow-hidden group"
                style={{ border: '1px solid #d8c9c6', background: '#fff' }}
              >
                <summary className="px-6 py-4 font-semibold cursor-pointer list-none flex items-center justify-between transition hover:bg-[#eae2df]" style={{ color: '#1C1C1C', background: '#fff' }}>
                  {faq.q}
                  <span style={{ color: '#b8485c' }} className="group-open:rotate-180 transition-transform duration-200 text-xs shrink-0 mr-3">▼</span>
                </summary>
                <div className="px-6 py-4 text-sm leading-relaxed" style={{ color: '#1C1C1C', background: '#eae2df', borderTop: '1px solid #d8c9c6' }}>{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Final CTA ─── */}
      <section className="py-20" style={{ background: 'linear-gradient(135deg, #b8485c 0%, #943c50 100%)' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          {/* Gold accent */}
          <div className="w-12 h-1 rounded-full mx-auto mb-8" style={{ background: 'linear-gradient(90deg, #c9937e, #d8c9c6)' }} />
          <h2 className="text-3xl font-bold text-white mb-4">جاهزة لروتين بسلطة نبتة لابو؟</h2>
          <p className="mb-8 text-lg" style={{ color: 'rgba(255,255,255,0.75)' }}>
            اختاري المكمّل المناسب — وعدٌ وفق تصنيفه، ومذاقٌ يسهّل أن تبقيه في يومكِ.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 font-bold px-10 py-4 rounded-full text-base transition-all hover:-translate-y-0.5 hover:shadow-2xl"
            style={{ background: '#c9937e', color: '#fff', boxShadow: '0 4px 20px rgba(184,72,92,0.35)' }}
          >
            تسوقي الآن
            <span>←</span>
          </Link>
          <p className="text-sm mt-4" style={{ color: 'rgba(255,255,255,0.45)' }}>دفع عند الاستلام · تأكيد قبل التوصيل · ضمان 30 يوم</p>
        </div>
      </section>

    </div>
  )
}
