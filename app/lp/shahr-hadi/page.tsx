import type { Metadata } from 'next'
import ShahrHadiLanding from '@/components/landing/ShahrHadiLanding'

export const metadata: Metadata = {
  title: 'شهر هادئ — مسحوق دعم الدورة | اطلبي COD',
  description:
    'شهر هادئ: مسحوق مايو-إينوسيتول + فيتكس + مغنيسيوم + B6 لدعم أيام الدورة. 199 ر.س · دفع عند الاستلام · توصيل المملكة · نبتة لابو.',
  robots: { index: false, follow: false },
  openGraph: {
    title: 'شهر هادئ — مسحوق دعم الدورة',
    description: 'اطلبي الآن COD — عروض 199 / 279 / 349 ر.س',
    images: [{ url: '/lp/shahr-hadi/lead-01-split-pain-cup.png', width: 1024, height: 1365 }],
  },
}

export default function ShahrHadiLpPage() {
  return <ShahrHadiLanding />
}
