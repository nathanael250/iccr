'use client'

import { Clock3, HandCoins, Wallet } from 'lucide-react'

import { AdminShell } from '@/components/admin-shell'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function AdminGivingPage() {
  return (
    <AdminShell
      title="Giving"
      description="This section is reserved for the full giving management tools that will be developed after the rest of the dashboard."
    >
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.3fr)_360px]">
        <Card className="border-0 bg-white py-0 shadow-sm ring-1 ring-slate-200">
          <CardHeader className="px-6 pb-4 pt-6">
            <CardTitle>Giving Module Coming Next</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 px-6 pb-6 pt-0">
            <div className="rounded-[28px] border border-dashed border-slate-300 bg-slate-50 px-6 py-8">
              <div className="flex max-w-2xl items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-secondary/10 text-secondary">
                  <HandCoins className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-lg font-semibold text-slate-950">
                    Giving management will be built here
                  </p>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    The overview already reports giving totals. This page is now prepared
                    with the correct dashboard spacing so the next step can be adding real
                    donation records, filters, payment tracking, and review tools.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 px-5 py-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-secondary shadow-sm ring-1 ring-slate-200">
                    <Wallet className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-950">Planned Features</p>
                    <p className="text-sm text-slate-500">Records, review, and reporting</p>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-slate-50 px-5 py-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-secondary shadow-sm ring-1 ring-slate-200">
                    <Clock3 className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-950">Current Status</p>
                    <p className="text-sm text-slate-500">Ready for the next development step</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-white py-0 shadow-sm ring-1 ring-slate-200">
          <CardHeader className="px-6 pb-4 pt-6">
            <CardTitle>Next Scope</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 px-6 pb-6 pt-0">
            {[
              'Show all giving records in a real table',
              'Filter by date, currency, and payment method',
              'Track payment status and donor details',
              'Prepare summaries for reporting',
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm leading-6 text-slate-700"
              >
                {item}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </AdminShell>
  )
}
