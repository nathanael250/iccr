'use client'

import { useEffect, useState } from 'react'

import Link from 'next/link'
import { useNavigate, useParams } from 'react-router-dom'
import {
  CalendarDays,
  Clock3,
  Link2,
  MapPin,
  MonitorPlay,
  Save,
  Trash2,
  UploadCloud,
} from 'lucide-react'

import { AdminShell } from '@/components/admin-shell'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  buildEmptyEvent,
  createEvent,
  deleteEvent,
  getEventById,
  saveEvent,
  uploadImages,
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
  const [uploadingFlyer, setUploadingFlyer] = useState(false)
  const [uploadError, setUploadError] = useState('')
  const [flyerImageErrored, setFlyerImageErrored] = useState(false)

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

  useEffect(() => {
    setFlyerImageErrored(false)
  }, [eventData?.flyerImage])

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

  const handleDelete = async () => {
    if (mode !== 'edit') return
    if (!window.confirm('Delete this event?')) return

    await deleteEvent(eventId)
    navigate('/admin/events')
  }

  const handleFlyerUpload = async (files: FileList | null) => {
    if (!files?.length) return

    setUploadingFlyer(true)
    setUploadError('')

    try {
      const uploaded = await uploadImages([files[0]], 'events')
      if (uploaded[0]) {
        updateField('flyerImage', uploaded[0].url)
      }
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : 'Failed to upload flyer image')
    } finally {
      setUploadingFlyer(false)
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
          {mode === 'edit' ? (
            <Button
              type="button"
              variant="outline"
              onClick={handleDelete}
              className="rounded-2xl border-rose-200 text-rose-500 hover:bg-rose-50 hover:text-rose-600"
            >
              <Trash2 className="h-4 w-4" />
              Delete Event
            </Button>
          ) : null}
          <Button onClick={handleSave} disabled={saving} className="rounded-2xl bg-secondary text-white hover:bg-secondary/90">
            <Save className="h-4 w-4" />
            {saving ? 'Saving...' : 'Save Event'}
          </Button>
        </>
      }
    >
      <div className="space-y-6">
        <Card className="overflow-hidden border-0 py-0 shadow-sm ring-1 ring-slate-200">
          <div className="border-b border-slate-200 bg-slate-100 p-5 sm:p-6">
            <div className="relative aspect-[1080/720] overflow-hidden rounded-[24px] bg-white">
              {!flyerImageErrored && eventData.flyerImage ? (
                <img
                  src={eventData.flyerImage}
                  alt={eventData.name}
                  className="h-full w-full object-contain"
                  onError={() => setFlyerImageErrored(true)}
                />
              ) : null}

              {!eventData.flyerImage || flyerImageErrored ? (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-50">
                  <div className="rounded-[28px] border border-dashed border-slate-300 bg-white px-6 py-5 text-center">
                    <MonitorPlay className="mx-auto h-8 w-8 text-secondary" />
                    <p className="mt-3 text-sm font-semibold text-slate-950">Event flyer preview</p>
                    <p className="mt-1 text-xs leading-6 text-slate-500">
                      Upload a flyer or paste an image URL to preview the card.
                    </p>
                  </div>
                </div>
              ) : null}

              <div className="absolute left-4 top-4 right-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <Input
                    value={eventData.category}
                    onChange={(event) => updateField('category', event.target.value)}
                    placeholder="Category label"
                    className="h-10 w-[180px] rounded-full border-white/70 bg-white/90 text-sm font-medium text-slate-900 shadow-sm"
                  />
                  <button
                    type="button"
                    onClick={() => updateField('featured', !eventData.featured)}
                    className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                      eventData.featured
                        ? 'bg-secondary text-white'
                        : 'bg-white/90 text-slate-700 shadow-sm'
                    }`}
                  >
                    {eventData.featured ? 'Featured' : 'Standard'}
                  </button>
                </div>

                <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/70 bg-white/90 px-4 py-2 text-xs font-semibold text-slate-900 shadow-sm transition hover:bg-white">
                  <UploadCloud className="h-3.5 w-3.5 text-secondary" />
                  {uploadingFlyer ? 'Uploading...' : 'Upload flyer'}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    disabled={uploadingFlyer}
                    onChange={(event) => handleFlyerUpload(event.target.files)}
                  />
                </label>
              </div>
            </div>
          </div>

          <CardContent className="space-y-6 p-6">
            <div className="grid gap-6 xl:grid-cols-[minmax(0,1.1fr)_360px]">
              <div className="space-y-5">
                <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-6">
                  <Input
                    value={eventData.name}
                    onChange={(event) => updateField('name', event.target.value)}
                    className="h-auto border-0 bg-transparent px-0 text-3xl font-semibold text-slate-950 shadow-none placeholder:text-slate-400 sm:text-[42px]"
                  />
                  <Input
                    value={eventData.subtitle}
                    onChange={(event) => updateField('subtitle', event.target.value)}
                    className="mt-3 h-auto border-0 bg-transparent px-0 text-sm font-semibold uppercase tracking-[0.18em] text-secondary shadow-none placeholder:text-secondary/60"
                  />
                  <div className="mt-5 rounded-2xl border border-slate-200 bg-white px-4 py-4">
                    <p className="text-sm font-medium text-slate-500">Hosted by</p>
                    <Input
                      value={eventData.host}
                      onChange={(event) => updateField('host', event.target.value)}
                      className="mt-1 h-auto border-0 bg-transparent px-0 text-lg font-semibold text-slate-950 shadow-none placeholder:text-slate-400"
                    />
                  </div>
                  <Textarea
                    value={eventData.description}
                    onChange={(event) => updateField('description', event.target.value)}
                    className="mt-5 min-h-36 rounded-3xl border-slate-200 bg-white text-[15px] leading-7 text-slate-700"
                  />
                </div>

                <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
                    Flyer Source
                  </p>
                  <Input
                    value={eventData.flyerImage}
                    onChange={(event) => updateField('flyerImage', event.target.value)}
                    placeholder="Paste flyer image URL here"
                    className="mt-4 h-12 rounded-2xl border-slate-200 bg-white"
                  />
                  {uploadError ? <p className="mt-3 text-sm text-rose-500">{uploadError}</p> : null}
                </div>
              </div>

              <div className="space-y-5">
                <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-6">
                  <div className="flex items-center gap-3">
                    <CalendarDays className="h-4 w-4 text-secondary" />
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
                      Event Date
                    </p>
                  </div>
                  <Input
                    value={eventData.date}
                    onChange={(event) => updateField('date', event.target.value)}
                    className="mt-4 h-12 rounded-2xl border-slate-200 bg-white"
                  />
                </div>

                <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-6">
                  <div className="flex items-center gap-3">
                    <Clock3 className="h-4 w-4 text-secondary" />
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
                      Time
                    </p>
                  </div>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <Input
                      value={eventData.time}
                      onChange={(event) => updateField('time', event.target.value)}
                      placeholder="Time"
                      className="h-12 rounded-2xl border-slate-200 bg-white"
                    />
                    <Input
                      value={eventData.timeAlt}
                      onChange={(event) => updateField('timeAlt', event.target.value)}
                      placeholder="24h time"
                      className="h-12 rounded-2xl border-slate-200 bg-white"
                    />
                  </div>
                </div>

                <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-6">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-secondary" />
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
                      Location
                    </p>
                  </div>
                  <Input
                    value={eventData.location}
                    onChange={(event) => updateField('location', event.target.value)}
                    className="mt-4 h-12 rounded-2xl border-slate-200 bg-white"
                  />
                </div>

                <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-6">
                  <div className="flex items-center gap-3">
                    <Link2 className="h-4 w-4 text-secondary" />
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
                      Event Link
                    </p>
                  </div>
                  <Input
                    value={eventData.meetLink}
                    onChange={(event) => updateField('meetLink', event.target.value)}
                    className="mt-4 h-12 rounded-2xl border-slate-200 bg-white"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminShell>
  )
}
