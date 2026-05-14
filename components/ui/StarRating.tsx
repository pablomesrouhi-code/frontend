type Props = { rating: number; count?: number; size?: 'sm' | 'md' }

export default function StarRating({ rating, count, size = 'md' }: Props) {
  const stars = Array.from({ length: 5 }, (_, i) => i + 1)
  const sz = size === 'sm' ? 'text-sm' : 'text-lg'
  return (
    <div className="flex items-center gap-1.5">
      <div className={`flex ${sz} [text-shadow:0_1px_1px_rgba(26,25,21,0.06)]`}>
        {stars.map((s) => (
          <span key={s} style={{ color: s <= Math.round(rating) ? '#c9937e' : '#D1D5DB' }}>
            ★
          </span>
        ))}
      </div>
      <span className="text-sm tabular-nums text-[#5c5656]">
        {rating.toFixed(1)}{count ? ` (${count} تقييم)` : ''}
      </span>
    </div>
  )
}
