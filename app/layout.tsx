import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import PreFooterBanners from '@/components/layout/PreFooterBanners'
import CartDrawer from '@/components/cart/CartDrawer'

// Fresh HTML per request so CDN/browsers don’t keep an old shell referencing stale _next bundles.
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'نبتة لابو | Nabta Labo',
  description:
    'نبتة لابو: متجر بتجربة تقترب من ثقة نقطة اعتماد (صيدلية من حيث الانضباط والوضوح) — علكات تحمل تركيبات مكمّل غذائي مرخّص SFDA؛ لسنا نقطة تشخّص أو وصف جرعات. جمال يومي، راحة بعد الأكل، وهدوء مسائي. السعودية.',
  keywords:
    'علكات, علكة غذائية, مكمّل غذائي, سلطة منتج, كولاجين, بروبيوتيك, مغنيسيوم, SFDA, نساء السعودية, نبتة لابو',
  icons: {
    icon: [{ url: '/nabta-lab-brand.png', type: 'image/png' }],
    shortcut: '/nabta-lab-brand.png',
    apple: '/nabta-lab-brand.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ fontFamily: "'IBM Plex Sans Arabic', Arial, sans-serif" }}>
        <Header />
        <main className="min-h-screen min-w-0">{children}</main>
        <PreFooterBanners />
        <Footer />
        <CartDrawer />
      </body>
    </html>
  )
}
