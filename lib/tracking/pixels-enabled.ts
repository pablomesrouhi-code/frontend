const SAFE_PIXEL_ID = /^[A-Za-z0-9_-]{4,64}$/

/** Live Meta Pixel — fallback if EasyPanel build arg/runtime env is missing. */
const FALLBACK_META_PIXEL_ID = '24566837436275478'

function sanitizeId(raw: string | undefined): string | null {
  const v = raw?.trim()
  if (!v || !SAFE_PIXEL_ID.test(v)) return null
  return v
}

export function pixelsExplicitlyDisabled(): boolean {
  const v = process.env.NEXT_PUBLIC_ENABLE_PIXELS?.trim().toLowerCase()
  return v === 'false' || v === '0' || v === 'no'
}

/** Browser pixel: build-time `NEXT_PUBLIC_*`, runtime `META_PIXEL_ID`, or store fallback. */
export function getMetaPixelId(): string | null {
  if (pixelsExplicitlyDisabled()) return null
  return (
    sanitizeId(process.env.NEXT_PUBLIC_META_PIXEL_ID) ??
    sanitizeId(process.env.META_PIXEL_ID) ??
    sanitizeId(FALLBACK_META_PIXEL_ID)
  )
}

/** Same pattern as Meta — EasyPanel runtime `SNAP_PIXEL_ID` without rebuild. */
export function getSnapPixelId(): string | null {
  return (
    sanitizeId(process.env.NEXT_PUBLIC_SNAP_PIXEL_ID) ?? sanitizeId(process.env.SNAP_PIXEL_ID)
  )
}

export function hasAnyPixelId(): boolean {
  return Boolean(
    getMetaPixelId() ||
      sanitizeId(process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID) ||
      getSnapPixelId(),
  )
}

export function pixelsEnabled(): boolean {
  return !pixelsExplicitlyDisabled() && hasAnyPixelId()
}
