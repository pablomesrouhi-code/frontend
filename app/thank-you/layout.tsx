import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'شكرًا على طلبك | نبتة لابو',
  description: 'تأكيد الطلب: مكالمة للعنوان والتوصيل، دفع عند الاستلام داخل المملكة.',
  robots: { index: false, follow: true },
}

export default function ThankYouLayout({ children }: { children: ReactNode }) {
  return children
}
