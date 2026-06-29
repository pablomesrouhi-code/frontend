'use client'
import { getOffers, getPriceForQty, formatSarAmount } from '@/lib/products'
import { useStorePricing } from '@/components/pricing/StorePricingProvider'
import {
  getProductOfferActiveStyle,
  getProductOfferInactiveStyle,
  shadeTowardBlack,
} from '@/lib/product-accent'

function savingsForQty(qty: 1 | 2 | 3, unitCompare: number, isPowder: boolean): number | null {
  if (qty === 1) return null
  const full = unitCompare * qty
  const offer = getOffers(isPowder).find((o) => o.qty === qty)?.price
  if (offer == null) return null
  const s = full - offer
  return s > 0 ? s : null
}

type Props = {
  selected: 1 | 2 | 3
  onChange: (qty: 1 | 2 | 3) => void
  accentColor?: string
  isPowder?: boolean
}

export default function OfferSelector({
  selected,
  onChange,
  accentColor = '#b8485c',
  isPowder = false,
}: Props) {
  useStorePricing()
  const offers = getOffers(isPowder)
  const priceActive = shadeTowardBlack(accentColor, 0.18)

  return (
    <div className="min-w-0 max-w-full">
      <p className="mb-1 text-xs font-bold uppercase tracking-[0.14em] text-muted">نتيجة من العبوة الأولى</p>
      <p className="mb-3 text-sm font-bold text-charcoal sm:text-base">اختاري العرض:</p>
      <div className="flex min-w-0 flex-col gap-2.5 sm:gap-3">
        {offers.map((offer) => {
          const active = selected === offer.qty
          const save = savingsForQty(offer.qty, getPriceForQty(1), isPowder)
          return (
            <button
              type="button"
              key={offer.qty}
              onClick={() => onChange(offer.qty)}
              className={`relative grid min-h-[4.5rem] grid-cols-[1fr_auto] items-center gap-x-3 gap-y-1 rounded-2xl border-2 px-4 py-3.5 text-start sm:min-h-[4.75rem] sm:px-5 sm:py-4 ${
                active ? '' : 'hover:bg-white/80 active:scale-[0.99]'
              } cursor-pointer touch-manipulation overflow-hidden transition-[transform,box-shadow,border-color,background-color] duration-200`}
              style={active ? getProductOfferActiveStyle(accentColor) : getProductOfferInactiveStyle(accentColor)}
            >
              {active && (
                <span
                  className="pointer-events-none absolute start-0 top-0 bottom-0 w-[3px]"
                  style={{ background: accentColor }}
                  aria-hidden
                />
              )}
              <div className="relative z-[1] min-w-0 pe-2">
                <div className="flex flex-wrap items-center justify-end gap-x-2 gap-y-1">
                  <span className="text-sm font-bold text-charcoal sm:text-base">{offer.label}</span>
                  {offer.badge && (
                    <span
                      className="shrink-0 rounded-full px-2 py-0.5 text-[9px] font-black uppercase tracking-wide text-white sm:text-[10px]"
                      style={{ background: accentColor }}
                    >
                      {offer.badge}
                    </span>
                  )}
                </div>
                {offer.sublabel && (
                  <p className="mt-0.5 text-[11px] leading-snug text-muted sm:text-xs">{offer.sublabel}</p>
                )}
              </div>
              <div className="relative z-[1] flex shrink-0 flex-col items-end gap-1">
                <span
                  className="sar-price text-lg font-black tabular-nums whitespace-nowrap sm:text-xl"
                  style={{ color: active ? priceActive : '#1C1C1C' }}
                >
                  {formatSarAmount(offer.price)}
                </span>
                {save != null && (
                  <span
                    className="rounded-full px-2 py-0.5 text-[10px] font-black tabular-nums"
                    style={{
                      background: `${accentColor}12`,
                      color: priceActive,
                      border: `1px solid ${accentColor}40`,
                    }}
                  >
                    وفّري {formatSarAmount(save)}
                  </span>
                )}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
