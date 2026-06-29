type Props = {
  accentColor: string
}

export default function PdpGuarantee({ accentColor }: Props) {
  const steps = [
    { title: 'اتصلي علينا', body: 'في أي يوم خلال الـ 30 يوم' },
    { title: 'رجّعي العبوة', body: 'حتى لو فاضية — حسب السياسة' },
    { title: 'فلوسك ترجع', body: 'خلال 3–5 أيام عمل' },
  ] as const

  return (
    <section className="border-b border-border/70 bg-[#faf9f8] py-10 sm:py-14">
      <div className="mx-auto max-w-4xl px-3 text-center sm:px-6">
        <p className="mb-2 text-[10px] font-black uppercase tracking-[0.22em] text-muted">صفر مخاطرة</p>
        <h2 className="text-xl font-black text-charcoal sm:text-2xl md:text-3xl">
          30 يوم — أو فلوسك ترجع. بدون أسئلة.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-charcoal sm:text-base">
          جربي العبوة الأولى كاملة. إذا ما حسّيتِ بفرق يستاهل، راجعي{' '}
          <a href="/returns-refunds" className="font-bold underline underline-offset-2" style={{ color: accentColor }}>
            سياسة الاسترجاع
          </a>{' '}
          — شفافية قبل ما تدفعي عند الباب.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {steps.map((s) => (
            <div key={s.title} className="rounded-2xl border border-border bg-white p-5">
              <h3 className="text-sm font-black text-charcoal sm:text-base">{s.title}</h3>
              <p className="mt-1 text-xs leading-relaxed text-muted sm:text-sm">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
