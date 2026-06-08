import { Product, formatSoldCount } from '@/lib/products'

export default function ProductSoldBadge({ product }: { product: Product }) {
  if (!product.soldCount) return null

  return (
    <>
      {product.isBestSeller ? (
        <span className="absolute top-3 end-3 z-10 rounded-full bg-[#b8485c] px-2.5 py-1 text-[11px] font-bold text-white shadow-[0_4px_14px_-4px_rgba(184,72,92,0.65)] ring-1 ring-white/30">
          الأكثر مبيعاً
        </span>
      ) : null}
      <span
        dir="ltr"
        className="absolute top-3 start-3 z-10 rounded-full border border-white/70 bg-white/95 px-2.5 py-1 text-[11px] font-bold tabular-nums text-charcoal shadow-[0_4px_14px_-6px_rgba(26,25,21,0.18)] backdrop-blur-[2px]"
      >
        {formatSoldCount(product.soldCount)} مباع
      </span>
    </>
  )
}
