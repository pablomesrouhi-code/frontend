import type { Product } from '@/lib/products'
import StarRating from '@/components/ui/StarRating'

function reviewInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  const a = parts[0]?.[0] ?? '?'
  const b = parts[1]?.[0] ?? ''
  return (a + b).toUpperCase()
}

function ReviewAvatar({ name, accentColor, size }: { name: string; accentColor: string; size: 'md' | 'lg' }) {
  const dim =
    size === 'lg' ? 'h-16 w-16 sm:h-[4.5rem] sm:w-[4.5rem] text-xl sm:text-2xl' : 'h-14 w-14 sm:h-16 sm:w-16 text-lg sm:text-xl'
  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-2xl font-black text-white shadow-md ring-4 ring-white ${dim}`}
      style={{ background: accentColor }}
      aria-hidden
    >
      {reviewInitials(name)}
    </div>
  )
}

function ReviewCard({
  review,
  accentColor,
  bgColor,
  featured = false,
}: {
  review: Product['reviews'][number]
  accentColor: string
  bgColor: string
  featured?: boolean
}) {
  return (
    <article
      className={`flex min-w-0 flex-col rounded-3xl border bg-white shadow-sm ring-1 ring-black/[0.03] ${
        featured
          ? 'gap-4 border-2 p-5 sm:gap-5 sm:p-6 md:p-7'
          : 'gap-3.5 p-4 sm:gap-4 sm:p-5 md:p-6'
      }`}
      style={
        featured
          ? {
              borderColor: `color-mix(in srgb, ${accentColor} 45%, #e8e0de)`,
              background: `linear-gradient(165deg, #fff 0%, color-mix(in srgb, ${bgColor} 40%, #fff) 100%)`,
            }
          : { borderColor: 'var(--border)' }
      }
    >
      <div className="flex items-center gap-4 sm:gap-5">
        <ReviewAvatar name={review.name} accentColor={accentColor} size={featured ? 'lg' : 'md'} />
        <div className="min-w-0 flex-1 text-start">
          {featured ? (
            <span
              className="mb-2 inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-white sm:text-xs"
              style={{ background: accentColor }}
            >
              أكثر تقييم يُذكر
            </span>
          ) : null}
          <StarRating rating={review.rating} size={featured ? 'md' : 'sm'} />
          <p className={`mt-2 font-black text-charcoal ${featured ? 'text-base sm:text-lg' : 'text-sm sm:text-base'}`}>
            {review.name}
          </p>
        </div>
      </div>
      <blockquote
        className={`text-pretty leading-relaxed text-charcoal ${
          featured
            ? 'text-lg font-semibold leading-relaxed sm:text-xl'
            : 'text-base font-medium leading-relaxed sm:text-[17px]'
        }`}
      >
        «{review.text}»
      </blockquote>
    </article>
  )
}

type Props = {
  product: Product
}

export default function PdpReviewsSection({ product }: Props) {
  const [featured, ...others] = product.reviews
  const accent = product.accentColor

  return (
    <section
      id="pdp-reviews"
      className="scroll-mt-28 overflow-x-hidden border-t border-border/60 py-10 sm:py-12 md:py-14"
      style={{
        background: `linear-gradient(180deg, color-mix(in srgb, ${product.bgColor} 55%, #fff) 0%, #fff 55%, color-mix(in srgb, ${accent} 5%, #fff) 100%)`,
      }}
    >
      <div className="mx-auto max-w-6xl min-w-0 px-3 sm:px-6">
        <div className="mb-8 flex flex-col gap-5 border-b border-border/80 pb-6 sm:mb-10 sm:pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl text-start">
            <p
              className="mb-2 inline-flex rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-white shadow-sm sm:text-xs"
              style={{ background: accent }}
            >
              إثبات اجتماعي
            </p>
            <h2 className="text-xl font-black leading-snug text-charcoal sm:text-2xl md:text-3xl">
              وش قالت عميلات اختارت {product.nameAr}؟
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
              آراء شخصية بخط واضح — النتيجة تختلف حسب الجسم والنوم والأكل والالتزام. للتفاصيل راجعي الأسئلة في آخر الصفحة.
            </p>
          </div>

          <div
            className="flex shrink-0 items-center gap-4 rounded-2xl border-2 bg-white px-5 py-4 shadow-sm sm:px-6 sm:py-5"
            style={{ borderColor: `color-mix(in srgb, ${accent} 35%, #e8e0de)` }}
          >
            <p className="text-4xl font-black tabular-nums leading-none sm:text-5xl" style={{ color: accent }}>
              {product.rating.toFixed(1)}
            </p>
            <div className="text-start">
              <StarRating rating={product.rating} count={product.reviewCount} size="md" />
            </div>
          </div>
        </div>

        {featured ? (
          <div className="mb-6 sm:mb-8">
            <ReviewCard review={featured} accentColor={accent} bgColor={product.bgColor} featured />
          </div>
        ) : null}

        {others.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-2">
            {others.map((r, idx) => (
              <ReviewCard key={`${product.id}-r-${idx + 1}`} review={r} accentColor={accent} bgColor={product.bgColor} />
            ))}
          </div>
        ) : null}

        {product.afterReviewsBanner ? (
          <div
            className="mt-8 rounded-2xl border px-5 py-5 text-start min-w-0 sm:mt-10 sm:p-6"
            style={{ borderColor: `${accent}44`, background: `${product.bgColor}b3` }}
          >
            {product.afterReviewsBanner.titleAr && (
              <h3 className="mb-2 break-words text-lg font-bold text-[#1C1C1C] sm:text-xl">
                {product.afterReviewsBanner.titleAr}
              </h3>
            )}
            <p className="break-words text-sm leading-relaxed text-[#5c5656] sm:text-base">
              {product.afterReviewsBanner.bodyAr}
            </p>
            <a
              href="#pdp-buy-anchor"
              className="mt-5 inline-flex rounded-2xl px-5 py-3 text-sm font-extrabold text-white shadow-md transition hover:brightness-105 sm:text-base"
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
