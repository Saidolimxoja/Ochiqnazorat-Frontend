import { useEffect, useRef } from 'react'

export function usePointerOutsideMany(
  active: boolean,
  onOutside: () => void,
  getRoots: () => ReadonlyArray<Element | null | undefined>,
  event: 'click' | 'mousedown' = 'mousedown',
) {
  const onOutsideRef = useRef(onOutside)
  const getRootsRef = useRef(getRoots)
  useEffect(() => {
    onOutsideRef.current = onOutside
    getRootsRef.current = getRoots
  })

  useEffect(() => {
    if (!active) return
    function handler(e: MouseEvent) {
      const target = e.target as Node
      for (const root of getRootsRef.current()) {
        if (root != null && root.contains(target)) return
      }
      onOutsideRef.current()
    }
    document.addEventListener(event, handler)
    return () => document.removeEventListener(event, handler)
  }, [active, event])
}
