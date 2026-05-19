import type { EdoUsageRow } from './edo-usage.types'
import { EdoUsageTableHead } from './EdoUsageTableHead'
import { EdoUsageTableRow } from './EdoUsageTableRow'
import styles from './EconomicEdoUsage.module.css'

type Props = { rows: EdoUsageRow[] }

export function EdoUsageTable({ rows }: Props) {
  return (
    <table className={styles.table}>
      <colgroup>
        <col className={styles.colNo} />
      </colgroup>
      <EdoUsageTableHead />
      <tbody>
        {rows.map((row, rowIndex) => (
          <EdoUsageTableRow key={row.key} row={row} rowIndex={rowIndex} />
        ))}
      </tbody>
    </table>
  )
}
