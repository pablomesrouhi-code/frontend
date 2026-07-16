import type { Product } from '@/lib/products'

type Props = {
  product: Product
  size?: 'card' | 'hero' | 'section'
  className?: string
}

/**
 * Elegant branded placeholder for products without real images yet.
 * Used by ProductCard and PDP sections for powder products.
 */
export default function PowderPlaceholder({ product, size = 'card', className = '' }: Props) {
  const sizing = {
    card: { minH: '240px', iconSize: 'h-24 w-24 text-5xl', titleSize: 'text-sm', subSize: 'text-[11px]' },
    hero: { minH: '420px', iconSize: 'h-32 w-32 text-6xl sm:h-40 sm:w-40 sm:text-7xl', titleSize: 'text-xl sm:text-2xl', subSize: 'text-sm' },
    section: { minH: '320px', iconSize: 'h-28 w-28 text-5xl sm:h-32 sm:w-32 sm:text-6xl', titleSize: 'text-lg sm:text-xl', subSize: 'text-xs sm:text-sm' },
  }[size]

  return (
    <div
      className={`relative flex h-full w-full flex-col items-center justify-center gap-5 overflow-hidden rounded-2xl p-6 ${className}`}
      style={{
        background: `linear-gradient(160deg, ${product.accentColor}10 0%, ${product.accentColor}05 50%, ${product.accentColor}10 100%)`,
        border: `1.5px solid ${product.accentColor}25`,
        minHeight: sizing.minH,
      }}
    >
      {/* Decorative blur — subtle, brand-tone */}
      <div className="pointer-events-none absolute inset-0 opacity-40" aria-hidden>
        <div className="absolute -end-10 -top-10 h-40 w-40 rounded-full blur-3xl" style={{ background: product.accentColor + '30' }} />
        <div className="absolute -bottom-10 -start-10 h-32 w-32 rounded-full blur-3xl" style={{ background: product.accentColor + '20' }} />
      </div>

      {/* Icon */}
      <div
        className={`relative flex items-center justify-center rounded-3xl shadow-sm ${sizing.iconSize}`}
        style={{
          background: `linear-gradient(145deg, ${product.accentColor}25 0%, ${product.accentColor}15 100%)`,
          border: `2px solid ${product.accentColor}30`,
        }}
      >
        🌿
      </div>

      {/* Text */}
      <div className="relative text-center">
        <p className={`font-black ${sizing.titleSize}`} style={{ color: product.accentColor }}>
          {product.nameAr}
        </p>
        <p className={`mt-1.5 text-[#5c5656] ${sizing.subSize}`}>صورة المنتج قادمة قريباً</p>
      </div>

      {/* Format chip */}
      <span
        className="relative rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-wider"
        style={{ background: 'white', color: product.accentColor, border: `1px solid ${product.accentColor}30` }}
      >
        عبوة مسحوق + مكيال
      </span>
    </div>
  )
}
