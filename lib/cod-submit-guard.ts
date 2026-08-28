import { useCallback, useRef } from 'react'

/** Prevents double POST when upsell timer + button fire together. */
export function useCodSubmitGuard() {
  const inFlightRef = useRef(false)

  const tryBegin = useCallback(() => {
    if (inFlightRef.current) return false
    inFlightRef.current = true
    return true
  }, [])

  const end = useCallback(() => {
    inFlightRef.current = false
  }, [])

  return { tryBegin, end, inFlightRef }
}
