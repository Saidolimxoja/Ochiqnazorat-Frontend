'use client'

import { useMemo, useState } from 'react'
import type { DocumentItem } from '@/shared/model/document'
import { WorkspaceDocumentDetail } from './WorkspaceDocumentDetail'
import { WorkspaceDocumentList } from './WorkspaceDocumentList'
import { WorkspaceToolbar } from './WorkspaceToolbar'
import { useWorkspaceKeyboard } from './useWorkspaceKeyboard'
import type { FilterId, ListDensity } from './workspace.types'
import { filterDocuments, paginateDocuments } from './workspace.utils'
import styles from './Workspace.module.css'

type Props = {
  documents: DocumentItem[]
  selectedId: string | null
  onSelect: (id: string) => void
}

export function Workspace({ documents, selectedId, onSelect }: Props) {
  const [activeFilter, setActiveFilter] = useState<FilterId>('all')
  const [listDensity, setListDensity] = useState<ListDensity>('grid')
  const [moreOpen, setMoreOpen] = useState(false)
  const [internalOpen, setInternalOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)

  const filtered = useMemo(
    () => filterDocuments(documents, query, activeFilter),
    [documents, query, activeFilter],
  )

  const { displayed, totalPages, currentPage, pageRangeLabel } = useMemo(
    () => paginateDocuments(filtered, page),
    [filtered, page],
  )

  const selected = documents.find((d) => d.id === selectedId) ?? null

  useWorkspaceKeyboard(filtered, selectedId, onSelect)

  const resetPage = () => setPage(1)

  return (
    <div className={styles.workspace}>
      <div className={styles.pad}>
        <WorkspaceToolbar
          query={query}
          onQueryChange={(value) => {
            setQuery(value)
            resetPage()
          }}
          activeFilter={activeFilter}
          onFilterChange={(filter) => {
            setActiveFilter(filter)
            resetPage()
          }}
          listDensity={listDensity}
          onListDensityChange={setListDensity}
          moreOpen={moreOpen}
          onMoreOpenChange={setMoreOpen}
          internalOpen={internalOpen}
          onInternalOpenChange={setInternalOpen}
        />

        <div className={styles.split}>
          <WorkspaceDocumentList
            documents={displayed}
            selectedId={selectedId}
            listDensity={listDensity}
            pageRangeLabel={pageRangeLabel}
            currentPage={currentPage}
            totalPages={totalPages}
            onSelect={onSelect}
            onPageChange={setPage}
          />
          <WorkspaceDocumentDetail selected={selected} />
        </div>
      </div>
    </div>
  )
}
