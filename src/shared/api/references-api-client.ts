const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://consoles-disposal-edward-chairs.trycloudflare.com/api/v1'

const shouldAddPrefix = API_URL ? !API_URL.includes('/api/v1') : true

export interface Organization {
  id: string
  name: string
  org_tin?: string | null
  is_active: boolean
}

export interface Role {
  id: string
  name_of_role: string
  description?: string | null
}

export interface Region {
  id: string
  name_of_region: string
  code_of_region?: string | null
}

export interface District {
  id: string
  name_of_district: string
  region_id: string
  region_name?: string
}

export interface Position {
  id: string
  name_ru: string
  name_uz?: string | null
  org_id: string
}

class ReferencesApiClient {
  private baseUrl: string

  constructor() {
    this.baseUrl = API_URL || ''
  }

  private getAuthToken(): string | null {
    if (typeof window === 'undefined') return null
    return localStorage.getItem('access_token')
  }

  private async request<T>(endpoint: string): Promise<T> {
    const token = this.getAuthToken()
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    }

    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    const url = shouldAddPrefix ? `${this.baseUrl}/api/v1${endpoint}` : `${this.baseUrl}${endpoint}`

    const response = await fetch(url, { headers })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Network error' }))
      const message = Array.isArray(error.message) ? error.message.join(', ') : error.message
      throw new Error(message || `HTTP ${response.status}`)
    }

    return response.json()
  }

  getOrganizations(): Promise<Organization[]> {
    return this.request<Organization[]>('/organizations')
  }

  getRoles(): Promise<Role[]> {
    return this.request<Role[]>('/roles')
  }

  getRegions(): Promise<Region[]> {
    return this.request<Region[]>('/regions')
  }

  getDistricts(regionId?: string): Promise<District[]> {
    const query = regionId ? `?region_id=${regionId}` : ''
    return this.request<District[]>(`/districts${query}`)
  }

  getPositions(orgId?: string): Promise<Position[]> {
    const query = orgId ? `?org_id=${orgId}` : ''
    return this.request<Position[]>(`/positions${query}`)
  }
}

export const referencesApiClient = new ReferencesApiClient()
