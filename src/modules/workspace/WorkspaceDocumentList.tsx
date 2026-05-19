import type { DocumentItem } from '@/shared/model/document'
import type { ListDensity } from './workspace.types'
import { WorkspaceItem } from './WorkspaceItem'
import styles from './Workspace.module.css'

type Props = {
  documents: DocumentItem[]
  selectedId: string | null
  listDensity: ListDensity
  pageRangeLabel: string
  currentPage: number
  totalPages: number
  onSelect: (id: string) => void
  onPageChange: (page: number) => void
}

export function WorkspaceDocumentList({
  documents,
  selectedId,
  listDensity,
  pageRangeLabel,
  currentPage,
  totalPages,
  onSelect,
  onPageChange,
}: Props) {
  return (
    <section
      className={styles.listCol}
      aria-label="Hujjatlar ro‘yxati"
      data-density={listDensity}
    >
      <ul className={styles.list}>
        {documents.map((doc) => (
          <WorkspaceItem
            key={doc.id}
            doc={doc}
            selected={doc.id === selectedId}
            onSelect={onSelect}
          />
        ))}
      </ul>
      <div className={styles.pagination}>
        <span className={styles.pageInfo}>{pageRangeLabel}</span>
        <div className={styles.pageBtns}>
          <button
            type="button"
            className={styles.pageBtn}
            disabled={currentPage <= 1}
            aria-label="Oldingi sahifa"
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          >
            ‹
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              type="button"
              className={styles.pageBtn}
              aria-current={p === currentPage ? 'page' : undefined}
              onClick={() => onPageChange(p)}
            >
              {p}
            </button>
          ))}
          <button
            type="button"
            className={styles.pageBtn}
            disabled={currentPage >= totalPages}
            aria-label="Keyingi sahifa"
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          >
            ›
          </button>
        </div>
      </div>
    </section>
  )
}
