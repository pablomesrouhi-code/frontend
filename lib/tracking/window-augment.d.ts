export {}

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
    _fbq?: typeof window.fbq
    TiktokAnalyticsObject?: string
    ttq?: {
      load: (pixelId: string) => void
      page: () => void
      track: (...args: unknown[]) => void
      identify: (...args: unknown[]) => void
      ready: (callback: () => void) => void
      instance: (pixelId: string) => unknown
      [key: string]: unknown
    }
    snaptr?: (...args: unknown[]) => void
  }
}
