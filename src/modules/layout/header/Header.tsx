import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'

import { DEFAULT_SESSION_DISPLAY } from '@/shared/config/session-display'
import { useEscapeKey, usePointerOutsideMany } from '@/shared/hooks'
import { IconChevron, IconEye, IconExpand, IconMicrosoft, IconPhoto } from '@/shared/ui/icons'
import { signOut } from '@/shared/auth/auth.service'

import { HeaderUserAvatar } from './HeaderUserAvatar'
import styles from './Header.module.css'

const PROFILE_MENU_MOBILE_MQ = '(max-width: 960px)'

type Props = {
  onMenuToggle: () => void
  menuOpen: boolean
  compactMobileTray?: boolean
}

export function Header({ onMenuToggle, menuOpen, compactMobileTray = false }: Props) {
  const [now, setNow] = useState(() => new Date())
  const [profileMenuOpen, setProfileMenuOpen] = useState(false)
  const mobileProfileRef = useRef<HTMLDivElement>(null)
  const menuId = useId()
  const router = useRouter()

  const closeProfileMenu = useCallback(() => setProfileMenuOpen(false), [])

  const handleLogout = useCallback(() => {
    signOut()
    router.push('/login')
  }, [router])

  useEffect(() => {
    const t = window.setInterval(() => setNow(new Date()), 1000)
    return () => window.clearInterval(t)
  }, [])

  useEffect(() => {
    const mq = window.matchMedia(PROFILE_MENU_MOBILE_MQ)
    const onMq = () => {
      if (!mq.matches) setProfileMenuOpen(false)
    }
    mq.addEventListener('change', onMq)
    return () => mq.removeEventListener('change', onMq)
  }, [])

  useEscapeKey(profileMenuOpen, closeProfileMenu)
  const getProfileRoot = useCallback(() => [mobileProfileRef.current], [])
  usePointerOutsideMany(profileMenuOpen, closeProfileMenu, getProfileRoot, 'mousedown')

  const time = now.toLocaleTimeString('uz-UZ', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })

  const utilityRow = (
    <div className={styles.utilityIcons}>
      <button type="button" className={styles.iconBtn} aria-label="Rasmlar">
        <IconPhoto className={`${styles.headerGlyph} ${styles.headerIconPhoto}`} />
      </button>
      <button type="button" className={styles.iconBtn} aria-label="Ko‘rinish">
        <IconEye className={`${styles.headerGlyph} ${styles.headerIconEye}`} />
      </button>
      <button type="button" className={styles.iconBtn} aria-label="Kengaytirish">
        <IconExpand className={`${styles.headerGlyph} ${styles.headerIconExpand}`} />
      </button>
      <button type="button" className={styles.iconBtn} aria-label="Ilovalar">
        <IconMicrosoft className={`${styles.headerGlyph} ${styles.headerIconMicrosoft}`} />
      </button>
    </div>
  )

  const userBlock = (
    <button type="button" className={styles.user}>
      <HeaderUserAvatar className={styles.avatarImg} size={24} />
      <span className={styles.userName}>{DEFAULT_SESSION_DISPLAY.displayName}</span>
    </button>
  )

  const langBlock = (
    <button type="button" className={styles.langChip} title="Til" aria-label="Til: Oʻzbek tili">
      <img src="/images/11.svg" alt="" width={20} height={14} className={styles.flag} />
      <span className={styles.langLabel}>Oʻzbek tili</span>
      <IconChevron className={styles.langChevron} down />
    </button>
  )

  return (
    <header className={styles.header} data-compact-tray={compactMobileTray || undefined}>
      <div className={styles.left}>
        <button
          type="button"
          className={styles.burger}
          onClick={onMenuToggle}
          aria-expanded={menuOpen}
          aria-controls="app-sidebar"
          aria-label={menuOpen ? 'Chap panelni yopish' : 'Chap panelni ochish'}
        >
          <span className={styles.burgerLine} />
          <span
            className={`${styles.burgerLine} ${styles.burgerLineMiddle} ${
              menuOpen ? styles.burgerLineMiddleOpen : styles.burgerLineMiddleClosed
            }`}
          />
          <span className={styles.burgerLine} />
        </button>
      </div>

      <div className={styles.right}>
        <p className={styles.clock} aria-live="polite">
          {time}
        </p>

        <div className={`${styles.headerTools} ${styles.headerToolsDesk}`}>
          {utilityRow}
          <div className={styles.profileCluster}>
            {userBlock}
            {langBlock}
          </div>
        </div>

        <div className={styles.mobileProfileWrap} ref={mobileProfileRef}>
          <button
            type="button"
            className={styles.profileMenuTrigger}
            aria-expanded={profileMenuOpen}
            aria-haspopup="dialog"
            aria-controls={menuId}
            aria-label={profileMenuOpen ? 'Profil menyusini yopish' : 'Profil va sozlamalar'}
            onClick={() => setProfileMenuOpen((o) => !o)}
          >
            <HeaderUserAvatar className={styles.avatarImg} size={28} />
            <IconChevron
              className={styles.profileMenuTriggerChevron}
              down={!profileMenuOpen}
              aria-hidden
            />
          </button>
          {profileMenuOpen ? (
            <div
              className={styles.profileMenu}
              id={menuId}
              role="dialog"
              aria-label="Profil va sozlamalar"
            >
              <div className={styles.profileMenuUser}>
                <button type="button" className={`${styles.user} ${styles.userMenuFull}`}>
                  <HeaderUserAvatar className={styles.avatarImg} size={24} />
                  <span className={styles.userName}>{DEFAULT_SESSION_DISPLAY.displayName}</span>
                </button>
              </div>
              <div className={styles.profileMenuSection}>{utilityRow}</div>
              <div className={styles.profileMenuSection}>{langBlock}</div>
              <div className={styles.profileMenuSection}>
                <button
                  type="button"
                  className={styles.logoutBtn}
                  onClick={handleLogout}
                  aria-label="Chiqish"
                >
                  Chiqish
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  )
}
