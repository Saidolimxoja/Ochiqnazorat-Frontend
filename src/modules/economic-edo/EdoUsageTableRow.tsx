import { formatIntUz, formatRegionLabelShort } from '@/shared/lib/format'
import type { EdoUsageRow } from './edo-usage.types'
import { ArrowRowGo, PinGlyph } from './edo-usage-glyphs'
import styles from './EconomicEdoUsage.module.css'

type Props = {
  row: EdoUsageRow
  rowIndex: number
}

export function EdoUsageTableRow({ row, rowIndex }: Props) {
  const striped = !row.isTotal && rowIndex > 0 && rowIndex % 2 === 0

  return (
    <tr data-total={row.isTotal || undefined} className={striped ? styles.rowStriped : undefined}>
      {row.isTotal ? (
        <td colSpan={2} className={styles.regionCell}>
          <span className={styles.regionInner}>{row.region}</span>
        </td>
      ) : (
        <>
          <td>{row.no}</td>
          <td className={styles.regionCell}>
            <span className={styles.regionInner}>
              <PinGlyph className={styles.pin} />
              {formatRegionLabelShort(row.region)}
            </span>
          </td>
        </>
      )}
      <td>{formatIntUz(row.users)}</td>
      <td>{formatIntUz(row.orgsTotal)}</td>
      <td>{formatIntUz(row.orgsUsing)}</td>
      <td>{formatIntUz(row.orgsNotUsing)}</td>
      <td>
        <span
          className={
            row.isTotal
              ? styles.numTotal
              : row.diff < 0
                ? styles.numNeg
                : row.diff > 0
                  ? styles.numPos
                  : undefined
          }
        >
          {row.diff > 0 ? `+${formatIntUz(row.diff)}` : formatIntUz(row.diff)}
        </span>
      </td>
      <td className={styles.barCell}>
        <div className={styles.barCellInner}>
          <div className={styles.barTrack} aria-hidden>
            <div
              className={styles.barFill}
              data-tone={row.indicatorTone}
              style={{ width: `${row.indicatorPct}%` }}
            />
          </div>
          <div className={styles.pctWrap}>{row.indicatorPct}%</div>
        </div>
      </td>
      <td>{formatIntUz(row.subCount)}</td>
      <td>
        <span className={styles.contractPct}>{row.contractOrgPct}%</span>
      </td>
      <td className={styles.contractBlue}>{row.contractsNoUseSystem}</td>
      <td className={styles.contractRed}>{row.contractsUseNoOrg}</td>
      <td className={styles.rowGo} aria-hidden={row.isTotal || undefined}>
        {!row.isTotal ? (
          <button type="button" className={styles.goBtn} aria-label="Batafsil">
            <ArrowRowGo className={styles.goBtnIcon} />
          </button>
        ) : null}
      </td>
    </tr>
  )
}
