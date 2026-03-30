'use client'

import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'

import Link from 'next/link'
import { useNavigate, useParams } from 'react-router-dom'
import {
  Bold,
  ImageIcon,
  Italic,
  List,
  MapPin,
  Plus,
  Save,
  Trash2,
  Underline,
  UploadCloud,
} from 'lucide-react'

import { AdminShell } from '@/components/admin-shell'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  buildEmptyProject,
  createProject,
  deleteProject,
  getProjectCategories,
  getProjectById,
  saveProject,
  uploadImages,
} from '@/lib/admin/service'
import type { AdminProject } from '@/lib/admin/types'

type AdminProjectEditorPageProps = {
  mode: 'create' | 'edit'
}

function sanitizeListMarkup(value: string) {
  if (typeof window === 'undefined') {
    return ''
  }

  const parser = new window.DOMParser()
  const documentNode = parser.parseFromString(value || '', 'text/html')
  const items = Array.from(documentNode.body.querySelectorAll('li'))
    .map((item) => item.innerHTML.trim())
    .filter(Boolean)

  if (items.length) {
    return `<ul>${items.map((item) => `<li>${item}</li>`).join('')}</ul>`
  }

  const fallback = documentNode.body.textContent
    ?.split('\n')
    .map((line) => line.replace(/^\s*(?:[-*•]|\d+[.)])?\s*/, '').trim())
    .filter(Boolean)

  if (!fallback?.length) {
    return '<ul><li></li></ul>'
  }

  return `<ul>${fallback.map((item) => `<li>${item}</li>`).join('')}</ul>`
}

function extractListItems(value: string) {
  if (typeof window === 'undefined') {
    return []
  }

  const parser = new window.DOMParser()
  const documentNode = parser.parseFromString(sanitizeListMarkup(value), 'text/html')

  return Array.from(documentNode.body.querySelectorAll('li'))
    .map((item) => item.textContent?.trim() || '')
    .filter(Boolean)
}

function formatListMarkup(items: string[]) {
  if (!items.length) {
    return '<ul><li></li></ul>'
  }

  return `<ul>${items.map((item) => `<li>${item}</li>`).join('')}</ul>`
}

function ListToolbarButton({
  label,
  icon: Icon,
  onClick,
}: {
  label: string
  icon: typeof Bold
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-100 hover:text-slate-950"
      aria-label={label}
      title={label}
    >
      <Icon className="h-4 w-4" />
    </button>
  )
}

