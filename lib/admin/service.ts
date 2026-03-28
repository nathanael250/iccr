'use client'

import { defaultAdminStore } from '@/lib/admin/mock-data'
import { request } from '@/lib/admin/request'
import type {
  AdminEvent,
  AdminOverview,
  AdminProject,
  AdminStore,
  GivingRecord,
  MediaAlbum,
  MediaImage,
  MediaSettings,
  MemberRequest,
  NotificationSettings,
  PartnerRequest,
  PrayerRequest,
} from '@/lib/admin/types'

const STORAGE_KEY = 'iccr-admin-store-v1'

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T
}

function canUseStorage() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'
}

function buildInitialStore() {
  return clone(defaultAdminStore)
}

function readStore(): AdminStore {
  if (!canUseStorage()) {
    return buildInitialStore()
  }

  const raw = window.localStorage.getItem(STORAGE_KEY)

  if (!raw) {
    const initial = buildInitialStore()
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(initial))
    return initial
  }

  try {
    return JSON.parse(raw) as AdminStore
  } catch {
    const initial = buildInitialStore()
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(initial))
    return initial
  }
}

function writeStore(next: AdminStore) {
  if (!canUseStorage()) return
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
}

function updateStore(mutator: (current: AdminStore) => AdminStore) {
  const next = mutator(readStore())
  writeStore(next)
  return next
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function createId(prefix: string) {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return `${prefix}-${crypto.randomUUID()}`
  }

  return `${prefix}-${Date.now()}`
}

function valueInRwf(record: GivingRecord) {
  if (record.currency === 'USD') return record.amount * 1400
  if (record.currency === 'EUR') return record.amount * 1500
  return record.amount
}

async function tryRequest<T>(
  path: string[],
  fallback: () => T | Promise<T>,
  init?: RequestInit,
) {
  try {
    return await request<T>(path, init)
  } catch {
    return await fallback()
  }
}

export async function getOverview(): Promise<AdminOverview> {
  return tryRequest(['admin', 'overview'], () => {
    const store = readStore()

    return {
      totalGivingCount: store.giving.length,
      totalGivingValue: store.giving.reduce((sum, item) => sum + valueInRwf(item), 0),
      membershipRequestCount: store.members.length,
      partnershipRequestCount: store.partners.length,
    }
  })
}

export async function getProjects(): Promise<AdminProject[]> {
  return tryRequest(['admin', 'projects'], () => readStore().projects)
}

export async function getProjectById(projectId: string): Promise<AdminProject | undefined> {
  return tryRequest(['admin', 'projects', projectId], () =>
    readStore().projects.find((project) => project.id === projectId),
  )
}

export async function saveProject(project: AdminProject): Promise<AdminProject> {
  return tryRequest(['admin', 'projects', project.id], () => {
    const normalized: AdminProject = {
      ...project,
      slug: project.slug || slugify(project.name),
      updatedAt: new Date().toISOString(),
    }

    updateStore((current) => ({
      ...current,
      projects: current.projects.map((item) =>
        item.id === normalized.id ? normalized : item,
      ),
    }))

    return normalized
  }, {
    method: 'PUT',
    body: JSON.stringify(project),
  })
}

export async function createProject(project: Omit<AdminProject, 'id' | 'updatedAt'>) {
  return tryRequest(['admin', 'projects'], () => {
    const next: AdminProject = {
      ...project,
      id: createId('project'),
      slug: project.slug || slugify(project.name),
      updatedAt: new Date().toISOString(),
    }

    updateStore((current) => ({
      ...current,
      projects: [next, ...current.projects],
    }))

    return next
  }, {
    method: 'POST',
    body: JSON.stringify(project),
  })
}

export async function getEvents(): Promise<AdminEvent[]> {
  return tryRequest(['admin', 'events'], () => readStore().events)
}

export async function getEventById(eventId: string): Promise<AdminEvent | undefined> {
  return tryRequest(['admin', 'events', eventId], () =>
    readStore().events.find((event) => event.id === eventId),
  )
}

