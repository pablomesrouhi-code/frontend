'use client'

import { getOffers, formatSarCompact, type Product } from '@/lib/products'
import { useStorePricing } from '@/components/pricing/StorePricingProvider'
import { getProductSolidButtonStyle, STORE_BUTTON_COLOR } from '@/lib/product-accent'
import { openPdpCheckout } from '@/lib/pdp-checkout-event'

export default function PdpBottomOfferCta({ product }: { product: Product }) {
  useStorePricing()
  const accent = STORE_BUTTON_COLOR
  const offers = getOffers(product.format, product.id)

  return (
    <div className="mt-8 flex w-full flex-col gap-2.5">
      {offers.map((offer) => (
        <button
          key={offer.qty}
          type="button"
          onClick={() => openPdpCheckout(offer.qty)}
          className="flex min-h-[3.25rem] w-full items-center justify-between rounded-2xl border-2 bg-white px-4 py-3 text-right shadow-sm"
          style={{ borderColor: `${accent}55` }}
        >
          <span className="font-bold text-charcoal">
            {offer.label}
            {offer.badge ? ` · ${offer.badge}` : ''}
          </span>
          <span className="text-lg font-black tabular-nums" style={{ color: accent }}>
            {formatSarCompact(offer.price)}
          </span>
        </button>
      ))}
      <button
        type="button"
        onClick={() => openPdpCheckout()}
        className="mt-1 inline-flex min-h-[48px] w-full items-center justify-center rounded-2xl px-8 py-3.5 text-base font-black text-white shadow-lg"
        style={getProductSolidButtonStyle(accent)}
      >
        اطلبي الآن — اسم + جوال فقط
      </button>
    </div>
  )
}
