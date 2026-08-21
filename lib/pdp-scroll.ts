export const PDP_BUY_ANCHOR_ID = 'pdp-buy-anchor'

export function scrollToPdpForm() {
  if (typeof window === 'undefined') return
  document.getElementById(PDP_BUY_ANCHOR_ID)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
