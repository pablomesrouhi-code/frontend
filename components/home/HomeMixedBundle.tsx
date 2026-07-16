'use client'

import Image from 'next/image'
import { useStorePricing } from '@/components/pricing/StorePricingProvider'
import { formatSarAmount, getPriceForQty, getProductById } from '@/lib/products'
import { useCartStore } from '@/stores/cart-store'

const BIOTIN_ID = 'rawnaq-c'
const HORMONAL_ID = 'shahr-hadi'

export default function HomeMixedBundle() {
  useStorePricing()
  const { addItem, clearCart, openCart } = useCartStore()
  const biotin = getProductById(BIOTIN_ID)
  const hormonal = getProductById(HORMONAL_ID)
  const bundlePrice = getPriceForQty(3)

  if (!biotin || !hormonal) return null

  function addBundle() {
    if (!biotin || !hormonal) return
    const biotinShare = Math.round(bundlePrice / 3)
    clearCart()
    addItem({
      productId: biotin.id,
      offerQty: 1,
      price: biotinShare,
      nameAr: biotin.nameAr,
      accentColor: biotin.accentColor,
      bgColor: biotin.bgColor,
    })
    addItem({
      productId: hormonal.id,
      offerQty: 2,
      price: bundlePrice - biotinShare,
      nameAr: hormonal.nameAr,
      accentColor: hormonal.accentColor,
      bgColor: hormonal.bgColor,
    })
    openCart()
  }

  return (
    <section className="overflow-hidden rounded-[2rem] bg-[#b8485c] text-white shadow-[0_24px_70px_-28px_rgba(184,72,92,0.5)]">
      <div className="grid items-center gap-0 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="p-6 sm:p-10 lg:p-12">
          <span className="inline-flex rounded-full bg-white/15 px-3 py-1.5 text-xs font-black">
            باك الروتين الكامل · الأكثر توفيراً
          </span>
          <h2 className="mt-4 text-3xl font-black leading-tight sm:text-4xl">
            1 علبة بيوتين + 2 عبوات توازن هرموني
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-white/80 sm:text-base">
            ثلاثة منتجات في طلب واحد: روتين للجمال من الداخل مع دعم التوازن اليومي. الكمية محدودة للمنتجين المتوفرين.
          </p>
          <div className="mt-6 flex flex-wrap items-end gap-4">
            <div>
              <p className="text-xs font-bold text-white/65">سعر الباك</p>
              <p className="text-4xl font-black tabular-nums">{formatSarAmount(bundlePrice)}</p>
            </div>
            <span className="mb-1 rounded-full bg-[#f4c36a] px-3 py-1.5 text-xs font-black text-[#4b2430]">
              3 منتجات
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

        <div className="relative min-h-[340px] bg-gradient-to-br from-[#f8e9e2] to-white p-5 sm:min-h-[430px]">
          <div className="absolute inset-x-4 bottom-4 top-4">
            <div className="absolute bottom-0 start-0 h-[82%] w-[55%] overflow-hidden rounded-[1.75rem] bg-white shadow-xl">
              <Image src={hormonal.homeCardImage ?? hormonal.coverImage} alt={hormonal.nameAr} fill sizes="360px" className="object-cover" />
            </div>
            <div className="absolute end-0 top-0 h-[76%] w-[53%] overflow-hidden rounded-[1.75rem] border-4 border-white bg-white shadow-2xl">
              <Image src={biotin.homeCardImage ?? biotin.coverImage} alt={biotin.nameAr} fill sizes="340px" className="object-cover" />
            </div>
            <span className="absolute bottom-4 end-3 rounded-full bg-[#146b70] px-4 py-2 text-sm font-black text-white shadow-lg">
              1 + 2
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
