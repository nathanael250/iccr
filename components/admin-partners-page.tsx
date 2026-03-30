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
      <Card className="border-0 py-0 shadow-sm ring-1 ring-slate-100 overflow-hidden">
        <CardContent className="px-0 pb-0">
          <Table>
            <TableHeader>
              <TableRow className=" bg-[#5a5c5e] hover:bg-[#5a5c5e]">
                <TableHead className="w-12 px-4">
                  <input type="checkbox" className="h-4 w-4 rounded border-white/30 bg-white/10" />
                </TableHead>
                <TableHead className="px-4 text-[13px] font-semibold text-white/80">Organization</TableHead>
                <TableHead className="text-[13px] font-semibold text-white/80">Contact Person</TableHead>
                <TableHead className="text-[13px] font-semibold text-white/80">Country</TableHead>
                <TableHead className="text-[13px] font-semibold text-white/80">Status</TableHead>
                <TableHead className="pr-6 text-right text-[13px] font-semibold text-white/80">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {partners.map((partner) => (
                <TableRow key={partner.id} className="border-slate-100 transition-colors hover:bg-slate-50/70">
                  <TableCell className="px-4 py-3">
                    <input type="checkbox" className="h-4 w-4 rounded border-slate-300" />
                  </TableCell>
                  <TableCell className="px-4 py-3 font-medium text-slate-950">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-[11px] font-bold text-slate-700">
                        {partner.organizationName.slice(0, 2).toUpperCase()}
                      </div>
                      <span>{partner.organizationName}</span>
                    </div>
                  </TableCell>
                  <TableCell className="py-3 text-sm text-slate-600">{partner.contactPerson}</TableCell>
                  <TableCell className="py-3 text-sm text-slate-600">{partner.country}</TableCell>
                  <TableCell className="py-3 text-sm text-slate-600">{partner.status}</TableCell>
                  <TableCell className="py-3 pr-6 text-right">
                    <Button asChild size="icon" className="h-7 w-7 rounded-sm bg-secondary text-white hover:bg-secondary/90">
                      <Link href={`/admin/partners/${partner.id}`}>
                        <Eye className="h-4 w-4" />
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
