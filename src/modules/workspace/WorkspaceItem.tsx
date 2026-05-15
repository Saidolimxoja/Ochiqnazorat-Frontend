import styles from './WorkspaceItem.module.css'
import type { DocumentItem } from '@/shared/model/document'

type Props = {
  doc: DocumentItem
  selected: boolean
  onSelect: (id: string) => void
}

export function WorkspaceItem({ doc, selected, onSelect }: Props) {
  return (
    <li className={styles.item}>
      <button
        type="button"
        className={styles.card}
        data-selected={selected || undefined}
        onClick={() => onSelect(doc.id)}
      >
        <div className={styles.head}>
          <span className={styles.ref}>{doc.ref}</span>
          <span className={styles.date}>{doc.dateDisplay}</span>
        </div>
        <div className={styles.summary}>{doc.summary}</div>
      </button>
    </li>
  )
}
