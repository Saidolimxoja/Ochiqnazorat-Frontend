export type DashboardMode = 'single' | 'dual' | 'triple' | 'grid'

export const DASHBOARD_CARDS = {
  revenue: 'revenue',
  advance: 'advance',
  invoice: 'invoice',
  edo: 'edo',
} as const

export type DashboardCardId = (typeof DASHBOARD_CARDS)[keyof typeof DASHBOARD_CARDS]

export function resolveDashboardMode(visibleCount: number): DashboardMode {
  if (visibleCount === 1) return 'single'
  if (visibleCount === 2) return 'dual'
  if (visibleCount === 3) return 'triple'
  return 'grid'
}
