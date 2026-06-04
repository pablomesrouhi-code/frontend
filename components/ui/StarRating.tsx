type Props = { rating: number; count?: number; size?: 'sm' | 'md' | 'lg' }

export default function StarRating({ rating, count, size = 'md' }: Props) {
  const stars = Array.from({ length: 5 }, (_, i) => i + 1)
  const starClass =
    size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-2xl sm:text-3xl' : 'text-lg'
  const labelClass =
    size === 'lg' ? 'text-base font-semibold tabular-nums text-[#5c5656] sm:text-lg' : 'text-sm tabular-nums text-[#5c5656]'
  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className={`flex gap-0.5 ${starClass} [text-shadow:0_1px_1px_rgba(26,25,21,0.06)]`} aria-hidden>
        {stars.map((s) => (
          <span key={s} style={{ color: s <= Math.round(rating) ? '#c9937e' : '#D1D5DB' }}>
            ★
          </span>
        ))}
      </div>
      <span className={labelClass}>
        {rating.toFixed(1)}
        {count ? ` (${count} تقييم)` : ''}
      </span>
    </div>
  )
}
