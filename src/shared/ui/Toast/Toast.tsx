'use client'

import { useEffect, useState } from 'react'
import styles from './Toast.module.css'

export type ToastType = 'success' | 'error' | 'loading' | 'info'

export interface ToastMessage {
  id: string
  message: string
  type: ToastType
  duration?: number
}

interface ToastProps {
  toasts: ToastMessage[]
  onRemove: (id: string) => void
}

export function Toast({ toasts, onRemove }: ToastProps) {
  return (
    <div className={styles.toastContainer}>
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onRemove={onRemove} />
      ))}
    </div>
  )
}

function ToastItem({ toast, onRemove }: { toast: ToastMessage; onRemove: (id: string) => void }) {
  useEffect(() => {
    if (toast.duration && toast.duration > 0) {
      const timer = setTimeout(() => onRemove(toast.id), toast.duration)
      return () => clearTimeout(timer)
    }
  }, [toast.id, toast.duration, onRemove])

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm-2 15l-5-5 1.41-1.41L8 12.17l7.59-7.59L17 6l-9 9z"
              fill="currentColor"
            />
          </svg>
        )
      case 'error':
        return (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm1 15h-2v-2h2v2zm0-4h-2V5h2v6z"
              fill="currentColor"
            />
          </svg>
        )
      case 'loading':
        return (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className={styles.spinner}>
            <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="2" fill="none" />
            <path d="M10 2a8 8 0 0 1 0 16" stroke="currentColor" strokeWidth="2" fill="none" />
          </svg>
        )
      default:
        return (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S14.33 6 13.5 6 12 6.67 12 7.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S7.33 6 6.5 6 5 6.67 5 7.5 5.67 9 6.5 9zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H4.89c.8 2.04 2.78 3.5 5.11 3.5z"
              fill="currentColor"
            />
          </svg>
        )
    }
  }

  return (
    <div className={`${styles.toast} ${styles[`toast-${toast.type}`]}`}>
      <div className={styles.icon}>{getIcon()}</div>
      <div className={styles.message}>{toast.message}</div>
      <button
        className={styles.close}
        onClick={() => onRemove(toast.id)}
        aria-label="Закрыть"
      >
        ✕
      </button>
    </div>
  )
}
