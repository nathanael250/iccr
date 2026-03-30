'use client'

import { useEffect, useMemo, useState } from 'react'

import Link from 'next/link'
import { CalendarDays, HandCoins, HandHeart, Users } from 'lucide-react'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { AdminShell } from '@/components/admin-shell'
import { getGivingRecords, getMembers, getOverview } from '@/lib/admin/service'
import type { AdminOverview, GivingRecord, MemberRequest } from '@/lib/admin/types'

const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as const

function formatRwf(value: number) {
  return new Intl.NumberFormat('en-RW', {
    style: 'currency',
    currency: 'RWF',
    maximumFractionDigits: 0,
  }).format(value)
}

function valueInRwf(record: GivingRecord) {
  if (record.currency === 'USD') return record.amount * 1400
  if (record.currency === 'EUR') return record.amount * 1500
  return record.amount
}

function initials(member: MemberRequest) {
  return `${member.firstName[0] ?? ''}${member.lastName[0] ?? ''}`.toUpperCase()
}

function buildGivingByDay(records: GivingRecord[]) {
  const totals = new Map(weekDays.map((day) => [day, 0]))

  records.forEach((record) => {
    const day = new Date(record.createdAt).toLocaleDateString('en-US', {
      weekday: 'short',
    }) as (typeof weekDays)[number] | string

    if (totals.has(day as (typeof weekDays)[number])) {
      totals.set(
        day as (typeof weekDays)[number],
        (totals.get(day as (typeof weekDays)[number]) ?? 0) + valueInRwf(record),
      )
    }
  })

  return weekDays.map((day) => ({
    day,
    amount: Math.round((totals.get(day) ?? 0) / 1000),
  }))
}

function buildAverageSeries(records: GivingRecord[]) {
  const dayData = buildGivingByDay(records)
  let runningTotal = 0

  return dayData.map((item, index) => {
    runningTotal += item.amount

    return {
      day: item.day,
      average: Math.round(runningTotal / (index + 1)) || 0,
    }
  })
}

function buildCategoryTotals(records: GivingRecord[]) {
  const grouped = new Map<string, number>()

  records.forEach((record) => {
    const key = record.purpose || 'General Giving'
    grouped.set(key, (grouped.get(key) ?? 0) + valueInRwf(record))
  })

  return [...grouped.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([name, total], index) => ({
      name,
      total,
      amount: Math.round(total / 1000),
      icon: [HandCoins, HandHeart, CalendarDays][index % 3],
    }))
}

