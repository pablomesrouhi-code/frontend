'use client'

import Image from 'next/image'
import { useStorePricing } from '@/components/pricing/StorePricingProvider'
import { formatSarAmount, getComboPrice, getPriceForQty, getProductById } from '@/lib/products'
import { useCartStore } from '@/stores/cart-store'

/**
 * 1× رونق C + 2× شهر هادئ — سعر كومبو أرخص من الشراء منفصل (199+279=478).
 * Backend matches exact cart → combo_deals_sar.rawnaq_shahr
 */
export default function HomeDuoBundle() {
  useStorePricing()
  const { addItem, clearCart, openCart } = useCartStore()
  const rawnaq = getProductById('rawnaq-c')
  const shahr = getProductById('shahr-hadi')
  const comboPrice = getComboPrice('rawnaq_shahr')
  const separate = getPriceForQty(1, 'rawnaq-c') + getPriceForQty(2, 'shahr-hadi')
  const save = Math.max(0, separate - comboPrice)

  if (!rawnaq || !shahr || rawnaq.availability === 'sold_out' || shahr.availability === 'sold_out') {
    return null
  }

  function addBundle() {
    if (!rawnaq || !shahr) return
    // Allocate combo across lines (backend re-prices to fixed combo).
    const rawnaqShare = Math.round((comboPrice * 1) / 3)
    const shahrShare = comboPrice - rawnaqShare
    clearCart()
    addItem({
      productId: rawnaq.id,
      offerQty: 1,
      price: rawnaqShare,
      nameAr: rawnaq.nameAr,
      accentColor: rawnaq.accentColor,
      bgColor: rawnaq.bgColor,
    })
    addItem({
      productId: shahr.id,
      offerQty: 2,
      price: shahrShare,
      nameAr: shahr.nameAr,
      accentColor: shahr.accentColor,
      bgColor: shahr.bgColor,
    })
    openCart()
  }

  return (
    <section className="overflow-hidden rounded-[2rem] border border-[#e8d4c8] bg-gradient-to-br from-[#fff8f5] via-white to-[#f3eef5] shadow-[0_20px_60px_-28px_rgba(142,108,142,0.35)]">
      <div className="grid items-center gap-0 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="p-6 sm:p-10 lg:p-12">
          <span className="inline-flex rounded-full bg-[#8E6C8E]/12 px-3 py-1.5 text-xs font-black text-[#8E6C8E]">
            باك الدورة + البشرة · أوفر من المنفصل
          </span>
          <h2 className="mt-4 text-3xl font-black leading-tight text-charcoal sm:text-4xl">
            علبة رونق C + عبوتان شهر هادئ
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-muted sm:text-base">
            روتين يكمّل بعضه: علكة صباحية للبشرة والتجاعيد + مسحوق لأيام الدورة — بسعر باك يبان أرخص من جمع الأسعار.
          </p>
          <ul className="mt-4 flex flex-col gap-2 text-sm font-semibold text-charcoal">
            <li className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#b8485c] text-xs text-white">
                1
              </span>
              رونق C — علبة واحدة
            </li>
            <li className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#8E6C8E] text-xs text-white">
                2
              </span>
              شهر هادئ — عبوتان
            </li>
          </ul>
          <div className="mt-6 flex flex-wrap items-end gap-4">
            <div>
              <p className="text-xs font-bold text-muted">سعر الباك</p>
              <p className="text-4xl font-black tabular-nums text-[#b8485c]">{formatSarAmount(comboPrice)}</p>
              <p className="mt-1 text-xs font-semibold text-muted line-through tabular-nums">
                بدل {formatSarAmount(separate)}
              </p>
            </div>
            {save > 0 && (
              <span className="mb-1 rounded-full bg-[#146b70] px-3 py-1.5 text-xs font-black text-white">
                وفّري {save} ريال
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={addBundle}
            className="mt-7 min-h-14 w-full rounded-full bg-[#b8485c] px-7 py-4 text-base font-black text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#943c50] sm:w-auto"
          >
            أضيفي الباك للسلة · {formatSarAmount(comboPrice)}
          </button>
          <p className="mt-3 text-xs font-semibold text-muted">دفع عند الاستلام · تأكيد هاتفي قبل الشحن</p>
        </div>

        <div className="relative grid grid-cols-2 gap-3 bg-[#f7f0f4] p-5 sm:gap-4 sm:p-7">
          <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-white shadow-lg ring-2 ring-white">
            <Image
              src={rawnaq.homeCardImage ?? rawnaq.coverImage}
              alt={rawnaq.nameAr}
              fill
              sizes="240px"
              className="object-cover"
            />
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#b8485cee] to-transparent px-2 py-2 text-center text-xs font-black text-white">
              رونق C ×1
            </span>
          </div>
          <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-white shadow-lg ring-2 ring-white">
            <Image
              src={shahr.homeCardImage ?? shahr.coverImage}
              alt={shahr.nameAr}
              fill
              sizes="240px"
              className="object-cover"
            />
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#8E6C8Eee] to-transparent px-2 py-2 text-center text-xs font-black text-white">
              شهر هادئ ×2
            </span>
          </div>
          <div className="col-span-2 flex justify-center">
            <span className="rounded-full bg-charcoal px-4 py-2 text-sm font-black text-white shadow-lg">
              1 + 2 = باك أوفر
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
