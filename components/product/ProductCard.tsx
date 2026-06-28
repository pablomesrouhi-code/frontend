'use client'
import Image from 'next/image'
import Link from 'next/link'
import { Product, getPriceForQty, formatSarAmount, getFormatLabelAr } from '@/lib/products'
import { useStorePricing } from '@/components/pricing/StorePricingProvider'
import { getProductSolidButtonStyle } from '@/lib/product-accent'
import { trackAddToWishlist } from '@/lib/tracking/client'
import ProductSoldBadge from '@/components/product/ProductSoldBadge'
import PowderPlaceholder from '@/components/product/PowderPlaceholder'

type Props = {
  product: Product
  /** `list` = صفحة المنتجات: صورة بجانب النص على الديسكتوب + سعر بارز. `grid` = بطاقة عمودية للصفحة الرئيسية وشبكات ضيقة */
  layout?: 'list' | 'grid'
  /** بطاقات cross-sell بصفحة المنتج — تعرض `homeCardImage` (OEM) إن وُجدت */
  useHomeCardImage?: boolean
  /** بانر «جديد» فوق الصورة */
  showNewImageBanner?: boolean
}

function NewImageBanner({ product }: { product: Product }) {
  if (!product.isNew) return null
  return (
    <div
      className="absolute inset-x-0 top-0 z-20 flex items-center justify-center py-1.5 shadow-sm sm:py-2"
      style={{ background: `linear-gradient(90deg, ${product.accentColor}ee, ${product.accentColor})` }}
    >
      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white sm:text-[11px]">جديد</span>
    </div>
  )
}

function PriceBlock({ product }: { product: Product }) {
  useStorePricing()
  const priceOne = getPriceForQty(1)
  const priceThree = getPriceForQty(3)

  return (
    <div className="text-start">
      <p className="text-[11px] font-bold uppercase tracking-wide text-muted">سعر القطعة</p>
      <p className="text-3xl font-black tabular-nums sm:text-4xl" style={{ color: product.accentColor }}>
        <span className="sar-price">{formatSarAmount(priceOne)}</span>
      </p>
      <p className="mt-1 text-xs leading-snug" style={{ color: `${product.accentColor}bb` }}>
        3 قطع بـ <span className="font-bold" style={{ color: product.accentColor }}><span className="sar-price">{formatSarAmount(priceThree)}</span></span> من صفحة المنتج
      </p>
    </div>
  )
}

function BadgeRow({ product, hideNewBadge }: { product: Product; hideNewBadge?: boolean }) {
  return (
    <div className="flex flex-wrap items-center justify-end gap-2">
      {product.isNew && !hideNewBadge && (
        <span
          className="rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-white sm:px-3 sm:py-1.5 sm:text-xs"
          style={{ background: product.accentColor }}
        >
          جديد
        </span>
      )}
      <span
        className="rounded-full px-3 py-1.5 text-sm font-bold tracking-wide text-white"
        style={{ background: product.accentColor }}
      >
        {getFormatLabelAr(product)} · {product.badgeAr}
      </span>
    </div>
  )
}

