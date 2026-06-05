'use client'

import { ChevronDown, MapPin, RefreshCw } from 'lucide-react'
import layout from './styles/HomeDashboard.layout.module.css'

export function HomeDashboardHeader() {
  return (
    <div className={layout.toolbarStack}>
      <header className={layout.pageToolbar}>
        <h1 className={layout.pageTitle}>Бош саҳифа</h1>
        <div className={layout.headerActions}>
          <button type="button" className={layout.locationBtn}>
            <MapPin size={16} className={layout.locationIcon} aria-hidden />
            Ҳудудни танланг
            <ChevronDown size={16} className={layout.chevronIcon} aria-hidden />
          </button>
          <button type="button" className={layout.refreshBtn}>
            <RefreshCw size={16} className={layout.refreshIcon} aria-hidden />
            Янгилаш
          </button>
        </div>
      </header>
    </div>
  )
}
