'use client'

import { startTransition, useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SIDEBAR_ENTRIES, SIDEBAR_STATS, type SidebarEntry } from './sidebar-entries'
import { IconChevron } from '@/shared/ui/icons'
import styles from './Sidebar.module.css'

const ALL_ENTRIES: SidebarEntry[] = [...SIDEBAR_ENTRIES, ...SIDEBAR_STATS]

function parentPanelIdForLeaf(leafId: string): string | undefined {
  for (const e of ALL_ENTRIES) {
    if (e.kind === 'panel' && e.panel.children.some((c) => c.id === leafId)) {
      return e.panel.id
    }
  }
  return undefined
}

function getActiveIdFromPathname(pathname: string): string | null {
  const pathToId: Record<string, string> = {
    '/home': 'home',
    '/dashboard': 'joriy-etish',
    '/iq-edo': 'iq-edo',
    '/balance': 'iq-balans',
    '/reports': 'ishlar-hisoboti',
    '/attendance': 'ishga-kelish',
    '/resources': 'moddiy-texnik',
    '/admin': 'admin',
  }
  return pathToId[pathname] || null
}

type Props = {
  collapsed: boolean
  layoutTransition?: boolean
}

export function Sidebar({ collapsed, layoutTransition = true }: Props) {
  const pathname = usePathname()
  const [openPanelId, setOpenPanelId] = useState<string | null>(null)
  const openPanelIdRef = useRef(openPanelId)

  useEffect(() => {
    openPanelIdRef.current = openPanelId
  }, [openPanelId])

  const togglePanel = useCallback((id: string) => {
    const cur = openPanelIdRef.current
    const closing = cur === id
    setOpenPanelId(closing ? null : id)
  }, [])

  useEffect(() => {
    const activeId = getActiveIdFromPathname(pathname)
    if (activeId == null) return
    const pid = parentPanelIdForLeaf(activeId)
    if (pid != null) {
      startTransition(() => setOpenPanelId(pid))
    }
  }, [pathname])

  const renderEntry = useCallback(
    (entry: SidebarEntry) => {
      if (entry.kind === 'link') {
        const Icon = entry.Icon
        const activeId = getActiveIdFromPathname(pathname)
        const active = activeId === entry.id
        const row = entry.trailingChevron ? styles.navLinkSpread : undefined
        return (
          <Link
            key={entry.id}
            href={entry.href}
            className={[styles.navLink, row].filter(Boolean).join(' ')}
            data-active={active || undefined}
          >
            <span className={styles.navLinkStart}>
              <Icon className={styles.navIcon} />
              <span>{entry.label}</span>
            </span>
            {entry.trailingChevron ? (
              <IconChevron className={styles.linkChevron} down={false} />
            ) : null}
          </Link>
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
                  const activeId = getActiveIdFromPathname(pathname)
                  const subActive = activeId === leaf.id
                  return (
                    <li key={leaf.id}>
                      <Link
                        href={leaf.href || '#'}
                        className={styles.subLink}
                        data-active={subActive || undefined}
                      >
                        {leaf.label}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            ) : null}
          </div>
        </div>
      )
    },
    [pathname, openPanelId, togglePanel],
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
          <Link href="/home" className={styles.brandLink}>
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
