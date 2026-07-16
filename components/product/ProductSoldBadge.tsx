import { Product, formatSoldCount } from '@/lib/products'

export default function ProductSoldBadge({ product }: { product: Product }) {
  if (!product.soldCount && !product.isBestSeller) return null

  return (
    <>
      {product.isBestSeller ? (
        <span className="absolute top-3 end-3 z-10 rounded-full px-2.5 py-1 text-[10px] font-bold text-white shadow ring-1 ring-white/30 sm:text-[11px]" style={{ background: product.accentColor, boxShadow: `0 4px 14px -4px ${product.accentColor}99` }}>
          🇸🇦 {product.featuredBadgeAr ?? 'الأكثر مبيعاً'}
        </span>
      ) : null}
      {product.soldCount ? (
        <span
          dir="ltr"
          className="absolute top-3 start-3 z-10 rounded-full border border-white/70 bg-white/95 px-2.5 py-1 text-[10px] font-bold tabular-nums text-charcoal shadow-[0_4px_14px_-6px_rgba(26,25,21,0.18)] backdrop-blur-[2px] sm:text-[11px]"
        >
          {formatSoldCount(product.soldCount)} مباع
        </span>
      ) : null}
    </>
  )
}
