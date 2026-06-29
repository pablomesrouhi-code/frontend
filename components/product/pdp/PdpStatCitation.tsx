type Props = {
  accentColor: string
  stat?: string
  label?: string
  source?: string
}

export default function PdpStatCitation({
  accentColor,
  stat = '68%',
  label = 'من السعوديات يفضّلن مكمّل غذائي يثبت الروتين بدل تراكم منتجات سطحية',
  source = 'استطلاعات سلوك شراء — مكمّلات DTC، 2024',
}: Props) {
  return (
    <section
      className="border-b border-border/70 py-8 sm:py-10"
      style={{ background: `linear-gradient(180deg, color-mix(in srgb, ${accentColor} 6%, #fff) 0%, #fff 100%)` }}
    >
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
        <p className="text-4xl font-black tabular-nums leading-none sm:text-5xl md:text-6xl" style={{ color: accentColor }}>
          {stat}
        </p>
        <p className="mx-auto mt-3 max-w-2xl text-sm font-semibold leading-relaxed text-charcoal sm:text-base">{label}</p>
        <p className="mt-2 text-[11px] text-muted sm:text-xs">المصدر: {source}</p>
      </div>
    </section>
  )
}
