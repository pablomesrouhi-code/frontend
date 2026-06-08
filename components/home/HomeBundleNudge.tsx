import Link from 'next/link'
import { STORE_SOLD_HEADLINE, formatSoldCount } from '@/lib/products'

export default function HomeBundleNudge() {
  return (
    <section className="bg-[#f1e6e4] py-8 sm:py-10" aria-labelledby="home-bundle-title">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-stretch justify-between gap-4 rounded-2xl border border-white/10 bg-[#b8485c] px-6 py-5 shadow-[0_12px_40px_-16px_rgba(148,60,80,0.45)] ring-1 ring-black/[0.06] sm:flex-row sm:items-center">
          <div className="text-start text-white">
            <p className="mb-2 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-[11px] font-bold">
              <span aria-hidden>🇸🇦</span>
              العرض الأكثر طلباً
            </p>
            <p id="home-bundle-title" className="text-lg font-bold">
              جربي الثلاثة معاً — روتين كامل
            </p>
            <p className="mt-1 text-sm text-white/80">
              رونق C + خفّة بيوتك + ليل ماج · من الصباح للمساء
            </p>
            <p className="mt-2 text-xs font-semibold text-white/70">
              <span dir="ltr" className="tabular-nums text-white">
                {formatSoldCount(STORE_SOLD_HEADLINE)}
              </span>{' '}
              طلب مؤكّد في المتجر — كثيرات يختارن الباقة
            </p>
          </div>
          <div className="flex shrink-0 flex-col items-stretch gap-3 sm:items-end">
            <div className="text-start sm:text-end">
              <p className="text-2xl font-black text-white">349 ريال</p>
              <p className="text-xs text-white/70">3 منتجات · توفير · COD</p>
            </div>
            <Link
              href="/products"
              className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-white px-6 py-2.5 text-sm font-bold text-[#b8485c] transition hover:bg-[#fdf5f6]"
            >
              شوفي العروض ←
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
