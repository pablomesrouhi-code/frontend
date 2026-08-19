'use client'

import { usePathname } from 'next/navigation'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import PreFooterBanners from '@/components/layout/PreFooterBanners'
import ClientCartDrawer from '@/components/layout/ClientCartDrawer'

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? ''
  const isLanding =
    pathname.startsWith('/lp/') || pathname === '/products/shahr-hadi-pms-powder'

  if (isLanding) {
    return (
      <main className="min-h-screen min-w-0 isolate pb-[env(safe-area-inset-bottom,0px)]">{children}</main>
    )
  }

  return (
    <>
      <Header />
      <main className="min-h-screen min-w-0 isolate pb-[env(safe-area-inset-bottom,0px)]">{children}</main>
      <PreFooterBanners />
      <Footer />
      <ClientCartDrawer />
    </>
  )
}
