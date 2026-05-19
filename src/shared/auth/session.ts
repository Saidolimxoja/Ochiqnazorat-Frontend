const STORAGE_KEY = 'on-auth'
const TOKEN_KEY = 'access_token'
const USER_KEY = 'user_data'

const LEGACY_KEY = 'isAuthenticated'

export function hasSession(): boolean {
  if (typeof window === 'undefined') return false
  if (localStorage.getItem(STORAGE_KEY) === '1' && localStorage.getItem(TOKEN_KEY)) {
    return true
  }
  if (localStorage.getItem(LEGACY_KEY) === 'true') {
    openSession()
    localStorage.removeItem(LEGACY_KEY)
    return true
  }
  return false
}

export function openSession(token?: string, userData?: any): void {
  localStorage.setItem(STORAGE_KEY, '1')
  if (token) {
    localStorage.setItem(TOKEN_KEY, token)
  }
  if (userData) {
    localStorage.setItem(USER_KEY, JSON.stringify(userData))
  }
}

export function closeSession(): void {
  localStorage.removeItem(STORAGE_KEY)
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
}

export function getToken(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(TOKEN_KEY)
}

export function getUserData(): any | null {
  if (typeof window === 'undefined') return null
  const data = localStorage.getItem(USER_KEY)
  return data ? JSON.parse(data) : null
}
