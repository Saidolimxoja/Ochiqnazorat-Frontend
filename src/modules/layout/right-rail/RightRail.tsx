import { useMemo, useState } from 'react'
import type { ComponentType } from 'react'
import {
  IconBell,
  IconCalendar,
  IconChat1,
  IconChatRound,
  IconClipboard,
  IconGrid,
  IconHelp,
  IconSettings,
  IconUserId,
  IconWeatherSun,
} from '@/shared/ui/icons'
import { useEscapeKey } from '@/shared/hooks'
import styles from './RightRail.module.css'

type Props = {
  className?: string
}

type IconComp = ComponentType<{ className?: string }>

const ROUND_ACTIONS: ReadonlyArray<{
  id: string
  title: string
  ariaLabel: string
  Icon: IconComp
}> = [
  { id: 'bell', title: 'Bildirishnomalar', ariaLabel: 'Bildirishnomalar', Icon: IconBell },
  { id: 'calendar', title: 'Kalendar', ariaLabel: 'Kalendar', Icon: IconCalendar },
  { id: 'user-card', title: 'Profil kartasi', ariaLabel: 'Profil kartasi', Icon: IconUserId },
  { id: 'clipboard', title: 'Clipboard', ariaLabel: 'Clipboard', Icon: IconClipboard },
  { id: 'help', title: 'Yordam', ariaLabel: 'Yordam', Icon: IconHelp },
  { id: 'chat', title: 'Chat', ariaLabel: 'Chat', Icon: IconChatRound },
]

function RailCore({ settingsBtnId }: { settingsBtnId?: string }) {
  const y = useMemo(() => {
    const full = new Date().getFullYear()
    const s = String(full)
    return { first: s.slice(0, 2), second: s.slice(2) }
  }, [])

  return (
    <>
      <div className={styles.railTopBand}>
        <button
          type="button"
          id={settingsBtnId}
          className={styles.settingsBtn}
          title="Sozlamalar"
          aria-label="Sozlamalar"
        >
          <IconSettings className={styles.settingsIcon} />
        </button>
      </div>
      <div className={styles.stackTop}>
        {ROUND_ACTIONS.map(({ id, title, ariaLabel, Icon }) => (
          <button
            key={id}
            type="button"
            className={styles.roundBtn}
            title={title}
            aria-label={ariaLabel}
          >
            <Icon className={styles.roundIcon} />
          </button>
        ))}
        <div className={styles.divider} aria-hidden />
        <div className={styles.metaColumn}>
          <button
            type="button"
            className={styles.yearBtn}
            title="Yil"
            aria-label={`Yil ${y.first}${y.second}`}
          >
            <span className={styles.yearFirst}>{y.first}</span>
            <span className={styles.yearSecond}>{y.second}</span>
          </button>
          <button type="button" className={styles.weatherBtn} title="Ob-havo" aria-label="Ob-havo">
            <IconWeatherSun className={styles.weatherIcon} />
          </button>
        </div>
      </div>
      <button type="button" className={styles.chat1Btn} title="Chat" aria-label="Chat — keng">
        <IconChat1 className={styles.chat1Icon} />
      </button>
    </>
  )
}

export function RightRail({ className }: Props) {
  const [flyOpen, setFlyOpen] = useState(false)

  useEscapeKey(flyOpen, () => setFlyOpen(false))

  return (
    <aside className={[styles.rail, className].filter(Boolean).join(' ')} aria-label="O‘ng panel">
      {flyOpen ? (
        <button
          type="button"
          className={styles.mobileScrim}
          aria-label="Vositalarni yopish"
          onClick={() => setFlyOpen(false)}
        />
      ) : null}
      <div className={styles.desktopWrap}>
        <div className={styles.railInner}>
          <RailCore settingsBtnId="app-rail-settings-btn" />
        </div>
      </div>

      <div className={styles.mobileWrap}>
        <div
          className={styles.mobileFlyout}
          id="right-rail-flyout"
          role="dialog"
          aria-label="Qisqa vositalar"
          aria-hidden={!flyOpen}
          data-open={flyOpen || undefined}
        >
          <div className={styles.railInnerMobile}>
            <RailCore />
          </div>
        </div>
        <button
          type="button"
          className={styles.mobileFab}
          title="Vositalar"
          aria-label="Vositalar"
          aria-expanded={flyOpen}
          aria-controls="right-rail-flyout"
          onClick={() => setFlyOpen((v) => !v)}
        >
          <IconGrid className={styles.mobileFabIcon} />
        </button>
      </div>
    </aside>
  )
}
