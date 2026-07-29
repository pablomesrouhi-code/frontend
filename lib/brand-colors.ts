/**
 * Nabta Labo V2 — warm light shell, mauve + gold. No pure black.
 */

export const BRAND = {
  /** Warm depth — mauve-brown from logo, NOT black */
  warmDeep: '#6E4545',
  warmMid: '#A87171',

  sand: '#F4F0EB',
  stone: '#D9D1C7',
  stoneLight: '#EBE5DD',

  primary: '#A87171',
  primaryDark: '#6E4545',
  primaryLight: '#D4A8A8',

  gold: '#C4A065',
  goldLight: '#E8D4B0',

  /** Legacy aliases */
  ink: '#6E4545',
  inkSoft: '#A87171',
  rose: '#A87171',
  roseDeep: '#6E4545',
  peach: '#C4A065',
  mocha: '#8A6B63',
  cream: '#F4F0EB',
  blush: '#EBE5DD',
  blushSoft: '#E3DCD3',
  border: '#D9D1C7',
  charcoal: '#3D3330',
  muted: '#6A625C',
  footer: '#6E4545',
  white: '#FFFCFA',

  glow: '#C25468',
  digest: '#A86B5E',
  sleep: '#8E6478',
  cognac: '#B5896A',
  sage: '#7A9484',
  mauve: '#8E6C8E',
} as const

export const BRAND_GRADIENTS = {
  banner: BRAND.sand,
  trustStrip: BRAND.blush,
  hero: `linear-gradient(165deg, ${BRAND.white} 0%, ${BRAND.sand} 45%, ${BRAND.blush} 100%)`,
  cta: `linear-gradient(165deg, ${BRAND.primaryDark} 0%, ${BRAND.primary} 100%)`,
  footerStripe: `linear-gradient(90deg, transparent, ${BRAND.gold}88, transparent)`,
  button: `linear-gradient(135deg, ${BRAND.primary} 0%, ${BRAND.primaryDark} 100%)`,
  ctaButton: BRAND.gold,
  goldLine: `linear-gradient(90deg, transparent, ${BRAND.gold}, transparent)`,
} as const

export const PRODUCT_BRAND: Record<
  string,
  { accent: string; bg: string; label?: string }
> = {
  'rawnaq-c': { accent: '#C25468', bg: '#F8EBE9', label: 'رونق C' },
  khiffabiotic: { accent: '#A86B5E', bg: '#F2EAE6', label: 'خفّة بيوتك' },
  laylmag: { accent: '#8E6478', bg: '#F2EBEF', label: 'ليل ماج' },
  'quwwat-sha3r': { accent: '#B5896A', bg: '#F9F1E8', label: 'قوة شعر' },
  wudouh: { accent: '#7A9484', bg: '#EDF2EE', label: 'وضوح' },
  'shahr-hadi': { accent: '#8E6C8E', bg: '#F0E9F0', label: 'شهر هادئ' },
  naseej: { accent: '#6B4C7A', bg: '#F3EEF5', label: 'نسيج' },
  vitaflow: { accent: '#B8784A', bg: '#F7F0E8', label: 'فيتا فلو' },
}

export function productBrand(productId: string) {
  return PRODUCT_BRAND[productId] ?? { accent: BRAND.primary, bg: BRAND.blushSoft }
}
