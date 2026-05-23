'use client'

import { Check, ChevronDown, ChevronUp } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import shared from './styles/shared/card-base.module.css'

type DashboardScopeDropdownProps = {
  selectClassName?: string
  dropdownClassName?: string
  menuClassName?: string
}

export function DashboardScopeDropdown({
  selectClassName,
  dropdownClassName,
  menuClassName,
}: DashboardScopeDropdownProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [ijroExpanded, setIjroExpanded] = useState(true)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div
      className={`${shared.customDropdown} ${shared.dropdownHost} ${dropdownClassName ?? ''}`}
      ref={dropdownRef}
    >
      <button
        type="button"
        className={`${shared.customSelect} ${selectClassName ?? ''}`}
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        Барчаси
        <ChevronDown size={16} />
      </button>
      {dropdownOpen ? (
        <div className={`${shared.dropdownMenu} ${shared.dropdownElevated} ${menuClassName ?? ''}`}>
          <div className={`${shared.dropdownItem} ${shared.dropdownItemActive}`}>
            Барчаси <Check size={16} color="#0ea5e9" />
          </div>
          <div className={shared.dropdownItem}>Э-Ҳуқуқшунос</div>
          <div className={shared.dropdownItem}>Рақамли маҳалла</div>
          <div className={shared.dropdownItem}>Токен</div>
          <button
            type="button"
            className={`${shared.dropdownItem} ${shared.dropdownToggle}`}
            onClick={() => setIjroExpanded((expanded) => !expanded)}
          >
            Ижро
            {ijroExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          {ijroExpanded ? (
            <div className={shared.dropdownSubGroup}>
              <div
                className={`${shared.dropdownItem} ${shared.dropdownItemActive} ${shared.dropdownSubItem}`}
              >
                Ижро <Check size={16} color="#0ea5e9" />
              </div>
              <div className={`${shared.dropdownItem} ${shared.dropdownSubItem}`}>Ижро</div>
              <div className={`${shared.dropdownItem} ${shared.dropdownSubItem}`}>Ижро</div>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}
