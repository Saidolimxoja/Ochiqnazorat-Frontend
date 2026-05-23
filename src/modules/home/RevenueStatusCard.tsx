'use client'

import { Calendar, ChevronDown, ExternalLink, FileText } from 'lucide-react'
import { useLayoutEffect, useRef, useState } from 'react'
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts'
import { DASHBOARD_CARDS } from './dashboard-mode'
import { DashboardScopeDropdown } from './DashboardScopeDropdown'
import { REGIONS_MOCK } from './home-dashboard-new.mock'
import shared from './styles/shared/card-base.module.css'
import gaugeLayoutStyles from './styles/revenue/revenue-gauge.module.css'
import layoutStyles from './styles/revenue/revenue-layout.module.css'
import regionsStyles from './styles/revenue/revenue-regions.module.css'
import responsiveStyles from './styles/revenue/revenue-responsive.module.css'
import shellStyles from './styles/revenue/revenue-shell.module.css'
import tabsStyles from './styles/revenue/revenue-tabs.module.css'
import overrideStyles from './RevenueStatusCard.module.css'

const shell = shellStyles
const tabs = tabsStyles
const layout = layoutStyles
const gaugeLayout = gaugeLayoutStyles
const regions = regionsStyles
const r = responsiveStyles
const over = overrideStyles

function cx(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(' ')
}

const GAUGE_SEGMENTS = [
  { name: 'Қолдиқ', value: 8, color: '#f97066' },
  { name: 'Амалда', value: 92, color: '#32d583' },
]

const GAUGE_TRACK = [{ name: 'track', value: 100, color: '#cfd3ff' }]

const GAUGE_CHART_MARGIN = { top: 2, right: 6, bottom: 2, left: 6 } as const

type GaugeGeometry = {
  pieCx: number
  pieCy: number
  trackInner: number
  trackOuter: number
  segInner: number
  segOuter: number
  segCornerRadius: number
  centerX: number
  centerY: number
  innerMaxWidth: number
  arcBoxWidth: number
}

