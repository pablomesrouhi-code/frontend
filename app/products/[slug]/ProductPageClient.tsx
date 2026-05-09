'use client'
import { useState } from 'react'
import { Product, getPriceForQty } from '@/lib/products'
import { useCartStore } from '@/stores/cart-store'
import OfferSelector from '@/components/product/OfferSelector'

export default function ProductPageClient({ product }: { product: Product }) {
  const [selectedQty, setSelectedQty] = useState<1 | 2 | 3>(1)
  const { addItem, openCart } = useCartStore()

  function handleAdd() {
    addItem({
      productId: product.id,
      offerQty: selectedQty,
      price: getPriceForQty(selectedQty),
      nameAr: product.nameAr,
      accentColor: product.accentColor,
      bgColor: product.bgColor,
    })
    openCart()
  }

  return (
    <div className="flex flex-col gap-4 min-w-0 max-w-full pb-[5.5rem] md:pb-0">
      <OfferSelector selected={selectedQty} onChange={(qty) => setSelectedQty(qty)} />
      <button
        onClick={handleAdd}
        type="button"
        className="w-full max-w-full text-white font-bold py-4 rounded-full text-base sm:text-lg hover:opacity-90 transition-colors shadow-lg break-words px-4"
        style={{ background: product.accentColor }}
      >
        أضيفي للسلة — {getPriceForQty(selectedQty)} ريال
      </button>
      <p className="text-xs text-center text-[#5c5656] break-words px-1">
        الدفع عند الاستلام • سنتواصل لتأكيد الطلب
      </p>
      {/* Sticky mobile CTA — padding-inline + safe area */}
      <div
        className="md:hidden fixed bottom-0 inset-x-0 bg-white border-t border-gray-200 z-20 shadow-xl px-4 pt-3"
        style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom, 0px))' }}
      >
        <button
          onClick={handleAdd}
          type="button"
          className="w-full max-w-full text-white font-bold py-3.5 sm:py-4 rounded-full text-base sm:text-lg break-words px-3"
          style={{ background: product.accentColor }}
        >
          أضيفي للسلة — {getPriceForQty(selectedQty)} ريال
        </button>
      </div>
    </div>
  )
}
