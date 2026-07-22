import { httpClient } from './http-client'

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

export const referencesApiClient = {
  getOrganizations: () => httpClient.get<Organization[]>('/organizations'),

  getRoles: () => httpClient.get<Role[]>('/roles'),

  getRegions: () => httpClient.get<Region[]>('/regions'),

  getDistricts: (regionId?: string) =>
    httpClient.get<District[]>(`/districts${regionId ? `?region_id=${regionId}` : ''}`),

  getPositions: (orgId?: string) =>
    httpClient.get<Position[]>(`/positions${orgId ? `?org_id=${orgId}` : ''}`),
}
