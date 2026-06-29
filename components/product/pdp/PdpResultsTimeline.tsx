import type { Product } from '@/lib/products'
import { getPdpTimelineSteps } from '@/lib/pdp-content'
import { getPriceForQty, formatSarAmount } from '@/lib/products'

type Props = {
  accentColor: string
  product: Product
}

export default function PdpResultsTimeline({ accentColor, product }: Props) {
  const steps = getPdpTimelineSteps(product)
  const save3 = getPriceForQty(1) * 3 - getPriceForQty(3)

  return (
    <section
      className="border-b border-border/70 py-10 sm:py-14"
      style={{ background: `linear-gradient(180deg, color-mix(in srgb, ${accentColor} 5%, #fff) 0%, #fff 100%)` }}
    >
      <div className="mx-auto max-w-6xl min-w-0 px-3 sm:px-6">
        <div className="mb-8 max-w-3xl text-start">
          <p className="mb-2 text-[10px] font-black uppercase tracking-[0.22em] text-muted">النتيجة من العبوة الأولى</p>
          <h2 className="text-xl font-black text-charcoal sm:text-2xl md:text-3xl">
            وش راح تشوفين خلال أول 30 يوم؟
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-charcoal sm:text-base">
            {product.nameAr} — روتين يثبت أسبوع بأسبوع. النتيجة تختلف حسب الجسم والالتزام.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3 md:gap-5">
          {steps.map((step, i) => (
            <article key={step.title} className="relative rounded-2xl border border-border bg-white p-5 sm:rounded-3xl sm:p-6">
              <span
                className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl text-lg font-black text-white"
                style={{ background: accentColor }}
              >
                {i + 1}
              </span>
              <h3 className="text-base font-black text-charcoal sm:text-lg">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-charcoal">{step.body}</p>
            </article>
          ))}
        </div>

        {save3 > 0 && (
          <p className="mt-6 text-center text-sm font-semibold text-charcoal">
            العبوة الأولى تعطيك بداية النتيجة. العبوتان والثلاث تثبّتانها — ووفّري حتى{' '}
            <span className="tabular-nums font-black" style={{ color: accentColor }}>
              {formatSarAmount(save3)}
            </span>
            .
          </p>
        )}
      </div>
    </section>
  )
}
