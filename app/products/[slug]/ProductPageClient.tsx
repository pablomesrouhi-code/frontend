'use client'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Product, getPriceForQty, formatSarAmount, isPowderProduct } from '@/lib/products'
import { useStorePricing } from '@/components/pricing/StorePricingProvider'
import { useCartStore } from '@/stores/cart-store'
import OfferSelector from '@/components/product/OfferSelector'
import PdpRoutineNote from '@/components/product/PdpRoutineNote'
import PdpStickyRoutineCta from '@/components/product/PdpStickyRoutineCta'
import PdpHeroTrustRow from '@/components/product/pdp/PdpHeroTrustRow'
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
  isPowder: isPowderProp,
}: {
  product: Product
  addToCartLabel?: string
  isPowder?: boolean
}) {
  useStorePricing()
  const isPowder = isPowderProp ?? isPowderProduct(product)
  const [selectedQty, setSelectedQty] = useState<1 | 2 | 3>(2)
  const [stickyCtaVisible, setStickyCtaVisible] = useState(false)
  const priceBlockRef = useRef<HTMLDivElement>(null)
  const { addItem, openCart } = useCartStore()
  const accent = product.accentColor
  const accentDeep = shadeTowardBlack(accent, 0.28)

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
        className="min-w-0 max-w-full rounded-2xl border border-border bg-white p-4 shadow-sm sm:rounded-3xl sm:p-5"
      >
        <OfferSelector
          selected={selectedQty}
          onChange={setSelectedQty}
          accentColor={accent}
          isPowder={isPowder}
        />

        <p className="mt-3 rounded-xl border border-dashed px-3 py-2 text-center text-[11px] font-semibold leading-snug text-charcoal sm:text-xs" style={{ borderColor: `${accent}44`, background: `${accent}06` }}>
          ⚡ الدفع عند الاستلام · تأكيد هاتفي خلال ساعات · شحن لجميع مدن المملكة
        </p>

        <PdpRoutineNote productId={product.id} format={product.format} accentColor={accent} />

        <button
          onClick={handleAdd}
          type="button"
          className="group relative mt-4 w-full overflow-hidden rounded-2xl px-4 py-4 text-sm font-extrabold text-white transition hover:brightness-105 active:translate-y-[1px] sm:py-[1.1rem] sm:text-base"
          style={getProductSolidButtonStyle(accent)}
        >
          <span className="relative z-[1] flex items-center justify-center gap-3 flex-row-reverse">
            <CartIcon className="h-5 w-5 shrink-0 sm:h-6 sm:w-6" />
            <span>
              {addToCartLabel} ·{' '}
              <span className="sar-price sar-price-dark tabular-nums">
                {formatSarAmount(getPriceForQty(selectedQty))}
              </span>
            </span>
          </span>
        </button>

        <p className="mt-2 text-center text-[11px] font-semibold text-muted sm:text-xs">
          الدفع عند الاستلام · بدون دفع أونلاين
        </p>

        <PdpHeroTrustRow />

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
        visible={stickyCtaVisible}
        accentColor={accent}
        accentDeep={accentDeep}
        label={addToCartLabel}
        formattedPrice={formatSarAmount(getPriceForQty(selectedQty))}
        onClick={scrollToPrice}
      />
    </>
  )
}
