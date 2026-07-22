import { PRODUCTS } from '@/lib/products'
import ProductCard from '@/components/product/ProductCard'
import ProductsSoldProofBar from '@/components/product/ProductsSoldProofBar'
import StarRating from '@/components/ui/StarRating'
import ProductsCatalogTracking from '@/components/tracking/ProductsCatalogTracking'
import HomeMixedBundle from '@/components/home/HomeMixedBundle'

export const metadata = {
  title: 'المنتجات | نبتة لابو',
  description:
    'أربعة منتجات مكمّل غذائي من نبتة لابو — علكة ومسحوق: بيوتين، مغنيسيوم، غلوتاثيون وكولاجين، والتوازن الهرموني. SFDA · حلال · COD.',
}

const STORE_REVIEW_COUNT_FALLBACK = 850

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
          <h1 className="text-4xl sm:text-5xl font-bold text-[#1C1C1C] mb-2 leading-tight">أربعة منتجات — علكة ومسحوق</h1>
          <p className="text-[#146b70] font-semibold text-sm sm:text-base mb-3 max-w-2xl">
            روتين واحد متكامل — وحالة المخزون واضحة في زر كل منتج.
          </p>
          <p className="text-[#5c5656] text-base sm:text-lg max-w-2xl leading-relaxed">
            البيوتين والتوازن الهرموني متوفران الآن، والمغنيسيوم والغلوتاثيون مع الكولاجين يعودان قريباً.
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

      {/* Products catalog — أربعة منتجات بدون تقسيم */}
      <section id="products" className="scroll-mt-24 py-10 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <ProductsSoldProofBar />
          <div className="mb-6 text-start">
            <p className="mb-1 text-xs font-bold uppercase tracking-[0.18em] text-[#146b70]">منتجات نبتة لابو</p>
            <h2 className="text-xl font-bold text-[#1C1C1C] sm:text-2xl">ثلاثة متوفرة الآن — تكمل بعضها</h2>
            <p className="mt-1 text-sm text-[#5c5656]">اضغطي على أي منتج للتفاصيل — وحالة المخزون مكتوبة في الزر.</p>
          </div>
          <div className="grid min-w-0 w-full grid-cols-1 items-stretch gap-6 md:gap-8">
            {PRODUCTS.map((p) => (
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

      <section className="border-t border-border/70 bg-[#faf9f8] py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <HomeMixedBundle />
        </div>
      </section>
    </div>
  )
}
