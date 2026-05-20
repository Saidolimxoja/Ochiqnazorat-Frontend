import { useState, useCallback } from 'react'
import { ToastMessage, ToastType } from './Toast'

export function useToast() {
  const [toasts, setToasts] = useState<ToastMessage[]>([])

  const addToast = useCallback(
    (message: string, type: ToastType = 'info', duration: number = 4000) => {
      const id = Date.now().toString()
      const newToast: ToastMessage = {
        id,
        message,
        type,
        duration,
      }
      setToasts((prev) => [...prev, newToast])
      return id
    },
    []
  )

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  const success = useCallback(
    (message: string, duration?: number) => addToast(message, 'success', duration),
    [addToast]
  )

  const error = useCallback(
    (message: string, duration?: number) => addToast(message, 'error', duration || 5000),
    [addToast]
  )

  const loading = useCallback(
    (message: string) => addToast(message, 'loading', 0),
    [addToast]
  )

  const info = useCallback(
    (message: string, duration?: number) => addToast(message, 'info', duration),
    [addToast]
  )

  return {
    toasts,
    addToast,
    removeToast,
    success,
    error,
    loading,
    info,
  }
}
