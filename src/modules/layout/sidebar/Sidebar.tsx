'use client'

import { startTransition, useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { SIDEBAR_ENTRIES, SIDEBAR_STATS, type SidebarEntry } from './sidebar-entries'
import { IconChevron } from '@/shared/ui/icons'
import styles from './Sidebar.module.css'

const TASK_MODULES: { id: string; label: string }[] = [
  { id: 'task-edo', label: 'EDO' },
  { id: 'task-kadr', label: 'Kadr' },
  { id: 'task-byudjet', label: 'Byudjet' },
]

const TASK_CHILD_IDS = new Set(TASK_MODULES.map((t) => t.id))

const ALL_ENTRIES: SidebarEntry[] = [...SIDEBAR_ENTRIES, ...SIDEBAR_STATS]

function parentPanelIdForLeaf(leafId: string): string | undefined {
  if (TASK_CHILD_IDS.has(leafId)) return TASK_PANEL_ID
  for (const e of ALL_ENTRIES) {
    if (e.kind === 'panel' && e.panel.children.some((c) => c.id === leafId)) {
      return e.panel.id
    }
  }
  return undefined
}

type Props = {
  collapsed: boolean
  layoutTransition?: boolean
  navActiveId: string | null
  onNavChange: (id: string | null) => void
}

export function Sidebar({ collapsed, layoutTransition = true, navActiveId, onNavChange }: Props) {
  const [openPanelId, setOpenPanelId] = useState<string | null>(() => {
    if (navActiveId == null) return null
    return parentPanelIdForLeaf(navActiveId) ?? null
  })
  const openPanelIdRef = useRef(openPanelId)

  useEffect(() => {
    openPanelIdRef.current = openPanelId
  }, [openPanelId])

  const togglePanel = useCallback(
    (id: string) => {
      const cur = openPanelIdRef.current
      const closing = cur === id

      if (closing && navActiveId != null && parentPanelIdForLeaf(navActiveId) === id) {
        onNavChange(null)
      }

      setOpenPanelId(closing ? null : id)
    },
    [navActiveId, onNavChange],
  )

  useEffect(() => {
    if (navActiveId == null) return
    const pid = parentPanelIdForLeaf(navActiveId)
    if (pid != null) {
      startTransition(() => setOpenPanelId(pid))
    }
  }, [navActiveId])

  const renderEntry = useCallback(
    (entry: SidebarEntry) => {
      if (entry.kind === 'link') {
        const Icon = entry.Icon
        const active = navActiveId != null && navActiveId === entry.id
        const row = entry.trailingChevron ? styles.navLinkSpread : undefined
        return (
          <button
            key={entry.id}
            type="button"
            className={[styles.navLink, row].filter(Boolean).join(' ')}
            data-active={active || undefined}
            onClick={() => onNavChange(entry.id)}
          >
            <span className={styles.navLinkStart}>
              <Icon className={styles.navIcon} />
              <span>{entry.label}</span>
            </span>
            {entry.trailingChevron ? (
              <IconChevron className={styles.linkChevron} down={false} />
            ) : null}
          </button>
        )
      }

      const { panel } = entry
      const open = openPanelId === panel.id
      const Icon = panel.Icon
      return (
        <div key={panel.id} className={styles.panelWrap}>
          <div className={styles.panelInner} data-open={open || undefined}>
            <button
              type="button"
              className={styles.panelHead}
              aria-expanded={open}
              onClick={() => togglePanel(panel.id)}
            >
              <span className={styles.panelHeadMain}>
                <Icon className={styles.navIcon} />
                <span>{panel.label}</span>
              </span>
              <IconChevron className={styles.panelChevron} down={open} aria-hidden />
            </button>
            {open ? (
              <ul className={styles.subList}>
                {panel.children.map((leaf) => {
                  const subActive = navActiveId != null && navActiveId === leaf.id
                  return (
                    <li key={leaf.id}>
                      <button
                        type="button"
                        className={styles.subLink}
                        data-active={subActive || undefined}
                        onClick={() => onNavChange(leaf.id)}
                      >
                        {leaf.label}
                      </button>
                    </li>
                  )
                })}
              </ul>
            ) : null}
          </div>
        </div>
      )
    },
    [navActiveId, openPanelId, togglePanel, onNavChange],
  )

  return (
    <div className={styles.sidebarHost} data-collapsed={collapsed || undefined}>
      <aside
        id="app-sidebar"
        className={styles.aside}
        aria-label="Asosiy navigatsiya"
        data-collapsed={collapsed || undefined}
        data-layout-transition={layoutTransition ? undefined : 'off'}
        aria-hidden={collapsed || undefined}
      >
        <div className={styles.brandRow}>
          <Link href="/" className={styles.brandLink} onClick={() => onNavChange('home')}>
            <img
              src="/images/brand-ochiq-nazorat.png"
              alt="Ochiq nazorat"
              className={styles.brandLogo}
              width={162}
              height={28}
              decoding="async"
            />
          </Link>
        </div>

        <nav className={styles.nav}>
          <h2 className={styles.sectionTitle}>Ichki hujjatlar</h2>
          <div className={styles.navGroup}>{SIDEBAR_ENTRIES.map(renderEntry)}</div>

          {SIDEBAR_STATS.length > 0 ? (
            <>
              <h2 className={styles.sectionTitle}>Statistika</h2>
              <div className={styles.navGroup}>{SIDEBAR_STATS.map(renderEntry)}</div>
            </>
          ) : null}
        </nav>
      </aside>
    </div>
  )
}