function OverviewTab({
  active,
  label,
  onClick,
}: {
  active: boolean
  label: string
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-[10px] px-3 py-1.5 text-[11px] font-semibold transition ${
        active
          ? 'bg-secondary text-white'
          : 'text-slate-400 hover:bg-slate-100 hover:text-slate-700'
      }`}
    >
      {label}
    </button>
  )
}

export function AdminDashboardPage() {
  const [overview, setOverview] = useState<AdminOverview | null>(null)
  const [members, setMembers] = useState<MemberRequest[]>([])
  const [givingRecords, setGivingRecords] = useState<GivingRecord[]>([])
  const [givingTab, setGivingTab] = useState('Weekly')
  const [averageTab, setAverageTab] = useState('Weekly')
  const [categoryTab, setCategoryTab] = useState('Weekly')

  useEffect(() => {
    getOverview().then(setOverview)
    getMembers().then((items) =>
      setMembers(
        items
          .slice()
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
      ),
    )
    getGivingRecords().then((items) =>
      setGivingRecords(
        items
          .slice()
          .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()),
      ),
    )
  }, [])

  const givingByDay = useMemo(() => buildGivingByDay(givingRecords), [givingRecords])
  const averageSeries = useMemo(() => buildAverageSeries(givingRecords), [givingRecords])
  const categoryTotals = useMemo(() => buildCategoryTotals(givingRecords), [givingRecords])

  const summaryCards = [
    {
      label: 'Total Giving Records',
      value: overview ? String(overview.totalGivingCount) : '—',
      delta: '+1',
      up: true,
      icon: HandCoins,
    },
    {
      label: 'Total Giving Value',
      value: overview ? formatRwf(overview.totalGivingValue) : '—',
      delta: '+12.5%',
      up: true,
      icon: HandCoins,
    },
    {
      label: 'Membership Requests',
      value: overview ? String(overview.membershipRequestCount) : '—',
      delta: '+2.54%',
      up: true,
      icon: Users,
    },
    {
      label: 'Partnership Requests',
      value: overview ? String(overview.partnershipRequestCount) : '—',
      delta: '-2.57%',
      up: false,
      icon: HandHeart,
    },
  ]

  return (
    <AdminShell
      title="Overview"
      description="Track giving, membership requests, and partnership requests from one place."
    >
      <div className="grid gap-[14px] xl:grid-cols-4">
        {summaryCards.map(({ label, value, delta, up, icon: Icon }) => (
          <section
            key={label}
            className="rounded-2xl border border-slate-200 bg-white px-[18px] py-4 shadow-sm transition hover:-translate-y-0.5"
          >
            <div className="mb-[10px] flex items-center justify-between">
              <span className="text-[13px] font-medium leading-5 text-slate-500">{label}</span>
              <div className="flex h-8 w-8 items-center justify-center rounded-[9px] bg-secondary/18 text-secondary">
                <Icon className="h-[15px] w-[15px]" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-[24px] font-bold text-slate-950">{value}</span>
              <span className={`text-[12px] font-bold ${up ? 'text-emerald-400' : 'text-rose-400'}`}>
                {delta}
              </span>
            </div>
          </section>
        ))}
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-2">
        <section className="rounded-2xl border border-slate-200 bg-white p-[18px] shadow-sm">
          <div className="mb-[14px] flex items-center justify-between">
            <span className="text-base font-bold text-slate-950">Current Member Requests</span>
            <Link
              href="/admin/members"
              className="text-sm font-semibold text-secondary transition hover:text-secondary/80"
            >
              View All
            </Link>
          </div>

          <div className="space-y-1.5">
            {members.slice(0, 3).map((member, index) => (
              <div
                key={member.id}
                className="flex items-center gap-[10px] rounded-[10px] px-[10px] py-2 transition hover:bg-slate-50"
              >
                <div
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white"
                  style={{
                    backgroundColor: ['#345D9D', '#406B5D', '#65503B'][index % 3],
                  }}
                >
                  {initials(member)}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-slate-950">
                    {member.firstName} {member.lastName}
                  </p>
                  <p className="text-xs text-slate-500">
                    {member.region || 'Kigali'} · {member.phone}
                  </p>
                </div>
                <span
                  className={`rounded-full px-[9px] py-[3px] text-[11px] font-bold ${
                    member.status === 'Confirmed'
                      ? 'bg-emerald-400/12 text-emerald-400'
                      : 'bg-amber-400/12 text-amber-300'
                  }`}
                >
                  {member.status}
                </span>
                <Link
                  href={`/admin/members/${member.id}`}
                  className="text-xs font-medium text-slate-400 transition hover:text-slate-700"
                >
                  Edit
                </Link>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-[18px] shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-base font-bold text-slate-950">Average Giving Size (RF)</span>
            <div className="flex items-center gap-1 rounded-xl bg-slate-100 p-1">
              <OverviewTab active={averageTab === 'Weekly'} label="Weekly" onClick={() => setAverageTab('Weekly')} />
              <OverviewTab active={averageTab === 'Monthly'} label="Monthly" onClick={() => setAverageTab('Monthly')} />
            </div>
          </div>

          <div className="h-[175px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={averageSeries}>
                <defs>
                  <linearGradient id="overviewAverageShell" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#005DAB" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#005DAB" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="day"
                  tick={{ fill: '#64748b', fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis hide />
                <Tooltip
                  contentStyle={{
                    background: '#005DAB',
                    border: 'none',
                    borderRadius: 8,
                    color: '#ffffff',
                  }}
                  formatter={(value: number) => [`RF ${value}k`, 'Average']}
                />
                <Area
                  type="monotone"
                  dataKey="average"
                  stroke="#005DAB"
                  fill="url(#overviewAverageShell)"
                  strokeWidth={2.5}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-2">
        <section className="rounded-2xl border border-slate-200 bg-white p-[18px] shadow-sm">
          <div className="mb-[14px] flex items-center justify-between">
            <span className="text-base font-bold text-slate-950">Giving Per Day</span>
            <div className="flex items-center gap-1 rounded-xl bg-slate-100 p-1">
              <OverviewTab active={givingTab === 'Weekly'} label="Weekly" onClick={() => setGivingTab('Weekly')} />
              <OverviewTab active={givingTab === 'Monthly'} label="Monthly" onClick={() => setGivingTab('Monthly')} />
            </div>
          </div>

          <div className="h-[170px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={givingByDay}>
                <XAxis
                  dataKey="day"
                  tick={{ fill: '#64748b', fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis hide />
                <Tooltip
                  contentStyle={{
                    background: '#005DAB',
                    border: 'none',
                    borderRadius: 8,
                    color: '#ffffff',
                  }}
                  formatter={(value: number) => [`RF ${value}k`, 'Giving']}
                />
                <Bar dataKey="amount" fill="#005DAB" radius={[5, 5, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-[18px] shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-base font-bold text-slate-950">Top Giving Categories</span>
            <div className="flex items-center gap-1 rounded-xl bg-slate-100 p-1">
              <OverviewTab active={categoryTab === 'Weekly'} label="Weekly" onClick={() => setCategoryTab('Weekly')} />
              <OverviewTab active={categoryTab === 'Monthly'} label="Monthly" onClick={() => setCategoryTab('Monthly')} />
            </div>
          </div>

          <div className="grid grid-cols-[1fr_100px_120px] border-b border-slate-200 pb-2">
            <span className="text-[11px] font-semibold text-slate-400">Category Name</span>
            <span className="text-right text-[11px] font-semibold text-slate-400">Amount</span>
            <span className="text-right text-[11px] font-semibold text-slate-400">Total Revenue</span>
          </div>

          <div className="mt-2 space-y-1">
            {categoryTotals.map((category) => {
              const Icon = category.icon

              return (
                <div
                  key={category.name}
                  className="grid grid-cols-[1fr_100px_120px] items-center rounded-[10px] px-1 py-2 transition hover:bg-slate-50"
                >
                  <div className="flex items-center gap-[9px]">
                    <div className="flex h-[30px] w-[30px] items-center justify-center rounded-[8px] bg-secondary/18 text-secondary">
                      <Icon className="h-[14px] w-[14px]" />
                    </div>
                    <span className="truncate text-[15px] font-medium text-slate-950">{category.name}</span>
                  </div>
                  <span className="text-right text-[15px] text-slate-500">RF {category.amount}k</span>
                  <span className="text-right text-[15px] font-bold text-emerald-400">
                    {formatRwf(category.total)}
                  </span>
                </div>
              )
            })}
          </div>
        </section>
      </div>
    </AdminShell>
  )
}
