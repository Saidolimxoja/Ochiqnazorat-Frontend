import { IconCalendar } from '@/shared/ui/icons'
import { PENDING_API_TITLE } from '@/shared/config/ui'
import type { HomeFilterTab } from './home-dashboard.types'
import styles from './HomeDashboard.module.css'

const TABS: { id: HomeFilterTab; label: string }[] = [
  { id: 'devonxona', label: 'Девонхона кирувчи рўйхатга олган' },
  { id: 'imzolangan', label: 'Фишка охирги имзоланган' },
  { id: 'chiquvchi', label: 'Чиқувчи ҳужжат' },
]

type Props = {
  activeTab: HomeFilterTab
  onTabChange: (tab: HomeFilterTab) => void
}

export function HomeDashboardToolbar({ activeTab, onTabChange }: Props) {
  return (
    <div className={styles.topFilterBar}>
      <div className={styles.tabList}>
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={`${styles.tabItem} ${activeTab === tab.id ? styles.tabItemActive : ''}`}
            onClick={() => onTabChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className={styles.rightActions}>
        <button type="button" className={styles.actionMapBtn} disabled title={PENDING_API_TITLE}>
          Манзилли кўриш
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M7 17L17 7M17 7H7M17 7V17" />
          </svg>
        </button>

        <button type="button" className={styles.datePickerBtn} disabled title={PENDING_API_TITLE}>
          <span>01.01.2025 - 18.08.2025</span>
          <IconCalendar className={styles.calendarIcon} />
        </button>

        <button
          type="button"
          className={styles.refreshBtn}
          disabled
          title={PENDING_API_TITLE}
          aria-label="Yangilash"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
          </svg>
        </button>
      </div>
    </div>
  )
}
