import type { Product, ProductReview } from '@/lib/products'
import { getPdpSectionHeadlines } from '@/lib/pdp-section-headlines'
import { getTestimonialMeta } from '@/lib/pdp-testimonial-meta'
import { getProductSolidButtonStyle } from '@/lib/product-accent'

function reviewInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  const a = parts[0]?.[0] ?? '?'
  const b = parts[1]?.[0] ?? ''
  return (a + b).toUpperCase()
}

function Stars({ rating, accentColor }: { rating: number; accentColor: string }) {
  return (
    <span className="text-sm tracking-tight" aria-label={`${rating} من 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} style={{ color: i < Math.round(rating) ? accentColor : '#D8D2CC' }}>
          ★
        </span>
      ))}
    </span>
  )
}

function ReviewCard({
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
      className="relative flex min-w-0 flex-col overflow-hidden rounded-2xl border border-border bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md sm:p-6"
    >
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-1"
        style={{ background: `linear-gradient(90deg, ${accentColor}, ${accentColor}55)` }}
      />
      <div className="mb-3 flex items-center justify-between gap-2">
        <Stars rating={review.rating} accentColor={accentColor} />
        <span
          className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold"
          style={{ color: '#146b70', background: '#146b7014' }}
        >
          ✓ مشترية موثّقة
        </span>
      </div>

      <blockquote
        className={`flex-1 leading-relaxed text-charcoal ${featured ? 'text-sm sm:text-[15px]' : 'text-[13px] sm:text-sm'}`}
      >
        {review.text}
      </blockquote>

      <figcaption className="mt-5 flex items-center gap-3 border-t border-border/70 pt-4">
        <div
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-black text-white"
          style={{ background: accentColor }}
          aria-hidden
        >
          {reviewInitials(displayName)}
        </div>
        <div className="min-w-0 flex-1 text-start">
          <p className="text-sm font-bold text-charcoal">{displayName}</p>
          {subtitle && <p className="text-[11px] text-muted">{subtitle} · مشترية مؤكدة</p>}
        </div>
      </figcaption>
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
      className="scroll-mt-28 overflow-x-hidden border-t border-border/60 py-12 sm:py-14 md:py-16"
      style={{
        background: `linear-gradient(180deg, color-mix(in srgb, ${product.bgColor} 40%, #fff) 0%, #fff 100%)`,
      }}
    >
      <div className="mx-auto max-w-6xl min-w-0 px-3 sm:px-6">
        {/* Header — verified record */}
        <div className="mb-9 text-center">
          <p className="mb-2 text-[10px] font-black uppercase tracking-[0.24em] text-muted">
            {reviewsH.eyebrowAr ?? 'السجلّ الموثّق · VERIFIED'}
          </p>
          <h2 className="text-xl font-black text-charcoal sm:text-2xl md:text-3xl">
            {reviewsH.titleAr ?? 'ثقة موثّقة، بأرقام حقيقية'}
          </h2>
          <span
            aria-hidden
            className="mx-auto mt-3 block h-1 w-16 rounded-full"
            style={{ background: `linear-gradient(90deg, ${accent}, ${accent}55)` }}
          />
        </div>

        {/* Rating summary */}
        <div className="mx-auto mb-6 flex max-w-md items-center justify-center gap-5 rounded-2xl border border-border bg-white p-4 shadow-sm sm:p-5">
          <div className="text-center">
            <p className="text-4xl font-black leading-none tabular-nums sm:text-5xl" style={{ color: accent }}>
              {product.rating.toFixed(1)}
            </p>
            <div className="mt-1 flex justify-center">
              <Stars rating={product.rating} accentColor={accent} />
            </div>
          </div>
          <div className="border-s border-border ps-5 text-start">
            <p className="text-base font-black text-charcoal sm:text-lg">
              من {countLabel}+ تقييم
            </p>
            <p className="text-xs text-muted">مشتريات مؤكدة · كل مناطق السعودية 🇸🇦</p>
          </div>
        </div>

        {/* Trust chips */}
        <div className="mb-9 flex flex-wrap items-center justify-center gap-2">
          {['موثّقة برقم الطلب', 'مؤكّدة بالهاتف', 'بدون فلترة'].map((chip) => (
            <span
              key={chip}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-3 py-1.5 text-[11px] font-bold text-charcoal shadow-sm"
            >
              <span style={{ color: '#146b70' }}>✓</span>
              {chip}
            </span>
          ))}
        </div>

        {/* Reviews grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {product.reviews.slice(0, 3).map((r, idx) => (
            <ReviewCard
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
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {product.reviews.slice(3).map((r, idx) => (
              <ReviewCard
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
            className="mx-auto mt-9 max-w-3xl rounded-2xl border px-5 py-6 text-center"
            style={{ borderColor: `${accent}33`, background: `${product.bgColor}99` }}
          >
            {product.afterReviewsBanner.titleAr && (
              <h3 className="mb-2 text-base font-black text-charcoal">{product.afterReviewsBanner.titleAr}</h3>
            )}
            <p className="mx-auto max-w-xl text-sm leading-relaxed text-charcoal">{product.afterReviewsBanner.bodyAr}</p>
            <a
              href="#pdp-buy-anchor"
              className="mt-4 inline-flex rounded-xl px-6 py-3 text-sm font-extrabold text-white shadow-sm"
              style={getProductSolidButtonStyle(accent)}
            >
              اختاري العرض واطلبي الآن ↑
            </a>
          </div>
        ) : null}
      </div>
    </section>
  )
}
