'use client'

type Props = {
  visible: boolean
  accentColor: string
  accentDeep: string
  onClick: () => void
}

/** شريط سفلي صغير — يظهر بعد ما يختفي قسم السعر من الشاشة */
export default function PdpStickyRoutineCta({ visible, accentColor, accentDeep, onClick }: Props) {
  return (
    <div
      aria-hidden={!visible}
      className={`fixed inset-x-0 bottom-0 z-20 transition-[transform,opacity] duration-300 ease-out motion-reduce:transition-none ${
        visible ? 'pointer-events-auto translate-y-0 opacity-100' : 'pointer-events-none translate-y-full opacity-0'
      }`}
    >
      <div className="border-t border-border/75 bg-white/94 px-4 pt-2 shadow-[0_-6px_28px_-10px_rgba(26,25,21,0.14)] backdrop-blur-md pb-[max(0.5rem,env(safe-area-inset-bottom))] supports-[backdrop-filter]:bg-white/88">
        <div className="mx-auto w-full max-w-6xl">
          <button
            type="button"
            onClick={onClick}
            tabIndex={visible ? 0 : -1}
            className="w-full touch-manipulation rounded-xl px-4 py-2.5 text-center text-[13px] font-extrabold leading-snug text-white shadow-sm transition-[transform,filter] active:scale-[0.99] sm:text-sm"
            style={{
              background: `linear-gradient(145deg, ${accentColor} 0%, ${accentDeep} 100%)`,
              boxShadow: `0 4px 16px -4px ${accentColor}55`,
            }}
          >
            ابدئي روتين شغّال الآن
          </button>
        </div>
      </div>
    </div>
  )
}
