'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useCartStore } from '@/stores/cart-store'
import { PRODUCTS, getProductById, formatSarAmount } from '@/lib/products'
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
        <div className="fixed inset-y-0 start-0 z-50 flex h-[100dvh] max-h-[100dvh] w-full max-w-md flex-col overflow-hidden border-e border-border/80 bg-white shadow-2xl max-sm:rounded-e-3xl">
          {/* Header */}
          <div
            className="flex shrink-0 items-center justify-between border-b border-border bg-white px-4 py-4 sm:px-5"
            style={{ paddingTop: 'max(1rem, env(safe-area-inset-top))' }}
          >
            <button
              type="button"
              onClick={closeCart}
              className="touch-manipulation -m-2 flex min-h-11 min-w-11 items-center justify-center rounded-full text-charcoal ring-1 ring-transparent transition-colors hover:bg-peach-tint hover:ring-border/80"
              aria-label="إغلاق السلّة"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h2 className="text-lg font-bold text-charcoal">سلّتك</h2>
            <span className="tabular-nums text-sm text-muted">{items.length} منتج</span>
          </div>

          <div className="flex flex-1 flex-col gap-4 overflow-y-auto overscroll-y-contain px-4 py-4 touch-pan-y sm:px-5">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 gap-4">
                <div className="w-16 h-16 rounded-full bg-[#f1e6e4] flex items-center justify-center text-2xl">🛒</div>
                <p className="max-w-[22rem] text-center text-muted leading-relaxed">سلّتك فارغة، أضيفي منتجاتك المفضلة!</p>
              </div>
            ) : (
              <>
                {/* Cart Items */}
                {items.map((item) => (
                  <div key={item.productId} className="flex gap-3 rounded-2xl border border-border/90 bg-white p-4 shadow-sm">
                    {cartThumb(getProductById(item.productId), 'md', item.accentColor, item.bgColor)}
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-[#1C1C1C] text-sm">{item.nameAr}</p>
                      <p className="text-xs text-[#5c5656] mt-0.5">
                        {item.offerQty === 1 ? 'قطعة واحدة' : item.offerQty === 2 ? 'قطعتين' : '3 قطع'}
                      </p>
                      <p className="mt-1 font-bold text-[#b8485c] tabular-nums">{formatSarAmount(item.price)}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(item.productId)}
                      className="touch-manipulation self-start rounded-lg p-2 text-muted transition-colors hover:bg-red-50 hover:text-red-600 min-h-[44px] min-w-[44px] flex items-center justify-center shrink-0"
                      aria-label="حذف من السلّة"
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
                        <div key={p.id} className="flex items-center gap-3 rounded-xl border border-border/80 bg-peach-soft/30 p-3 shadow-sm">
                          {cartThumb(getProductById(p.id), 'sm', p.accentColor, p.bgColor)}
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-sm text-[#1C1C1C]">{p.nameAr}</p>
                            <p className="text-xs text-[#5c5656] truncate">{p.subtitleAr}</p>
                            <p className="mt-0.5 text-sm font-bold text-[#b8485c] tabular-nums">{formatSarAmount(199)}</p>
                          </div>
                          <button
                            onClick={() => {
                              addItem({ productId: p.id, offerQty: 1, price: 199, nameAr: p.nameAr, accentColor: p.accentColor, bgColor: p.bgColor })
                            }}
                            className="touch-manipulation shrink-0 rounded-full bg-primary px-4 py-2.5 text-xs font-bold text-white shadow-sm transition-colors hover:bg-primary-dark active:scale-[0.98] min-h-11 flex items-center justify-center"
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
            <div
              className="flex shrink-0 flex-col gap-3 border-t border-border bg-white px-4 py-4 sm:px-5"
              style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-charcoal">المجموع:</span>
                <span className="tabular-nums text-xl font-bold text-primary">{formatSarAmount(total())}</span>
              </div>
              <p className="text-center text-[11px] leading-relaxed text-muted sm:text-xs">الدفع عند الاستلام • تأكيد الطلب قبل التوصيل</p>
              <button
                type="button"
                onClick={() => {
                  closeCart()
                  setShowCheckout(true)
                }}
                className="touch-manipulation w-full rounded-full bg-primary py-4 text-lg font-bold text-white shadow-[0_8px_24px_rgba(184,72,92,0.28)] transition-all hover:bg-primary-dark active:scale-[0.99]"
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