function resolveGaugeWrapHeight(width: number, availableHeight?: number): number {
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
  const fromWidth = Math.max(112, Math.ceil(m.top + m.bottom + plotNeed))

  if (!availableHeight || availableHeight <= fromWidth + 8) {
    return fromWidth
  }

  const maxByAspect = Math.ceil(width * 0.78)
  return Math.min(Math.floor(availableHeight), Math.max(fromWidth, maxByAspect))
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
  const maxOuterByHeight = (plotH - padTop - capPad - liftUp) / (1 + arcEndBelow)
  const outer = Math.min(maxOuterByWidth, Math.max(44, maxOuterByHeight))
  const pieCx = plotW / 2
  const pieCy = outer + padTop
  const segOuter = outer
  const segInner = outer * 0.84
  const segCornerRadius = Math.max(4, Math.round((segOuter - segInner) * 0.5))
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
    segCornerRadius,
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
  const iconClass = variant === 'green' ? r.iconSmGreen : r.iconSmRed
  const iconSize = compact ? 10 : 12
  const rootClass = compact ? r.regionStatLine : summary ? r.summaryStatLine : undefined
  const numClass = compact ? r.regionStatNum : summary ? r.summaryStatNum : undefined

  return (
    <span className={rootClass}>
      <span className={cx(r.iconSm, iconClass)}>
        <FileText size={iconSize} strokeWidth={2.5} />
      </span>
      <span className={numClass}>{docs}</span>
      {separator && <span className={r.separator}>/</span>}
      <span className={cx(r.moneyIconSm, iconClass)} aria-hidden="true">
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

      const section = wrap.parentElement
      let availableHeight: number | undefined
      const stretchGauge =
        getComputedStyle(wrap).getPropertyValue('--hd-mode-revenue-gauge-stretch').trim() === '1'

      if (stretchGauge && section) {
        const sectionHeight = section.getBoundingClientRect().height
        const summaryRow = wrap.nextElementSibling
        const summaryHeight =
          summaryRow instanceof HTMLElement ? summaryRow.getBoundingClientRect().height : 0
        const gap = Number.parseFloat(getComputedStyle(section).rowGap || getComputedStyle(section).gap || '8') || 8
        availableHeight = Math.max(0, sectionHeight - summaryHeight - gap)
      }

      const height = resolveGaugeWrapHeight(width, availableHeight)
      setGaugeHeight(height)
      setGaugeGeo(computeGaugeGeometry(width, height))
    }

    update()
    const observer = new ResizeObserver(update)
    observer.observe(wrap)
    if (wrap.parentElement) {
      observer.observe(wrap.parentElement)
    }
    return () => observer.disconnect()
  }, [])

  return (
    <div
      className={cx(shared.card, shell.revenueCard, r.revenueCard)}
      data-dashboard-card={DASHBOARD_CARDS.revenue}
    >
      <div className={cx(shared.cardHeaderDark, shell.header, over.header, r.header)}>
        <h2 className={shared.cardTitle}>Тушум ҳолати</h2>
        <div className={shared.dropdownGroup}>
          <DashboardScopeDropdown selectClassName={cx(over.headerSelect)} />
          <div className={shared.customDropdown}>
            <button type="button" className={cx(shared.customSelect, over.headerSelect)}>
              <Calendar size={16} color="#64748b" />
              2025
              <ChevronDown size={16} />
            </button>
          </div>
          <button type="button" className={cx(shared.iconBtn, over.headerIconBtn)} aria-label="Экспорт">
            <ExternalLink size={18} />
          </button>
        </div>
      </div>

      <div className={cx(tabs.tabsRow, r.tabsRow)}>
        <div className={cx(tabs.tabsGroup, r.tabsGroup)} role="tablist" aria-label="Давр">
          <button type="button" role="tab" aria-selected={true} className={cx(tabs.tab, tabs.tabActive, r.tab)}>
            Йиллик
          </button>
          <button type="button" role="tab" aria-selected={false} className={cx(tabs.tab, r.tab)}>
            Ойлик
          </button>
          <button type="button" role="tab" aria-selected={false} className={cx(tabs.tab, r.tab)}>
            Кунлик
          </button>
        </div>
        <div className={cx(tabs.dateChip, r.dateChip)}>2025 йил 2 декабрь</div>
      </div>

      <div className={cx(layout.content, r.content)}>
        <div className={cx(layout.unitLabel, r.unitLabel)}>млн.сўм</div>

        <div className={cx(gaugeLayout.gaugeSection, r.gaugeSection)}>
          <div
            ref={gaugeWrapRef}
            className={r.gaugeWrap}
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
                  <Cell fill="#cfd3ff" />
                </Pie>
                <Pie
                  data={GAUGE_SEGMENTS}
                  cx={gaugeGeo.pieCx}
                  cy={gaugeGeo.pieCy}
                  startAngle={200}
                  endAngle={-20}
                  innerRadius={gaugeGeo.segInner}
                  outerRadius={gaugeGeo.segOuter}
                  paddingAngle={1}
                  dataKey="value"
                  cornerRadius={gaugeGeo.segCornerRadius}
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
              className={r.gaugeCenter}
              style={{
                left: gaugeGeo.centerX,
                top: gaugeGeo.centerY,
                maxWidth: gaugeGeo.innerMaxWidth,
              }}
            >
              <div className={r.gaugeCenterInner}>
                <div className={cx(r.gaugeRow, r.gaugeRowDocs)}>
                  <span className={r.iconBlue}>
                    <FileText size={12} strokeWidth={2.5} />
                  </span>
                  <span className={r.gaugeRowValue}>{EXPECTED.docs}</span>
                </div>
                <div className={cx(r.gaugeRow, r.gaugeRowAmount)}>
                  <span className={r.moneyIcon} aria-hidden="true">
                    <span />
                    <span />
                  </span>
                  <span className={r.gaugeRowValue}>{EXPECTED.amount}</span>
                </div>
                <div className={r.gaugeExpectedLabel}>Кутилиши</div>
              </div>
            </div>
          </div>

          <div className={r.summaryRow}>
            <div className={r.summaryBlock}>
              <span className={cx(r.accentBar, r.accentGreen)} aria-hidden="true" />
              <div className={r.summaryBody}>
                <div className={r.summaryStats}>
                  <StatIcons variant="green" docs={SUMMARY.docs} amount={SUMMARY.amount} separator summary />
                  <span className={r.pillGreen}>{SUMMARY.percent}</span>
                </div>
                <div className={r.summaryLabel}>Амалда</div>
              </div>
            </div>
            <div className={r.summaryBlock}>
              <span className={cx(r.accentBar, r.accentRed)} aria-hidden="true" />
              <div className={r.summaryBody}>
                <div className={r.summaryStats}>
                  <StatIcons variant="red" docs={SUMMARY.docs} amount={SUMMARY.amount} separator summary />
                  <span className={r.pillRed}>{SUMMARY.percent}</span>
                </div>
                <div className={r.summaryLabel}>Қолдиқ</div>
              </div>
            </div>
          </div>
        </div>

        <div className={cx(regions.regionsSection, r.regionsSection)}>
          <div className={cx(regions.regionsTitle, r.regionsTitle)}>Ёмон кўрсаткичли ҳудудлар</div>
          <div className={cx(regions.regionsList, r.regionsList)}>
            {REGIONS_MOCK.map((region) => (
              <div key={region.name} className={r.regionCard}>
                <div className={r.regionName}>{region.name}</div>
                <div className={r.regionFooter}>
                  <div className={r.regionStats}>
                    <StatIcons
                      variant="red"
                      docs={formatCount(region.count1)}
                      amount={formatAmount(region.count2)}
                      separator
                      compact
                    />
                  </div>
                  <span className={r.regionPercent}>{region.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
