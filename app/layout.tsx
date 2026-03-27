'use client'

import type { ReactNode } from 'react'

import { usePathname } from 'next/navigation'

import { Footer } from '@/components/footer'
import { Header } from '@/components/header'

export default function RootLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const isAdminRoute = pathname.startsWith('/admin')

  return (
    <div className="font-sans antialiased flex min-h-screen flex-col">
      {!isAdminRoute ? <Header /> : null}
      <main className="flex-1">{children}</main>
      {!isAdminRoute ? <Footer /> : null}
    </div>
  )
}
