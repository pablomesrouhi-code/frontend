import { Fragment } from 'react'

const BANNERS = [
  {
    title: 'شحن سريع داخل السعودية',
    desc: 'توصيل من 2 إلى 5 أيام عمل لجميع المناطق',
    icon: '🚚',
  },
  {
    title: 'الدفع عند الاستلام',
    desc: 'ادفعي بعد ما يوصلك الطلب لباب البيت',
    icon: '💳',
  },
  {
    title: 'ضمان استرجاع 30 يوم',
    desc: 'ما حسّيتي بفرق؟ نرجّع لك المبلغ كامل',
    icon: '↩️',
  },
  {
    title: 'مرخّص من SFDA · حلال 100%',
    desc: 'تصاريح وفق لوائح المكمّلات الغذائية وبنفس الانضباط الذي تبحثين عنه في صيدلية موثوقة',
    icon: '✅',
  },
] as const

export default function PreFooterBanners() {
  return (
    <section className="border-t border-border bg-white" aria-label="مزايا التسوق">
      <div className="mx-auto max-w-6xl px-4 py-3 sm:px-6 sm:py-4">
        <div
          className="rounded-2xl border border-border/60 bg-white px-3 py-3 shadow-[0_4px_24px_-10px_rgba(26,25,21,0.07)] ring-1 ring-black/[0.02] sm:rounded-[1.125rem] sm:px-6 sm:py-3.5"
        >
          <div className="flex flex-wrap items-start justify-evenly md:justify-between gap-x-2 gap-y-4">
            {BANNERS.map((b, i) => (
              <Fragment key={b.title}>
                {i > 0 && (
                  <span
                    className="my-1 hidden w-px shrink-0 self-stretch bg-border md:block"
                    style={{ minHeight: '3rem' }}
                    aria-hidden
                  />
                )}
                <div className="flex items-start gap-2 text-right min-w-0 flex-[1_1_45%] sm:flex-[1_1_22%] md:flex-1 md:max-w-[24%]">
                  <span className="text-sm sm:text-base leading-none shrink-0 pt-0.5" aria-hidden>
                    {b.icon}
                  </span>
                  <div className="min-w-0">
                    <p className="break-words text-[11px] font-bold leading-snug text-charcoal sm:text-xs">
                      {b.title}
                    </p>
                    <p className="mt-0.5 break-words text-[10px] leading-relaxed text-muted sm:text-[11px]">
                      {b.desc}
                    </p>
                  </div>
                </div>
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
