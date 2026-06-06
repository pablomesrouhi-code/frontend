/** SA mobile → `9665xxxxxxxx` digits for pixel advanced matching (plain, no client hash). */
export function normalizeSaPhoneForPixel(raw: string): string | null {
  if (!raw?.trim()) return null
  const d = raw.replace(/\D/g, '')
  if (d.length === 10 && d.startsWith('0')) return `966${d.slice(1)}`
  if (d.length === 9 && d.startsWith('5')) return `966${d}`
  if (d.startsWith('966') && d.length >= 12) return d
  return d.length >= 9 ? d : null
}
