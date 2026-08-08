import { getPublicApiBase } from '@/lib/api'

export type TierPrices = Record<'1' | '2' | '3', number>

export type StorePricing = {
  bundles: TierPrices
  upsell_sar: number
  productBundles: Record<string, TierPrices>
  combos: {
    rawnaq_shahr: number
    powder_trio: number
  }
}

export const DEFAULT_PRICING: StorePricing = {
  bundles: { '1': 199, '2': 279, '3': 349 },
  upsell_sar: 99,
  productBundles: {
    'shahr-hadi': { '1': 199, '2': 279, '3': 349 },
    naseej: { '1': 189, '2': 219, '3': 279 },
    vitaflow: { '1': 189, '2': 219, '3': 279 },
  },
  combos: {
    rawnaq_shahr: 349,
    powder_trio: 349,
  },
}

let active: StorePricing = DEFAULT_PRICING

export function getStorePricing(): StorePricing {
  return active
}

export function getPriceForQty(qty: 1 | 2 | 3, productId?: string): number {
  const key = String(qty) as '1' | '2' | '3'
  if (productId) {
    const override = active.productBundles[productId.trim().toLowerCase()]
    if (override?.[key] != null) return override[key]
  }
  return active.bundles[key] ?? DEFAULT_PRICING.bundles[key]
}

export function getUpsellPriceSar(): number {
  return active.upsell_sar
}

export function getComboPrice(combo: keyof StorePricing['combos']): number {
  return active.combos[combo] ?? DEFAULT_PRICING.combos[combo]
}

export type ProductOfferFormat = 'gummy' | 'powder_sachet' | 'powder_pouch'

export function getOffers(format: ProductOfferFormat = 'gummy', productId?: string) {
  const isPowder = format === 'powder_sachet' || format === 'powder_pouch'
  const isPouch = format === 'powder_pouch'
  const unit = isPowder ? 'عبوة' : 'علبة'
  const unitDual = isPowder ? 'عبوتان' : 'علبتان'
  const units3 = isPowder ? '3 عبوات' : '3 علب'
  const p1 = getPriceForQty(1, productId)
  const p2 = getPriceForQty(2, productId)
  const p3 = getPriceForQty(3, productId)
  return [
    {
      qty: 1 as const,
      label: `${unit} واحدة`,
      sublabel: isPouch
        ? 'عبوة مسحوق مع مكيال · الجرعة حسب الغلاف'
        : isPowder
          ? '30 مكيال · شهر كامل'
          : '60 علكة · شهر كامل',
      price: p1,
      badge: 'الأكثر اختياراً' as string | null,
    },
    {
      qty: 2 as const,
      label: `${unitDual} · ثبّتي النتيجة`,
      sublabel: isPouch
        ? 'عبوتان مسحوق · روتين أطول'
        : isPowder
          ? '60 مكيال · شهر + تثبيت'
          : '120 علكة · شهر النتيجة + تثبيت',
      price: p2,
      badge: null,
      saveVs: p1 * 2 - p2,
    },
    {
      qty: 3 as const,
      label: `${units3} · النتيجة الكاملة`,
      sublabel: isPouch
        ? '3 عبوات مسحوق · أفضل توفير'
        : isPowder
          ? '90 مكيال · نتيجة + تثبيت + هدية'
          : '180 علكة · نتيجة + تثبيت + هدية',
      price: p3,
      badge: 'الأكثر توفيراً',
      saveVs: p1 * 3 - p3,
    },
  ]
}

const PRICING_CACHE_KEY = 'nbta-store-pricing-v6'
const PRICING_CACHE_TTL_MS = 10 * 60 * 1000

function readCachedPricing(): StorePricing | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = sessionStorage.getItem(PRICING_CACHE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as { at?: number; pricing?: StorePricing }
    if (!parsed?.pricing || typeof parsed.at !== 'number') return null
    if (Date.now() - parsed.at > PRICING_CACHE_TTL_MS) return null
    return parsed.pricing
  } catch {
    return null
  }
}

function writeCachedPricing(pricing: StorePricing): void {
  if (typeof window === 'undefined') return
  try {
    sessionStorage.setItem(PRICING_CACHE_KEY, JSON.stringify({ at: Date.now(), pricing }))
  } catch {
    /* ignore */
  }
}

function normalizeTier(raw: Record<string, number> | undefined, fallback: TierPrices): TierPrices {
  return {
    '1': Number(raw?.['1']) || fallback['1'],
    '2': Number(raw?.['2']) || fallback['2'],
    '3': Number(raw?.['3']) || fallback['3'],
  }
}

export async function loadStorePricing(): Promise<StorePricing> {
  const cached = readCachedPricing()
  if (cached) {
    active = cached
    return active
  }

  const base = getPublicApiBase()
  try {
    const res = await fetch(`${base.replace(/\/$/, '')}/api/pricing`, {
      cache: 'default',
      credentials: 'omit',
    })
    if (!res.ok) return active
    const j = (await res.json()) as {
      bundles?: Record<string, number>
      upsell_sar?: number
      product_bundles?: Record<string, Record<string, number>>
      combos?: Record<string, number>
    }
    const productBundles: Record<string, TierPrices> = { ...DEFAULT_PRICING.productBundles }
    if (j.product_bundles && typeof j.product_bundles === 'object') {
      for (const [pid, tiers] of Object.entries(j.product_bundles)) {
        productBundles[pid.toLowerCase()] = normalizeTier(
          tiers,
          DEFAULT_PRICING.productBundles[pid.toLowerCase()] ?? DEFAULT_PRICING.bundles,
        )
      }
    }
    active = {
      bundles: normalizeTier(j.bundles, DEFAULT_PRICING.bundles),
      upsell_sar: Number(j.upsell_sar) || DEFAULT_PRICING.upsell_sar,
      productBundles,
      combos: {
        rawnaq_shahr: Number(j.combos?.rawnaq_shahr) || DEFAULT_PRICING.combos.rawnaq_shahr,
        powder_trio: Number(j.combos?.powder_trio) || DEFAULT_PRICING.combos.powder_trio,
      },
    }
    writeCachedPricing(active)
  } catch {
    /* keep defaults */
  }
  return active
}
