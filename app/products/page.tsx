import { PRODUCTS } from '@/lib/products'
import ProductCard from '@/components/product/ProductCard'
import StarRating from '@/components/ui/StarRating'

export const metadata = {
  title: 'المنتجات | نبتة لابو',
  description:
    'علكة تحمل تركيبة مكمّل غذائي من نبتة لابو — رونق C، خفّة بيوتك، ليل ماج. موسوم وفق تصنيف SFDA وبروح نقطة دواء؛ من دون مبالغة «صيدلية» في غير حقها.',
}

export default function CollectionPage() {
  return (
    <div className="bg-[#FFFFFF]">
      {/* Hero */}
      <section className="bg-white border-b border-gray-100 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-block bg-[#eaf3f4] text-[#146b70] text-sm font-semibold px-4 py-1.5 rounded-full mb-4 border border-[#cce4e7]">
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
          <h2 className="text-xl font-bold text-[#1C1C1C] mb-5 text-center">قارني بين المنتجات</h2>
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-[#FFFFFF]">
                <th className="p-3 text-right font-bold text-[#1C1C1C] border border-gray-200">المنتج</th>
                <th className="p-3 text-center font-bold text-[#c9937e] border border-gray-200">رونق C</th>
                <th className="p-3 text-center font-bold text-[#c9937e] border border-gray-200">خفّة بيوتك</th>
                <th className="p-3 text-center font-bold text-[#b8485c] border border-gray-200">ليل ماج</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['الهدف', 'نضارة وجمال', 'راحة الهضم', 'هدوء المساء'],
                ['المكونات', 'كولاجين + فيتامين C', 'بروبيوتيك + ألياف', 'مغنيسيوم + L-Theanine'],
                ['أفضل وقت', 'الصباح', 'بعد الوجبات', 'المساء'],
                ['السعر', '199 ريال', '199 ريال', '199 ريال'],
              ].map(([label, ...vals]) => (
                <tr key={label} className="border-b border-gray-100 hover:bg-[#FFFFFF] transition">
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
          <div className="bg-[#b8485c] rounded-2xl px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-stretch min-w-0 w-full">
            {PRODUCTS.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl font-bold text-[#1C1C1C] mb-8">ماذا قالت عملاؤنا؟</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {PRODUCTS.map((p) => (
              <div key={p.id} className="bg-[#FFFFFF] rounded-2xl p-5 text-right">
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
