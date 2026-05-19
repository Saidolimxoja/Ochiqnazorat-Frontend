import type {
  ContractKpi,
  RegionColorTier,
  RegionMetric,
  TableRowData,
  TableSummaryRow,
} from './home-dashboard.types'

export type { ContractKpi, RegionColorTier, RegionMetric, TableRowData, TableSummaryRow }

export const CONTRACT_KPIS: ContractKpi[] = [
  {
    id: 'contracts',
    value: '15,194',
    label: 'Шартномалар',
    tone: 'blue',
    icon: 'document',
  },
  {
    id: 'contract-no-usage',
    value: '79 837',
    label: 'Шартнома тузиб тизимдан фойдаланмаётганлар',
    tone: 'orange',
    icon: 'users',
  },
  {
    id: 'usage-no-contract',
    value: '80 000',
    label: 'Тизимдан фойдаланиб шартнома тузмаганлар',
    tone: 'red',
    icon: 'bell',
  },
  {
    id: 'inactive-orgs',
    value: '72 846',
    label: 'Фойдаланмаётган ташкилотлар',
    tone: 'redDeep',
    icon: 'orgOff',
  },
]

export const TABLE_SUMMARY_ROW: TableSummaryRow = {
  usersTotal: '15 194',
  orgsTotal: '97 020 218 068',
  orgsUsing: '15 194',
  orgsNotUsing: '79 799 423 183',
  percent: '80.7%',
  diff: '-19 056',
  count: '15 194',
  pctOfOrgs: '98 855 803 245',
  notUsingContract: '15 194',
  usingNoContract: '79 799 423 183',
}

const REGION_SEEDS: Array<{
  id: string
  no: number
  name: string
  orgs: number
  users: number
  pct: number
  colorTier: RegionColorTier
}> = [
  {
    id: 'karakalpakstan',
    no: 1,
    name: 'Қорақалпоғистон',
    orgs: 14820,
    users: 8120,
    pct: 28,
    colorTier: 'green',
  },
  { id: 'bukhara', no: 2, name: 'Бухоро', orgs: 13240, users: 7640, pct: 26, colorTier: 'green' },
  {
    id: 'qashqadaryo',
    no: 3,
    name: 'Қашқадарё',
    orgs: 12680,
    users: 7010,
    pct: 24,
    colorTier: 'green',
  },
  {
    id: 'namangan',
    no: 4,
    name: 'Наманган',
    orgs: 14110,
    users: 8890,
    pct: 31,
    colorTier: 'green',
  },
  { id: 'sirdaryo', no: 5, name: 'Сирдарё', orgs: 9540, users: 5120, pct: 19, colorTier: 'orange' },
  {
    id: 'tashkent-region',
    no: 6,
    name: 'Тошкент вил.',
    orgs: 18760,
    users: 11240,
    pct: 34,
    colorTier: 'orange',
  },
  { id: 'xorazm', no: 7, name: 'Хоразм', orgs: 11890, users: 6480, pct: 22, colorTier: 'orange' },
  { id: 'markaz', no: 8, name: 'Марказ', orgs: 2210, users: 1980, pct: 41, colorTier: 'orange' },
  { id: 'andijan', no: 9, name: 'Андижон', orgs: 15320, users: 9340, pct: 29, colorTier: 'orange' },
  { id: 'jizzakh', no: 10, name: 'Жиззах', orgs: 10240, users: 5890, pct: 21, colorTier: 'orange' },
  { id: 'navoiy', no: 11, name: 'Навоий', orgs: 8760, users: 4620, pct: 18, colorTier: 'orange' },
  {
    id: 'samarqand',
    no: 12,
    name: 'Самарқанд',
    orgs: 16450,
    users: 9780,
    pct: 27,
    colorTier: 'orange',
  },
  {
    id: 'surxondaryo',
    no: 13,
    name: 'Сурхондарё',
    orgs: 11120,
    users: 5340,
    pct: 17,
    colorTier: 'red',
  },
  { id: 'fergana', no: 14, name: 'Фарғона', orgs: 15980, users: 9010, pct: 25, colorTier: 'red' },
  {
    id: 'tashkent-city',
    no: 15,
    name: 'Тошкент шаҳар',
    orgs: 24310,
    users: 15680,
    pct: 38,
    colorTier: 'red',
  },
]

export const REGIONS_LIST: RegionMetric[] = REGION_SEEDS.map((r) => ({
  id: r.id,
  no: r.no,
  name: r.name,
  tashkilotlar: r.orgs,
  foydalanuvchilar: r.users,
  percentage: r.pct,
  colorTier: r.colorTier,
}))

function formatPct(value: number): string {
  return `${value.toFixed(1).replace('.', ',')}%`
}

function formatDiff(value: number): string {
  const abs = Math.abs(value)
  const sign = value < 0 ? '-' : '+'
  return `${sign} ${abs.toLocaleString('uz-UZ')}`
}

export const TABLE_ROWS: TableRowData[] = [
  {
    no: '1',
    region: 'Қорақалпоғистон Республикаси',
    usersTotal: 1594,
    orgsTotal: 8_420_918,
    orgsUsing: 1420,
    orgsNotUsing: 1_240_502,
    percent: '80,7%',
    diff: '-12 480',
    count: 81.3,
    pctOfOrgs: '-892 104',
    notUsingContract: 318,
    usingNoContract: 1_102_384,
  },
  ...REGION_SEEDS.slice(1).map((r, i) => {
    const orgsTotal = r.orgs * 58_420 + i * 91_300
    const orgsUsing = Math.round(r.orgs * (r.pct / 100))
    const orgsNotUsing = r.orgs - orgsUsing
    const diff = Math.round((r.pct - 24) * 420)
    return {
      no: String(i + 2),
      region: r.name,
      usersTotal: r.users,
      orgsTotal,
      orgsUsing,
      orgsNotUsing,
      percent: formatPct(74 + (r.pct % 9) + i * 0.3),
      diff: formatDiff(diff),
      count: 68 + (r.pct % 15),
      pctOfOrgs: formatDiff(-orgsNotUsing * 12_400),
      notUsingContract: Math.round(orgsUsing * 0.12),
      usingNoContract: Math.round(orgsNotUsing * 9_840),
    }
  }),
  {
    no: '16',
    region: 'Марказий аппарат',
    usersTotal: 1980,
    orgsTotal: 128_450,
    orgsUsing: 910,
    orgsNotUsing: 1300,
    percent: '70,0%',
    diff: '+2 140',
    count: 70.0,
    pctOfOrgs: '-18 240',
    notUsingContract: 112,
    usingNoContract: 12_780,
  },
]
