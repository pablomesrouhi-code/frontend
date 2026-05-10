'use client'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { Product } from '@/lib/products'

type Props = {
  product: Product
  placingOrder?: boolean
  /** Shown on upsell step when API/network fails (otherwise user sees a “dead” screen). */
  checkoutError?: string | null
  onAccept: () => void
  onSkip: () => void
}

const TIMER_SECONDS = 15

/**
 * Parents often pass inline `() => finalizeOrder(...)` which changes every render.
 * If `onSkip` was in the timer effect deps, the countdown reset constantly and auto-skip / clicks could break.
 * Refs keep the latest callbacks without restarting the timer effect.
 */
export default function UpsellModal({
  product,
  placingOrder = false,
  checkoutError = null,
  onAccept,
  onSkip,
}: Props) {
  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS)
  const autoSkipFiredRef = useRef(false)
  const onSkipRef = useRef(onSkip)
  const onAcceptRef = useRef(onAccept)

  onSkipRef.current = onSkip
  onAcceptRef.current = onAccept

  useEffect(() => {
    if (placingOrder) return
    if (timeLeft <= 0) {
      if (!autoSkipFiredRef.current) {
        autoSkipFiredRef.current = true
        onSkipRef.current()
      }
      return
    }
    const t = setTimeout(() => setTimeLeft((n) => n - 1), 1000)
    return () => clearTimeout(t)
  }, [timeLeft, placingOrder])

  const progress = (timeLeft / TIMER_SECONDS) * 100

  function handleAccept() {
    if (placingOrder) return
    autoSkipFiredRef.current = true
    onAcceptRef.current()
  }

  function handleSkip() {
    if (placingOrder) return
    autoSkipFiredRef.current = true
    onSkipRef.current()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm px-4 pt-4 pb-[max(12px,env(safe-area-inset-bottom))] sm:p-4 sm:pb-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="upsell-modal-title"
        className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col min-h-0 max-h-[min(92vh,92dvh)] sm:max-h-[min(88vh,720px)]"
      >
        {/* Timer bar */}
        <div className="h-1.5 bg-gray-100 shrink-0">
          <div
            className="h-full bg-[#c9937e] transition-all duration-1000"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="px-6 py-6 flex flex-col gap-5 flex-1 min-h-0 overflow-y-auto overscroll-y-contain touch-pan-y pb-6 sm:pb-6">
          {checkoutError ? (
            <div className="rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm px-4 py-3">
              {checkoutError}
            </div>
          ) : null}
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
            <h2 id="upsell-modal-title" className="text-xl font-bold text-[#1C1C1C]">
              عرض خاص قبل تأكيد طلبك!
            </h2>
            <p className="text-sm text-[#5c5656] mt-1">أضيفي هذا المنتج الآن بسعر مخفوض خاص</p>
          </div>

          {/* Product */}
          <div className="bg-[#FFFFFF] rounded-2xl p-4 flex gap-4 items-start min-w-0">
            <div className="relative w-20 h-20 shrink-0 overflow-hidden rounded-xl border border-gray-100 bg-white">
              <Image
                src={product.coverImage}
                alt={product.nameAr}
                width={product.coverWidth}
                height={product.coverHeight}
                className="object-contain object-center w-full h-full p-0.5"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-[#1C1C1C] break-words">{product.nameAr}</p>
              <p className="text-xs text-[#5c5656] mt-1 leading-relaxed break-words">{product.subtitleAr}</p>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-2">
                <span className="text-2xl font-bold text-[#b8485c]">99 ريال</span>
                <span className="text-sm text-gray-400 line-through">199 ريال</span>
                <span className="text-xs bg-[#f1e6e4] text-[#943c50] px-2 py-0.5 rounded-full font-bold">
                  50% خصم
                </span>
              </div>
            </div>
          </div>

          {/* CTAs */}
          <button
            type="button"
            onClick={handleAccept}
            disabled={placingOrder}
            className="w-full bg-[#b8485c] text-white font-bold py-4 rounded-full text-lg hover:bg-[#943c50] transition-colors disabled:opacity-60"
          >
            {placingOrder ? 'جاري الإرسال...' : 'أضيفيه لطلبي بـ 99 ريال'}
          </button>
          <button
            type="button"
            onClick={handleSkip}
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
