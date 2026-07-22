import { httpClient } from './http-client'

export interface CreateUserRequest {
  full_name: string
  pinfl: string
  birthday_date: string
  phone_number: string
  username: string
  password: string
  responsible_module: string
  level: string
  org_id: string
  role_ids: string[]
  position_id?: string
  region_id?: string
  district_id?: string
  temporary_modules?: string[]
}

export interface UserResponse {
  id: string
  full_name: string
  username: string
  phone_number?: string
  level?: string
  is_blocked: boolean
  created_at: string
  org_name?: string
  region_name?: string
  district_name?: string
  roles?: Array<{ id?: string; name_of_role: string }>
}

export interface UsersListResponse {
  data: UserResponse[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export const usersApiClient = {
  getUsers: (page = 1, limit = 10) =>
    httpClient.get<UsersListResponse>(`/users?page=${page}&limit=${limit}`),

  createUser: (data: CreateUserRequest) => httpClient.post<UserResponse>('/users', data),

  deleteUser: (id: string, reason = 'Удалено администратором') =>
    httpClient.delete<void>(`/users/${id}`, { delete_reason: reason }),

  blockUser: (id: string, reason = 'Заблокировано администратором') =>
    httpClient.post<UserResponse>(`/users/${id}/block`, { block_reason: reason }),

  unblockUser: (id: string) => httpClient.post<UserResponse>(`/users/${id}/unblock`),
}
