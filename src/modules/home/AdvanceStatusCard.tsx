'use client'

import { Calendar, ChevronDown, ExternalLink, FileText } from 'lucide-react'
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts'
import { DASHBOARD_CARDS } from './dashboard-mode'
import { DashboardScopeDropdown } from './DashboardScopeDropdown'
import { ADVANCE_CHART_MOCK, REGIONS_MOCK } from './home-dashboard-new.mock'
import shared from './styles/shared/card-base.module.css'
import styles from './AdvanceStatusCard.module.css'

const chartSegments = ADVANCE_CHART_MOCK.segments

function formatCount(value: number): string {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}

export function AdvanceStatusCard() {
  return (
    <div
      className={`${shared.card} ${styles.advanceCard}`}
      data-dashboard-card={DASHBOARD_CARDS.advance}
    >
      <div className={`${shared.cardHeaderDark} ${styles.advanceHeader}`}>
        <div className={shared.cardTitle}>Аванс ҳолати</div>
        <div className={shared.dropdownGroup}>
          <DashboardScopeDropdown selectClassName={styles.advanceSelect} />
          <button type="button" className={`${shared.customSelect} ${styles.advanceSelect}`}>
            <Calendar size={16} color="#64748b" />
            2025
            <ChevronDown size={16} />
          </button>
          <button type="button" className={`${shared.iconBtn} ${styles.advanceIconBtn}`}>
            <ExternalLink size={18} />
          </button>
        </div>
      </div>

      <div className={styles.advanceTabsRow}>
        <div className={`${shared.dateChip} ${styles.advanceDateChip}`}>2025 йил 2 декабрь</div>
      </div>

      <div className={`${shared.cardContent} ${styles.advanceContent}`}>
        <div className={styles.advanceChartArea}>
          <div className={styles.advanceDonutWrap}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartSegments}
                  cx="50%"
                  cy="50%"
                  startAngle={90}
                  endAngle={-270}
                  innerRadius="68%"
                  outerRadius="88%"
                  paddingAngle={0}
                  dataKey="value"
                >
                  {chartSegments.map((entry) => (
                    <Cell key={entry.id} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className={styles.donutCenter}>
              <div className={styles.donutLabel}>Жами шартномалар</div>
              <div className={styles.donutValue}>{formatCount(ADVANCE_CHART_MOCK.total)}</div>
            </div>
          </div>

          <div className={styles.legendContainer}>
            {chartSegments.map((segment) => (
              <div key={segment.id} className={styles.legendItem}>
                <div className={styles.legendColor} style={{ backgroundColor: segment.color }} />
                <div>
                  <div className={styles.legendRow}>
                    <span
                      className={`${styles.advanceLegendIcon} ${
                        segment.id === 'received'
                          ? styles.advanceLegendIconGreen
                          : styles.advanceLegendIconRed
                      }`}
                    >
                      <FileText size={14} strokeWidth={2.5} />
                    </span>
                    <span className={styles.legendValue}>{formatCount(segment.count)}</span>
                    <span
                      className={`${styles.legendPercent} ${
                        segment.id === 'notReceived' ? styles.legendPercentRed : ''
                      }`}
                    >
                      {segment.percent}%
                    </span>
                  </div>
                  <div className={styles.legendLabel}>{segment.name}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={`${shared.listArea} ${styles.advanceListArea}`}>
          <div className={`${shared.listTitle} ${styles.advanceListTitle}`}>
            Ёмон кўрсаткичли ҳудудлар
          </div>
          <div className={styles.advanceRegionsList}>
            {REGIONS_MOCK.map((region) => (
              <div key={region.name} className={`${shared.listItem} ${styles.advanceRegionCard}`}>
                <div className={styles.advanceRegionName}>{region.name}</div>
                <div className={styles.advanceRegionFooter}>
                  <div className={styles.advanceRegionStat}>
                    <span className={`${styles.advanceLegendIcon} ${styles.advanceLegendIconRed}`}>
                      <FileText size={13} strokeWidth={2.5} />
                    </span>
                    <span>{formatCount(region.count1)}</span>
                  </div>
                  <div className={`${shared.itemPercentage} ${styles.advanceItemPercentage}`}>
                    {region.percentage}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
