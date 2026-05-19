import { closeSession, hasSession, openSession } from './session'

export function isAuthenticated(): boolean {
  return hasSession()
}

export function signIn(): void {
  openSession()
}

export function signOut(): void {
  closeSession()
}
