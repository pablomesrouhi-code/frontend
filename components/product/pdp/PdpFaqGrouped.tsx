import type { Product } from '@/lib/products'
import { groupProductFaqs } from '@/lib/pdp-content'

type Props = {
  product: Product
  faqH: { eyebrowAr?: string; titleAr?: string; subtitleAr?: string }
}

export default function PdpFaqGrouped({ product, faqH }: Props) {
  const accent = product.accentColor
  const groups = groupProductFaqs(product)

  return (
    <section className="bg-white py-10 sm:py-12">
      <div className="mx-auto max-w-3xl min-w-0 px-3 sm:px-6">
        <p className="mb-2 text-center text-[10px] font-black uppercase tracking-[0.22em]" style={{ color: accent }}>
          {faqH.eyebrowAr ?? 'FAQ'}
        </p>
        <h2 className="mb-2 text-center text-xl font-black text-charcoal sm:text-2xl md:text-3xl">
          {faqH.titleAr ?? 'قبل ما تطلبين — كل اللي تحتاجين تعرفينه'}
        </h2>
        <p className="mx-auto mb-8 max-w-lg text-center text-sm leading-relaxed text-charcoal sm:mb-10">
          {faqH.subtitleAr ?? 'كل شيء تحتاجين معرفته قبل الدفع عند الاستلام.'}
        </p>

        <div className="flex flex-col gap-8">
          {groups.map((group) => (
            <div key={group.category}>
              <h3 className="mb-3 text-sm font-black text-charcoal sm:text-base">{group.category}</h3>
              <div className="flex flex-col gap-2.5">
                {group.items.map((faq) => (
                  <details key={faq.q} className="group overflow-hidden rounded-2xl border border-border bg-white">
                    <summary className="flex min-h-[3.25rem] cursor-pointer list-none items-center justify-between gap-3 px-4 py-4 text-sm font-semibold text-charcoal transition hover:bg-[#faf9f8] sm:px-6 sm:text-base">
                      <span className="min-w-0 flex-1 text-start leading-snug">{faq.q}</span>
                      <span
                        className="shrink-0 text-xs transition-transform duration-200 group-open:rotate-180 sm:text-sm"
                        style={{ color: accent }}
                      >
                        ▼
                      </span>
                    </summary>
                    <div className="border-t border-border px-4 pb-4 pt-1 text-sm leading-relaxed text-charcoal sm:px-6">
                      {faq.a}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
