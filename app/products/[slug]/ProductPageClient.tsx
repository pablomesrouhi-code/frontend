'use client'
import dynamic from 'next/dynamic'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Product, getPriceForQty, formatSarRiial } from '@/lib/products'
import { useStorePricing } from '@/components/pricing/StorePricingProvider'
import OfferSelector from '@/components/product/OfferSelector'
import PdpStickyRoutineCta from '@/components/product/PdpStickyRoutineCta'
import { trackAddToCart, trackViewContent } from '@/lib/tracking/client'
import { STORE_BUTTON_COLOR, getProductSolidButtonStyle, shadeTowardBlack } from '@/lib/product-accent'
import { PDP_OPEN_CHECKOUT_EVENT } from '@/lib/pdp-checkout-event'
import { scrollToPdpForm } from '@/lib/pdp-scroll'

const PdpCodCheckout = dynamic(() => import('@/components/product/PdpCodCheckout'), { ssr: false })

export default function ProductPageClient({
  product,
  addToCartLabel = 'اطلبي الآن',
}: {
  product: Product
  addToCartLabel?: string
}) {
  useStorePricing()
  const [selectedQty, setSelectedQty] = useState<1 | 2 | 3>(1)
  const [showCheckout, setShowCheckout] = useState(false)
  const [stickyCtaVisible, setStickyCtaVisible] = useState(false)
  const priceBlockRef = useRef<HTMLDivElement>(null)
  const accent = STORE_BUTTON_COLOR
  const accentDeep = shadeTowardBlack(accent, 0.28)
  const soldOut = product.availability === 'sold_out'

  useEffect(() => {
    trackViewContent({
      content_ids: [product.id],
      value: getPriceForQty(1, product.id),
      currency: 'SAR',
    })
  }, [product.id])

  useEffect(() => {
    const onOpen = (e: Event) => {
      const qty = (e as CustomEvent<{ qty?: 1 | 2 | 3 }>).detail?.qty
      if (qty === 1 || qty === 2 || qty === 3) setSelectedQty(qty)
      if (!soldOut) setShowCheckout(true)
    }
    window.addEventListener(PDP_OPEN_CHECKOUT_EVENT, onOpen)
    return () => window.removeEventListener(PDP_OPEN_CHECKOUT_EVENT, onOpen)
  }, [soldOut])

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

  const openCheckout = useCallback(() => {
    if (soldOut) return
    trackAddToCart({
      content_ids: [product.id],
      value: getPriceForQty(selectedQty, product.id),
      currency: 'SAR',
      num_items: selectedQty,
    })
    setShowCheckout(true)
  }, [soldOut, product.id, selectedQty])

  return (
    <>
      <div
        ref={priceBlockRef}
        dir="rtl"
        className="relative min-w-0 max-w-full overflow-hidden rounded-2xl border-4 p-4 text-right shadow-[0_16px_48px_-18px_rgba(184,72,92,0.45)] sm:rounded-3xl sm:p-5"
        style={{
          borderColor: accent,
          background: `linear-gradient(180deg, color-mix(in srgb, ${accent} 14%, #fff) 0%, #fff 42%)`,
          boxShadow: `0 0 0 6px color-mix(in srgb, ${accent} 22%, transparent)`,
        }}
      >
        <p className="mb-3 text-center text-[11px] font-black tracking-wide sm:text-xs" style={{ color: accent }}>
          اطلبي هنا · اسم + جوال فقط · COD
        </p>
        <div className={soldOut ? 'pointer-events-none opacity-50' : undefined} aria-disabled={soldOut}>
          <OfferSelector
            selected={selectedQty}
            onChange={setSelectedQty}
            accentColor={accent}
            format={product.format}
            productId={product.id}
          />
        </div>

        <p className="mt-3 text-center text-[11px] font-semibold leading-relaxed text-muted sm:text-xs">
          دفع عند الاستلام · تأكيد هاتفي قبل الشحن · بدون بطاقة
        </p>

        <button
          onClick={openCheckout}
          disabled={soldOut}
          type="button"
          className="group relative mt-3 w-full overflow-hidden rounded-2xl px-4 py-4 text-sm font-extrabold text-white transition enabled:hover:brightness-105 enabled:active:translate-y-[1px] disabled:cursor-not-allowed disabled:bg-charcoal/70 sm:py-[1.1rem] sm:text-base md:text-lg"
          style={soldOut ? undefined : getProductSolidButtonStyle(accent)}
        >
          <span>
            {soldOut ? (
              'نفدت الكمية حالياً'
            ) : (
              <>
                {addToCartLabel} ·{' '}
                <span className="sar-price sar-price-dark tabular-nums">
                  {formatSarRiial(getPriceForQty(selectedQty, product.id))}
                </span>
              </>
            )}
          </span>
        </button>

        <p className="mt-2 text-center text-[11px] font-semibold text-muted sm:text-xs">
          {soldOut
            ? 'سيعود قريباً — هذا المنتج غير قابل للطلب الآن'
            : 'بعد الزر: اسم + جوال → تأكيد الطلب'}
        </p>
      </div>

      <PdpStickyRoutineCta
        visible={!soldOut && stickyCtaVisible}
        accentColor={accent}
        accentDeep={accentDeep}
        label={addToCartLabel}
        formattedPrice={formatSarRiial(getPriceForQty(selectedQty, product.id))}
        onClick={scrollToPdpForm}
      />

      {showCheckout && (
        <PdpCodCheckout product={product} qty={selectedQty} onClose={() => setShowCheckout(false)} />
      )}
    </>
  )
}
