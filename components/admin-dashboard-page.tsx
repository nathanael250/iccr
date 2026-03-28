'use client'

import { useEffect, useState } from 'react'

import Link from 'next/link'
import {
  ArrowUpRight,
  DollarSign,
  Eye,
  HandCoins,
  HandHeart,
  TrendingUp,
  Users,
} from 'lucide-react'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { AdminShell } from '@/components/admin-shell'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  getMembers,
  getOverview,
  getPartners,
  getPrayerRequests,
} from '@/lib/admin/service'
import { defaultAdminStore } from '@/lib/admin/mock-data'
import type { AdminOverview, GivingRecord, MemberRequest, PartnerRequest, PrayerRequest } from '@/lib/admin/types'

// ── Helpers ──────────────────────────────────────────────────────────────────

function formatRwf(value: number) {
  return new Intl.NumberFormat('en-RW', {
    style: 'currency',
    currency: 'RWF',
    maximumFractionDigits: 0,
  }).format(value)
}

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  return `${Math.floor(hrs / 24)}d ago`
}

// ── Mock chart data ───────────────────────────────────────────────────────────

const givingTrendData = [
  { day: 'Mon', amount: 18000 },
  { day: 'Tue', amount: 42000 },
  { day: 'Wed', amount: 28000 },
  { day: 'Thu', amount: 95000 },
  { day: 'Fri', amount: 54000 },
  { day: 'Sat', amount: 72000 },
  { day: 'Sun', amount: 110000 },
]

const activityData = [
  { day: 'Mon', members: 1, partners: 0, prayers: 2 },
  { day: 'Tue', members: 0, partners: 1, prayers: 1 },
  { day: 'Wed', members: 2, partners: 0, prayers: 3 },
  { day: 'Thu', members: 1, partners: 2, prayers: 1 },
  { day: 'Fri', members: 3, partners: 1, prayers: 2 },
  { day: 'Sat', members: 0, partners: 0, prayers: 4 },
  { day: 'Sun', members: 2, partners: 1, prayers: 5 },
]

// ── Stat Cards Config ─────────────────────────────────────────────────────────

const statCards = [
  {
    key: 'totalGivingCount' as const,
    label: 'Total Giving Records',
    icon: HandCoins,
    color: '#025FAB',
    lightBg: 'rgba(2,95,171,0.08)',
    trend: '+3.67%',
    trendUp: true,
  },
  {
    key: 'totalGivingValue' as const,
    label: 'Total Giving Value',
    icon: DollarSign,
    color: '#EB5F27',
    lightBg: 'rgba(235,95,39,0.08)',
    trend: '+12.4%',
    trendUp: true,
  },
  {
    key: 'membershipRequestCount' as const,
    label: 'Membership Requests',
    icon: Users,
    color: '#0f766e',
    lightBg: 'rgba(15,118,110,0.08)',
    trend: '+2.54%',
    trendUp: true,
  },
  {
    key: 'partnershipRequestCount' as const,
    label: 'Partnership Requests',
    icon: HandHeart,
    color: '#7c3aed',
    lightBg: 'rgba(124,58,237,0.08)',
    trend: '-1.2%',
    trendUp: false,
  },
]

// ── Custom Tooltip ────────────────────────────────────────────────────────────

function ChartTooltip({
  active,
  payload,
  label,
  formatter,
}: {
  active?: boolean
  payload?: Array<{ value: number; color: string; name: string }>
  label?: string
  formatter?: (v: number) => string
}) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-xl border border-slate-100 bg-white px-3 py-2.5 shadow-lg">
      <p className="mb-1.5 text-xs font-semibold text-slate-500">{label}</p>
      {payload.map((p) => (
        <p key={p.name} className="text-sm font-bold" style={{ color: p.color }}>
          {formatter ? formatter(p.value) : p.value}
        </p>
      ))}
    </div>
  )
}

// ── Component ─────────────────────────────────────────────────────────────────

type RecentActivity =
  | { type: 'member'; data: MemberRequest }
  | { type: 'partner'; data: PartnerRequest }
  | { type: 'prayer'; data: PrayerRequest }

