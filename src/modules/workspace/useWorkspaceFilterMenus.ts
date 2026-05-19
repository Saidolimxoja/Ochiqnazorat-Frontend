import { useCallback, useRef } from 'react'
import { usePointerOutsideMany } from '@/shared/hooks'
import type { FilterId } from './workspace.types'

type Params = {
  moreOpen: boolean
  internalOpen: boolean
  onMoreOpenChange: (open: boolean) => void
  onInternalOpenChange: (open: boolean) => void
  onFilterChange: (filter: FilterId) => void
}

export function useWorkspaceFilterMenus({
  moreOpen,
  internalOpen,
  onMoreOpenChange,
  onInternalOpenChange,
  onFilterChange,
}: Params) {
  const moreRef = useRef<HTMLDivElement>(null)
  const internalRef = useRef<HTMLDivElement>(null)

  const closeDropdowns = useCallback(() => {
    onMoreOpenChange(false)
    onInternalOpenChange(false)
  }, [onMoreOpenChange, onInternalOpenChange])

  const getMenuRoots = useCallback(() => [internalRef.current, moreRef.current], [])

  usePointerOutsideMany(moreOpen || internalOpen, closeDropdowns, getMenuRoots, 'click')

  const selectFilter = useCallback(
    (filter: FilterId) => {
      onInternalOpenChange(false)
      onMoreOpenChange(false)
      onFilterChange(filter)
    },
    [onFilterChange, onInternalOpenChange, onMoreOpenChange],
  )

  return { moreRef, internalRef, selectFilter }
}
