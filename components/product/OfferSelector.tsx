'use client'
import { OFFERS } from '@/lib/products'

type Props = {
  selected: 1 | 2 | 3
  onChange: (qty: 1 | 2 | 3) => void
  /** لون كل منتج (بطاقة رونق C، خفّة، ليل ماج…) */
  accentColor?: string
}

export default function OfferSelector({ selected, onChange, accentColor = '#b8485c' }: Props) {
  return (
    <div className="min-w-0 max-w-full">
      <div className="mb-4 flex flex-col gap-2 text-right">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: accentColor }}>
          الأسعار الحالية
        </p>
        <p className="text-[15px] sm:text-base font-bold text-[#1C1C1C] leading-snug">اختاري العرض اللي يطابقكم</p>
        <span
          className="ms-auto h-[3px] w-12 rounded-full"
          style={{ background: `linear-gradient(270deg, ${accentColor}, transparent)` }}
          aria-hidden
        />
      </div>
      <div className="flex flex-col gap-2.5 min-w-0">
        {OFFERS.map((offer) => {
          const active = selected === offer.qty
          return (
            <button
              type="button"
              key={offer.qty}
              onClick={() => onChange(offer.qty)}
              className={`relative flex flex-wrap sm:flex-nowrap items-center justify-between gap-x-2 gap-y-2 rounded-2xl border-2 px-4 py-4 sm:py-3.5 min-h-[3.25rem] text-right cursor-pointer min-w-0 max-w-full touch-manipulation overflow-hidden transition-all duration-300 ease-out ${
                active
                  ? 'shadow-[0_8px_30px_-8px_rgba(28,28,28,0.12),0_0_0_1px_rgba(255,255,255,0.85)_inset]'
                  : 'border-gray-200/90 bg-white/90 hover:border-gray-300 hover:bg-white hover:shadow-md active:scale-[0.99]'
              }`}
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
              <div className="flex items-center gap-3 min-w-0 flex-1 justify-end relative z-[1]">
                <div
                  className="w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors"
                  style={{
                    borderColor: active ? accentColor : '#d4cbc7',
                    background: active ? 'white' : 'transparent',
                    boxShadow: active ? `0 0 0 3px color-mix(in srgb, ${accentColor} 22%, transparent)` : undefined,
                  }}
                >
                  {active && (
                    <span className="w-3 h-3 rounded-full transition-transform duration-200 scale-100" style={{ background: accentColor }} />
                  )}
                </div>
                <div className="flex flex-wrap items-center justify-end gap-x-2 gap-y-1 min-w-0">
                  <span className="font-bold text-[#1C1C1C] break-words text-right text-[15px] sm:text-base">{offer.label}</span>
                  {offer.badge && (
                    <span
                      className="text-[11px] font-bold uppercase tracking-wide text-white px-2.5 py-1 rounded-full shrink-0 shadow-sm"
                      style={{ background: `linear-gradient(135deg, ${accentColor}, color-mix(in srgb, ${accentColor} 70%, #1a1a1a))` }}
                    >
                      {offer.badge}
                    </span>
                  )}
                </div>
              </div>
              <span
                className="font-extrabold tabular-nums shrink-0 whitespace-nowrap text-lg sm:text-xl ms-auto sm:ms-0 relative z-[1]"
                style={{ color: accentColor }}
              >
                {offer.price}
                <span className="text-sm sm:text-base font-bold me-1">ريال</span>
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
