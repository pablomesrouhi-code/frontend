import type { Product, ProductReview } from '@/lib/products'
import { getPdpSectionHeadlines } from '@/lib/pdp-section-headlines'
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
  featured = false,
}: {
  review: ProductReview
  accentColor: string
  featured?: boolean
}) {
  return (
    <article
      className={`flex min-w-0 flex-col rounded-2xl border border-border bg-white shadow-sm ${
        featured ? 'p-6 sm:p-7' : 'p-5 sm:p-6'
      }`}
    >
      <span className="text-3xl leading-none text-charcoal/20" aria-hidden>
        "
      </span>
      <blockquote className={`mt-2 leading-relaxed text-charcoal ${featured ? 'text-base sm:text-lg' : 'text-sm sm:text-base'}`}>
        {review.text}
      </blockquote>
      <div className="mt-4 flex items-center gap-3 border-t border-border/70 pt-4">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-black text-white"
          style={{ background: accentColor }}
          aria-hidden
        >
          {reviewInitials(review.name)}
        </div>
        <div className="min-w-0 flex-1 text-start">
          <p className="text-sm font-bold text-charcoal">{review.name}</p>
          <div className="mt-0.5 flex flex-wrap items-center gap-2">
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

  return (
    <section
      id="pdp-reviews"
      className="scroll-mt-28 overflow-x-hidden border-b border-border/60 bg-[#faf9f8] py-10 sm:py-14"
    >
      <div className="mx-auto max-w-6xl min-w-0 px-3 sm:px-6">
        <div className="mb-8 max-w-3xl text-start">
          <p className="mb-2 text-[10px] font-black uppercase tracking-[0.22em] text-muted">
            {reviewsH.eyebrowAr ?? 'تجارب حقيقية'}
          </p>
          <h2 className="text-xl font-black text-charcoal sm:text-2xl md:text-3xl">
            {reviewsH.titleAr ?? `ما تقوله عميلات ${product.nameAr}`}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-charcoal">
            {reviewsH.subtitleAr ??
              'مشتريات مؤكدة — آراء شخصية؛ النتيجة تختلف حسب الجسم والالتزام.'}
          </p>
          <div className="mt-4">
            <StarRating rating={product.rating} count={product.reviewCount} size="md" accentColor={accent} />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {product.reviews.slice(0, 3).map((r, idx) => (
            <ReviewCardNama key={`${product.id}-r-top-${idx}`} review={r} accentColor={accent} featured />
          ))}
        </div>

        {product.reviews.length > 3 && (
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {product.reviews.slice(3).map((r, idx) => (
              <ReviewCardNama key={`${product.id}-r-${idx + 3}`} review={r} accentColor={accent} />
            ))}
          </div>
        )}

        {product.afterReviewsBanner ? (
          <div
            className="mt-8 rounded-2xl border px-5 py-5 text-start sm:px-6"
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
