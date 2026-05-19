import type { RefObject } from 'react'
import { IconChevron } from '@/shared/ui/icons'
import {
  INTERNAL_COUNT,
  INTERNAL_MENU,
  MAIN_FILTERS,
  MORE_COUNT,
  MORE_OPTIONS,
} from './workspace.config'
import type { FilterId } from './workspace.types'
import styles from './Workspace.module.css'

type Props = {
  activeFilter: FilterId
  selectFilter: (filter: FilterId) => void
  internalOpen: boolean
  onInternalOpenChange: (open: boolean) => void
  internalRef: RefObject<HTMLDivElement | null>
  moreOpen: boolean
  onMoreOpenChange: (open: boolean) => void
  moreRef: RefObject<HTMLDivElement | null>
}

export function WorkspaceFilterChips({
  activeFilter,
  selectFilter,
  internalOpen,
  onInternalOpenChange,
  internalRef,
  moreOpen,
  onMoreOpenChange,
  moreRef,
}: Props) {
  return (
    <div className={styles.chipsWrap} role="tablist" aria-label="Hujjat filtrlari">
      <div className={styles.tabPill}>
        {MAIN_FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            role="tab"
            aria-selected={activeFilter === f.id}
            className={styles.chip}
            data-active={activeFilter === f.id || undefined}
            onClick={() => selectFilter(f.id)}
          >
            <span>{f.label}</span>
            <span className={styles.chipCount}>{f.count}</span>
          </button>
        ))}
        <div className={styles.internalWrap} ref={internalRef}>
          <button
            type="button"
            role="tab"
            className={styles.chip}
            data-active={activeFilter === 'internal' || internalOpen || undefined}
            data-menu
            aria-expanded={internalOpen}
            aria-haspopup="menu"
            onClick={(e) => {
              e.stopPropagation()
              onInternalOpenChange(!internalOpen)
              selectFilter('internal')
            }}
          >
            <span>Ichki hujjatlar</span>
            <span className={styles.chipCount}>{INTERNAL_COUNT}</span>
            <IconChevron className={styles.chipChevron} down={internalOpen} />
          </button>
          {internalOpen ? (
            <ul className={styles.dropMenu} role="menu">
              {INTERNAL_MENU.map((label) => (
                <li key={label} role="none">
                  <button
                    type="button"
                    role="menuitem"
                    className={styles.dropItem}
                    onClick={() => onInternalOpenChange(false)}
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <div className={styles.moreWrap} ref={moreRef}>
          <button
            type="button"
            role="tab"
            className={styles.chip}
            data-menu
            data-dim
            data-active={moreOpen || undefined}
            aria-expanded={moreOpen}
            aria-haspopup="menu"
            onClick={(e) => {
              e.stopPropagation()
              onMoreOpenChange(!moreOpen)
            }}
          >
            <span>Boshqalar</span>
            <span className={styles.chipCount}>{MORE_COUNT}</span>
            <IconChevron className={styles.chipChevron} down={moreOpen} />
          </button>
          {moreOpen ? (
            <ul className={styles.dropMenu} role="menu">
              {MORE_OPTIONS.map((label) => (
                <li key={label} role="none">
                  <button
                    type="button"
                    role="menuitem"
                    className={styles.dropItem}
                    onClick={() => onMoreOpenChange(false)}
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </div>
  )
}
