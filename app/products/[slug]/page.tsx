import { notFound } from 'next/navigation'
import {
  PRODUCTS,
  getProductBySlug,
  getProductById,
  formatSoldCount,
  getFormatLabelAr,
  getPriceForQty,
  formatSarAmount,
  isPowderProduct,
} from '@/lib/products'
import { getPdpSectionHeadlines } from '@/lib/pdp-section-headlines'
import { getPdpHeroStats } from '@/lib/pdp-hero-stats'
import { getPdpStatCitation } from '@/lib/pdp-content'
import StarRating from '@/components/ui/StarRating'
import ProductPageClient from './ProductPageClient'
import ProductCard from '@/components/product/ProductCard'
import PdpSquareImage from '@/components/product/PdpSquareImage'
import PdpDeliveryPaymentSection from '@/components/product/PdpDeliveryPaymentSection'
import PdpReviewsSection from '@/components/product/PdpReviewsSection'
import PowderPlaceholder from '@/components/product/PowderPlaceholder'
import { getPdpAddCta } from '@/lib/pdp-copy'
import PdpSfdaBanner from '@/components/product/pdp/PdpSfdaBanner'
import PdpHeroStatPills from '@/components/product/pdp/PdpHeroStatPills'
import PdpStatCitation from '@/components/product/pdp/PdpStatCitation'
import PdpPainQuotes from '@/components/product/pdp/PdpPainQuotes'
import PdpIngredientsNama from '@/components/product/pdp/PdpIngredientsNama'
import PdpTrustCredentials from '@/components/product/pdp/PdpTrustCredentials'
import PdpResultsTimeline from '@/components/product/pdp/PdpResultsTimeline'
import PdpComparison from '@/components/product/pdp/PdpComparison'
import PdpGuarantee from '@/components/product/pdp/PdpGuarantee'
import PdpHowToNama from '@/components/product/pdp/PdpHowToNama'
import PdpFaqGrouped from '@/components/product/pdp/PdpFaqGrouped'

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
  const accent = product.accentColor
  const heroStats = getPdpHeroStats(product)
  const statCitation = getPdpStatCitation(product.id)

  const crossSellProducts = product.crossSells
    .map((id) => getProductById(id))
    .filter(Boolean) as typeof PRODUCTS

  const pdpHeroSrc = product.pdpHeroImage?.src ?? product.coverImage
  const pdpHeroAlt = product.pdpHeroImage?.alt ?? product.nameAr
  const pdpHeroWidth = product.pdpHeroImage?.width ?? product.coverWidth
  const pdpHeroHeight = product.pdpHeroImage?.height ?? product.coverHeight

  const faqH = getPdpSectionHeadlines(product.id).faq ?? {}
  const closeH = getPdpSectionHeadlines(product.id).closingOffer ?? {}
  const unitLabel = isPowder ? 'عبوة' : 'علبة'
  const startPrice = formatSarAmount(getPriceForQty(1))

  return (
    <div className="min-w-0 overflow-x-hidden bg-white pb-[calc(3.75rem+env(safe-area-inset-bottom,0px))]">
      <PdpSfdaBanner />

      <section className="border-b border-border/60 bg-white py-5 sm:py-8 md:py-10">
        <div className="mx-auto max-w-6xl min-w-0 px-4 sm:px-6">
          <div className="grid min-w-0 grid-cols-1 items-start gap-6 md:grid-cols-2 md:gap-10 lg:gap-12">
            {/* موبايل: الشراء أولاً */}
            <div className="order-1 min-w-0 text-start md:order-2">
              <div className="mb-3 flex flex-wrap items-center justify-end gap-2">
                <span
                  className="inline-flex rounded-full px-3 py-1 text-[10px] font-bold text-white sm:text-xs"
                  style={{ background: accent }}
                >
                  {getFormatLabelAr(product)}
                </span>
                <span
                  className="inline-flex rounded-full border px-3 py-1 text-[10px] font-bold sm:text-xs"
                  style={{ borderColor: `${accent}44`, color: accent, background: `${accent}0a` }}
                >
                  {product.badgeAr}
                </span>
                {product.isNew && (
                  <span className="inline-flex rounded-full bg-charcoal px-3 py-1 text-[10px] font-black text-white sm:text-xs">
                    جديد
                  </span>
                )}
              </div>

              <PdpHeroStatPills stats={heroStats} accentColor={accent} />

              <h1 className="mb-3 text-2xl font-black leading-tight text-charcoal sm:text-3xl sm:leading-[1.12] md:text-[2.125rem]">
                {product.heroHeadlineAr}
              </h1>

              <p className="mb-4 text-sm leading-relaxed text-charcoal sm:text-base">{product.heroSubAr}</p>

              <div className="mb-1 flex flex-wrap items-center justify-end gap-x-3 gap-y-2">
                <StarRating rating={product.rating} count={product.reviewCount} size="md" accentColor={accent} />
                <span className="text-sm font-bold text-charcoal">
                  · من {startPrice} / {unitLabel}
                </span>
              </div>

              {(product.soldCount ?? 0) > 0 && (
                <p className="mb-2 text-xs font-semibold text-muted">
                  {formatSoldCount(product.soldCount!)}+ طلب · تقييمات مؤكدة
                </p>
              )}

              <p className="mb-4 text-xs font-bold sm:text-sm" style={{ color: accent }}>
                شحن لجميع مدن المملكة · الدفع عند الاستلام فقط
              </p>

              <p className="mb-1 text-base font-black text-charcoal sm:text-lg">{product.nameAr}</p>
              <p className="mb-4 text-xs leading-relaxed text-muted sm:text-sm">{product.subtitleAr}</p>

              <div id="pdp-buy-anchor" className="scroll-mt-[calc(4.5rem+env(safe-area-inset-top))]">
                <ProductPageClient
                  product={product}
                  addToCartLabel={getPdpAddCta(product.id)}
                  isPowder={isPowder}
                />
              </div>
            </div>

            {/* صورة — sticky على ديسكتوب */}
            <div className="order-2 min-w-0 md:order-1 md:sticky md:top-24">
              <div className="mx-auto w-full max-w-md overflow-hidden rounded-2xl border border-border/80 bg-[#faf9f8] p-2 shadow-sm sm:max-w-lg sm:rounded-3xl md:mx-0 md:max-w-none">
                {isPowder && !product.pdpHeroImage ? (
                  <div className="relative aspect-square min-h-[280px]">
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
                <p className="mx-auto mt-2 max-w-md text-center text-[11px] leading-snug text-muted sm:text-xs md:text-start">
                  {product.captionUnderHeroImage}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      <PdpStatCitation
        accentColor={accent}
        stat={statCitation.stat}
        label={statCitation.label}
        source={statCitation.source}
      />

      <PdpPainQuotes product={product} />
      <PdpIngredientsNama product={product} />
      <PdpTrustCredentials
        accentColor={accent}
        soldCount={product.soldCount}
        reviewCount={product.reviewCount}
        rating={product.rating}
      />
      <PdpResultsTimeline accentColor={accent} product={product} />
      <PdpReviewsSection product={product} />
      <PdpComparison product={product} />
      <PdpGuarantee accentColor={accent} />
      <PdpHowToNama product={product} />

      {product.productInfoSheets && product.productInfoSheets.length > 0 ? (
        <section className="border-b border-border/60 bg-[#faf9f8] py-10 sm:py-12">
          <div className="mx-auto max-w-6xl min-w-0 px-3 sm:px-6">
            <p className="mb-2 text-[10px] font-black uppercase tracking-[0.22em] text-muted">معلومات المنتج</p>
            <h2 className="mb-8 text-xl font-black text-charcoal sm:text-2xl">
              المكونات، مدة النتيجة، وموانع الاستعمال
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {product.productInfoSheets.map((sheet) => (
                <article
                  key={sheet.titleAr}
                  className="rounded-2xl border border-border bg-white p-5 shadow-sm sm:p-6"
                >
                  <h3 className="text-base font-black text-charcoal">{sheet.titleAr}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-charcoal">{sheet.bodyAr}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {crossSellProducts.length > 0 && (
        <section className="border-b border-border/60 bg-white py-10 sm:py-14">
          <div className="mx-auto max-w-6xl min-w-0 px-3 sm:px-6">
            <p className="mb-2 text-center text-[10px] font-black uppercase tracking-[0.2em] text-muted">
              اكتشفي أكثر
            </p>
            <h2 className="mb-3 text-center text-2xl font-black text-charcoal sm:text-3xl">
              منتجات أخرى من نبتة لابو
            </h2>
            <p className="mx-auto mb-10 max-w-2xl text-center text-sm leading-relaxed text-charcoal sm:text-base">
              لكل هدف تركيبة مخصّصة — اختاري ما يهمّكِ أو كمّلي الروتين.
            </p>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
              {crossSellProducts.map((p) => (
                <ProductCard key={p.id} product={p} layout="list" useHomeCardImage />
              ))}
            </div>
          </div>
        </section>
      )}

      <section
        id="pdp-return-to-offer"
        className="scroll-mt-[calc(4.75rem+env(safe-area-inset-top))] border-b border-border/60 py-12 sm:py-14"
        style={{ background: `linear-gradient(to bottom left, ${product.bgColor}66, #fff)` }}
      >
        <div className="mx-auto flex max-w-3xl flex-col items-center px-4 text-center sm:px-6">
          <p className="mb-3 text-xs font-black uppercase tracking-[0.26em]" style={{ color: accent }}>
            {closeH.eyebrowAr ?? 'جاهزة من القرار؟'}
          </p>
          <h2 className="text-2xl font-black leading-snug text-charcoal sm:text-3xl">
            {closeH.titleAr ?? 'اختاري العرض واطلبي — دفع عند الباب'}
          </h2>
          <a
            href="#pdp-buy-anchor"
            className="mt-8 inline-flex min-h-[48px] items-center justify-center rounded-2xl px-8 py-3.5 text-base font-black text-white shadow-lg transition hover:brightness-105"
            style={{ background: accent }}
          >
            رجوع إلى العرض والطلب ↑
          </a>
        </div>
      </section>

      <PdpDeliveryPaymentSection accentColor={accent} bgColor={product.bgColor} />
      <PdpFaqGrouped product={product} faqH={faqH} />
    </div>
  )
}
