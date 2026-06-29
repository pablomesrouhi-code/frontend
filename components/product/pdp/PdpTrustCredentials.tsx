type Props = {
  accentColor: string
  soldCount?: number
  reviewCount?: number
  rating?: number
}

const BADGES = [
  { key: 'sfda', title: 'SFDA', sub: 'هيئة الغذاء والدواء السعودية' },
  { key: 'gmp', title: 'GMP', sub: 'تصنيع طبي معتمد' },
  { key: 'halal', title: 'حلال', sub: 'مكمّلات غذائية واضحة' },
  { key: 'iso', title: 'ISO 22000', sub: 'سلامة غذائية دولية' },
] as const

export default function PdpTrustCredentials({
  accentColor,
  soldCount = 1200,
  reviewCount = 400,
  rating = 4.8,
}: Props) {
  return (
    <section className="border-b border-border/70 bg-white py-10 sm:py-14">
      <div className="mx-auto max-w-6xl min-w-0 px-3 sm:px-6">
        <div className="mb-8 max-w-3xl text-start">
          <p className="mb-2 text-[10px] font-black uppercase tracking-[0.22em] text-muted">الأمان والمصداقية</p>
          <h2 className="text-xl font-black text-charcoal sm:text-2xl md:text-3xl">تركيبة واضحة، مو وعود فاضية</h2>
          <p className="mt-3 text-sm leading-relaxed text-charcoal sm:text-base">
            مرخّصة من الجهات الرسمية، معتمدة على الغلاف، وشفافية قبل الطلب.
          </p>
        </div>

        <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {BADGES.map((b) => (
            <div
              key={b.key}
              className="rounded-2xl border border-border bg-[#fdfcfc] p-4 text-center sm:p-5"
            >
              <p className="text-lg font-black sm:text-xl" style={{ color: accentColor }}>
                {b.title}
              </p>
              <p className="mt-1 text-[11px] leading-snug text-muted sm:text-xs">{b.sub}</p>
            </div>
          ))}
        </div>

        <blockquote
          className="mb-8 rounded-2xl border p-5 sm:rounded-3xl sm:p-6"
          style={{ borderColor: `${accentColor}33`, background: `${accentColor}06` }}
        >
          <p className="text-sm leading-relaxed text-charcoal sm:text-base">
            «مكمّلات نبتة لابو مسجّلة كمكمّل غذائي — الجرعة والتخزين على الغلاف المعتمد. استشيري مختصًا إذا
            كنتِ حاملة أو على أدوية مزمنة.»
          </p>
          <footer className="mt-4 border-t border-border/70 pt-4">
            <p className="text-sm font-bold text-charcoal">فريق نبتة لابو</p>
            <p className="text-xs text-muted">مكمّل غذائي · SFDA · دفع عند الاستلام</p>
          </footer>
        </blockquote>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {[
            { v: 'SFDA', l: 'ترخيص رسمي' },
            { v: `${soldCount.toLocaleString('en-US')}+`, l: 'طلب مؤكّد' },
            { v: `${rating}★`, l: 'متوسط التقييم' },
            { v: '30 يوم', l: 'ضمان استرجاع' },
          ].map((s) => (
            <div key={s.l} className="rounded-xl bg-[#f4f1ef] px-3 py-4 text-center">
              <p className="text-xl font-black tabular-nums text-charcoal sm:text-2xl">{s.v}</p>
              <p className="mt-1 text-[11px] font-semibold text-muted">{s.l}</p>
            </div>
          ))}
        </div>
        {reviewCount > 0 && (
          <p className="mt-3 text-center text-[11px] text-muted sm:text-xs">
            بناءً على {reviewCount.toLocaleString('en-US')} تقييم معروض
          </p>
        )}
      </div>
    </section>
  )
}
