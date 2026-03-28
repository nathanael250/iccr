'use client'

import { AdminShell } from '@/components/admin-shell'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function AdminGivingPage() {
  return (
    <AdminShell
      title="Giving"
      description="This section is reserved for the full giving management tools that will be developed after the rest of the dashboard."
    >
      <Card className="border-0 py-0 shadow-sm ring-1 ring-slate-200">
        <CardHeader>
          <CardTitle>Giving Module Coming Next</CardTitle>
        </CardHeader>
        <CardContent className="text-sm leading-7 text-slate-600">
          The overview already reports giving totals. This dedicated giving page
          is intentionally left ready for the next development step when you
          want to build the full management flow.
        </CardContent>
      </Card>
    </AdminShell>
  )
}
