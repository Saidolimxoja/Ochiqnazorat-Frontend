'use client'

import { RequireSession } from '@/shared/auth/RequireSession'
import { AppShellLayout } from '@/modules/shell/AppShellLayout'

type Props = {
  children: React.ReactNode
}

export default function AppLayout({ children }: Props) {
  return (
    <RequireSession>
      <AppShellLayout>{children}</AppShellLayout>
    </RequireSession>
  )
}
