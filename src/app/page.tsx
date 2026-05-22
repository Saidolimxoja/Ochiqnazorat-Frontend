'use client'

import { RequireSession } from '@/shared/auth/RequireSession'
import { AppShell } from '@/modules/shell'

export default function HomePage() {
  return (
    <RequireSession>
      <AppShell />
    </RequireSession>
  )
}
