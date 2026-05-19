import type { DocumentItem } from '@/shared/model/document'
import { WORKSPACE_PAGE_SIZE } from './workspace.config'
import type { FilterId } from './workspace.types'

export function filterDocuments(
  documents: DocumentItem[],
  query: string,
  activeFilter: FilterId,
): DocumentItem[] {
  const q = query.trim().toLowerCase()
  if (q) {
    return documents.filter(
      (d) =>
        d.summary.toLowerCase().includes(q) ||
        d.number.toLowerCase().includes(q) ||
        d.ref.toLowerCase().includes(q),
    )
  }
  if (activeFilter === 'all') return documents
  if (activeFilter === 'internal') return documents.filter((d) => d.category === 'Ichki')
  if (activeFilter === 'out') {
    return documents.filter(
      (d) => d.category === 'Chiquvchi' || d.ref.toLowerCase().includes('chiquv'),
    )
  }
  if (activeFilter === 'reply') return documents.filter((d) => d.category === 'Javob')
  return documents
}

export function paginateDocuments<T>(
  items: T[],
  page: number,
  pageSize = WORKSPACE_PAGE_SIZE,
) {
  const total = items.length
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const currentPage = Math.min(Math.max(1, page), totalPages)
  const start = (currentPage - 1) * pageSize
  const displayed = items.slice(start, start + pageSize)
  const pageRangeLabel = `${start + 1}-${Math.min(start + pageSize, total)} / ${total}`

  return { displayed, total, totalPages, currentPage, start, pageRangeLabel }
}
