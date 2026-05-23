'use client'

import { Calendar, ChevronDown, Component, ExternalLink, FileText } from 'lucide-react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type { TooltipContentProps } from 'recharts'
import { INVOICE_REGIONS_MOCK } from './home-dashboard-new.mock'
import shared from './styles/shared/card-base.module.css'
import styles from './InvoiceStatusCard.module.css'

type InvoiceChartDatum = {
  id: string
  name: string[]
  value: number
  label: string
  fill: string
}

const data: InvoiceChartDatum[] = [
  {
    id: 'issued',
    name: ['Берилган фактуралар'],
    value: 13746,
    label: '13 746',
    fill: 'url(#invoiceGreen)',
  },
  {
    id: 'total-issued',
    name: ['Жами берилган', 'фактуралар'],
    value: 1326,
    label: '1 326',
    fill: 'url(#invoiceRed)',
  },
]

function formatAxisTick(value: number) {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}

function InvoiceAxisTick({
  x,
  y,
  payload,
}: {
  x?: number
  y?: number
  payload?: { index?: number; value?: string }
}) {
  const labelLines =
    typeof payload?.index === 'number'
      ? data[payload.index]?.name
      : data.find((item) => item.id === payload?.value)?.name

  if (x === undefined || y === undefined || !labelLines) {
    return null
  }

  return (
    <g transform={`translate(${x},${y})`}>
      <text textAnchor="middle" fill="#0f172a" fontSize={12}>
        {labelLines.map((line, index) => (
          <tspan key={line} x={0} y={index === 0 ? 18 : 34}>
            {line}
          </tspan>
        ))}
      </text>
    </g>
  )
}

function CustomTooltip({ active, payload }: TooltipContentProps) {
  if (!active || !payload?.length) {
    return null
  }

  const item = payload[0].payload as InvoiceChartDatum

  return (
    <div
      style={{
        background: '#fff',
        padding: '8px 12px',
        border: '1px solid #e2e8f0',
        borderRadius: 8,
        fontSize: 13,
      }}
    >
      <p style={{ margin: 0, fontWeight: 600 }}>{item.name.join(' ')}</p>
      <p style={{ margin: 0, color: item.fill }}>{String(payload[0].value ?? '')}</p>
    </div>
  )
}

export function InvoiceStatusCard() {
  return (
    <div className={`${shared.card} ${styles.invoiceCard}`}>
      <div className={`${shared.cardHeaderDark} ${styles.invoiceHeader}`}>
        <div className={shared.cardTitle}>Счёт фактура</div>
        <div className={shared.dropdownGroup}>
          <button type="button" className={`${shared.customSelect} ${styles.invoiceSelect}`}>
            Барчаси
            <ChevronDown size={16} />
          </button>
          <button type="button" className={`${shared.customSelect} ${styles.invoiceSelect}`}>
            <Calendar size={16} color="#64748b" />
            2025
            <ChevronDown size={16} />
          </button>
          <button type="button" className={`${shared.iconBtn} ${styles.invoiceIconBtn}`}>
            <ExternalLink size={18} />
          </button>
        </div>
      </div>

      <div className={`${shared.navTabs} ${styles.invoiceTabs}`}>
        <div className={`${shared.navTab} ${shared.navTabActive} ${styles.invoiceTab}`}>
          Фактура бериш
        </div>
        <div className={`${shared.navTab} ${styles.invoiceTab}`}>Имзолаш</div>
        <div className={`${shared.dateChip} ${styles.invoiceDateChip}`}>2025 йил 2 декабрь</div>
      </div>

      <div className={`${shared.cardContent} ${styles.invoiceContent}`}>
        <div className={styles.invoiceSummary}>
          <div className={styles.invoiceIconWrapper}>
            <Component size={32} className={styles.invoiceIcon} />
          </div>
          <div className={styles.invoiceValue}>1 594</div>
          <div className={styles.invoiceLabel}>
            Аванс тушган,
            <br />
            фактура берилмаган
          </div>
        </div>

        <div className={styles.invoiceChartArea}>
          <div className={styles.invoiceChartCanvas}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 20, right: 8, left: -12, bottom: 6 }}>
                <defs>
                  <linearGradient id="invoiceGreen" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#34d399" />
                    <stop offset="100%" stopColor="#86efac" />
                  </linearGradient>
                  <linearGradient id="invoiceRed" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#fb6b6b" />
                    <stop offset="100%" stopColor="#fecaca" />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="id"
                  axisLine={{ stroke: '#cbd5e1', strokeWidth: 1.2 }}
                  tickLine={false}
                  height={56}
                  interval={0}
                  tick={<InvoiceAxisTick />}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#94a3b8' }}
                  tickFormatter={formatAxisTick}
                  domain={[0, 20000]}
                  ticks={[0, 5000, 10000, 15000, 20000]}
                />
                <CartesianGrid
                  vertical={false}
                  stroke="#cfd8e6"
                  strokeDasharray="4 4"
                  strokeWidth={1.2}
                />
                <Tooltip content={CustomTooltip} cursor={{ fill: '#f8fafc' }} />
                <Bar dataKey="value" radius={[8, 8, 0, 0]} maxBarSize={100}>
                  {data.map((entry) => (
                    <Cell key={entry.label} fill={entry.fill} />
                  ))}
                  <LabelList
                    dataKey="label"
                    position="top"
                    style={{ fontSize: 14, fontWeight: 500, fill: '#0f172a' }}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className={`${shared.listArea} ${styles.invoiceListArea}`}>
          <div className={`${shared.listTitle} ${styles.invoiceListTitle}`}>
            Ёмон кўрсаткичли ҳудудлар
          </div>
          {INVOICE_REGIONS_MOCK.map((region, idx) => (
            <div key={idx} className={`${shared.listItem} ${styles.invoiceListItem}`}>
              <span className={styles.invoiceRegionName}>{region.name}</span>
              <div className={styles.invoiceRegionStat}>
                <span className={styles.invoiceRegionIcon}>
                  <FileText size={13} strokeWidth={2.5} />
                </span>
                <span>{region.count}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
