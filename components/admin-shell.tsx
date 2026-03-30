'use client'

import { useEffect } from 'react'
import type { ReactNode } from 'react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useNavigate } from 'react-router-dom'
import {
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

import { Input } from '@/components/ui/input'
import { getStoredAdminToken, getStoredAdminUser } from '@/lib/admin/request'
import { logoutAdmin } from '@/lib/admin/service'
import type { AdminAuthUser } from '@/lib/admin/types'

export const adminNavItems: Array<{
  label: string
  href: string
  icon: typeof LayoutDashboard
  badge?: number
}> = [
  { label: 'Overview', href: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Projects', href: '/admin/projects', icon: FolderKanban },
  { label: 'Events', href: '/admin/events', icon: CalendarDays, badge: 2 },
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
  const navigate = useNavigate()
  const token = getStoredAdminToken()
  const currentUser = getStoredAdminUser<AdminAuthUser>()

  useEffect(() => {
    if (!token) {
      navigate('/admin/login', { replace: true })
    }
  }, [navigate, token])

  if (!token) {
    return null
  }

  return (
    <div className="flex h-screen overflow-hidden bg-slate-100 font-sans">
      <aside className="hidden h-screen w-[220px] shrink-0 flex-col border-r border-white/6 bg-[#13151F] lg:flex">
        <div className="flex items-center gap-3 border-b border-white/6 px-4 py-[18px]">
          <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-secondary text-white">
            <ShieldCheck className="h-4 w-4" />
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-white/35">
              ICCR Admin
            </p>
            <h1 className="mt-0.5 text-lg font-bold text-white">Church Dashboard</h1>
          </div>
        </div>

        <div className="px-6 pb-2 pt-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.26em] text-white/28">
            Navigation
          </p>
        </div>

        <nav className="flex-1 overflow-y-auto px-2 pb-4">
          {adminNavItems.map(({ label, href, icon: Icon, badge }) => {
            const isActive = pathname === href || pathname.startsWith(`${href}/`)

            return (
              <Link
                key={href}
                href={href}
                className={`mb-0.5 flex items-center gap-3 rounded-[10px] border-l-[3px] px-3 py-2.5 text-sm transition ${
                  isActive
                    ? 'border-secondary bg-secondary/22 text-white'
                    : 'border-transparent text-white/45 hover:bg-white/6 hover:text-white'
                }`}
              >
                <Icon className="h-[15px] w-[15px]" />
                <span className="flex-1 text-[14px] font-medium">{label}</span>
                {badge ? (
                  <span className="rounded-full bg-secondary px-2 py-0.5 text-[11px] font-bold text-white">
                    {badge}
                  </span>
                ) : isActive ? (
                  <ChevronRight className="h-3.5 w-3.5 text-white/70" />
                ) : null}
              </Link>
            )
          })}
        </nav>

        <div className="border-t border-white/6 px-2 py-3">
          <Link
            href="/"
            className="mb-0.5 flex items-center gap-3 rounded-[10px] border-l-[3px] border-transparent px-3 py-2.5 text-sm text-white/35 transition hover:bg-white/6 hover:text-white"
          >
            <Home className="h-[15px] w-[15px]" />
            <span className="text-[13px]">Open public site</span>
          </Link>
          <Link
            href="/admin/login"
            onClick={() => logoutAdmin()}
            className="flex items-center gap-3 rounded-[10px] border-l-[3px] border-transparent px-3 py-2.5 text-sm text-white/35 transition hover:bg-white/6 hover:text-white"
          >
            <LogOut className="h-[15px] w-[15px]" />
            <span className="text-[13px]">Back to login</span>
          </Link>
        </div>

        <div className="flex items-center gap-3 border-t border-white/6 px-4 py-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-[11px] font-bold text-white">
            {(currentUser?.name || 'ICCR Admin')
              .split(' ')
              .map((part) => part[0] ?? '')
              .join('')
              .slice(0, 2)
              .toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-white">
              {currentUser?.name || 'ICCR Admin'}
            </p>
            <p className="text-[11px] capitalize text-white/35">
              {currentUser?.role || 'Administrator'}
            </p>
          </div>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden bg-slate-200">
        <header className="flex h-14 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-6">
          <h2 className="font-serif text-[24px] font-bold text-slate-950">Dashboard</h2>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 rounded-[10px] border border-slate-200 bg-slate-50 px-3 py-1.5 md:flex">
              <Search className="h-3.5 w-3.5 text-slate-400" />
              <Input
                type="search"
                placeholder="Search"
                className="h-auto border-0 bg-transparent p-0 text-sm text-slate-500 shadow-none focus-visible:ring-0"
              />
            </div>
            <span className="hidden text-sm text-slate-500 md:inline">
              {new Date().toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>
        </header>

        <div className="border-b border-slate-200 bg-white px-4 py-3 lg:hidden">
          <div className="flex flex-wrap gap-2">
            {adminNavItems.map(({ label, href }) => {
              const isActive = pathname === href || pathname.startsWith(`${href}/`)

              return (
                <Link
                  key={href}
                  href={href}
                  className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                    isActive
                      ? 'bg-secondary text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {label}
                </Link>
              )
            })}
          </div>
        </div>

        <main className="flex-1 overflow-y-auto bg-slate-200 px-6 py-5">
          <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <h1 className="font-serif text-[28px] font-bold text-slate-950">{title}</h1>
              <p className="mt-2 text-[15px] leading-7 text-slate-500">{description}</p>
            </div>

            {actions ? <div className="flex flex-wrap items-center gap-3">{actions}</div> : null}
          </div>

          {children}
        </main>
      </div>
    </div>
  )
}
