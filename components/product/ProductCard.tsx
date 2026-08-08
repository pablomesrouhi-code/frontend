'use client'
import Image from 'next/image'
import Link from 'next/link'
import { Product, getPriceForQty, formatSarAmount, getFormatLabelAr, isPowderProduct } from '@/lib/products'
import { useStorePricing } from '@/components/pricing/StorePricingProvider'
import { STORE_BUTTON_COLOR, getProductSolidButtonStyle } from '@/lib/product-accent'
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
  /**
   * `store` = أزرار وعناوين بلون المتجر الموحّد (الهوم).
   * `product` = ألوان كل منتج (صفحات المنتج / الكتالوج).
   */
  tone?: 'product' | 'store'
}

function NewImageBanner({ product, accent }: { product: Product; accent: string }) {
  if (!product.isNew) return null
  const label = product.isBestSeller ? (product.featuredBadgeAr ?? 'الأكثر مبيعاً') : 'جديد'
  return (
    <div
      className="absolute inset-x-0 top-0 z-20 flex items-center justify-center py-1.5 shadow-sm sm:py-2"
      style={{ background: `linear-gradient(90deg, ${accent}ee, ${accent})` }}
    >
      <span className="text-[10px] font-black tracking-[0.12em] text-white sm:text-[11px]">🇸🇦 {label}</span>
    </div>
  )
}

function PriceBlock({ product, accent }: { product: Product; accent: string }) {
  useStorePricing()
  const priceOne = getPriceForQty(1, product.id)
  const priceThree = getPriceForQty(3, product.id)

  return (
    <div className="text-start">
      <p className="text-[11px] font-bold uppercase tracking-wide text-muted">سعر القطعة</p>
      <p className="text-3xl font-black tabular-nums sm:text-4xl" style={{ color: accent }}>
        <span className="sar-price">{formatSarAmount(priceOne)}</span>
      </p>
      <p className="mt-1 text-xs leading-snug" style={{ color: `${accent}bb` }}>
        3 قطع بـ <span className="font-bold" style={{ color: accent }}><span className="sar-price">{formatSarAmount(priceThree)}</span></span> من صفحة المنتج
      </p>
    </div>
  )
}

function BadgeRow({ product, accent, hideNewBadge }: { product: Product; accent: string; hideNewBadge?: boolean }) {
  return (
    <div className="flex flex-wrap items-center justify-end gap-2">
      {product.isNew && !hideNewBadge && (
        <span
          className="rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-white sm:px-3 sm:py-1.5 sm:text-xs"
          style={{ background: accent }}
        >
          جديد
        </span>
      )}
      <span
        className="rounded-full px-3 py-1.5 text-sm font-bold tracking-wide text-white"
        style={{ background: accent }}
      >
        {getFormatLabelAr(product)} · {product.badgeAr}
      </span>
    </div>
  )
}

function CtaRow({ product, accent }: { product: Product; accent: string }) {
  const soldOut = product.availability === 'sold_out'

  return (
    <Link
      href={`/products/${product.slug}`}
      className={`group/btn mt-auto flex min-h-[3rem] w-full touch-manipulation items-center justify-between rounded-2xl px-5 py-3.5 text-base font-bold text-white transition-[transform,filter,box-shadow] duration-200 ease-out motion-reduce:transition-none ${
        soldOut ? 'bg-charcoal/75' : 'hover:brightness-105 active:scale-[0.99] motion-reduce:active:scale-100'
      }`}
      style={soldOut ? undefined : getProductSolidButtonStyle(accent)}
      onClick={() => {
        if (soldOut) return
        trackAddToWishlist({
          content_ids: [product.id],
          value: getPriceForQty(1, product.id),
          currency: 'SAR',
        })
      }}
    >
      <span>{soldOut ? 'نفدت الكمية · عرض التفاصيل' : 'اطلبي من هنا'}</span>
      <span className="transition-transform group-hover/btn:-translate-x-1">←</span>
    </Link>
  )
}

export default function ProductCard({
  product,
  layout = 'grid',
  useHomeCardImage = false,
  showNewImageBanner = false,
  tone = 'product',
}: Props) {
  const accent = tone === 'store' ? STORE_BUTTON_COLOR : product.accentColor
  const isPowder = isPowderProduct(product)
  const cardImage =
    useHomeCardImage && product.homeCardImage ? product.homeCardImage : product.coverImage
  // Powder cards used to show a placeholder; once a packshot exists, always show it.
  const showCardPhoto =
    !isPowder || Boolean(product.homeCardImage) || Boolean(useHomeCardImage && product.coverImage)
  const imageBanner = showNewImageBanner && product.isNew
  const cardImageNode = (
    <>
      {imageBanner ? <NewImageBanner product={product} accent={accent} /> : null}
      <ProductSoldBadge product={product} hideFeatured={imageBanner} />
      <Image
        src={cardImage}
        alt={product.nameAr}
        fill
        sizes={layout === 'grid' ? '(max-width: 767px) 100vw, (max-width: 1199px) 50vw, 25vw' : '(max-width: 767px) 100vw, (max-width: 1200px) 45vw, 320px'}
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
          style={{ background: `linear-gradient(90deg, transparent, ${accent}66, transparent)` }}
          aria-hidden
        />

        <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-3 p-5 sm:p-5">
          <BadgeRow product={product} accent={accent} hideNewBadge={imageBanner} />

          <h3 className="break-words text-[1.25rem] font-bold leading-snug tracking-tight sm:text-2xl" style={{ color: accent }}>
            {product.nameAr}
          </h3>

          <p className="line-clamp-3 break-words text-sm leading-relaxed text-muted sm:text-base">{product.subtitleAr}</p>

          <CtaRow product={product} accent={accent} />
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
        style={{ background: `linear-gradient(90deg, transparent, ${accent}66, transparent)` }}
        aria-hidden
      />
      <div
        className="hidden w-[3px] shrink-0 self-stretch md:block"
        style={{ background: `linear-gradient(180deg, transparent, ${accent}55, transparent)` }}
        aria-hidden
      />

      <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-3 p-5 sm:gap-4 sm:p-6 md:py-7 md:ps-6 md:pe-7">
        <BadgeRow product={product} accent={accent} hideNewBadge={imageBanner} />

        <h3 className="break-words text-[1.35rem] font-bold leading-snug tracking-tight sm:text-2xl lg:text-[1.65rem]" style={{ color: accent }}>
          {product.nameAr}
        </h3>

        <div className="flex flex-wrap items-end justify-between gap-3 border-b border-border/80 pb-4">
          <PriceBlock product={product} accent={accent} />
        </div>

        <p className="line-clamp-3 break-words text-sm leading-relaxed text-muted sm:text-[15px]">{product.subtitleAr}</p>

        <CtaRow product={product} accent={accent} />
      </div>
    </article>
  )
}
