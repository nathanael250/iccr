'use client'

import { useEffect, useState } from 'react'

import { DollarSign, HandCoins, HandHeart, Users } from 'lucide-react'

import { AdminShell } from '@/components/admin-shell'
import { Card, CardContent } from '@/components/ui/card'
import { getOverview } from '@/lib/admin/service'
import type { AdminOverview } from '@/lib/admin/types'

function formatRwf(value: number) {
  return new Intl.NumberFormat('en-RW', {
    style: 'currency',
    currency: 'RWF',
    maximumFractionDigits: 0,
  }).format(value)
}

const overviewCards = [
  {
    key: 'totalGivingCount',
    label: 'Total Giving Records',
    icon: HandCoins,
    accent: 'bg-primary/12 text-primary',
  },
  {
    key: 'totalGivingValue',
    label: 'Total Giving Value',
    icon: DollarSign,
    accent: 'bg-secondary/12 text-secondary',
  },
  {
    key: 'membershipRequestCount',
    label: 'Membership Requests',
    icon: Users,
    accent: 'bg-sky-100 text-sky-700',
  },
  {
    key: 'partnershipRequestCount',
    label: 'Partnership Requests',
    icon: HandHeart,
    accent: 'bg-amber-100 text-amber-700',
  },
] as const

export function AdminDashboardPage() {
  const [overview, setOverview] = useState<AdminOverview | null>(null)

  useEffect(() => {
    getOverview().then(setOverview)
  }, [])

  return (
    <AdminShell
      title="Overview"
      description="Track the top summary numbers for giving, membership requests, and partnership requests from one place."
    >
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {overviewCards.map(({ key, label, icon: Icon, accent }) => (
          <Card key={key} className="border-0 py-0 shadow-sm ring-1 ring-slate-200">
            <CardContent className="px-6 py-6">
              <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${accent}`}>
                <Icon className="h-5 w-5" />
              </div>
              <p className="mt-4 text-sm text-slate-500">{label}</p>
              <p className="mt-3 text-3xl font-semibold text-slate-950">
                {overview
                  ? key === 'totalGivingValue'
                    ? formatRwf(overview.totalGivingValue)
                    : overview[key]
                  : '--'}
              </p>
            </CardContent>
          </Card>
        ))}
      </section>

      <Card className="mt-6 border-0 py-0 shadow-sm ring-1 ring-slate-200">
        <CardContent className="px-6 py-6">
          <p className="text-sm leading-7 text-slate-600">
            The overview page is intentionally simple. It shows the total number
            of giving records, the total giving value, and the total membership
            and partnership requests, exactly as the admin needs for a quick
            summary.
          </p>
        </CardContent>
      </Card>
    </AdminShell>
  )
}
