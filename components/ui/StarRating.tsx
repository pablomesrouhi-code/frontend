type Props = { rating: number; count?: number; size?: 'sm' | 'md' }

export default function StarRating({ rating, count, size = 'md' }: Props) {
  const stars = Array.from({ length: 5 }, (_, i) => i + 1)
  const sz = size === 'sm' ? 'text-sm' : 'text-lg'
  return (
    <div className="flex items-center gap-1">
      <div className={`flex ${sz}`}>
        {stars.map((s) => (
          <span key={s} style={{ color: s <= Math.round(rating) ? '#c9937e' : '#D1D5DB' }}>
            ★
          </span>
        ))}
      </div>
      <span className="text-sm text-[#5c5656]">
        {rating.toFixed(1)}{count ? ` (${count} تقييم)` : ''}
      </span>
    </div>
  )
}
