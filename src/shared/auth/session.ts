const STORAGE_KEY = 'on-auth'

const LEGACY_KEY = 'isAuthenticated'

export function hasSession(): boolean {
  if (typeof window === 'undefined') return false
  if (localStorage.getItem(STORAGE_KEY) === '1') return true
  if (localStorage.getItem(LEGACY_KEY) === 'true') {
    openSession()
    localStorage.removeItem(LEGACY_KEY)
    return true
  }
  return false
}

export function openSession(): void {
  localStorage.setItem(STORAGE_KEY, '1')
}

export function closeSession(): void {
  localStorage.removeItem(STORAGE_KEY)
}
