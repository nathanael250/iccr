export type AdminProject = {
  id: string
  name: string
  slug: string
  status: string
  category: string
  primaryImage: string
  galleryImages: string[]
  location: string
  summary: string
  impact: string
  overview: string
  details: string
  highlights: string[]
  objectives: string[]
  goal?: number
  raised?: number
  goalSuffix?: string
  updatedAt: string
}

export type AdminEvent = {
  id: string
  name: string
  subtitle: string
  category: string
  host: string
  date: string
  time: string
  timeAlt: string
  location: string
  description: string
  meetLink: string
  flyerImage: string
  featured: boolean
  updatedAt: string
}

export type MediaLayout = 'grouped-gallery' | 'sections' | 'continuous'

export type MediaImage = {
  id: string
  name: string
  url: string
  sizeKb: number
  uploadedAt: string
}

export type MediaAlbum = {
  id: string
  name: string
  description: string
  coverImage: string
  createdAt: string
  images: MediaImage[]
}

export type MediaSettings = {
  layout: MediaLayout
  imageLimitMb: number
}

export type MemberRequest = {
  id: string
  firstName: string
  lastName: string
  gender: string
  maritalStatus: string
  phone: string
  email: string
  occupation: string
  nationality: string
  countryOfResidence: string
  region: string
  notes: string
  photoUrl: string
  createdAt: string
  status: string
}

export type PartnerRequest = {
  id: string
  organizationName: string
  contactPerson: string
  phone: string
  email: string
  country: string
  city: string
  partnershipType: string
  website: string
  vision: string
  proposal: string
  logoUrl: string
  createdAt: string
  status: string
}

export type PrayerRequest = {
  id: string
  fullName: string
  email: string
  phone: string
  message: string
  createdAt: string
  status: string
}

export type GivingRecord = {
  id: string
  fullName: string
  email: string
  phone: string
  purpose: string
  paymentCategory: 'mobile-money' | 'credit-card'
  amount: number
  currency: string
  createdAt: string
  status: string
}

export type NotificationChannelSettings = {
  inApp: boolean
  email: boolean
  sms: boolean
}

export type NotificationTriggerSettings = {
  membership: boolean
  partnership: boolean
  prayerRequest: boolean
  giving: boolean
  projectUpdate: boolean
  eventUpdate: boolean
  mediaUpload: boolean
}

export type NotificationSettings = {
  channels: NotificationChannelSettings
  triggers: NotificationTriggerSettings
}

export type AdminAuthUser = {
  id: string
  email: string
  name: string
  role: 'admin' | 'owner'
}

export type AdminAuthSession = {
  token: string
  user: AdminAuthUser
}

export type AdminOverview = {
  totalGivingCount: number
  totalGivingValue: number
  membershipRequestCount: number
  partnershipRequestCount: number
}

export type AdminStore = {
  projects: AdminProject[]
  events: AdminEvent[]
  mediaSettings: MediaSettings
  mediaAlbums: MediaAlbum[]
  members: MemberRequest[]
  partners: PartnerRequest[]
  prayerRequests: PrayerRequest[]
  giving: GivingRecord[]
  notificationSettings: NotificationSettings
}
