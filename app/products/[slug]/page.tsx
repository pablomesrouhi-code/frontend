import Image from 'next/image'
import { notFound } from 'next/navigation'
import { PRODUCTS, getProductBySlug, getProductById } from '@/lib/products'
import StarRating from '@/components/ui/StarRating'
import ProductPageClient from './ProductPageClient'
import ProductCard from '@/components/product/ProductCard'
import ProductPageImageSlot from '@/components/product/ProductPageImageSlot'
import ProductStickyCta from '@/components/product/ProductStickyCta'

function reviewInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  const a = parts[0]?.[0] ?? '?'
  const b = parts[1]?.[0] ?? ''
  return (a + b).toUpperCase()
}

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
              <div className="w-full max-w-[min(100%,380px)] sm:max-w-md mx-auto md:max-w-none overflow-hidden rounded-2xl border border-gray-100 bg-white p-2 sm:p-3 shadow-sm lg:min-h-[min(480px,52vh)] lg:flex lg:items-center">
                {pdpHero ? (
                  <Image
                    src={pdpHero.src}
                    alt={pdpHero.alt}
                    width={pdpHero.width}
                    height={pdpHero.height}
                    priority
                    sizes="(max-width: 640px) min(380px, 100vw), (max-width: 768px) 90vw, 500px"
                    className="h-auto w-full max-h-[min(58vh,420px)] object-contain sm:max-h-none md:max-h-[min(70vh,560px)] lg:max-h-none"
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
                className="mb-2 inline-block max-w-full break-words rounded-full px-3 py-1.5 text-right text-xs font-semibold text-white sm:mb-3 sm:px-4 sm:text-sm"
                style={{ background: product.accentColor }}
              >
                {product.badgeAr}
              </span>

              <p
                id="pdp-hook"
                className="scroll-mt-[calc(5.5rem+env(safe-area-inset-top))] text-[1.25rem] font-black leading-snug text-charcoal sm:text-2xl md:text-[1.65rem] md:leading-snug"
              >
                {product.heroHeadlineAr}
              </p>

              <h1 className="mb-2 mt-2 break-words text-2xl font-bold leading-tight text-charcoal sm:text-3xl md:text-4xl">{product.nameAr}</h1>

              {product.copyAfterHeroPrice && (
                <p className="mb-3 break-words border-r-2 border-border pr-3 text-[13px] leading-relaxed text-muted sm:text-sm">
                  {product.copyAfterHeroPrice}
                </p>
              )}

              <div className="mb-3 sm:mb-4">
                <StarRating rating={product.rating} count={product.reviewCount} />
              </div>

              <p className="mb-4 break-words text-[15px] leading-relaxed text-muted sm:mb-6 sm:text-base">{product.heroSubAr}</p>

              <p className="mb-2 text-xs font-bold text-authority">خلاصة تركيبية</p>
              <div className="mb-4 flex flex-wrap items-center justify-end gap-2">
                {product.ingredients.slice(0, 3).map((ing) => (
                  <span
                    key={ing}
                    className="max-w-full break-words rounded-full border border-border bg-white px-3 py-1 text-sm text-muted"
                  >
                    {ing}
                  </span>
                ))}
                {product.ingredients.length > 3 && (
                  <a
                    href="#pdp-ingredients"
                    className="rounded-full border border-dashed border-authority/45 bg-authority/[0.06] px-3 py-1 text-xs font-bold text-authority hover:bg-authority/10"
                  >
                    + المكوّنات كاملة
                  </a>
                )}
              </div>

              <div id="pdp-buy-anchor" className="scroll-mt-[calc(4.5rem+env(safe-area-inset-top))]">
                <ProductPageClient product={product} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <div className="bg-gradient-to-l from-primary to-primary-dark py-3 sm:py-3.5">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-6 gap-y-2 px-3 text-center text-[11px] font-semibold leading-snug text-white sm:gap-8 sm:text-sm">
          <span className="max-[380px]:basis-[48%]">🛡️ دفع عند الاستلام</span>
          <span className="max-[380px]:basis-[48%]">🚚 شحن سريع لجميع المناطق</span>
          <span className="max-[380px]:basis-[48%]">📞 تأكيد هاتفي قبل الشحن</span>
          <span className="max-[380px]:basis-[48%]">↩️ ضمان ذهبي 30 يوم — استرجاع كامل حسب السياسة</span>
        </div>
      </div>

      {/* Pain / Desire - alternating */}
      <section className="bg-white py-10 sm:py-12 md:py-16">
        <div className="mx-auto max-w-6xl min-w-0 px-3 sm:px-6">
          <h2 className="mb-8 text-center text-xl font-black text-charcoal sm:mb-10 sm:text-2xl md:text-start">
            وش تغيّر مع روتين واضح؟
          </h2>

          <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-10">
            <div className="order-2 space-y-5 text-right lg:order-2 lg:col-span-5">
              <div className="rounded-3xl border border-primary/25 bg-peach-soft/50 p-5 shadow-sm ring-1 ring-black/[0.03] sm:p-6">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">اليوميات</p>
                <h3 className="mt-2 text-lg font-black text-charcoal sm:text-xl">لماذا يهمّ هذا المنتج؟</h3>
                <p className="mt-3 text-base leading-relaxed text-muted">{product.painCopy}</p>
              </div>
              <div className="rounded-3xl border border-authority/30 bg-authority/[0.05] p-5 shadow-sm sm:p-6">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-authority">ضمن سلطة المكمّل</p>
                <h3 className="mt-2 text-lg font-black text-charcoal sm:text-xl">كيف يدعم خطتك اليومية؟</h3>
                <ul className="mt-4 flex flex-col gap-3">
                  {product.benefits.slice(0, 4).map((b) => (
                    <li key={b} className="flex items-start gap-3 rounded-2xl bg-white px-4 py-3 ring-1 ring-border/70">
                      <span
                        className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-black text-white"
                        style={{ background: product.accentColor }}
                      >
                        ✓
                      </span>
                      <span className="min-w-0 flex-1 text-[15px] leading-relaxed text-charcoal">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="order-1 lg:order-1 lg:col-span-7">
              <div className="mx-auto max-w-xl overflow-hidden rounded-3xl border border-border bg-white p-2 shadow-md md:mx-0 lg:max-w-none lg:min-h-[min(520px,58vh)]">
                {painPdpPhoto ? (
                  <Image
                    src={painPdpPhoto.src}
                    alt={painPdpPhoto.alt}
                    width={painPdpPhoto.width}
                    height={painPdpPhoto.height}
                    sizes="(max-width:1024px) min(560px, 100vw), 56vw"
                    className="h-auto max-h-[min(64vh,520px)] w-full rounded-2xl object-cover object-center lg:h-full lg:max-h-none lg:min-h-[420px]"
                  />
                ) : (
                  <ProductPageImageSlot
                    width={product.painSectionImage?.width ?? product.coverWidth}
                    height={product.painSectionImage?.height ?? product.coverHeight}
                    accentColor={product.accentColor}
                    labelAr="مساحة صورة — قسم «لماذا تحتاجينه؟»"
                    className="max-h-[min(64vh,520px)] lg:min-h-[420px]"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      {product.benefits.length > 4 ? (
      <section className="border-t border-border bg-peach-soft/20 py-10 sm:py-12 md:py-14">
        <div className="mx-auto max-w-6xl min-w-0 px-3 sm:px-6">
          <h2 className="mb-6 text-center text-xl font-black text-charcoal sm:text-2xl">تكميلات لفهم أوسع للفائدة اليومية</h2>
          <div className="mx-auto grid max-w-3xl grid-cols-1 gap-3 sm:gap-4">
            {product.benefits.slice(4).map((b) => (
              <div
                key={b}
                className="flex min-w-0 items-start gap-3 rounded-2xl bg-white px-5 py-4 shadow-sm ring-1 ring-border/80"
              >
                <div
                  className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-black text-white"
                  style={{ background: product.accentColor }}
                >
                  ✓
                </div>
                <p className="min-w-0 flex-1 text-right leading-relaxed text-charcoal">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      ) : null}

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
      <section id="pdp-ingredients" className="scroll-mt-28 bg-white py-10 sm:py-12 md:py-16">
        <div className="mx-auto max-w-6xl min-w-0 px-3 sm:px-6">
          <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="order-2 min-w-0 overflow-hidden rounded-3xl border border-border bg-white p-2 shadow-sm lg:order-1 lg:col-span-7">
              {ingredientsPdpPhoto ? (
                <Image
                  src={ingredientsPdpPhoto.src}
                  alt={ingredientsPdpPhoto.alt}
                  width={ingredientsPdpPhoto.width}
                  height={ingredientsPdpPhoto.height}
                  sizes="(max-width:1024px) min(560px, 100vw), 58vw"
                  className="h-auto max-h-[min(58vh,440px)] w-full rounded-2xl object-cover object-center lg:max-h-none lg:min-h-[440px]"
                />
              ) : (
                <ProductPageImageSlot
                  width={product.ingredientsSectionImage?.width ?? product.coverWidth}
                  height={product.ingredientsSectionImage?.height ?? product.coverHeight}
                  accentColor={product.accentColor}
                  labelAr="مساحة صورة — المكوّنات / تفاصيل العبوة"
                  className="max-h-[min(58vh,440px)] lg:min-h-[440px]"
                />
              )}
            </div>
            <div className="order-1 min-w-0 max-w-full break-words text-right lg:order-2 lg:col-span-5">
              <h2 className="mb-2 text-xl font-black text-charcoal sm:text-2xl">المكوّنات واللسان العلمي</h2>
              <p className="mb-6 text-sm leading-relaxed text-muted">
                تفاصيل وفق تصنيف «مكمّل غذائي» — كل بند أسفله إشارة داعمة وفق المتعارف؛ النتيجة اليومية تختلف بحسب الشخص والالتزام بالروتين.
              </p>
              <div className="flex flex-col gap-3 sm:gap-4">
                {product.ingredients.map((ing) => (
                  <div
                    key={ing}
                    className="min-w-0 rounded-2xl border border-border bg-[#fdfcfc] px-5 py-4 shadow-[0_1px_8px_rgba(28,28,28,0.04)] md:border-charcoal/[0.06]"
                  >
                    <p className="text-base font-black text-charcoal">{ing}</p>
                    <p className="mt-2 border-t border-border/80 pt-2 text-sm leading-relaxed text-muted">
                      {ing === 'كولاجين' &&
                        'بروتين هيكلي يدعم بنية الجلد الشعر والأظافر ضمن نظام متكامل ومتوازن — حسب احتياج المنظومات الطبيعية.'}
                      {ing === 'فيتامين C' && 'يثبّت وظيفة الغذائية المعتادة ويدعم امتصاص الكولاجين كجزء من روتين داخلي منتظم.'}
                      {ing === 'بروبيوتيك' && 'بكتيريا نافعة تدعم التوازن الطبيعي للجهاز الهضمي وفق منتج هذا التصنيف.'}
                      {ing === 'ألياف' && 'تدعم حركة الهضم الطبيعية وإحساس الخفة بعد الوجبات ضمن نمط غذائي متوازن.'}
                      {ing === 'مغنيسيوم' &&
                        'معدن يدعم مسارات الاسترخاء والجهاز العصبي مع تناول مناسب حسب تعليمات العبوة المعتمدة.'}
                      {ing === 'L-Theanine' && 'من مصادر طبيعية معروفة؛ يُستخدم في سياق دعم الاسترخاء ضمن المنتج كمكمّل غذائي.'}
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
            <h2 className="break-words text-xl font-black text-charcoal sm:text-2xl">كيفية الاستخدام</h2>
            <p className="mt-4 break-words text-[15px] leading-relaxed text-muted sm:text-lg">{product.howToUse}</p>
            <p className="mt-4 rounded-2xl bg-white/60 px-4 py-3 text-sm leading-relaxed text-charcoal ring-1 ring-black/[0.04]">
              <strong className="text-authority">التزام الأسابيع الأولى يفرق؛</strong> كثير عميلات يلاحظن أن الروتين يصبح «تلقائيًا» قبل أن يكتمل شهر — والنتيجة المرئية أو الإحساسية{' '}
              <strong className="text-charcoal">تختلف</strong> حسب الشخص والنوم والتغذية. التزموا تعليمات العبوة المعتمدة.
            </p>
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
      <section className="overflow-x-hidden bg-peach-soft/15 py-10 sm:py-12 md:py-16">
        <div className="mx-auto max-w-6xl min-w-0 px-3 sm:px-6">
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="text-right">
              <h2 className="text-xl font-black text-charcoal sm:text-2xl">مراجعات عميلات</h2>
              <p className="mt-1 text-sm text-muted">تقييمات إرشادية — النتيجة شخصية ولها علاقة بالالتزام بالروتين</p>
            </div>
            <div className="shrink-0 self-end sm:self-center">
              <StarRating rating={product.rating} count={product.reviewCount} />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2">
            {product.reviews.map((r, idx) => (
              <article
                key={`${product.id}-r-${idx}`}
                className="flex min-w-0 flex-col gap-4 rounded-3xl border border-border bg-white p-5 shadow-sm ring-1 ring-black/[0.02] sm:flex-row sm:p-6"
              >
                <div className="flex shrink-0 flex-row items-center gap-4 border-b border-border pb-4 sm:w-52 sm:flex-col sm:border-b-0 sm:border-s sm:pb-0 sm:ps-6 md:w-56">
                  <div
                    className="flex h-[4.25rem] w-[4.25rem] shrink-0 items-center justify-center rounded-2xl text-lg font-black text-white shadow-inner sm:h-24 sm:w-24 sm:text-2xl"
                    style={{ background: product.accentColor }}
                    aria-hidden
                  >
                    {reviewInitials(r.name)}
                  </div>
                  <div className="min-w-0 flex-1 text-right sm:flex-none sm:w-full">
                    <StarRating rating={r.rating} size="sm" />
                    <p className="mt-2 font-black text-charcoal">{r.name}</p>
                  </div>
                </div>
                <blockquote className="min-w-0 flex-1 text-[15px] leading-relaxed text-charcoal">
                  «{r.text}»
                </blockquote>
              </article>
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

      <ProductStickyCta
        product={{
          id: product.id,
          nameAr: product.nameAr,
          accentColor: product.accentColor,
          bgColor: product.bgColor,
        }}
      />
    </div>
  )
}
