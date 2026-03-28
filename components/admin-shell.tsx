'use client'

import type { ReactNode } from 'react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  BellRing,
  CalendarDays,
  ChevronRight,
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
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="flex min-h-screen">

        {/* ── Sidebar ── */}
        <aside
          className="hidden w-72 shrink-0 flex-col lg:flex"
          style={{
            background: 'linear-gradient(160deg, #025FAB 0%, #014a88 55%, #012d54 100%)',
          }}
        >
          {/* Logo / Brand */}
          <div className="border-b border-white/10 px-6 py-6">
            <div className="flex items-center gap-3">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-lg"
                style={{ background: 'linear-gradient(135deg, #EB5F27, #c94a1a)' }}
              >
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-white/50">
                  ICCR Admin
                </p>
                <h1 className="mt-0.5 text-base font-bold text-white">
                  Church Dashboard
                </h1>
              </div>
            </div>
          </div>

          {/* Nav label */}
          <div className="px-6 pt-6 pb-2">
            <p className="text-[10px] font-bold uppercase tracking-[0.26em] text-white/40">
              Navigation
            </p>
          </div>

          {/* Nav items */}
          <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 pb-4">
            {adminNavItems.map(({ label, href, icon: Icon }) => {
              const isActive =
                pathname === href || pathname.startsWith(`${href}/`)

              return (
                <Link
                  key={href}
                  href={href}
                  className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-white shadow-md'
                      : 'text-white/65 hover:bg-white/10 hover:text-white'
                  }`}
                  style={
                    isActive
                      ? {
                          background:
                            'linear-gradient(90deg, rgba(235,95,39,0.95) 0%, rgba(201,74,26,0.9) 100%)',
                          boxShadow: '0 4px 16px rgba(235,95,39,0.35)',
                        }
                      : undefined
                  }
                >
                  <Icon
                    className={`h-4 w-4 flex-shrink-0 transition-transform duration-200 ${isActive ? '' : 'group-hover:scale-110'}`}
                  />
                  <span className="flex-1">{label}</span>
                  {isActive && (
                    <ChevronRight className="h-3.5 w-3.5 opacity-70" />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Bottom links */}
          <div className="space-y-0.5 border-t border-white/10 px-3 py-4">
            <Link
              href="/"
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/60 transition-all duration-200 hover:bg-white/10 hover:text-white"
            >
              <Home className="h-4 w-4" />
              <span>Open public site</span>
            </Link>
            <Link
              href="/admin/login"
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/60 transition-all duration-200 hover:bg-white/10 hover:text-white"
            >
              <LogOut className="h-4 w-4" />
              <span>Back to login</span>
            </Link>
          </div>
        </aside>

        {/* ── Main content area ── */}
        <div className="flex min-h-screen flex-1 flex-col overflow-hidden">

          {/* Top header */}
          <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
            <div className="flex w-full items-center justify-between gap-4 px-4 py-3.5 sm:px-6 lg:px-8">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span
                    className="inline-block h-2 w-2 rounded-full"
                    style={{ background: 'linear-gradient(135deg, #EB5F27, #025FAB)' }}
                  />
                  <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-secondary">
                    {currentSection}
                  </p>
                </div>
                <h2 className="mt-0.5 truncate text-lg font-bold text-slate-950 sm:text-xl">
                  Church Admin Workspace
                </h2>
              </div>

              <div className="hidden flex-1 justify-center lg:flex">
                <div className="relative w-full max-w-md">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <Input
                    type="search"
                    placeholder="Search records, content, or requests…"
                    className="h-10 rounded-xl border-slate-200 bg-slate-50 pl-10 text-sm placeholder:text-slate-400 focus:border-secondary focus:ring-secondary/20"
                  />
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                className="hidden h-10 gap-2 rounded-xl border-slate-200 bg-white text-slate-700 text-sm sm:inline-flex hover:border-secondary/40 hover:text-secondary transition-colors"
              >
                <BellRing className="h-4 w-4" />
                Notifications
              </Button>
            </div>
          </header>

          {/* Mobile nav pills */}
          <div className="border-b border-slate-200 bg-white px-4 py-3 sm:px-6 lg:hidden">
            <div className="flex flex-wrap gap-2">
              {adminNavItems.map(({ label, href }) => {
                const isActive =
                  pathname === href || pathname.startsWith(`${href}/`)

                return (
                  <Link
                    key={href}
                    href={href}
                    className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                      isActive
                        ? 'text-white shadow-sm'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                    style={
                      isActive
                        ? { background: 'linear-gradient(90deg, #EB5F27, #c94a1a)' }
                        : undefined
                    }
                  >
                    {label}
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Page content */}
          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">

            {/* Page header banner */}
            <section
              className="relative mb-6 overflow-hidden rounded-2xl px-7 py-7 text-white shadow-lg"
              style={{
                background:
                  'linear-gradient(125deg, #025FAB 0%, #014a88 40%, #012d54 75%, #0a1628 100%)',
              }}
            >
              {/* Decorative orange glow orb */}
              <div
                className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full opacity-20 blur-3xl"
                style={{ background: '#EB5F27' }}
              />
              <div
                className="pointer-events-none absolute -bottom-10 left-1/3 h-48 w-48 rounded-full opacity-10 blur-2xl"
                style={{ background: '#EB5F27' }}
              />

              <div className="relative flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
                <div className="max-w-4xl">
                  <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-white/50">
                    Admin Workspace
                  </p>
                  <h1 className="mt-2 text-2xl font-bold leading-tight text-white sm:text-3xl">
                    {title}
                  </h1>
                  <p className="mt-2.5 max-w-2xl text-sm leading-6 text-white/70 sm:text-base">
                    {description}
                  </p>
                </div>

                {actions ? (
                  <div className="flex flex-wrap items-center gap-3">{actions}</div>
                ) : null}
              </div>
            </section>

            <div>{children}</div>
          </main>
        </div>
      </div>
    </div>
  )
}
