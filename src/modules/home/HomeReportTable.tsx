import { IconChevron } from '@/shared/ui/icons'
import { TABLE_SUMMARY_ROW } from './home-dashboard.mock'
import type { TableRowData } from './home-dashboard.types'
import styles from './HomeDashboard.module.css'

type Props = {
  rows: TableRowData[]
}

export function HomeReportTable({ rows }: Props) {
  const summary = TABLE_SUMMARY_ROW

  return (
    <div className={styles.tableCard}>
      <div className={styles.tableScrollWrapper}>
        <table className={styles.reportTable}>
          <thead>
            <tr>
              <th rowSpan={2} className={styles.colNo}>
                №
              </th>
              <th rowSpan={2} className={styles.colRegion}>
                Ҳудуд
              </th>
              <th rowSpan={2} className={styles.colHeader}>
                Умумий Фойдаланувчилар сони
              </th>
              <th rowSpan={2} className={styles.colHeader}>
                Ташкилотлар умумий сони
              </th>
              <th colSpan={6} className={styles.groupHeader}>
                Шундан
              </th>
              <th colSpan={2} className={styles.groupHeader}>
                Шартномалар
              </th>
            </tr>
            <tr>
              <th className={styles.colSubHeader}>Фойдаланаётган ташкилотлар сони</th>
              <th className={styles.colSubHeader}>Фойдаланмаётган ташкилотлар сони</th>
              <th className={styles.colSubHeader}>%</th>
              <th className={styles.colSubHeader}>Фарқи</th>
              <th className={styles.colSubHeader}>сони</th>
              <th className={styles.colSubHeader}>Ташкилотларга нисбатан %</th>
              <th className={styles.colSubHeader}>Тизимдан фойдаланиб шартнома тузмаганлар</th>
              <th className={styles.colSubHeader}>Шартнома тузиб тизимдан фойдаланмаётганлар</th>
            </tr>
          </thead>
          <tbody>
            <tr className={styles.jamiRow}>
              <td>Жами</td>
              <td></td>
              <td>{summary.usersTotal}</td>
              <td>{summary.orgsTotal}</td>
              <td>{summary.orgsUsing}</td>
              <td>{summary.orgsNotUsing}</td>
              <td>{summary.percent}</td>
              <td>{summary.diff}</td>
              <td>{summary.count}</td>
              <td>{summary.pctOfOrgs}</td>
              <td>{summary.notUsingContract}</td>
              <td>{summary.usingNoContract}</td>
            </tr>
            {rows.map((row, idx) => (
              <tr key={row.no} className={idx % 2 === 1 ? styles.stripedRow : ''}>
                <td>{row.no}</td>
                <td className={styles.textLeft}>{row.region}</td>
                <td>{row.usersTotal.toLocaleString()}</td>
                <td>{row.orgsTotal.toLocaleString()}</td>
                <td>{row.orgsUsing.toLocaleString()}</td>
                <td>{row.orgsNotUsing.toLocaleString()}</td>
                <td className={styles.textBlue}>{row.percent}</td>
                <td className={styles.textRed}>{row.diff}</td>
                <td>{row.count}</td>
                <td className={styles.textRed}>{row.pctOfOrgs}</td>
                <td>{row.notUsingContract.toLocaleString()}</td>
                <td className={styles.textRed}>{row.usingNoContract.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.tableFooter}>
        <div className={styles.footerLeft}>1-20 of 27</div>
        <div className={styles.footerRight}>
          <span className={styles.rowsLabel}>Саҳифадаги қаторлар 10</span>
          <span className={styles.chevronDownIcon}>
            <IconChevron down />
          </span>
          <div className={styles.pageIndicator}>1/2</div>
          <div className={styles.navArrows}>
            <button type="button" className={styles.arrowBtn} disabled aria-label="Oldingi sahifa">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button type="button" className={styles.arrowBtn} aria-label="Keyingi sahifa">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
