import Link from 'next/link'
import { PRODUCTS } from '@/lib/products'

const STORE_ORIGIN = 'https://nabtalabo.store'

const GUMMIES = PRODUCTS.filter((p) => !p.format || p.format === 'gummy')
const POWDERS = PRODUCTS.filter((p) => p.format === 'powder_sachet')

export const metadata = {
  title: 'روابط المنتجات | نبتة لابو',
  description: 'أسماء المنتجات وروابط صفحاتها على متجر نبتة لابو — علكة ومسحوق.',
  robots: { index: false, follow: false },
}

function ProductLinkRow({ nameAr, slug }: { nameAr: string; slug: string }) {
  const path = `/products/${slug}`
  const fullUrl = `${STORE_ORIGIN}${path}`

  return (
    <li className="rounded-2xl border border-[#d8c9c6] bg-white p-5 shadow-sm">
      <p className="mb-3 text-xl font-bold text-[#1C1C1C]">{nameAr}</p>
      <div className="flex flex-col gap-2 text-start">
        <Link
          href={path}
          className="break-all text-sm font-semibold text-[#b8485c] underline-offset-4 hover:underline"
        >
          {fullUrl}
        </Link>
        <p className="break-all font-mono text-xs text-[#5c5656]" dir="ltr">
          {path}
        </p>
      </div>
    </li>
  )
}

export default function ProductLinksPage() {
  return (
    <div className="min-h-screen bg-[#FBF7F3] py-12 sm:py-16">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <div className="mb-10 text-start">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-[#146b70]">نبتة لابو</p>
          <h1 className="text-3xl font-bold text-[#1C1C1C]">روابط المنتجات</h1>
          <p className="mt-3 text-sm leading-relaxed text-[#5c5656]">
            اسم المنتج بالعربية — ثم الرابط المباشر لصفحته. علكات (3) + مسحوق (3).
          </p>
        </div>

        <section className="mb-10">
          <h2 className="mb-4 text-lg font-bold text-[#1C1C1C]">🍬 العلكات — 3 منتجات</h2>
          <ul className="flex flex-col gap-3">
            {GUMMIES.map((p) => (
              <ProductLinkRow key={p.id} nameAr={p.nameAr} slug={p.slug} />
            ))}
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-lg font-bold text-[#1C1C1C]">🌿 المسحوق — 3 منتجات</h2>
          <ul className="flex flex-col gap-3">
            {POWDERS.map((p) => (
              <ProductLinkRow key={p.id} nameAr={p.nameAr} slug={p.slug} />
            ))}
          </ul>
        </section>

        <p className="text-center text-xs text-[#5c5656]">
          <Link href="/" className="font-semibold text-[#b8485c] hover:underline">
            ← العودة للمتجر
          </Link>
        </p>
      </div>
    </div>
  )
}
