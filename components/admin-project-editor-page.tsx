'use client'

import { useEffect, useState } from 'react'

import Link from 'next/link'
import { useNavigate, useParams } from 'react-router-dom'
import { ImageIcon, MapPin, Plus, Save, Trash2 } from 'lucide-react'

import { AdminShell } from '@/components/admin-shell'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  buildEmptyProject,
  createProject,
  getProjectById,
  saveProject,
} from '@/lib/admin/service'
import type { AdminProject } from '@/lib/admin/types'

type AdminProjectEditorPageProps = {
  mode: 'create' | 'edit'
}

function cloneProject(project: Omit<AdminProject, 'id' | 'updatedAt'>) {
  return {
    ...project,
    galleryImages: [...project.galleryImages],
    highlights: [...project.highlights],
    objectives: [...project.objectives],
  }
}

export function AdminProjectEditorPage({
  mode,
}: AdminProjectEditorPageProps) {
  const navigate = useNavigate()
  const { projectId = '' } = useParams()
  const [project, setProject] = useState<Omit<AdminProject, 'id' | 'updatedAt'> | null>(
    null,
  )
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (mode === 'create') {
      setProject(cloneProject(buildEmptyProject()))
      return
    }

    getProjectById(projectId).then((current) => {
      if (!current) return

      const { id: _id, updatedAt: _updatedAt, ...rest } = current
      setProject(cloneProject(rest))
    })
  }, [mode, projectId])

  if (!project) {
    return null
  }

  const updateField = <K extends keyof typeof project>(key: K, value: (typeof project)[K]) => {
    setProject((current) => (current ? { ...current, [key]: value } : current))
  }

  const updateArrayItem = (
    key: 'galleryImages' | 'highlights' | 'objectives',
    index: number,
    value: string,
  ) => {
    setProject((current) => {
      if (!current) return current

      const next = [...current[key]]
      next[index] = value

      return { ...current, [key]: next }
    })
  }

  const addArrayItem = (key: 'galleryImages' | 'highlights' | 'objectives', value: string) => {
    setProject((current) =>
      current ? { ...current, [key]: [...current[key], value] } : current,
    )
  }

  const removeArrayItem = (key: 'galleryImages' | 'highlights' | 'objectives', index: number) => {
    setProject((current) => {
      if (!current) return current

      return {
        ...current,
        [key]: current[key].filter((_, itemIndex) => itemIndex !== index),
      }
    })
  }

  const handleSave = async () => {
    setSaving(true)

    try {
      if (mode === 'create') {
        await createProject(project)
      } else {
        await saveProject({
          ...project,
          id: projectId,
          updatedAt: new Date().toISOString(),
        })
      }

      navigate('/admin/projects')
    } finally {
      setSaving(false)
    }
  }

  return (
    <AdminShell
      title={mode === 'create' ? 'Create Project' : 'Edit Project'}
      description="Use the same sections the public project page uses, while seeing a live preview of how the project will appear on the frontend."
      actions={
        <>
          <Button asChild variant="outline" className="rounded-2xl border-slate-200">
            <Link href="/admin/projects">Back to projects</Link>
          </Button>
          <Button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="rounded-2xl"
          >
            <Save className="h-4 w-4" />
            {saving ? 'Saving...' : 'Save Project'}
          </Button>
        </>
      }
    >
      <div className="space-y-6">
        <Card className="overflow-hidden border-0 py-0 shadow-sm ring-1 ring-slate-200">
          <div className="relative min-h-[440px] bg-slate-100">
            <img
              src={project.primaryImage}
              alt={project.name}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-slate-950/10" />
            <div className="relative flex h-full min-h-[440px] flex-col justify-between p-6 text-white sm:p-8">
              <div className="max-w-xl rounded-[24px] border border-white/15 bg-slate-950/25 p-4 backdrop-blur-sm">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/70">
                  Hero Image URL
                </p>
                <Input
                  value={project.primaryImage}
                  onChange={(event) => updateField('primaryImage', event.target.value)}
                  className="mt-3 border-white/15 bg-white/10 text-white placeholder:text-white/45"
                />
              </div>

              <div className="max-w-4xl">
                <div className="flex flex-wrap gap-3">
                  <Input
                    value={project.category}
                    onChange={(event) => updateField('category', event.target.value)}
                    className="h-10 w-auto min-w-[150px] rounded-full border-white/15 bg-white/10 text-white placeholder:text-white/60"
                  />
                  <Input
                    value={project.status}
                    onChange={(event) => updateField('status', event.target.value)}
                    className="h-10 w-auto min-w-[130px] rounded-full border-white/15 bg-secondary/85 text-white placeholder:text-white/75"
                  />
                </div>

                <Input
                  value={project.name}
                  onChange={(event) => updateField('name', event.target.value)}
                  className="mt-5 h-auto border-0 bg-transparent px-0 text-3xl font-semibold text-white shadow-none placeholder:text-white/60 sm:text-5xl"
                />

                <div className="mt-4 flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-white/80" />
                  <Input
                    value={project.location}
                    onChange={(event) => updateField('location', event.target.value)}
                    className="h-auto border-0 bg-transparent px-0 text-base text-white/85 shadow-none placeholder:text-white/55"
                  />
                </div>

                <Textarea
                  value={project.summary}
                  onChange={(event) => updateField('summary', event.target.value)}
                  className="mt-4 min-h-[120px] max-w-3xl border-0 bg-transparent px-0 text-sm leading-7 text-white/90 shadow-none placeholder:text-white/55"
                />
              </div>
            </div>
          </div>
        </Card>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-6">
            <Card className="border-0 py-0 shadow-sm ring-1 ring-slate-200">
              <CardHeader>
                <CardTitle>Project Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  value={project.overview}
                  onChange={(event) => updateField('overview', event.target.value)}
                  className="min-h-[120px] resize-none rounded-2xl border-slate-200 bg-slate-50 text-sm leading-7 text-slate-700"
                />
                <Textarea
                  value={project.details}
                  onChange={(event) => updateField('details', event.target.value)}
                  className="min-h-[120px] resize-none rounded-2xl border-slate-200 bg-slate-50 text-sm leading-7 text-slate-700"
                />
              </CardContent>
            </Card>

            <Card className="border-0 py-0 shadow-sm ring-1 ring-slate-200">
              <CardHeader>
                <CardTitle>Key Activities</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {project.highlights.map((item, index) => (
                  <div key={`${item}-${index}`} className="flex items-center gap-3">
                    <Input
                      value={item}
                      onChange={(event) =>
                        updateArrayItem('highlights', index, event.target.value)
                      }
                      className="rounded-2xl border-slate-200 bg-slate-50"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="rounded-xl"
                      onClick={() => removeArrayItem('highlights', index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  className="w-full rounded-xl border-dashed"
                  onClick={() => addArrayItem('highlights', 'New activity')}
                >
                  <Plus className="h-4 w-4" />
                  Add activity
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border-0 py-0 shadow-sm ring-1 ring-slate-200">
              <CardHeader>
                <CardTitle>Impact Snapshot</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={project.impact}
                  onChange={(event) => updateField('impact', event.target.value)}
                  className="min-h-[160px] resize-none rounded-2xl border-slate-200 bg-slate-50 text-sm leading-7 text-slate-700"
                />
              </CardContent>
            </Card>

            <Card className="border-0 py-0 shadow-sm ring-1 ring-slate-200">
              <CardHeader>
                <CardTitle>Project Objectives</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {project.objectives.map((item, index) => (
                  <div key={`${item}-${index}`} className="flex items-center gap-3">
                    <Input
                      value={item}
                      onChange={(event) =>
                        updateArrayItem('objectives', index, event.target.value)
                      }
                      className="rounded-2xl border-slate-200 bg-slate-50"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="rounded-xl"
                      onClick={() => removeArrayItem('objectives', index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  className="w-full rounded-xl border-dashed"
                  onClick={() => addArrayItem('objectives', 'New objective')}
                >
                  <Plus className="h-4 w-4" />
                  Add objective
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        <Card className="border-0 py-0 shadow-sm ring-1 ring-slate-200">
          <CardHeader>
            <CardTitle>Project Media</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {project.galleryImages.map((image, index) => (
              <div key={`${image}-${index}`} className="flex items-center gap-3">
                <ImageIcon className="h-4 w-4 text-slate-400" />
                <Input
                  value={image}
                  onChange={(event) =>
                    updateArrayItem('galleryImages', index, event.target.value)
                  }
                  className="rounded-2xl border-slate-200 bg-slate-50"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="rounded-xl"
                  onClick={() => removeArrayItem('galleryImages', index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              className="w-full rounded-xl border-dashed"
              onClick={() => addArrayItem('galleryImages', '/placeholder.jpg')}
            >
              <Plus className="h-4 w-4" />
              Add gallery image
            </Button>
          </CardContent>
        </Card>
      </div>
    </AdminShell>
  )
}
