'use client'
import { useCallback, useEffect, useState } from 'react'
import type { Product } from '@/lib/products'
import { getPriceForQty } from '@/lib/products'
import { useCartStore } from '@/stores/cart-store'

/** شريط CRO: يظهر عندما يختفي كتلة الشراء؛ يركز التمرير على خطّ القيمة ثم الشراء من جديد */
export default function ProductStickyCta({ product }: { product: Pick<Product, 'id' | 'nameAr' | 'accentColor' | 'bgColor'> }) {
  const [visible, setVisible] = useState(false)
  const { addItem, openCart } = useCartStore()

  useEffect(() => {
    const el = document.getElementById('pdp-buy-anchor')
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => setVisible(!entry.isIntersecting), {
      threshold: 0.12,
      rootMargin: '48px 0px 64px 0px',
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const scrollToHook = useCallback(() => {
    document.getElementById('pdp-hook')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  const quickAddOne = useCallback(() => {
    addItem({
      productId: product.id,
      offerQty: 1,
      price: getPriceForQty(1),
      nameAr: product.nameAr,
      accentColor: product.accentColor,
      bgColor: product.bgColor,
    })
    openCart()
  }, [product, addItem, openCart])

  if (!visible) return null

  const accent = product.accentColor
  const price1 = getPriceForQty(1)

  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-0 z-40 px-3 pb-[max(10px,env(safe-area-inset-bottom))] pt-2 md:inset-auto md:bottom-[max(1rem,env(safe-area-inset-bottom))] md:end-6 md:start-auto md:z-40 md:w-[min(420px,calc(100vw-3rem))]"
      aria-live="polite"
    >
      <div className="pointer-events-auto mx-auto flex w-full max-w-lg flex-col gap-2 rounded-2xl border border-border bg-white/95 p-3 shadow-[0_-8px_40px_rgba(28,28,28,0.12)] backdrop-blur-md md:flex-row md:items-center md:gap-3 md:p-4 md:shadow-2xl">
        <div className="min-w-0 flex-1 text-right">
          <p className="truncate text-sm font-black text-charcoal">{product.nameAr}</p>
          <p className="mt-0.5 text-xs text-muted">
            من <span className="tabular-nums font-bold text-primary">{price1}</span> ريال — دفع عند الاستلام
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-end gap-2 md:flex-nowrap md:shrink-0">
          <button
            type="button"
            onClick={quickAddOne}
            className="touch-manipulation rounded-full px-4 py-2.5 text-xs font-bold ring-2 ring-border bg-white text-charcoal transition hover:bg-peach-soft"
          >
            + قطعة للسلّة
          </button>
          <button
            type="button"
            onClick={scrollToHook}
            className="touch-manipulation min-h-11 rounded-full px-6 py-3 text-sm font-black text-white shadow-lg transition-[transform] active:scale-[0.98]"
            style={{ background: `linear-gradient(145deg, ${accent} 0%, ${accent}dd 100%)`, boxShadow: `0 6px 20px ${accent}55` }}
          >
            رؤية العرض والعنوان
          </button>
        </div>
      </div>
    </div>
  )
}
