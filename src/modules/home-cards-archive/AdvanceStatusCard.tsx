'use client'

import { Calendar, Check, ChevronDown, ChevronUp, ExternalLink, FileText } from 'lucide-react'
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts'
import { REGIONS_MOCK } from './home-dashboard-new.mock'
import shared from './styles/shared/card-base.module.css'
import styles from './AdvanceStatusCard.module.css'

import { useState, useRef, useEffect } from 'react'

const data = [
  { name: 'Аванс тушмаган', value: 60, color: '#fb5f5f' },
  { name: 'Аванс тушган', value: 40, color: '#2fd17f' },
]

function formatAmount(value: number): string {
  const [whole, fraction] = value.toFixed(1).split('.')
  const grouped = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  return fraction ? `${grouped},${fraction}` : grouped
}

function formatCount(value: number): string {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}

export function AdvanceStatusCard() {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className={`${shared.card} ${styles.advanceCard}`}>
      <div className={`${shared.cardHeaderDark} ${styles.advanceHeader}`}>
        <div className={shared.cardTitle}>Аванс ҳолати</div>
        <div className={shared.dropdownGroup}>
          <div className={`${shared.customDropdown} ${styles.advanceDropdown}`} ref={dropdownRef}>
            <button
              type="button"
              className={`${shared.customSelect} ${styles.advanceSelect}`}
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              Барчаси
              <ChevronDown size={16} />
            </button>
            {dropdownOpen && (
              <div className={`${shared.dropdownMenu} ${styles.advanceDropdownMenu}`}>
                <div className={`${shared.dropdownItem} ${shared.dropdownItemActive}`}>
                  Барчаси <Check size={16} color="#0ea5e9" />
                </div>
                <div className={shared.dropdownItem}>Э-Ҳуқуқшунос</div>
                <div className={shared.dropdownItem}>Рақамли маҳалла</div>
                <div className={shared.dropdownItem}>Токен</div>
                <div className={shared.dropdownItem}>
                  Ижро <ChevronUp size={16} />
                </div>
                <div
                  className={`${shared.dropdownItem} ${shared.dropdownItemActive} ${shared.dropdownSubItem}`}
                >
                  Ижро <Check size={16} color="#0ea5e9" />
                </div>
                <div className={`${shared.dropdownItem} ${shared.dropdownSubItem}`}>Ижро</div>
                <div className={`${shared.dropdownItem} ${shared.dropdownSubItem}`}>Ижро</div>
              </div>
            )}
          </div>
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

      <div className={shared.advanceDateRow}>
        <div className={shared.dateChip}>2025 йил 2 декабрь</div>
      </div>

      <div className={`${shared.cardContent} ${styles.advanceContent}`}>
        <div className={styles.advanceChartArea}>
          <div className={styles.advanceDonutWrap}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  startAngle={90}
                  endAngle={-270}
                  innerRadius="64%"
                  outerRadius="90%"
                  paddingAngle={0}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className={styles.donutCenter}>
              <div className={styles.donutLabel}>Жами шартномалар</div>
              <div className={styles.donutValue}>4800</div>
            </div>
          </div>

          <div className={styles.legendContainer}>
            <div className={styles.legendItem}>
              <div className={styles.legendColor} style={{ backgroundColor: '#2fd17f' }} />
              <div>
                <div className={styles.legendRow}>
                  <span className={`${styles.advanceLegendIcon} ${styles.advanceLegendIconGreen}`}>
                    <FileText size={14} strokeWidth={2.5} />
                  </span>
                  <span className={styles.legendValue}>1 594</span>
                  <span className={styles.legendPercent}>96%</span>
                </div>
                <div className={styles.legendLabel}>Аванс тушган</div>
              </div>
            </div>

            <div className={styles.legendItem}>
              <div className={styles.legendColor} style={{ backgroundColor: '#fb5f5f' }} />
              <div>
                <div className={styles.legendRow}>
                  <span className={`${styles.advanceLegendIcon} ${styles.advanceLegendIconRed}`}>
                    <FileText size={14} strokeWidth={2.5} />
                  </span>
                  <span className={styles.legendValue}>1 594</span>
                  <span className={`${styles.legendPercent} ${styles.legendPercentRed}`}>96%</span>
                </div>
                <div className={styles.legendLabel}>Аванс тушмаган</div>
              </div>
            </div>
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
                    <span className={styles.advanceRegionSep}>/</span>
                    <span className={`${styles.advanceLegendIcon} ${styles.advanceLegendIconRed}`}>
                      <FileText size={13} strokeWidth={2.5} />
                    </span>
                    <span>{formatAmount(region.count2)}</span>
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
