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
import { StorePricingProvider } from '@/components/pricing/StorePricingProvider'
import DeferredPixels from '@/components/tracking/DeferredPixels'
import RouteChangePageViews from '@/components/tracking/RouteChangePageViews'
import { BRAND_CONTACT_EMAIL } from '@/lib/brand'
const plexArabic = IBM_Plex_Sans_Arabic({
  // Arabic covers UI + digits; fewer font files = less first-load block (electronics-store feel).
  subsets: ['arabic'],
  weight: ['400', '700'],
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
      email: BRAND_CONTACT_EMAIL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/nabta-lab-icon-180.png`,
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
  themeColor: '#ffffff',
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
    'علكات, علكة غذائية, مكمّل غذائي, بيوتين, زنك, فيتامين D, بروبيوتيك, مغنيسيوم, SFDA, نساء السعودية, نبتة لابو, Nabta Labo',
  icons: {
    icon: [
      { url: '/nabta-lab-icon.ico?v=6', sizes: '48x48', type: 'image/x-icon' },
      { url: '/nabta-lab-icon-32.png?v=6', sizes: '32x32', type: 'image/png' },
      { url: '/nabta-lab-icon-48.png?v=6', sizes: '48x48', type: 'image/png' },
      { url: '/nabta-lab-icon-512.png?v=6', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/nabta-lab-icon-180.png?v=6', sizes: '180x180', type: 'image/png' }],
    shortcut: ['/nabta-lab-icon.ico?v=6'],
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
            __html: `(function(){try{var p=location.pathname;if(p==='/thank-you'||p.indexOf('/thank-you/')===0)return;if(sessionStorage.getItem('nbta-brand-intro-seen')==='1')return;if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.classList.add('nbta-splash-active');document.body.classList.add('nbta-intro-lock');}}catch(e){}})();`,
          }}
        />
        <BrandIntroSplash />
        <StorePricingProvider>
          <Header />
          <main className="min-h-screen min-w-0 isolate pb-[env(safe-area-inset-bottom,0px)]">{children}</main>
          <PreFooterBanners />
          <Footer />
          <ClientCartDrawer />
        </StorePricingProvider>
        <DeferredPixels />
        <Suspense fallback={null}>
          <RouteChangePageViews />
          <AnalyticsBeacon />
        </Suspense>
      </body>
    </html>
  )
}
