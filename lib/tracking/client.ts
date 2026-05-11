'use client'

/** Stable UUID for dedup with server CAPI (`event_id` / Meta `eventID`). */
export function newTrackingEventId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 12)}`
}

/** Fire page-view equivalents after SPA navigations (layout persists in App Router). */
export function fireDeferredPageView(): void {
  if (typeof window === 'undefined') return
  try {
    window.fbq?.('track', 'PageView')
  } catch {
    /* non-blocking */
  }
  try {
    window.ttq?.page?.()
  } catch {
    /* non-blocking */
  }
  try {
    window.snaptr?.('track', 'PAGE_VIEW')
  } catch {
    /* non-blocking */
  }
}

type MetaTrackOptions = { eventID?: string }

/**
 * DeferredPixels loads Meta asynchronously (often `lazyOnload`). Checkout may hit /thank-you
 * before `fbq` exists — polling avoids silently dropping Purchase/Lead.
 */
export function whenFbqReady(callback: () => void, options?: { intervalMs?: number; timeoutMs?: number }): () => void {
  if (typeof window === 'undefined') return () => {}
  const intervalMs = options?.intervalMs ?? 100
  const timeoutMs = options?.timeoutMs ?? 10000

  const runSafe = (): void => {
    try {
      callback()
    } catch {
      /* non-blocking */
    }
  }

  if (typeof window.fbq === 'function') {
    queueMicrotask(runSafe)
    return () => {}
  }

  let cleared = false
  const deadline = Date.now() + timeoutMs
  const id = window.setInterval(() => {
    if (cleared) return
    if (typeof window.fbq === 'function' || Date.now() > deadline) {
      cleared = true
      window.clearInterval(id)
      runSafe()
    }
  }, intervalMs)

  return () => {
    cleared = true
    window.clearInterval(id)
  }
}

export function trackMeta(
  eventName: string,
  params?: Record<string, unknown>,
  options?: MetaTrackOptions,
): void {
  if (typeof window === 'undefined' || typeof window.fbq !== 'function') return
  try {
    const eventID = options?.eventID
    const hasParams = params !== undefined && Object.keys(params).length > 0
    if (eventID) {
      window.fbq('track', eventName, hasParams ? params : {}, { eventID })
    } else if (hasParams) {
      window.fbq('track', eventName, params)
    } else {
      window.fbq('track', eventName)
    }
  } catch {
    /* non-blocking */
  }
}

export function trackTikTok(event: string, params?: Record<string, unknown>): void {
  if (typeof window === 'undefined' || typeof window.ttq?.track !== 'function') return
  try {
    window.ttq.track(event, params ?? {})
  } catch {
    /* non-blocking */
  }
}

export function trackSnap(event: string, params?: Record<string, unknown>): void {
  if (typeof window === 'undefined' || typeof window.snaptr !== 'function') return
  try {
    window.snaptr('track', event, params ?? {})
  } catch {
    /* non-blocking */
  }
}
