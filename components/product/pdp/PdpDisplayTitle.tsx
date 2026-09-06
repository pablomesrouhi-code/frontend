type Props = {
  eyebrow?: string
  before: string
  highlight: string
  after?: string
  sub?: string
  color: string
  as?: 'h1' | 'h2'
  size?: 'hero' | 'section'
  align?: 'start' | 'center'
}

export default function PdpDisplayTitle({
  eyebrow,
  before,
  highlight,
  after,
  sub,
  color,
  as = 'h2',
  size = 'section',
  align = 'start',
}: Props) {
  const Tag = as
  const hero = size === 'hero'
  const center = align === 'center'

  return (
    <div className={center ? 'text-center' : 'text-start'}>
      {eyebrow ? (
        <p
          className="mb-2.5 inline-flex items-center gap-2 text-[11px] font-black tracking-[0.18em] sm:text-xs"
          style={{ color }}
        >
          <span className="h-px w-6 sm:w-8" style={{ background: color }} aria-hidden />
          {eyebrow}
        </p>
      ) : null}

      <Tag
        id={as === 'h1' ? 'pdp-hook' : undefined}
        className={
          hero
            ? 'scroll-mt-[calc(5.5rem+env(safe-area-inset-top))] text-[2.15rem] font-black leading-[1.08] tracking-tight text-charcoal sm:text-[2.75rem] sm:leading-[1.05] md:text-[3.2rem]'
            : 'text-xl font-black leading-[1.15] tracking-tight text-charcoal sm:text-2xl md:text-[1.85rem]'
        }
      >
        {before}{' '}
        <span
          className="inline box-decoration-clone px-1.5 py-0.5"
          style={{
            color,
            background: `linear-gradient(180deg, transparent 62%, color-mix(in srgb, ${color} 28%, transparent) 62%)`,
          }}
        >
          {highlight}
        </span>
        {after ? <> {after}</> : null}
      </Tag>

      <span
        className={`mt-3 block h-1 rounded-full ${center ? 'mx-auto' : ''}`}
        style={{
          width: hero ? '4.5rem' : '3rem',
          background: `linear-gradient(90deg, ${color}, color-mix(in srgb, ${color} 20%, transparent))`,
        }}
        aria-hidden
      />

      {sub ? (
        <p
          className={
            hero
              ? 'mt-3.5 max-w-xl text-[1.05rem] font-semibold leading-snug text-charcoal/85 sm:text-xl'
              : 'mt-3 max-w-2xl text-sm leading-relaxed text-charcoal/80 sm:text-base'
          }
        >
          {sub}
        </p>
      ) : null}
    </div>
  )
}
