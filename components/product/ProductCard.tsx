'use client'
import Image from 'next/image'
import Link from 'next/link'
import { Product, getPriceForQty, formatSarAmount } from '@/lib/products'
import { trackAddToWishlist } from '@/lib/tracking/client'
import ProductSoldBadge from '@/components/product/ProductSoldBadge'

type Props = {
  product: Product
  layout?: 'list' | 'grid'
  useHomeCardImage?: boolean
}

function PowderPlaceholder({ product }: { product: Product }) {
  return (
    <div
      className="flex h-full w-full flex-col items-center justify-center gap-4 px-6 py-14"
      style={{ background: `linear-gradient(160deg, ${product.accentColor}12 0%, ${product.accentColor}06 100%)`, minHeight: '240px' }}
    >
      <div
        className="flex h-24 w-24 items-center justify-center rounded-3xl text-5xl shadow-sm"
        style={{ background: `${product.accentColor}18`, border: `2px solid ${product.accentColor}25` }}
      >
        🌿
      </div>
      <div className="text-center">
        <p className="text-sm font-black" style={{ color: product.accentColor }}>{product.nameAr}</p>
        <p className="mt-1 text-[11px] text-[#5c5656]">صورة المنتج قادمة قريباً</p>
      </div>
    </div>
  )
}

export default function ProductCard({ product, layout = 'grid', useHomeCardImage = false }: Props) {
  const isPowder = product.format === 'powder_sachet'
  const cardImage = useHomeCardImage && product.homeCardImage ? product.homeCardImage : product.coverImage

  const handleClick = () => {
    trackAddToWishlist({
      content_ids: [product.id],
      value: getPriceForQty(1),
      currency: 'SAR',
    })
  }

  if (layout === 'grid') {
    return (
      <article
        className="group flex h-full min-w-0 flex-col overflow-hidden rounded-3xl bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
        style={{ border: `1.5px solid ${product.accentColor}20`, boxShadow: '0 2px 16px -4px rgba(28,28,28,0.06)' }}
      >
        {/* image */}
        <Link href={`/products/${product.slug}`} className="relative block shrink-0 overflow-hidden" style={{ background: `${product.accentColor}08` }}>
          <div className="relative aspect-[4/5] w-full overflow-hidden transition-transform duration-500 ease-out group-hover:scale-[1.02]">
            {isPowder ? (
              <PowderPlaceholder product={product} />
            ) : (
              <>
                <ProductSoldBadge product={product} />
                <Image
                  src={cardImage}
                  alt={product.nameAr}
                  fill
                  sizes="(max-width: 767px) 100vw, 33vw"
                  className="object-cover object-center"
                />
              </>
            )}
          </div>
        </Link>

        {/* accent line */}
        <div className="h-[3px] w-full shrink-0" style={{ background: `linear-gradient(90deg, transparent, ${product.accentColor}, transparent)` }} aria-hidden />

        {/* body */}
        <div className="flex min-h-0 flex-1 flex-col gap-3 p-5 sm:p-6">
          {/* format + badge */}
          <div className="flex items-center justify-between gap-2">
            <span
              className="rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider"
              style={{ background: `${product.accentColor}12`, color: product.accentColor, border: `1px solid ${product.accentColor}25` }}
            >
              {isPowder ? 'ساشيه مسحوق' : 'علكة'}
            </span>
            <span className="rounded-full px-3 py-1 text-[11px] font-bold text-white" style={{ background: product.accentColor }}>
              {product.badgeAr}
            </span>
          </div>

          {/* name */}
          <h3 className="text-xl font-black leading-snug text-[#1C1C1C] sm:text-2xl">{product.nameAr}</h3>

          {/* subtitle */}
          <p className="line-clamp-2 text-sm leading-relaxed text-[#5c5656]">{product.subtitleAr}</p>

          {/* price */}
          <div className="mt-auto flex items-baseline gap-1.5 border-t border-[#f0ece8] pt-4">
            <span className="text-2xl font-black tabular-nums" style={{ color: product.accentColor }}>
              {formatSarAmount(getPriceForQty(1))}
            </span>
          </div>

          {/* CTA */}
          <Link
            href={`/products/${product.slug}`}
            onClick={handleClick}
            className="flex min-h-[3rem] w-full items-center justify-between rounded-2xl px-5 py-3 text-sm font-black text-white transition hover:brightness-105"
            style={{ background: product.accentColor }}
          >
            <span>اكتشفي المنتج</span>
            <span>←</span>
          </Link>
        </div>
      </article>
    )
  }

  /* list layout */
  return (
    <article
      className="group flex h-full min-w-0 flex-col overflow-hidden rounded-3xl bg-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg md:flex-row md:items-stretch"
      style={{ border: `1.5px solid ${product.accentColor}20`, boxShadow: '0 2px 16px -4px rgba(28,28,28,0.06)' }}
    >
      {/* image */}
      <Link
        href={`/products/${product.slug}`}
        className="relative block w-full shrink-0 overflow-hidden md:w-[min(42%,260px)] md:self-stretch"
        style={{ background: `${product.accentColor}08` }}
      >
        <div className="relative aspect-[4/5] w-full transition-transform duration-500 ease-out group-hover:scale-[1.02] md:absolute md:inset-0 md:aspect-auto md:h-full md:min-h-[220px]">
          {isPowder ? (
            <PowderPlaceholder product={product} />
          ) : (
            <>
              <ProductSoldBadge product={product} />
              <Image
                src={cardImage}
                alt={product.nameAr}
                fill
                sizes="(max-width: 767px) 100vw, (max-width: 1200px) 45vw, 280px"
                className="object-cover object-center"
              />
            </>
          )}
        </div>
      </Link>

      {/* divider */}
      <div className="hidden w-[2px] shrink-0 self-stretch md:block" style={{ background: `linear-gradient(180deg, transparent, ${product.accentColor}40, transparent)` }} aria-hidden />

      {/* body */}
      <div className="flex min-w-0 flex-1 flex-col gap-3 p-5 sm:p-6 md:py-7">
        <div className="flex items-center justify-between gap-2">
          <span className="rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider" style={{ background: `${product.accentColor}12`, color: product.accentColor, border: `1px solid ${product.accentColor}25` }}>
            {isPowder ? 'ساشيه مسحوق' : 'علكة'}
          </span>
          <span className="rounded-full px-3 py-1 text-[11px] font-bold text-white" style={{ background: product.accentColor }}>
            {product.badgeAr}
          </span>
        </div>

        <h3 className="text-xl font-black leading-snug text-[#1C1C1C] sm:text-2xl">{product.nameAr}</h3>

        <div className="flex items-baseline gap-2 border-b border-[#f0ece8] pb-4">
          <span className="text-2xl font-black tabular-nums" style={{ color: product.accentColor }}>
            {formatSarAmount(getPriceForQty(1))}
          </span>
          <span className="text-xs text-[#5c5656]">/ قطعة · 3 قطع بـ {formatSarAmount(getPriceForQty(3))}</span>
        </div>

        <p className="line-clamp-3 text-sm leading-relaxed text-[#5c5656]">{product.subtitleAr}</p>

        <Link
          href={`/products/${product.slug}`}
          onClick={handleClick}
          className="mt-auto flex min-h-[3rem] items-center justify-between rounded-2xl px-5 py-3 text-sm font-black text-white transition hover:brightness-105"
          style={{ background: product.accentColor }}
        >
          <span>اكتشفي المنتج</span>
          <span>←</span>
        </Link>
      </div>
    </article>
  )
}