export async function createEvent(event: Omit<AdminEvent, 'id' | 'updatedAt'>) {
  return tryRequest(['admin', 'events'], () => {
    const next: AdminEvent = {
      ...event,
      id: createId('event'),
      updatedAt: new Date().toISOString(),
    }

    updateStore((current) => ({
      ...current,
      events: [next, ...current.events],
    }))

    return next
  }, {
    method: 'POST',
    body: JSON.stringify(event),
  })
}

export async function saveEvent(event: AdminEvent): Promise<AdminEvent> {
  return tryRequest(['admin', 'events', event.id], () => {
    const normalized: AdminEvent = {
      ...event,
      updatedAt: new Date().toISOString(),
    }

    updateStore((current) => ({
      ...current,
      events: current.events.map((item) => (item.id === normalized.id ? normalized : item)),
    }))

    return normalized
  }, {
    method: 'PUT',
    body: JSON.stringify(event),
  })
}

export async function getMediaSettings(): Promise<MediaSettings> {
  return tryRequest(['admin', 'media', 'settings'], () => readStore().mediaSettings)
}

export async function saveMediaSettings(settings: MediaSettings) {
  return tryRequest(['admin', 'media', 'settings'], () => {
    updateStore((current) => ({
      ...current,
      mediaSettings: settings,
    }))

    return settings
  }, {
    method: 'PUT',
    body: JSON.stringify(settings),
  })
}

export async function getMediaAlbums(): Promise<MediaAlbum[]> {
  return tryRequest(['admin', 'media', 'albums'], () => readStore().mediaAlbums)
}

export async function createMediaAlbum(payload: Omit<MediaAlbum, 'id' | 'createdAt' | 'images'>) {
  return tryRequest(['admin', 'media', 'albums'], () => {
    const next: MediaAlbum = {
      ...payload,
      id: createId('album'),
      createdAt: new Date().toISOString(),
      images: [],
    }

    updateStore((current) => ({
      ...current,
      mediaAlbums: [next, ...current.mediaAlbums],
    }))

    return next
  }, {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export async function addImagesToAlbum(albumId: string, images: MediaImage[]) {
  return tryRequest(['admin', 'media', 'albums', albumId, 'images'], () => {
    updateStore((current) => ({
      ...current,
      mediaAlbums: current.mediaAlbums.map((album) =>
        album.id === albumId
          ? { ...album, images: [...images, ...album.images] }
          : album,
      ),
    }))

    return true
  }, {
    method: 'POST',
    body: JSON.stringify(images),
  })
}

export async function getMembers(): Promise<MemberRequest[]> {
  return tryRequest(['admin', 'members'], () => readStore().members)
}

export async function getMemberById(memberId: string) {
  return tryRequest(['admin', 'members', memberId], () =>
    readStore().members.find((member) => member.id === memberId),
  )
}

export async function getPartners(): Promise<PartnerRequest[]> {
  return tryRequest(['admin', 'partners'], () => readStore().partners)
}

export async function getPartnerById(partnerId: string) {
  return tryRequest(['admin', 'partners', partnerId], () =>
    readStore().partners.find((partner) => partner.id === partnerId),
  )
}

export async function getPrayerRequests(): Promise<PrayerRequest[]> {
  return tryRequest(['admin', 'prayer-requests'], () => readStore().prayerRequests)
}

export async function getNotificationSettings() {
  return tryRequest(['admin', 'settings', 'notifications'], () => readStore().notificationSettings)
}

export async function saveNotificationSettings(settings: NotificationSettings) {
  return tryRequest(['admin', 'settings', 'notifications'], () => {
    updateStore((current) => ({
      ...current,
      notificationSettings: settings,
    }))

    return settings
  }, {
    method: 'PUT',
    body: JSON.stringify(settings),
  })
}

export function buildEmptyProject(): Omit<AdminProject, 'id' | 'updatedAt'> {
  return {
    name: 'New Project',
    slug: 'new-project',
    status: 'Draft',
    category: 'Infrastructure',
    primaryImage: '/placeholder.jpg',
    galleryImages: ['/placeholder.jpg'],
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
    flyerImage: '/placeholder.jpg',
    featured: true,
  }
}
