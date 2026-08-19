import { notFound } from 'next/navigation'
import { PRODUCTS, getProductBySlug, getProductById, getFormatLabelAr, isPowderProduct } from '@/lib/products'
import { getPdpSectionHeadlines } from '@/lib/pdp-section-headlines'
import { getPdpHeroStats } from '@/lib/pdp-hero-stats'
import StarRating from '@/components/ui/StarRating'
import ProductPageClient from './ProductPageClient'
import ProductCard from '@/components/product/ProductCard'
import ProductPageImageSlot from '@/components/product/ProductPageImageSlot'
import PdpSquareImage from '@/components/product/PdpSquareImage'
import PdpDeliveryPaymentSection from '@/components/product/PdpDeliveryPaymentSection'
import PdpReviewsSection from '@/components/product/PdpReviewsSection'
import PowderPlaceholder from '@/components/product/PowderPlaceholder'
import PdpHeroStatPills from '@/components/product/pdp/PdpHeroStatPills'
import PdpBottomOfferCta from '@/components/product/PdpBottomOfferCta'
import PdpRoutineNote from '@/components/product/PdpRoutineNote'
import { getPdpAddCta, getPdpComplianceNote } from '@/lib/pdp-copy'
import { STORE_BUTTON_COLOR } from '@/lib/product-accent'

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

  const isPowder = isPowderProduct(product)
  const heroStats = getPdpHeroStats(product)

  const crossSellProducts = product.crossSells
    .map((id) => getProductById(id))
    .filter(Boolean) as typeof PRODUCTS

  const complianceNote = getPdpComplianceNote(product.format)
  const accent = STORE_BUTTON_COLOR

  const pdpHeroSrc = product.pdpHeroImage?.src ?? product.coverImage
  const pdpHeroAlt = product.pdpHeroImage?.alt ?? product.nameAr
  const pdpHeroWidth = product.pdpHeroImage?.width ?? product.coverWidth
  const pdpHeroHeight = product.pdpHeroImage?.height ?? product.coverHeight

  const painPdpPhoto = product.painSectionImage
    ? {
        src: product.painSectionImage.src,
        alt: product.painSectionImage.alt,
        width: product.painSectionImage.width,
        height: product.painSectionImage.height,
      }
    : null

  const ingredientsPdpPhoto = product.ingredientsSectionImage
    ? {
        src: product.ingredientsSectionImage.src,
        alt: product.ingredientsSectionImage.alt,
        width: product.ingredientsSectionImage.width,
        height: product.ingredientsSectionImage.height,
      }
    : null

  const powderHeroPhoto = isPowder && product.pdpHeroImage

  const sh = getPdpSectionHeadlines(product.id)
  const painH = sh.pain ?? {}
  const ingH = sh.ingredients ?? {}
  const routineH = sh.routine ?? {}
  const infoH = sh.infoSheets ?? {}
  const faqH = sh.faq ?? {}
  const closeH = sh.closingOffer ?? {}

  return (
    <div className="bg-[#FFFFFF] min-w-0 overflow-x-hidden pb-[calc(3.75rem+env(safe-area-inset-bottom,0px))]">
      {/* Hero — خلفية ملوّنة، عرض واضح، أول سطر جذّاب */}
      <section
        className="relative min-w-0 overflow-hidden border-b border-white/50 py-5 sm:py-7 md:py-10"
        style={{
          background: `linear-gradient(168deg, #ffffff 0%, color-mix(in srgb, ${product.bgColor} 72%, #fff) 38%, color-mix(in srgb, ${accent} 9%, #fff) 100%)`,
        }}
      >
        <div
          className="pointer-events-none absolute -top-28 -end-20 h-72 w-72 rounded-full opacity-[0.18] blur-3xl sm:h-96 sm:w-96"
          style={{ background: accent }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-24 -start-16 h-64 w-64 rounded-full opacity-[0.12] blur-3xl"
          style={{ background: accent }}
          aria-hidden
        />
        <div className="relative z-[1] mx-auto max-w-6xl min-w-0 px-4 sm:px-6">
          {/* موبايل: صورة فوق؛ ديسكتوب: صورة بجانب النص (كالسابق) */}
          <div className="grid min-w-0 grid-cols-1 items-start gap-5 sm:gap-6 md:grid-cols-2 md:items-start md:gap-8 lg:gap-10">
            <div className="order-1 min-w-0 md:order-2 md:pt-0">
              <div
                className="mx-auto w-full max-w-md rounded-2xl border-2 bg-white/95 p-1.5 shadow-lg backdrop-blur-sm sm:max-w-lg sm:rounded-3xl sm:p-2 md:mx-0 md:max-w-none"
                style={{ borderColor: `color-mix(in srgb, ${accent} 30%, #e8e0de)` }}
              >
                {isPowder && !powderHeroPhoto ? (
                  <div className="relative aspect-square min-h-[300px]">
                    <PowderPlaceholder product={product} size="hero" />
                  </div>
                ) : (
                  <PdpSquareImage
                    src={pdpHeroSrc}
                    alt={pdpHeroAlt}
                    width={pdpHeroWidth}
                    height={pdpHeroHeight}
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 560px"
                    maxWidthClass="max-w-[min(100%,520px)]"
                  />
                )}
              </div>
              {product.captionUnderHeroImage && (
                <p className="mx-auto mt-2 max-w-xl break-words text-center text-[11px] leading-snug text-charcoal sm:mt-3 sm:text-xs md:mx-0 md:text-start">
                  {product.captionUnderHeroImage}
                </p>
              )}
            </div>
            <div className="order-2 min-w-0 text-pretty break-words text-start md:order-1 md:max-w-xl lg:max-w-none">
              <p className="mb-3 text-center text-[11px] font-bold text-[#146b70] sm:text-xs md:text-start">
                مكمّلات غذائية مرخّصة من هيئة الغذاء والدواء (SFDA)
              </p>

              <PdpHeroStatPills stats={heroStats} accentColor={accent} />

              <h1
                id="pdp-hook"
                className="scroll-mt-[calc(5.5rem+env(safe-area-inset-top))] mb-3 text-[2.05rem] font-black leading-[1.1] tracking-tight text-charcoal sm:text-[2.6rem] sm:leading-[1.08] md:text-[3.05rem] md:leading-[1.06]"
              >
                {product.heroHeadlineAr}
              </h1>

              <p className="mb-3 text-base font-semibold leading-relaxed text-charcoal sm:text-lg">{product.heroSubAr}</p>
              {product.painCopy && (
                <p className="mb-3 text-sm leading-relaxed text-charcoal/85 sm:text-[15px]">{product.painCopy}</p>
              )}
              {product.howToUse && (
                <p className="mb-3 text-sm leading-relaxed text-muted sm:text-[15px]">
                  <span className="font-black text-charcoal">طريقة الاستعمال: </span>
                  {product.howToUse}
                </p>
              )}
              {product.benefits.length > 0 && (
                <ul className="mb-4 list-none space-y-1.5 text-sm leading-relaxed text-charcoal sm:text-[15px]">
                  {product.benefits.slice(0, 4).map((line) => (
                    <li key={line} className="flex gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: accent }} />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              )}
              {product.copyAfterHeroPrice && (
                <p className="mb-4 text-sm font-semibold leading-relaxed text-charcoal sm:text-[15px]">
                  {product.copyAfterHeroPrice}
                </p>
              )}

              <div className="mb-4 flex flex-wrap items-center justify-end gap-2.5">
                <span
                  className="inline-flex items-center gap-2 rounded-full border bg-white px-3.5 py-1.5 shadow-sm"
                  style={{ borderColor: `${accent}33` }}
                >
                  <StarRating rating={product.rating} size="md" accentColor={accent} />
                  <span className="text-[11px] font-semibold text-muted">
                    · {product.reviewCount.toLocaleString('en-US')} تقييم موثّق
                  </span>
                </span>
              </div>

              <div className="mb-4 flex flex-wrap items-center justify-end gap-2">
                <span
                  className="inline-flex rounded-full px-3 py-1 text-[10px] font-bold text-white sm:text-xs"
                  style={{ background: accent }}
                >
                  {getFormatLabelAr(product)}
                </span>
                <span
                  className="inline-flex max-w-full items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-black text-white sm:text-xs"
                  style={{
                    background: `linear-gradient(120deg, ${accent} 0%, color-mix(in srgb, ${accent} 65%, #1a1a1a) 100%)`,
                  }}
                >
                  {product.badgeAr}
                </span>
                {product.isNew && (
                  <span className="inline-flex rounded-full bg-charcoal px-3 py-1 text-[10px] font-black text-white sm:text-xs">
                    جديد
                  </span>
                )}
              </div>

              <p className="mb-1 text-lg font-black text-charcoal sm:text-xl">{product.nameAr}</p>
              <p className="mb-4 text-xs leading-relaxed text-muted sm:text-sm">{product.subtitleAr}</p>

              <p className="mb-1.5 text-[10px] font-black uppercase tracking-[0.16em]" style={{ color: accent }}>
                خلاصة تركيبية
              </p>
              <div className="mb-4 flex flex-wrap items-center justify-end gap-1.5 sm:gap-2">
                {product.ingredients.slice(0, 3).map((ing) => (
                  <span
                    key={ing}
                    className="max-w-full break-words rounded-full px-3 py-1 text-xs font-bold text-white shadow-sm sm:px-3.5 sm:py-1.5 sm:text-sm"
                    style={{
                      background: `linear-gradient(135deg, ${accent} 0%, color-mix(in srgb, ${accent} 70%, #1a1012) 100%)`,
                      boxShadow: `0 4px 14px -4px ${accent}66`,
                    }}
                  >
                    {ing}
                  </span>
                ))}
                {product.ingredients.length > 3 && (
                  <a
                    href="#pdp-ingredients"
                    className="rounded-full border-2 px-3 py-1 text-xs font-black"
                    style={{ borderColor: accent, background: `${accent}12`, color: accent }}
                  >
                    + المكوّنات كاملة
                  </a>
                )}
              </div>

              <div id="pdp-buy-anchor" className="scroll-mt-[calc(4.5rem+env(safe-area-inset-top))]">
                <div className="mb-3">
                  <PdpRoutineNote productId={product.id} format={product.format} accentColor={accent} />
                </div>
                <ProductPageClient
                  product={product}
                  addToCartLabel={getPdpAddCta(product.id)}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <div
        className="relative overflow-hidden border-b border-white/10 py-3.5 sm:py-4"
        style={{
          background: `linear-gradient(95deg, ${accent} 0%, color-mix(in srgb, ${accent} 55%, #1a1012) 100%)`,
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(ellipse 80% 120% at 100% 50%, #fff 0%, transparent 55%)`,
          }}
          aria-hidden
        />
        <div className="relative mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-5 gap-y-2.5 px-3 text-center text-[11px] font-bold leading-snug text-white/95 drop-shadow-sm sm:gap-x-8 sm:text-sm">
          <span className="max-[380px]:basis-[48%]">🛡️ دفع عند الاستلام</span>
          <span className="max-[380px]:basis-[48%]">🚚 شحن لجميع المناطق</span>
          <span className="max-[380px]:basis-[48%]">📞 تأكيد هاتفي قبل الشحن</span>
          <a
            href="/returns-refunds"
            className="max-[380px]:basis-[48%] text-white/95 underline decoration-white/40 underline-offset-2 transition hover:text-white hover:decoration-white"
          >
            ↩️ ضمان 30 يوم — حسب السياسة
          </a>
        </div>
      </div>

      <p
        className="border-b border-border py-3 text-center text-[11px] font-semibold leading-relaxed text-charcoal sm:py-3.5 sm:text-sm"
        style={{ background: `linear-gradient(to left, ${product.bgColor}88, #fff, ${accent}0d)` }}
      >
        <span className="text-charcoal/80">نفس رحلة عميلات قبلك:</span> إعلان → صفحة → طلب → تأكيد → توصيل.{' '}
        <strong className="font-bold text-charcoal">التفاصيل الدقيّة على الغلاف</strong>
        <span className="text-charcoal/80"> — وقرّري براحتك.</span>
      </p>

      {/* Pain / Desire - alternating */}
      <section
        className="border-b border-border/70 py-10 sm:py-12 md:py-16"
        style={{
          background: `linear-gradient(180deg, #fff 0%, color-mix(in srgb, ${product.bgColor} 35%, #fff) 100%)`,
        }}
      >
        <div className="mx-auto max-w-6xl min-w-0 px-3 sm:px-6">
          <div className="mx-auto mb-8 max-w-3xl text-center md:mx-0 md:max-w-none md:text-start">
            <p className="mb-2 inline-block rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-white sm:text-xs" style={{ background: accent }}>
              {painH.eyebrowAr ?? 'هل هذا يشبه يومكِ؟'}
            </p>
            <h2 className="mt-2 text-xl font-black leading-snug text-charcoal sm:text-2xl md:text-3xl">
              {painH.titleAr ?? 'المشكلة مو نقص منتجات — نقص روتين واحد يثبت'}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-charcoal sm:text-base">
              {painH.subtitleAr ??
                'وصلتِ من الإعلان وتبغين تفاصيل واضحة قبل الطلب: وش يفيدك المكمّل، كيف تستخدمينه، وكيف نوصّل ونؤكّد معاكِ — بلا مبالغة ولا وعود طبية.'}
            </p>
          </div>

          <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-10">
            <div className="order-2 space-y-5 text-start lg:order-2 lg:col-span-5">
              <div className="rounded-3xl border p-5 shadow-sm ring-1 ring-black/[0.03] sm:p-6" style={{ borderColor: `${accent}44`, background: `${accent}0a` }}>
                <p className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: accent }}>{painH.feelTitleAr ?? 'تعرفين هذا الإحساس؟'}</p>
                <h3 className="mt-2 text-lg font-black text-charcoal sm:text-xl">{painH.whyTitleAr ?? 'ليش يختارونه أصلاً؟'}</h3>
                <p className="mt-3 text-[15px] leading-loose text-charcoal">{product.painCopy}</p>
              </div>
              <div className="rounded-3xl border p-5 shadow-sm sm:p-6" style={{ borderColor: `${accent}44`, background: `${accent}08` }}>
                <p className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: accent }}>بأسلوب واقعي</p>
                <h3 className="mt-2 text-lg font-black text-charcoal sm:text-xl">{painH.desireTitleAr ?? 'وش يقدر يكمّل روتينك؟'}</h3>
                <ul className="mt-4 flex flex-col gap-3">
                  {product.benefits.slice(0, 4).map((b) => (
                    <li key={b} className="flex items-start gap-3 rounded-2xl bg-white px-4 py-3 ring-1 ring-border/70">
                      <span
                        className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-black text-white"
                        style={{ background: accent }}
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
              <div className="mx-auto max-w-xl md:mx-0 lg:max-w-none">
                {painPdpPhoto ? (
                  <PdpSquareImage
                    src={painPdpPhoto.src}
                    alt={painPdpPhoto.alt}
                    width={painPdpPhoto.width}
                    height={painPdpPhoto.height}
                    sizes="(max-width:1024px) min(560px, 100vw), 56vw"
                    maxWidthClass="max-w-full"
                  />
                ) : isPowder ? (
                  <div className="relative min-h-[320px]">
                    <PowderPlaceholder product={product} size="section" />
                  </div>
                ) : (
                  <ProductPageImageSlot
                    width={product.coverWidth}
                    height={product.coverHeight}
                    accentColor={accent}
                    labelAr="مساحة صورة — قسم «لماذا تحتاجينه؟»"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      {product.benefits.length > 4 ? (
      <section className="border-t border-border py-10 sm:py-12 md:py-14" style={{ background: `${product.bgColor}55` }}>
        <div className="mx-auto max-w-6xl min-w-0 px-3 sm:px-6">
          <h2 className="mb-2 text-center text-xl font-black text-charcoal sm:text-2xl">مزايا إضافية بلا تضليل</h2>
          <p className="mx-auto mb-8 max-w-2xl text-center text-sm text-charcoal">
            نقاط تكمّل اللي قبل؛ مو وعود علاج وبلا ادّعاء واحد للجميع.
          </p>
          <div className="mx-auto grid max-w-3xl grid-cols-1 gap-3 sm:gap-4">
            {product.benefits.slice(4).map((b) => (
              <div
                key={b}
                className="flex min-w-0 items-start gap-3 rounded-2xl bg-white px-5 py-4 shadow-sm ring-1 ring-border/80"
              >
                <div
                  className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-black text-white"
                  style={{ background: accent }}
                >
                  ✓
                </div>
                <p className="min-w-0 flex-1 text-start leading-relaxed text-charcoal">{b}</p>
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
              <div className="text-start min-w-0 max-w-full break-words">
                <p className="text-xs font-bold tracking-[0.18em] text-[#c9937e] mb-2 uppercase">لمسة إضافية</p>
                <h2 className="text-xl sm:text-2xl font-bold text-[#1C1C1C] mb-3 sm:mb-4 break-words">{product.extraStory.titleAr}</h2>
                <p className="text-charcoal leading-loose text-[15px] break-words max-w-prose">{product.extraStory.bodyAr}</p>
              </div>
              <div className="w-full max-w-[min(100%,440px)] md:max-w-full mx-auto md:mx-0 min-w-0">
                <PdpSquareImage
                  src={product.extraStory.src}
                  alt={product.extraStory.alt}
                  width={product.extraStory.width}
                  height={product.extraStory.height}
                  sizes="(max-width: 768px) min(440px, 100vw), 480px"
                  maxWidthClass="max-w-full"
                />
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
            <div
              className={
                product.persuasionBlock.sectionImage
                  ? 'grid md:grid-cols-2 gap-6 md:gap-10 items-center min-w-0'
                  : 'max-w-3xl mr-0 ml-auto text-start min-w-0'
              }
            >
              {product.persuasionBlock.sectionImage && (
                <div className="order-2 md:order-2 w-full max-w-[min(100%,440px)] md:max-w-full mx-auto md:mx-0 min-w-0">
                  <PdpSquareImage
                    src={product.persuasionBlock.sectionImage.src}
                    alt={product.persuasionBlock.sectionImage.alt}
                    width={product.persuasionBlock.sectionImage.width}
                    height={product.persuasionBlock.sectionImage.height}
                    sizes="(max-width: 768px) min(440px, 100vw), 480px"
                    maxWidthClass="max-w-full"
                  />
                </div>
              )}
              <div className="order-1 md:order-1 text-start min-w-0 max-w-full break-words">
                {product.persuasionBlock.eyebrowAr && (
                  <p className="text-xs font-bold tracking-[0.18em] text-[#c9937e] mb-2 uppercase">{product.persuasionBlock.eyebrowAr}</p>
                )}
                <h2 className="text-xl sm:text-2xl font-bold text-[#1C1C1C] mb-4 break-words">{product.persuasionBlock.titleAr}</h2>
                <p className="text-charcoal leading-loose text-[15px] mb-5 break-words max-w-prose">{product.persuasionBlock.bodyAr}</p>
                {product.persuasionBlock.bullets && product.persuasionBlock.bullets.length > 0 && (
                  <ul className="flex flex-col gap-3 text-start">
                    {product.persuasionBlock.bullets.map((line) => (
                      <li
                        key={line}
                        className="flex items-start gap-3 text-charcoal text-sm sm:text-base leading-relaxed min-w-0"
                      >
                        <span className="shrink-0 w-6 h-6 rounded-full text-white flex items-center justify-center text-xs font-bold mt-0.5" style={{ background: accent }}>✓</span>
                        <span className="min-w-0 flex-1 break-words">{line}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Ingredients deep dive - alternating */}
      <section
        id="pdp-ingredients"
        className="scroll-mt-28 py-10 sm:py-12 md:py-16"
        style={{
          background: `linear-gradient(180deg, color-mix(in srgb, ${accent} 7%, #fff) 0%, #fff 42%, color-mix(in srgb, ${product.bgColor} 35%, #fff) 100%)`,
        }}
      >
        <div className="mx-auto max-w-6xl min-w-0 px-3 sm:px-6">
          <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="order-2 min-w-0 lg:order-1 lg:col-span-7">
              {ingredientsPdpPhoto ? (
                <PdpSquareImage
                  src={ingredientsPdpPhoto.src}
                  alt={ingredientsPdpPhoto.alt}
                  width={ingredientsPdpPhoto.width}
                  height={ingredientsPdpPhoto.height}
                  sizes="(max-width:1024px) min(560px, 100vw), 58vw"
                  maxWidthClass="max-w-full"
                />
              ) : isPowder ? (
                <div className="relative min-h-[320px]">
                  <PowderPlaceholder product={product} size="section" />
                </div>
              ) : (
                <ProductPageImageSlot
                  width={product.coverWidth}
                  height={product.coverHeight}
                  accentColor={accent}
                  labelAr="مساحة صورة — المكوّنات / تفاصيل العبوة"
                />
              )}
            </div>
            <div className="order-1 min-w-0 max-w-full break-words text-start lg:order-2 lg:col-span-5">
              <p className="mb-2 text-xs font-black uppercase tracking-[0.22em]" style={{ color: accent }}>
                {ingH.eyebrowAr ?? 'شفافية'}
              </p>
              <h2 className="mb-2 text-2xl font-black leading-snug text-charcoal sm:text-3xl md:text-[2.1rem]">
                {ingH.titleAr ?? 'المكوّنات وبأسلوب واضح'}
              </h2>
              <p className="mb-6 text-sm leading-relaxed text-charcoal sm:text-[15px]">
                {ingH.subtitleAr ??
                  'كل شي أساسي موجود على الغلاف المعتمد لمنتجكم؛ هنا خلّينا تعريف مختصر يساعدك تفهمين الفورمولا بدون لفّ. هذا المنتج بتصنيف مكمّل غذائي — مش دواء ومش توصيف طبي.'}
              </p>
              <div className="flex flex-col gap-3 sm:gap-3.5">
                {product.ingredients.map((ing, idx) => {
                  const blurb =
                    (
                      {
                        بيوتين: 'فيتامين B7 يدعم صحة الشعر والأظافر والبشرة ضمن مكمّل غذائي — حسب الفورمولا على الغلاف.',
                        زنك: 'معدن يدعم وظائف طبيعية مرتبطة بالشعر والبشرة والأظافر والمناعة.',
                        'فيتامين D': 'يدعم الصحة العامة وامتصاص الكالسيوم؛ ضمن الفورمولا حسب غلاف عبوّتكم.',
                        'فيتامين D3': 'شكل نشط من فيتامين D يدعم الصحة العامة والتوازن الهرموني مع تغذية متوازنة.',
                        بروبيوتيك: 'بكتيريا نافعة تدعم التوازن الطبيعي للجهاز الهضمي.',
                        ألياف: 'تدعم حركة الهضم الطبيعية وإحساس الخفة بعد الوجبات.',
                        مغنيسيوم: 'معدن يدعم مسارات الاسترخاء والجهاز العصبي مع تناول مناسب حسب الغلاف.',
                        'L-Theanine': 'حمض أميني طبيعي من مصادر معروفة — يُستخدم لدعم الاسترخاء دون نعاس ثقيل.',
                        'كولاجين بحري': 'بروتين مستخلص من السمك يدعم بنية الشعر والبشرة من الداخل — يُذاب في الماء.',
                        حديد: 'معدن أساسي ترتبط قلّته بتساقط الشعر عند النساء — يدعم نقل الأكسجين لبصيلات الشعر.',
                        'فيتامين C': 'مضاد أكسدة يدعم بناء الكولاجين وامتصاص الحديد وإشراق البشرة.',
                        'حمض الفوليك': 'فيتامين B9 ضروري لتجديد الخلايا وصحة بصيلات الشعر.',
                        غلوتاثيون: 'مضاد أكسدة قوي مرتبط بإضاءة البشرة وتقليل التصبّغ.',
                        NAC: 'N-أستيل سيستين، سلف الغلوتاثيون — يدعم مستوياته في الجسم.',
                        كركم: 'مستخلص نباتي ذو خصائص مضادة للالتهاب — يكمّل تركيبة البشرة من الداخل.',
                        'مايو-إينوسيتول': 'مادة طبيعية مرتبطة بدعم التوازن الهرموني الأنثوي.',
                        فيتكس: 'مستخلص توت العفاريت — عشبة تقليدية مرتبطة بتخفيف أعراض PMS.',
                        'فيتامين B6': 'يساعد في تنظيم الهرمونات وتقليل تقلبات المزاج المرتبطة بالدورة.',
                        كالسيوم: 'معدن أساسي لصحة العظام والعضلات — يكمّل صحة المرأة مع D3 والمغنيسيوم.',
                        زنجبيل: 'مستخلص نباتي مضاد للالتهاب — يخفف تقلصات البطن.',
                      } as Record<string, string>
                    )[ing] ?? 'مكوّن أساسي ضمن الفورمولا — التفاصيل الكاملة على الغلاف المعتمد.'
                  return (
                    <div
                      key={ing}
                      className="relative min-w-0 overflow-hidden rounded-2xl border-2 bg-white px-4 py-4 shadow-sm sm:px-5 sm:py-5"
                      style={{
                        borderColor: `${accent}28`,
                        background: `linear-gradient(135deg, color-mix(in srgb, ${accent} 9%, #fff) 0%, #fff 55%)`,
                        boxShadow: `0 8px 28px -16px ${accent}55`,
                      }}
                    >
                      <div
                        className="absolute inset-y-0 start-0 w-1.5"
                        style={{ background: `linear-gradient(180deg, ${accent}, color-mix(in srgb, ${accent} 45%, #1a1012))` }}
                        aria-hidden
                      />
                      <div className="flex items-start gap-3 pe-1 ps-2">
                        <span
                          className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-black text-white"
                          style={{
                            background: accent,
                            boxShadow: `0 4px 12px -2px ${accent}77`,
                          }}
                        >
                          {idx + 1}
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="text-lg font-black leading-snug sm:text-xl" style={{ color: accent }}>
                            {ing}
                          </p>
                          <p className="mt-1.5 text-sm leading-relaxed text-charcoal sm:text-[15px]">{blurb}</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
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
            <div className="mb-2 text-3xl sm:mb-3 sm:text-4xl">{isPowder ? '💧' : '🌿'}</div>
            <h2 className="break-words text-xl font-black text-charcoal sm:text-2xl">
              {routineH.titleAr ?? 'وش تسوين بالضبط؟ (روتين بسيط)'}
            </h2>
            <p className="mx-auto mt-4 max-w-xl break-words text-[15px] leading-loose text-charcoal">{product.howToUse}</p>
            <p className="mt-4 rounded-2xl bg-white/60 px-4 py-3 text-sm leading-relaxed text-charcoal ring-1 ring-black/[0.04]">
              <strong className="text-charcoal">{complianceNote.lead}</strong> {complianceNote.rest}{' '}
              <strong className="text-charcoal">يختلف</strong> حسب الشخص والنوم والأكل والالتزام.{' '}
              <span className="text-charcoal/80">تلزم تعليمات الغلاف المعتمد؛ كلام الصفحة تكميلي ومش بديل له.</span>
            </p>
          </div>
        </div>
      </section>

      {product.productInfoSheets && product.productInfoSheets.length > 0 ? (
        <section className="border-t border-border/60 bg-white py-10 sm:py-12 md:py-14">
          <div className="mx-auto max-w-6xl min-w-0 px-3 sm:px-6">
            <p className="mb-2 text-start text-xs font-black uppercase tracking-[0.22em] text-muted">{infoH.eyebrowAr ?? 'معلومات المنتج'}</p>
            <h2 className="mb-8 text-start text-xl font-black text-charcoal sm:text-2xl">
              {infoH.titleAr ?? 'المكونات، مدة النتيجة، وموانع الاستعمال'}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:gap-6">
              {product.productInfoSheets.map((sheet) => (
                <article
                  key={sheet.titleAr}
                  className="min-w-0 rounded-2xl border border-border bg-[#fdfcfc] p-5 shadow-[0_1px_8px_rgba(28,28,28,0.04)] sm:p-6"
                >
                  <h3 className="text-base font-black text-charcoal sm:text-lg">{sheet.titleAr}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-charcoal sm:text-[15px]">{sheet.bodyAr}</p>
                </article>
              ))}
            </div>
            <p className="mt-6 text-start text-xs leading-relaxed text-charcoal">
              المرجع النهائي: غلاف عبوّتكم المعتمد (SFDA) — الجرعة، القائمة الكاملة، والصلاحية.
            </p>
          </div>
        </section>
      ) : null}

      {product.closingPersuasion && (
        <section
          className="py-10 sm:py-12 md:py-14 border-t border-[#eae2df] bg-white"
        >
          <div className="max-w-6xl mx-auto px-3 sm:px-6 min-w-0">
            <div className="max-w-3xl mr-0 ml-auto text-start min-w-0 rounded-2xl border border-[#dfd6d4] px-5 py-6 sm:p-8" style={{ background: `${product.bgColor}aa` }}>
              {product.closingPersuasion.eyebrowAr && (
                <p className="text-xs font-bold tracking-[0.18em] text-[#c9937e] mb-2 uppercase">{product.closingPersuasion.eyebrowAr}</p>
              )}
              <h2 className="text-xl sm:text-2xl font-bold text-[#1C1C1C] mb-4 break-words">{product.closingPersuasion.titleAr}</h2>
              <p className="text-charcoal leading-loose text-[15px] mb-5 break-words max-w-prose">{product.closingPersuasion.bodyAr}</p>
              {product.closingPersuasion.bullets && product.closingPersuasion.bullets.length > 0 && (
                <ul className="flex flex-col gap-3 text-start">
                  {product.closingPersuasion.bullets.map((line) => (
                    <li
                      key={line}
                      className="flex items-start gap-3 text-charcoal text-sm sm:text-base leading-relaxed min-w-0"
                    >
                      <span className="shrink-0 w-6 h-6 rounded-full text-white flex items-center justify-center text-xs font-bold mt-0.5" style={{ background: accent }}>★</span>
                      <span className="min-w-0 flex-1 break-words">{line}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </section>
      )}

      <PdpReviewsSection product={product} />

      {/* Cross-sells */}
      {crossSellProducts.length > 0 && (
        <section className="border-t border-border bg-white py-10 sm:py-12 md:py-14">
          <div className="max-w-6xl mx-auto px-3 sm:px-6 min-w-0">
            <p className="mb-2 text-center text-xs font-black uppercase tracking-[0.2em]" style={{ color: accent }}>كمّلي السلة بحكمة</p>
            <h2 className="mx-auto mb-3 max-w-2xl text-center text-xl font-black text-charcoal break-words px-1 sm:text-2xl">
              كملي روتينك قبل ما تغلى العروض
            </h2>
            <p className="mx-auto mb-10 max-w-xl text-center text-[15px] leading-loose text-charcoal break-words px-1">
              كل منتج له دوره: صبح · بعد الأكل · مساء. اختاري اللي يناسبك —{' '}
              <strong className="font-bold text-charcoal">الوضوح قبل الطلب يوفّر وقت.</strong>
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
              {crossSellProducts.map((p) => (
                <ProductCard key={p.id} product={p} layout="list" useHomeCardImage />
              ))}
            </div>
          </div>
        </section>
      )}

      <section
        id="pdp-return-to-offer"
        className="scroll-mt-[calc(4.75rem+env(safe-area-inset-top))] border-y border-border py-12 sm:py-14 md:py-16"
        style={{ background: `linear-gradient(to bottom left, ${product.bgColor}88, #fff, ${accent}0a)` }}
      >
        <div className="mx-auto flex max-w-3xl flex-col items-center px-4 text-center sm:px-6">
          <p className="mb-3 text-xs font-black uppercase tracking-[0.26em]" style={{ color: accent }}>
            {closeH.eyebrowAr ?? 'جاهزة من القرار؟'}
          </p>
          <h2 className="text-2xl font-black leading-snug text-charcoal sm:text-3xl">
            {closeH.titleAr ?? 'طلعي لفوق؛ نفس العربات والخصم موجودين في خانة الأسعار فوق الصفحة'}
          </h2>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-charcoal sm:text-lg">
            اختاري العرض من تحت — يفتح نموذج الاسم والجوال مباشرة، ثم تأكيد الطلب.{' '}
            <strong className="font-semibold text-charcoal">الدفع كاش عند الباب.</strong>
          </p>
          <PdpBottomOfferCta product={product} />
        </div>
      </section>

      <PdpDeliveryPaymentSection accentColor={accent} bgColor={product.bgColor} />

      {/* FAQ */}
      <section className="py-10 sm:py-12 md:py-14 bg-white">
        <div className="max-w-3xl mx-auto px-3 sm:px-6 min-w-0">
          <p className="mb-2 text-center text-xs font-black uppercase tracking-[0.22em]" style={{ color: accent }}>
            {faqH.eyebrowAr ?? 'نحطّكم في الصورة قبل الدفع عند الباب'}
          </p>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-charcoal mb-2 text-center break-words">
            {faqH.titleAr ?? 'كل اللي بعد يخوف من الإعلانات — نقوله بوضوح'}
          </h2>
          <p className="mx-auto mb-8 max-w-lg text-center text-sm leading-relaxed text-charcoal sm:mb-10 sm:text-[15px]">
            {faqH.subtitleAr ??
              'الأسئلة هذي أكثر الشي تجي ورا TikTok/Snapchat. شوفيهم براحة؛ ومستعدين نجاوب أثناء التأكيد الهاتفي أيضًا.'}
          </p>
          <div className="flex flex-col gap-2.5 sm:gap-3 min-w-0">
            {product.faqs.map((faq) => (
              <details key={faq.q} className="bg-[#FFFFFF] rounded-2xl overflow-hidden group min-w-0 border border-[#dfd6d4]">
                <summary className="px-4 sm:px-6 py-4 min-h-[3.25rem] font-semibold text-[#1C1C1C] text-sm sm:text-base cursor-pointer list-none flex items-center justify-between gap-3 active:bg-[#f5f0ef] hover:bg-[#eae2df] transition min-w-0 touch-manipulation">
                  <span className="text-start flex-1 min-w-0 break-words leading-snug">{faq.q}</span>
                  <span className="shrink-0 group-open:rotate-180 transition-transform duration-200 text-xs sm:text-sm" style={{ color: accent }}>▼</span>
                </summary>
                <div className="px-4 sm:px-6 pb-4 pt-1 text-sm text-charcoal leading-relaxed break-words text-start border-t border-[#dfd6d4]">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
