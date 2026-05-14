import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'شكرًا — تم استلام الطلب | نبتة لابو',
  description:
    'تأكيد طلب نبتة لابو: اتصال قصير للعنوان والتوصيل، دفع عند الاستلام داخل المملكة. احتفظي برقم المرجع.',
  robots: { index: false, follow: true },
}

export default function ThankYouLayout({ children }: { children: ReactNode }) {
  return children
}
