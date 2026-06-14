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

/** Gradient placeholder shown for products without a real image yet */
function PowderPlaceholder({ product }: { product: Product }) {
  return (
    <div
      className="flex h-full w-full flex-col items-center justify-center gap-3 px-6 py-10"
      style={{
        background: `linear-gradient(145deg, ${product.accentColor}18 0%, ${product.accentColor}08 100%)`,
        minHeight: '220px',
      }}
    >
      <div
        className="flex h-20 w-20 items-center justify-center rounded-3xl text-4xl shadow-lg"
        style={{ background: `${product.accentColor}22`, border: `1.5px solid ${product.accentColor}30` }}
      >
        🌿
      </div>
      <p className="text-center text-sm font-bold" style={{ color: product.accentColor }}>
        {product.nameAr}
      </p>
      <p className="text-center text-[11px] leading-snug text-[#5c5656]">
        الصورة الرسمية قادمة قريباً
      </p>
    </div>
  )
}

function FormatBadge({ product }: { product: Product }) {
  const isPowder = product.format === 'powder_sachet'
  return (
    <span
      className="rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wider"
      style={{
        background: isPowder ? `${product.accentColor}15` : '#f1e6e4',
        color: product.accentColor,
        border: `1px solid ${product.accentColor}30`,
      }}
    >
      {isPowder ? 'ساشيه مسحوق' : 'علكة'}
    </span>
  )
}

function CtaRow({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group/btn mt-auto flex min-h-[3rem] w-full touch-manipulation items-center justify-between rounded-2xl px-5 py-3.5 text-base font-bold transition-all duration-200 ease-out active:scale-[0.99]"
      style={{ background: product.accentColor, color: '#fff' }}
      onClick={() => {
        trackAddToWishlist({
          content_ids: [product.id],
          value: getPriceForQty(1),
          currency: 'SAR',
        })
      }}
    >
      <span>اكتشفي المنتج</span>
      <span className="transition-transform group-hover/btn:-translate-x-1">←</span>
    </Link>
  )
}

export default function ProductCard({ product, layout = 'grid', useHomeCardImage = false }: Props) {
  const isPowder = product.format === 'powder_sachet'
  const cardImage = useHomeCardImage && product.homeCardImage ? product.homeCardImage : product.coverImage

  if (layout === 'grid') {
    return (
      <article className="group flex h-full min-w-0 flex-col overflow-hidden rounded-3xl border bg-white shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl" style={{ borderColor: `${product.accentColor}22` }}>
        <Link href={`/products/${product.slug}`} className="relative block shrink-0 overflow-hidden bg-[#FAFAFA]">
          <div className="relative aspect-[4/5] w-full transition-transform duration-500 ease-out group-hover:scale-[1.03]">
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
        <div
          className="h-[3px] w-full shrink-0"
          style={{ background: `linear-gradient(90deg, transparent, ${product.accentColor}, transparent)` }}
          aria-hidden
        />

        <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-3 p-5 sm:gap-4 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <FormatBadge product={product} />
            <span
              className="rounded-full px-3 py-1 text-[11px] font-bold tracking-wide text-white"
              style={{ background: product.accentColor }}
            >
              {product.badgeAr}
            </span>
          </div>

          <h3 className="text-[1.35rem] font-black leading-snug text-[#1C1C1C] sm:text-2xl">
            {product.nameAr}
          </h3>

          <p className="line-clamp-3 text-sm leading-relaxed text-[#5c5656] sm:text-base">{product.subtitleAr}</p>

          {/* price row */}
          <div className="flex items-baseline gap-2 border-t border-[#f0ece8] pt-3">
            <p className="text-2xl font-black tabular-nums" style={{ color: product.accentColor }}>
              {formatSarAmount(getPriceForQty(1))}
            </p>
            <p className="text-xs text-[#5c5656]">/ قطعة</p>
          </div>

          <CtaRow product={product} />
        </div>
      </article>
    )
  }

  /* list layout */
  return (
    <article className="group flex h-full min-w-0 flex-col overflow-hidden rounded-3xl border bg-white shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-xl md:flex-row md:items-stretch" style={{ borderColor: `${product.accentColor}22` }}>
      <Link
        href={`/products/${product.slug}`}
        className="relative block w-full shrink-0 overflow-hidden bg-[#FAFAFA] md:w-[min(42%,280px)] md:self-stretch"
      >
        <div className="relative aspect-[4/5] w-full transition-transform duration-500 ease-out group-hover:scale-[1.02] md:absolute md:inset-0 md:aspect-auto md:h-full md:min-h-[260px]">
          {isPowder ? (
            <PowderPlaceholder product={product} />
          ) : (
            <>
              <ProductSoldBadge product={product} />
              <Image
                src={cardImage}
                alt={product.nameAr}
                fill
                sizes="(max-width: 767px) 100vw, (max-width: 1200px) 45vw, 320px"
                className="object-cover object-center"
              />
            </>
          )}
        </div>
      </Link>

      <div
        className="hidden w-[3px] shrink-0 self-stretch md:block"
        style={{ background: `linear-gradient(180deg, transparent, ${product.accentColor}55, transparent)` }}
        aria-hidden
      />

      <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-3 p-5 sm:gap-4 sm:p-6 md:py-7 md:ps-6 md:pe-7">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <FormatBadge product={product} />
          <span className="rounded-full px-3 py-1 text-[11px] font-bold tracking-wide text-white" style={{ background: product.accentColor }}>
            {product.badgeAr}
          </span>
        </div>

        <h3 className="text-[1.35rem] font-black leading-snug text-[#1C1C1C] sm:text-2xl">
          {product.nameAr}
        </h3>

        <div className="flex items-baseline gap-2 border-b border-[#f0ece8] pb-4">
          <p className="text-3xl font-black tabular-nums" style={{ color: product.accentColor }}>
            {formatSarAmount(getPriceForQty(1))}
          </p>
          <p className="text-xs text-[#5c5656]">/ قطعة · 3 قطع بـ {formatSarAmount(getPriceForQty(3))}</p>
        </div>

        <p className="line-clamp-3 text-sm leading-relaxed text-[#5c5656] sm:text-[15px]">{product.subtitleAr}</p>

        <CtaRow product={product} />
      </div>
    </article>
  )
}
