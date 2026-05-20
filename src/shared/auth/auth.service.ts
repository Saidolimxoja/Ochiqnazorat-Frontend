import { closeSession, hasSession, openSession } from './session'
import { apiClient, LoginRequest } from '../api/api-client'

export function isAuthenticated(): boolean {
  return hasSession()
}

export async function signIn(credentials: LoginRequest): Promise<void> {
  try {
    const response = await apiClient.login({
      username: credentials.username.trim(),
      password: credentials.password.trim(),
    })
    openSession(response.access_token, response.user)
  } catch (error) {
    throw error
  }
}

export function signOut(): void {
  closeSession()
}
