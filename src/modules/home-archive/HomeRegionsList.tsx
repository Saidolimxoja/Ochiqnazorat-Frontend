import type { RegionColorTier, RegionMetric } from './home-dashboard.types'
import { formatCount } from './home-dashboard.utils'
import styles from './HomeDashboard.module.css'

const REGION_CIRCLE: Record<RegionColorTier, string> = {
  green: styles.circleGreen,
  orange: styles.circleOrange,
  red: styles.circleRed,
}

type Props = {
  regions: RegionMetric[]
  hoveredRegion: string | null
  onHoverRegion: (id: string | null) => void
}

function OrgIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <line x1="9" y1="3" x2="9" y2="21" />
    </svg>
  )
}

function UserIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}

export function HomeRegionsList({ regions, hoveredRegion, onHoverRegion }: Props) {
  return (
    <div className={styles.regionsListContainer}>
      <div className={styles.regionsGrid}>
        {regions.map((region) => (
          <div
            key={region.id}
            className={`${styles.regionRow} ${hoveredRegion === region.id ? styles.regionRowHovered : ''}`}
            onMouseEnter={() => region.id !== 'markaz' && onHoverRegion(region.id)}
            onMouseLeave={() => onHoverRegion(null)}
          >
            <div className={`${styles.numberCircle} ${REGION_CIRCLE[region.colorTier]}`}>
              {region.no}
            </div>
            <div className={styles.regionInfo}>
              <div className={styles.regionName}>{region.name}</div>
              <div className={styles.regionMiniStats}>
                <span className={styles.iconSpan}>
                  <OrgIcon />
                </span>
                <span className={styles.miniStatVal}>{formatCount(region.tashkilotlar)}</span>
                <span className={styles.divider}>/</span>
                <span className={styles.iconSpan}>
                  <UserIcon />
                </span>
                <span className={styles.miniStatVal}>{formatCount(region.foydalanuvchilar)}</span>
                <span className={styles.miniStatPct}>/ {region.percentage}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
