'use client'

import { useEffect, useState } from 'react'

import { ImagePlus, Settings as SettingsIcon, Trash2, UploadCloud } from 'lucide-react'

import { AdminShell } from '@/components/admin-shell'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  addImagesToAlbum,
  createMediaAlbum,
  deleteMediaAlbum,
  deleteMediaImage,
  getMediaAlbums,
  getMediaSettings,
  saveMediaSettings,
} from '@/lib/admin/service'
import type { MediaAlbum, MediaImage, MediaLayout, MediaSettings } from '@/lib/admin/types'

export function AdminMediaPage() {
  const [settings, setSettings] = useState<MediaSettings | null>(null)
  const [albums, setAlbums] = useState<MediaAlbum[]>([])
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [selectedAlbumId, setSelectedAlbumId] = useState('')
  const [albumName, setAlbumName] = useState('')
  const [albumDescription, setAlbumDescription] = useState('')
  const [uploadMessage, setUploadMessage] = useState('')

  useEffect(() => {
    Promise.all([getMediaSettings(), getMediaAlbums()]).then(([nextSettings, nextAlbums]) => {
      setSettings(nextSettings)
      setAlbums(nextAlbums)
      setSelectedAlbumId(nextAlbums[0]?.id ?? '')
    })
  }, [])

  if (!settings) return null

  const selectedAlbum = albums.find((album) => album.id === selectedAlbumId) ?? null

  const handleSettingsSave = async () => {
    const saved = await saveMediaSettings(settings)
    setSettings(saved)
  }

  const handleAlbumCreate = async () => {
    if (!albumName.trim()) return

    const nextAlbum = await createMediaAlbum({
      name: albumName,
      description: albumDescription,
      coverImage: '',
    })

    setAlbums((current) => [nextAlbum, ...current])
    setSelectedAlbumId(nextAlbum.id)
    setAlbumName('')
    setAlbumDescription('')
  }

  const handleUpload = async (files: FileList | null) => {
    if (!files || !selectedAlbumId) return

    const maxBytes = settings.imageLimitMb * 1024 * 1024
    const validFiles = Array.from(files).filter((file) => file.size <= maxBytes)

    if (!validFiles.length) {
      setUploadMessage(`Images must be smaller than ${settings.imageLimitMb}MB.`)
      return
    }

    const updatedAlbum = await addImagesToAlbum(selectedAlbumId, validFiles)
    setAlbums((current) =>
      current.map((album) => (album.id === updatedAlbum.id ? updatedAlbum : album)),
    )
    setUploadMessage(`${validFiles.length} image(s) uploaded.`)
  }

  const handleAlbumDelete = async (albumId: string) => {
    if (!window.confirm('Delete this album and all its images?')) return

    await deleteMediaAlbum(albumId)

    setAlbums((current) => {
      const nextAlbums = current.filter((album) => album.id !== albumId)
      setSelectedAlbumId((currentSelected) =>
        currentSelected === albumId ? nextAlbums[0]?.id ?? '' : currentSelected,
      )
      return nextAlbums
    })
  }

  const handleImageDelete = async (imageId: string) => {
    if (!selectedAlbumId) return
    if (!window.confirm('Delete this image?')) return

    const updatedAlbum = await deleteMediaImage(selectedAlbumId, imageId)
    setAlbums((current) =>
      current.map((album) => (album.id === updatedAlbum.id ? updatedAlbum : album)),
    )
  }

  return (
    <AdminShell
      title="Media"
      description="Control the gallery display style, create albums, and upload media into albums with an image-size limit."
      actions={
        <Button
          type="button"
          variant="outline"
          className="rounded-2xl border-slate-200"
          onClick={() => setSettingsOpen((current) => !current)}
        >
          <SettingsIcon className="h-4 w-4" />
          Media Settings
        </Button>
      }
    >
      {settingsOpen ? (
        <Card className="mb-6 border-0 py-0 shadow-sm ring-1 ring-slate-200">
          <CardHeader className="px-6 pb-4 pt-6">
            <CardTitle>Media Display Settings</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 px-6 pb-6 pt-0 md:grid-cols-2">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-700">Gallery Layout</Label>
              <select
                value={settings.layout}
                onChange={(event) =>
                  setSettings((current) =>
                    current
                      ? { ...current, layout: event.target.value as MediaLayout }
                      : current,
                  )
                }
                className="flex h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none"
              >
                <option value="grouped-gallery">Grouped gallery</option>
                <option value="sections">Sectioned layout</option>
                <option value="continuous">All images together</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-700">Maximum Image Size (MB)</Label>
              <Input
                type="number"
                min={1}
                value={settings.imageLimitMb}
                onChange={(event) =>
                  setSettings((current) =>
                    current
                      ? { ...current, imageLimitMb: Number(event.target.value) || 1 }
                      : current,
                  )
                }
                className="h-12 rounded-2xl border-slate-200 bg-slate-50"
              />
            </div>

            <div className="md:col-span-2">
              <Button onClick={handleSettingsSave} className="rounded-2xl bg-secondary text-white hover:bg-secondary/90">
                Save Media Settings
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : null}

      <div className="grid gap-6 xl:grid-cols-[320px_minmax(0,1fr)]">
        <div className="space-y-6">
          <Card className="border-0 py-0 shadow-sm ring-1 ring-slate-200">
            <CardHeader className="px-6 pb-4 pt-6">
              <CardTitle>Create Album</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 px-6 pb-6 pt-0">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-slate-700">Album Name</Label>
                <Input
                  value={albumName}
                  onChange={(event) => setAlbumName(event.target.value)}
                  className="h-12 rounded-2xl border-slate-200 bg-slate-50"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-slate-700">Description</Label>
                <Textarea
                  value={albumDescription}
                  onChange={(event) => setAlbumDescription(event.target.value)}
                  className="min-h-28 rounded-2xl border-slate-200 bg-slate-50"
                />
              </div>
              <Button onClick={handleAlbumCreate} className="w-full rounded-2xl bg-secondary text-white hover:bg-secondary/90">
                <ImagePlus className="h-4 w-4" />
                Create Album
              </Button>
            </CardContent>
          </Card>

          <Card className="border-0 py-0 shadow-sm ring-1 ring-slate-200">
            <CardHeader className="px-6 pb-4 pt-6">
              <CardTitle>Albums</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 px-6 pb-6 pt-0">
              {albums.map((album) => (
                <div
                  key={album.id}
                  className={`rounded-2xl border px-4 py-4 transition ${
                    selectedAlbumId === album.id
                      ? 'border-secondary bg-secondary/5'
                      : 'border-slate-200 bg-white'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => setSelectedAlbumId(album.id)}
                      className="flex-1 text-left"
                    >
                      <p className="font-semibold text-slate-950">{album.name}</p>
                      <p className="mt-1 text-sm text-slate-600">{album.description}</p>
                      <p className="mt-2 text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
                        {album.images.length} images
                      </p>
                    </button>
                    <Button
                      type="button"
                      size="icon"
                      variant="outline"
                      className="h-9 w-9 shrink-0 rounded-xl border-rose-200 text-rose-500 hover:bg-rose-50 hover:text-rose-600"
                      onClick={() => handleAlbumDelete(album.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-0 py-0 shadow-sm ring-1 ring-slate-200">
            <CardHeader className="px-6 pb-4 pt-6">
              <CardTitle>Upload To Album</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 px-6 pb-6 pt-0">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-slate-700">Selected Album</Label>
                <select
                  value={selectedAlbumId}
                  onChange={(event) => setSelectedAlbumId(event.target.value)}
                  className="flex h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none"
                >
                  {albums.map((album) => (
                    <option key={album.id} value={album.id}>
                      {album.name}
                    </option>
                  ))}
                </select>
              </div>
              <label className="flex min-h-[180px] cursor-pointer flex-col items-center justify-center rounded-[28px] border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
                <UploadCloud className="h-10 w-10 text-secondary" />
                <p className="mt-4 text-base font-medium text-slate-950">
                  Upload album images
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  The current limit is {settings.imageLimitMb}MB per image.
                </p>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(event) => handleUpload(event.target.files)}
                />
              </label>
              {uploadMessage ? (
                <p className="text-sm text-slate-600">{uploadMessage}</p>
              ) : null}
            </CardContent>
          </Card>

          <Card className="border-0 py-0 shadow-sm ring-1 ring-slate-200">
            <CardHeader className="px-6 pb-4 pt-6">
              <CardTitle>{selectedAlbum?.name ?? 'Album Preview'}</CardTitle>
            </CardHeader>
            <CardContent className="px-6 pb-6 pt-0">
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {selectedAlbum?.images.map((image) => (
                  <div
                    key={image.id}
                    className="overflow-hidden rounded-[24px] border border-slate-200 bg-white"
                  >
                    <div className="aspect-[4/3] bg-slate-100">
                      <img src={image.url} alt={image.name} className="h-full w-full object-cover" />
                    </div>
                    <div className="flex items-start justify-between gap-3 px-4 py-3">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-slate-950">{image.name}</p>
                        <p className="mt-1 text-xs text-slate-500">{image.sizeKb} KB</p>
                      </div>
                      <Button
                        type="button"
                        size="icon"
                        variant="outline"
                        className="h-9 w-9 shrink-0 rounded-xl border-rose-200 text-rose-500 hover:bg-rose-50 hover:text-rose-600"
                        onClick={() => handleImageDelete(image.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminShell>
  )
}
