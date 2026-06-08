const TRUST_ITEMS = [
  { icon: '🇸🇦', label: 'للسعوديات — كل المناطق' },
  { icon: '💵', label: 'COD — كاش عند الباب' },
  { icon: '☎️', label: 'تأكيد على 05' },
  { icon: '🔬', label: 'SFDA · حلال' },
] as const

export default function HomeTrustStrip() {
  return (
    <section
      className="border-y border-[#006C35]/15 bg-gradient-to-r from-[#f0faf4] via-white to-[#fdf5f6]"
      aria-label="ثقة السوق السعودي"
    >
      <div className="mx-auto max-w-6xl px-4 py-3 sm:px-6 sm:py-4">
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          {TRUST_ITEMS.map((item) => (
            <span
              key={item.label}
              className="inline-flex items-center gap-2 text-xs font-bold text-[#1C1C1C] sm:text-sm"
            >
              <span aria-hidden>{item.icon}</span>
              {item.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
