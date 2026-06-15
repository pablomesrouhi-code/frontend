'use client'
import Image from 'next/image'
import Link from 'next/link'
import { Product, getPriceForQty, formatSarAmount } from '@/lib/products'
import { trackAddToWishlist } from '@/lib/tracking/client'
import ProductSoldBadge from '@/components/product/ProductSoldBadge'
import PowderPlaceholder from '@/components/product/PowderPlaceholder'

type Props = {
  product: Product
  /** `list` = صفحة المنتجات: صورة بجانب النص على الديسكتوب + سعر بارز. `grid` = بطاقة عمودية للصفحة الرئيسية وشبكات ضيقة */
  layout?: 'list' | 'grid'
  /** بطاقات cross-sell بصفحة المنتج — تعرض `homeCardImage` (OEM) إن وُجدت */
  useHomeCardImage?: boolean
}

function PriceBlock({ product }: { product: Product }) {
  const priceOne = getPriceForQty(1)
  const priceThree = getPriceForQty(3)

  return (
    <div className="text-start">
      <p className="text-[11px] font-bold uppercase tracking-wide text-muted">سعر القطعة</p>
      <p className="text-3xl font-black tabular-nums sm:text-4xl" style={{ color: product.accentColor }}>
        <span className="sar-price">{formatSarAmount(priceOne)}</span>
      </p>
      <p className="mt-1 text-xs leading-snug text-muted">
        3 قطع بـ <span className="font-bold text-charcoal"><span className="sar-price">{formatSarAmount(priceThree)}</span></span> من صفحة المنتج
      </p>
    </div>
  )
}

function shadeTowardBlack(hex: string, t: number) {
  const h = hex.replace('#', '')
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h
  const n = parseInt(full, 16)
  const r = (n >> 16) & 255
  const g = (n >> 8) & 255
  const b = n & 255
  const mix = (c: number) => Math.round(c * (1 - t))
  return `#${[mix(r), mix(g), mix(b)].map((x) => x.toString(16).padStart(2, '0')).join('')}`
}

function CtaRow({ product, variant = 'solid' }: { product: Product; variant?: 'solid' | 'outline' }) {
  const accent = product.accentColor
  const accentDeep = shadeTowardBlack(accent, 0.18)

  if (variant === 'outline') {
    return (
      <Link
        href={`/products/${product.slug}`}
        className="group/btn mt-auto flex min-h-[3rem] w-full touch-manipulation items-center justify-between rounded-2xl px-5 py-3.5 text-base font-bold transition-[color,background-color,border-color,transform] duration-200 ease-out active:scale-[0.99] motion-reduce:transition-none motion-reduce:active:scale-100"
        style={{ background: '#FFFFFF', color: accent, border: `2px solid ${accent}44` }}
        onClick={() => {
          trackAddToWishlist({
            content_ids: [product.id],
            value: getPriceForQty(1),
            currency: 'SAR',
          })
        }}
        onMouseEnter={(e) => {
          ;(e.currentTarget as HTMLElement).style.background = accent
          ;(e.currentTarget as HTMLElement).style.color = '#fff'
        }}
        onMouseLeave={(e) => {
          ;(e.currentTarget as HTMLElement).style.background = '#FFFFFF'
          ;(e.currentTarget as HTMLElement).style.color = accent
        }}
      >
        <span>اكتشفي المنتج</span>
        <span className="transition-transform group-hover/btn:-translate-x-1">←</span>
      </Link>
    )
  }

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group/btn mt-auto flex min-h-[3rem] w-full touch-manipulation items-center justify-between rounded-2xl px-5 py-3.5 text-base font-bold text-white transition-[transform,filter,box-shadow] duration-200 ease-out hover:brightness-105 active:scale-[0.99] motion-reduce:transition-none motion-reduce:active:scale-100"
      style={{
        background: `linear-gradient(145deg, ${accent} 0%, ${accentDeep} 100%)`,
        border: `2px solid ${accent}`,
        boxShadow: `0 6px 20px -4px ${accent}66`,
      }}
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
  const showCardPhoto = !isPowder || Boolean(useHomeCardImage && product.homeCardImage)
  const cardImageNode = (
    <>
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
      <article className="group flex h-full min-w-0 flex-col overflow-hidden rounded-3xl border border-border/90 bg-white shadow-[0_2px_14px_-4px_rgba(26,25,21,0.06)] ring-1 ring-black/[0.02] transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-1 hover:border-authority/25 hover:shadow-[0_20px_48px_-14px_rgba(20,107,112,0.13)]">
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
          <div className="flex flex-wrap items-center justify-end gap-2">
            <span
              className="rounded-full px-3 py-1.5 text-sm font-bold tracking-wide text-white"
              style={{ background: product.accentColor }}
            >
              {product.badgeAr}
            </span>
          </div>

          <h3 className="break-words text-[1.35rem] font-bold leading-snug tracking-tight text-charcoal sm:text-3xl md:text-[1.875rem]">
            {product.nameAr}
          </h3>

          <p className="line-clamp-3 break-words text-sm leading-relaxed text-muted sm:text-base">{product.subtitleAr}</p>

          <CtaRow product={product} />
        </div>
      </article>
    )
  }

  return (
    <article className="group flex h-full min-w-0 flex-col overflow-hidden rounded-3xl border border-border/90 bg-white shadow-[0_2px_14px_-4px_rgba(26,25,21,0.06)] ring-1 ring-black/[0.02] transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-1 hover:border-authority/25 hover:shadow-[0_20px_48px_-14px_rgba(20,107,112,0.13)] md:flex-row md:items-stretch">
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
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span
            className="rounded-full px-3 py-1.5 text-sm font-bold tracking-wide text-white"
            style={{ background: product.accentColor }}
          >
            {product.badgeAr}
          </span>
        </div>

        <h3 className="break-words text-[1.35rem] font-bold leading-snug tracking-tight text-charcoal sm:text-2xl lg:text-[1.65rem]">
          {product.nameAr}
        </h3>

        <div className="flex flex-wrap items-end justify-between gap-3 border-b border-border/80 pb-4">
          <PriceBlock product={product} />
        </div>

        <p className="line-clamp-3 break-words text-sm leading-relaxed text-muted sm:text-[15px]">{product.subtitleAr}</p>

        <CtaRow product={product} variant="outline" />
      </div>
    </article>
  )
}
