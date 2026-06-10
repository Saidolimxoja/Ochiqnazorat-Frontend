const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://consoles-disposal-edward-chairs.trycloudflare.com/api/v1'

const shouldAddPrefix = API_URL ? !API_URL.includes('/api/v1') : true

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

class UsersApiClient {
  private baseUrl: string

  constructor() {
    this.baseUrl = API_URL || ''
  }

  private getAuthToken(): string | null {
    if (typeof window === 'undefined') return null
    return localStorage.getItem('access_token')
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const token = this.getAuthToken()
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    }

    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    const url = shouldAddPrefix ? `${this.baseUrl}/api/v1${endpoint}` : `${this.baseUrl}${endpoint}`

    const response = await fetch(url, {
      ...options,
      headers,
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Network error' }))
      const message = Array.isArray(error.message) ? error.message.join(', ') : error.message
      throw new Error(message || `HTTP ${response.status}`)
    }

    if (response.status === 204) {
      return undefined as T
    }

    return response.json()
  }

  async getUsers(page = 1, limit = 10): Promise<UsersListResponse> {
    return this.request<UsersListResponse>(`/users?page=${page}&limit=${limit}`)
  }

  async createUser(data: CreateUserRequest): Promise<UserResponse> {
    return this.request<UserResponse>('/users', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async deleteUser(id: string, reason = 'Удалено администратором'): Promise<void> {
    await this.request<void>(`/users/${id}`, {
      method: 'DELETE',
      body: JSON.stringify({ delete_reason: reason }),
    })
  }

  async blockUser(id: string, reason = 'Заблокировано администратором'): Promise<UserResponse> {
    return this.request<UserResponse>(`/users/${id}/block`, {
      method: 'POST',
      body: JSON.stringify({ block_reason: reason }),
    })
  }

  async unblockUser(id: string): Promise<UserResponse> {
    return this.request<UserResponse>(`/users/${id}/unblock`, {
      method: 'POST',
    })
  }
}

export const usersApiClient = new UsersApiClient()
