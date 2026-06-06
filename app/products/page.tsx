import { PRODUCTS } from '@/lib/products'
import ProductCard from '@/components/product/ProductCard'
import StarRating from '@/components/ui/StarRating'
import ProductsCatalogTracking from '@/components/tracking/ProductsCatalogTracking'

export const metadata = {
  title: 'المنتجات | نبتة لابو',
  description:
    'علكة تحمل تركيبة مكمّل غذائي من نبتة لابو — رونق C، خفّة بيوتك، ليل ماج. موسوم وفق تصنيف SFDA وبروح نقطة دواء؛ من دون مبالغة «صيدلية» في غير حقها.',
}

export default function CollectionPage() {
  return (
    <div className="bg-[#FFFFFF]">
      <ProductsCatalogTracking />
      {/* Hero */}
      <section className="border-b border-border/70 bg-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-start">
          <span className="mb-4 inline-block rounded-full border border-[#cce4e7]/90 bg-[#eaf3f4] px-4 py-1.5 text-sm font-semibold text-[#146b70] shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] ring-1 ring-[#146b70]/[0.06]">
            مكمّل غذائي · علكة بحضور نقطة اعتماد
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#1C1C1C] mb-2 leading-tight">اختاري وجهة الروتين المناسبة لطبيعة يومكِ</h1>
          <p className="text-[#146b70] font-semibold text-sm sm:text-base mb-3 max-w-xl mx-auto">ثلاثة منتجات · ثلاثة أهداف — دون وعدٍ أن علكة واحدة تحلّ كل شيء</p>
          <p className="text-[#5c5656] text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            جمال شعر وبشرة، راحة ما بعد الأكل، وهدوء مسائي — بلغة مكمّل غذائي يحترم فريق يتحدّث وكأنه أمامكِ في نقطة اعتماد وليس أمام لوحة حلوى.
          </p>
          <div className="flex justify-center mt-5">
            <StarRating rating={4.8} count={378} />
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section
        className="py-4"
        style={{ background: 'linear-gradient(90deg, #146b70 0%, #125960 42%, #b8485c 100%)' }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap justify-center gap-6 text-white text-sm">
            {['🛡️ دفع عند الاستلام', '✅ تأكيد قبل التوصيل', '🚚 توصيل المملكة كاملة', '🔬 مكمّل غذائي بسلطة مهنية'].map((b) => (
              <span key={b} className="font-medium">{b}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison quick table */}
      <section className="py-10 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 overflow-x-auto">
          <h2 className="text-xl font-bold text-[#1C1C1C] mb-5 text-start">قارني بين المنتجات</h2>
          <table className="w-full overflow-hidden rounded-xl border-collapse border border-border/60 text-sm shadow-[0_4px_24px_-10px_rgba(26,25,21,0.06)] ring-1 ring-black/[0.02]">
            <thead>
              <tr className="bg-[#FFFFFF]">
                <th className="p-3 text-start font-bold text-[#1C1C1C] border border-gray-200">المنتج</th>
                <th className="p-3 text-center font-bold text-[#c9937e] border border-gray-200">رونق C</th>
                <th className="p-3 text-center font-bold text-[#c9937e] border border-gray-200">خفّة بيوتك</th>
                <th className="p-3 text-center font-bold text-[#b8485c] border border-gray-200">ليل ماج</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['الهدف', 'نضارة وجمال', 'راحة الهضم', 'هدوء المساء'],
                ['المكونات', 'بيوتين + زنك + فيتامين D', 'بروبيوتيك + ألياف', 'مغنيسيوم + L-Theanine'],
                ['أفضل وقت', 'الصباح', 'بعد الوجبات', 'المساء'],
                ['السعر', '199 ريال', '199 ريال', '199 ريال'],
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
              <p className="font-bold text-lg">جربي الثلاثة معاً</p>
              <p className="text-white/80 text-sm">رونق C + خفّة بيوتك + ليل ماج = روتين كامل من الصباح للمساء</p>
            </div>
            <div className="text-center">
              <p className="text-white text-2xl font-bold">349 ريال</p>
              <p className="text-white/70 text-xs">3 منتجات بأفضل سعر</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid min-w-0 w-full grid-cols-1 items-stretch gap-6 md:grid-cols-2 md:gap-8 xl:grid-cols-3">
            {PRODUCTS.map((p) => (
              <ProductCard key={p.id} product={p} layout="list" />
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-start">
          <h2 className="text-2xl font-bold text-[#1C1C1C] mb-8">ماذا قالت عملاؤنا؟</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {PRODUCTS.map((p) => (
              <div key={p.id} className="rounded-2xl border border-border/55 bg-[#FFFFFF] p-5 text-start shadow-[0_4px_22px_-8px_rgba(26,25,21,0.06)] ring-1 ring-black/[0.02]">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold px-2 py-1 rounded-full text-white" style={{ background: p.accentColor }}>{p.nameAr}</span>
                  <StarRating rating={p.rating} size="sm" />
                </div>
                <p className="text-sm text-[#1C1C1C] leading-relaxed">"{p.reviews[0]?.text}"</p>
                <p className="text-xs text-[#5c5656] mt-2">— {p.reviews[0]?.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
