import { useCallback, useEffect, useRef, useState } from 'react'
import type { DocumentItem } from '@/shared/model/document'
import { usePointerOutsideMany } from '@/shared/hooks'
import { IconChevron, IconGrid, IconList, IconSearch } from '@/shared/ui/icons'
import styles from './Workspace.module.css'
import { WorkspaceItem } from './WorkspaceItem'

const MAIN_FILTERS = [
  { id: 'all', label: 'Barchasi', count: 24 },
  { id: 'out', label: 'Chiquvchi hujjatlar', count: 3 },
  { id: 'reply', label: 'Javob xati', count: 15 },
] as const

const INTERNAL_COUNT = 0
const INTERNAL_MENU = ['Bajarilgan', 'Jarayonda', 'Barchasi'] as const

const MORE_COUNT = 6
const MORE_OPTIONS = [
  'Navbatcha hisobotlar',
  'Kiruvchi arxiv',
  'Chiquvchi arxiv',
  'ID bo‘yicha',
  'Maxsus filtr',
  'Eksport',
] as const

type MainFilterId = (typeof MAIN_FILTERS)[number]['id']
type FilterId = MainFilterId | 'internal'

type Props = {
  documents: DocumentItem[]
  selectedId: string | null
  onSelect: (id: string) => void
}

export function Workspace({ documents, selectedId, onSelect }: Props) {
  const [activeFilter, setActiveFilter] = useState<FilterId>('all')
  const [listDensity, setListDensity] = useState<'grid' | 'list'>('grid')
  const [moreOpen, setMoreOpen] = useState(false)
  const [internalOpen, setInternalOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const pageSize = 20
  const moreRef = useRef<HTMLDivElement>(null)
  const internalRef = useRef<HTMLDivElement>(null)

  const closeDropdowns = useCallback(() => {
    setMoreOpen(false)
    setInternalOpen(false)
  }, [])

  const getMenuRoots = useCallback(() => [internalRef.current, moreRef.current], [])

  usePointerOutsideMany(moreOpen || internalOpen, closeDropdowns, getMenuRoots, 'click')

  const filtered = documents.filter((d) => {
    const q = query.trim().toLowerCase()
    if (q) {
      return (
        d.summary.toLowerCase().includes(q) ||
        d.number.toLowerCase().includes(q) ||
        d.ref.toLowerCase().includes(q)
      )
    }
    if (activeFilter === 'all') return true
    if (activeFilter === 'internal') return d.category === 'Ichki'
    if (activeFilter === 'out')
      return d.category === 'Chiquvchi' || d.ref.toLowerCase().includes('chiquv')
    if (activeFilter === 'reply') return d.category === 'Javob'
    return true
  })

  const total = filtered.length
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const currentPage = Math.min(Math.max(1, page), totalPages)
  const start = (currentPage - 1) * pageSize
  const displayed = filtered.slice(start, start + pageSize)

  const selected = documents.find((d) => d.id === selectedId) ?? null
  const pageRangeLabel = `${start + 1}-${Math.min(start + pageSize, total)} / ${total}`

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (!['ArrowDown', 'ArrowUp'].includes(e.key)) return
      e.preventDefault()
      if (filtered.length === 0) return
      const idx = filtered.findIndex((d) => d.id === selectedId)
      if (e.key === 'ArrowDown') {
        const next = filtered[Math.min(filtered.length - 1, Math.max(0, idx + 1))]
        if (next) onSelect(next.id)
      } else if (e.key === 'ArrowUp') {
        const prev = filtered[Math.max(0, idx - 1) || 0]
        if (prev) onSelect(prev.id)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [filtered, selectedId, onSelect])

  return (
    <div className={styles.workspace}>
      <div className={styles.pad}>
        <div className={styles.toolColumn}>
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
                  onChange={(e) => {
                    setQuery(e.target.value)
                    setPage(1)
                  }}
                />
                <IconSearch className={styles.searchGlyph} />
              </label>
            </form>
          </div>

          <div className={styles.chipsRow}>
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
                    onClick={() => {
                      setInternalOpen(false)
                      setMoreOpen(false)
                      setActiveFilter(f.id)
                      setPage(1)
                    }}
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
                      setInternalOpen((v) => !v)
                      setActiveFilter('internal')
                      setPage(1)
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
                            onClick={() => setInternalOpen(false)}
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
                      setMoreOpen((v) => !v)
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
                            onClick={() => setMoreOpen(false)}
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
            <div className={styles.listType} role="group" aria-label="Ko‘rinish turi">
              <button
                type="button"
                className={styles.listTypeBtn}
                data-active={listDensity === 'grid' || undefined}
                aria-pressed={listDensity === 'grid'}
                aria-label="Panjara"
                onClick={() => setListDensity('grid')}
              >
                <IconGrid className={styles.listTypeIcon} />
              </button>
              <button
                type="button"
                className={styles.listTypeBtn}
                data-active={listDensity === 'list' || undefined}
                aria-pressed={listDensity === 'list'}
                aria-label="Ro‘yxat"
                onClick={() => setListDensity('list')}
              >
                <IconList className={styles.listTypeIcon} />
              </button>
            </div>
          </div>
        </div>

        <div className={styles.split}>
          <section
            className={styles.listCol}
            aria-label="Hujjatlar ro‘yxati"
            data-density={listDensity}
          >
            <ul className={styles.list}>
              {displayed.map((doc) => (
                <WorkspaceItem
                  key={doc.id}
                  doc={doc}
                  selected={doc.id === selectedId}
                  onSelect={onSelect}
                />
              ))}
            </ul>
            <div className={styles.pagination}>
              <span className={styles.pageInfo}>{pageRangeLabel}</span>
              <div className={styles.pageBtns}>
                <button
                  type="button"
                  className={styles.pageBtn}
                  disabled={currentPage <= 1}
                  aria-label="Oldingi sahifa"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                >
                  ‹
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    type="button"
                    className={styles.pageBtn}
                    aria-current={p === currentPage ? 'page' : undefined}
                    onClick={() => setPage(p)}
                  >
                    {p}
                  </button>
                ))}
                <button
                  type="button"
                  className={styles.pageBtn}
                  disabled={currentPage >= totalPages}
                  aria-label="Keyingi sahifa"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                >
                  ›
                </button>
              </div>
            </div>
          </section>

          <section className={styles.detailCol} aria-label="Tanlangan hujjat">
            {selected ? (
              <div className={styles.detail}>
                <header className={styles.detailHead}>
                  <h1 className={styles.detailTitle}>{selected.number}</h1>
                  <span className={styles.detailChip}>{selected.status}</span>
                  <span className={styles.detailChipMuted}>{selected.category}</span>
                </header>
                <p className={styles.detailMeta}>Oxirgi yangilanish: {selected.dateShort}</p>
                <div className={styles.detailBody}>
                  <p>{selected.summary}</p>
                  <p className={styles.placeholder}>
                    To‘liq matn, biriktirilgan fayllar, imzo bosqichlari va boshqa tafsilotlar shu
                    blokda chiqariladi.
                  </p>
                </div>
                <div className={styles.actions}>
                  <button type="button" className={styles.btnPrimary}>
                    Ko‘rib chiqish
                  </button>
                  <button type="button" className={styles.btnGhost}>
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
        </div>
      </div>
    </div>
  )
}
