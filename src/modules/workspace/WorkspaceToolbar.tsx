import type { FilterId, ListDensity } from './workspace.types'
import { WorkspaceFilterChips } from './WorkspaceFilterChips'
import { WorkspaceListDensityToggle } from './WorkspaceListDensityToggle'
import { WorkspaceSearch } from './WorkspaceSearch'
import { useWorkspaceFilterMenus } from './useWorkspaceFilterMenus'
import styles from './Workspace.module.css'

type Props = {
  query: string
  onQueryChange: (value: string) => void
  activeFilter: FilterId
  onFilterChange: (filter: FilterId) => void
  listDensity: ListDensity
  onListDensityChange: (density: ListDensity) => void
  moreOpen: boolean
  onMoreOpenChange: (open: boolean) => void
  internalOpen: boolean
  onInternalOpenChange: (open: boolean) => void
}

export function WorkspaceToolbar(props: Props) {
  const {
    query,
    onQueryChange,
    activeFilter,
    onFilterChange,
    listDensity,
    onListDensityChange,
    moreOpen,
    onMoreOpenChange,
    internalOpen,
    onInternalOpenChange,
  } = props

  const { moreRef, internalRef, selectFilter } = useWorkspaceFilterMenus({
    moreOpen,
    internalOpen,
    onMoreOpenChange,
    onInternalOpenChange,
    onFilterChange,
  })

  return (
    <div className={styles.toolColumn}>
      <WorkspaceSearch query={query} onQueryChange={onQueryChange} />
      <div className={styles.chipsRow}>
        <WorkspaceFilterChips
          activeFilter={activeFilter}
          selectFilter={selectFilter}
          internalOpen={internalOpen}
          onInternalOpenChange={onInternalOpenChange}
          internalRef={internalRef}
          moreOpen={moreOpen}
          onMoreOpenChange={onMoreOpenChange}
          moreRef={moreRef}
        />
        <WorkspaceListDensityToggle
          listDensity={listDensity}
          onListDensityChange={onListDensityChange}
        />
      </div>
    </div>
  )
}
