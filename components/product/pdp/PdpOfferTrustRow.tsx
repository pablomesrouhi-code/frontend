export default function PdpOfferTrustRow() {
  const items = [
    { icon: '💵', title: 'الدفع عند الاستلام', sub: 'بدون دفع أونلاين' },
    { icon: '🚚', title: 'توصيل 2–4 أيام', sub: 'كل مدن المملكة' },
    { icon: '↩️', title: 'ضمان 30 يوم', sub: 'استرجاع كامل' },
    { icon: '🛡️', title: 'مرخّص SFDA', sub: 'حلال · GMP' },
  ] as const

  return (
    <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-2">
      {items.map((item) => (
        <div
          key={item.title}
          className="rounded-xl border border-border/80 bg-white px-2 py-2.5 text-center sm:py-3"
        >
          <span className="text-sm" aria-hidden>
            {item.icon}
          </span>
          <p className="mt-0.5 text-[10px] font-bold leading-snug text-charcoal sm:text-[11px]">{item.title}</p>
          <p className="text-[9px] leading-snug text-muted">{item.sub}</p>
        </div>
      ))}
    </div>
  )
}
