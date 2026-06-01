const SAFE_PIXEL_ID = /^[A-Za-z0-9_-]{4,64}$/

function sanitizeId(raw: string | undefined): string | null {
  const v = raw?.trim()
  if (!v || !SAFE_PIXEL_ID.test(v)) return null
  return v
}

export function pixelsExplicitlyDisabled(): boolean {
  const v = process.env.NEXT_PUBLIC_ENABLE_PIXELS?.trim().toLowerCase()
  return v === 'false' || v === '0' || v === 'no'
}

export function getMetaPixelId(): string | null {
  return sanitizeId(process.env.NEXT_PUBLIC_META_PIXEL_ID)
}

export function hasAnyPixelId(): boolean {
  return Boolean(
    getMetaPixelId() ||
      sanitizeId(process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID) ||
      sanitizeId(process.env.NEXT_PUBLIC_SNAP_PIXEL_ID),
  )
}

export function pixelsEnabled(): boolean {
  return !pixelsExplicitlyDisabled() && hasAnyPixelId()
}
