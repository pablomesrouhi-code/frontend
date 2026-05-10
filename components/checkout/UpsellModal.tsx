'use client'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { Product } from '@/lib/products'

type Props = {
  product: Product
  placingOrder?: boolean
  onAccept: () => void
  onSkip: () => void
}

const TIMER_SECONDS = 15

export default function UpsellModal({
  product,
  placingOrder = false,
  onAccept,
  onSkip,
}: Props) {
  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS)
  const autoSkipFiredRef = useRef(false)

  useEffect(() => {
    if (placingOrder) return
    if (timeLeft <= 0) {
      if (!autoSkipFiredRef.current) {
        autoSkipFiredRef.current = true
        onSkip()
      }
      return
    }
    const t = setTimeout(() => setTimeLeft((t) => t - 1), 1000)
    return () => clearTimeout(t)
  }, [timeLeft, onSkip, placingOrder])

  const progress = (timeLeft / TIMER_SECONDS) * 100

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden">
        {/* Timer bar */}
        <div className="h-1.5 bg-gray-100">
          <div
            className="h-full bg-[#c9937e] transition-all duration-1000"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="px-6 py-6 flex flex-col gap-5">
          {/* Badge */}
          <div className="flex items-center justify-between">
            <span className="bg-[#943c50] text-white text-xs font-bold px-3 py-1 rounded-full">
              عرض خاص
            </span>
            <span className="text-sm text-[#5c5656]">
              ينتهي خلال <strong className="text-[#b8485c]">{timeLeft}</strong> ث
            </span>
          </div>

          {/* Headline */}
          <div>
            <h2 className="text-xl font-bold text-[#1C1C1C]">عرض خاص قبل تأكيد طلبك!</h2>
            <p className="text-sm text-[#5c5656] mt-1">أضيفي هذا المنتج الآن بسعر مخفوض خاص</p>
          </div>

          {/* Product */}
          <div className="bg-[#FFFFFF] rounded-2xl p-4 flex gap-4 items-center">
            <div className="relative w-20 h-20 shrink-0 overflow-hidden rounded-xl border border-gray-100 bg-white">
              <Image
                src={product.coverImage}
                alt={product.nameAr}
                width={product.coverWidth}
                height={product.coverHeight}
                className="object-contain object-center w-full h-full p-0.5"
              />
            </div>
            <div className="flex-1">
              <p className="font-bold text-[#1C1C1C]">{product.nameAr}</p>
              <p className="text-xs text-[#5c5656] mt-1 leading-relaxed">{product.subtitleAr}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-2xl font-bold text-[#b8485c]">99 ريال</span>
                <span className="text-sm text-gray-400 line-through">199 ريال</span>
                <span className="text-xs bg-[#f1e6e4] text-[#943c50] px-2 py-0.5 rounded-full font-bold">50% خصم</span>
              </div>
            </div>
          </div>

          {/* CTAs */}
          <button
            type="button"
            onClick={onAccept}
            disabled={placingOrder}
            className="w-full bg-[#b8485c] text-white font-bold py-4 rounded-full text-lg hover:bg-[#943c50] transition-colors disabled:opacity-60"
          >
            {placingOrder ? 'جاري الإرسال...' : 'أضيفيه لطلبي بـ 99 ريال'}
          </button>
          <button
            type="button"
            onClick={onSkip}
            disabled={placingOrder}
            className="w-full text-center text-sm text-[#5c5656] py-2 hover:text-[#1C1C1C] transition disabled:opacity-50"
          >
            لا شكراً، أكملي طلبي
          </button>
        </div>
      </div>
    </div>
  )
}
