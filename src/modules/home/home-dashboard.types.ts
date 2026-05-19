export type HomeFilterTab = 'devonxona' | 'imzolangan' | 'chiquvchi'

export type RegionColorTier = 'green' | 'orange' | 'red'

export type RegionMetric = {
  id: string
  no: number
  name: string
  tashkilotlar: number
  foydalanuvchilar: number
  percentage: number
  colorTier: RegionColorTier
}

export type TableRowData = {
  no: string
  region: string
  usersTotal: number
  orgsTotal: number
  orgsUsing: number
  orgsNotUsing: number
  percent: string
  diff: string
  count: number
  pctOfOrgs: string
  notUsingContract: number
  usingNoContract: number
}

export type RepublicTotals = {
  orgs: number
  users: number
  avgUsagePct: number
}

export type ContractKpiTone = 'blue' | 'orange' | 'red' | 'redDeep'

export type ContractKpiIcon = 'document' | 'users' | 'bell' | 'orgOff'

export type ContractKpi = {
  id: string
  value: string
  label: string
  tone: ContractKpiTone
  icon: ContractKpiIcon
}

export type TableSummaryRow = {
  usersTotal: string
  orgsTotal: string
  orgsUsing: string
  orgsNotUsing: string
  percent: string
  diff: string
  count: string
  pctOfOrgs: string
  notUsingContract: string
  usingNoContract: string
}
