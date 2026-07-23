'use client'

import Image from 'next/image'
import { useStorePricing } from '@/components/pricing/StorePricingProvider'
import PowderPlaceholder from '@/components/product/PowderPlaceholder'
import { formatSarAmount, getPriceForQty, getProductById, type Product } from '@/lib/products'
import { useCartStore } from '@/stores/cart-store'

/** باك الثلاثة المتوفرة: علبة من كل منتج */
const TRIO_IDS = ['rawnaq-c', 'shahr-hadi', 'naseej'] as const

function BundleProductVisual({ product }: { product: Product }) {
  const src = product.homeCardImage ?? product.coverImage
  const isPowderPlaceholder = product.format !== 'gummy' && !product.homeCardImage

  if (isPowderPlaceholder) {
    return <PowderPlaceholder product={product} size="card" className="!min-h-0 !rounded-none h-full" />
  }

  return (
    <Image
      src={src}
      alt={product.nameAr}
      fill
      sizes="280px"
      className="object-cover"
    />
  )
}

export default function HomeMixedBundle() {
  useStorePricing()
  const { addItem, clearCart, openCart } = useCartStore()
  const products = TRIO_IDS.map((id) => getProductById(id)).filter(Boolean) as Product[]
  const bundlePrice = getPriceForQty(3)

  if (products.length < 3) return null

  function addBundle() {
    if (products.length < 3) return
    const base = Math.floor(bundlePrice / 3)
    const prices = [base + (bundlePrice - base * 3), base, base]
    clearCart()
    products.forEach((product, index) => {
      addItem({
        productId: product.id,
        offerQty: 1,
        price: prices[index] ?? base,
        nameAr: product.nameAr,
        accentColor: product.accentColor,
        bgColor: product.bgColor,
      })
    })
    openCart()
  }

  return (
    <section className="overflow-hidden rounded-[2rem] bg-[#b8485c] text-white shadow-[0_24px_70px_-28px_rgba(184,72,92,0.5)]">
      <div className="grid items-center gap-0 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="p-6 sm:p-10 lg:p-12">
          <span className="inline-flex rounded-full bg-white/15 px-3 py-1.5 text-xs font-black">
            باك الثلاثة · الأكثر توفيراً
          </span>
          <h2 className="mt-4 text-3xl font-black leading-tight sm:text-4xl">
            عبوة من رونق C + شهر هادئ + نسيج
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-white/80 sm:text-base">
            ثلاثة منتجات مختلفة في طلب واحد: بيوتين، توازن هرموني، وكولاجين للتجاعيد والشعر والبشرة والأظافر من الداخل.
          </p>
          <ul className="mt-4 flex flex-col gap-2 text-sm font-semibold text-white/90">
            {products.map((p) => (
              <li key={p.id} className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-xs">1</span>
                {p.nameAr}
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap items-end gap-4">
            <div>
              <p className="text-xs font-bold text-white/65">سعر الباك</p>
              <p className="text-4xl font-black tabular-nums">{formatSarAmount(bundlePrice)}</p>
            </div>
            <span className="mb-1 rounded-full bg-[#f4c36a] px-3 py-1.5 text-xs font-black text-[#4b2430]">
              3 منتجات مختلفة
            </span>
          </div>
          <button
            type="button"
            onClick={addBundle}
            className="mt-7 min-h-14 w-full rounded-full bg-white px-7 py-4 text-base font-black text-[#b8485c] shadow-lg transition hover:-translate-y-0.5 hover:bg-[#fff8f4] sm:w-auto"
          >
            أضيفي الباك للسلة · {formatSarAmount(bundlePrice)}
          </button>
          <p className="mt-3 text-xs font-semibold text-white/65">دفع عند الاستلام · تأكيد هاتفي قبل الشحن</p>
        </div>

        <div className="relative bg-gradient-to-br from-[#f8e9e2] to-white p-5 sm:p-7">
          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-white shadow-lg ring-2 ring-white"
              >
                <BundleProductVisual product={product} />
                <span
                  className="absolute inset-x-0 bottom-0 px-2 py-2 text-center text-[10px] font-black text-white sm:text-xs"
                  style={{ background: `linear-gradient(transparent, ${product.accentColor}ee)` }}
                >
                  {product.nameAr}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-center">
            <span className="rounded-full bg-[#146b70] px-4 py-2 text-sm font-black text-white shadow-lg">
              1 + 1 + 1
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
