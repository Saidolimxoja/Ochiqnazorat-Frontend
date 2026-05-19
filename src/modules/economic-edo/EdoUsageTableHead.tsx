import type { ReactNode } from 'react'
import {
  IconBriefcase,
  IconChart,
  IconDocIncoming,
  IconDocOutgoing,
  IconList,
} from '@/shared/ui/icons'
import { InProgressRingGlyph, PinGlyph } from './edo-usage-glyphs'
import styles from './EconomicEdoUsage.module.css'

function ThMain({
  icon,
  children,
  layout = 'stack',
  className,
  ariaLabel,
}: {
  icon?: ReactNode
  children: ReactNode
  layout?: 'stack' | 'inline'
  className?: string
  ariaLabel?: string
}) {
  return (
    <th
      rowSpan={2}
      className={[styles.thMain, className].filter(Boolean).join(' ')}
      aria-label={ariaLabel}
    >
      <span className={layout === 'inline' ? styles.thMainInnerInline : styles.thMainInner}>
        {icon != null ? <span className={styles.thIconWrap}>{icon}</span> : null}
        <span className={layout === 'inline' ? styles.thMainLabelInline : styles.thMainLabel}>
          {children}
        </span>
      </span>
    </th>
  )
}

function ThSub({
  icon,
  children,
  className,
}: {
  icon?: ReactNode
  children: ReactNode
  className?: string
}) {
  return (
    <th className={[styles.thSub, className].filter(Boolean).join(' ')}>
      <span className={styles.thSubInner}>
        {icon != null ? <span className={styles.thSubIconWrap}>{icon}</span> : null}
        <span className={styles.thSubLabel}>{children}</span>
      </span>
    </th>
  )
}

export function EdoUsageTableHead() {
  return (
    <thead>
      <tr>
        <ThMain className={styles.thMainNo}>№</ThMain>
        <ThMain layout="inline" icon={<PinGlyph className={styles.thHeadIcon} />}>
          Hudud
        </ThMain>
        <ThMain
          layout="inline"
          ariaLabel="Umumiy foydalanuvchilar soni"
          icon={<InProgressRingGlyph className={styles.thHeadIconImg} />}
        >
          <>
            <span>Umumiy</span>
            <span>Foydalanuvchilar</span>
            <span>soni</span>
          </>
        </ThMain>
        <ThMain
          layout="inline"
          icon={<IconBriefcase className={styles.thHeadIcon} />}
          ariaLabel="Tashkilotlar umumiy soni"
        >
          <>
            <span>Tashkilotlar</span>
            <span>umumiy soni</span>
          </>
        </ThMain>
        <th colSpan={4} className={styles.thGroup}>
          Shundan
        </th>
        <th colSpan={4} className={styles.thGroup}>
          Shartnomalar
        </th>
        <th rowSpan={2} className={styles.thCorner} aria-label="Harakat" />
      </tr>
      <tr>
        <ThSub icon={<IconDocIncoming className={styles.thHeadIconSm} />}>
          Foydalanayotgan tashkilotlar soni
        </ThSub>
        <ThSub icon={<IconDocOutgoing className={styles.thHeadIconSm} />}>
          Foydalanmayotgan tashkilotlar soni
        </ThSub>
        <ThSub>Farqi</ThSub>
        <ThSub icon={<IconChart className={styles.thHeadIconSm} />}>Ko&apos;rsatkich</ThSub>
        <ThSub icon={<IconList className={styles.thHeadIconSm} />}>Soni</ThSub>
        <ThSub className={styles.thSubPct}>Tashkilotlarga nisbatan %</ThSub>
        <ThSub className={styles.thSubContract}>Tizimdan foydalanib shartnoma tuzmaganlar</ThSub>
        <ThSub className={styles.thSubContract}>Shartnoma tuzib tizimdan foydalanmayotganlar</ThSub>
      </tr>
    </thead>
  )
}
