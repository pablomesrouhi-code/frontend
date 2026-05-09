'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { PRODUCTS, getProductById } from '@/lib/products'
import ProductCard from '@/components/product/ProductCard'

type OrderItem = { productId: string; offerQty: number; price: number; nameAr: string }
type OrderData = {
  name: string
  phone: string
  items: OrderItem[]
  total: number
  upsellAccepted: boolean
  upsellProduct: { id: string; nameAr: string } | null
  upsellPrice: number
  finalTotal: number
  createdAt: string
}

export default function ThankYouPage() {
  const [order, setOrder] = useState<OrderData | null>(null)

  useEffect(() => {
    const raw = sessionStorage.getItem('nabtalabo_order')
    if (raw) {
      try { setOrder(JSON.parse(raw)) } catch {}
    }
  }, [])

  const orderedIds = order?.items.map((i) => i.productId) ?? []
  if (order?.upsellAccepted && order.upsellProduct) {
    orderedIds.push(order.upsellProduct.id)
  }
  const recommendations = PRODUCTS.filter((p) => !orderedIds.includes(p.id))

  return (
    <div className="bg-[#FFFFFF] min-h-screen py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        {/* Success Header */}
        <div className="bg-[#b8485c] text-white rounded-3xl p-8 text-center mb-8">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 text-4xl">
            ✅
          </div>
          <h1 className="text-3xl font-bold mb-2">تم استلام طلبك بنجاح!</h1>
          <p className="text-white/80 text-lg">
            شكراً لكِ {order?.name ? `${order.name}` : ''}. وصلنا طلبك وسيتواصل معك فريقنا لتأكيد التفاصيل وترتيب التوصيل.
          </p>
        </div>

        {/* Phone CTA */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl px-6 py-4 mb-6 flex items-start gap-3">
          <span className="text-2xl">📱</span>
          <div>
            <p className="font-bold text-amber-800">إبقي جوالك قريباً</p>
            <p className="text-sm text-amber-700 mt-1">
              سيتواصل معك فريق نبتة لابو على رقم {order?.phone ? order.phone : 'جوالك'} لتأكيد الطلب. يرجى الرد بسرعة لضمان التوصيل.
            </p>
          </div>
        </div>

        {/* Order Summary */}
        {order && (
          <div className="bg-white rounded-2xl p-6 mb-8 shadow-sm">
            <h2 className="font-bold text-[#1C1C1C] text-lg mb-4">ملخص طلبك</h2>
            {order.items.map((item) => (
              <div key={item.productId} className="flex justify-between items-center py-2.5 border-b border-gray-100 last:border-0">
                <span className="text-sm text-[#1C1C1C]">
                  {item.nameAr} — {item.offerQty === 1 ? 'قطعة' : item.offerQty === 2 ? 'قطعتين' : '3 قطع'}
                </span>
                <span className="font-bold text-[#b8485c] text-sm">{item.price} ريال</span>
              </div>
            ))}
            {order.upsellAccepted && order.upsellProduct && (
              <div className="flex justify-between items-center py-2.5 border-b border-gray-100">
                <span className="text-sm text-[#1C1C1C] flex items-center gap-2">
                  {order.upsellProduct.nameAr}
                  <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">عرض خاص</span>
                </span>
                <span className="font-bold text-[#b8485c] text-sm">99 ريال</span>
              </div>
            )}
            <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-200">
              <span className="font-bold text-[#1C1C1C]">المجموع الكلي</span>
              <span className="text-2xl font-bold text-[#b8485c]">{order.finalTotal} ريال</span>
            </div>
            <div className="mt-3 bg-[#f1e6e4] rounded-xl px-4 py-3">
              <p className="text-sm text-[#b8485c] font-medium">🛡️ الدفع عند الاستلام — لا تدفعي حتى يصل طلبك</p>
            </div>
          </div>
        )}

        {/* How it works from here */}
        <div className="bg-white rounded-2xl p-6 mb-8 shadow-sm">
          <h2 className="font-bold text-[#1C1C1C] text-lg mb-4">ماذا يحدث الآن؟</h2>
          <div className="flex flex-col gap-3">
            {[
              { icon: '📞', text: 'سيتصل بك فريقنا على رقم جوالك لتأكيد الطلب' },
              { icon: '📦', text: 'بعد التأكيد، يتم تجهيز طلبك وإرساله للتوصيل' },
              { icon: '🚚', text: 'يصل طلبك خلال 2-4 أيام عمل' },
              { icon: '💳', text: 'تدفعين عند الاستلام، لا مدفوعات مسبقة' },
            ].map((s) => (
              <div key={s.icon} className="flex items-start gap-3">
                <span className="text-xl shrink-0">{s.icon}</span>
                <p className="text-sm text-[#5c5656]">{s.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        {recommendations.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-[#1C1C1C] mb-2 text-center">كمّلي روتينك</h2>
            <p className="text-[#5c5656] text-center mb-6 text-sm">منتجات إضافية بأسعار الموقع الأصلية</p>
            <div className="grid sm:grid-cols-2 gap-5">
              {recommendations.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}

        {/* Home CTA */}
        <div className="text-center">
          <Link
            href="/"
            className="inline-block bg-[#b8485c] text-white font-bold px-8 py-3 rounded-full hover:bg-[#943c50] transition-colors"
          >
            العودة للرئيسية
          </Link>
        </div>
      </div>
    </div>
  )
}
