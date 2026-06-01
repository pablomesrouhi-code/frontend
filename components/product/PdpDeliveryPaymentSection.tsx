const CITIES = [
  'الرياض',
  'جدة',
  'مكة المكرمة',
  'المدينة المنورة',
  'الدمام',
  'الخبر',
  'الطائف',
  'بريدة',
  'تبوك',
  'أبها',
  'حائل',
  'نجران',
  'ينبع',
  'القصيم',
] as const

const STEPS = [
  {
    num: '١',
    title: 'اطلبي الآن',
    body: 'اختاري العرض المناسب، اكتبي اسمك ورقم جوالك. بدون دفع أونلاين، بدون التزام.',
  },
  {
    num: '٢',
    title: 'نتصل لتأكيد الطلب',
    body: 'فريقنا السعودي يتواصل معك خلال ساعات لتأكيد العنوان والكمية. عربي 100%.',
  },
  {
    num: '٣',
    title: 'استلمي وادفعي عند الباب',
    body: '1-3 أيام عمل لجميع مدن المملكة. تدفعين كاش أو شبكة وقت ما توصلك العلبة.',
  },
] as const

type Props = {
  accentColor: string
  bgColor: string
}

export default function PdpDeliveryPaymentSection({ accentColor, bgColor }: Props) {
  return (
    <section
      id="pdp-delivery-payment"
      className="relative scroll-mt-28 overflow-x-hidden border-t border-border/70 py-10 sm:py-12 md:py-16"
      style={{
        background: `linear-gradient(185deg, color-mix(in srgb, ${bgColor} 50%, #fff) 0%, #fff 42%, color-mix(in srgb, ${accentColor} 6%, #fff) 100%)`,
      }}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-60"
        style={{
          background: `linear-gradient(90deg, transparent, ${accentColor}55, transparent)`,
        }}
        aria-hidden
      />
      <div className="relative mx-auto max-w-6xl min-w-0 px-3 sm:px-6">
        <div className="pointer-events-none absolute -top-16 end-0 h-56 w-56 rounded-full opacity-[0.12] blur-3xl sm:h-72 sm:w-72" style={{ background: accentColor }} aria-hidden />
        <div className="pointer-events-none absolute bottom-0 start-0 h-48 w-48 rounded-full opacity-[0.08] blur-3xl" style={{ background: '#146b70' }} aria-hidden />

        <div className="relative mb-10 max-w-3xl text-start sm:mb-12 md:mb-14">
          <p
            className="mb-2 inline-flex rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-white shadow-sm sm:text-[11px]"
            style={{
              background: `linear-gradient(120deg, ${accentColor}, color-mix(in srgb, ${accentColor} 72%, #1a1a1a))`,
              boxShadow: `0 8px 24px -10px ${accentColor}88`,
            }}
          >
            التوصيل والدفع
          </p>
          <h2 className="mt-3 text-2xl font-black leading-snug text-charcoal sm:text-3xl md:text-[2rem] md:leading-tight">
            كيف يوصلك طلبك — بكل بساطة
          </h2>
          <p className="mt-4 max-w-2xl text-pretty text-[15px] leading-relaxed text-muted sm:text-lg">
            بدون دفع أونلاين، بدون التزام، بدون مفاجآت. أنتي تختارين، نحن نوصّل.
          </p>
          <span
            className="ms-auto mt-4 block h-1 w-20 rounded-full sm:w-24"
            style={{ background: `linear-gradient(270deg, ${accentColor}, transparent)` }}
            aria-hidden
          />
        </div>

        <div className="relative mb-12 grid gap-4 sm:mb-14 sm:grid-cols-3 sm:gap-5">
          <div
            className="pointer-events-none absolute top-14 hidden h-0.5 opacity-25 sm:end-[12%] sm:start-[12%] sm:block"
            style={{ background: `linear-gradient(90deg, ${accentColor}, #146b70, ${accentColor})` }}
            aria-hidden
          />
          {STEPS.map((step) => (
            <article
              key={step.num}
              className="relative flex min-w-0 flex-col rounded-3xl border border-border/90 bg-white/90 p-5 text-start shadow-[0_8px_32px_-18px_rgba(28,28,28,0.08)] ring-1 ring-black/[0.03] backdrop-blur-sm sm:p-6"
            >
              <div className="mb-4 grid grid-cols-[auto_1fr] items-center gap-3 sm:mb-5">
                <span
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-xl font-black text-white shadow-inner sm:h-14 sm:w-14 sm:text-2xl"
                  style={{
                    background: `linear-gradient(145deg, ${accentColor}, color-mix(in srgb, ${accentColor} 55%, #1a1a1a))`,
                    boxShadow: `0 10px 28px -12px ${accentColor}99`,
                  }}
                  aria-hidden
                >
                  {step.num}
                </span>
                <h3 className="min-w-0 border-r-2 pe-3 text-lg font-black leading-snug text-charcoal sm:text-xl" style={{ borderColor: accentColor }}>
                  {step.title}
                </h3>
              </div>
              <p className="text-sm leading-relaxed text-muted sm:text-[15px]">{step.body}</p>
            </article>
          ))}
        </div>

        <div
          className="relative overflow-hidden rounded-[1.75rem] border border-border/80 px-5 py-7 text-start shadow-lg ring-1 ring-black/[0.04] sm:px-8 sm:py-9"
          style={{
            background: `linear-gradient(135deg, #fff 0%, color-mix(in srgb, ${bgColor} 38%, #fff) 55%, color-mix(in srgb, ${accentColor} 7%, #fff) 100%)`,
          }}
        >
          <div
            className="pointer-events-none absolute -top-20 -end-10 h-40 w-40 rounded-full opacity-20 blur-2xl"
            style={{ background: accentColor }}
            aria-hidden
          />
          <h3 className="relative mb-6 text-lg font-black text-charcoal sm:text-xl">نوصّل لكل مدن المملكة</h3>
          <ul className="relative flex flex-wrap justify-end gap-2 sm:gap-2.5">
            {CITIES.map((city) => (
              <li key={city}>
                <span className="inline-flex min-h-[2.25rem] items-center rounded-full border border-border/90 bg-white/95 px-3.5 py-1.5 text-xs font-bold text-charcoal shadow-sm ring-1 ring-black/[0.02] sm:px-4 sm:text-sm">
                  {city}
                </span>
              </li>
            ))}
            <li>
              <span
                className="inline-flex min-h-[2.25rem] items-center rounded-full px-3.5 py-1.5 text-xs font-black text-white shadow-md sm:px-4 sm:text-sm"
                style={{
                  background: `linear-gradient(120deg, #146b70, color-mix(in srgb, #146b70 75%, #0d3f42))`,
                  boxShadow: '0 10px 28px -12px rgb(20 107 112 / 0.45)',
                }}
              >
                + كل المناطق
              </span>
            </li>
          </ul>
          <p className="relative mt-8 border-t border-border/70 pt-6 text-center text-xs font-semibold leading-relaxed text-muted sm:text-sm">
            شركاء التوصيل:{' '}
            <span className="font-black text-charcoal">أرامكس</span>
            <span className="mx-1.5 text-border" aria-hidden>
              ·
            </span>
            <span className="font-black text-charcoal">سمسا</span>
            <span className="mx-1.5 text-border" aria-hidden>
              ·
            </span>
            <span className="font-black text-charcoal">ريدبكس</span>
            <span className="mx-1.5 text-border" aria-hidden>
              ·
            </span>
            <span className="font-black text-charcoal">النقل الوطني</span>
          </p>
        </div>
      </div>
    </section>
  )
}
