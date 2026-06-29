export default function PdpHeroTrustRow() {
  const items = [
    { icon: '💵', title: 'الدفع عند الاستلام', sub: 'بدون دفع أونلاين' },
    { icon: '🚚', title: 'توصيل 2–4 أيام', sub: 'كل مدن المملكة' },
    { icon: '↩️', title: 'ضمان 30 يوم', sub: 'استرجاع كامل' },
    { icon: '🛡️', title: 'مرخّص SFDA', sub: 'حلال · GMP' },
  ] as const

  return (
    <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-2.5">
      {items.map((item) => (
        <div
          key={item.title}
          className="rounded-xl border border-border/80 bg-white/90 px-2.5 py-2.5 text-center sm:rounded-2xl sm:px-3 sm:py-3"
        >
          <span className="text-base sm:text-lg" aria-hidden>
            {item.icon}
          </span>
          <p className="mt-1 text-[10px] font-bold leading-snug text-charcoal sm:text-[11px]">{item.title}</p>
          <p className="text-[9px] leading-snug text-muted sm:text-[10px]">{item.sub}</p>
        </div>
      ))}
    </div>
  )
}
