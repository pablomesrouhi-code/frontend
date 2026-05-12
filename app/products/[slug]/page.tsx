import Image from 'next/image'
import { notFound } from 'next/navigation'
import { PRODUCTS, getProductBySlug, getProductById } from '@/lib/products'
import StarRating from '@/components/ui/StarRating'
import ProductPageClient from './ProductPageClient'
import ProductCard from '@/components/product/ProductCard'
import ProductPageImageSlot from '@/components/product/ProductPageImageSlot'

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

  /** صور أقسام إضافية على الـ PDP — حالياً رونق C فقط؛ الباقي يبقى placeholders في الأقسام الأخرى */
  const usePdpProductImages = product.id === 'rawnaq-c'

  const pdpHero =
    product.pdpHeroImage != null
      ? {
          src: product.pdpHeroImage.src,
          width: product.pdpHeroImage.width,
          height: product.pdpHeroImage.height,
          alt: product.pdpHeroImage.alt ?? product.nameAr,
        }
      : usePdpProductImages
        ? {
            src: product.coverImage,
            width: product.coverWidth,
            height: product.coverHeight,
            alt: product.nameAr,
          }
        : null

  /** قسم «لماذا تحتاجينه؟»: رونق C يعرض شبكة الصور؛ أي منتج عنده `painSectionImage` صورة خاصّة أيضاً */
  const painPdpPhoto = usePdpProductImages
    ? {
        src: product.painSectionImage?.src ?? product.coverImage,
        width: product.painSectionImage?.width ?? product.coverWidth,
        height: product.painSectionImage?.height ?? product.coverHeight,
        alt: product.painSectionImage?.alt ?? `${product.nameAr} — لماذا تحتاجينه`,
      }
    : product.painSectionImage != null
      ? {
          src: product.painSectionImage.src,
          width: product.painSectionImage.width,
          height: product.painSectionImage.height,
          alt: product.painSectionImage.alt,
        }
      : null

  const ingredientsPdpPhoto = usePdpProductImages
    ? {
        src: product.ingredientsSectionImage?.src ?? product.coverImage,
        width: product.ingredientsSectionImage?.width ?? product.coverWidth,
        height: product.ingredientsSectionImage?.height ?? product.coverHeight,
        alt: product.ingredientsSectionImage?.alt ?? `${product.nameAr} — المكونات`,
      }
    : product.ingredientsSectionImage != null
      ? {
          src: product.ingredientsSectionImage.src,
          width: product.ingredientsSectionImage.width,
          height: product.ingredientsSectionImage.height,
          alt: product.ingredientsSectionImage.alt,
        }
      : null

  return (
    <div className="bg-[#FFFFFF] min-w-0 overflow-x-hidden">
      {/* Hero */}
      <section className="bg-white py-7 sm:py-10 md:py-16 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-3 sm:px-6 min-w-0">
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 items-center min-w-0">
            <div className="order-1 md:order-2 min-w-0">
              <div className="w-full max-w-[min(100%,380px)] sm:max-w-md mx-auto md:max-w-full overflow-hidden rounded-2xl border border-gray-100 bg-white p-2 sm:p-3 shadow-sm">
                {pdpHero ? (
                  <Image
                    src={pdpHero.src}
                    alt={pdpHero.alt}
                    width={pdpHero.width}
                    height={pdpHero.height}
                    priority
                    sizes="(max-width: 640px) min(380px, 100vw), (max-width: 768px) 90vw, 500px"
                    className="h-auto w-full max-h-[min(58vh,420px)] sm:max-h-none object-contain"
                  />
                ) : (
                  <ProductPageImageSlot
                    width={product.coverWidth}
                    height={product.coverHeight}
                    accentColor={product.accentColor}
                    labelAr="مساحة صورة الهيرو — غلاف المنتج"
                    className="max-h-[min(58vh,420px)] sm:max-h-none"
                  />
                )}
              </div>
              {product.captionUnderHeroImage && (
                <p className="mt-3 px-1 text-[13px] sm:text-sm text-[#5c5656] leading-relaxed text-center md:text-right max-w-[min(100%,380px)] sm:max-w-md mx-auto md:max-w-none break-words">
                  {product.captionUnderHeroImage}
                </p>
              )}
            </div>
            <div className="order-2 md:order-1 min-w-0 max-w-full text-right break-words pt-1 md:pt-0">
              <span
                className="inline-block text-white text-xs sm:text-sm font-semibold px-3 sm:px-4 py-1.5 rounded-full mb-2 sm:mb-3 break-words text-right max-w-full"
                style={{ background: product.accentColor }}
              >
                {product.badgeAr}
              </span>
              <h1 className="text-[1.65rem] leading-snug sm:text-3xl md:text-4xl font-bold text-[#1C1C1C] mb-2 break-words">{product.nameAr}</h1>
              {product.copyAfterHeroPrice && (
                <p className="mb-3 text-[13px] sm:text-sm text-[#5c5656] leading-relaxed border-r-2 border-[#dfd6d4] pr-3 break-words">
                  {product.copyAfterHeroPrice}
                </p>
              )}
              <p className="text-[15px] sm:text-lg text-[#5c5656] mb-3 sm:mb-4 break-words">{product.heroHeadlineAr}</p>
              <div className="mb-4">
                <StarRating rating={product.rating} count={product.reviewCount} />
              </div>
              <p className="text-[#5c5656] leading-relaxed mb-4 sm:mb-6 text-[15px] sm:text-base break-words">{product.heroSubAr}</p>
              <div className="flex flex-wrap gap-2 mb-5 sm:mb-6 justify-end">
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
      <div className="bg-[#b8485c] py-2.5 sm:py-3">
        <div className="max-w-6xl mx-auto px-3 sm:px-6 flex flex-wrap justify-center gap-x-4 gap-y-2 sm:gap-6 text-white text-[11px] sm:text-sm leading-snug text-center">
          {['🛡️ دفع عند الاستلام', '✅ تأكيد قبل التوصيل', '🌿 تركيبة مدروسة', '🚚 توصيل للمملكة'].map((b) => (
            <span key={b} className="max-[380px]:basis-[44%] max-[380px]:text-center">{b}</span>
          ))}
        </div>
      </div>

      {/* Pain / Desire - alternating */}
      <section className="py-10 sm:py-12 md:py-14 bg-white">
        <div className="max-w-6xl mx-auto px-3 sm:px-6 min-w-0">
          <div className="grid md:grid-cols-2 gap-6 md:gap-10 items-center min-w-0">
            <div className="text-right min-w-0 max-w-full break-words">
              <h2 className="text-xl sm:text-2xl font-bold text-[#1C1C1C] mb-3 sm:mb-4 break-words">لماذا تحتاجينه؟</h2>
              <p className="text-[#5c5656] leading-relaxed text-base sm:text-lg break-words">{product.painCopy}</p>
            </div>
            <div className="w-full max-w-[min(100%,440px)] md:max-w-full mx-auto md:mx-0 min-w-0 overflow-hidden rounded-2xl border border-gray-100 bg-white p-2 sm:p-3">
              {painPdpPhoto ? (
                <Image
                  src={painPdpPhoto.src}
                  alt={painPdpPhoto.alt}
                  width={painPdpPhoto.width}
                  height={painPdpPhoto.height}
                  sizes="(max-width: 768px) min(440px, 100vw), 480px"
                  className="h-auto w-full max-h-[min(62vh,480px)] md:max-h-none object-contain"
                />
              ) : (
                <ProductPageImageSlot
                  width={product.painSectionImage?.width ?? product.coverWidth}
                  height={product.painSectionImage?.height ?? product.coverHeight}
                  accentColor={product.accentColor}
                  labelAr="مساحة صورة — قسم «لماذا تحتاجينه؟»"
                  className="max-h-[min(62vh,480px)] md:max-h-none"
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-10 sm:py-12 md:py-14 bg-[#fafafa] sm:bg-transparent">
        <div className="max-w-6xl mx-auto px-3 sm:px-6 min-w-0">
          <h2 className="text-xl sm:text-2xl font-bold text-[#1C1C1C] mb-6 sm:mb-8 text-center break-words px-1">الفوائد الرئيسية</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 min-w-0">
            {product.benefits.map((b) => (
              <div key={b} className="bg-white rounded-2xl p-4 sm:p-5 flex items-start gap-3 sm:gap-4 shadow-sm min-w-0 ring-1 ring-[#eae2df]/80 sm:ring-0">
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

      {/* bloc إضافي اختياري — صورة + قصة قصيرة */}
      {product.extraStory && (
        <section className="py-10 sm:py-12 md:py-14 border-t border-[#eae2df]" style={{ background: `${product.bgColor}66` }}>
          <div className="max-w-6xl mx-auto px-3 sm:px-6 min-w-0">
            <div className="grid md:grid-cols-2 gap-6 md:gap-10 items-center min-w-0">
              <div className="text-right min-w-0 max-w-full break-words">
                <p className="text-xs font-bold tracking-[0.18em] text-[#c9937e] mb-2 uppercase">لمسة إضافية</p>
                <h2 className="text-xl sm:text-2xl font-bold text-[#1C1C1C] mb-3 sm:mb-4 break-words">{product.extraStory.titleAr}</h2>
                <p className="text-[#5c5656] leading-relaxed text-base sm:text-lg break-words">{product.extraStory.bodyAr}</p>
              </div>
              <div className="w-full max-w-[min(100%,440px)] md:max-w-full mx-auto md:mx-0 min-w-0 overflow-hidden rounded-2xl border border-[#dfd6d4] bg-white p-2 sm:p-3">
                {usePdpProductImages ? (
                  <Image
                    src={product.extraStory.src}
                    alt={product.extraStory.alt}
                    width={product.extraStory.width}
                    height={product.extraStory.height}
                    sizes="(max-width: 768px) min(440px, 100vw), 480px"
                    className="h-auto w-full max-h-[min(62vh,480px)] md:max-h-none object-contain"
                  />
                ) : (
                  <ProductPageImageSlot
                    width={product.extraStory.width}
                    height={product.extraStory.height}
                    accentColor={product.accentColor}
                    labelAr="مساحة صورة — اللمسة الإضافية"
                    className="max-h-[min(62vh,480px)] md:max-h-none"
                  />
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* إقناع إضافي — بعد الشرح واللمسات؛ قبل التفصيل المكوّنات */}
      {product.persuasionBlock && (
        <section
          className="py-10 sm:py-12 md:py-14 border-t border-[#dfd6d4]"
          style={{ background: `${product.bgColor}99` }}
        >
          <div className="max-w-6xl mx-auto px-3 sm:px-6 min-w-0">
            <div className="max-w-3xl mr-0 ml-auto text-right min-w-0">
              {product.persuasionBlock.eyebrowAr && (
                <p className="text-xs font-bold tracking-[0.18em] text-[#c9937e] mb-2 uppercase">{product.persuasionBlock.eyebrowAr}</p>
              )}
              <h2 className="text-xl sm:text-2xl font-bold text-[#1C1C1C] mb-4 break-words">{product.persuasionBlock.titleAr}</h2>
              <p className="text-[#5c5656] leading-relaxed text-[15px] sm:text-lg mb-5 break-words">{product.persuasionBlock.bodyAr}</p>
              {product.persuasionBlock.bullets && product.persuasionBlock.bullets.length > 0 && (
                <ul className="flex flex-col gap-3 text-right">
                  {product.persuasionBlock.bullets.map((line) => (
                    <li
                      key={line}
                      className="flex items-start gap-3 text-[#1a1818] text-sm sm:text-base leading-relaxed min-w-0"
                    >
                      <span className="shrink-0 w-6 h-6 rounded-full text-white flex items-center justify-center text-xs font-bold mt-0.5" style={{ background: product.accentColor }}>✓</span>
                      <span className="min-w-0 flex-1 break-words">{line}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Ingredients deep dive - alternating */}
      <section className="py-10 sm:py-12 md:py-14 bg-white">
        <div className="max-w-6xl mx-auto px-3 sm:px-6 min-w-0">
          <div className="grid md:grid-cols-2 gap-6 md:gap-10 items-center min-w-0">
            <div className="w-full max-w-[min(100%,440px)] md:max-w-full mx-auto md:mx-0 min-w-0 overflow-hidden rounded-2xl border border-gray-100 bg-white p-2 sm:p-3 order-2 md:order-1">
              {ingredientsPdpPhoto ? (
                <Image
                  src={ingredientsPdpPhoto.src}
                  alt={ingredientsPdpPhoto.alt}
                  width={ingredientsPdpPhoto.width}
                  height={ingredientsPdpPhoto.height}
                  sizes="(max-width: 768px) min(440px, 100vw), 480px"
                  className="h-auto w-full max-h-[min(58vh,440px)] md:max-h-none object-contain"
                />
              ) : (
                <ProductPageImageSlot
                  width={product.ingredientsSectionImage?.width ?? product.coverWidth}
                  height={product.ingredientsSectionImage?.height ?? product.coverHeight}
                  accentColor={product.accentColor}
                  labelAr="مساحة صورة — المكوّنات / تفاصيل العبوة"
                  className="max-h-[min(58vh,440px)] md:max-h-none"
                />
              )}
            </div>
            <div className="text-right min-w-0 max-w-full break-words order-1 md:order-2">
              <h2 className="text-xl sm:text-2xl font-bold text-[#1C1C1C] mb-4 break-words">المكونات الفعّالة</h2>
              <div className="flex flex-col gap-2.5 sm:gap-3 min-w-0">
                {product.ingredients.map((ing) => (
                  <div key={ing} className="bg-[#FFFFFF] rounded-xl px-4 sm:px-5 py-3.5 sm:py-4 min-w-0 border border-[#eae2df] md:border-gray-100">
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
      <section className="py-10 sm:py-12 md:py-14">
        <div className="max-w-3xl mx-auto px-3 sm:px-6 text-center min-w-0">
          <div
            className="rounded-2xl p-5 sm:p-8 min-w-0 max-w-full break-words"
            style={{ background: product.bgColor }}
          >
            <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">🌿</div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#1C1C1C] mb-2 sm:mb-3 break-words">كيفية الاستخدام</h2>
            <p className="text-[#5c5656] leading-relaxed text-[15px] sm:text-lg break-words">{product.howToUse}</p>
          </div>
        </div>
      </section>

      {product.closingPersuasion && (
        <section
          className="py-10 sm:py-12 md:py-14 border-t border-[#eae2df] bg-white"
        >
          <div className="max-w-6xl mx-auto px-3 sm:px-6 min-w-0">
            <div className="max-w-3xl mr-0 ml-auto text-right min-w-0 rounded-2xl border border-[#dfd6d4] px-5 py-6 sm:p-8" style={{ background: `${product.bgColor}aa` }}>
              {product.closingPersuasion.eyebrowAr && (
                <p className="text-xs font-bold tracking-[0.18em] text-[#c9937e] mb-2 uppercase">{product.closingPersuasion.eyebrowAr}</p>
              )}
              <h2 className="text-xl sm:text-2xl font-bold text-[#1C1C1C] mb-4 break-words">{product.closingPersuasion.titleAr}</h2>
              <p className="text-[#5c5656] leading-relaxed text-[15px] sm:text-lg mb-5 break-words">{product.closingPersuasion.bodyAr}</p>
              {product.closingPersuasion.bullets && product.closingPersuasion.bullets.length > 0 && (
                <ul className="flex flex-col gap-3 text-right">
                  {product.closingPersuasion.bullets.map((line) => (
                    <li
                      key={line}
                      className="flex items-start gap-3 text-[#1a1818] text-sm sm:text-base leading-relaxed min-w-0"
                    >
                      <span className="shrink-0 w-6 h-6 rounded-full text-white flex items-center justify-center text-xs font-bold mt-0.5" style={{ background: product.accentColor }}>★</span>
                      <span className="min-w-0 flex-1 break-words">{line}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Reviews */}
      <section className="py-10 sm:py-12 md:py-14 bg-white">
        <div className="max-w-6xl mx-auto px-3 sm:px-6 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-8 min-w-0">
            <h2 className="text-xl sm:text-2xl font-bold text-[#1C1C1C] break-words text-right">تقييمات العملاء</h2>
            <StarRating rating={product.rating} count={product.reviewCount} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 min-w-0">
            {product.reviews.map((r, idx) => (
              <div key={`${product.id}-r-${idx}`} className="bg-[#FFFFFF] rounded-2xl p-4 sm:p-5 min-w-0 break-words border border-[#eae2df]/90">
                <StarRating rating={r.rating} size="sm" />
                <p className="text-[#1C1C1C] mt-3 leading-relaxed break-words">&ldquo;{r.text}&rdquo;</p>
                <p className="text-sm font-semibold text-[#5c5656] mt-3 break-words">— {r.name}</p>
              </div>
            ))}
          </div>
          {product.afterReviewsBanner && (
            <div
              className="mt-8 sm:mt-10 rounded-2xl border px-5 py-5 sm:p-6 text-right min-w-0"
              style={{ borderColor: `${product.accentColor}44`, background: `${product.bgColor}b3` }}
            >
              {product.afterReviewsBanner.titleAr && (
                <h3 className="font-bold text-lg sm:text-xl text-[#1C1C1C] mb-2 break-words">{product.afterReviewsBanner.titleAr}</h3>
              )}
              <p className="text-sm sm:text-base text-[#5c5656] leading-relaxed break-words">{product.afterReviewsBanner.bodyAr}</p>
            </div>
          )}
        </div>
      </section>

      {/* Cross-sells */}
      {crossSellProducts.length > 0 && (
        <section className="py-10 sm:py-12 md:py-14">
          <div className="max-w-6xl mx-auto px-3 sm:px-6 min-w-0">
            <h2 className="text-2xl font-bold text-[#1C1C1C] mb-3 text-center break-words px-1">
              أكملي روتينك على خطّة واضحة — كما تختارين على رفّ المكمّل
            </h2>
            <p className="text-[#5c5656] text-center mb-8 break-words px-1">
              كل علكة لهدف منفصل؛ التركيبات تكمّل بعضها بحسب يومكِ لا بإعلان واحد عن «حبة سحرية»
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
              {crossSellProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="py-10 sm:py-12 md:py-14 bg-white">
        <div className="max-w-3xl mx-auto px-3 sm:px-6 min-w-0">
          <h2 className="text-xl sm:text-2xl font-bold text-[#1C1C1C] mb-6 sm:mb-8 text-center break-words">أسئلة شائعة</h2>
          <div className="flex flex-col gap-2.5 sm:gap-3 min-w-0">
            {product.faqs.map((faq) => (
              <details key={faq.q} className="bg-[#FFFFFF] rounded-2xl overflow-hidden group min-w-0 border border-[#dfd6d4]">
                <summary className="px-4 sm:px-6 py-4 min-h-[3.25rem] font-semibold text-[#1C1C1C] text-sm sm:text-base cursor-pointer list-none flex items-center justify-between gap-3 active:bg-[#f5f0ef] hover:bg-[#eae2df] transition min-w-0 touch-manipulation">
                  <span className="text-right flex-1 min-w-0 break-words leading-snug">{faq.q}</span>
                  <span className="text-[#b8485c] shrink-0 group-open:rotate-180 transition-transform duration-200 text-xs sm:text-sm">▼</span>
                </summary>
                <div className="px-4 sm:px-6 pb-4 pt-1 text-sm text-[#5c5656] leading-relaxed break-words text-right border-t border-[#dfd6d4]">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
