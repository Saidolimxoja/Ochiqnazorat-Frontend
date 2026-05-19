import { IconSearch } from '@/shared/ui/icons'
import styles from './Workspace.module.css'

type Props = {
  query: string
  onQueryChange: (value: string) => void
}

export function WorkspaceSearch({ query, onQueryChange }: Props) {
  return (
    <div className={styles.searchRow}>
      <form className={styles.searchForm} onSubmit={(e) => e.preventDefault()}>
        <label className={styles.searchField}>
          <span className="sr-only">Qidirish</span>
          <input
            type="search"
            className={styles.searchInput}
            placeholder="Qidirish"
            autoComplete="off"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
          />
          <IconSearch className={styles.searchGlyph} />
        </label>
      </form>
    </div>
  )
}
