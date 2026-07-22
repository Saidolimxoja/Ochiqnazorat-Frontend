import { httpClient } from './http-client'

export interface LoginRequest {
  username: string
  password: string
}

export interface UserRole {
  id: string
  name: string
}

export interface SessionUser {
  id: string
  username: string
  full_name: string
  org_id: string | null
  position_id: string | null
  level: string
  region_id: string | null
  district_id: string | null
  roles: UserRole[]
}

export interface LoginResponse {
  user: SessionUser
  access_token: string
}

export interface UserProfile {
  id: string
  username: string
  full_name: string
  pinfl: string
  birthday_date: string
  phone_number: string
  responsible_module: string
  temporary_modules: string[] | null
  level: string
  org_id: string | null
  org_name: string | null
  position_id: string | null
  position_name: string | null
  region_id: string | null
  region_name: string | null
  district_id: string | null
  district_name: string | null
  roles: Array<{ id: string; name_of_role: string; permissions?: unknown }>
  created_at: string
  updated_at: string | null
  is_blocked: boolean
  is_deleted: boolean
}

export const apiClient = {
  login: (credentials: LoginRequest) => httpClient.post<LoginResponse>('/auth/login', credentials),
  getProfile: () => httpClient.get<UserProfile>('/auth/profile'),
}
