import { PRODUCTS } from '@/lib/products'
import ProductCard from '@/components/product/ProductCard'
import ProductsSoldProofBar from '@/components/product/ProductsSoldProofBar'
import StarRating from '@/components/ui/StarRating'
import ProductsCatalogTracking from '@/components/tracking/ProductsCatalogTracking'

export const metadata = {
  title: 'المنتجات | نبتة لابو',
  description:
    'ستة منتجات مكمّل غذائي من نبتة لابو — علكة ومسحوق: رونق C، خفّة بيوتك، ليل ماج، قوة شعر، وضوح، شهر هادئ. SFDA · حلال · COD.',
}

const STORE_REVIEW_COUNT_FALLBACK = 850
const GUMMY_PRODUCTS = PRODUCTS.filter((p) => !p.format || p.format === 'gummy')
const POWDER_PRODUCTS = PRODUCTS.filter((p) => p.format === 'powder_sachet')

export default function CollectionPage() {
  return (
    <div className="bg-[#FFFFFF]">
      <ProductsCatalogTracking />
      {/* Hero */}
      <section className="border-b border-border/70 bg-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-start">
          <span className="mb-4 inline-block rounded-full border border-[#cce4e7]/90 bg-[#eaf3f4] px-4 py-1.5 text-sm font-semibold text-[#146b70] shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] ring-1 ring-[#146b70]/[0.06]">
            مكمّل غذائي · علكة ومسحوق
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#1C1C1C] mb-2 leading-tight">ستة منتجات — علكة ومسحوق</h1>
          <p className="text-[#146b70] font-semibold text-sm sm:text-base mb-3 max-w-2xl">
            ثلاث علكات يومية وثلاثة سواشيه مسحوق — اختاري الأقرب لاحتياجك.
          </p>
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

      {/* Comparison table — all products */}
      <section className="py-10 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 overflow-x-auto">
          <h2 className="text-xl font-bold text-[#1C1C1C] mb-5 text-start">قارني بين المنتجات</h2>
          <table className="w-full overflow-hidden rounded-xl border-collapse border border-border/60 text-sm shadow-[0_4px_24px_-10px_rgba(26,25,21,0.06)] ring-1 ring-black/[0.02]">
            <thead>
              <tr className="bg-[#FFFFFF]">
                <th className="p-3 text-start font-bold text-[#1C1C1C] border border-gray-200">المنتج</th>
                <th className="p-3 text-center font-bold text-[#b8485c] border border-gray-200">رونق C</th>
                <th className="p-3 text-center font-bold text-[#c9937e] border border-gray-200">خفّة بيوتك</th>
                <th className="p-3 text-center font-bold text-[#b8485c] border border-gray-200">ليل ماج</th>
                <th className="p-3 text-center font-bold border border-gray-200" style={{ color: '#B5896A' }}>قوة شعر</th>
                <th className="p-3 text-center font-bold border border-gray-200" style={{ color: '#7A9484' }}>وضوح</th>
                <th className="p-3 text-center font-bold border border-gray-200" style={{ color: '#8E6C8E' }}>شهر هادئ</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['الهدف', 'جمال داخلي', 'راحة الهضم', 'هدوء المساء', 'تساقط الشعر', 'بشرة نقية', 'دورة هادئة'],
                ['أفضل وقت', 'الصباح', 'بعد الأكل', 'المساء', 'الصباح', 'الصباح', 'يومياً'],
                ['السعر', '199 ر.س', '199 ر.س', '199 ر.س', '249 ر.س', '249 ر.س', '249 ر.س'],
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

      {/* Bundle nudge */}
      <section className="py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-white/10 bg-[#b8485c] px-6 py-5 shadow-[0_12px_40px_-16px_rgba(148,60,80,0.45)] ring-1 ring-black/[0.06] sm:flex-row">
            <div className="text-white">
              <p className="font-bold text-lg">كمّلي روتينك</p>
              <p className="text-white/80 text-sm">اختاري أكثر من منتج — عروض قطعة / قطعتين / ثلاث على كل منتج</p>
            </div>
            <div className="text-center">
              <p className="text-white text-2xl font-bold">349 ر.س</p>
              <p className="text-white/70 text-xs">3 قطع — أفضل توفير</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products catalog — علكات */}
      <section id="products" className="scroll-mt-24 py-10 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <ProductsSoldProofBar />
          <div className="mb-6 text-start">
            <p className="mb-1 text-xs font-bold uppercase tracking-[0.18em] text-[#146b70]">الخط الكلاسيكي</p>
            <h2 className="text-xl font-bold text-[#1C1C1C] sm:text-2xl">ثلاث علكات يومية</h2>
            <p className="mt-1 text-sm text-[#5c5656]">جمال، هضم، نوم — علكتان في الجرعة حسب الغلاف.</p>
          </div>
          <div className="grid min-w-0 w-full grid-cols-1 items-stretch gap-6 md:gap-8">
            {GUMMY_PRODUCTS.map((p) => (
              <ProductCard key={p.id} product={p} layout="list" useHomeCardImage />
            ))}
          </div>
        </div>
      </section>

      {/* Products catalog — مساحيق جديدة */}
      <section id="powder-line" className="scroll-mt-24 border-t border-border/70 bg-[#faf9f8] py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="mb-6 text-start">
            <span className="mb-2 inline-flex rounded-full bg-charcoal px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-white sm:text-xs">
              جديد
            </span>
            <h2 className="mt-2 text-xl font-bold text-[#1C1C1C] sm:text-2xl">خط ساشيه المسحوق</h2>
            <p className="mt-1 max-w-2xl text-sm text-[#5c5656]">
              ثلاثة منتجات جديدة — ساشيه يُذاب في ماء أو عصير فاتر. شعر، بشرة، وأيام الدورة — مو علكة.
            </p>
          </div>
          <div className="grid min-w-0 w-full grid-cols-1 items-stretch gap-6 md:gap-8">
            {POWDER_PRODUCTS.map((p) => (
              <ProductCard key={p.id} product={p} layout="list" useHomeCardImage />
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-start">
          <h2 className="text-2xl font-bold text-[#1C1C1C] mb-8">ماذا قالت عميلاتنا؟</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {PRODUCTS.filter((p) => p.reviews.length > 0).map((p) => (
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
