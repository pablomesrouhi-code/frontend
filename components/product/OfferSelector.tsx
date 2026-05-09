'use client'
import { OFFERS } from '@/lib/products'

type Props = {
  selected: 1 | 2 | 3
  onChange: (qty: 1 | 2 | 3) => void
}

export default function OfferSelector({ selected, onChange }: Props) {
  return (
    <div className="flex flex-col gap-2 min-w-0 max-w-full">
      <p className="text-sm font-semibold text-[#1C1C1C] mb-1 break-words">اختاري العرض المناسب:</p>
      <div className="flex flex-col gap-2 min-w-0">
        {OFFERS.map((offer) => {
          const active = selected === offer.qty
          return (
            <button
              type="button"
              key={offer.qty}
              onClick={() => onChange(offer.qty)}
              className={`relative flex flex-wrap sm:flex-nowrap items-center justify-between gap-x-2 gap-y-2 rounded-xl border-2 px-3 py-3 sm:px-4 text-right transition-all cursor-pointer min-w-0 max-w-full ${
                active
                  ? 'border-[#b8485c] bg-[#f1e6e4]'
                  : 'border-gray-200 bg-white hover:border-[#b8485c]/40'
              }`}
            >
              <div className="flex items-center gap-2 min-w-0 flex-1 justify-end">
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                    active ? 'border-[#b8485c]' : 'border-gray-300'
                  }`}
                >
                  {active && <div className="w-2.5 h-2.5 rounded-full bg-[#b8485c]" />}
                </div>
                <span className="font-semibold text-[#1C1C1C] break-words text-right min-w-0">{offer.label}</span>
                {offer.badge && (
                  <span className="text-xs bg-[#b8485c] text-white px-2 py-0.5 rounded-full shrink-0 whitespace-nowrap">
                    {offer.badge}
                  </span>
                )}
              </div>
              <span className="font-bold text-[#b8485c] shrink-0 whitespace-nowrap ms-auto sm:ms-0">
                {offer.price} ريال
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
