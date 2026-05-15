import { startTransition, useEffect, useState } from 'react'
import type { DocumentItem } from '@/shared/model/document'
import {
  defaultDocumentRepository,
  type DocumentRepository,
} from '@/shared/model/document.repository'

type Status = 'idle' | 'loading' | 'ok' | 'error'

export function useDocuments(repository: DocumentRepository = defaultDocumentRepository) {
  const [documents, setDocuments] = useState<DocumentItem[]>([])
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState<unknown>(null)

  useEffect(() => {
    startTransition(() => {
      setStatus('loading')
    })
    const ac = new AbortController()
    repository
      .fetchDocuments(ac.signal)
      .then((data) => {
        setDocuments(data)
        setError(null)
        setStatus('ok')
      })
      .catch((e) => {
        if ((e as { name?: string })?.name === 'AbortError') return
        setError(e)
        setStatus('error')
      })
    return () => ac.abort()
  }, [repository])

  return { documents, status, error }
}
