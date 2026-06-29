import type { Product } from '@/lib/products'
import { getPdpSectionHeadlines } from '@/lib/pdp-section-headlines'
import { getPdpPainPairs } from '@/lib/pdp-content'

type Props = {
  product: Product
}

export default function PdpPainQuotes({ product }: Props) {
  const accent = product.accentColor
  const painH = getPdpSectionHeadlines(product.id).pain ?? {}
  const pairs = getPdpPainPairs(product.id, product)

  return (
    <section className="border-b border-border/70 bg-white py-10 sm:py-14 md:py-16">
      <div className="mx-auto max-w-6xl min-w-0 px-3 sm:px-6">
        <div className="mx-auto mb-8 max-w-3xl text-center md:mx-0 md:text-start">
          <p className="mb-2 text-[10px] font-black uppercase tracking-[0.22em] text-muted sm:text-xs">
            {painH.eyebrowAr ?? 'هل تعانين من هذه؟'}
          </p>
          <h2 className="text-xl font-black leading-snug text-charcoal sm:text-2xl md:text-3xl">
            {painH.titleAr ?? 'مشاكل تعرفينها — وحلول من الداخل'}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-charcoal sm:text-base">
            {painH.subtitleAr ?? 'مو نخفّف الأعراض. ندعم السبب — مكوّن لكل ألم.'}
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:gap-5">
          {pairs.map((pair, i) => (
            <article
              key={i}
              className="overflow-hidden rounded-2xl border border-border bg-[#fdfcfc] sm:rounded-3xl"
            >
              <blockquote
                className="border-b px-5 py-4 text-base font-semibold leading-relaxed text-charcoal sm:px-6 sm:py-5 sm:text-lg"
                style={{ borderColor: `${accent}22`, background: `${accent}06` }}
              >
                {pair.quote}
              </blockquote>
              <p className="px-5 py-4 text-sm leading-relaxed text-charcoal sm:px-6 sm:text-base">{pair.solution}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
