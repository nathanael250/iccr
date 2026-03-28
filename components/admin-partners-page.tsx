'use client'

import { useEffect, useState } from 'react'

import Link from 'next/link'
import { Eye } from 'lucide-react'

import { AdminShell } from '@/components/admin-shell'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { getPartners } from '@/lib/admin/service'
import type { PartnerRequest } from '@/lib/admin/types'

export function AdminPartnersPage() {
  const [partners, setPartners] = useState<PartnerRequest[]>([])

  useEffect(() => {
    getPartners().then(setPartners)
  }, [])

  return (
    <AdminShell
      title="Partners"
      description="Review the partnership requests submitted through the partnership form and open each request to inspect the full information."
    >
      <Card className="border-0 py-0 shadow-sm ring-1 ring-slate-200">
        <CardContent className="px-0 pb-2">
          <Table>
            <TableHeader>
              <TableRow className="border-slate-200">
                <TableHead className="px-6">Organization</TableHead>
                <TableHead>Contact Person</TableHead>
                <TableHead>Country</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="pr-6 text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {partners.map((partner) => (
                <TableRow key={partner.id} className="border-slate-200">
                  <TableCell className="px-6 py-4 font-medium text-slate-950">
                    {partner.organizationName}
                  </TableCell>
                  <TableCell className="py-4 text-slate-600">{partner.contactPerson}</TableCell>
                  <TableCell className="py-4 text-slate-600">{partner.country}</TableCell>
                  <TableCell className="py-4 text-slate-600">{partner.status}</TableCell>
                  <TableCell className="py-4 pr-6 text-right">
                    <Button asChild variant="outline" className="rounded-xl border-slate-200">
                      <Link href={`/admin/partners/${partner.id}`}>
                        <Eye className="h-4 w-4" />
                        View
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </AdminShell>
  )
}
