import fallbackEventFlyer from '@/src/assets/event/image.png'
import {
  getProjectBySlug as getStaticProjectBySlug,
  projects as staticProjects,
  type Project,
} from '@/app/projects/data'
import { getAdminApiBaseUrl, resolveAdminAssetUrl } from '@/lib/admin/request'
import type { AdminEvent, AdminProject, MediaAlbum, MediaLayout, MediaSettings } from '@/lib/admin/types'

const mediaModules = import.meta.glob('/src/assets/media/*.{jpeg,jpg,png,JPEG,JPG,PNG}', {
  eager: true,
  import: 'default',
}) as Record<string, string>

export type PublicEvent = {
  id: string
  name: string
  subtitle: string
  date: string
  time: string
  timeAlt: string
  location: string
  host: string
  description: string
  category: string
  image: string
  meetLink: string
  featured: boolean
}

export type PublicMediaImage = {
  id: string
  src: string
  alt: string
  title: string
  featured: boolean
  tall: boolean
  albumId?: string
  albumName?: string
}

export type PublicMediaSection = {
  id: string
  name: string
  description: string
  images: PublicMediaImage[]
}

export type PublicMediaContent = {
  layout: MediaLayout
  images: PublicMediaImage[]
  sections: PublicMediaSection[]
  usingFallback: boolean
}

export const fallbackEvents: PublicEvent[] = [
  {
    id: 'fallback-event-1',
    name: 'Youth Online Seminar',
    subtitle: 'Part Three',
    date: 'Sunday 29 March 2026',
    time: '5:30 PM',
    timeAlt: '17:30',
    location: 'Google Meet',
    host: 'Pastor Brigitte',
    description: "Theme: How To Live The Christian Way In Today's World - Part Three.",
    category: 'Upcoming Event',
    image: fallbackEventFlyer,
    meetLink: 'https://meet.google.com/kxv-yvzx-kgh',
    featured: true,
  },
]

export const fallbackMediaContent: PublicMediaContent = {
  layout: 'grouped-gallery',
  images: Object.entries(mediaModules)
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([path, src], index) => ({
      id: `fallback-media-${index + 1}`,
      src,
      alt: `Impact For Christ Church media photo ${index + 1}`,
      title: `Gallery Photo ${String(index + 1).padStart(2, '0')}`,
      featured: index === 0,
      tall: [0, 2, 5, 8, 11, 15, 20, 23].includes(index),
      albumId: 'fallback-album',
      albumName: 'Church Gallery',
    })),
  sections: [],
  usingFallback: true,
}

fallbackMediaContent.sections = [
  {
    id: 'fallback-album',
    name: 'Church Gallery',
    description: 'Moments from worship services, fellowship, and church life.',
    images: fallbackMediaContent.images,
  },
]

async function requestPublic<T>(path: string) {
  const base = getAdminApiBaseUrl()

  if (!base) {
    return null
  }

  try {
    const response = await fetch(`${base.replace(/\/+$/g, '')}/${path}`)

    if (!response.ok) {
      return null
    }

    return (await response.json()) as T
  } catch {
    return null
  }
}

function mapProject(project: AdminProject): Project {
  return {
    slug: project.slug,
    name: project.name,
    status: project.status,
    category: project.category,
    image: resolveAdminAssetUrl(project.primaryImage),
    images: project.galleryImages.length
      ? project.galleryImages.map(resolveAdminAssetUrl)
      : [resolveAdminAssetUrl(project.primaryImage)],
    location: project.location,
    summary: project.summary,
    impact: project.impact,
    overview: project.overview,
    details: project.details,
    highlights: project.highlights,
    objectives: project.objectives,
    goal: project.goal,
    raised: project.raised,
    goalSuffix: project.goalSuffix,
  }
}

function mapEvent(event: AdminEvent): PublicEvent {
  return {
    id: event.id,
    name: event.name,
    subtitle: event.subtitle,
    date: event.date,
    time: event.time,
    timeAlt: event.timeAlt,
    location: event.location,
    host: event.host,
    description: event.description,
    category: event.category,
    image: resolveAdminAssetUrl(event.flyerImage),
    meetLink: event.meetLink,
    featured: event.featured,
  }
}

function mapMediaContent(settings: MediaSettings | null, albums: MediaAlbum[]): PublicMediaContent {
  const sections = albums
    .filter((album) => album.images.length > 0)
    .map((album, albumIndex) => ({
      id: album.id,
      name: album.name,
      description: album.description,
      images: album.images.map((image, imageIndex) => ({
        id: image.id,
        src: resolveAdminAssetUrl(image.url),
        alt: `${album.name} image ${imageIndex + 1}`,
        title: image.name || `${album.name} ${imageIndex + 1}`,
        featured: albumIndex === 0 && imageIndex === 0,
        tall: [0, 2, 5, 8, 11, 15, 20, 23].includes(imageIndex),
        albumId: album.id,
        albumName: album.name,
      })),
    }))

  const images = sections.flatMap((section) => section.images)

  return {
    layout: settings?.layout || 'grouped-gallery',
    sections,
    images,
    usingFallback: false,
  }
}

export async function getPublicProjectsContent() {
  const backendProjects = await requestPublic<AdminProject[]>('content/projects')

  if (backendProjects?.length) {
    return backendProjects.map(mapProject)
  }

  return staticProjects
}

export async function getPublicProjectContent(slug: string) {
  const backendProject = await requestPublic<AdminProject>(`content/projects/${slug}`)

  if (backendProject) {
    return mapProject(backendProject)
  }

  return getStaticProjectBySlug(slug) ?? null
}

export async function getPublicEventsContent() {
  const backendEvents = await requestPublic<AdminEvent[]>('content/events')

  if (backendEvents?.length) {
    return backendEvents.map(mapEvent)
  }

  return fallbackEvents
}

export async function getPublicMediaContent() {
  const [settings, albums] = await Promise.all([
    requestPublic<MediaSettings>('content/media/settings'),
    requestPublic<MediaAlbum[]>('content/media/albums'),
  ])

  if (albums?.some((album) => album.images.length > 0)) {
    return mapMediaContent(settings, albums)
  }

  return fallbackMediaContent
}
