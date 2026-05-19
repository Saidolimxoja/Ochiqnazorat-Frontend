import { useLayoutEffect, useRef } from 'react'
import { IconCalendar, IconChevron, IconGrid, IconList, IconSearch } from '@/shared/ui/icons'
import { DownloadGlyph, ExcelGlyph } from './edo-usage-glyphs'
import { EdoUsageTable } from './EdoUsageTable'
import { useEdoUsageRows } from './useEdoUsageRows'
import styles from './EconomicEdoUsage.module.css'

export function EconomicEdoUsage() {
  const tableScrollRef = useRef<HTMLDivElement>(null)
  const { rows, status, error } = useEdoUsageRows()

  useLayoutEffect(() => {
    const el = tableScrollRef.current
    if (el == null) return

    const EPS = 3

    const syncOverflowY = () => {
      const needsVerticalScroll = el.scrollHeight > el.clientHeight + EPS
      el.style.overflowY = needsVerticalScroll ? 'auto' : 'hidden'
    }

    syncOverflowY()

    const ro = new ResizeObserver(syncOverflowY)
    ro.observe(el)
    const table = el.querySelector('table')
    if (table != null) {
      ro.observe(table)
    }

    return () => ro.disconnect()
  }, [rows])

  return (
    <div className={styles.root}>
      <div className={styles.toolbarStack}>
        <header className={styles.toolbar}>
          <span className={styles.toolbarStart}>Respublika</span>
          <div className={styles.toolbarControls}>
            <label className={styles.searchField}>
              <span className="sr-only">Filter</span>
              <input
                type="search"
                className={styles.searchInput}
                placeholder="Filtr"
                autoComplete="off"
              />
              <IconSearch className={styles.searchGlyph} />
            </label>
            <button type="button" className={styles.pillSelect}>
              <span>Barchasi</span>
              <IconChevron className={styles.searchGlyph} down />
            </button>
            <button
              type="button"
              className={styles.yearButton}
              aria-label="Hisobot yili: 2025. Kalendar"
            >
              <span className={styles.yearButtonText}>2025</span>
              <IconCalendar className={styles.yearCalendarIcon} aria-hidden />
            </button>
          </div>
        </header>

        <div className={styles.subBar}>
          <div className={styles.subBarStart} role="tablist" aria-label="Ko‘rinish">
            <div className={styles.viewSwitch}>
              <button
                type="button"
                className={`${styles.viewSwitchBtn} ${styles.viewSwitchBtnActive}`}
              >
                <IconGrid className={styles.viewSwitchIcon} />
                Label
              </button>
              <button type="button" className={styles.viewSwitchBtn}>
                <IconList className={styles.viewSwitchIcon} />
                Label
              </button>
            </div>
          </div>
          <div className={styles.subBarEnd}>
            <button type="button" className={styles.actionBtn}>
              <ExcelGlyph className={styles.subBarGlyph} />
              Excel
            </button>
            <button type="button" className={styles.actionBtn}>
              <DownloadGlyph className={styles.subBarGlyph} />
              Yuklab olish
            </button>
          </div>
        </div>
      </div>

      {status === 'error' ? (
        <div className={styles.loadState} role="alert">
          Maʼlumotni yuklab bo‘lmadi. Keyinroq qayta urinib ko‘ring.
          {error instanceof Error ? ` (${error.message})` : null}
        </div>
      ) : null}

      <div
        ref={tableScrollRef}
        className={styles.tableScroll}
        role="region"
        aria-label="“EDO” dan foydalanish — hududlar"
        aria-busy={status === 'loading' || undefined}
      >
        {status === 'loading' && rows.length === 0 ? (
          <div className={styles.loadStateInfo}>Yuklanmoqda…</div>
        ) : (
          <EdoUsageTable rows={rows} />
        )}
      </div>
    </div>
  )
}
