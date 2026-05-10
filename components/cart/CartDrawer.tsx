'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useCartStore } from '@/stores/cart-store'
import { PRODUCTS, getProductById } from '@/lib/products'
import ImagePlaceholder from '@/components/ui/ImagePlaceholder'
import CheckoutPopup from '@/components/checkout/CheckoutPopup'

function cartThumb(
  product: ReturnType<typeof getProductById>,
  size: 'sm' | 'md',
  accentColor: string,
  bgColor: string
) {
  const cls = size === 'sm' ? 'w-12 h-12' : 'w-16 h-16'
  if (!product) {
    return (
      <ImagePlaceholder accentColor={accentColor} bgColor={bgColor} label="" aspectRatio="1" className={cls} />
    )
  }
  return (
    <div className={`relative ${cls} shrink-0 overflow-hidden rounded-xl border border-[#eae2df] bg-[#faf9f8]`}>
      <Image
        src={product.coverImage}
        alt={product.nameAr}
        fill
        sizes={size === 'sm' ? '48px' : '64px'}
        className="object-cover object-center"
      />
    </div>
  )
}

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, addItem, total } = useCartStore()
  const [showCheckout, setShowCheckout] = useState(false)

  // Cross-sells: products not in cart
  const cartIds = items.map((i) => i.productId)
  const crossSells = PRODUCTS.filter((p) => !cartIds.includes(p.id))

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  if (!isOpen && !showCheckout) return null

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm"
          onClick={closeCart}
        />
      )}
      {/* Drawer */}
      {isOpen && (
        <div className="fixed top-0 left-0 h-full w-full max-w-md bg-[#FFFFFF] z-50 shadow-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 bg-white">
            <button onClick={closeCart} className="p-2 hover:bg-gray-100 rounded-full transition">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h2 className="text-lg font-bold text-[#1C1C1C]">سلّتك</h2>
            <span className="text-sm text-[#5c5656]">{items.length} منتج</span>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 gap-4">
                <div className="w-16 h-16 rounded-full bg-[#f1e6e4] flex items-center justify-center text-2xl">🛒</div>
                <p className="text-[#5c5656] text-center">سلّتك فارغة، أضيفي منتجاتك المفضلة!</p>
              </div>
            ) : (
              <>
                {/* Cart Items */}
                {items.map((item) => (
                  <div key={item.productId} className="bg-white rounded-xl p-4 flex gap-3 shadow-sm">
                    {cartThumb(getProductById(item.productId), 'md', item.accentColor, item.bgColor)}
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-[#1C1C1C] text-sm">{item.nameAr}</p>
                      <p className="text-xs text-[#5c5656] mt-0.5">
                        {item.offerQty === 1 ? 'قطعة واحدة' : item.offerQty === 2 ? 'قطعتين' : '3 قطع'}
                      </p>
                      <p className="font-bold text-[#b8485c] mt-1">{item.price} ريال</p>
                    </div>
                    <button
                      onClick={() => removeItem(item.productId)}
                      className="text-gray-400 hover:text-red-500 transition p-1 self-start"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}

                {/* Cross-sells */}
                {crossSells.length > 0 && (
                  <div className="mt-2">
                    <p className="text-sm font-bold text-[#1C1C1C] mb-3">كمّلي روتينك:</p>
                    <div className="flex flex-col gap-2">
                      {crossSells.map((p) => (
                        <div key={p.id} className="bg-white rounded-xl p-3 flex gap-3 items-center shadow-sm">
                          {cartThumb(getProductById(p.id), 'sm', p.accentColor, p.bgColor)}
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-sm text-[#1C1C1C]">{p.nameAr}</p>
                            <p className="text-xs text-[#5c5656] truncate">{p.subtitleAr}</p>
                            <p className="text-sm font-bold text-[#b8485c] mt-0.5">199 ريال</p>
                          </div>
                          <button
                            onClick={() => {
                              addItem({ productId: p.id, offerQty: 1, price: 199, nameAr: p.nameAr, accentColor: p.accentColor, bgColor: p.bgColor })
                            }}
                            className="bg-[#b8485c] text-white text-xs font-bold px-3 py-2 rounded-full hover:bg-[#943c50] transition shrink-0"
                          >
                            أضيفي
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="px-5 py-4 bg-white border-t border-gray-200 flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <span className="font-bold text-[#1C1C1C]">المجموع:</span>
                <span className="text-xl font-bold text-[#b8485c]">{total()} ريال</span>
              </div>
              <p className="text-xs text-[#5c5656] text-center">الدفع عند الاستلام • تأكيد الطلب قبل التوصيل</p>
              <button
                onClick={() => { closeCart(); setShowCheckout(true) }}
                className="w-full bg-[#b8485c] text-white font-bold py-4 rounded-full text-lg hover:bg-[#943c50] transition-colors"
              >
                إكمال الطلب
              </button>
            </div>
          )}
        </div>
      )}

      {/* Checkout Popup */}
      {showCheckout && (
        <CheckoutPopup onClose={() => setShowCheckout(false)} />
      )}
    </>
  )
}
