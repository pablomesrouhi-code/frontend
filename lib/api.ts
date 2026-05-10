/**
 * Base URL for FastAPI (`NEXT_PUBLIC_API_URL`).
 * If omitted at build time (EasyPanel without build args), production falls back to the
 * documented API host so checkout can still reach `POST /api/orders`.
 */
const DEFAULT_PRODUCTION_API = 'https://api.nabtalabo.store'

export function getPublicApiBase(): string | null {
  const raw = process.env.NEXT_PUBLIC_API_URL?.trim()
  if (raw) return raw.replace(/\/+$/, '')
  if (process.env.NODE_ENV === 'production') {
    return DEFAULT_PRODUCTION_API.replace(/\/+$/, '')
  }
  return null
}
