'use client'

import { Calendar, ChevronDown, ExternalLink, FileText } from 'lucide-react'
import { useLayoutEffect, useRef, useState } from 'react'
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts'
import { REGIONS_MOCK } from './home-dashboard-new.mock'
import shared from './styles/shared/card-base.module.css'
import styles from './RevenueStatusCard.module.css'

const GAUGE_SEGMENTS = [
  { name: 'Қолдиқ', value: 8, color: '#fb7185' },
  { name: 'Амалда', value: 92, color: '#22c55e' },
]

const GAUGE_TRACK = [{ name: 'track', value: 100, color: '#cfd3ff' }]

const GAUGE_CHART_MARGIN = { top: 2, right: 6, bottom: 2, left: 6 } as const

type GaugeGeometry = {
  /** Recharts Pie — plot ichidagi koordinata (margin qo‘shiladi) */
  pieCx: number
  pieCy: number
  trackInner: number
  trackOuter: number
  segInner: number
  segOuter: number
  /** Matn qatlami — gaugeWrap ichida mutlaq px */
  centerX: number
  centerY: number
  /** Ichki matn maksimal kengligi */
  innerMaxWidth: number
  /** Yoy atrofidagi quti kengligi — keng ustunda bo‘sh joy qolmasin */
  arcBoxWidth: number
}

/** Kenglik + geometriyaga mos ixcham yoy balandligi (pastda bo‘sh joy qolmasin) */
function resolveGaugeWrapHeight(width: number): number {
  const m = GAUGE_CHART_MARGIN
  const plotW = Math.max(0, width - m.left - m.right)
  const padTop = 6
  const padX = 4
  const arcEndBelow = 0.34
  const capPad = 8
  const liftUp = 2
  const maxOuterByWidth = ((plotW - padX * 2) / 2) * 0.98
  const outerCap =
    width >= 600
      ? Math.min(maxOuterByWidth, Math.max(88, width * 0.24))
      : width >= 480
        ? Math.min(maxOuterByWidth, Math.max(72, width * 0.23))
        : Math.min(maxOuterByWidth, Math.max(52, width * 0.22))
  const outer = Math.max(44, outerCap)
  const plotNeed = padTop + liftUp + capPad + outer * (1 + arcEndBelow)
  return Math.max(112, Math.ceil(m.top + m.bottom + plotNeed))
}

function computeGaugeGeometry(width: number, height: number): GaugeGeometry {
  const m = GAUGE_CHART_MARGIN
  const plotW = width - m.left - m.right
  const plotH = height - m.top - m.bottom
  const padTop = 6
  const padX = 4
  const arcEndBelow = 0.34
  const capPad = 8
  const liftUp = 2
  const maxOuterByWidth = ((plotW - padX * 2) / 2) * 0.98
  /** Tepa va past cheklov bir xil — yuqoridagi bo‘sh joy yo‘q */
  const maxOuterByHeight = (plotH - padTop - capPad - liftUp) / (1 + arcEndBelow)
  const outer = Math.min(maxOuterByWidth, Math.max(44, maxOuterByHeight))
  const pieCx = plotW / 2
  const pieCy = outer + padTop
  const segOuter = outer
  const segInner = outer * 0.84
  const trackOuter = outer * 0.76
  const trackInner = trackOuter * 0.97
  const centerX = m.left + pieCx
  const centerY = m.top + pieCy - segInner * 0.22
  const innerMaxWidth = segInner * 1.5
  const arcBoxWidth = width
  return {
    pieCx,
    pieCy,
    trackInner,
    trackOuter,
    segInner,
    segOuter,
    centerX,
    centerY,
    innerMaxWidth,
    arcBoxWidth,
  }
}

const EXPECTED = { docs: '1 594', amount: '54 873,2' }
const SUMMARY = { docs: '1 594', amount: '8 600,9', percent: '96%' }

