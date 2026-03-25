import { useLocation } from 'react-router-dom'

export function usePathname() {
  return useLocation().pathname
}

export function notFound(): never {
  throw new Error('Route not found')
}
