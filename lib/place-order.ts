import { getUpsellPriceSar, type Product } from '@/lib/products'
import { newTrackingEventId, setTrackingUser } from '@/lib/tracking/client'

export type PlaceOrderLine = {
  product_id: string
  offer_qty: 1 | 2 | 3
}

export type OrderSummaryItem = {
  productId: string
  offerQty: 1 | 2 | 3
  price: number
  nameAr: string
  accentColor: string
  bgColor: string
}

export type PlaceOrderInput = {
  base: string
  customerName: string
  phone: string
  items: PlaceOrderLine[]
  summaryItems: OrderSummaryItem[]
  summaryTotal: number
  upsellAccepted: boolean
  upsellProduct: Product | null
  sourcePage?: string
}

export type PlaceOrderResult =
  | {
      ok: true
      orderNumber: string
      orderId: string
      totalSar: number
      purchaseEventId: string
      leadEventId: string
    }
  | { ok: false; error: string; status: number | null }

function formatFastApiDetail(body: Record<string, unknown>): string | null {
  const d = body.detail
  if (typeof d === 'string') return d
  if (Array.isArray(d)) {
    const msgs = d
      .map((item) =>
        typeof item === 'object' &&
        item !== null &&
        'msg' in item &&
        typeof (item as { msg: unknown }).msg === 'string'
          ? (item as { msg: string }).msg
          : null,
      )
      .filter(Boolean) as string[]
    if (msgs.length > 0) return msgs.join('، ')
  }
  return null
}

export async function captureFailedCheckout(
  base: string,
  customerName: string,
  phone: string,
  items: PlaceOrderLine[],
  failureStatus: number | null,
  failureDetail: string | null,
  sourcePage?: string,
): Promise<void> {
  const payload = JSON.stringify({
    customer_name: customerName,
    phone,
    items: items.map((i) => ({ product_id: i.product_id, offer_qty: i.offer_qty })),
    failure_status: failureStatus ?? undefined,
    failure_detail: failureDetail?.slice(0, 400) ?? undefined,
    source_page: sourcePage ?? (typeof window !== 'undefined' ? window.location.href : undefined),
  })
  const url = `${base.replace(/\/$/, '')}/api/leads/checkout-capture`
  for (let i = 0; i < 2; i++) {
    try {
      const res = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-store',
        credentials: 'omit',
        headers: { 'Content-Type': 'application/json' },
        body: payload,
      })
      if (res.ok) return
    } catch {
      /* retry */
    }
    await new Promise((r) => setTimeout(r, 600))
  }
}

export async function placeCodOrder(input: PlaceOrderInput): Promise<PlaceOrderResult> {
  const purchaseEventId = newTrackingEventId()
  const leadEventId = newTrackingEventId()
  const upsellAcceptedOk = input.upsellAccepted && !!input.upsellProduct
  const sourcePage =
    input.sourcePage ?? (typeof window !== 'undefined' ? window.location.href : undefined)

  const payload = {
    customer_name: input.customerName,
    phone: input.phone,
    items: input.items,
    accepted_upsell: upsellAcceptedOk,
    upsell_product_id: upsellAcceptedOk && input.upsellProduct ? input.upsellProduct.id : undefined,
    payment_method: 'cash_on_delivery' as const,
    source_page: sourcePage,
    purchase_event_id: purchaseEventId,
    client_event_id: leadEventId,
  }

  const fetchOpts: RequestInit = {
    method: 'POST',
    mode: 'cors',
    cache: 'no-store',
    credentials: 'omit',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  }

  let res: Response
  try {
    res = await fetch(`${input.base.replace(/\/$/, '')}/api/orders`, fetchOpts)
  } catch (e1) {
    if (e1 instanceof TypeError) {
      await new Promise((r) => setTimeout(r, 900))
      try {
        res = await fetch(`${input.base.replace(/\/$/, '')}/api/orders`, fetchOpts)
      } catch {
        return { ok: false, error: 'تعذّر الاتصال بالخادم. تحققي من الشبكة وأعيدي المحاولة.', status: null }
      }
    } else {
      return { ok: false, error: 'تعذّر إتمام الطلب؛ حدّثي الصفحة وأعيدي المحاولة.', status: null }
    }
  }

  let parsed: Record<string, unknown> = {}
  try {
    parsed = (await res.json()) as Record<string, unknown>
  } catch {
    /* empty */
  }

  if (!res.ok) {
    const msg =
      formatFastApiDetail(parsed) ||
      `تعذّر إرسال الطلب (${res.status}). جرّبي بعد قليل أو تواصلي مع الدعم.`
    const hint403 =
      res.status === 403
        ? ' إن كنتِ تختبرين من خارج السعودية، استخدمي 055000000.'
        : ''
    await captureFailedCheckout(
      input.base,
      input.customerName,
      input.phone,
      input.items,
      res.status,
      msg,
      sourcePage,
    )
    return { ok: false, error: msg + hint403, status: res.status }
  }

  const orderNumber = typeof parsed.order_number === 'string' ? parsed.order_number.trim() : ''
  const orderId = typeof parsed.order_id === 'string' ? parsed.order_id.trim() : ''
  const totalSarOk = typeof parsed.total_sar === 'number'

  if (!orderNumber || !orderId || !totalSarOk) {
    await captureFailedCheckout(
      input.base,
      input.customerName,
      input.phone,
      input.items,
      res.status,
      'invalid_order_response',
      sourcePage,
    )
    return {
      ok: false,
      error:
        'تعذّر تأكيد الطلب: لم نستلم تأكيدًا صالحًا من الخادم. جرّبي نافذة خاصة أو أعيدي المحاولة.',
      status: res.status,
    }
  }

  setTrackingUser({ phone: input.phone })

  const orderSummary = {
    name: input.customerName,
    phone: input.phone,
    items: input.summaryItems,
    total: input.summaryTotal,
    upsellAccepted: upsellAcceptedOk,
    upsellProduct: upsellAcceptedOk && input.upsellProduct ? input.upsellProduct : null,
    upsellPrice: upsellAcceptedOk ? getUpsellPriceSar() : 0,
    finalTotal: parsed.total_sar as number,
    createdAt: new Date().toISOString(),
    orderNumber,
    orderId,
    purchaseEventId,
    leadEventId,
  }

  sessionStorage.removeItem('nabtalabo_pixels_fired')
  sessionStorage.setItem('nabtalabo_order', JSON.stringify(orderSummary))
  sessionStorage.setItem('nbta-skip-intro', '1')

  return {
    ok: true,
    orderNumber,
    orderId,
    totalSar: parsed.total_sar as number,
    purchaseEventId,
    leadEventId,
  }
}

export function redirectToThankYou(): void {
  window.location.replace('/thank-you')
}
