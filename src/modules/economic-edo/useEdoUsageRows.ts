import { startTransition, useEffect, useState } from 'react'
import { defaultEdoUsageRepository, type EdoUsageRepository } from './edo-usage.repository'
import type { EdoUsageRow } from './edo-usage.types'

type Status = 'idle' | 'loading' | 'ok' | 'error'

export function useEdoUsageRows(repository: EdoUsageRepository = defaultEdoUsageRepository) {
  const [rows, setRows] = useState<EdoUsageRow[]>([])
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState<unknown>(null)

  useEffect(() => {
    startTransition(() => {
      setStatus('loading')
    })
    const ac = new AbortController()
    repository
      .fetchUsageRows(ac.signal)
      .then((data) => {
        setRows(data)
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

  return { rows, status, error }
}
