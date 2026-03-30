'use client'

import {
  clearAdminSession,
  request,
  resolveAdminAssetUrl,
  storeAdminSession,
} from '@/lib/admin/request'
import type {
  AdminAuthSession,
  AdminEvent,
  AdminOverview,
  AdminProject,
  GivingRecord,
  MediaAlbum,
  MediaImage,
  MediaSettings,
  MemberRequest,
  NotificationSettings,
  PartnerRequest,
  PrayerRequest,
} from '@/lib/admin/types'

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function normalizeProject(project: AdminProject): AdminProject {
  return {
    ...project,
    primaryImage: resolveAdminAssetUrl(project.primaryImage),
    galleryImages: project.galleryImages.map(resolveAdminAssetUrl),
  }
}

function normalizeEvent(event: AdminEvent): AdminEvent {
  return {
    ...event,
    flyerImage: resolveAdminAssetUrl(event.flyerImage),
  }
}

function normalizeAlbum(album: MediaAlbum): MediaAlbum {
  return {
    ...album,
    coverImage: resolveAdminAssetUrl(album.coverImage),
    images: album.images.map((image) => ({
      ...image,
      url: resolveAdminAssetUrl(image.url),
    })),
  }
}

export async function getOverview(): Promise<AdminOverview> {
  return request<AdminOverview>(['admin', 'overview'])
}

export async function getProjects(): Promise<AdminProject[]> {
  const projects = await request<AdminProject[]>(['admin', 'projects'])
  return projects.map(normalizeProject)
}

export async function getProjectCategories(): Promise<string[]> {
  return request<string[]>(['admin', 'projects', 'categories'])
}

export async function getProjectById(projectId: string): Promise<AdminProject | undefined> {
  return normalizeProject(await request<AdminProject>(['admin', 'projects', projectId]))
}

export async function saveProject(project: AdminProject): Promise<AdminProject> {
  return normalizeProject(
    await request<AdminProject>(['admin', 'projects', project.id], {
      method: 'PUT',
      body: JSON.stringify({
        ...project,
        slug: project.slug || slugify(project.name),
      }),
    }),
  )
}

export async function createProject(project: Omit<AdminProject, 'id' | 'updatedAt'>) {
  return normalizeProject(
    await request<AdminProject>(['admin', 'projects'], {
      method: 'POST',
      body: JSON.stringify({
        ...project,
        slug: project.slug || slugify(project.name),
      }),
    }),
  )
}

export async function deleteProject(projectId: string) {
  await request<{ success: boolean }>(['admin', 'projects', projectId], {
    method: 'DELETE',
  })
}

export async function getEvents(): Promise<AdminEvent[]> {
  const events = await request<AdminEvent[]>(['admin', 'events'])
  return events.map(normalizeEvent)
}

export async function getEventById(eventId: string): Promise<AdminEvent | undefined> {
  return normalizeEvent(await request<AdminEvent>(['admin', 'events', eventId]))
}

export async function createEvent(event: Omit<AdminEvent, 'id' | 'updatedAt'>) {
  return normalizeEvent(
    await request<AdminEvent>(['admin', 'events'], {
      method: 'POST',
      body: JSON.stringify(event),
    }),
  )
}

export async function loginAdmin(credentials: {
  email: string
  password: string
  remember: boolean
}) {
  const session = await request<AdminAuthSession>(['auth', 'login'], {
    method: 'POST',
    body: JSON.stringify({
      email: credentials.email,
      password: credentials.password,
    }),
  })

  storeAdminSession(session.token, session.user, credentials.remember)
  return session
}

export function logoutAdmin() {
  clearAdminSession()
}

export async function saveEvent(event: AdminEvent): Promise<AdminEvent> {
  return normalizeEvent(
    await request<AdminEvent>(['admin', 'events', event.id], {
      method: 'PUT',
      body: JSON.stringify(event),
    }),
  )
}

export async function deleteEvent(eventId: string) {
  await request<{ success: boolean }>(['admin', 'events', eventId], {
    method: 'DELETE',
  })
}

export async function getMediaSettings(): Promise<MediaSettings> {
  return request<MediaSettings>(['admin', 'media', 'settings'])
}

