'use client'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Product, getPriceForQty, formatSarRiial } from '@/lib/products'
import { useStorePricing } from '@/components/pricing/StorePricingProvider'
import { useCartStore } from '@/stores/cart-store'
import OfferSelector from '@/components/product/OfferSelector'
import PdpStickyRoutineCta from '@/components/product/PdpStickyRoutineCta'
import { trackAddToCart, trackViewContent } from '@/lib/tracking/client'
import { getProductSolidButtonStyle, shadeTowardBlack } from '@/lib/product-accent'

function CartIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M7 7h14l-1.5 9h-11L7 7zm0 0L5.5 3H2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm8 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"
        fill="currentColor"
      />
    </svg>
  )
}

export default function ProductPageClient({
  product,
  addToCartLabel = 'اطلبي الآن',
}: {
  product: Product
  addToCartLabel?: string
}) {
  useStorePricing()
  const [selectedQty, setSelectedQty] = useState<1 | 2 | 3>(3)
  const [stickyCtaVisible, setStickyCtaVisible] = useState(false)
  const priceBlockRef = useRef<HTMLDivElement>(null)
  const { addItem, openCart } = useCartStore()
  const accent = product.accentColor
  const accentDeep = shadeTowardBlack(accent, 0.28)
  const soldOut = product.availability === 'sold_out'

  useEffect(() => {
    trackViewContent({
      content_ids: [product.id],
      value: getPriceForQty(1),
      currency: 'SAR',
    })
  }, [product.id])

  useEffect(() => {
    const el = priceBlockRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return
        const scrolledPast = !entry.isIntersecting && entry.boundingClientRect.top < 0
        setStickyCtaVisible(scrolledPast)
      },
      { root: null, threshold: 0, rootMargin: '-8px 0px 0px 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const scrollToPrice = useCallback(() => {
    document.getElementById('pdp-buy-anchor')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [])

  function handleAdd() {
    if (soldOut) return
    addItem({
      productId: product.id,
      offerQty: selectedQty,
      price: getPriceForQty(selectedQty),
      nameAr: product.nameAr,
      accentColor: product.accentColor,
      bgColor: product.bgColor,
    })
    openCart()
    trackAddToCart({
      content_ids: [product.id],
      value: getPriceForQty(selectedQty),
      currency: 'SAR',
      num_items: selectedQty,
    })
  }

  return (
    <>
      <div
        ref={priceBlockRef}
        dir="rtl"
        className="relative min-w-0 max-w-full overflow-hidden rounded-2xl border bg-white p-4 text-right shadow-sm sm:rounded-3xl sm:p-5"
        style={{ borderColor: `${accent}33` }}
      >
        <div className={soldOut ? 'pointer-events-none opacity-50' : undefined} aria-disabled={soldOut}>
          <OfferSelector
            selected={selectedQty}
            onChange={setSelectedQty}
            accentColor={accent}
            format={product.format}
            rating={product.rating}
            reviewCount={product.reviewCount}
          />
        </div>

        <button
          onClick={handleAdd}
          disabled={soldOut}
          type="button"
          className="group relative mt-4 w-full overflow-hidden rounded-2xl px-4 py-4 text-sm font-extrabold text-white transition enabled:hover:brightness-105 enabled:active:translate-y-[1px] disabled:cursor-not-allowed disabled:bg-charcoal/70 sm:py-[1.1rem] sm:text-base md:text-lg"
          style={soldOut ? undefined : getProductSolidButtonStyle(accent)}
        >
          <span className="relative z-[1] flex items-center justify-center gap-3 flex-row-reverse">
            <CartIcon className="h-5 w-5 shrink-0 sm:h-6 sm:w-6" />
            <span>
              {soldOut ? (
                'نفدت الكمية حالياً'
              ) : (
                <>
                  {addToCartLabel} ·{' '}
                  <span className="sar-price sar-price-dark tabular-nums">
                    {formatSarRiial(getPriceForQty(selectedQty))}
                  </span>
                </>
              )}
            </span>
          </span>
        </button>

        <p className="mt-2 text-center text-[11px] font-semibold text-muted sm:text-xs">
          {soldOut ? 'سيعود قريباً — هذا المنتج غير قابل للطلب الآن' : 'الدفع عند الاستلام · بدون دفع أونلاين'}
        </p>

        <p className="mt-3 text-center text-[11px] leading-relaxed text-muted">
          <a
            href="/returns-refunds"
            className="font-semibold underline underline-offset-2"
            style={{ color: accent }}
          >
            تفاصيل الضمان والاسترجاع
          </a>
        </p>
      </div>

      <PdpStickyRoutineCta
        visible={!soldOut && stickyCtaVisible}
        accentColor={accent}
        accentDeep={accentDeep}
        label={addToCartLabel}
        formattedPrice={formatSarRiial(getPriceForQty(selectedQty))}
        onClick={scrollToPrice}
      />
    </>
  )
}
