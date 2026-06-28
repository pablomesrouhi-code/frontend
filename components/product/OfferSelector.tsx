'use client'
import { getOffers, getPriceForQty, formatSarAmount } from '@/lib/products'
import { useStorePricing } from '@/components/pricing/StorePricingProvider'
import {
  getProductOfferActiveStyle,
  getProductOfferInactiveStyle,
  shadeTowardBlack,
} from '@/lib/product-accent'

function savingsForQty(qty: 1 | 2 | 3, unitCompare: number): number | null {
  if (qty === 1) return null
  const full = unitCompare * qty
  const offer = getOffers().find((o) => o.qty === qty)?.price
  if (offer == null) return null
  const s = full - offer
  return s > 0 ? s : null
}

type Props = {
  selected: 1 | 2 | 3
  onChange: (qty: 1 | 2 | 3) => void
  /** لون كل منتج (بطاقة رونق C، خفّة، ليل ماج…) */
  accentColor?: string
}

export default function OfferSelector({ selected, onChange, accentColor = '#b8485c' }: Props) {
  useStorePricing()
  const offers = getOffers()
  const priceActive = shadeTowardBlack(accentColor, 0.18)

  return (
    <div className="min-w-0 max-w-full">
      <div className="mb-5 flex flex-col gap-2 text-start sm:mb-6">
        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-charcoal sm:text-xs">
          اختيار العرض
        </p>
        <p className="text-base font-black leading-snug text-charcoal sm:text-lg md:text-xl md:leading-tight">
          أسعار واضحة — تختارين العرض قبل الطلب
        </p>
        <span
          className="ms-auto h-1 w-16 rounded-full sm:w-20"
          style={{ background: `linear-gradient(270deg, ${accentColor}, transparent)` }}
          aria-hidden
        />
      </div>
      <div className="flex min-w-0 flex-col gap-3 sm:gap-3.5">
        {offers.map((offer) => {
          const active = selected === offer.qty
          const save = savingsForQty(offer.qty, getPriceForQty(1))
          const multi = offer.qty > 1
          return (
            <button
              type="button"
              key={offer.qty}
              onClick={() => onChange(offer.qty)}
              className={`relative grid min-h-[4rem] grid-cols-[1fr_auto] items-center gap-x-4 gap-y-2 rounded-2xl border-2 px-4 py-4 text-start sm:min-h-[4.25rem] sm:rounded-3xl sm:px-5 sm:py-[1.125rem] ${
                active ? '' : 'hover:brightness-[0.99] active:scale-[0.99]'
              } cursor-pointer touch-manipulation overflow-hidden transition-[transform,box-shadow,border-color,background-color] duration-200 ease-out`}
              style={active ? getProductOfferActiveStyle(accentColor) : getProductOfferInactiveStyle(accentColor)}
            >
              {multi && (
                <span
                  className="offer-tier-glow-blob pointer-events-none absolute inset-y-3 end-3 z-0 h-8 w-8 rounded-full opacity-[0.14] blur-md sm:end-4 sm:h-9 sm:w-9"
                  style={{ background: accentColor }}
                  aria-hidden
                />
              )}
              {active && (
                <span
                  className="pointer-events-none absolute start-0 top-0 bottom-0 w-[4px]"
                  style={{ background: accentColor }}
                  aria-hidden
                />
              )}
              <div className="relative z-[1] flex min-w-0 items-center justify-end gap-3.5">
                <div
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-[2.5px] transition-colors sm:h-8 sm:w-8"
                  style={{
                    borderColor: active ? accentColor : '#d4cbc7',
                    background: active ? 'white' : 'transparent',
                    boxShadow: active ? `0 0 0 4px color-mix(in srgb, ${accentColor} 22%, transparent)` : undefined,
                  }}
                >
                  {active && (
                    <span
                      className="h-3.5 w-3.5 rounded-full transition-transform duration-200 scale-100 sm:h-4 sm:w-4"
                      style={{ background: accentColor }}
                    />
                  )}
                </div>
                <div className="flex min-w-0 flex-wrap items-center justify-end gap-x-2.5 gap-y-1.5">
                  <span
                    className="break-words text-start text-sm font-bold text-charcoal sm:text-base"
                  >
                    {offer.label}
                  </span>
                  {offer.badge && (
                    <span
                      className="offer-badge-shine relative shrink-0 overflow-hidden rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wide text-white shadow-sm sm:px-3 sm:py-1 sm:text-[11px]"
                      style={{
                        background: `linear-gradient(135deg, ${accentColor}, color-mix(in srgb, ${accentColor} 70%, #1a1a1a))`,
                      }}
                    >
                      <span className="relative z-[1]">{offer.badge}</span>
                    </span>
                  )}
                </div>
              </div>
              <div className="relative z-[1] flex min-w-[5.75rem] shrink-0 flex-col items-end justify-center gap-1.5 sm:min-w-[6.25rem]">
                <span
                  className="sar-price text-xl font-black tabular-nums whitespace-nowrap leading-none sm:text-2xl"
                  style={{ color: active ? priceActive : '#1C1C1C' }}
                >
                  {formatSarAmount(offer.price)}
                </span>
                {save != null && (
                  <span
                    className="max-w-full rounded-full px-2.5 py-1 text-end text-[10px] font-black leading-snug [overflow-wrap:anywhere] sm:text-[11px]"
                    style={{
                      background: `${accentColor}12`,
                      color: priceActive,
                      border: `1px solid ${accentColor}40`,
                    }}
                  >
                    وفّر <bdi className="tabular-nums font-black">{formatSarAmount(save)}</bdi>
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
