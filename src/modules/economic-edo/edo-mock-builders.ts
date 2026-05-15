import type { EdoIndicatorTone } from './edo-usage.types'

export function row(
  key: string,
  no: number,
  region: string,
  users: number,
  orgsTotal: number,
  orgsUsing: number,
  orgsNotUsing: number,
  diff: number,
  indicatorPct: number,
  indicatorTone: EdoIndicatorTone,
  subCount: number,
  contractOrgPct: number,
  contractsNoUseSystem: number,
  contractsUseNoOrg: number,
) {
  return {
    key,
    no,
    region,
    users,
    orgsTotal,
    orgsUsing,
    orgsNotUsing,
    diff,
    indicatorPct,
    indicatorTone,
    subCount,
    contractOrgPct,
    contractsNoUseSystem,
    contractsUseNoOrg,
  }
}
