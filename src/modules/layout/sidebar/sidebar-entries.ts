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
      trailingChevron?: boolean
    }
  | { kind: 'panel'; panel: SidebarPanel }

export const SIDEBAR_ENTRIES: SidebarEntry[] = [
  { kind: 'link', id: 'home', label: 'Bosh sahifa', Icon: IconHome },
  { kind: 'link', id: 'joriy-etish', label: 'Joriy etish koʻrsatkichlari', Icon: IconChart },
  {
    kind: 'panel',
    panel: {
      id: 'iqtisodiy',
      label: 'Iqtisodiy koʻrsatkichlar',
      Icon: IconStatistics,
      children: [
        { id: 'iq-balans', label: 'Iqtisodiy balans' },
        { id: 'iq-edo', label: 'EDO dan foydalanish' },
      ],
    },
  },
  { kind: 'link', id: 'ishlar-hisoboti', label: 'Qilingan ishlar hisoboti', Icon: IconReports },
  { kind: 'link', id: 'ishga-kelish', label: 'Ishga kelish hisoboti', Icon: IconList },
  { kind: 'link', id: 'moddiy-texnik', label: 'Moddiy texnik baza', Icon: IconDesignTools },
  { kind: 'link', id: 'admin', label: 'Administrator', Icon: IconDesignTools },
]

export const SIDEBAR_STATS: SidebarEntry[] = []
