import type { Product } from '@/lib/products'
import { getPdpSectionHeadlines } from '@/lib/pdp-section-headlines'
import { getPdpComplianceNote } from '@/lib/pdp-copy'
import { getPdpHeroStats } from '@/lib/pdp-hero-stats'
import { isPowderProduct } from '@/lib/products'

type Props = {
  product: Product
}

export default function PdpHowToNama({ product }: Props) {
  const accent = product.accentColor
  const routineH = getPdpSectionHeadlines(product.id).routine ?? {}
  const complianceNote = getPdpComplianceNote(product.format)
  const powder = isPowderProduct(product)
  const stats = getPdpHeroStats(product)

  const routineStats = powder
    ? [
        { v: stats[0].value, l: 'ساشيه في العبوة' },
        { v: '1', l: 'ساشيه يومياً' },
        { v: stats[1].value, l: 'يوم لكل عبوة' },
        { v: '<60', l: 'ثانية باليوم' },
      ]
    : [
        { v: stats[0].value, l: 'علكة في العلبة' },
        { v: '2', l: 'علكات يومياً' },
        { v: stats[1].value, l: 'يوم لكل علبة' },
        { v: '<60', l: 'ثانية باليوم' },
      ]

  return (
    <section className="border-b border-border/70 bg-white py-10 sm:py-14">
      <div className="mx-auto max-w-4xl min-w-0 px-3 sm:px-6">
        <div className="mb-8 text-center">
          <p className="mb-2 text-[10px] font-black uppercase tracking-[0.22em] text-muted">طريقة الاستخدام</p>
          <h2 className="text-xl font-black text-charcoal sm:text-2xl md:text-3xl">
            {routineH.titleAr ?? 'أبسط روتين تقدرين تثبتينه'}
          </h2>
        </div>

        <div
          className="rounded-2xl p-5 sm:rounded-3xl sm:p-8"
          style={{ background: product.bgColor }}
        >
          <p className="text-center text-[15px] leading-relaxed text-charcoal sm:text-lg">{product.howToUse}</p>
          <p className="mt-4 rounded-2xl bg-white/70 px-4 py-3 text-sm leading-relaxed text-charcoal ring-1 ring-black/[0.04]">
            <strong className="text-charcoal">{complianceNote.lead}</strong> {complianceNote.rest}{' '}
            <strong className="text-charcoal">يختلف</strong> حسب الشخص والنوم والأكل والالتزام.
          </p>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {routineStats.map((s) => (
            <div key={s.l} className="rounded-xl border border-border bg-[#fdfcfc] py-4 text-center">
              <p className="text-2xl font-black tabular-nums" style={{ color: accent }}>
                {s.v}
              </p>
              <p className="mt-1 px-2 text-[11px] font-semibold leading-snug text-muted">{s.l}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
