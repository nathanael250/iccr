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
import { Label } from '@/components/ui/label'
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
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.15fr)_420px]">
        <div className="space-y-6">
          <Card className="overflow-hidden border-0 py-0 shadow-sm ring-1 ring-slate-200">
            <div className="relative h-80 bg-slate-100">
              <img
                src={project.primaryImage}
                alt={project.name}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent" />
              <div className="absolute inset-x-6 bottom-6 text-white">
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-white/10 text-white hover:bg-white/10">
                    {project.category}
                  </Badge>
                  <Badge className="bg-primary text-primary-foreground hover:bg-primary">
                    {project.status}
                  </Badge>
                </div>
                <h2 className="mt-4 text-3xl font-semibold">{project.name}</h2>
                <p className="mt-3 flex items-center gap-2 text-sm text-white/80">
                  <MapPin className="h-4 w-4" />
                  {project.location}
                </p>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-white/85">
                  {project.summary}
                </p>
              </div>
            </div>
          </Card>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
            <div className="space-y-6">
              <Card className="border-0 py-0 shadow-sm ring-1 ring-slate-200">
                <CardHeader>
                  <CardTitle>Project Overview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm leading-7 text-slate-600">
                  <p>{project.overview}</p>
                  <p>{project.details}</p>
                </CardContent>
              </Card>

              <Card className="border-0 py-0 shadow-sm ring-1 ring-slate-200">
                <CardHeader>
                  <CardTitle>Key Activities</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {project.highlights.map((item, index) => (
                    <div
                      key={`${item}-${index}`}
                      className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-700"
                    >
                      {item}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="border-0 py-0 shadow-sm ring-1 ring-slate-200">
                <CardHeader>
                  <CardTitle>Impact Snapshot</CardTitle>
                </CardHeader>
                <CardContent className="text-sm leading-7 text-slate-600">
                  {project.impact}
                </CardContent>
              </Card>

              <Card className="border-0 py-0 shadow-sm ring-1 ring-slate-200">
                <CardHeader>
                  <CardTitle>Project Objectives</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {project.objectives.map((item, index) => (
                    <div
                      key={`${item}-${index}`}
                      className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-700"
                    >
                      {item}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <Card className="border-0 py-0 shadow-sm ring-1 ring-slate-200">
            <CardHeader>
              <CardTitle>Hero Section</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Project Name</Label>
                <Input
                  value={project.name}
                  onChange={(event) => updateField('name', event.target.value)}
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Input
                    value={project.category}
                    onChange={(event) => updateField('category', event.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Input
                    value={project.status}
                    onChange={(event) => updateField('status', event.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Location</Label>
                <Input
                  value={project.location}
                  onChange={(event) => updateField('location', event.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Primary Image URL</Label>
                <Input
                  value={project.primaryImage}
                  onChange={(event) => updateField('primaryImage', event.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Summary</Label>
                <Textarea
                  value={project.summary}
                  onChange={(event) => updateField('summary', event.target.value)}
                  className="min-h-28"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 py-0 shadow-sm ring-1 ring-slate-200">
            <CardHeader>
              <CardTitle>Story Sections</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Impact</Label>
                <Textarea
                  value={project.impact}
                  onChange={(event) => updateField('impact', event.target.value)}
                  className="min-h-24"
                />
              </div>
              <div className="space-y-2">
                <Label>Overview</Label>
                <Textarea
                  value={project.overview}
                  onChange={(event) => updateField('overview', event.target.value)}
                  className="min-h-32"
                />
              </div>
              <div className="space-y-2">
                <Label>Details</Label>
                <Textarea
                  value={project.details}
                  onChange={(event) => updateField('details', event.target.value)}
                  className="min-h-32"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 py-0 shadow-sm ring-1 ring-slate-200">
            <CardHeader>
              <CardTitle>Gallery Images</CardTitle>
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

          {[
            {
              title: 'Highlights',
              key: 'highlights' as const,
            },
            {
              title: 'Objectives',
              key: 'objectives' as const,
            },
          ].map((section) => (
            <Card key={section.key} className="border-0 py-0 shadow-sm ring-1 ring-slate-200">
              <CardHeader>
                <CardTitle>{section.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {project[section.key].map((item, index) => (
                  <div key={`${item}-${index}`} className="flex items-center gap-3">
                    <Input
                      value={item}
                      onChange={(event) =>
                        updateArrayItem(section.key, index, event.target.value)
                      }
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="rounded-xl"
                      onClick={() => removeArrayItem(section.key, index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  className="w-full rounded-xl border-dashed"
                  onClick={() => addArrayItem(section.key, `${section.title} item`)}
                >
                  <Plus className="h-4 w-4" />
                  Add {section.title.slice(0, -1).toLowerCase()}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AdminShell>
  )
}
