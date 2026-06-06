'use client'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Product, getPriceForQty, formatSarAmount } from '@/lib/products'
import { useCartStore } from '@/stores/cart-store'
import OfferSelector from '@/components/product/OfferSelector'
import PdpRoutineNote from '@/components/product/PdpRoutineNote'
import PdpStickyRoutineCta from '@/components/product/PdpStickyRoutineCta'
import {
  trackAddToCart,
  trackViewContent,
} from '@/lib/tracking/client'

function shadeTowardBlack(hex: string, t: number) {
  const h = hex.replace('#', '')
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h
  const n = parseInt(full, 16)
  const r = (n >> 16) & 255
  const g = (n >> 8) & 255
  const b = n & 255
  const mix = (c: number) => Math.round(c * (1 - t))
  const R = mix(r)
  const G = mix(g)
  const B = mix(b)
  return `#${[R, G, B].map((x) => x.toString(16).padStart(2, '0')).join('')}`
}

function CartIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M7 7h14l-1.5 9h-11L7 7zm0 0L5.5 3H2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm8 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"
        fill="currentColor"
      />
    </svg>
  )
}

export default function ProductPageClient({
  product,
  addToCartLabel = 'اطلبي الآن',
}: {
  product: Product
  addToCartLabel?: string
}) {
  const [selectedQty, setSelectedQty] = useState<1 | 2 | 3>(1)
  const [stickyCtaVisible, setStickyCtaVisible] = useState(false)
  const priceBlockRef = useRef<HTMLDivElement>(null)
  const { addItem, openCart } = useCartStore()
  const accent = product.accentColor
  const accentDeep = shadeTowardBlack(accent, 0.28)

  useEffect(() => {
    trackViewContent({
      content_ids: [product.id],
      value: getPriceForQty(1),
      currency: 'SAR',
    })
  }, [product.id])

  useEffect(() => {
    const el = priceBlockRef.current
    if (!el) return

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return
        const scrolledPast = !entry.isIntersecting && entry.boundingClientRect.top < 0
        setStickyCtaVisible(scrolledPast)
      },
      { root: null, threshold: 0, rootMargin: '-8px 0px 0px 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const scrollToPrice = useCallback(() => {
    document.getElementById('pdp-buy-anchor')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [])

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
    trackAddToCart({
      content_ids: [product.id],
      value: getPriceForQty(selectedQty),
      currency: 'SAR',
      num_items: selectedQty,
    })
  }

  return (
    <>
    <div
      ref={priceBlockRef}
      className="relative min-w-0 max-w-full overflow-hidden rounded-[1.35rem] border border-white/75 p-5 shadow-[0_2px_8px_-2px_rgba(26,24,21,0.04),0_24px_56px_-28px_rgba(26,24,21,0.11),inset_0_1px_0_0_rgba(255,255,255,0.94)] ring-1 ring-black/[0.02] sm:rounded-3xl sm:p-6"
      style={{
        background: `linear-gradient(165deg, #ffffff 0%, color-mix(in srgb, ${product.bgColor} 35%, white) 55%, color-mix(in srgb, ${product.bgColor} 18%, white) 100%)`,
      }}
    >
      <div
        className="pointer-events-none absolute -top-24 -left-24 h-48 w-48 rounded-full opacity-[0.12] blur-3xl"
        style={{ background: accent }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-16 -right-16 h-40 w-40 rounded-full opacity-[0.1] blur-2xl"
        style={{ background: accent }}
        aria-hidden
      />

      <div className="relative flex min-w-0 max-w-full flex-col gap-5 sm:gap-6">
        <OfferSelector selected={selectedQty} onChange={(qty) => setSelectedQty(qty)} accentColor={accent} />

        <PdpRoutineNote productId={product.id} accentColor={accent} />

        <div className="h-px w-full bg-gradient-to-l from-transparent via-[#dfd6d4] to-transparent" aria-hidden />

        <button
          onClick={handleAdd}
          type="button"
          className="group relative w-full max-w-full overflow-hidden rounded-2xl px-4 py-4 text-sm font-extrabold tracking-tight text-white transition-[transform,filter,box-shadow] duration-300 ease-out break-words touch-manipulation hover:brightness-105 hover:shadow-lg active:translate-y-[1px] sm:rounded-3xl sm:px-5 sm:py-[1.1rem] sm:text-base md:text-lg"
          style={{
            background: `linear-gradient(145deg, ${accent} 0%, ${accentDeep} 55%, ${shadeTowardBlack(accent, 0.12)} 100%)`,
            boxShadow: `0 6px 24px -4px ${accent}66`,
          }}
        >
          <span
            className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/55 to-transparent opacity-70"
            aria-hidden
          />
          <span
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/[0.12] via-transparent to-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            aria-hidden
          />
          <span className="relative z-[1] flex items-center justify-center gap-3 flex-row-reverse">
            <CartIcon className="h-5 w-5 shrink-0 opacity-95 transition-transform duration-300 group-hover:scale-110 sm:h-6 sm:w-6" />
            <span className="text-center text-[0.9375rem] font-extrabold leading-snug sm:text-base sm:leading-normal md:text-lg">
              <span className="block sm:inline">{addToCartLabel}</span>
              <span className="mx-1 text-white/90 sm:inline" aria-hidden>
                {' '}
                —{' '}
              </span>
              <span className="sar-price sar-price-dark tabular-nums">
                {formatSarAmount(getPriceForQty(selectedQty))}
              </span>
            </span>
          </span>
        </button>

        <p className="text-center text-xs leading-relaxed text-muted sm:text-[13px]">
          <a
            href="/returns-refunds"
            className="font-semibold text-authority underline decoration-authority/30 underline-offset-2 transition hover:decoration-authority"
          >
            تفاصيل الضمان والاسترجاع
          </a>
          <span className="text-border mx-2" aria-hidden>
            ·
          </span>
          <span>الدفع عند الاستلام والتأكيد والشحن موضّحين في الشريط الملوّن تحت هذا القسم.</span>
        </p>
      </div>
    </div>

    <PdpStickyRoutineCta
      visible={stickyCtaVisible}
      accentColor={accent}
      accentDeep={accentDeep}
      label={addToCartLabel}
      formattedPrice={formatSarAmount(getPriceForQty(selectedQty))}
      onClick={scrollToPrice}
    />
    </>
  )
}
