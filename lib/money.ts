/** Tiny SAR formatters — keep cart/checkout free of the full product catalog. */

export function formatSarAmount(amount: number): string {
  return `${amount}ريال سعودي`
}

export function formatSarCompact(amount: number): string {
  return `${amount} ر.س`
}

export function formatSarRiial(amount: number): string {
  return `${amount} ريال`
}
