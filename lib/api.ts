/**
 * Base URL for FastAPI from the browser.
 *
 * Priority:
 * 1. **LAN / second device:** if the page is opened on a private IP (e.g. phone → `http://192.168.x.x:3000`)
 *    and `NEXT_PUBLIC_API_URL` is a **loopback** URL (`http://localhost:8000`), the phone would call itself —
 *    we force same-origin **`/nabtalabo-api-proxy`** instead (needs dev rewrites or USE_LOCAL build).
 * 2. **`NEXT_PUBLIC_USE_LOCAL_API=true`:** always use `/nabtalabo-api-proxy` (unless (1) already handled).
 * 3. **`NEXT_PUBLIC_API_URL`** if set (non-empty): use that absolute URL.
 * 4. **`next dev` + LAN hostname + no API URL:** use proxy (local backend on host :8000).
 * 5. On `localhost` / `127.0.0.1` without local flags: production API (dev without local FastAPI).
 * 6. Else production API.
 */

const DEFAULT_PRODUCTION_API = 'https://api.nabtalabo.store'

/** Must match `source` prefix in `next.config.ts` rewrites. */
const LOCAL_API_PROXY_PREFIX = '/nabtalabo-api-proxy'

function useLocalBackend(): boolean {
  const v = process.env.NEXT_PUBLIC_USE_LOCAL_API
  return v === 'true' || v === '1'
}

function isLoopbackApiUrl(url: string): boolean {
  try {
    const u = new URL(url.startsWith('http') ? url : `http://${url}`)
    return u.hostname === 'localhost' || u.hostname === '127.0.0.1'
  } catch {
    return false
  }
}

/** RFC1918 IPv4 host (typical home LAN). */
function isLanIPv4Hostname(h: string): boolean {
  if (h === 'localhost' || h === '127.0.0.1') return false
  const parts = h.split('.')
  if (parts.length !== 4) return false
  const n = parts.map((p) => Number(p))
  if (n.some((x) => Number.isNaN(x) || x < 0 || x > 255)) return false
  const [a, b] = n
  if (a === 10) return true
  if (a === 192 && b === 168) return true
  if (a === 172 && b >= 16 && b <= 31) return true
  return false
}

export function getPublicApiBase(): string {
  const raw = process.env.NEXT_PUBLIC_API_URL?.trim()
  const isDev = process.env.NODE_ENV === 'development'

  if (typeof window !== 'undefined') {
    const h = window.location.hostname
    // Page on phone/another PC; API URL is loopback — only safe with dev rewrites or local Docker build.
    if (
      raw &&
      isLoopbackApiUrl(raw) &&
      h !== 'localhost' &&
      h !== '127.0.0.1' &&
      (isDev || useLocalBackend())
    ) {
      return LOCAL_API_PROXY_PREFIX
    }
    // npm run dev -H 0.0.0.0: open http://192.168.x.x:3000 without any API env
    if (isDev && isLanIPv4Hostname(h) && !raw) {
      return LOCAL_API_PROXY_PREFIX
    }
  }

  if (raw) return raw.replace(/\/+$/, '')

  if (useLocalBackend()) {
    return LOCAL_API_PROXY_PREFIX
  }

  if (typeof window !== 'undefined') {
    const h = window.location.hostname
    if (h === 'localhost' || h === '127.0.0.1') {
      return DEFAULT_PRODUCTION_API.replace(/\/+$/, '')
    }
  }

  if (isDev && typeof window === 'undefined') {
    return DEFAULT_PRODUCTION_API.replace(/\/+$/, '')
  }

  return DEFAULT_PRODUCTION_API.replace(/\/+$/, '')
}
