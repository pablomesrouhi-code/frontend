import { PRODUCTS } from '@/lib/products'
import ProductCard from '@/components/product/ProductCard'
import ProductsSoldProofBar from '@/components/product/ProductsSoldProofBar'
import StarRating from '@/components/ui/StarRating'
import ProductsCatalogTracking from '@/components/tracking/ProductsCatalogTracking'

export const metadata = {
  title: 'المنتجات | نبتة لابو',
  description:
    'علكات وسواشيه مسحوق مكمّل غذائي من نبتة لابو — رونق C، خفّة بيوتك، ليل ماج، قوة شعر، وضوح، شهر هادئ. SFDA · حلال · COD.',
}

const GUMMIES = PRODUCTS.filter((p) => !p.format || p.format === 'gummy')
const POWDERS = PRODUCTS.filter((p) => p.format === 'powder_sachet')
const STORE_REVIEW_COUNT_FALLBACK = 850

export default function CollectionPage() {
  return (
    <div className="bg-[#FFFFFF]">
      <ProductsCatalogTracking />
      {/* Hero */}
      <section className="border-b border-border/70 bg-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-start">
          <span className="mb-4 inline-block rounded-full border border-[#cce4e7]/90 bg-[#eaf3f4] px-4 py-1.5 text-sm font-semibold text-[#146b70] shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] ring-1 ring-[#146b70]/[0.06]">
            مكمّل غذائي · علكة + ساشيه مسحوق
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#1C1C1C] mb-2 leading-tight">ستة منتجات — هدف واضح لكل واحد</h1>
          <p className="text-[#146b70] font-semibold text-sm sm:text-base mb-3 max-w-2xl">ثلاث علكات يومية + ثلاثة سواشيه مسحوق مركّزة — اختاري الأقرب ليومك.</p>
          <p className="text-[#5c5656] text-base sm:text-lg max-w-2xl leading-relaxed">
            جمال شعر وبشرة، راحة بعد الأكل، هدوء المساء، تساقط الشعر، حبوب البشرة، وأيام الدورة — لغة مكمّل غذائي بدون مبالغة.
          </p>
          <div className="flex items-center mt-5">
            <StarRating rating={4.8} count={STORE_REVIEW_COUNT_FALLBACK} />
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section
        className="py-4"
        style={{ background: 'linear-gradient(90deg, #146b70 0%, #125960 42%, #b8485c 100%)' }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap justify-center gap-6 text-white text-sm">
            {['🛡️ دفع عند الاستلام', '✅ تأكيد قبل التوصيل', '🚚 توصيل المملكة كاملة', '🔬 SFDA · حلال'].map((b) => (
              <span key={b} className="font-medium">{b}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Gummies Section */}
      <section id="gummies" className="scroll-mt-24 py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="mb-8 text-start">
            <p className="mb-2 text-sm font-bold uppercase tracking-widest" style={{ color: '#b8485c' }}>
              🍬 خط العلكات اليومية
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1C1C1C]">روتين سهل · علكتان في الصباح</h2>
          </div>
          <ProductsSoldProofBar />
          <div className="grid min-w-0 w-full grid-cols-1 items-stretch gap-6 md:grid-cols-3 md:gap-8">
            {GUMMIES.map((p) => (
              <ProductCard key={p.id} product={p} useHomeCardImage />
            ))}
          </div>
        </div>
      </section>

      {/* Comparison table — gummies */}
      <section className="py-8 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 overflow-x-auto">
          <h2 className="text-xl font-bold text-[#1C1C1C] mb-5 text-start">قارني العلكات</h2>
          <table className="w-full overflow-hidden rounded-xl border-collapse border border-border/60 text-sm shadow-[0_4px_24px_-10px_rgba(26,25,21,0.06)] ring-1 ring-black/[0.02]">
            <thead>
              <tr className="bg-[#FFFFFF]">
                <th className="p-3 text-start font-bold text-[#1C1C1C] border border-gray-200">المنتج</th>
                <th className="p-3 text-center font-bold text-[#b8485c] border border-gray-200">رونق C</th>
                <th className="p-3 text-center font-bold text-[#c9937e] border border-gray-200">خفّة بيوتك</th>
                <th className="p-3 text-center font-bold text-[#b8485c] border border-gray-200">ليل ماج</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['الهدف', 'نضارة وجمال', 'راحة الهضم', 'هدوء المساء'],
                ['المكونات', 'بيوتين + زنك + D', 'بروبيوتيك + ألياف', 'مغنيسيوم + L-Theanine'],
                ['أفضل وقت', 'الصباح', 'بعد الوجبات', 'المساء'],
                ['السعر', '199 ر.س', '199 ر.س', '199 ر.س'],
              ].map(([label, ...vals]) => (
                <tr key={label} className="border-b border-gray-100/90 transition-colors duration-200 ease-out hover:bg-[#faf9f8]">
                  <td className="p-3 font-semibold text-[#1C1C1C] border border-gray-200">{label}</td>
                  {vals.map((v, i) => (
                    <td key={i} className="p-3 text-center text-[#5c5656] border border-gray-200">{v}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Bundle nudge (gummies trio) */}
      <section className="py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-white/10 bg-[#b8485c] px-6 py-5 shadow-[0_12px_40px_-16px_rgba(148,60,80,0.45)] ring-1 ring-black/[0.06] sm:flex-row">
            <div className="text-white">
              <p className="font-bold text-lg">جربي الثلاثة معاً</p>
              <p className="text-white/80 text-sm">رونق C + خفّة بيوتك + ليل ماج = روتين كامل من الصباح للمساء</p>
            </div>
            <div className="text-center">
              <p className="text-white text-2xl font-bold">349 ر.س</p>
              <p className="text-white/70 text-xs">3 علكات بأفضل سعر</p>
            </div>
          </div>
        </div>
      </section>

      {/* Powder Section */}
      <section id="powders" className="scroll-mt-24 py-14 sm:py-16" style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #FAF7F4 100%)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="mb-8 text-start">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#7A9484] px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white">
              🌿 خط المسحوق · جديد
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1C1C1C]">سواشيه مركّزة — للمشاكل الأعمق</h2>
            <p className="mt-2 max-w-2xl text-sm text-[#5c5656]">ساشيه يومي في كوب ماء. صور المنتجات الرسمية قريباً.</p>
          </div>
          <div className="grid min-w-0 w-full grid-cols-1 items-stretch gap-6 md:grid-cols-3 md:gap-8">
            {POWDERS.map((p) => (
              <ProductCard key={p.id} product={p} useHomeCardImage />
            ))}
          </div>

          {/* Powder comparison */}
          <div className="mt-10 overflow-x-auto">
            <table className="w-full overflow-hidden rounded-xl border-collapse border border-border/60 text-sm shadow-[0_4px_24px_-10px_rgba(26,25,21,0.06)] ring-1 ring-black/[0.02] bg-white">
              <thead>
                <tr className="bg-[#FFFFFF]">
                  <th className="p-3 text-start font-bold text-[#1C1C1C] border border-gray-200">المنتج</th>
                  <th className="p-3 text-center font-bold border border-gray-200" style={{ color: '#B5896A' }}>قوة شعر</th>
                  <th className="p-3 text-center font-bold border border-gray-200" style={{ color: '#7A9484' }}>وضوح</th>
                  <th className="p-3 text-center font-bold border border-gray-200" style={{ color: '#8E6C8E' }}>شهر هادئ</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['المشكلة', 'تساقط شعر', 'حبوب وبشرة باهتة', 'PMS وألم الدورة'],
                  ['المكوّن الأساسي', 'كولاجين بحري + حديد', 'غلوتاثيون + كولاجين', 'مايو-إينوسيتول + فيتكس'],
                  ['الجرعة', '1 ساشيه/يوم', '1 ساشيه/يوم', '1 ساشيه/يوم'],
                  ['أفضل وقت', 'الصباح', 'الصباح', 'مع الوجبة'],
                  ['السعر', '249 ر.س', '249 ر.س', '249 ر.س'],
                ].map(([label, ...vals]) => (
                  <tr key={label} className="border-b border-gray-100/90 hover:bg-[#faf9f8]">
                    <td className="p-3 font-semibold text-[#1C1C1C] border border-gray-200">{label}</td>
                    {vals.map((v, i) => (
                      <td key={i} className="p-3 text-center text-[#5c5656] border border-gray-200">{v}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-start">
          <h2 className="text-2xl font-bold text-[#1C1C1C] mb-8">ماذا قالت عميلاتنا؟</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {PRODUCTS.map((p) => (
              <div key={p.id} className="rounded-2xl border border-border/55 bg-[#FFFFFF] p-5 text-start shadow-[0_4px_22px_-8px_rgba(26,25,21,0.06)] ring-1 ring-black/[0.02]">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold px-2 py-1 rounded-full text-white" style={{ background: p.accentColor }}>{p.nameAr}</span>
                  <StarRating rating={p.rating} size="sm" />
                </div>
                <p className="text-sm text-[#1C1C1C] leading-relaxed">&ldquo;{p.reviews[0]?.text}&rdquo;</p>
                <p className="text-xs text-[#5c5656] mt-2">— {p.reviews[0]?.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
