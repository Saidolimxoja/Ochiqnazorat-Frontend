import { useEffect } from 'react'
import type { DocumentItem } from '@/shared/model/document'

export function useWorkspaceKeyboard(
  filtered: DocumentItem[],
  selectedId: string | null,
  onSelect: (id: string) => void,
) {
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
}
