'use client'

import { useEffect, useState } from 'react'

import Link from 'next/link'
import { PencilLine, Plus } from 'lucide-react'

import { AdminShell } from '@/components/admin-shell'
import { Badge } from '@/components/ui/badge'
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
import { getEvents } from '@/lib/admin/service'
import type { AdminEvent } from '@/lib/admin/types'

export function AdminEventsPage() {
  const [events, setEvents] = useState<AdminEvent[]>([])

  useEffect(() => {
    getEvents().then(setEvents)
  }, [])

  return (
    <AdminShell
      title="Events"
      description="Manage the event cards shown on the website, then open the event editor to create or change one with a live preview."
      actions={
        <Button asChild className="rounded-2xl">
          <Link href="/admin/events/new">
            <Plus className="h-4 w-4" />
            Add Event
          </Link>
        </Button>
      }
    >
      <Card className="border-0 py-0 shadow-sm ring-1 ring-slate-200">
        <CardContent className="px-0 pb-2">
          <Table>
            <TableHeader>
              <TableRow className="border-slate-200">
                <TableHead className="px-6">Event</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="pr-6 text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {events.map((event) => (
                <TableRow key={event.id} className="border-slate-200">
                  <TableCell className="px-6 py-4">
                    <div className="flex items-start gap-4">
                      <img
                        src={event.flyerImage}
                        alt={event.name}
                        className="h-20 w-28 rounded-2xl border border-slate-200 object-contain bg-white"
                      />
                      <div>
                        <p className="font-semibold text-slate-950">{event.name}</p>
                        <p className="mt-1 text-sm text-primary">{event.subtitle}</p>
                        <p className="mt-1 line-clamp-2 text-sm leading-6 text-slate-600">
                          {event.description}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-4 text-slate-600">
                    {event.date}
                    <div className="text-xs text-slate-500">{event.time}</div>
                  </TableCell>
                  <TableCell className="py-4 text-slate-600">{event.location}</TableCell>
                  <TableCell className="py-4">
                    <Badge className="bg-primary/10 text-primary hover:bg-primary/10">
                      {event.featured ? 'Upcoming' : event.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="py-4 pr-6 text-right">
                    <Button asChild variant="outline" className="rounded-xl border-slate-200">
                      <Link href={`/admin/events/${event.id}/edit`}>
                        <PencilLine className="h-4 w-4" />
                        Edit
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
