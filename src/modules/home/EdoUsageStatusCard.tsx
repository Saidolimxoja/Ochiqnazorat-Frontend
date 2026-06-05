'use client'

import {
  Briefcase,
  Building,
  Building2,
  Calendar,
  ChevronDown,
  ExternalLink,
  FileText,
  Users,
} from 'lucide-react'
import { DASHBOARD_CARDS } from './dashboard-mode'
import { DashboardScopeDropdown } from './DashboardScopeDropdown'
import shared from './styles/shared/card-base.module.css'
import styles from './EdoUsageStatusCard.module.css'

export function EdoUsageStatusCard() {
  return (
    <div
      className={`${shared.card} ${styles.edoUsageCard}`}
      data-dashboard-card={DASHBOARD_CARDS.edo}
    >
      <div className={`${shared.cardHeaderDark} ${styles.edoHeader}`}>
        <div className={shared.cardTitle}>«EDO»дан фойдаланиш ҳолати</div>
        <div className={shared.dropdownGroup}>
          <DashboardScopeDropdown selectClassName={styles.edoSelect} />
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
