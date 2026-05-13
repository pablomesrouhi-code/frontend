/** Lightweight reachability ping for diagnostics (short timeout). */
export async function pingUrlOk(url: string, timeoutMs = 4500): Promise<boolean> {
  try {
    const ac = new AbortController()
    const t = setTimeout(() => ac.abort(), timeoutMs)
    const r = await fetch(url, { cache: 'no-store', signal: ac.signal })
    clearTimeout(t)
    return r.ok
  } catch {
    return false
  }
}
