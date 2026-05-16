import type { Metadata, Viewport } from 'next'
import { Suspense } from 'react'
import { IBM_Plex_Sans_Arabic } from 'next/font/google'
import './globals.css'
import AnalyticsBeacon from '@/components/analytics/AnalyticsBeacon'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import PreFooterBanners from '@/components/layout/PreFooterBanners'
import CartDrawer from '@/components/cart/CartDrawer'
import BrandIntroSplash from '@/components/brand/BrandIntroSplash'
import { BRAND_LOGO_SRC, brandLogoIconType } from '@/lib/brand'

const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  adjustFontFallback: true,
  variable: '--font-plex-arabic',
})

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL?.trim() || 'https://nabtalabo.store').replace(/\/+$/, '')
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
  title: DEFAULT_TITLE,
  description: DEFAULT_DESCRIPTION,
  keywords:
    'علكات, علكة غذائية, مكمّل غذائي, سلطة منتج, كولاجين, بروبيوتيك, مغنيسيوم, SFDA, نساء السعودية, نبتة لابو',
  icons: {
    icon: [{ url: BRAND_LOGO_SRC, type: brandLogoIconType(BRAND_LOGO_SRC) }],
    shortcut: BRAND_LOGO_SRC,
    apple: BRAND_LOGO_SRC,
  },
  openGraph: {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    siteName: 'نبتة لابو',
    locale: 'ar_SA',
    type: 'website',
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
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.classList.add('nbta-splash-active');document.body.classList.add('nbta-intro-lock');}}catch(e){}})();`,
          }}
        />
        <BrandIntroSplash />
        <Header />
        <main className="min-h-screen min-w-0 isolate pb-[env(safe-area-inset-bottom,0px)]">{children}</main>
        <PreFooterBanners />
        <Footer />
        <CartDrawer />
        <Suspense fallback={null}>
          <AnalyticsBeacon />
        </Suspense>
      </body>
    </html>
  )
}
