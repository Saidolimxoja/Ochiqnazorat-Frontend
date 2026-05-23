import type { RepublicTotals } from './home-dashboard.types'
import { formatCount } from './home-dashboard.utils'
import { UzbekistanMap } from './UzbekistanMap'
import styles from './HomeDashboard.module.css'

type Props = {
  totals: RepublicTotals
  hoveredRegion: string | null
  onHoverRegion: (id: string | null) => void
}

export function HomeMapSection({ totals, hoveredRegion, onHoverRegion }: Props) {
  return (
    <div className={styles.mapCard}>
      <div className={styles.mapCardHeader}>
        <span className={styles.mapCardTitle}>Ҳудудлар бўйича</span>
        <button type="button" className={styles.republicBtn}>
          <svg
            width="12"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden
          >
            <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          Республика
        </button>
      </div>

      <div className={styles.mapVisualContainer}>
        <UzbekistanMap hoveredRegion={hoveredRegion} onHoverRegion={onHoverRegion} />
      </div>

      <div className={styles.mapCardFooter}>
        <div className={styles.mapFooterJami}>Жами</div>
        <div className={styles.mapFooterStat}>
          <span className={styles.footerIconBlue}>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </span>
          Ташкилотлар <span className={styles.statBold}>{formatCount(totals.orgs)}</span>
        </div>
        <div className={styles.mapFooterStat}>
          <span className={styles.footerIconBlue}>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden
            >
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </span>
          Foydalanuvchilar <span className={styles.statBold}>{formatCount(totals.users)}</span>{' '}
          <span className={styles.statDim}>/ {totals.avgUsagePct}%</span>
        </div>
      </div>
    </div>
  )
}
