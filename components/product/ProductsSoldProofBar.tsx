import { STORE_SOLD_HEADLINE, formatSoldCount, getBestSellerProduct } from '@/lib/products'

export default function ProductsSoldProofBar() {
  const best = getBestSellerProduct()

  return (
    <div
      className="mb-8 overflow-hidden rounded-2xl border border-[#f0d4d9] bg-gradient-to-br from-[#fdf5f6] via-white to-[#f0faf4] shadow-[0_8px_28px_-12px_rgba(184,72,92,0.18)] ring-1 ring-[#b8485c]/[0.08]"
      role="status"
      aria-label="إثبات اجتماعي — طلبات مؤكّدة في السعودية"
    >
      <div className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-5">
        <div className="flex min-w-0 items-center gap-3 text-start">
          <span
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#b8485c] text-xl text-white shadow-[0_6px_18px_-6px_rgba(184,72,92,0.55)]"
            aria-hidden
          >
            🔥
          </span>
          <div className="min-w-0">
            <p className="text-lg font-black leading-tight text-charcoal sm:text-xl">
              <span dir="ltr" className="tabular-nums text-[#b8485c]">
                {formatSoldCount(STORE_SOLD_HEADLINE)}
              </span>{' '}
              طلب مؤكّد في المملكة
            </p>
            <p className="mt-1 text-xs leading-relaxed text-muted sm:text-sm">
              دفع عند الاستلام وتأكيد قبل الشحن — توصيل لجميع مناطق المملكة
            </p>
          </div>
        </div>

        {best ? (
          <div className="flex shrink-0 flex-col gap-2 sm:items-end">
            <div className="flex items-center gap-2 rounded-full border border-[#b8485c]/25 bg-white px-4 py-2 text-sm font-bold text-[#b8485c] shadow-sm">
              <span aria-hidden>⭐</span>
              <span>
                الأكثر طلباً: <span className="text-charcoal">{best.nameAr}</span>
              </span>
            </div>
            {best.soldCount ? (
              <p dir="ltr" className="text-xs font-bold tabular-nums text-[#5c5656]">
                {formatSoldCount(best.soldCount)} مباع
              </p>
            ) : null}
          </div>
        ) : null}
      </div>

      <div
        className="flex flex-wrap items-center justify-center gap-2 border-t border-[#f0d4d9]/80 bg-[#faf9f8]/80 px-4 py-2.5"
        aria-hidden
      >
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#146b70] sm:text-[11px]">
          🇸🇦 متجر سعودي · توصيل 2–4 أيام · من 199 ر.س
        </span>
      </div>
    </div>
  )
}
