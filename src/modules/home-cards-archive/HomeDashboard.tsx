'use client'

import { AdvanceStatusCard } from './AdvanceStatusCard'
import { EdoUsageStatusCard } from './EdoUsageStatusCard'
import layout from './styles/HomeDashboard.layout.module.css'
import { InvoiceStatusCard } from './InvoiceStatusCard'
import { RevenueStatusCard } from './RevenueStatusCard'

export function HomeDashboard() {
  return (
    <div className={layout.container}>
      <div className={layout.dashboardGrid}>
        <RevenueStatusCard />
        <AdvanceStatusCard />
        <InvoiceStatusCard />
        <EdoUsageStatusCard />
      </div>
    </div>
  )
}
