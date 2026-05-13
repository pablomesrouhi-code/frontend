'use client'
import { useState } from 'react'
import { Product, getPriceForQty } from '@/lib/products'
import { useCartStore } from '@/stores/cart-store'
import OfferSelector from '@/components/product/OfferSelector'

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
    <svg className={className} width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
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

export default function ProductPageClient({ product }: { product: Product }) {
  const [selectedQty, setSelectedQty] = useState<1 | 2 | 3>(1)
  const { addItem, openCart } = useCartStore()
  const accent = product.accentColor
  const accentDeep = shadeTowardBlack(accent, 0.28)

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
    <div
      className="relative min-w-0 max-w-full overflow-hidden rounded-[1.35rem] sm:rounded-3xl border border-white/70 p-5 sm:p-6 shadow-[0_4px_6px_-1px_rgba(26,24,21,0.04),0_20px_50px_-24px_rgba(26,24,21,0.14),inset_0_1px_0_0_rgba(255,255,255,0.92)]"
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

      <div className="relative flex flex-col gap-5 sm:gap-6 min-w-0 max-w-full">
        <OfferSelector selected={selectedQty} onChange={(qty) => setSelectedQty(qty)} accentColor={accent} />

        <div className="h-px w-full bg-gradient-to-l from-transparent via-[#dfd6d4] to-transparent" aria-hidden />

        <button
          onClick={handleAdd}
          type="button"
          className="group relative w-full max-w-full overflow-hidden rounded-2xl py-4 sm:py-[1.125rem] text-[15px] sm:text-lg font-extrabold text-white tracking-tight transition-[transform,filter,box-shadow] duration-300 ease-out break-words px-5 touch-manipulation hover:brightness-105 hover:shadow-lg active:translate-y-[1px]"
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
            <CartIcon className="shrink-0 opacity-95 transition-transform duration-300 group-hover:scale-110" />
            <span>
              أضيفي للسلة — <span className="tabular-nums">{getPriceForQty(selectedQty)}</span> ريال
            </span>
          </span>
        </button>

        <p className="text-center text-[11px] sm:text-xs leading-relaxed text-muted flex flex-wrap items-center justify-center gap-x-2 gap-y-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 shadow-sm ring-1 ring-black/[0.05]">
            <span aria-hidden className="text-emerald-600 text-sm leading-none">
              ✓
            </span>
            دفع عند الاستلام
          </span>
          <span className="hidden sm:inline text-border" aria-hidden>
            ·
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 shadow-sm ring-1 ring-black/[0.05]">
            <span aria-hidden className="text-[#c9937e] text-sm leading-none">
              ☎
            </span>
            تأكيد هاتفي قبل الشحن
          </span>
          <span className="hidden md:inline text-border" aria-hidden>
            ·
          </span>
          <a
            href="/returns-refunds"
            className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-muted shadow-sm ring-1 ring-authority/20 transition-colors hover:bg-authority/[0.07] hover:text-charcoal"
          >
            <span aria-hidden className="text-authority">
              ↩
            </span>
            ضمان 30 يوم — استرجاع كامل <span className="sr-only">(تفاصيل السياسة)</span>
          </a>
        </p>
      </div>
    </div>
  )
}
