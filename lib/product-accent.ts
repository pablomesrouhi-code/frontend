/** ألوان الأزرار: على PDP حسب لون المنتج؛ على الهوم لون المتجر الموحّد. */

/** Stamp — bump to trigger EasyPanel frontend rebuild. */
export const FRONTEND_DEPLOY_STAMP = '2026-08-08-shahr-hadi-price-179'

/** ورد المتجر — أزرار وعناوين الصفحة الرئيسية. */
export const STORE_BUTTON_COLOR = '#b8485c'

export function shadeTowardBlack(hex: string, t: number) {
  const h = hex.replace('#', '')
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h
  const n = parseInt(full, 16)
  const r = (n >> 16) & 255
  const g = (n >> 8) & 255
  const b = n & 255
  const mix = (c: number) => Math.round(c * (1 - t))
  return `#${[mix(r), mix(g), mix(b)].map((x) => x.toString(16).padStart(2, '0')).join('')}`
}

/** زر إضافة للسلة / CTA — يمرَّر لون المنتج؛ وإلا لون المتجر. */
export function getProductSolidButtonStyle(accent: string = STORE_BUTTON_COLOR) {
  const accentDeep = shadeTowardBlack(accent, 0.28)
  const accentDeeper = shadeTowardBlack(accent, 0.12)
  return {
    background: `linear-gradient(145deg, ${accent} 0%, ${accentDeep} 55%, ${accentDeeper} 100%)`,
    border: `2px solid ${accent}`,
    boxShadow: `0 6px 24px -4px ${accent}66`,
  } as const
}

export function getProductOfferInactiveStyle(accent: string = STORE_BUTTON_COLOR) {
  return {
    borderColor: `${accent}33`,
    background: '#ffffff',
  } as const
}

export function getProductOfferActiveStyle(accent: string = STORE_BUTTON_COLOR) {
  return {
    borderColor: accent,
    background: `linear-gradient(135deg, color-mix(in srgb, ${accent} 16%, white) 0%, color-mix(in srgb, ${accent} 8%, white) 100%)`,
    boxShadow: `0 0 0 1px ${accent}44, 0 12px 40px -12px ${accent}55`,
  } as const
}