function formatAmount(value: number): string {
  const [whole, fraction] = value.toFixed(1).split('.')
  const grouped = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  return fraction ? `${grouped},${fraction}` : grouped
}

function formatCount(value: number): string {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}

function StatIcons({
  variant,
  docs,
  amount,
  separator = false,
  compact = false,
  summary = false,
}: {
  variant: 'green' | 'red'
  docs: string
  amount: string
  separator?: boolean
  compact?: boolean
  summary?: boolean
}) {
  const iconClass = variant === 'green' ? styles.iconSmGreen : styles.iconSmRed
  const iconSize = compact ? 10 : 12
  const rootClass = compact ? styles.regionStatLine : summary ? styles.summaryStatLine : undefined
  const numClass = compact ? styles.regionStatNum : summary ? styles.summaryStatNum : undefined

  return (
    <span className={rootClass}>
      <span className={`${styles.iconSm} ${iconClass}`}>
        <FileText size={iconSize} strokeWidth={2.5} />
      </span>
      <span className={numClass}>{docs}</span>
      {separator && <span className={styles.separator}>/</span>}
      <span className={`${styles.moneyIconSm} ${iconClass}`} aria-hidden="true">
        <span />
        <span />
      </span>
      <span className={numClass}>{amount}</span>
    </span>
  )
}

