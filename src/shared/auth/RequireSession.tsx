'use client'

import { useRouter } from 'next/navigation'
import { startTransition, useEffect, useState, type ReactNode } from 'react'
import { isAuthenticated } from './auth.service'

type Props = {
  children: ReactNode
}

export function RequireSession({ children }: Props) {
  const router = useRouter()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace('/login')
      return
    }
    startTransition(() => setReady(true))
  }, [router])

  if (!ready) return null

  return children
}
