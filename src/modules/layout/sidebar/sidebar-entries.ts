import type { ComponentType } from 'react'
import type { IconProps } from '@/shared/ui/icons'
import {
  IconChart,
  IconDesignTools,
  IconHome,
  IconList,
  IconReports,
  IconStatistics,
} from '@/shared/ui/icons'

export type SidebarLeaf = {
  id: string
  label: string
  href?: string
}

export type SidebarPanel = {
  id: string
  label: string
  Icon: ComponentType<IconProps>
  children: SidebarLeaf[]
}

export type SidebarEntry =
  | {
      kind: 'link'
      id: string
      label: string
      Icon: ComponentType<IconProps>
      href: string
      trailingChevron?: boolean
    }
  | { kind: 'panel'; panel: SidebarPanel }

export const SIDEBAR_ENTRIES: SidebarEntry[] = [
  { kind: 'link', id: 'home', label: 'Bosh sahifa', Icon: IconHome, href: '/home' },
  { kind: 'link', id: 'joriy-etish', label: 'Joriy etish koʻrsatkichlari', Icon: IconChart, href: '/dashboard' },
  {
    kind: 'panel',
    panel: {
      id: 'iqtisodiy',
      label: 'Iqtisodiy koʻrsatkichlar',
      Icon: IconStatistics,
      children: [
        { id: 'iq-balans', label: 'Iqtisodiy balans', href: '/balance' },
        { id: 'iq-edo', label: 'EDO dan foydalanish', href: '/iq-edo' },
      ],
    },
  },
  { kind: 'link', id: 'ishlar-hisoboti', label: 'Qilingan ishlar hisoboti', Icon: IconReports, href: '/reports' },
  { kind: 'link', id: 'ishga-kelish', label: 'Ishga kelish hisoboti', Icon: IconList, href: '/attendance' },
  { kind: 'link', id: 'moddiy-texnik', label: 'Moddiy texnik baza', Icon: IconDesignTools, href: '/resources' },
  { kind: 'link', id: 'admin', label: 'Administrator', Icon: IconDesignTools, href: '/admin' },
]

export const SIDEBAR_STATS: SidebarEntry[] = []
