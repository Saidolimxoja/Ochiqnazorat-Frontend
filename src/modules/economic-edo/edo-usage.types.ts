export type EdoIndicatorTone = 'up' | 'down' | 'mid' | 'ok'

export type EdoUsageRow = {
  key: string
  no: number | '—'
  region: string
  users: number
  orgsTotal: number
  orgsUsing: number
  orgsNotUsing: number
  diff: number
  indicatorPct: number
  indicatorTone: EdoIndicatorTone
  subCount: number
  contractOrgPct: number
  contractsNoUseSystem: number
  contractsUseNoOrg: number
  isTotal?: boolean
}
