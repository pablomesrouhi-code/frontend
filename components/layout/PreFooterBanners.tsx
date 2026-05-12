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
    desc: 'مكمّلات غذائية بترخيص واضح من هيئة الغذاء والدواء',
    icon: '✅',
  },
] as const

export default function PreFooterBanners() {
  return (
    <section className="bg-white border-t border-[#dfd6d4]" aria-label="مزايا التسوق">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div
          className="rounded-xl border border-[#dfd6d4] bg-white px-3 py-3 sm:px-6 sm:py-3.5"
          style={{ boxShadow: '0 1px 6px rgba(0,0,0,0.04)' }}
        >
          <div className="flex flex-wrap items-start justify-evenly md:justify-between gap-x-2 gap-y-4">
            {BANNERS.map((b, i) => (
              <Fragment key={b.title}>
                {i > 0 && (
                  <span
                    className="hidden md:block shrink-0 w-px bg-[#d5cdc9] self-stretch my-1"
                    style={{ minHeight: '3rem' }}
                    aria-hidden
                  />
                )}
                <div className="flex items-start gap-2 text-right min-w-0 flex-[1_1_45%] sm:flex-[1_1_22%] md:flex-1 md:max-w-[24%]">
                  <span className="text-sm sm:text-base leading-none shrink-0 pt-0.5" aria-hidden>
                    {b.icon}
                  </span>
                  <div className="min-w-0">
                    <p className="text-[11px] sm:text-xs font-bold text-[#1C1C1C] leading-snug break-words">
                      {b.title}
                    </p>
                    <p className="text-[10px] sm:text-[11px] text-[#5c5656] leading-relaxed mt-0.5 break-words">
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
