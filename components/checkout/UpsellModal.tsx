'use client'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { formatSarAmount, getPriceForQty, getUpsellPriceSar, type Product } from '@/lib/products'
import { useStorePricing } from '@/components/pricing/StorePricingProvider'
import { CHECKOUT_UI_REV } from '@/lib/checkout-rev'

type Props = {
  product: Product
  placingOrder?: boolean
  checkoutError?: string | null
  onAccept: () => void
  onSkip: () => void
}

const TIMER_SECONDS = 10

export default function UpsellModal({
  product,
  placingOrder = false,
  checkoutError = null,
  onAccept,
  onSkip,
}: Props) {
  useStorePricing()
  const upsellPrice = getUpsellPriceSar()
  const comparePrice = getPriceForQty(1)
  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS)
  const choiceLockedRef = useRef(false)
  const onSkipRef = useRef(onSkip)
  const onAcceptRef = useRef(onAccept)

  onSkipRef.current = onSkip
  onAcceptRef.current = onAccept

  useEffect(() => {
    if (!checkoutError) return
    choiceLockedRef.current = false
  }, [checkoutError])

  useEffect(() => {
    if (placingOrder || choiceLockedRef.current) return
    if (timeLeft <= 0) {
      choiceLockedRef.current = true
      onSkipRef.current()
      return
    }
    const t = setTimeout(() => setTimeLeft((n) => n - 1), 1000)
    return () => clearTimeout(t)
  }, [timeLeft, placingOrder])

  const progress = (timeLeft / TIMER_SECONDS) * 100
  const busy = placingOrder || choiceLockedRef.current

  function handleAccept() {
    if (busy) return
    choiceLockedRef.current = true
    onAcceptRef.current()
  }

  function handleSkip() {
    if (busy) return
    choiceLockedRef.current = true
    onSkipRef.current()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 px-4 pt-4 pb-[max(12px,env(safe-area-inset-bottom))] sm:p-4 sm:pb-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="upsell-modal-title"
        className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col min-h-0 max-h-[min(92vh,92dvh)] sm:max-h-[min(88vh,720px)]"
      >
        <div className="h-1.5 bg-gray-100 shrink-0">
          <div
            className="h-full bg-[#c9937e] transition-all duration-1000"
            style={{ width: placingOrder ? '0%' : `${progress}%` }}
          />
        </div>

        <div className="px-5 py-5 flex flex-col gap-4 flex-1 min-h-0 overflow-y-auto overscroll-y-contain touch-pan-y sm:px-6 sm:py-6">
          {checkoutError ? (
            <div className="rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm px-4 py-3">
              {checkoutError}
            </div>
          ) : null}

          <div className="flex items-center justify-between gap-2">
            <span className="bg-[#943c50] text-white text-xs font-bold px-3 py-1 rounded-full shrink-0">
              عرض سريع
            </span>
            {!placingOrder && (
              <span className="text-sm text-[#5c5656]">
                ينتهي خلال <strong className="text-[#b8485c]">{timeLeft}</strong> ث
              </span>
            )}
          </div>

          <div>
            <h2 id="upsell-modal-title" className="text-lg font-bold text-[#1C1C1C] sm:text-xl">
              {placingOrder ? 'جاري تأكيد طلبك…' : 'إضافة سريعة قبل الإرسال'}
            </h2>
            {!placingOrder && (
              <p className="text-sm text-[#5c5656] mt-1">اختياري — اضغطي أي زر للمتابعة</p>
            )}
          </div>

          <div className="bg-[#FFFFFF] rounded-2xl p-3 flex gap-3 items-start min-w-0 sm:p-4 sm:gap-4">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 overflow-hidden rounded-xl border border-gray-100 bg-white">
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
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-2">
                <span className="text-xl font-bold text-[#b8485c] sm:text-2xl">
                  <span className="sar-price tabular-nums">{formatSarAmount(upsellPrice)}</span>
                </span>
                <span className="text-sm text-gray-400 line-through">
                  <span className="sar-price tabular-nums">{formatSarAmount(comparePrice)}</span>
                </span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleAccept}
            disabled={busy}
            className="w-full bg-[#b8485c] text-white font-bold py-3.5 rounded-full text-base sm:py-4 sm:text-lg hover:bg-[#943c50] transition-colors disabled:opacity-60 touch-manipulation"
          >
            {placingOrder ? (
              <span className="inline-flex items-center justify-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" aria-hidden />
                جاري الإرسال…
              </span>
            ) : (
              <>نعم، أضيفيه · {formatSarAmount(upsellPrice)}</>
            )}
          </button>
          <button
            type="button"
            onClick={handleSkip}
            disabled={busy}
            className="w-full text-center text-sm text-[#5c5656] py-2 hover:text-[#1C1C1C] transition disabled:opacity-50 touch-manipulation"
          >
            {placingOrder ? 'انتظري لحظة…' : 'لا شكراً — أكملي طلبي'}
          </button>
          <p className="text-center text-[10px] text-gray-400 tabular-nums" aria-hidden>
            {CHECKOUT_UI_REV}
          </p>
        </div>
      </div>
    </div>
  )
}
