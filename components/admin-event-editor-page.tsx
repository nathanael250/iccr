'use client'

import { useEffect, useState } from 'react'

import Link from 'next/link'
import { useNavigate, useParams } from 'react-router-dom'
import { CalendarDays, Clock3, MonitorPlay, Plus, Save } from 'lucide-react'

import { AdminShell } from '@/components/admin-shell'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  buildEmptyEvent,
  createEvent,
  getEventById,
  saveEvent,
} from '@/lib/admin/service'
import type { AdminEvent } from '@/lib/admin/types'

type AdminEventEditorPageProps = {
  mode: 'create' | 'edit'
}

export function AdminEventEditorPage({ mode }: AdminEventEditorPageProps) {
  const navigate = useNavigate()
  const { eventId = '' } = useParams()
  const [eventData, setEventData] = useState<Omit<AdminEvent, 'id' | 'updatedAt'> | null>(
    null,
  )
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (mode === 'create') {
      setEventData(buildEmptyEvent())
      return
    }

    getEventById(eventId).then((current) => {
      if (!current) return

      const { id: _id, updatedAt: _updatedAt, ...rest } = current
      setEventData(rest)
    })
  }, [eventId, mode])

  if (!eventData) return null

  const updateField = <K extends keyof typeof eventData>(key: K, value: (typeof eventData)[K]) => {
    setEventData((current) => (current ? { ...current, [key]: value } : current))
  }

  const handleSave = async () => {
    setSaving(true)

    try {
      if (mode === 'create') {
        await createEvent(eventData)
      } else {
        await saveEvent({
          ...eventData,
          id: eventId,
          updatedAt: new Date().toISOString(),
        })
      }

      navigate('/admin/events')
    } finally {
      setSaving(false)
    }
  }

  return (
    <AdminShell
      title={mode === 'create' ? 'Add Event' : 'Edit Event'}
      description="Build the same event card the frontend uses while filling the content in a structured editor."
      actions={
        <>
          <Button asChild variant="outline" className="rounded-2xl border-slate-200">
            <Link href="/admin/events">Back to events</Link>
          </Button>
          <Button onClick={handleSave} disabled={saving} className="rounded-2xl">
            <Save className="h-4 w-4" />
            {saving ? 'Saving...' : 'Save Event'}
          </Button>
        </>
      }
    >
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.05fr)_420px]">
        <Card className="overflow-hidden border-0 py-0 shadow-sm ring-1 ring-slate-200">
          <div className="border-b border-slate-200 bg-slate-100 p-4">
            <div className="relative aspect-[1080/720] overflow-hidden rounded-[20px] bg-white">
              <img
                src={eventData.flyerImage}
                alt={eventData.name}
                className="h-full w-full object-contain"
              />
            </div>
          </div>
          <CardContent className="space-y-4 p-6">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="bg-primary/10 text-primary hover:bg-primary/10">
                {eventData.category}
              </Badge>
              {eventData.featured ? (
                <Badge className="bg-primary text-primary-foreground hover:bg-primary">
                  Featured
                </Badge>
              ) : null}
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-slate-950">{eventData.name}</h2>
              <p className="mt-1 text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                {eventData.subtitle}
              </p>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Hosted by {eventData.host}. {eventData.description}
              </p>
            </div>
            <div className="space-y-3 border-t border-slate-200 pt-4 text-sm text-slate-700">
              <div className="flex items-center gap-3">
                <CalendarDays className="h-4 w-4 text-primary" />
                <span>{eventData.date}</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock3 className="h-4 w-4 text-primary" />
                <span>
                  {eventData.time} / {eventData.timeAlt}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <MonitorPlay className="h-4 w-4 text-primary" />
                <span>{eventData.location}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="border-0 py-0 shadow-sm ring-1 ring-slate-200">
            <CardHeader>
              <CardTitle>Event Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Event Name</Label>
                <Input
                  value={eventData.name}
                  onChange={(event) => updateField('name', event.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Subtitle</Label>
                <Input
                  value={eventData.subtitle}
                  onChange={(event) => updateField('subtitle', event.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Host</Label>
                <Input
                  value={eventData.host}
                  onChange={(event) => updateField('host', event.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={eventData.description}
                  onChange={(event) => updateField('description', event.target.value)}
                  className="min-h-28"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 py-0 shadow-sm ring-1 ring-slate-200">
            <CardHeader>
              <CardTitle>Event Schedule</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Date</Label>
                <Input
                  value={eventData.date}
                  onChange={(event) => updateField('date', event.target.value)}
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Time</Label>
                  <Input
                    value={eventData.time}
                    onChange={(event) => updateField('time', event.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>24h Time</Label>
                  <Input
                    value={eventData.timeAlt}
                    onChange={(event) => updateField('timeAlt', event.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Location</Label>
                <Input
                  value={eventData.location}
                  onChange={(event) => updateField('location', event.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Google Meet / Event Link</Label>
                <Input
                  value={eventData.meetLink}
                  onChange={(event) => updateField('meetLink', event.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 py-0 shadow-sm ring-1 ring-slate-200">
            <CardHeader>
              <CardTitle>Card Appearance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Category Label</Label>
                <Input
                  value={eventData.category}
                  onChange={(event) => updateField('category', event.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Flyer Image URL</Label>
                <Input
                  value={eventData.flyerImage}
                  onChange={(event) => updateField('flyerImage', event.target.value)}
                />
              </div>
              <Button
                type="button"
                variant="outline"
                className="w-full rounded-xl border-dashed"
                onClick={() => updateField('featured', !eventData.featured)}
              >
                <Plus className="h-4 w-4" />
                {eventData.featured ? 'Marked as featured' : 'Mark as featured'}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminShell>
  )
}