function CtaRow({ product }: { product: Product }) {
  const accent = product.accentColor

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group/btn mt-auto flex min-h-[3rem] w-full touch-manipulation items-center justify-between rounded-2xl px-5 py-3.5 text-base font-bold text-white transition-[transform,filter,box-shadow] duration-200 ease-out hover:brightness-105 active:scale-[0.99] motion-reduce:transition-none motion-reduce:active:scale-100"
      style={getProductSolidButtonStyle(accent)}
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

export default function ProductCard({ product, layout = 'grid', useHomeCardImage = false, showNewImageBanner = false }: Props) {
  const isPowder = product.format === 'powder_sachet'
  const cardImage = useHomeCardImage && product.homeCardImage ? product.homeCardImage : product.coverImage
  const showCardPhoto = !isPowder || Boolean(useHomeCardImage && product.homeCardImage)
  const imageBanner = showNewImageBanner && product.isNew
  const cardImageNode = (
    <>
      {imageBanner ? <NewImageBanner product={product} /> : null}
      <ProductSoldBadge product={product} />
      <Image
        src={cardImage}
        alt={product.nameAr}
        fill
        sizes={layout === 'grid' ? '(max-width: 767px) 100vw, 33vw' : '(max-width: 767px) 100vw, (max-width: 1200px) 45vw, 320px'}
        className="object-cover object-center"
      />
    </>
  )

  if (layout === 'grid') {
    return (
      <article className="group flex h-full min-w-0 flex-col overflow-hidden rounded-3xl border border-border/90 bg-white shadow-[0_2px_14px_-4px_rgba(26,25,21,0.06)] ring-1 ring-black/[0.02] transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_20px_48px_-14px_rgba(26,25,21,0.1)]">
        <Link href={`/products/${product.slug}`} className="relative block shrink-0 overflow-hidden bg-[#FAFAFA]">
          <div className="relative aspect-[4/5] w-full transition-transform duration-500 ease-out group-hover:scale-[1.03]">
            {!showCardPhoto ? (
              <PowderPlaceholder product={product} size="card" />
            ) : (
              cardImageNode
            )}
          </div>
        </Link>

        <div
          className="h-[3px] w-full shrink-0"
          style={{ background: `linear-gradient(90deg, transparent, ${product.accentColor}66, transparent)` }}
          aria-hidden
        />

        <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-3 p-5 sm:gap-4 sm:p-7">
          <BadgeRow product={product} hideNewBadge={imageBanner} />

          <h3 className="break-words text-[1.35rem] font-bold leading-snug tracking-tight sm:text-3xl md:text-[1.875rem]" style={{ color: product.accentColor }}>
            {product.nameAr}
          </h3>

          <p className="line-clamp-3 break-words text-sm leading-relaxed text-muted sm:text-base">{product.subtitleAr}</p>

          <CtaRow product={product} />
        </div>
      </article>
    )
  }

  return (
    <article className="group flex h-full min-w-0 flex-col overflow-hidden rounded-3xl border border-border/90 bg-white shadow-[0_2px_14px_-4px_rgba(26,25,21,0.06)] ring-1 ring-black/[0.02] transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_20px_48px_-14px_rgba(26,25,21,0.1)] md:flex-row md:items-stretch">
      <Link
        href={`/products/${product.slug}`}
        className="relative block w-full shrink-0 overflow-hidden bg-[#FAFAFA] md:w-[min(42%,280px)] md:max-w-[300px] md:self-stretch lg:w-[40%] lg:max-w-none"
      >
        <div className="relative aspect-[4/5] w-full transition-transform duration-500 ease-out group-hover:scale-[1.02] md:absolute md:inset-0 md:aspect-auto md:h-full md:min-h-[260px]">
          {!showCardPhoto ? (
            <PowderPlaceholder product={product} size="card" />
          ) : (
            cardImageNode
          )}
        </div>
      </Link>

      <div
        className="h-[3px] w-full shrink-0 md:hidden"
        style={{ background: `linear-gradient(90deg, transparent, ${product.accentColor}66, transparent)` }}
        aria-hidden
      />
      <div
        className="hidden w-[3px] shrink-0 self-stretch md:block"
        style={{ background: `linear-gradient(180deg, transparent, ${product.accentColor}55, transparent)` }}
        aria-hidden
      />

      <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-3 p-5 sm:gap-4 sm:p-6 md:py-7 md:ps-6 md:pe-7">
        <BadgeRow product={product} hideNewBadge={imageBanner} />

        <h3 className="break-words text-[1.35rem] font-bold leading-snug tracking-tight sm:text-2xl lg:text-[1.65rem]" style={{ color: product.accentColor }}>
          {product.nameAr}
        </h3>

        <div className="flex flex-wrap items-end justify-between gap-3 border-b border-border/80 pb-4">
          <PriceBlock product={product} />
        </div>

        <p className="line-clamp-3 break-words text-sm leading-relaxed text-muted sm:text-[15px]">{product.subtitleAr}</p>

        <CtaRow product={product} />
      </div>
    </article>
  )
}