function UnorderedListEditor({
  title,
  hint,
  value,
  onChange,
}: {
  title: string
  hint: string
  value: string
  onChange: (value: string) => void
}) {
  const applyCommand = (command: 'bold' | 'italic' | 'underline' | 'insertUnorderedList') => {
    document.execCommand(command)
  }

  const handleInput = (event: FormEvent<HTMLDivElement>) => {
    const nextValue = sanitizeListMarkup(event.currentTarget.innerHTML)
    event.currentTarget.innerHTML = nextValue
    onChange(nextValue)
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs">
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 bg-slate-50 px-3 py-2">
        <ListToolbarButton label="Bold" icon={Bold} onClick={() => applyCommand('bold')} />
        <ListToolbarButton label="Italic" icon={Italic} onClick={() => applyCommand('italic')} />
        <ListToolbarButton
          label="Underline"
          icon={Underline}
          onClick={() => applyCommand('underline')}
        />
        <div className="mx-1 h-5 w-px bg-slate-200" />
        <ListToolbarButton
          label="Unordered list"
          icon={List}
          onClick={() => applyCommand('insertUnorderedList')}
        />
        <span className="ml-auto text-xs font-medium text-slate-500">{hint}</span>
      </div>
      <div className="border-b border-slate-200 bg-white px-3 py-2 text-sm text-slate-500">
        {title}
      </div>
      <div
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        onBlur={(event) => {
          const nextValue = sanitizeListMarkup(event.currentTarget.innerHTML)
          event.currentTarget.innerHTML = nextValue
          onChange(nextValue)
        }}
        className="min-h-[220px] bg-white px-4 py-3 text-sm leading-7 text-slate-700 outline-none [&_li]:ml-5 [&_li]:list-disc [&_ul]:space-y-2"
        dangerouslySetInnerHTML={{ __html: value }}
      />
      <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-500">
        <span>body</span>
        <span>Unordered list only</span>
      </div>
    </div>
  )
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
  const [categories, setCategories] = useState<string[]>([])
  const [saving, setSaving] = useState(false)
  const [uploadingField, setUploadingField] = useState<'primary' | 'gallery' | null>(null)
  const [uploadError, setUploadError] = useState('')
  const [heroImageErrored, setHeroImageErrored] = useState(false)
  const [highlightsMarkup, setHighlightsMarkup] = useState('<ul><li></li></ul>')
  const [objectivesMarkup, setObjectivesMarkup] = useState('<ul><li></li></ul>')

  useEffect(() => {
    getProjectCategories().then(setCategories).catch(() => setCategories([]))

    if (mode === 'create') {
      getProjectCategories()
        .then((items) => {
          setCategories(items)

          const nextProject = cloneProject(buildEmptyProject())
          nextProject.category = items[0] || ''
          setProject(nextProject)
        })
        .catch(() => {
          setProject(cloneProject(buildEmptyProject()))
        })

      return
    }

    getProjectById(projectId).then((current) => {
      if (!current) return

      const { id: _id, updatedAt: _updatedAt, ...rest } = current
      setProject(cloneProject(rest))
      setCategories((existing) =>
        rest.category && !existing.includes(rest.category)
          ? [rest.category, ...existing]
          : existing,
      )
    })
  }, [mode, projectId])

  useEffect(() => {
    setHeroImageErrored(false)
  }, [project?.primaryImage])

  useEffect(() => {
    if (!project) return

    setHighlightsMarkup(formatListMarkup(project.highlights))
    setObjectivesMarkup(formatListMarkup(project.objectives))
  }, [project])

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
    const nextProject = {
      ...project,
      highlights: extractListItems(highlightsMarkup),
      objectives: extractListItems(objectivesMarkup),
    }

    setProject(nextProject)
    setSaving(true)

    try {
      if (mode === 'create') {
        await createProject(nextProject)
      } else {
        await saveProject({
          ...nextProject,
          id: projectId,
          updatedAt: new Date().toISOString(),
        })
      }

      navigate('/admin/projects')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (mode !== 'edit') return
    if (!window.confirm('Delete this project?')) return

    await deleteProject(projectId)
    navigate('/admin/projects')
  }

  const handleImageUpload = async (
    target: 'primary' | 'gallery',
    files: FileList | null,
  ) => {
    if (!files?.length) return

    setUploadingField(target)
    setUploadError('')

    try {
      const uploaded = await uploadImages(Array.from(files), 'projects')

      setProject((current) => {
        if (!current || !uploaded.length) return current

        if (target === 'primary') {
          return {
            ...current,
            primaryImage: uploaded[0].url,
          }
        }

        return {
          ...current,
          galleryImages: [...current.galleryImages, ...uploaded.map((image) => image.url)],
        }
      })
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : 'Failed to upload image')
    } finally {
      setUploadingField(null)
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
          {mode === 'edit' ? (
            <Button
              type="button"
              variant="outline"
              onClick={handleDelete}
              className="rounded-2xl border-rose-200 text-rose-500 hover:bg-rose-50 hover:text-rose-600"
            >
              <Trash2 className="h-4 w-4" />
              Delete Project
            </Button>
          ) : null}
          <Button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="rounded-2xl bg-secondary text-white hover:bg-secondary/90"
          >
            <Save className="h-4 w-4" />
            {saving ? 'Saving...' : 'Save Project'}
          </Button>
        </>
      }
    >
      <div className="space-y-6">
        <Card className="overflow-hidden border-0 py-0 shadow-sm ring-1 ring-slate-200">
          <div className="relative overflow-hidden bg-slate-950">
            {!heroImageErrored && project.primaryImage ? (
              <img
                src={project.primaryImage}
                alt={project.name}
                className="absolute inset-0 h-full w-full object-cover"
                onError={() => setHeroImageErrored(true)}
              />
            ) : null}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-700/50 via-slate-800/35 to-slate-950/90" />
            {!project.primaryImage || heroImageErrored ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="rounded-[28px] border border-white/12 bg-white/8 px-6 py-5 text-center backdrop-blur-sm">
                  <ImageIcon className="mx-auto h-8 w-8 text-white/70" />
                  <p className="mt-3 text-sm font-semibold text-white">Project hero image</p>
                  <p className="mt-1 text-xs text-white/65">
                    Upload an image to preview the project header.
                  </p>
                </div>
              </div>
            ) : null}

            <div className="relative grid min-h-[440px] gap-6 p-6 text-white sm:p-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
              <div className="flex min-h-[360px] flex-col justify-end">
                <div className="max-w-4xl rounded-[28px] border border-white/12 bg-slate-950/35 p-5 backdrop-blur-md sm:p-6">
                  <div className="flex flex-wrap gap-3">
                    <Input
                      list="project-category-options"
                      value={project.category}
                      onChange={(event) => updateField('category', event.target.value)}
                      placeholder="Project category"
                      className="h-11 w-[180px] rounded-full border-white/15 bg-white/10 text-sm font-medium text-white placeholder:text-white/55"
                    />
                    <datalist id="project-category-options">
                      {categories.map((category) => (
                        <option key={category} value={category} />
                      ))}
                    </datalist>
                    <Input
                      value={project.status}
                      onChange={(event) => updateField('status', event.target.value)}
                      placeholder="Project status"
                      className="h-11 w-[150px] rounded-full border-white/15 bg-secondary/85 text-sm font-medium text-white placeholder:text-white/75"
                    />
                  </div>

                  <Input
                    value={project.name}
                    onChange={(event) => updateField('name', event.target.value)}
                    className="mt-5 h-auto border-0 bg-transparent px-0 text-3xl font-semibold text-white shadow-none placeholder:text-white/55 sm:text-[46px]"
                  />

                  <div className="mt-4 flex max-w-2xl items-center gap-3 rounded-2xl border border-white/12 bg-white/10 px-4 py-3">
                    <MapPin className="h-4 w-4 shrink-0 text-white/80" />
                    <Input
                      value={project.location}
                      onChange={(event) => updateField('location', event.target.value)}
                      className="h-auto border-0 bg-transparent px-0 text-base text-white/90 shadow-none placeholder:text-white/50"
                    />
                  </div>

                  <Textarea
                    value={project.summary}
                    onChange={(event) => updateField('summary', event.target.value)}
                    className="mt-4 min-h-[110px] max-w-3xl resize-none border-0 bg-transparent px-0 text-[15px] leading-7 text-white/90 shadow-none placeholder:text-white/50"
                  />
                </div>
              </div>

              <div className="rounded-[28px] border border-white/12 bg-slate-950/40 p-5 backdrop-blur-md">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/70">
                    Hero Image
                  </p>
                  <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-white/15">
                    <UploadCloud className="h-3.5 w-3.5" />
                    {uploadingField === 'primary' ? 'Uploading...' : 'Upload image'}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      disabled={uploadingField === 'primary'}
                      onChange={(event) => handleImageUpload('primary', event.target.files)}
                    />
                  </label>
                </div>
                <Input
                  value={project.primaryImage}
                  onChange={(event) => updateField('primaryImage', event.target.value)}
                  placeholder="Paste image URL or upload one"
                  className="mt-4 border-white/15 bg-white/10 text-white placeholder:text-white/45"
                />
                {uploadError ? <p className="mt-3 text-sm text-rose-300">{uploadError}</p> : null}
              </div>
            </div>
          </div>
        </Card>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-6">
            <Card className="border-0 py-0 shadow-sm ring-1 ring-slate-200">
              <CardHeader className="px-6 pb-4 pt-6">
                <CardTitle>Project Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 px-6 pb-6 pt-0">
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
              <CardHeader className="px-6 pb-4 pt-6">
                <CardTitle>Key Activities</CardTitle>
              </CardHeader>
              <CardContent className="px-6 pb-6 pt-0">
                <UnorderedListEditor
                  title="Normal"
                  hint="Key activities"
                  value={highlightsMarkup}
                  onChange={setHighlightsMarkup}
                />
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border-0 py-0 shadow-sm ring-1 ring-slate-200">
              <CardHeader className="px-6 pb-4 pt-6">
                <CardTitle>Impact Snapshot</CardTitle>
              </CardHeader>
              <CardContent className="px-6 pb-6 pt-0">
                <Textarea
                  value={project.impact}
                  onChange={(event) => updateField('impact', event.target.value)}
                  className="min-h-[160px] resize-none rounded-2xl border-slate-200 bg-slate-50 text-sm leading-7 text-slate-700"
                />
              </CardContent>
            </Card>

            <Card className="border-0 py-0 shadow-sm ring-1 ring-slate-200">
              <CardHeader className="px-6 pb-4 pt-6">
                <CardTitle>Project Objectives</CardTitle>
              </CardHeader>
              <CardContent className="px-6 pb-6 pt-0">
                <UnorderedListEditor
                  title="Normal"
                  hint="Project objectives"
                  value={objectivesMarkup}
                  onChange={setObjectivesMarkup}
                />
              </CardContent>
            </Card>
          </div>
        </div>

        <Card className="border-0 py-0 shadow-sm ring-1 ring-slate-200">
          <CardHeader className="px-6 pb-4 pt-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <CardTitle>Project Media</CardTitle>
              <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-dashed border-secondary/30 px-3 py-2 text-sm font-semibold text-secondary transition hover:bg-secondary/5">
                <UploadCloud className="h-4 w-4" />
                {uploadingField === 'gallery' ? 'Uploading...' : 'Upload gallery images'}
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  disabled={uploadingField === 'gallery'}
                  onChange={(event) => handleImageUpload('gallery', event.target.files)}
                />
              </label>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 px-6 pb-6 pt-0">
            {project.galleryImages.map((image, index) => (
              <div key={`${image}-${index}`} className="flex items-center gap-3">
                <ImageIcon className="h-4 w-4 text-slate-400" />
                <Input
                  value={image}
                  onChange={(event) =>
                    updateArrayItem('galleryImages', index, event.target.value)
                  }
                  className="h-12 rounded-2xl border-slate-200 bg-slate-50"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-12 w-12 shrink-0 rounded-2xl border-slate-200"
                  onClick={() => removeArrayItem('galleryImages', index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              className="w-full rounded-xl border-dashed border-secondary/30 text-secondary hover:bg-secondary/5"
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
