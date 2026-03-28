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
      <Card className="border-0 py-0 shadow-sm ring-1 ring-slate-200">
        <CardContent className="px-0 pb-2">
          <Table>
            <TableHeader>
              <TableRow className="border-slate-200">
                <TableHead className="px-6">Requester</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Request</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.map((request) => (
                <TableRow key={request.id} className="border-slate-200">
                  <TableCell className="px-6 py-4">
                    <p className="font-medium text-slate-950">{request.fullName}</p>
                    <p className="text-sm text-slate-500">{request.email}</p>
                  </TableCell>
                  <TableCell className="py-4 text-slate-600">{request.phone}</TableCell>
                  <TableCell className="py-4 text-sm leading-6 text-slate-600">
                    {request.message}
                  </TableCell>
                  <TableCell className="py-4 text-slate-600">{request.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </AdminShell>
  )
}
