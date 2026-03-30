type RequestPath = string | string[]

const ADMIN_TOKEN_KEY = 'iccr-admin-token'
const ADMIN_USER_KEY = 'iccr-admin-user'

function canUseStorage() {
  return typeof window !== 'undefined'
}

export function getAdminApiBaseUrl() {
  return import.meta.env.VITE_ADMIN_API_BASE?.replace(/\/+$/g, '') || ''
}

export function getStoredAdminToken() {
  if (!canUseStorage()) return ''

  return (
    window.localStorage.getItem(ADMIN_TOKEN_KEY) ||
    window.sessionStorage.getItem(ADMIN_TOKEN_KEY) ||
    ''
  )
}

export function getStoredAdminUser<T>() {
  if (!canUseStorage()) return null

  const rawValue =
    window.localStorage.getItem(ADMIN_USER_KEY) ||
    window.sessionStorage.getItem(ADMIN_USER_KEY)

  if (!rawValue) {
    return null
  }

  try {
    return JSON.parse(rawValue) as T
  } catch {
    clearAdminSession()
    return null
  }
}

export function storeAdminSession(
  token: string,
  user: unknown,
  persist = true,
) {
  if (!canUseStorage()) return

  const primary = persist ? window.localStorage : window.sessionStorage
  const secondary = persist ? window.sessionStorage : window.localStorage

  primary.setItem(ADMIN_TOKEN_KEY, token)
  primary.setItem(ADMIN_USER_KEY, JSON.stringify(user))
  secondary.removeItem(ADMIN_TOKEN_KEY)
  secondary.removeItem(ADMIN_USER_KEY)
}

export function clearAdminSession() {
  if (!canUseStorage()) return

  window.localStorage.removeItem(ADMIN_TOKEN_KEY)
  window.localStorage.removeItem(ADMIN_USER_KEY)
  window.sessionStorage.removeItem(ADMIN_TOKEN_KEY)
  window.sessionStorage.removeItem(ADMIN_USER_KEY)
}

function normalizePath(path: RequestPath) {
  if (Array.isArray(path)) {
    return path.filter(Boolean).join('/')
  }

  return path.replace(/^\/+|\/+$/g, '')
}

export function resolveAdminAssetUrl(value: string) {
  if (!value || /^https?:\/\//i.test(value) || value.startsWith('data:')) {
    return value
  }

  if (!value.startsWith('/')) {
    return value
  }

  const base = getAdminApiBaseUrl()

  if (!base) {
    return value
  }

  return `${new URL(base).origin}${value}`
}

export async function request<T>(
  path: RequestPath,
  init?: RequestInit,
): Promise<T> {
  const base = getAdminApiBaseUrl()

  if (!base) {
    throw new Error('VITE_ADMIN_API_BASE is not configured')
  }

  const isFormData = typeof FormData !== 'undefined' && init?.body instanceof FormData
  const headers = new Headers(init?.headers ?? {})
  const token = getStoredAdminToken()

  if (token && !headers.has('Authorization')) {
    headers.set('Authorization', `Bearer ${token}`)
  }

  if (!isFormData && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json')
  }

  const response = await fetch(`${base}/${normalizePath(path)}`, {
    headers,
    ...init,
  })

  if (!response.ok) {
    if (response.status === 401) {
      clearAdminSession()
    }

    let message = `Request failed with status ${response.status}`

    try {
      const payload = (await response.json()) as { message?: string }
      if (payload?.message) {
        message = payload.message
      }
    } catch {}

    throw new Error(message)
  }

  if (response.status === 204) {
    return undefined as T
  }

  return (await response.json()) as T
}
