/** Header, footer, and `metadata.icons` — override with `NEXT_PUBLIC_BRAND_LOGO` (path under `public/`). */
const raw = process.env.NEXT_PUBLIC_BRAND_LOGO?.trim()
export const BRAND_LOGO_SRC = raw && raw.length > 0 ? raw : '/nabta-lab-brand.png'

export function brandLogoIconType(src: string): string {
  const lower = src.split('?')[0]?.toLowerCase() ?? ''
  if (lower.endsWith('.svg')) return 'image/svg+xml'
  if (lower.endsWith('.ico')) return 'image/x-icon'
  return 'image/png'
}
