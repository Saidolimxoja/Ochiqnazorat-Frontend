import { PENDING_API_TITLE } from '@/shared/config/ui'
import type { DocumentItem } from '@/shared/model/document'
import styles from './Workspace.module.css'

type Props = {
  selected: DocumentItem | null
}

export function WorkspaceDocumentDetail({ selected }: Props) {
  return (
    <section className={styles.detailCol} aria-label="Tanlangan hujjat">
      {selected ? (
        <div className={styles.detail}>
          <header className={styles.detailHead}>
            <h1 className={styles.detailTitle}>{selected.number}</h1>
            <span className={styles.detailChip}>{selected.status}</span>
            <span className={styles.detailChipMuted}>{selected.category}</span>
          </header>
          <p className={styles.detailMeta}>Oxirgi yangilanish: {selected.dateShort}</p>
          <dl className={styles.detailMetaList}>
            <div className={styles.detailMetaRow}>
              <dt>Ma&apos;lumotnoma</dt>
              <dd>{selected.ref}</dd>
            </div>
            <div className={styles.detailMetaRow}>
              <dt>Sana</dt>
              <dd>{selected.dateDisplay}</dd>
            </div>
          </dl>
          <div className={styles.detailBody}>
            <p>{selected.summary}</p>
          </div>
          <div className={styles.actions}>
            <button type="button" className={styles.btnPrimary} disabled title={PENDING_API_TITLE}>
              Ko‘rib chiqish
            </button>
            <button type="button" className={styles.btnGhost} disabled title={PENDING_API_TITLE}>
              Yuklash
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.empty}>
          <p className={styles.emptyTitle}>Hujjatni tanlang</p>
          <p className={styles.emptyHint}>Bu yerda siz tanlagan hujjat ko‘rsatiladi.</p>
        </div>
      )}
    </section>
  )
}
