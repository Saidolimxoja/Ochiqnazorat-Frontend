'use client'

import { useMemo, useState } from 'react'
import { REGIONS_LIST, TABLE_ROWS } from './home-dashboard.mock'
import type { HomeFilterTab } from './home-dashboard.types'
import { computeRepublicTotals } from './home-dashboard.utils'
import { HomeDashboardToolbar } from './HomeDashboardToolbar'
import { HomeKpiSidebar } from './HomeKpiSidebar'
import { HomeMapSection } from './HomeMapSection'
import { HomeRegionsList } from './HomeRegionsList'
import { HomeReportTable } from './HomeReportTable'
import styles from './HomeDashboard.module.css'

export function HomeDashboard() {
  const [activeTab, setActiveTab] = useState<HomeFilterTab>('devonxona')
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null)

  const totals = useMemo(() => computeRepublicTotals(REGIONS_LIST), [])

  return (
    <div className={styles.container}>
      <HomeDashboardToolbar activeTab={activeTab} onTabChange={setActiveTab} />
      <div className={styles.dashboardGrid}>
        <HomeMapSection
          totals={totals}
          hoveredRegion={hoveredRegion}
          onHoverRegion={setHoveredRegion}
        />
        <HomeRegionsList
          regions={REGIONS_LIST}
          hoveredRegion={hoveredRegion}
          onHoverRegion={setHoveredRegion}
        />
        <HomeKpiSidebar />
      </div>
      <HomeReportTable rows={TABLE_ROWS} />
    </div>
  )
}
