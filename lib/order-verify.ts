/** Thank-you gate: only Meta Lead/Purchase when API confirms the order. */

export type TrackingVerifyResult = {
  ok: boolean
  meta_ok: boolean
  reason?: string
  order_number?: string
  purchase_event_id?: string | null
}

export async function verifyOrderTracking(
  base: string,
  orderId: string,
  leadEventId: string,
  attempts = 3,
): Promise<TrackingVerifyResult> {
  const url = `${base.replace(/\/$/, '')}/api/orders/verify-tracking`
  const body = JSON.stringify({ order_id: orderId, lead_event_id: leadEventId })

  for (let i = 0; i < attempts; i++) {
    try {
      const res = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-store',
        credentials: 'omit',
        headers: { 'Content-Type': 'application/json' },
        body,
      })
      if (!res.ok) {
        if (i < attempts - 1) {
          await new Promise((r) => setTimeout(r, 700 * (i + 1)))
          continue
        }
        return { ok: false, meta_ok: false, reason: `http_${res.status}` }
      }
      const j = (await res.json()) as TrackingVerifyResult
      return {
        ok: Boolean(j.ok),
        meta_ok: Boolean(j.meta_ok),
        reason: typeof j.reason === 'string' ? j.reason : undefined,
        order_number: typeof j.order_number === 'string' ? j.order_number : undefined,
        purchase_event_id:
          typeof j.purchase_event_id === 'string' ? j.purchase_event_id : null,
      }
    } catch {
      if (i < attempts - 1) {
        await new Promise((r) => setTimeout(r, 700 * (i + 1)))
      }
    }
  }
  return { ok: false, meta_ok: false, reason: 'network' }
}
