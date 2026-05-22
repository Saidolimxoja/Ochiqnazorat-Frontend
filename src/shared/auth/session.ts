const STORAGE_KEY = 'on-auth'
const TOKEN_KEY = 'access_token'
const USER_KEY = 'user_data'

const LEGACY_KEY = 'isAuthenticated'

function isTokenValid(token: string): boolean {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) return false

    const payload = JSON.parse(atob(parts[1]))
    const exp = payload.exp

    if (!exp) return true
    return exp * 1000 > Date.now()
  } catch {
    return false
  }
}

export function hasSession(): boolean {
  if (typeof window === 'undefined') return false

  const token = localStorage.getItem(TOKEN_KEY)
  if (token && isTokenValid(token)) {
    return true
  }

  if (localStorage.getItem(LEGACY_KEY) === 'true') {
    openSession()
    localStorage.removeItem(LEGACY_KEY)
    return true
  }

  if (token && !isTokenValid(token)) {
    closeSession()
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
  const token = localStorage.getItem(TOKEN_KEY)
  if (token && isTokenValid(token)) {
    return token
  }
  if (token) {
    closeSession()
  }
  return null
}

export function getUserData(): any | null {
  if (typeof window === 'undefined') return null
  const data = localStorage.getItem(USER_KEY)
  return data ? JSON.parse(data) : null
}

