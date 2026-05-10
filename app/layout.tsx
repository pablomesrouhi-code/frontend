import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import PreFooterBanners from '@/components/layout/PreFooterBanners'
import CartDrawer from '@/components/cart/CartDrawer'

export const metadata: Metadata = {
  title: 'نبتة لابو | Nabta Labo',
  description: 'علكات وظيفية يومية لدعم جمالك من الداخل، راحة هضمك، وهدوء مسائك. نبتة لابو — روتين يومي صار ألذ وأسهل.',
  keywords: 'علكات, كولاجين, بروبيوتيك, مغنيسيوم, مكملات, نساء, السعودية, نبتة لابو',
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
