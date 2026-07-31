import { getPublicApiBase } from '@/lib/api'

export type StorePricing = {
  bundles: Record<'1' | '2' | '3', number>
  upsell_sar: number
}

export const DEFAULT_PRICING: StorePricing = {
  bundles: { '1': 199, '2': 279, '3': 349 },
  upsell_sar: 99,
}

let active: StorePricing = DEFAULT_PRICING

export function getStorePricing(): StorePricing {
  return active
}

export function getPriceForQty(qty: 1 | 2 | 3): number {
  return active.bundles[String(qty) as '1' | '2' | '3'] ?? DEFAULT_PRICING.bundles[String(qty) as '1' | '2' | '3']
}

export function getUpsellPriceSar(): number {
  return active.upsell_sar
}

export type ProductOfferFormat = 'gummy' | 'powder_sachet' | 'powder_pouch'

export function getOffers(format: ProductOfferFormat = 'gummy') {
  const isPowder = format === 'powder_sachet' || format === 'powder_pouch'
  const isPouch = format === 'powder_pouch'
  const unit = isPowder ? 'عبوة' : 'علبة'
  const unitDual = isPowder ? 'عبوتان' : 'علبتان'
  const units3 = isPowder ? '3 عبوات' : '3 علب'
  const p1 = getPriceForQty(1)
  const p2 = getPriceForQty(2)
  const p3 = getPriceForQty(3)
  const save2 = p1 * 2 - p2
  const save3 = p1 * 3 - p3
  return [
    {
      qty: 1 as const,
      label: `${unit} واحدة`,
      sublabel: isPouch
        ? 'عبوة مسحوق مع مكيال · للتجربة الأولى'
        : isPowder
          ? '30 مكيال · شهر كامل للتجربة'
          : '60 علكة · شهر كامل للتجربة',
      price: p1,
      badge: null as string | null,
    },
    {
      qty: 2 as const,
      label: `${unitDual} · ثبّتي النتيجة`,
      sublabel: isPouch
        ? `عبوتان مسحوق · وفّري ${save2} ر.س`
        : isPowder
          ? `60 مكيال · وفّري ${save2} ر.س عن قطعتين بسعر كامل`
          : `120 علكة · وفّري ${save2} ر.س عن علبتين بسعر كامل`,
      price: p2,
      badge: 'شائع',
    },
    {
      qty: 3 as const,
      label: `${units3} · أقصى توفير`,
      sublabel: isPouch
        ? `3 عبوات · وفّري ${save3} ر.س · أرخص سعر للوحدة`
        : isPowder
          ? `90 مكيال · وفّري ${save3} ر.س · أرخص سعر للوحدة`
          : `180 علكة · وفّري ${save3} ر.س · أرخص سعر للوحدة`,
      price: p3,
      badge: 'الأكثر توفيراً',
    },
  ]
}

export async function loadStorePricing(): Promise<StorePricing> {
  const base = getPublicApiBase()
  try {
    const res = await fetch(`${base.replace(/\/$/, '')}/api/pricing`, {
      cache: 'no-store',
      credentials: 'omit',
    })
    if (!res.ok) return active
    const j = (await res.json()) as {
      bundles?: Record<string, number>
      upsell_sar?: number
    }
    const bundles = j.bundles || {}
    active = {
      bundles: {
        '1': Number(bundles['1']) || DEFAULT_PRICING.bundles['1'],
        '2': Number(bundles['2']) || DEFAULT_PRICING.bundles['2'],
        '3': Number(bundles['3']) || DEFAULT_PRICING.bundles['3'],
      },
      upsell_sar: Number(j.upsell_sar) || DEFAULT_PRICING.upsell_sar,
    }
  } catch {
    /* keep defaults */
  }
  return active
}
