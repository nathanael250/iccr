'use client'

import { useEffect, useState } from 'react'

import { AdminShell } from '@/components/admin-shell'
import { Card, CardContent } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { getPrayerRequests } from '@/lib/admin/service'
import type { PrayerRequest } from '@/lib/admin/types'

export function AdminPrayerRequestsPage() {
  const [requests, setRequests] = useState<PrayerRequest[]>([])

  useEffect(() => {
    getPrayerRequests().then(setRequests)
  }, [])

  return (
    <AdminShell
      title="Prayer Requests"
      description="Review the people who requested prayer and track the request status in one table."
    >
      <Card className="border-0 py-0 shadow-sm ring-1 ring-slate-100 overflow-hidden">
        <CardContent className="px-0 pb-0">
          <Table>
            <TableHeader>
              <TableRow className=" bg-[#5a5c5e] hover:bg-[#5a5c5e]">
                <TableHead className="w-12 px-4">
                  <input type="checkbox" className="h-4 w-4 rounded border-white/30 bg-white/10" />
                </TableHead>
                <TableHead className="px-4 text-[13px] font-semibold text-white/80">Requester</TableHead>
                <TableHead className="text-[13px] font-semibold text-white/80">Phone</TableHead>
                <TableHead className="text-[13px] font-semibold text-white/80">Prayer Request</TableHead>
                <TableHead className="text-[13px] font-semibold text-white/80">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.map((request) => (
                <TableRow key={request.id} className="border-slate-100 transition-colors hover:bg-slate-50/70">
                  <TableCell className="px-4 py-3">
                    <input type="checkbox" className="h-4 w-4 rounded border-slate-300" />
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    <p className="font-medium text-slate-950">{request.fullName}</p>
                    <p className="text-xs text-slate-500">{request.email}</p>
                  </TableCell>
                  <TableCell className="py-3 text-sm text-slate-600">{request.phone}</TableCell>
                  <TableCell className="py-3 text-sm leading-6 text-slate-600">
                    {request.message}
                  </TableCell>
                  <TableCell className="py-3 text-sm text-slate-600">{request.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </AdminShell>
  )
}