export function AdminDashboardPage() {
  const [overview, setOverview] = useState<AdminOverview | null>(null)
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([])
  const [recentGiving, setRecentGiving] = useState<GivingRecord[]>([])

  useEffect(() => {
    getOverview().then(setOverview)

    Promise.all([getMembers(), getPartners(), getPrayerRequests()]).then(
      ([members, partners, prayers]) => {
        const combined: RecentActivity[] = [
          ...members.map((d) => ({ type: 'member' as const, data: d })),
          ...partners.map((d) => ({ type: 'partner' as const, data: d })),
          ...prayers.map((d) => ({ type: 'prayer' as const, data: d })),
        ].sort(
          (a, b) =>
            new Date(b.data.createdAt).getTime() -
            new Date(a.data.createdAt).getTime(),
        )
        setRecentActivity(combined.slice(0, 5))
      },
    )

    // Load giving records from store
    setRecentGiving(defaultAdminStore.giving.slice().reverse().slice(0, 5))
  }, [])

  return (
    <AdminShell
      title="Overview"
      description="Track giving, membership requests, and partnership requests from one place."
    >
      {/* ── Stat Cards ── */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map(({ key, label, icon: Icon, color, lightBg, trend, trendUp }) => {
          const raw = overview?.[key]
          const display =
            raw === undefined
              ? '—'
              : key === 'totalGivingValue'
                ? formatRwf(raw as number)
                : String(raw)

          return (
            <Card
              key={key}
              className="border-0 py-0 shadow-sm ring-1 ring-slate-100 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
            >
              <CardContent className="px-6 py-5">
                <div className="flex items-start justify-between">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-xl"
                    style={{ background: lightBg }}
                  >
                    <Icon className="h-5 w-5" style={{ color }} />
                  </div>
                  <span
                    className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${
                      trendUp ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-500'
                    }`}
                  >
                    <TrendingUp className={`h-3 w-3 ${!trendUp ? 'rotate-180' : ''}`} />
                    {trend}
                  </span>
                </div>
                <p className="mt-4 text-2xl font-bold text-slate-900 sm:text-3xl">
                  {display}
                </p>
                <p className="mt-1 text-xs font-medium text-slate-400">{label}</p>
              </CardContent>
            </Card>
          )
        })}
      </section>

      {/* ── Middle row: Recent Activity + Giving Trend chart ── */}
      <div className="mt-5 grid gap-5 xl:grid-cols-[1fr_1.1fr]">

        {/* Recent Activity */}
        <Card className="border-0 py-0 shadow-sm ring-1 ring-slate-100 overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100 bg-slate-50/50 px-6 py-4">
            <CardTitle className="text-sm font-semibold text-slate-900">
              Recent Activity
            </CardTitle>
            <Link
              href="/admin/members"
              className="flex items-center gap-1 text-xs font-semibold transition-colors hover:opacity-80"
              style={{ color: '#025FAB' }}
            >
              View All
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </CardHeader>
          <CardContent className="divide-y divide-slate-50 px-0 pb-2">
            {recentActivity.length === 0 ? (
              <p className="px-6 py-8 text-center text-sm text-slate-400">No recent activity</p>
            ) : (
              recentActivity.map((item) => {
                const isMember = item.type === 'member'
                const isPartner = item.type === 'partner'
                const name =
                  isMember
                    ? `${(item.data as MemberRequest).firstName} ${(item.data as MemberRequest).lastName}`
                    : isPartner
                      ? (item.data as PartnerRequest).organizationName
                      : (item.data as PrayerRequest).fullName

                const typeLabel = isMember ? 'Membership' : isPartner ? 'Partnership' : 'Prayer'
                const typeColor = isMember ? '#025FAB' : isPartner ? '#7c3aed' : '#EB5F27'
                const timeLabel = timeAgo(item.data.createdAt)

                const detailHref =
                  isMember
                    ? `/admin/members/${item.data.id}`
                    : isPartner
                      ? `/admin/partners/${item.data.id}`
                      : '/admin/prayer-requests'

                return (
                  <div
                    key={`${item.type}-${item.data.id}`}
                    className="flex items-center gap-4 px-6 py-3.5 transition-colors hover:bg-slate-50"
                  >
                    {/* Avatar circle */}
                    <div
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                      style={{ background: typeColor }}
                    >
                      {name.charAt(0).toUpperCase()}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="truncate text-sm font-semibold text-slate-900">{name}</p>
                      <div className="mt-0.5 flex items-center gap-2">
                        <span
                          className="rounded-full px-2 py-0.5 text-[11px] font-semibold"
                          style={{ background: `${typeColor}14`, color: typeColor }}
                        >
                          {typeLabel}
                        </span>
                        <span className="text-[11px] text-slate-400">{timeLabel}</span>
                      </div>
                    </div>

                    <Badge
                      className="shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-semibold"
                      style={{ background: 'rgba(15,118,110,0.1)', color: '#0f766e' }}
                    >
                      {item.data.status}
                    </Badge>

                    <Button
                      asChild
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 shrink-0 rounded-xl text-slate-400 hover:text-secondary"
                    >
                      <Link href={detailHref}>
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                )
              })
            )}
          </CardContent>
        </Card>

        {/* Giving Trend (area chart) */}
        <Card className="border-0 py-0 shadow-sm ring-1 ring-slate-100 overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100 bg-slate-50/50 px-6 py-4">
            <div>
              <CardTitle className="text-sm font-semibold text-slate-900">
                Giving Trend (RWF)
              </CardTitle>
              <p className="mt-0.5 text-xs text-slate-400">Weekly overview</p>
            </div>
            <div className="flex gap-1.5">
              <button
                className="rounded-lg px-3 py-1 text-xs font-semibold text-white"
                style={{ background: '#025FAB' }}
              >
                Weekly
              </button>
              <button className="rounded-lg px-3 py-1 text-xs font-semibold text-slate-400 hover:text-slate-600">
                Monthly
              </button>
            </div>
          </CardHeader>
          <CardContent className="px-4 pb-4 pt-4">
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={givingTrendData} margin={{ top: 4, right: 4, left: -12, bottom: 0 }}>
                <defs>
                  <linearGradient id="givingGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#025FAB" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#025FAB" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis
                  dataKey="day"
                  tick={{ fontSize: 11, fill: '#94a3b8' }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: '#94a3b8' }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  content={
                    <ChartTooltip
                      formatter={(v) =>
                        `RWF ${(v / 1000).toFixed(0)}k`
                      }
                    />
                  }
                />
                <Area
                  type="monotone"
                  dataKey="amount"
                  stroke="#025FAB"
                  strokeWidth={2.5}
                  fill="url(#givingGrad)"
                  dot={false}
                  activeDot={{ r: 5, fill: '#025FAB', strokeWidth: 0 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* ── Bottom row: Activity Bar Chart + Recent Giving Table ── */}
      <div className="mt-5 grid gap-5 xl:grid-cols-[1.1fr_1fr]">

        {/* Activity per day (bar chart) */}
        <Card className="border-0 py-0 shadow-sm ring-1 ring-slate-100 overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100 bg-slate-50/50 px-6 py-4">
            <div>
              <CardTitle className="text-sm font-semibold text-slate-900">
                Submissions Per Day
              </CardTitle>
              <p className="mt-0.5 text-xs text-slate-400">Members · Partners · Prayers</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: '#025FAB' }} />
                <span className="text-[11px] text-slate-500">Members</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: '#7c3aed' }} />
                <span className="text-[11px] text-slate-500">Partners</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: '#EB5F27' }} />
                <span className="text-[11px] text-slate-500">Prayers</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-4 pb-4 pt-4">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={activityData} margin={{ top: 4, right: 4, left: -12, bottom: 0 }} barGap={3}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis
                  dataKey="day"
                  tick={{ fontSize: 11, fill: '#94a3b8' }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: '#94a3b8' }}
                  axisLine={false}
                  tickLine={false}
                  allowDecimals={false}
                />
                <Tooltip content={<ChartTooltip />} />
                <Bar dataKey="members" fill="#025FAB" radius={[4, 4, 0, 0]} maxBarSize={12} />
                <Bar dataKey="partners" fill="#7c3aed" radius={[4, 4, 0, 0]} maxBarSize={12} />
                <Bar dataKey="prayers" fill="#EB5F27" radius={[4, 4, 0, 0]} maxBarSize={12} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Giving Records */}
        <Card className="border-0 py-0 shadow-sm ring-1 ring-slate-100 overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100 bg-slate-50/50 px-6 py-4">
            <CardTitle className="text-sm font-semibold text-slate-900">
              Recent Giving Records
            </CardTitle>
            <Link
              href="/admin/giving"
              className="flex items-center gap-1 text-xs font-semibold transition-colors hover:opacity-80"
              style={{ color: '#EB5F27' }}
            >
              View All
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </CardHeader>
          <CardContent className="divide-y divide-slate-50 px-0 pb-2">
            {recentGiving.length === 0 ? (
              <p className="px-6 py-8 text-center text-sm text-slate-400">No records yet</p>
            ) : (
              recentGiving.map((record) => (
                <div
                  key={record.id}
                  className="flex items-center gap-4 px-6 py-3.5 transition-colors hover:bg-slate-50"
                >
                  <div
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                    style={{ background: 'linear-gradient(135deg, #EB5F27, #c94a1a)' }}
                  >
                    {record.fullName.charAt(0)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-900">
                      {record.fullName}
                    </p>
                    <p className="mt-0.5 text-[11px] text-slate-400">{record.purpose}</p>
                  </div>

                  <div className="text-right">
                    <p className="text-sm font-bold text-slate-900">
                      {record.currency === 'RWF'
                        ? formatRwf(record.amount)
                        : `${record.currency} ${record.amount.toLocaleString()}`}
                    </p>
                    <p className="mt-0.5 text-[11px] capitalize text-slate-400">
                      {record.paymentCategory.replace('-', ' ')}
                    </p>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </AdminShell>
  )
}