export async function saveMediaSettings(settings: MediaSettings) {
  return request<MediaSettings>(['admin', 'media', 'settings'], {
    method: 'PUT',
    body: JSON.stringify(settings),
  })
}

export async function getMediaAlbums(): Promise<MediaAlbum[]> {
  const albums = await request<MediaAlbum[]>(['admin', 'media', 'albums'])
  return albums.map(normalizeAlbum)
}

export async function createMediaAlbum(payload: Omit<MediaAlbum, 'id' | 'createdAt' | 'images'>) {
  return normalizeAlbum(
    await request<MediaAlbum>(['admin', 'media', 'albums'], {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  )
}

export async function deleteMediaAlbum(albumId: string) {
  await request<{ success: boolean }>(['admin', 'media', 'albums', albumId], {
    method: 'DELETE',
  })
}

export async function uploadImages(files: File[], folder: string) {
  const formData = new FormData()

  formData.append('folder', folder)
  files.forEach((file) => {
    formData.append('images', file)
  })

  const images = await request<MediaImage[]>(['admin', 'uploads'], {
    method: 'POST',
    body: formData,
  })

  return images.map((image) => ({
    ...image,
    url: resolveAdminAssetUrl(image.url),
  }))
}

export async function addImagesToAlbum(albumId: string, files: File[]) {
  const formData = new FormData()

  formData.append('folder', 'media')
  files.forEach((file) => {
    formData.append('images', file)
  })

  return normalizeAlbum(
    await request<MediaAlbum>(['admin', 'media', 'albums', albumId, 'images'], {
      method: 'POST',
      body: formData,
    }),
  )
}

export async function deleteMediaImage(albumId: string, imageId: string) {
  return normalizeAlbum(
    await request<MediaAlbum>(['admin', 'media', 'albums', albumId, 'images', imageId], {
      method: 'DELETE',
    }),
  )
}

export async function getMembers(): Promise<MemberRequest[]> {
  return request<MemberRequest[]>(['admin', 'members'])
}

export async function getMemberById(memberId: string) {
  return request<MemberRequest>(['admin', 'members', memberId])
}

export async function getPartners(): Promise<PartnerRequest[]> {
  return request<PartnerRequest[]>(['admin', 'partners'])
}

export async function getPartnerById(partnerId: string) {
  return request<PartnerRequest>(['admin', 'partners', partnerId])
}

export async function getPrayerRequests(): Promise<PrayerRequest[]> {
  return request<PrayerRequest[]>(['admin', 'prayer-requests'])
}

export async function getGivingRecords(): Promise<GivingRecord[]> {
  return request<GivingRecord[]>(['admin', 'giving'])
}

export async function getNotificationSettings() {
  return request<NotificationSettings>(['admin', 'settings', 'notifications'])
}

export async function saveNotificationSettings(settings: NotificationSettings) {
  return request<NotificationSettings>(['admin', 'settings', 'notifications'], {
    method: 'PUT',
    body: JSON.stringify(settings),
  })
}

export function buildEmptyProject(): Omit<AdminProject, 'id' | 'updatedAt'> {
  return {
    name: 'New Project',
    slug: 'new-project',
    status: 'Draft',
    category: '',
    primaryImage: '',
    galleryImages: [],
    location: 'Kigali, Rwanda',
    summary: 'Write a short summary for the project.',
    impact: 'Describe the impact this project will create.',
    overview: 'Write the overview that introduces the project.',
    details: 'Add the deeper detail and implementation description here.',
    highlights: ['Highlight one', 'Highlight two'],
    objectives: ['Objective one', 'Objective two'],
    goal: 0,
    raised: 0,
    goalSuffix: '',
  }
}

export function buildEmptyEvent(): Omit<AdminEvent, 'id' | 'updatedAt'> {
  return {
    name: 'New Event',
    subtitle: 'Part One',
    category: 'Upcoming Event',
    host: 'Church Admin',
    date: 'Sunday 01 January 2027',
    time: '10:00 AM',
    timeAlt: '10:00',
    location: 'Main Sanctuary',
    description: 'Write the event theme and short description here.',
    meetLink: 'https://meet.google.com',
    flyerImage: '',
    featured: true,
  }
}
