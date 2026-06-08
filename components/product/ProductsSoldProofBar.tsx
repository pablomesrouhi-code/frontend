import { STORE_SOLD_HEADLINE, formatSoldCount, getBestSellerProduct } from '@/lib/products'

export default function ProductsSoldProofBar() {
  const best = getBestSellerProduct()

  return (
    <div
      className="mb-8 flex flex-col items-stretch gap-3 rounded-2xl border border-[#f0d4d9] bg-gradient-to-r from-[#fdf5f6] via-white to-[#fdf5f6] px-4 py-4 shadow-[0_8px_28px_-12px_rgba(184,72,92,0.18)] ring-1 ring-[#b8485c]/[0.08] sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-4"
      role="status"
      aria-label="إثبات اجتماعي — طلبات مؤكّدة"
    >
      <div className="flex min-w-0 items-center gap-3 text-start">
        <span
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#b8485c] text-lg text-white shadow-[0_6px_18px_-6px_rgba(184,72,92,0.55)]"
          aria-hidden
        >
          🔥
        </span>
        <div className="min-w-0">
          <p className="text-base font-black leading-tight text-charcoal sm:text-lg">
            <span dir="ltr" className="tabular-nums text-[#b8485c]">
              {formatSoldCount(STORE_SOLD_HEADLINE)}
            </span>{' '}
            طلب مؤكّد عبر المتجر
          </p>
          <p className="mt-0.5 text-xs leading-relaxed text-muted sm:text-sm">
            عميلات من أنحاء المملكة — COD، تأكيد قبل التوصيل
          </p>
        </div>
      </div>

      {best ? (
        <div className="flex shrink-0 items-center gap-2 self-start rounded-full border border-[#b8485c]/20 bg-white px-4 py-2 text-sm font-bold text-[#b8485c] shadow-sm sm:self-auto">
          <span aria-hidden>⭐</span>
          <span>
            الأكثر مبيعاً: <span className="text-charcoal">{best.nameAr}</span>
          </span>
        </div>
      ) : null}
    </div>
  )
}
