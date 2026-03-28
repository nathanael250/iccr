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
import { getMembers } from '@/lib/admin/service'
import type { MemberRequest } from '@/lib/admin/types'

export function AdminMembersPage() {
  const [members, setMembers] = useState<MemberRequest[]>([])

  useEffect(() => {
    getMembers().then(setMembers)
  }, [])

  return (
    <AdminShell
      title="Members"
      description="See the people who submitted the membership form and open each record to view the full details in a structured page."
    >
      <Card className="border-0 py-0 shadow-sm ring-1 ring-slate-200">
        <CardContent className="px-0 pb-2">
          <Table>
            <TableHeader>
              <TableRow className="border-slate-200">
                <TableHead className="px-6">Full Name</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="pr-6 text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {members.map((member) => (
                <TableRow key={member.id} className="border-slate-200">
                  <TableCell className="px-6 py-4 font-medium text-slate-950">
                    {member.firstName} {member.lastName}
                  </TableCell>
                  <TableCell className="py-4 text-slate-600">{member.phone}</TableCell>
                  <TableCell className="py-4 text-slate-600">{member.email}</TableCell>
                  <TableCell className="py-4 text-slate-600">{member.status}</TableCell>
                  <TableCell className="py-4 pr-6 text-right">
                    <Button asChild variant="outline" className="rounded-xl border-slate-200">
                      <Link href={`/admin/members/${member.id}`}>
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
