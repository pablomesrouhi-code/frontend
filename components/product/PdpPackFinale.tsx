'use client'

import { useMemo, useState } from 'react'
import type { Product } from '@/lib/products'
import { getOffers, getPriceForQty, formatSarCompact, formatSarRiial } from '@/lib/products'
import { useStorePricing } from '@/components/pricing/StorePricingProvider'
import { useCartStore } from '@/stores/cart-store'
import { trackAddToCart } from '@/lib/tracking/client'
import { getProductSolidButtonStyle, shadeTowardBlack } from '@/lib/product-accent'
import { formatOfferSavings } from '@/lib/pdp-offer-copy'

type Qty = 1 | 2 | 3

function unitPrice(qty: Qty): number {
  return Math.round((getPriceForQty(qty) / qty) * 10) / 10
}

function savingsVsSingle(qty: Qty): number {
  if (qty === 1) return 0
  return getPriceForQty(1) * qty - getPriceForQty(qty)
}

function savingsPct(qty: Qty): number {
  if (qty === 1) return 0
  const full = getPriceForQty(1) * qty
  return Math.round((savingsVsSingle(qty) / full) * 100)
}

export default function PdpPackFinale({
  product,
  addToCartLabel = 'أضيفي للسلة',
}: {
  product: Product
  addToCartLabel?: string
}) {
  useStorePricing()
  const soldOut = product.availability === 'sold_out'
  const [selectedQty, setSelectedQty] = useState<Qty>(3)
  const { addItem, openCart } = useCartStore()
  const accent = product.accentColor
  const accentDeep = shadeTowardBlack(accent, 0.22)
  const offers = useMemo(() => getOffers(product.format ?? 'gummy'), [product.format])

  function handleAdd() {
    if (soldOut) return
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

  const selectedSave = savingsVsSingle(selectedQty)
  const selectedPct = savingsPct(selectedQty)

  return (
    <section
      id="pdp-pack-finale"
      className="scroll-mt-[calc(4.75rem+env(safe-area-inset-top))] border-y border-border py-12 sm:py-14 md:py-16"
      style={{
        background: `linear-gradient(165deg, ${product.bgColor}cc 0%, #fff 42%, ${accent}0d 100%)`,
      }}
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6" dir="rtl">
        <div className="text-center">
          <p
            className="mb-2 text-xs font-black uppercase tracking-[0.22em]"
            style={{ color: accent }}
          >
            باقات التوفير
          </p>
          <h2 className="text-2xl font-black leading-snug text-charcoal sm:text-3xl">
            اختاري باقتك — كل ما زادت الكمية زاد التوفير
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-[15px] leading-relaxed text-muted sm:text-base">
            قارني سعر العبوة الواحدة داخل كل عرض. الدفع عند الاستلام بعد التأكيد الهاتفي.
          </p>
        </div>

        {/* Unit-price comparison strip */}
        <div className="mt-8 grid grid-cols-3 gap-2 sm:gap-3">
          {([1, 2, 3] as const).map((qty) => {
            const best = qty === 3
            return (
              <div
                key={`unit-${qty}`}
                className={`rounded-2xl border px-2 py-3 text-center sm:px-3 sm:py-3.5 ${
                  best ? 'shadow-sm' : 'bg-white/80'
                }`}
                style={
                  best
                    ? {
                        borderColor: accent,
                        background: `linear-gradient(180deg, ${accent}14, #fff)`,
                      }
                    : { borderColor: `${accent}28` }
                }
              >
                <p className="text-[10px] font-bold text-muted sm:text-[11px]">
                  {qty === 1 ? 'قطعة' : qty === 2 ? 'قطعتين' : '3 قطع'}
                </p>
                <p
                  className="mt-1 text-sm font-black tabular-nums sm:text-base"
                  style={{ color: best ? accentDeep : '#1C1C1C' }}
                >
                  {formatSarCompact(unitPrice(qty))}
                </p>
                <p className="mt-0.5 text-[10px] text-muted">/ وحدة</p>
                {qty > 1 ? (
                  <p
                    className="mt-1.5 text-[10px] font-black sm:text-[11px]"
                    style={{ color: accentDeep }}
                  >
                    وفرّي {savingsPct(qty)}%
                  </p>
                ) : (
                  <p className="mt-1.5 text-[10px] text-muted">السعر الأساسي</p>
                )}
              </div>
            )
          })}
        </div>

        {/* Pack choices */}
        <div
          className="mt-6 flex flex-col gap-3"
          role="radiogroup"
          aria-label="اختاري باقة التوفير"
        >
          {offers.map((offer) => {
            const qty = offer.qty as Qty
            const active = selectedQty === qty
            const save = savingsVsSingle(qty)
            const pct = savingsPct(qty)
            const perUnit = unitPrice(qty)
            const emphasize = qty === 3

            return (
              <button
                key={qty}
                type="button"
                role="radio"
                aria-checked={active}
                disabled={soldOut}
                onClick={() => setSelectedQty(qty)}
                className={`relative overflow-hidden rounded-2xl border-2 px-4 py-4 text-right transition touch-manipulation disabled:opacity-50 sm:px-5 sm:py-5 ${
                  active ? 'shadow-md' : 'bg-white hover:bg-white/95'
                }`}
                style={
                  active
                    ? {
                        borderColor: accent,
                        background: `linear-gradient(135deg, ${accent}12, #fff 55%)`,
                        boxShadow: `0 10px 28px ${accent}22`,
                      }
                    : { borderColor: emphasize ? `${accent}55` : `${accent}22` }
                }
              >
                {emphasize && (
                  <span
                    className="absolute start-3 top-3 rounded-full px-2.5 py-0.5 text-[10px] font-black text-white"
                    style={{ background: accent }}
                  >
                    الأكثر توفيراً
                  </span>
                )}
                <div className="flex items-start justify-between gap-3 pt-1">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 ${
                          active ? '' : 'border-charcoal/20 bg-white'
                        }`}
                        style={
                          active
                            ? { borderColor: accent, background: accent }
                            : undefined
                        }
                        aria-hidden
                      >
                        {active && <span className="h-2 w-2 rounded-full bg-white" />}
                      </span>
                      <span className="text-base font-black text-charcoal sm:text-lg">
                        {offer.label}
                      </span>
                      {offer.badge && qty !== 3 && (
                        <span
                          className="rounded-full px-2 py-0.5 text-[10px] font-black text-white"
                          style={{ background: accent }}
                        >
                          {offer.badge}
                        </span>
                      )}
                    </div>
                    {offer.sublabel && (
                      <p className="mt-1.5 pr-8 text-xs leading-relaxed text-muted sm:text-sm">
                        {offer.sublabel}
                      </p>
                    )}
                    <p className="mt-2 pr-8 text-xs font-semibold text-charcoal/80">
                      سعر الوحدة: {formatSarCompact(perUnit)}
                      {pct > 0 ? ` · توفير ${pct}%` : ''}
                    </p>
                  </div>
                  <div className="shrink-0 text-start">
                    <p
                      className="text-xl font-black tabular-nums sm:text-2xl"
                      style={{ color: active ? accentDeep : '#1C1C1C' }}
                    >
                      {formatSarCompact(offer.price)}
                    </p>
                    {save > 0 && (
                      <span
                        className="mt-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-black tabular-nums"
                        style={{
                          background: `${accent}14`,
                          color: accentDeep,
                          border: `1px solid ${accent}40`,
                        }}
                      >
                        {formatOfferSavings(save)}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            )
          })}
        </div>

        <div className="mt-6 rounded-2xl border border-border bg-white/90 px-4 py-3 text-center sm:px-5">
          <p className="text-sm text-charcoal">
            اختيارك الآن:{' '}
            <strong className="font-black" style={{ color: accentDeep }}>
              {offers.find((o) => o.qty === selectedQty)?.label}
            </strong>
            {selectedSave > 0 ? (
              <>
                {' '}
                — توفّرين{' '}
                <span className="font-black tabular-nums" style={{ color: accentDeep }}>
                  {selectedSave} ر.س ({selectedPct}%)
                </span>
              </>
            ) : null}
          </p>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          disabled={soldOut}
          className="mt-5 w-full rounded-2xl px-5 py-4 text-base font-black text-white transition enabled:hover:brightness-105 enabled:active:translate-y-[1px] disabled:cursor-not-allowed disabled:bg-charcoal/70 sm:text-lg"
          style={soldOut ? undefined : getProductSolidButtonStyle(accent)}
        >
          {soldOut
            ? 'نفدت الكمية حالياً'
            : `${addToCartLabel} · ${formatSarRiial(getPriceForQty(selectedQty))}`}
        </button>
        <p className="mt-2.5 text-center text-[11px] font-semibold text-muted sm:text-xs">
          {soldOut
            ? 'سيعود قريباً — هذا المنتج غير قابل للطلب الآن'
            : 'الدفع عند الاستلام · بدون بطاقة أونلاين'}
        </p>
      </div>
    </section>
  )
}
