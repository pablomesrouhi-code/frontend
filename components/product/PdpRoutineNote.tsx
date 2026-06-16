'use client'

import { getPdpRoutineNote } from '@/lib/pdp-copy'
import type { Product } from '@/lib/products'

type Props = {
  productId: string
  format?: Product['format']
  accentColor: string
}

export default function PdpRoutineNote({ productId, format, accentColor }: Props) {
  const { titleAr, bodyAr } = getPdpRoutineNote(productId, format)

  return (
    <div
      role="note"
      className="rounded-2xl border border-black/[0.06] bg-white/65 px-4 py-3.5 text-start shadow-[inset_0_1px_0_rgba(255,255,255,0.92)] backdrop-blur-[2px] sm:rounded-[1.35rem] sm:px-5 sm:py-4"
    >
      <p className="text-[13px] font-extrabold leading-snug tracking-tight text-charcoal sm:text-sm">{titleAr}</p>
      <p className="mt-2 text-[12px] leading-[1.65] text-charcoal sm:text-[13px]">{bodyAr}</p>
      <span
        className="mt-3 block h-0.5 w-14 rounded-full sm:w-[4.25rem] ms-auto"
        style={{
          background: `linear-gradient(270deg, ${accentColor}, color-mix(in srgb, ${accentColor} 35%, transparent))`,
        }}
        aria-hidden
      />
    </div>
  )
}
