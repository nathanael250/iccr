'use client'

import { useEffect, useState } from 'react'

import Link from 'next/link'
import { useParams } from 'react-router-dom'

import { AdminShell } from '@/components/admin-shell'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getMemberById, getPartnerById } from '@/lib/admin/service'
import type { MemberRequest, PartnerRequest } from '@/lib/admin/types'

type AdminRequestDetailPageProps = {
  kind: 'member' | 'partner'
}

export function AdminRequestDetailPage({ kind }: AdminRequestDetailPageProps) {
  const { recordId = '' } = useParams()
  const [record, setRecord] = useState<MemberRequest | PartnerRequest | null>(null)

  useEffect(() => {
    if (kind === 'member') {
      getMemberById(recordId).then((value) => setRecord(value ?? null))
      return
    }

    getPartnerById(recordId).then((value) => setRecord(value ?? null))
  }, [kind, recordId])

  if (!record) return null

  const isMember = kind === 'member'

  return (
    <AdminShell
      title={isMember ? 'Member Details' : 'Partner Details'}
      description="Review the full submitted information in a structured page before taking the next administrative step."
      actions={
        <Button asChild variant="outline" className="rounded-2xl border-slate-200">
          <Link href={isMember ? '/admin/members' : '/admin/partners'}>
            Back to list
          </Link>
        </Button>
      }
    >
      <div className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
        <Card className="border-0 py-0 shadow-sm ring-1 ring-slate-200">
          <CardContent className="space-y-4 p-6">
            <div className="overflow-hidden rounded-[24px] bg-slate-100">
              <img
                src={isMember ? (record as MemberRequest).photoUrl : (record as PartnerRequest).logoUrl}
                alt={isMember ? 'Member photo' : 'Partner logo'}
                className="h-72 w-full object-cover"
              />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
                {isMember ? 'Membership Request' : 'Partnership Request'}
              </p>
              <h2 className="mt-3 text-2xl font-semibold text-slate-950">
                {isMember
                  ? `${(record as MemberRequest).firstName} ${(record as MemberRequest).lastName}`
                  : (record as PartnerRequest).organizationName}
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Submitted on {new Date(record.createdAt).toLocaleString()}
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="border-0 py-0 shadow-sm ring-1 ring-slate-200">
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Phone</p>
                <p className="mt-2 text-slate-900">{record.phone}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Email</p>
                <p className="mt-2 text-slate-900">{record.email}</p>
              </div>
              {isMember ? (
                <>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Nationality</p>
                    <p className="mt-2 text-slate-900">{(record as MemberRequest).nationality}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Country of Residence</p>
                    <p className="mt-2 text-slate-900">{(record as MemberRequest).countryOfResidence}</p>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Contact Person</p>
                    <p className="mt-2 text-slate-900">{(record as PartnerRequest).contactPerson}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Country / City</p>
                    <p className="mt-2 text-slate-900">
                      {(record as PartnerRequest).country}, {(record as PartnerRequest).city}
                    </p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          <Card className="border-0 py-0 shadow-sm ring-1 ring-slate-200">
            <CardHeader>
              <CardTitle>{isMember ? 'Application Notes' : 'Proposal Details'}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm leading-7 text-slate-600">
              {isMember ? (
                <>
                  <p><span className="font-semibold text-slate-900">Occupation:</span> {(record as MemberRequest).occupation}</p>
                  <p><span className="font-semibold text-slate-900">Region:</span> {(record as MemberRequest).region}</p>
                  <p>{(record as MemberRequest).notes}</p>
                </>
              ) : (
                <>
                  <p><span className="font-semibold text-slate-900">Partnership Type:</span> {(record as PartnerRequest).partnershipType}</p>
                  <p><span className="font-semibold text-slate-900">Website:</span> {(record as PartnerRequest).website}</p>
                  <p><span className="font-semibold text-slate-900">Vision:</span> {(record as PartnerRequest).vision}</p>
                  <p>{(record as PartnerRequest).proposal}</p>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminShell>
  )
}
