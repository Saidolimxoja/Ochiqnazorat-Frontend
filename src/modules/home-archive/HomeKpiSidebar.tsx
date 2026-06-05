import type { ContractKpiIcon, ContractKpiTone } from './home-dashboard.types'
import { CONTRACT_KPIS } from './home-dashboard.mock'
import styles from './HomeDashboard.module.css'

const TONE_CLASS: Record<ContractKpiTone, string> = {
  blue: styles.bgBlue,
  orange: styles.bgOrange,
  red: styles.bgRed,
  redDeep: styles.bgRedDeep,
}

function KpiIcon({ icon }: { icon: ContractKpiIcon }) {
  const props = {
    width: 20,
    height: 20,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2.5,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  }

  switch (icon) {
    case 'document':
      return (
        <svg {...props}>
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      )
    case 'users':
      return (
        <svg {...props}>
          <path d="M17 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M9 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          <path d="M21 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <circle cx="9" cy="7" r="4" />
        </svg>
      )
    case 'bell':
      return (
        <svg {...props}>
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
      )
    case 'orgOff':
      return (
        <svg {...props}>
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <line x1="9" y1="9" x2="15" y2="15" />
          <line x1="15" y1="9" x2="9" y2="15" />
        </svg>
      )
  }
}

export function HomeKpiSidebar() {
  return (
    <div className={styles.sidebarKpis}>
      <div className={styles.sidebarTitle}>Шартномалар</div>
      <div className={styles.sidebarSubtitle}>Республика</div>
      <div className={styles.kpiStack}>
        {CONTRACT_KPIS.map((kpi) => (
          <div key={kpi.id} className={styles.kpiCard}>
            <div className={`${styles.kpiIconWrap} ${TONE_CLASS[kpi.tone]}`}>
              <KpiIcon icon={kpi.icon} />
            </div>
            <div className={styles.kpiData}>
              <div className={styles.kpiValue}>{kpi.value}</div>
              <div className={styles.kpiLabel}>{kpi.label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
