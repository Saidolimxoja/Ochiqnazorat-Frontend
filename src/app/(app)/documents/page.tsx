'use client'

import { Workspace } from '@/modules/workspace'
import { useDocuments } from '@/shared/hooks'

export default function DocumentsPage() {
  const { documents, status, error } = useDocuments()

  if (status === 'error') {
    return (
      <div role="alert" style={{ padding: '20px', color: '#ef4444' }}>
        Hujjatlar royxati yuklanmadi.
        {error instanceof Error ? ` ${error.message}` : ''}
      </div>
    )
  }

  if (status === 'loading' && documents.length === 0) {
    return <div style={{ padding: '20px' }}>Hujjatlar yuklanmoqda…</div>
  }

  return <Workspace documents={documents} selectedId={null} onSelect={() => {}} />
}
