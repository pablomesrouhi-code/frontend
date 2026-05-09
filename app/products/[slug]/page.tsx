import Image from 'next/image'
import { notFound } from 'next/navigation'
import { PRODUCTS, getProductBySlug, getProductById } from '@/lib/products'
import StarRating from '@/components/ui/StarRating'
import ProductPageClient from './ProductPageClient'
import ProductCard from '@/components/product/ProductCard'

export async function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) return {}
  return {
    title: `${product.nameAr} | نبتة لابو`,
    description: product.subtitleAr,
  }
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) notFound()

  const crossSellProducts = product.crossSells
    .map((id) => getProductById(id))
    .filter(Boolean) as typeof PRODUCTS

  return (
    <div className="bg-[#FFFFFF] min-w-0">
      {/* Hero — min-w-0 على أعمدة الـ grid يمنع قصّ النص في الموبايل (RTL) */}
      <section className="bg-white py-10 md:py-16 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 min-w-0">
          <div className="grid md:grid-cols-2 gap-10 items-center min-w-0">
            <div className="order-1 md:order-2 min-w-0">
              <div className="w-full max-w-full overflow-hidden rounded-2xl border border-gray-100 bg-white p-2 sm:p-3">
                <Image
                  src={product.coverImage}
                  alt={product.nameAr}
                  width={product.coverWidth}
                  height={product.coverHeight}
                  priority
                  sizes="(max-width: 768px) 100vw, 500px"
                  className="h-auto w-full object-contain"
                />
              </div>
            </div>
            <div className="order-2 md:order-1 min-w-0 max-w-full text-right break-words">
              <span
                className="inline-block text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-3 break-words text-right max-w-full"
                style={{ background: product.accentColor }}
              >
                {product.badgeAr}
              </span>
              <h1 className="text-3xl sm:text-4xl font-bold text-[#1C1C1C] mb-2 break-words">{product.nameAr}</h1>
              <p className="text-base sm:text-lg text-[#5c5656] mb-4 break-words">{product.heroHeadlineAr}</p>
              <div className="mb-4">
                <StarRating rating={product.rating} count={product.reviewCount} />
              </div>
              <p className="text-[#5c5656] leading-relaxed mb-6 break-words">{product.heroSubAr}</p>
              <div className="flex flex-wrap gap-2 mb-6 justify-end">
                {product.ingredients.map((ing) => (
                  <span key={ing} className="text-sm bg-[#FFFFFF] text-[#5c5656] px-3 py-1 rounded-full border border-gray-200 max-w-full break-words">
                    {ing}
                  </span>
                ))}
              </div>
              <ProductPageClient product={product} />
            </div>
          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <div className="bg-[#b8485c] py-3">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-wrap justify-center gap-6 text-white text-sm">
          {['🛡️ دفع عند الاستلام', '✅ تأكيد قبل التوصيل', '🌿 تركيبة مدروسة', '🚚 توصيل للمملكة'].map((b) => (
            <span key={b}>{b}</span>
          ))}
        </div>
      </div>

      {/* Pain / Desire - alternating */}
      <section className="py-14 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 min-w-0">
          <div className="grid md:grid-cols-2 gap-10 items-center min-w-0">
            <div className="text-right min-w-0 max-w-full break-words">
              <h2 className="text-2xl font-bold text-[#1C1C1C] mb-4 break-words">لماذا تحتاجينه؟</h2>
              <p className="text-[#5c5656] leading-relaxed text-base sm:text-lg break-words">{product.painCopy}</p>
            </div>
            <div className="w-full max-w-full min-w-0 overflow-hidden rounded-2xl border border-gray-100 bg-white p-2 sm:p-3">
              <Image
                src={product.coverImage}
                alt={`${product.nameAr} — لماذا تحتاجينه`}
                width={product.coverWidth}
                height={product.coverHeight}
                sizes="(max-width: 768px) 100vw, 480px"
                className="h-auto w-full object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 min-w-0">
          <h2 className="text-2xl font-bold text-[#1C1C1C] mb-8 text-center break-words px-1">الفوائد الرئيسية</h2>
          <div className="grid sm:grid-cols-2 gap-4 min-w-0">
            {product.benefits.map((b) => (
              <div key={b} className="bg-white rounded-2xl p-5 flex items-start gap-4 shadow-sm min-w-0">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white shrink-0 mt-0.5"
                  style={{ background: product.accentColor }}
                >
                  ✓
                </div>
                <p className="text-[#1C1C1C] leading-relaxed min-w-0 flex-1 break-words text-right">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ingredients deep dive - alternating */}
      <section className="py-14 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 min-w-0">
          <div className="grid md:grid-cols-2 gap-10 items-center min-w-0">
            <div className="w-full max-w-full min-w-0 overflow-hidden rounded-2xl border border-gray-100 bg-white p-2 sm:p-3">
              <Image
                src={product.coverImage}
                alt={`${product.nameAr} — المكونات`}
                width={product.coverWidth}
                height={product.coverHeight}
                sizes="(max-width: 768px) 100vw, 480px"
                className="h-auto w-full object-contain"
              />
            </div>
            <div className="text-right min-w-0 max-w-full break-words">
              <h2 className="text-2xl font-bold text-[#1C1C1C] mb-4 break-words">المكونات الفعّالة</h2>
              <div className="flex flex-col gap-3 min-w-0">
                {product.ingredients.map((ing) => (
                  <div key={ing} className="bg-[#FFFFFF] rounded-xl px-5 py-4 min-w-0">
                    <p className="font-bold text-[#1C1C1C] break-words">{ing}</p>
                    <p className="text-sm text-[#5c5656] mt-1 break-words">
                      {ing === 'كولاجين' && 'بروتين أساسي يدعم بنية البشرة والشعر والأظافر في روتين يومي ثابت.'}
                      {ing === 'فيتامين C' && 'يساعد على دعم وظائف الجسم الطبيعية ويكمّل تأثير الكولاجين.'}
                      {ing === 'بروبيوتيك' && 'بكتيريا نافعة تدعم التوازن الطبيعي للجهاز الهضمي.'}
                      {ing === 'ألياف' && 'تساعد في دعم حركة الهضم الطبيعية وإحساس الخفة.'}
                      {ing === 'مغنيسيوم' && 'معدن ضروري يساعد في دعم وظائف الجهاز العصبي الطبيعية والاسترخاء.'}
                      {ing === 'L-Theanine' && 'حمض أميني طبيعي من الشاي الأخضر، يساعد في دعم الاسترخاء دون النعاس.'}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to use */}
      <section className="py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center min-w-0">
          <div
            className="rounded-2xl p-6 sm:p-8 min-w-0 max-w-full break-words"
            style={{ background: product.bgColor }}
          >
            <div className="text-4xl mb-3">🌿</div>
            <h2 className="text-2xl font-bold text-[#1C1C1C] mb-3 break-words">كيفية الاستخدام</h2>
            <p className="text-[#5c5656] leading-relaxed text-base sm:text-lg break-words">{product.howToUse}</p>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-14 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-8 min-w-0">
            <h2 className="text-2xl font-bold text-[#1C1C1C] break-words text-right">تقييمات العملاء</h2>
            <StarRating rating={product.rating} count={product.reviewCount} />
          </div>
          <div className="grid md:grid-cols-3 gap-5 min-w-0">
            {product.reviews.map((r) => (
              <div key={r.name} className="bg-[#FFFFFF] rounded-2xl p-5 min-w-0 break-words">
                <StarRating rating={r.rating} size="sm" />
                <p className="text-[#1C1C1C] mt-3 leading-relaxed break-words">&ldquo;{r.text}&rdquo;</p>
                <p className="text-sm font-semibold text-[#5c5656] mt-3 break-words">— {r.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cross-sells */}
      {crossSellProducts.length > 0 && (
        <section className="py-14">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 min-w-0">
            <h2 className="text-2xl font-bold text-[#1C1C1C] mb-3 text-center break-words px-1">كمّلي روتينك مع نبتة لابو</h2>
            <p className="text-[#5c5656] text-center mb-8 break-words px-1">منتجات تكمّل تجربتك اليومية</p>
            <div className="grid md:grid-cols-2 gap-6">
              {crossSellProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="py-14 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 min-w-0">
          <h2 className="text-2xl font-bold text-[#1C1C1C] mb-8 text-center break-words">أسئلة شائعة</h2>
          <div className="flex flex-col gap-3 min-w-0">
            {product.faqs.map((faq) => (
              <details key={faq.q} className="bg-[#FFFFFF] rounded-2xl overflow-hidden group min-w-0 border border-[#dfd6d4]">
                <summary className="px-4 sm:px-6 py-4 font-semibold text-[#1C1C1C] cursor-pointer list-none flex items-start sm:items-center justify-between gap-3 hover:bg-[#eae2df] transition min-w-0">
                  <span className="text-right flex-1 min-w-0 break-words">{faq.q}</span>
                  <span className="text-[#b8485c] shrink-0 group-open:rotate-180 transition-transform duration-200 pt-0.5">▼</span>
                </summary>
                <div className="px-4 sm:px-6 pb-4 text-sm text-[#5c5656] leading-relaxed break-words text-right border-t border-[#dfd6d4]">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
