'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { Header } from '@/modules/layout/header'
import { Sidebar } from '@/modules/layout/sidebar'
import styles from './AppShell.module.css'

const SIDEBAR_AUTO_COLLAPSE_MQ = '(max-width: 960px)'

function readNarrowViewport(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia(SIDEBAR_AUTO_COLLAPSE_MQ).matches
}

type Props = {
  children: React.ReactNode
}

export function AppShellLayout({ children }: Props) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(readNarrowViewport)
  const [suppressLayoutTransition, setSuppressLayoutTransition] = useState(false)
  const userClosedSidebarRef = useRef(false)

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
              {children}
            </main>
            <Sidebar
              collapsed={sidebarCollapsed}
              layoutTransition={!suppressLayoutTransition}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
