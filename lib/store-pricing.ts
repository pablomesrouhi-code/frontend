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
  return [
    {
      qty: 1 as const,
      label: `${unit} واحدة`,
      sublabel: isPouch ? 'عبوة مسحوق مع مكيال · الجرعة حسب الغلاف' : isPowder ? '30 مكيال · شهر كامل' : '60 علكة · شهر كامل',
      price: getPriceForQty(1),
      badge: null as string | null,
    },
    {
      qty: 2 as const,
      label: `${unitDual} · ثبّتي النتيجة`,
      sublabel: isPouch ? 'عبوتان مسحوق · روتين أطول' : isPowder ? '60 مكيال · شهر + تثبيت' : '120 علكة · شهر النتيجة + تثبيت',
      price: getPriceForQty(2),
      badge: 'الأكثر اختياراً',
    },
    {
      qty: 3 as const,
      label: `${units3} · النتيجة الكاملة`,
      sublabel: isPouch ? '3 عبوات مسحوق · أفضل توفير' : isPowder ? '90 مكيال · نتيجة + تثبيت + هدية' : '180 علكة · نتيجة + تثبيت + هدية',
      price: getPriceForQty(3),
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
