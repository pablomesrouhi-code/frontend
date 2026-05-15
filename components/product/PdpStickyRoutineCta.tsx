'use client'

import type { CSSProperties } from 'react'

type Props = {
  visible: boolean
  accentColor: string
  accentDeep: string
  /** Prix affiché (ex. via formatSarAmount) — suit l’offre sélectionnée. */
  formattedPrice: string
  onClick: () => void
}

function ArrowUp({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 5v14M12 5l-5.5 5.5M12 5l5.5 5.5"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/** شريط سفلي صغير — يظهر بعد ما يختفي قسم السعر من الشاشة */
export default function PdpStickyRoutineCta({
  visible,
  accentColor,
  accentDeep,
  formattedPrice,
  onClick,
}: Props) {
  return (
    <div
      aria-hidden={!visible}
      className={`fixed inset-x-0 bottom-0 z-20 transition-[transform,opacity] duration-300 ease-out motion-reduce:transition-none ${
        visible ? 'pointer-events-auto translate-y-0 opacity-100' : 'pointer-events-none translate-y-full opacity-0'
      }`}
    >
      <div className="border-t border-border/75 bg-white/94 px-4 pt-1.5 shadow-[0_-6px_28px_-10px_rgba(26,25,21,0.14)] backdrop-blur-md pb-[max(0.5rem,env(safe-area-inset-bottom))] supports-[backdrop-filter]:bg-white/88">
        <div className="mx-auto w-full max-w-6xl">
          <button
            type="button"
            onClick={onClick}
            tabIndex={visible ? 0 : -1}
            className="flex w-full touch-manipulation flex-row items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-white shadow-sm transition-[transform,filter] active:scale-[0.99]"
            style={{
              background: `linear-gradient(145deg, ${accentColor} 0%, ${accentDeep} 100%)`,
              boxShadow: `0 4px 16px -4px ${accentColor}55`,
            }}
          >
            <span className="flex flex-col items-center gap-0.5 text-center">
              <span className="flex flex-row-reverse items-center justify-center gap-2">
                <span className="text-[13px] font-extrabold leading-snug sm:text-sm">
                  ابدئي روتين الشباب الآن
                </span>
                <ArrowUp className="h-4 w-4 shrink-0 opacity-95 pdp-cta-arrow-nudge" />
              </span>
              <span className="text-[11px] font-bold tabular-nums text-white/95 sm:text-xs">{formattedPrice}</span>
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}
