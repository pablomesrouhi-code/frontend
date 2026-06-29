import type { PdpHeroStat } from '@/lib/pdp-hero-stats'

type Props = {
  stats: PdpHeroStat[]
  accentColor: string
}

export default function PdpHeroStatPills({ stats, accentColor }: Props) {
  return (
    <div className="mb-4 grid grid-cols-2 gap-2 sm:mb-5 sm:grid-cols-4 sm:gap-2.5">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-xl border border-border/80 bg-white px-3 py-2.5 text-center shadow-sm sm:rounded-2xl sm:px-3.5 sm:py-3"
        >
          <p className="text-lg font-black tabular-nums leading-none text-charcoal sm:text-xl" style={{ color: accentColor }}>
            {stat.value}
          </p>
          <p className="mt-1 text-[10px] font-semibold leading-snug text-muted sm:text-[11px]">{stat.label}</p>
        </div>
      ))}
    </div>
  )
}
