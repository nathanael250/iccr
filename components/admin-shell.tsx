'use client'

import type { ReactNode } from 'react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  BellRing,
  CalendarDays,
  FolderKanban,
  HandCoins,
  HandHeart,
  Home,
  ImageIcon,
  LayoutDashboard,
  LogOut,
  MessageSquareMore,
  Search,
  Settings,
  ShieldCheck,
  Users,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export const adminNavItems = [
  { label: 'Overview', href: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Projects', href: '/admin/projects', icon: FolderKanban },
  { label: 'Events', href: '/admin/events', icon: CalendarDays },
  { label: 'Media', href: '/admin/media', icon: ImageIcon },
  { label: 'Members', href: '/admin/members', icon: Users },
  { label: 'Partners', href: '/admin/partners', icon: HandHeart },
  { label: 'Prayer Requests', href: '/admin/prayer-requests', icon: MessageSquareMore },
  { label: 'Giving', href: '/admin/giving', icon: HandCoins },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
]

type AdminShellProps = {
  title: string
  description: string
  actions?: ReactNode
  children: ReactNode
}

export function AdminShell({
  title,
  description,
  actions,
  children,
}: AdminShellProps) {
  const pathname = usePathname()
  const currentSection =
    adminNavItems.find(
      (item) => pathname === item.href || pathname.startsWith(`${item.href}/`),
    )?.label ?? 'Dashboard'

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="flex min-h-screen">
        <aside className="hidden w-72 shrink-0 flex-col bg-[#111827] text-white lg:flex">
          <div className="border-b border-white/10 px-6 py-6">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-primary">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/60">
                  ICCR Admin
                </p>
                <h1 className="mt-1 text-lg font-semibold">Church Dashboard</h1>
              </div>
            </div>
          </div>

          <div className="flex-1 space-y-1 overflow-y-auto px-4 py-6">
            {adminNavItems.map(({ label, href, icon: Icon }) => {
              const isActive =
                pathname === href || pathname.startsWith(`${href}/`)

              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium transition ${
                    isActive
                      ? 'bg-white text-slate-950 shadow-sm'
                      : 'text-white/75 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{label}</span>
                </Link>
              )
            })}
          </div>

          <div className="space-y-3 border-t border-white/10 p-4">
            <Link
              href="/"
              className="flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium text-white/70 transition hover:bg-white/10 hover:text-white"
            >
              <Home className="h-4 w-4" />
              <span>Open public site</span>
            </Link>
            <Link
              href="/admin/login"
              className="flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium text-white/70 transition hover:bg-white/10 hover:text-white"
            >
              <LogOut className="h-4 w-4" />
              <span>Back to login</span>
            </Link>
          </div>
        </aside>

        <div className="flex min-h-screen flex-1 flex-col">
          <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
            <div className="flex w-full items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-secondary">
                  {currentSection}
                </p>
                <h2 className="mt-1 truncate text-xl font-semibold text-slate-950 sm:text-2xl">
                  Church Admin Workspace
                </h2>
              </div>

              <div className="hidden flex-1 justify-center lg:flex">
                <div className="relative w-full max-w-md">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <Input
                    type="search"
                    placeholder="Search records, content, or requests"
                    className="h-11 rounded-2xl border-slate-200 bg-slate-50 pl-10"
                  />
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                className="hidden h-11 rounded-2xl border-slate-200 bg-white text-slate-700 sm:inline-flex"
              >
                <BellRing className="h-4 w-4" />
                Notifications
              </Button>
            </div>
          </header>

          <main className="flex-1 px-4 py-5 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-2 lg:hidden">
              {adminNavItems.map(({ label, href }) => {
                const isActive =
                  pathname === href || pathname.startsWith(`${href}/`)

                return (
                  <Link
                    key={href}
                    href={href}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                      isActive
                        ? 'bg-secondary text-white'
                        : 'bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {label}
                  </Link>
                )
              })}
            </div>

            <section className="mt-5 rounded-[2rem] bg-white px-6 py-6 shadow-sm ring-1 ring-slate-200 sm:px-7">
              <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
                <div className="max-w-4xl">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-secondary">
                    Admin Workspace
                  </p>
                  <h1 className="mt-3 text-3xl font-semibold leading-tight text-slate-950 sm:text-4xl">
                    {title}
                  </h1>
                  <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
                    {description}
                  </p>
                </div>

                {actions ? (
                  <div className="flex flex-wrap items-center gap-3">{actions}</div>
                ) : null}
              </div>
            </section>

            <div className="mt-6">{children}</div>
          </main>
        </div>
      </div>
    </div>
  )
}
