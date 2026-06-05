import type { RegionMetric, RepublicTotals } from './home-dashboard.types'
import { formatIntUz } from '@/shared/lib/format'

export function computeRepublicTotals(regions: RegionMetric[]): RepublicTotals {
  const orgs = regions.reduce((sum, r) => sum + r.tashkilotlar, 0)
  const users = regions.reduce((sum, r) => sum + r.foydalanuvchilar, 0)
  const avgUsagePct = Math.round(
    regions.reduce((sum, r) => sum + r.percentage, 0) / Math.max(regions.length, 1),
  )
  return { orgs, users, avgUsagePct }
}

export function formatCount(value: number): string {
  return formatIntUz(value)
}
