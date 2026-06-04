import type { Product } from '@/lib/products'
import StarRating from '@/components/ui/StarRating'

function reviewInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  const a = parts[0]?.[0] ?? '?'
  const b = parts[1]?.[0] ?? ''
  return (a + b).toUpperCase()
}

type Props = {
  product: Product
}

export default function PdpReviewsSection({ product }: Props) {
  const accent = product.accentColor

  return (
    <section
      id="pdp-reviews"
      className="scroll-mt-28 overflow-x-hidden border-t border-border/60 py-8 sm:py-10 md:py-12"
      style={{
        background: `linear-gradient(180deg, color-mix(in srgb, ${product.bgColor} 45%, #fff) 0%, #fff 100%)`,
      }}
    >
      <div className="mx-auto max-w-6xl min-w-0 px-3 sm:px-6">
        <div className="mb-6 flex flex-col gap-3 border-b border-border/80 pb-5 sm:mb-7 sm:flex-row sm:items-center sm:justify-between sm:pb-6">
          <div className="max-w-xl text-start">
            <p
              className="mb-1.5 inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase tracking-[0.18em] text-white"
              style={{ background: accent }}
            >
              إثبات اجتماعي
            </p>
            <h2 className="text-lg font-black text-charcoal sm:text-xl">وش قالت عميلات اختارت {product.nameAr}؟</h2>
            <p className="mt-1.5 text-xs leading-relaxed text-muted sm:text-sm">
              آراء شخصية؛ النتيجة تختلف حسب الجسم والالتزام. للتفاصيل راجعي الأسئلة في آخر الصفحة.
            </p>
          </div>
          <StarRating rating={product.rating} count={product.reviewCount} size="sm" />
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
          {product.reviews.map((r, idx) => (
            <article
              key={`${product.id}-r-${idx}`}
              className="flex min-w-0 gap-3 rounded-2xl border border-border bg-white p-3.5 shadow-sm sm:p-4"
            >
              <div
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-sm font-black text-white"
                style={{ background: accent }}
                aria-hidden
              >
                {reviewInitials(r.name)}
              </div>
              <div className="min-w-0 flex-1 text-start">
                <div className="mb-1.5 flex flex-wrap items-center gap-x-2 gap-y-1">
                  <p className="text-sm font-bold text-charcoal">{r.name}</p>
                  <StarRating rating={r.rating} size="sm" />
                </div>
                <blockquote className="text-[13px] leading-relaxed text-charcoal sm:text-sm">«{r.text}»</blockquote>
              </div>
            </article>
          ))}
        </div>

        {product.afterReviewsBanner ? (
          <div
            className="mt-6 rounded-xl border px-4 py-4 text-start min-w-0 sm:mt-7 sm:px-5"
            style={{ borderColor: `${accent}44`, background: `${product.bgColor}b3` }}
          >
            {product.afterReviewsBanner.titleAr && (
              <h3 className="mb-1.5 text-base font-bold text-[#1C1C1C]">{product.afterReviewsBanner.titleAr}</h3>
            )}
            <p className="text-xs leading-relaxed text-[#5c5656] sm:text-sm">{product.afterReviewsBanner.bodyAr}</p>
            <a
              href="#pdp-buy-anchor"
              className="mt-3 inline-flex rounded-xl px-4 py-2 text-xs font-extrabold text-white sm:text-sm"
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
