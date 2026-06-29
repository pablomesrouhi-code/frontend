import type { Product } from '@/lib/products'
import { getPdpComparison, getPdpPainPairs } from '@/lib/pdp-content'
import { getPriceForQty, formatSarAmount, isPowderProduct } from '@/lib/products'

type Props = {
  product: Product
}

export default function PdpComparison({ product }: Props) {
  const accent = product.accentColor
  const { alternatives, winBullets } = getPdpComparison(product)
  const unit = isPowderProduct(product) ? 'عبوة' : 'علبة'

  return (
    <section className="border-b border-border/70 bg-white py-10 sm:py-14">
      <div className="mx-auto max-w-6xl min-w-0 px-3 sm:px-6">
        <div className="mb-8 max-w-3xl text-start">
          <p className="mb-2 text-[10px] font-black uppercase tracking-[0.22em] text-muted">ليش نبتة لابو؟</p>
          <h2 className="text-xl font-black text-charcoal sm:text-2xl md:text-3xl">قارني — وقرّري بنفسك</h2>
          <p className="mt-3 text-sm leading-relaxed text-charcoal sm:text-base">
            كل بديل جربتيه — وليه {product.nameAr} يختلف بروتين واضح وSFDA.
          </p>
        </div>

        <div className="mb-8 grid gap-4 sm:grid-cols-2">
          {alternatives.map((alt) => (
            <article key={alt.title} className="rounded-2xl border border-border bg-[#fdfcfc] p-5 sm:p-6">
              <h3 className="text-base font-black text-charcoal">{alt.title}</h3>
              <p className="mt-1 text-xs font-semibold text-muted">{alt.priceRange}</p>
              <ul className="mt-4 flex flex-col gap-2">
                {alt.cons.map((c) => (
                  <li key={c} className="flex items-start gap-2 text-sm text-charcoal">
                    <span className="mt-0.5 shrink-0 text-red-500/80" aria-hidden>
                      ✕
                    </span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <article
          className="rounded-2xl border-2 p-5 sm:rounded-3xl sm:p-7"
          style={{ borderColor: accent, background: `linear-gradient(135deg, ${accent}08, #fff)` }}
        >
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="text-lg font-black text-charcoal sm:text-xl">{product.nameAr}</h3>
            <p className="text-sm font-bold" style={{ color: accent }}>
              من {formatSarAmount(getPriceForQty(1))} / {unit}
            </p>
          </div>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {winBullets.map((b) => (
              <li key={b} className="flex items-start gap-2 text-sm text-charcoal sm:text-[15px]">
                <span
                  className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-black text-white"
                  style={{ background: accent }}
                >
                  ✓
                </span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
          <a
            href="#pdp-buy-anchor"
            className="mt-6 inline-flex min-h-[44px] items-center justify-center rounded-xl px-6 py-2.5 text-sm font-black text-white transition hover:brightness-105"
            style={{ background: accent }}
          >
            اختاري العرض واطلبي الآن ↑
          </a>
        </article>
      </div>
    </section>
  )
}
