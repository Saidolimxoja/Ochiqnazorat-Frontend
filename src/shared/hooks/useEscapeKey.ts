import { useEffect, useRef } from 'react'

export function useEscapeKey(active: boolean, onEscape: () => void) {
  const cb = useRef(onEscape)
  useEffect(() => {
    cb.current = onEscape
  })

  useEffect(() => {
    if (!active) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') cb.current()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [active])
}
