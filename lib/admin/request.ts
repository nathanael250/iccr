type RequestPath = string | string[]

function normalizePath(path: RequestPath) {
  if (Array.isArray(path)) {
    return path.filter(Boolean).join('/')
  }

  return path.replace(/^\/+|\/+$/g, '')
}

export async function request<T>(
  path: RequestPath,
  init?: RequestInit,
): Promise<T> {
  const base = import.meta.env.VITE_ADMIN_API_BASE?.replace(/\/+$/g, '')

  if (!base) {
    throw new Error('VITE_ADMIN_API_BASE is not configured')
  }

  const response = await fetch(`${base}/${normalizePath(path)}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
    ...init,
  })

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  if (response.status === 204) {
    return undefined as T
  }

  return (await response.json()) as T
}
