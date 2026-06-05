const API_URL = process.env.NEXT_PUBLIC_API_URL'

const shouldAddPrefix = API_URL ? !API_URL.includes('/api/v1') : true

export interface CreateUserRequest {
  email: string
  first_name: string
  last_name: string
  phone?: string
  password: string
}

export interface UserResponse {
  id: string
  full_name: string
  username: string
  phone_number?: string
  is_blocked: boolean
  created_at: string
  org_name?: string
  roles?: Array<{ name_of_role: string }>
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
    this.baseUrl = API_URL
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
      throw new Error(error.message || `HTTP ${response.status}`)
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

  async deleteUser(id: string): Promise<void> {
    await this.request<void>(`/users/${id}`, {
      method: 'DELETE',
      body: JSON.stringify({ reason: 'Admin deletion' }),
    })
  }

  async blockUser(id: string): Promise<UserResponse> {
    return this.request<UserResponse>(`/users/${id}/block`, {
      method: 'POST',
      body: JSON.stringify({ reason: 'Admin action' }),
    })
  }

  async unblockUser(id: string): Promise<UserResponse> {
    return this.request<UserResponse>(`/users/${id}/unblock`, {
      method: 'POST',
    })
  }
}

export const usersApiClient = new UsersApiClient()

