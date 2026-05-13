'use client'
import { OFFERS, formatSarAmount } from '@/lib/products'

const UNIT_COMPARE = 199

function savingsForQty(qty: 1 | 2 | 3): number | null {
  if (qty === 1) return null
  const full = UNIT_COMPARE * qty
  const offer = OFFERS.find((o) => o.qty === qty)?.price
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
  return (
    <div className="min-w-0 max-w-full">
      <div className="mb-4 flex flex-col gap-1.5 text-right sm:mb-5 sm:gap-2">
        <p className="text-[10px] font-black uppercase tracking-[0.18em] sm:text-xs" style={{ color: accentColor }}>
          اختيار العرض
        </p>
        <p className="text-base font-black leading-snug text-charcoal sm:text-lg md:text-xl md:leading-tight">
          أسعار واضحة — تختارين العدد اللي يناسبك
        </p>
        <span
          className="ms-auto h-1 w-16 rounded-full sm:w-20"
          style={{ background: `linear-gradient(270deg, ${accentColor}, transparent)` }}
          aria-hidden
        />
      </div>
      <div className="flex min-w-0 flex-col gap-2.5 sm:gap-3">
        {OFFERS.map((offer) => {
          const active = selected === offer.qty
          const save = savingsForQty(offer.qty)
          return (
            <button
              type="button"
              key={offer.qty}
              onClick={() => onChange(offer.qty)}
              className={`relative flex min-h-[3.5rem] flex-wrap items-center justify-between gap-x-2.5 gap-y-2 rounded-2xl border-2 px-4 py-3 text-right sm:min-h-[3.75rem] sm:flex-nowrap sm:rounded-3xl sm:px-5 sm:py-4 ${
                active
                  ? 'shadow-[0_8px_30px_-8px_rgba(28,28,28,0.12),0_0_0_1px_rgba(255,255,255,0.85)_inset]'
                  : 'border-gray-200/90 bg-white/90 hover:border-gray-300 hover:bg-white hover:shadow-md active:scale-[0.99]'
              } cursor-pointer touch-manipulation overflow-hidden transition-all duration-300 ease-out`}
              style={
                active
                  ? {
                      borderColor: accentColor,
                      background: `linear-gradient(135deg, color-mix(in srgb, ${accentColor} 14%, white) 0%, color-mix(in srgb, ${accentColor} 6%, white) 100%)`,
                      boxShadow: `0 0 0 1px ${accentColor}44, 0 12px 40px -12px ${accentColor}55`,
                    }
                  : undefined
              }
            >
              {active && (
                <span
                  className="pointer-events-none absolute start-0 top-0 bottom-0 w-[4px]"
                  style={{ background: accentColor }}
                  aria-hidden
                />
              )}
              <div className="relative z-[1] flex min-w-0 flex-1 items-center justify-end gap-3.5">
                <div
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-[2.5px] transition-colors sm:h-7 sm:w-7"
                  style={{
                    borderColor: active ? accentColor : '#d4cbc7',
                    background: active ? 'white' : 'transparent',
                    boxShadow: active ? `0 0 0 4px color-mix(in srgb, ${accentColor} 22%, transparent)` : undefined,
                  }}
                >
                  {active && (
                    <span className="h-3 w-3 rounded-full transition-transform duration-200 scale-100 sm:h-3.5 sm:w-3.5" style={{ background: accentColor }} />
                  )}
                </div>
                <div className="flex min-w-0 flex-wrap items-center justify-end gap-x-2 gap-y-1">
                  <span className="break-words text-right text-sm font-bold text-[#1C1C1C] sm:text-base">{offer.label}</span>
                  {offer.badge && (
                    <span
                      className="shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wide text-white shadow-sm sm:px-3 sm:py-1 sm:text-[11px]"
                      style={{ background: `linear-gradient(135deg, ${accentColor}, color-mix(in srgb, ${accentColor} 70%, #1a1a1a))` }}
                    >
                      {offer.badge}
                    </span>
                  )}
                </div>
              </div>
              <div className="relative z-[1] ms-auto flex shrink-0 flex-col items-end gap-0.5 sm:ms-0">
                <span className="text-lg font-black tabular-nums whitespace-nowrap sm:text-xl" style={{ color: accentColor }}>
                  {formatSarAmount(offer.price)}
                </span>
                {save != null && (
                  <span className="rounded-full bg-emerald-600/12 px-2 py-0.5 text-[10px] font-black leading-snug text-emerald-900 ring-1 ring-emerald-600/30 sm:px-2.5 sm:text-[11px] sm:leading-snug">
                    وفّر {formatSarAmount(save)} عن نفس العدد لو اشتريتِه بالقطعة الواحدة
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
