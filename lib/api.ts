/**
 * Base URL for FastAPI (`NEXT_PUBLIC_API_URL`).
 *
 * Priority:
 * 1. `NEXT_PUBLIC_API_URL` (build / .env.local) — always wins if set.
 * 2. On `localhost`: **by default** use production API (`https://api.nabtalabo.store`) so `npm run dev`
 *    works without running FastAPI locally. Set `NEXT_PUBLIC_USE_LOCAL_API=true` + local backend on :8000 for docker-compose.
 * 3. Else production API.
 */
const DEFAULT_PRODUCTION_API = 'https://api.nabtalabo.store'

function useLocalBackend(): boolean {
  const v = process.env.NEXT_PUBLIC_USE_LOCAL_API
  return v === 'true' || v === '1'
}

export function getPublicApiBase(): string {
  const raw = process.env.NEXT_PUBLIC_API_URL?.trim()
  if (raw) return raw.replace(/\/+$/, '')

  const localApi = 'http://localhost:8000'

  if (typeof window !== 'undefined') {
    const h = window.location.hostname
    if (h === 'localhost' || h === '127.0.0.1') {
      if (useLocalBackend()) return localApi
      return DEFAULT_PRODUCTION_API.replace(/\/+$/, '')
    }
  }

  if (process.env.NODE_ENV === 'development' && typeof window === 'undefined') {
    if (useLocalBackend()) return localApi
    return DEFAULT_PRODUCTION_API.replace(/\/+$/, '')
  }

  return DEFAULT_PRODUCTION_API.replace(/\/+$/, '')
}
