'use client'

import dynamic from 'next/dynamic'
import { RequireSession } from '@/shared/auth/RequireSession'

const AppShell = dynamic(() => import('@/modules/shell').then((mod) => mod.AppShell), {
  ssr: false,
})

export default function HomePage() {
  return (
    <RequireSession>
      <AppShell />
    </RequireSession>
  )
}
