'use client'

type Props = {
  /** Couleur d’accent du produit (coherence visuelle avec OfferSelector). */
  accentColor: string
}

/**
 * Réassurance CRO sur chaque PDP : routine matin + transparence prix avant confirmation.
 */
export default function PdpMorningRoutineNote({ accentColor }: Props) {
  return (
    <div
      role="note"
      className="rounded-2xl border border-black/[0.06] bg-white/65 px-4 py-3.5 text-start shadow-[inset_0_1px_0_rgba(255,255,255,0.92)] backdrop-blur-[2px] sm:rounded-[1.35rem] sm:px-5 sm:py-4"
    >
      <p className="text-[13px] font-extrabold leading-snug tracking-tight text-charcoal sm:text-sm">
        مكمّل صباحك — خطوة واضحة قبل الطلب
      </p>
      <p className="mt-2 text-[12px] leading-[1.65] text-muted sm:text-[13px]">
        العروض من خانة الطلب هنا أدناه، والسعر النهائي يظهر كاملاً على زر السلة قبل أي تأكيد، بدون غموض.
      </p>
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
