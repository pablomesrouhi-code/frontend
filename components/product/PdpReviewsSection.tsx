import type { Product } from '@/lib/products'
import StarRating from '@/components/ui/StarRating'

function reviewInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  const a = parts[0]?.[0] ?? '?'
  const b = parts[1]?.[0] ?? ''
  return (a + b).toUpperCase()
}

function ReviewAvatar({ name, accentColor, size }: { name: string; accentColor: string; size: 'md' | 'lg' }) {
  const dim = size === 'lg' ? 'h-20 w-20 sm:h-24 sm:w-24 text-2xl sm:text-3xl' : 'h-16 w-16 sm:h-[4.5rem] sm:w-[4.5rem] text-xl sm:text-2xl'
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
          ? 'gap-5 border-2 p-6 sm:gap-6 sm:p-8 lg:p-10'
          : 'gap-4 p-5 sm:gap-5 sm:p-7'
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
          <StarRating rating={review.rating} size={featured ? 'lg' : 'md'} />
          <p className={`mt-2 font-black text-charcoal ${featured ? 'text-lg sm:text-xl' : 'text-base sm:text-lg'}`}>
            {review.name}
          </p>
        </div>
      </div>
      <blockquote
        className={`text-pretty leading-relaxed text-charcoal ${
          featured
            ? 'text-xl font-semibold sm:text-2xl sm:leading-snug lg:text-[1.65rem]'
            : 'text-lg font-medium sm:text-xl sm:leading-relaxed'
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
      className="scroll-mt-28 overflow-x-hidden border-t border-border/60 py-12 sm:py-14 md:py-20"
      style={{
        background: `linear-gradient(180deg, color-mix(in srgb, ${product.bgColor} 55%, #fff) 0%, #fff 55%, color-mix(in srgb, ${accent} 5%, #fff) 100%)`,
      }}
    >
      <div className="mx-auto max-w-6xl min-w-0 px-3 sm:px-6">
        <div className="mb-10 flex flex-col gap-6 border-b border-border/80 pb-8 sm:mb-12 sm:pb-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl text-start">
            <p
              className="mb-3 inline-flex rounded-full px-3.5 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-white shadow-sm sm:text-xs"
              style={{ background: accent }}
            >
              إثبات اجتماعي
            </p>
            <h2 className="text-2xl font-black leading-snug text-charcoal sm:text-3xl md:text-4xl">
              وش قالت عميلات اختارت {product.nameAr}؟
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted sm:text-lg">
              آراء شخصية بخط واضح — النتيجة تختلف حسب الجسم والنوم والأكل والالتزام. للتفاصيل راجعي الأسئلة في آخر الصفحة.
            </p>
          </div>

          <div
            className="flex shrink-0 items-center gap-5 rounded-3xl border-2 bg-white px-6 py-5 shadow-md sm:px-8 sm:py-6"
            style={{ borderColor: `color-mix(in srgb, ${accent} 35%, #e8e0de)` }}
          >
            <p className="text-5xl font-black tabular-nums leading-none text-charcoal sm:text-6xl" style={{ color: accent }}>
              {product.rating.toFixed(1)}
            </p>
            <div className="text-start">
              <StarRating rating={product.rating} count={product.reviewCount} size="lg" />
            </div>
          </div>
        </div>

        {featured ? (
          <div className="mb-6 sm:mb-8">
            <ReviewCard review={featured} accentColor={accent} bgColor={product.bgColor} featured />
          </div>
        ) : null}

        {others.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:gap-6 xl:grid-cols-2">
            {others.map((r, idx) => (
              <ReviewCard key={`${product.id}-r-${idx + 1}`} review={r} accentColor={accent} bgColor={product.bgColor} />
            ))}
          </div>
        ) : null}

        {product.afterReviewsBanner ? (
          <div
            className="mt-10 rounded-2xl border px-6 py-6 text-start min-w-0 sm:mt-12 sm:p-8"
            style={{ borderColor: `${accent}44`, background: `${product.bgColor}b3` }}
          >
            {product.afterReviewsBanner.titleAr && (
              <h3 className="mb-3 break-words text-xl font-bold text-[#1C1C1C] sm:text-2xl">
                {product.afterReviewsBanner.titleAr}
              </h3>
            )}
            <p className="break-words text-base leading-relaxed text-[#5c5656] sm:text-lg">
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
