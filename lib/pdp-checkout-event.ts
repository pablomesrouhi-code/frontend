export const PDP_OPEN_CHECKOUT_EVENT = 'nabta-pdp-open-checkout'

export function openPdpCheckout(qty?: 1 | 2 | 3) {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new CustomEvent(PDP_OPEN_CHECKOUT_EVENT, { detail: { qty } }))
}
