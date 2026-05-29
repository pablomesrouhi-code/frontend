import type { Metadata, Viewport } from 'next'
import { Suspense } from 'react'
import { IBM_Plex_Sans_Arabic } from 'next/font/google'
import './globals.css'
import AnalyticsBeacon from '@/components/analytics/AnalyticsBeacon'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import PreFooterBanners from '@/components/layout/PreFooterBanners'
import ClientCartDrawer from '@/components/layout/ClientCartDrawer'
import BrandIntroSplash from '@/components/brand/BrandIntroSplash'
const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic', 'latin'],
  weight: ['400', '600', '700'],
  display: 'swap',
  adjustFontFallback: true,
  variable: '--font-plex-arabic',
})

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL?.trim() || 'https://nabtalabo.store').replace(/\/+$/, '')

const ORG_JSON_LD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'نبتة لابو',
      alternateName: ['Nabta Labo', 'NabtaLabo'],
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/apple-icon`,
        width: 180,
        height: 180,
      },
      image: `${SITE_URL}/opengraph-image`,
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: 'نبتة لابو',
      alternateName: 'Nabta Labo',
      publisher: { '@id': `${SITE_URL}/#organization` },
      inLanguage: 'ar-SA',
    },
  ],
}

const DEFAULT_TITLE = 'نبتة لابو | Nabta Labo'
const DEFAULT_DESCRIPTION =
  'نبتة لابو: متجر بتجربة تقترب من ثقة نقطة اعتماد (صيدلية من حيث الانضباط والوضوح) — علكات تحمل تركيبات مكمّل غذائي مرخّص SFDA؛ لسنا نقطة تشخّص أو وصف جرعات. جمال يومي، راحة بعد الأكل، وهدوء مسائي. السعودية.'

export const viewport: Viewport = {
  themeColor: '#146b70',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: 'نبتة لابو',
  title: {
    default: DEFAULT_TITLE,
    template: '%s | نبتة لابو',
  },
  description: DEFAULT_DESCRIPTION,
  keywords:
    'علكات, علكة غذائية, مكمّل غذائي, سلطة منتج, كولاجين, بروبيوتيك, مغنيسيوم, SFDA, نساء السعودية, نبتة لابو, Nabta Labo',
  icons: {
    icon: [{ url: '/icon', sizes: '32x32', type: 'image/png' }],
    apple: [{ url: '/apple-icon', sizes: '180x180', type: 'image/png' }],
  },
  openGraph: {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    siteName: 'نبتة لابو',
    locale: 'ar_SA',
    type: 'website',
    url: SITE_URL,
  },
  twitter: {
    card: 'summary_large_image',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={plexArabic.variable}>
      <body className="min-h-screen antialiased text-charcoal">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_JSON_LD) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.classList.add('nbta-splash-active');document.body.classList.add('nbta-intro-lock');}}catch(e){}})();`,
          }}
        />
        <BrandIntroSplash />
        <Header />
        <main className="min-h-screen min-w-0 isolate pb-[env(safe-area-inset-bottom,0px)]">{children}</main>
        <PreFooterBanners />
        <Footer />
        <ClientCartDrawer />
        <Suspense fallback={null}>
          <AnalyticsBeacon />
        </Suspense>
      </body>
    </html>
  )
}
