const TTCLID_KEY = 'nabtalabo_ttclid'
const TTP_KEY = 'nabtalabo_ttp'
const SAFE_CLICK_ID = /^[A-Za-z0-9._-]{8,256}$/

function readCookie(name: string): string | null {
  if (typeof document === 'undefined') return null
  const parts = document.cookie.split(';')
  for (const part of parts) {
    const [k, ...rest] = part.trim().split('=')
    if (k === name) {
      const v = rest.join('=').trim()
      return v || null
    }
  }
  return null
}

function sanitizeClickId(raw: string | null | undefined): string | undefined {
  const v = raw?.trim()
  if (!v || !SAFE_CLICK_ID.test(v)) return undefined
  return v
}

/** Keep first-touch `ttclid` + `_ttp` across SPA navigation until checkout. */
export function persistTikTokClickIds(): void {
  if (typeof window === 'undefined') return
  try {
    const fromUrl = new URL(window.location.href).searchParams.get('ttclid')
    const ttclid = sanitizeClickId(fromUrl)
    if (ttclid) sessionStorage.setItem(TTCLID_KEY, ttclid)

    const ttp = sanitizeClickId(readCookie('_ttp'))
    if (ttp) sessionStorage.setItem(TTP_KEY, ttp)
  } catch {
    /* non-blocking */
  }
}

export function getTikTokClickIds(): { ttclid?: string; ttp?: string } {
  persistTikTokClickIds()
  if (typeof window === 'undefined') return {}
  try {
    return {
      ttclid: sanitizeClickId(sessionStorage.getItem(TTCLID_KEY)),
      ttp: sanitizeClickId(sessionStorage.getItem(TTP_KEY) ?? readCookie('_ttp')),
    }
  } catch {
    return {}
  }
}
