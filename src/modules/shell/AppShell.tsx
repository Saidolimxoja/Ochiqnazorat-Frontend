import { useCallback, useEffect, useRef, useState } from 'react'
import { EconomicEdoUsage } from '@/modules/economic-edo/EconomicEdoUsage'
import { HomeDashboard } from '@/modules/home'
import { Header } from '@/modules/layout/header'
import { RightRail } from '@/modules/layout/right-rail'
import { Sidebar } from '@/modules/layout/sidebar'
import { Workspace } from '@/modules/workspace'
import { useDocuments } from '@/shared/hooks'
import styles from './AppShell.module.css'

const SIDEBAR_AUTO_COLLAPSE_MQ = '(max-width: 960px)'

function readNarrowViewport(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia(SIDEBAR_AUTO_COLLAPSE_MQ).matches
}

export function AppShell() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(readNarrowViewport)
  const [suppressLayoutTransition, setSuppressLayoutTransition] = useState(false)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [navId, setNavId] = useState<string | null>('home')
  const userClosedSidebarRef = useRef(false)

  const { documents, status: docStatus, error: docError } = useDocuments()

  const closeSidebar = useCallback(() => {
    userClosedSidebarRef.current = true
    setSuppressLayoutTransition(false)
    setSidebarCollapsed(true)
  }, [])

  const toggleSidebar = useCallback(() => {
    setSuppressLayoutTransition(false)
    setSidebarCollapsed((c) => {
      const next = !c
      userClosedSidebarRef.current = next
      return next
    })
  }, [])

  useEffect(() => {
    const mq = window.matchMedia(SIDEBAR_AUTO_COLLAPSE_MQ)
    const onChange = () => {
      setSuppressLayoutTransition(true)
      if (mq.matches) {
        setSidebarCollapsed(true)
        return
      }
      if (!userClosedSidebarRef.current) {
        setSidebarCollapsed(false)
      }
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    if (!suppressLayoutTransition) return
    let cancelled = false
    const id = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        if (!cancelled) setSuppressLayoutTransition(false)
      })
    })
    return () => {
      cancelled = true
      window.cancelAnimationFrame(id)
    }
  }, [suppressLayoutTransition])

  useEffect(() => {
    if (sidebarCollapsed) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') closeSidebar()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [sidebarCollapsed, closeSidebar])

  return (
    <div className={styles.root}>
      <div className={styles.appLoader} aria-hidden title="Yuklanmoqda" />
      <div className={styles.bg} aria-hidden role="presentation" />
      <div className={styles.scrim} aria-hidden />
      <div className={styles.toastRegion} aria-live="polite" aria-relevant="additions text" />
      <div className={styles.frame}>
        <div className={styles.wrapper}>
          {!sidebarCollapsed ? (
            <button
              type="button"
              className={styles.sidebarBackdrop}
              onClick={closeSidebar}
              aria-label="Chap panelni yopish"
            />
          ) : null}
          <div
            className={[styles.content, sidebarCollapsed ? 'close-sidebar' : '']
              .filter(Boolean)
              .join(' ')}
            data-collapsed={sidebarCollapsed || undefined}
            data-sidebar={sidebarCollapsed ? 'closed' : 'open'}
            data-layout-transition={suppressLayoutTransition ? 'off' : undefined}
          >
            <Header
              menuOpen={!sidebarCollapsed}
              onMenuToggle={toggleSidebar}
              compactMobileTray={!sidebarCollapsed}
            />
            <main className={styles.workspaceMain}>
              {navId === 'home' ? (
                <HomeDashboard />
              ) : navId === 'iq-edo' ? (
                <EconomicEdoUsage />
              ) : docStatus === 'error' ? (
                <div className={styles.dataError} role="alert">
                  Hujjatlar ro‘yxati yuklanmadi.
                  {docError instanceof Error ? ` ${docError.message}` : ''}
                </div>
              ) : docStatus === 'loading' && documents.length === 0 ? (
                <div className={styles.dataLoading} aria-busy>
                  Hujjatlar yuklanmoqda…
                </div>
              ) : (
                <Workspace documents={documents} selectedId={selectedId} onSelect={setSelectedId} />
              )}
            </main>
            <Sidebar
              collapsed={sidebarCollapsed}
              layoutTransition={!suppressLayoutTransition}
              navActiveId={navId}
              onNavChange={setNavId}
            />
          </div>
          <RightRail className={styles.rightMenu} />
        </div>
      </div>
    </div>
  )
}
