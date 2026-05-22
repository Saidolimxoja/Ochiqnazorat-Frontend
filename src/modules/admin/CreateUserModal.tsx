'use client'

import { useState } from 'react'
import styles from './CreateUserModal.module.css'
import type { User } from './AdminPanel'
import { usersApiClient } from '@/shared/api/users-api-client'

type Props = {
  onClose: () => void
  onCreateUser: (user: User) => void
  onError: (error: string) => void
}

export function CreateUserModal({ onClose, onCreateUser, onError }: Props) {
  const [formData, setFormData] = useState({
    email: '',
    first_name: '',
    last_name: '',
    phone: '',
    password: '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.email) newErrors.email = 'Email обязателен'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Некорректный email'

    if (!formData.first_name) newErrors.first_name = 'Имя обязательно'
    if (!formData.last_name) newErrors.last_name = 'Фамилия обязательна'
    if (!formData.password) newErrors.password = 'Пароль обязателен'
    else if (formData.password.length < 6) newErrors.password = 'Пароль должен быть минимум 6 символов'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    try {
      setLoading(true)
      const response = await usersApiClient.createUser({
        email: formData.email,
        first_name: formData.first_name,
        last_name: formData.last_name,
        phone: formData.phone || undefined,
        password: formData.password,
      })

      onCreateUser(response)
      setFormData({ email: '', first_name: '', last_name: '', phone: '', password: '' })
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Ошибка создания пользователя'
      onError(errorMessage)
      console.error('Failed to create user:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>Добавить нового пользователя</h2>
          <button className={styles.closeBtn} onClick={onClose} disabled={loading}>
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email *</label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={errors.email ? styles.inputError : ''}
              disabled={loading}
            />
            {errors.email && <span className={styles.error}>{errors.email}</span>}
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="first_name">Имя *</label>
              <input
                id="first_name"
                type="text"
                value={formData.first_name}
                onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                className={errors.first_name ? styles.inputError : ''}
                disabled={loading}
              />
              {errors.first_name && <span className={styles.error}>{errors.first_name}</span>}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="last_name">Фамилия *</label>
              <input
                id="last_name"
                type="text"
                value={formData.last_name}
                onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                className={errors.last_name ? styles.inputError : ''}
                disabled={loading}
              />
              {errors.last_name && <span className={styles.error}>{errors.last_name}</span>}
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="phone">Телефон</label>
            <input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+998..."
              disabled={loading}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">Пароль *</label>
            <input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className={errors.password ? styles.inputError : ''}
              disabled={loading}
            />
            {errors.password && <span className={styles.error}>{errors.password}</span>}
          </div>

          <div className={styles.actions}>
            <button type="button" className={styles.cancelBtn} onClick={onClose} disabled={loading}>
              Отмена
            </button>
            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? 'Создание...' : 'Создать пользователя'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
