/**
 * Base URL for FastAPI from the browser.
 *
 * **Production storefront (`nabtalabo.store`):** always resolves to **`NEXT_PUBLIC_API_URL`**
 * if set and sane; otherwise **`https://api.nabtalabo.store`**. This ignores mistaken
 * `NEXT_PUBLIC_USE_LOCAL_API`/proxy flags baked into a production bundle (fixes «تعذّر الاتصال»).
 *
 * Else (localhost, LAN IPs, Docker dev): see loopback LAN handling and `/nabtalabo-api-proxy` in `next.config.ts`.
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

function stripTrailingSlashes(url: string): string {
  return url.replace(/\/+$/, '')
}

/** Live site hosts where the browser must never call loopback/proxy URLs. */
function isDeployedNabtalaboHostname(hostname: string): boolean {
  const h = hostname.toLowerCase()
  return (
    h === 'nabtalabo.store' ||
    h === 'www.nabtalabo.store'
  )
}

export function getPublicApiBase(): string {
  const rawEnv = process.env.NEXT_PUBLIC_API_URL?.trim()
  const isDev = process.env.NODE_ENV === 'development'

  if (typeof window !== 'undefined') {
    const h = window.location.hostname

    if (isDeployedNabtalaboHostname(h)) {
      if (rawEnv && !isLoopbackApiUrl(rawEnv)) {
        return stripTrailingSlashes(rawEnv)
      }
      return stripTrailingSlashes(DEFAULT_PRODUCTION_API)
    }

    // Page on phone/another PC; API URL is loopback — only safe with dev rewrites or local Docker build.
    if (
      rawEnv &&
      isLoopbackApiUrl(rawEnv) &&
      h !== 'localhost' &&
      h !== '127.0.0.1' &&
      (isDev || useLocalBackend())
    ) {
      return LOCAL_API_PROXY_PREFIX
    }
    // npm run dev -H 0.0.0.0: open http://192.168.x.x:3000 without any API env
    if (isDev && isLanIPv4Hostname(h) && !rawEnv) {
      return LOCAL_API_PROXY_PREFIX
    }
  }

  if (rawEnv) return stripTrailingSlashes(rawEnv)

  if (useLocalBackend()) {
    return LOCAL_API_PROXY_PREFIX
  }

  if (typeof window !== 'undefined') {
    const host = window.location.hostname
    if (host === 'localhost' || host === '127.0.0.1') {
      return stripTrailingSlashes(DEFAULT_PRODUCTION_API)
    }
  }

  if (isDev && typeof window === 'undefined') {
    return stripTrailingSlashes(DEFAULT_PRODUCTION_API)
  }

  return stripTrailingSlashes(DEFAULT_PRODUCTION_API)
}
