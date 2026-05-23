'use client'

import { AdvanceStatusCard } from './AdvanceStatusCard'
import { resolveDashboardMode } from './dashboard-mode'
import { EdoUsageStatusCard } from './EdoUsageStatusCard'
import { HomeDashboardHeader } from './HomeDashboardHeader'
import layout from './styles/HomeDashboard.layout.module.css'
import './styles/home-dashboard-modes.css'
import { InvoiceStatusCard } from './InvoiceStatusCard'
import { RevenueStatusCard } from './RevenueStatusCard'

const DASHBOARD_CARD_COUNT = 4

export function HomeDashboard() {
  const dashboardMode = resolveDashboardMode(DASHBOARD_CARD_COUNT)
  const singleCardFocus = dashboardMode === 'single'

  const gridClass = [
    layout.dashboardGrid,
    dashboardMode === 'single' ? layout.dashboardGridSingle : '',
    dashboardMode === 'dual' ? layout.dashboardGridDual : '',
    dashboardMode === 'triple' ? layout.dashboardGridTriple : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div
      className={`${layout.container}${singleCardFocus ? ` ${layout.containerSingle}` : ''}`}
      data-dashboard-mode={dashboardMode}
    >
      <HomeDashboardHeader />
      <div className={gridClass}>
        <RevenueStatusCard />
        <AdvanceStatusCard />
        <InvoiceStatusCard />
        <EdoUsageStatusCard />
      </div>
    </div>
  )
}
