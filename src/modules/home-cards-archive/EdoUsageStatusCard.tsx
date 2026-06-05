'use client'

import { useEffect, useRef, useState } from 'react'
import {
  Briefcase,
  Building,
  Building2,
  Calendar,
  Check,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  FileText,
  Users,
} from 'lucide-react'
import shared from './styles/shared/card-base.module.css'
import styles from './EdoUsageStatusCard.module.css'

export function EdoUsageStatusCard() {
  const [dropdownOpen, setDropdownOpen] = useState(false)
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
    <div className={`${shared.card} ${styles.edoUsageCard}`}>
      <div className={`${shared.cardHeaderDark} ${styles.edoHeader}`}>
        <div className={shared.cardTitle}>«EDO»дан фойдаланиш ҳолати</div>
        <div className={shared.dropdownGroup}>
          <div className={`${shared.customDropdown} ${styles.edoDropdown}`} ref={dropdownRef}>
            <button
              type="button"
              className={`${shared.customSelect} ${styles.edoSelect}`}
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              Барчаси
              {dropdownOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            {dropdownOpen && (
              <div className={`${shared.dropdownMenu} ${styles.edoDropdownMenu}`}>
                <div className={`${shared.dropdownItem} ${shared.dropdownItemActive}`}>
                  Барчаси <Check size={16} color="#0ea5e9" />
                </div>
                <div className={shared.dropdownItem}>Э-Ҳуқуқшунос</div>
                <div className={shared.dropdownItem}>Рақамли маҳалла</div>
                <div className={shared.dropdownItem}>Токен</div>
                <div className={shared.dropdownItem}>
                  Ижро <ChevronUp size={16} />
                </div>
                <div
                  className={`${shared.dropdownItem} ${shared.dropdownItemActive} ${shared.dropdownSubItem}`}
                >
                  Ижро <Check size={16} color="#0ea5e9" />
                </div>
                <div className={`${shared.dropdownItem} ${shared.dropdownSubItem}`}>Ижро</div>
                <div className={`${shared.dropdownItem} ${shared.dropdownSubItem}`}>Ижро</div>
              </div>
            )}
          </div>
          <button type="button" className={`${shared.customSelect} ${styles.edoSelect}`}>
            <Calendar size={16} color="#64748b" />
            2025
            <ChevronDown size={16} />
          </button>
          <button type="button" className={`${shared.iconBtn} ${styles.edoIconBtn}`}>
            <ExternalLink size={18} />
          </button>
        </div>
      </div>

      <div className={styles.edoUsageBody}>
        <div className={styles.edoGrid}>
          <div className={styles.edoCard}>
            <div className={styles.edoCardHeader}>
              <div className={`${styles.edoIconBox} ${styles.edoIconGreen}`}>
                <Building2 size={28} />
              </div>
              <div className={styles.edoCardTitle}>Жами ташкилот</div>
            </div>
            <div className={styles.edoCardValue}>15 194</div>
          </div>

          <div className={styles.edoCard}>
            <div className={styles.edoCardHeader}>
              <div className={`${styles.edoIconBox} ${styles.edoIconPurple}`}>
                <Users size={28} />
              </div>
              <div className={styles.edoCardTitle}>Фойдаланувчилар</div>
            </div>
            <div className={styles.edoValueRow}>
              <div className={styles.edoCardValue}>9 000</div>
              <div className={styles.edoPercent}>23 %</div>
            </div>
          </div>
        </div>

        <div className={`${styles.edoCard} ${styles.edoContractCard}`}>
          <div className={styles.edoMetricHeader}>
            <div className={`${styles.edoIconBox} ${styles.edoIconBlue}`}>
              <FileText size={28} />
            </div>
            <div className={styles.edoCardTitle}>Шартномалар</div>
          </div>
          <div className={styles.edoContractStats}>
            <div className={styles.edoCardValue}>15 194</div>
          </div>
        </div>

        <div className={styles.edoSmallGrid}>
          <div className={styles.edoSmallCard}>
            <div className={styles.edoSmallCardHeader}>
              <div className={`${styles.edoIconBox} ${styles.edoIconRed} ${styles.edoSmallIcon}`}>
                <Building size={28} />
              </div>
              <div className={styles.edoSmallLabel}>Фойдаланмаётган ташкилотлар</div>
            </div>
            <div className={styles.edoSmallValue}>80 000</div>
          </div>

          <div className={styles.edoSmallCard}>
            <div className={styles.edoSmallCardHeader}>
              <div
                className={`${styles.edoIconBox} ${styles.edoIconOrange} ${styles.edoSmallIcon}`}
              >
                <Briefcase size={28} />
              </div>
              <div className={styles.edoSmallLabel}>Шартнома тузиб тизимдан фойдаланмаётганлар</div>
            </div>
            <div className={styles.edoSmallValue}>80 000</div>
          </div>

          <div className={styles.edoSmallCard}>
            <div className={styles.edoSmallCardHeader}>
              <div
                className={`${styles.edoIconBox} ${styles.edoIconIndigo} ${styles.edoSmallIcon}`}
              >
                <Building2 size={28} />
              </div>
              <div className={styles.edoSmallLabel}>Тизимдан фойдаланиб шартнома тузмаганлар</div>
            </div>
            <div className={styles.edoSmallValue}>80 000</div>
          </div>
        </div>
      </div>
    </div>
  )
}
