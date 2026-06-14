import { PRODUCTS, STORE_REVIEW_HEADLINE } from '@/lib/products'
import ProductCard from '@/components/product/ProductCard'
import ProductsSoldProofBar from '@/components/product/ProductsSoldProofBar'
import StarRating from '@/components/ui/StarRating'
import ProductsCatalogTracking from '@/components/tracking/ProductsCatalogTracking'

export const metadata = {
  title: 'المنتجات | نبتة لابو',
  description:
    'علكات وسواشيه مسحوق من نبتة لابو — 6 منتجات، مشكلة واحدة لكل. شعر، بشرة، هضم، نوم، ودورة شهرية. SFDA · حلال · COD.',
}

const GUMMIES = PRODUCTS.filter((p) => !p.format || p.format === 'gummy')
const POWDERS = PRODUCTS.filter((p) => p.format === 'powder_sachet')

export default function CollectionPage() {
  return (
    <div className="bg-[#FFFFFF]">
      <ProductsCatalogTracking />

      {/* Hero */}
      <section className="border-b border-border/70 bg-white py-12">
        <div className="mx-auto max-w-6xl px-4 text-start sm:px-6">
          <span className="mb-4 inline-block rounded-full border border-[#cce4e7]/90 bg-[#eaf3f4] px-4 py-1.5 text-sm font-semibold text-[#146b70] shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] ring-1 ring-[#146b70]/[0.06]">
            6 منتجات · علكات + سواشيه مسحوق · SFDA · COD
          </span>
          <h1 className="mb-2 text-4xl font-bold leading-tight text-[#1C1C1C] sm:text-5xl">
            مشكلة واحدة — منتج واحد مصنوع لها
          </h1>
          <p className="mb-3 max-w-xl text-base font-semibold text-[#146b70] sm:text-lg">
            خط علكات يومية + خط سواشيه مسحوق مركّز — من الداخل، لا من السطح
          </p>
          <p className="max-w-xl text-base leading-relaxed text-[#5c5656] sm:text-lg">
            شعر، بشرة، هضم، نوم، ودورة شهرية — كل مشكلة لها تركيبة خاصة. دفع عند الاستلام، تأكيد هاتفي، توصيل كل المناطق.
          </p>
          <div className="mt-5">
            <StarRating rating={4.8} count={STORE_REVIEW_HEADLINE} />
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section
        className="py-4"
        style={{ background: 'linear-gradient(90deg, #146b70 0%, #125960 42%, #b8485c 100%)' }}
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-wrap justify-center gap-6 text-sm text-white">
            {['🛡️ دفع عند الاستلام', '✅ تأكيد قبل التوصيل', '🚚 توصيل المملكة كاملة', '🔬 SFDA · حلال'].map((b) => (
              <span key={b} className="font-medium">{b}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── خط العلكات ─── */}
      <section id="gummies" className="scroll-mt-20 py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-10 text-start">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#b8485c]/20 bg-[#f1e6e4] px-4 py-1.5 text-xs font-bold text-[#b8485c]">
              🍬 خط العلكات — Gummy Line
            </div>
            <h2 className="text-2xl font-bold text-[#1C1C1C] sm:text-3xl">روتين يومي سهل الالتزام</h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#5c5656] sm:text-base">
              علكتان فقط في اليوم — صباح، بعد الأكل، أو مساء. طعم خفيف، لا كبسولات، لا بودرة.
            </p>
          </div>
          <ProductsSoldProofBar />
          <div className="grid min-w-0 grid-cols-1 items-stretch gap-6 md:grid-cols-3 md:gap-8">
            {GUMMIES.map((p) => (
              <ProductCard key={p.id} product={p} useHomeCardImage />
            ))}
          </div>

          {/* Bundle nudge for gummies */}
          <div className="mt-8 flex flex-col items-stretch justify-between gap-4 rounded-2xl border border-white/10 bg-[#b8485c] px-6 py-5 shadow-[0_12px_40px_-16px_rgba(148,60,80,0.45)] ring-1 ring-black/[0.06] sm:flex-row sm:items-center">
            <div className="text-start text-white">
              <p className="mb-1 text-lg font-bold">جربي الثلاثة معاً — روتين كامل من الصباح للمساء</p>
              <p className="text-sm text-white/80">رونق C + خفّة بيوتك + ليل ماج = علكة صباح، علكة بعد الأكل، علكة مساء</p>
            </div>
            <div className="shrink-0 text-start sm:text-end">
              <p className="text-2xl font-black text-white">349 ريال</p>
              <p className="text-xs text-white/70">3 منتجات · توفير · COD</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── خط المسحوق ─── */}
      <section id="powders" className="scroll-mt-20 py-14" style={{ background: '#F7F3F8' }}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-10 text-start">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#2D7D6F]/25 bg-[#E5F3F0] px-4 py-1.5 text-xs font-bold text-[#2D7D6F]">
              🌿 خط المسحوق — Powder Sachet Line · جديد
            </div>
            <h2 className="text-2xl font-bold text-[#1C1C1C] sm:text-3xl">للمشاكل الأعمق — تركيبة مركّزة</h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#5c5656] sm:text-base">
              ساشيه واحد يومياً في كوب ماء أو عصير. كولاجين بحري، غلوتاثيون، مايو-إينوسيتول — مكوّنات بتركيز أعلى لمشاكل تحتاج أكثر من علكة.
            </p>
          </div>
          <div className="grid min-w-0 grid-cols-1 items-stretch gap-6 md:grid-cols-3 md:gap-8">
            {POWDERS.map((p) => (
              <ProductCard key={p.id} product={p} useHomeCardImage />
            ))}
          </div>
          <div className="mt-6 rounded-2xl border border-[#c8e5dd] bg-[#E5F3F0] p-4 text-sm sm:p-6">
            <p className="font-bold text-[#2D7D6F]">📦 الصور الرسمية قادمة قريباً</p>
            <p className="mt-1 text-[#5c5656]">المنتجات متاحة الآن للطلب — نعمل على تصوير احترافي للمنتجات الجديدة. الطلبات تُؤكَّد بمكالمة وتُسلَّم COD كالمعتاد.</p>
          </div>
        </div>
      </section>

      {/* Comparison table */}
      <section className="bg-white py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="mb-5 text-start text-xl font-bold text-[#1C1C1C]">قارني بين المنتجات</h2>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] overflow-hidden rounded-xl border-collapse border border-border/60 text-sm shadow-[0_4px_24px_-10px_rgba(26,25,21,0.06)] ring-1 ring-black/[0.02]">
              <thead>
                <tr className="bg-[#FAFAFA]">
                  <th className="border border-gray-200 p-3 text-start font-bold text-[#1C1C1C]">المنتج</th>
                  {PRODUCTS.map((p) => (
                    <th key={p.id} className="border border-gray-200 p-3 text-center font-bold" style={{ color: p.accentColor }}>
                      {p.nameAr}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['الشكل', ...PRODUCTS.map((p) => p.format === 'powder_sachet' ? 'ساشيه مسحوق' : 'علكة')],
                  ['الهدف', 'جمال + شعر', 'راحة الهضم', 'هدوء المساء', 'قوة الشعر', 'بشرة نقية', 'دورة هادئة'],
                  ['وقت الاستخدام', 'صباحاً', 'بعد الوجبات', 'مساءً', 'صباحاً', 'يومياً', 'يومياً'],
                  ['السعر', '199 ر.س', '199 ر.س', '199 ر.س', '199 ر.س', '199 ر.س', '199 ر.س'],
                ].map(([label, ...vals]) => (
                  <tr key={label} className="border-b border-gray-100/90 transition-colors duration-200 ease-out hover:bg-[#faf9f8]">
                    <td className="border border-gray-200 p-3 font-semibold text-[#1C1C1C]">{label}</td>
                    {vals.map((v, i) => (
                      <td key={i} className="border border-gray-200 p-3 text-center text-[#5c5656]">{v}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-6xl px-4 text-start sm:px-6">
          <h2 className="mb-8 text-2xl font-bold text-[#1C1C1C]">ماذا قالت عميلاتنا؟</h2>
          <div className="grid gap-5 md:grid-cols-3">
            {GUMMIES.map((p) => (
              <div key={p.id} className="rounded-2xl border border-border/55 bg-[#FFFFFF] p-5 text-start shadow-[0_4px_22px_-8px_rgba(26,25,21,0.06)] ring-1 ring-black/[0.02]">
                <div className="mb-3 flex items-center justify-between">
                  <span className="rounded-full px-2 py-1 text-xs font-semibold text-white" style={{ background: p.accentColor }}>{p.nameAr}</span>
                  <StarRating rating={p.rating} size="sm" />
                </div>
                <p className="text-sm leading-relaxed text-[#1C1C1C]">&ldquo;{p.reviews[0]?.text}&rdquo;</p>
                <p className="mt-2 text-xs text-[#5c5656]">— {p.reviews[0]?.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
