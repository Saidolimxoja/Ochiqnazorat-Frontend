import { IconGrid, IconList } from '@/shared/ui/icons'
import type { ListDensity } from './workspace.types'
import styles from './Workspace.module.css'

type Props = {
  listDensity: ListDensity
  onListDensityChange: (density: ListDensity) => void
}

export function WorkspaceListDensityToggle({ listDensity, onListDensityChange }: Props) {
  return (
    <div className={styles.listType} role="group" aria-label="Ko‘rinish turi">
      <button
        type="button"
        className={styles.listTypeBtn}
        data-active={listDensity === 'grid' || undefined}
        aria-pressed={listDensity === 'grid'}
        aria-label="Panjara"
        onClick={() => onListDensityChange('grid')}
      >
        <IconGrid className={styles.listTypeIcon} />
      </button>
      <button
        type="button"
        className={styles.listTypeBtn}
        data-active={listDensity === 'list' || undefined}
        aria-pressed={listDensity === 'list'}
        aria-label="Ro‘yxat"
        onClick={() => onListDensityChange('list')}
      >
        <IconList className={styles.listTypeIcon} />
      </button>
    </div>
  )
}
