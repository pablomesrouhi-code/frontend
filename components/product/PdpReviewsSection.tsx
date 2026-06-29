import type { Product, ProductReview } from '@/lib/products'
import { getPdpSectionHeadlines } from '@/lib/pdp-section-headlines'
import { getTestimonialMeta } from '@/lib/pdp-testimonial-meta'
import StarRating from '@/components/ui/StarRating'

function reviewInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  const a = parts[0]?.[0] ?? '?'
  const b = parts[1]?.[0] ?? ''
  return (a + b).toUpperCase()
}

function ReviewCardNama({
  review,
  accentColor,
  productId,
  index,
  featured = false,
}: {
  review: ProductReview
  accentColor: string
  productId: string
  index: number
  featured?: boolean
}) {
  const meta = getTestimonialMeta(productId, index)
  const displayName = meta?.displayName ?? review.name
  const subtitle = [meta?.age ? `${meta.age} سنة` : null, meta?.cityAr].filter(Boolean).join(' · ')

  return (
    <article
      className={`flex min-w-0 flex-col rounded-2xl border border-border bg-white shadow-sm ${
        featured ? 'p-5 sm:p-6' : 'p-4 sm:p-5'
      }`}
    >
      <span className="text-2xl leading-none text-charcoal/15" aria-hidden>
        "
      </span>
      <blockquote
        className={`mt-1 leading-relaxed text-charcoal ${featured ? 'text-sm sm:text-base' : 'text-[13px] sm:text-sm'}`}
      >
        {review.text}
      </blockquote>
      <div className="mt-4 flex items-center gap-3 border-t border-border/70 pt-4">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-black text-white"
          style={{ background: accentColor }}
          aria-hidden
        >
          {reviewInitials(displayName)}
        </div>
        <div className="min-w-0 flex-1 text-start">
          <p className="text-sm font-bold text-charcoal">{displayName}</p>
          {subtitle && <p className="text-xs text-muted">{subtitle}</p>}
          <div className="mt-1 flex flex-wrap items-center gap-2">
            <StarRating rating={review.rating} size="sm" />
            <span
              className="rounded-full px-2 py-0.5 text-[10px] font-bold text-white"
              style={{ background: accentColor }}
            >
              مؤكدة
            </span>
          </div>
        </div>
      </div>
    </article>
  )
}

type Props = {
  product: Product
}

export default function PdpReviewsSection({ product }: Props) {
  const accent = product.accentColor
  const reviewsH = getPdpSectionHeadlines(product.id).reviews ?? {}
  const countLabel = product.reviewCount.toLocaleString('en-US')

  return (
    <section
      id="pdp-reviews"
      className="scroll-mt-28 overflow-x-hidden border-t border-border/60 py-10 sm:py-12 md:py-14"
      style={{
        background: `linear-gradient(180deg, color-mix(in srgb, ${product.bgColor} 40%, #fff) 0%, #fff 100%)`,
      }}
    >
      <div className="mx-auto max-w-6xl min-w-0 px-3 sm:px-6">
        <div className="mb-8 max-w-3xl text-start">
          <p className="mb-2 text-[10px] font-black uppercase tracking-[0.22em] text-muted">
            {reviewsH.eyebrowAr ?? 'تجارب حقيقية'}
          </p>
          <h2 className="text-xl font-black text-charcoal sm:text-2xl md:text-3xl">
            {reviewsH.titleAr ?? `ما تقوله ${countLabel}+ عميلة`}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-charcoal">
            {reviewsH.subtitleAr ??
              'مشتريات مؤكدة من مدن مختلفة في المملكة — مو تعليقات مفبركة، تجارب فعلية.'}
          </p>
          <div className="mt-4">
            <StarRating rating={product.rating} count={product.reviewCount} size="md" accentColor={accent} />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {product.reviews.slice(0, 3).map((r, idx) => (
            <ReviewCardNama
              key={`${product.id}-r-top-${idx}`}
              review={r}
              accentColor={accent}
              productId={product.id}
              index={idx}
              featured
            />
          ))}
        </div>

        {product.reviews.length > 3 && (
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {product.reviews.slice(3).map((r, idx) => (
              <ReviewCardNama
                key={`${product.id}-r-${idx + 3}`}
                review={r}
                accentColor={accent}
                productId={product.id}
                index={idx + 3}
              />
            ))}
          </div>
        )}

        {product.afterReviewsBanner ? (
          <div
            className="mt-8 rounded-2xl border px-5 py-5 text-start"
            style={{ borderColor: `${accent}33`, background: `${product.bgColor}99` }}
          >
            {product.afterReviewsBanner.titleAr && (
              <h3 className="mb-2 text-base font-black text-charcoal">{product.afterReviewsBanner.titleAr}</h3>
            )}
            <p className="text-sm leading-relaxed text-charcoal">{product.afterReviewsBanner.bodyAr}</p>
            <a
              href="#pdp-buy-anchor"
              className="mt-4 inline-flex rounded-xl px-5 py-2.5 text-sm font-extrabold text-white"
              style={{ background: accent }}
            >
              اختاري العرض واطلبي الآن ↑
            </a>
          </div>
        ) : null}
      </div>
    </section>
  )
}