export function RevenueStatusCard() {
  const gaugeWrapRef = useRef<HTMLDivElement>(null)
  const [gaugeHeight, setGaugeHeight] = useState(168)
  const [gaugeGeo, setGaugeGeo] = useState<GaugeGeometry>(() =>
    computeGaugeGeometry(340, resolveGaugeWrapHeight(340)),
  )

  useLayoutEffect(() => {
    const wrap = gaugeWrapRef.current
    if (!wrap) return

    const update = () => {
      const width = wrap.getBoundingClientRect().width
      if (width <= 0) return
      const height = resolveGaugeWrapHeight(width)
      setGaugeHeight(height)
      setGaugeGeo(computeGaugeGeometry(width, height))
    }

    update()
    const observer = new ResizeObserver(update)
    observer.observe(wrap)
    return () => observer.disconnect()
  }, [])

  return (
    <div className={`${shared.card} ${styles.revenueCard}`}>
      <div className={`${shared.cardHeaderDark} ${styles.header}`}>
        <h2 className={shared.cardTitle}>Тушум ҳолати</h2>
        <div className={shared.dropdownGroup}>
          <div className={shared.customDropdown}>
            <button type="button" className={`${shared.customSelect} ${styles.headerSelect}`}>
              Барчаси
              <ChevronDown size={16} />
            </button>
          </div>
          <div className={shared.customDropdown}>
            <button type="button" className={`${shared.customSelect} ${styles.headerSelect}`}>
              <Calendar size={16} color="#64748b" />
              2025
              <ChevronDown size={16} />
            </button>
          </div>
          <button
            type="button"
            className={`${shared.iconBtn} ${styles.headerIconBtn}`}
            aria-label="Экспорт"
          >
            <ExternalLink size={18} />
          </button>
        </div>
      </div>

      <div className={styles.tabsRow}>
        <div className={styles.tabsGroup} role="tablist" aria-label="Давр">
          <button
            type="button"
            role="tab"
            aria-selected={true}
            className={`${styles.tab} ${styles.tabActive}`}
          >
            Йиллик
          </button>
          <button type="button" role="tab" aria-selected={false} className={styles.tab}>
            Ойлик
          </button>
          <button type="button" role="tab" aria-selected={false} className={styles.tab}>
            Кунлик
          </button>
        </div>
        <div className={styles.dateChip}>2025 йил 2 декабрь</div>
      </div>

      <div className={styles.content}>
        <div className={styles.unitLabel}>млн.сўм</div>

        <div className={styles.gaugeSection}>
          <div
            ref={gaugeWrapRef}
            className={styles.gaugeWrap}
            style={{
              height: gaugeHeight,
              minHeight: gaugeHeight,
              maxHeight: gaugeHeight,
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart margin={GAUGE_CHART_MARGIN}>
                <Pie
                  data={GAUGE_TRACK}
                  cx={gaugeGeo.pieCx}
                  cy={gaugeGeo.pieCy}
                  startAngle={200}
                  endAngle={-20}
                  innerRadius={gaugeGeo.trackInner}
                  outerRadius={gaugeGeo.trackOuter}
                  dataKey="value"
                  stroke="none"
                  isAnimationActive={false}
                >
                  <Cell fill="#e2e8f0" />
                </Pie>
                <Pie
                  data={GAUGE_SEGMENTS}
                  cx={gaugeGeo.pieCx}
                  cy={gaugeGeo.pieCy}
                  startAngle={200}
                  endAngle={-20}
                  innerRadius={gaugeGeo.segInner}
                  outerRadius={gaugeGeo.segOuter}
                  paddingAngle={2}
                  dataKey="value"
                  cornerRadius={6}
                  stroke="none"
                  isAnimationActive={false}
                >
                  {GAUGE_SEGMENTS.map((entry, index) => (
                    <Cell key={`gauge-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            <div
              className={styles.gaugeCenter}
              style={{
                left: gaugeGeo.centerX,
                top: gaugeGeo.centerY,
                maxWidth: gaugeGeo.innerMaxWidth,
              }}
            >
              <div className={styles.gaugeCenterInner}>
                <div className={`${styles.gaugeRow} ${styles.gaugeRowDocs}`}>
                  <span className={styles.iconBlue}>
                    <FileText size={12} strokeWidth={2.5} />
                  </span>
                  <span className={styles.gaugeRowValue}>{EXPECTED.docs}</span>
                </div>
                <div className={`${styles.gaugeRow} ${styles.gaugeRowAmount}`}>
                  <span className={styles.moneyIcon} aria-hidden="true">
                    <span />
                    <span />
                  </span>
                  <span className={styles.gaugeRowValue}>{EXPECTED.amount}</span>
                </div>
                <div className={styles.gaugeExpectedLabel}>Кутилиши</div>
              </div>
            </div>
          </div>

          <div className={styles.summaryRow}>
            <div className={styles.summaryBlock}>
              <span className={`${styles.accentBar} ${styles.accentGreen}`} aria-hidden="true" />
              <div className={styles.summaryBody}>
                <div className={styles.summaryStats}>
                  <StatIcons
                    variant="green"
                    docs={SUMMARY.docs}
                    amount={SUMMARY.amount}
                    separator
                    summary
                  />
                  <span className={styles.pillGreen}>{SUMMARY.percent}</span>
                </div>
                <div className={styles.summaryLabel}>Амалда</div>
              </div>
            </div>
            <div className={styles.summaryBlock}>
              <span className={`${styles.accentBar} ${styles.accentRed}`} aria-hidden="true" />
              <div className={styles.summaryBody}>
                <div className={styles.summaryStats}>
                  <StatIcons
                    variant="red"
                    docs={SUMMARY.docs}
                    amount={SUMMARY.amount}
                    separator
                    summary
                  />
                  <span className={styles.pillRed}>{SUMMARY.percent}</span>
                </div>
                <div className={styles.summaryLabel}>Қолдиқ</div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.regionsSection}>
          <div className={styles.regionsTitle}>Ёмон кўрсаткичли ҳудудлар</div>
          <div className={styles.regionsList}>
            {REGIONS_MOCK.map((region) => (
              <div key={region.name} className={styles.regionCard}>
                <div className={styles.regionName}>{region.name}</div>
                <div className={styles.regionFooter}>
                  <div className={styles.regionStats}>
                    <StatIcons
                      variant="red"
                      docs={formatCount(region.count1)}
                      amount={formatAmount(region.count2)}
                      separator
                      compact
                    />
                  </div>
                  <span className={styles.regionPercent}>{region.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
