/** Thank-you only: server CAPI Lead (same `lead_event_id` as browser pixel). */

export async function ensureLeadCapi(
  base: string,
  orderId: string,
  leadEventId: string,
  attempts = 3,
): Promise<void> {
  const url = `${base.replace(/\/$/, '')}/api/orders/ensure-lead-capi`
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
      if (res.ok) return
    } catch {
      /* retry */
    }
    if (i < attempts - 1) {
      await new Promise((r) => setTimeout(r, 800 * (i + 1)))
    }
  }
}
