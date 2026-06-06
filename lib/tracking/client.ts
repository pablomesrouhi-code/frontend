'use client'

import { getMetaPixelId } from '@/lib/tracking/pixels-enabled'
import { normalizeSaPhoneForPixel } from '@/lib/tracking/phone'

/** Stable UUID for dedup with server CAPI (`event_id` / Meta `eventID`). */
export function newTrackingEventId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 12)}`
}

export type CommerceParams = {
  content_ids: string[]
  value: number
  currency?: string
  num_items?: number
}

type TrackOptions = {
  eventId?: string
  orderNumber?: string
}

function snapPixelId(): string | null {
  const raw = process.env.NEXT_PUBLIC_SNAP_PIXEL_ID?.trim()
  if (!raw || !/^[A-Za-z0-9_-]{4,64}$/.test(raw)) return null
  return raw
}

/** Plain phone for browser advanced matching — hashing happens server-side on CAPI. */
export function setTrackingUser({ phone }: { phone: string }): void {
  if (typeof window === 'undefined') return
  const ph = normalizeSaPhoneForPixel(phone)
  if (!ph) return

  try {
    const metaId = getMetaPixelId()
    if (metaId && typeof window.fbq === 'function') {
      window.fbq('init', metaId, { ph })
    }
  } catch {
    /* non-blocking */
  }

  try {
    const digits = normalizeSaPhoneForPixel(phone)
    if (digits) {
      window.ttq?.identify?.({ phone_number: `+${digits}` })
    }
  } catch {
    /* non-blocking */
  }

  try {
    const snapId = snapPixelId()
    if (snapId && typeof window.snaptr === 'function') {
      window.snaptr('init', snapId, { user_phone_number: ph })
    }
  } catch {
    /* non-blocking */
  }
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

/** Same pattern as Meta — TikTok stub queues until `ttq.load` finishes on lazyOnload. */
export function whenTtqReady(callback: () => void, options?: { intervalMs?: number; timeoutMs?: number }): () => void {
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

  if (typeof window.ttq?.track === 'function') {
    queueMicrotask(runSafe)
    return () => {}
  }

  let cleared = false
  const deadline = Date.now() + timeoutMs
  const id = window.setInterval(() => {
    if (cleared) return
    if (typeof window.ttq?.track === 'function' || Date.now() > deadline) {
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

function runMetaWhenReady(callback: () => void): void {
  whenFbqReady(callback)
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

function tiktokDebug(event: string, payload: Record<string, unknown>): void {
  if (process.env.NEXT_PUBLIC_TIKTOK_DEBUG?.trim().toLowerCase() === 'true') {
    // eslint-disable-next-line no-console
    console.info('[tiktok pixel]', event, payload)
  }
}

export function trackTikTok(
  event: string,
  params?: Record<string, unknown>,
  options?: { eventId?: string },
): void {
  if (typeof window === 'undefined') return

  const payload: Record<string, unknown> = { ...(params ?? {}) }
  if (options?.eventId) {
    payload.event_id = options.eventId
  }

  tiktokDebug(event, payload)

  try {
    if (typeof window.ttq?.track !== 'function') return
    window.ttq.track(event, payload)
  } catch {
    /* non-blocking */
  }
}

export function trackSnap(
  event: string,
  params?: Record<string, unknown>,
  options?: { clientDedupId?: string },
): void {
  if (typeof window === 'undefined' || typeof window.snaptr !== 'function') return
  try {
    const payload = { ...(params ?? {}) }
    if (options?.clientDedupId) {
      payload.client_dedup_id = options.clientDedupId
    }
    window.snaptr('track', event, payload)
  } catch {
    /* non-blocking */
  }
}

function tiktokContents(contentIds: string[]) {
  return contentIds.map((content_id) => ({ content_id, content_type: 'product' }))
}

function tiktokCommercePayload(params: CommerceParams) {
  const currency = params.currency ?? 'SAR'
  const quantity = params.num_items ?? params.content_ids.length
  return {
    contents: tiktokContents(params.content_ids),
    content_ids: params.content_ids,
    content_type: 'product' as const,
    value: Number(params.value),
    currency,
    quantity,
  }
}

function snapItemPayload(params: CommerceParams) {
  return {
    item_ids: params.content_ids,
    price: params.value,
    currency: params.currency ?? 'SAR',
    number_items: params.num_items ?? params.content_ids.length,
  }
}

export function trackViewContent(params: CommerceParams, options?: TrackOptions): void {
  const currency = params.currency ?? 'SAR'
  const metaParams = {
    content_ids: params.content_ids,
    content_type: 'product',
    value: params.value,
    currency,
  }
  const tiktokParams = tiktokCommercePayload(params)

  runMetaWhenReady(() => {
    trackMeta('ViewContent', metaParams)
  })
  trackTikTok('ViewContent', tiktokParams, { eventId: options?.eventId })
  trackSnap('VIEW_CONTENT', snapItemPayload(params), { clientDedupId: options?.eventId })
}

export function trackAddToCart(params: CommerceParams, options?: TrackOptions): void {
  const currency = params.currency ?? 'SAR'
  const metaParams = {
    content_ids: params.content_ids,
    content_type: 'product',
    value: params.value,
    currency,
    num_items: params.num_items ?? 1,
  }
  const tiktokParams = tiktokCommercePayload(params)

  runMetaWhenReady(() => {
    trackMeta('AddToCart', metaParams)
  })
  trackTikTok('AddToCart', tiktokParams, { eventId: options?.eventId })
  trackSnap('ADD_CART', snapItemPayload(params), { clientDedupId: options?.eventId })
}

export function trackInitiateCheckout(params: CommerceParams, options?: TrackOptions): void {
  const currency = params.currency ?? 'SAR'
  const metaParams = {
    content_ids: params.content_ids,
    content_type: 'product',
    value: params.value,
    currency,
    num_items: params.num_items ?? params.content_ids.length,
  }
  const tiktokParams = tiktokCommercePayload(params)

  runMetaWhenReady(() => {
    trackMeta('InitiateCheckout', metaParams)
  })
  trackTikTok('InitiateCheckout', tiktokParams, { eventId: options?.eventId })
  trackSnap('START_CHECKOUT', snapItemPayload(params), { clientDedupId: options?.eventId })
}

export function trackAddToWishlist(params: CommerceParams, options?: TrackOptions): void {
  const currency = params.currency ?? 'SAR'
  const metaParams = {
    content_ids: params.content_ids,
    content_type: 'product',
    value: params.value,
    currency,
  }
  const tiktokParams = tiktokCommercePayload(params)

  runMetaWhenReady(() => {
    trackMeta('AddToWishlist', metaParams)
  })
  trackTikTok('AddToWishlist', tiktokParams, { eventId: options?.eventId })
  trackSnap('ADD_TO_WISHLIST', snapItemPayload(params), { clientDedupId: options?.eventId })
}

export function trackSearch(params: { search_string: string }, options?: TrackOptions): void {
  runMetaWhenReady(() => {
    trackMeta('Search', { search_string: params.search_string })
  })
  trackTikTok('Search', { query: params.search_string }, { eventId: options?.eventId })
  trackSnap('SEARCH', { search_string: params.search_string }, { clientDedupId: options?.eventId })
}

export function trackLead(params: CommerceParams, options: TrackOptions): void {
  const eventId = options.eventId
  if (!eventId) return

  const metaParams = {
    content_ids: params.content_ids,
    content_type: 'product',
    value: params.value,
    currency: params.currency ?? 'SAR',
  }

  // Events Manager lists this event as code Lead (not SubmitForm).
  trackTikTok('Lead', tiktokCommercePayload(params), { eventId })
  trackTikTok('SubmitForm', tiktokCommercePayload(params), { eventId: `${eventId}-form` })
  trackSnap('SIGN_UP', { ...snapItemPayload(params), sign_up_method: 'checkout' }, { clientDedupId: eventId })

  whenFbqReady(() => {
    trackMeta('Lead', metaParams, { eventID: eventId })
  })
}

export function trackPurchase(params: CommerceParams, options: TrackOptions): void {
  const currency = params.currency ?? 'SAR'
  const eventId = options.eventId
  if (!eventId) return

  const metaParams = {
    content_ids: params.content_ids,
    content_type: 'product',
    value: params.value,
    currency,
    num_items: params.num_items ?? params.content_ids.length,
  }

  const purchasePayload = {
    ...tiktokCommercePayload(params),
    ...(options.orderNumber ? { order_id: options.orderNumber } : {}),
  }

  trackTikTok('Purchase', purchasePayload, { eventId })
  trackTikTok('PlaceAnOrder', purchasePayload, { eventId: `${eventId}-order` })
  trackTikTok('CompleteRegistration', tiktokCommercePayload(params), { eventId: `${eventId}-reg` })
  trackSnap(
    'PURCHASE',
    {
      ...snapItemPayload(params),
      transaction_id: options.orderNumber ?? eventId,
    },
    { clientDedupId: eventId },
  )

  whenFbqReady(() => {
    trackMeta('Purchase', metaParams, { eventID: eventId })
  })
}
