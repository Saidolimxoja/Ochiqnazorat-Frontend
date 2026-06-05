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
    full_name: '',
    pinfl: '',
    birthday_date: '',
    phone_number: '',
    username: '',
    password: '',
    responsible_module: '',
    level: 'department',
    org_id: '',
    role_ids: [] as string[],
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.full_name) newErrors.full_name = 'ФИО обязательно'
    else if (formData.full_name.length > 255) newErrors.full_name = 'ФИО не должно быть длиннее 255 символов'

    if (!formData.pinfl) newErrors.pinfl = 'ПИНФЛ обязателен'
    else if (!/^\d{14}$/.test(formData.pinfl)) newErrors.pinfl = 'ПИНФЛ должен содержать 14 цифр'

    if (!formData.birthday_date) newErrors.birthday_date = 'Дата рождения обязательна'

    if (!formData.phone_number) newErrors.phone_number = 'Номер телефона обязателен'
    else if (formData.phone_number.length > 20) newErrors.phone_number = 'Номер телефона не должен быть длиннее 20 символов'

    if (!formData.username) newErrors.username = 'Имя пользователя обязательно'
    else if (formData.username.length < 3) newErrors.username = 'Имя пользователя должно быть минимум 3 символа'
    else if (formData.username.length > 100) newErrors.username = 'Имя пользователя не должно быть длиннее 100 символов'

    if (!formData.password) newErrors.password = 'Пароль обязателен'
    else if (formData.password.length < 6) newErrors.password = 'Пароль должен быть минимум 6 символов'

    if (!formData.responsible_module) newErrors.responsible_module = 'Ответственный модуль обязателен'
    else if (formData.responsible_module.length > 255) newErrors.responsible_module = 'Модуль не должен быть длиннее 255 символов'

    if (!formData.level) newErrors.level = 'Уровень доступа обязателен'

    if (!formData.org_id) newErrors.org_id = 'Организация обязательна'

    if (formData.role_ids.length === 0) newErrors.role_ids = 'Выберите минимум одну роль'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    try {
      setLoading(true)
      const response = await usersApiClient.createUser({
        full_name: formData.full_name,
        pinfl: formData.pinfl,
        birthday_date: formData.birthday_date,
        phone_number: formData.phone_number,
        username: formData.username,
        password: formData.password,
        responsible_module: formData.responsible_module,
        level: formData.level,
        org_id: formData.org_id,
        role_ids: formData.role_ids,
      })

      onCreateUser(response)
      setFormData({
        full_name: '',
        pinfl: '',
        birthday_date: '',
        phone_number: '',
        username: '',
        password: '',
        responsible_module: '',
        level: 'department',
        org_id: '',
        role_ids: [],
      })
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Ошибка создания пользователя'
      onError(errorMessage)
      console.error('Failed to create user:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleRoleChange = (roleId: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      role_ids: checked ? [...prev.role_ids, roleId] : prev.role_ids.filter((id) => id !== roleId),
    }))
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
            <label htmlFor="full_name">ФИО *</label>
            <input
              id="full_name"
              type="text"
              value={formData.full_name}
              onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
              className={errors.full_name ? styles.inputError : ''}
              disabled={loading}
              maxLength={255}
            />
            {errors.full_name && <span className={styles.error}>{errors.full_name}</span>}
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="pinfl">ПИНФЛ (14 цифр) *</label>
              <input
                id="pinfl"
                type="text"
                value={formData.pinfl}
                onChange={(e) => setFormData({ ...formData, pinfl: e.target.value.replace(/\D/g, '') })}
                className={errors.pinfl ? styles.inputError : ''}
                disabled={loading}
                maxLength={14}
                placeholder="12345678901234"
              />
              {errors.pinfl && <span className={styles.error}>{errors.pinfl}</span>}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="birthday_date">Дата рождения *</label>
              <input
                id="birthday_date"
                type="date"
                value={formData.birthday_date}
                onChange={(e) => setFormData({ ...formData, birthday_date: e.target.value })}
                className={errors.birthday_date ? styles.inputError : ''}
                disabled={loading}
              />
              {errors.birthday_date && <span className={styles.error}>{errors.birthday_date}</span>}
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="phone_number">Номер телефона *</label>
              <input
                id="phone_number"
                type="tel"
                value={formData.phone_number}
                onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                className={errors.phone_number ? styles.inputError : ''}
                disabled={loading}
                placeholder="+998901234567"
                maxLength={20}
              />
              {errors.phone_number && <span className={styles.error}>{errors.phone_number}</span>}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="username">Имя пользователя *</label>
              <input
                id="username"
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className={errors.username ? styles.inputError : ''}
                disabled={loading}
                maxLength={100}
                minLength={3}
              />
              {errors.username && <span className={styles.error}>{errors.username}</span>}
            </div>
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
              minLength={6}
            />
            {errors.password && <span className={styles.error}>{errors.password}</span>}
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="responsible_module">Ответственный модуль *</label>
              <input
                id="responsible_module"
                type="text"
                value={formData.responsible_module}
                onChange={(e) => setFormData({ ...formData, responsible_module: e.target.value })}
                className={errors.responsible_module ? styles.inputError : ''}
                disabled={loading}
                placeholder="Финансовый отдел"
                maxLength={255}
              />
              {errors.responsible_module && <span className={styles.error}>{errors.responsible_module}</span>}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="level">Уровень доступа *</label>
              <select
                id="level"
                value={formData.level}
                onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                className={errors.level ? styles.inputError : ''}
                disabled={loading}
              >
                <option value="department">Department</option>
                <option value="region">Region</option>
                <option value="district">District</option>
              </select>
              {errors.level && <span className={styles.error}>{errors.level}</span>}
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="org_id">Организация (UUID) *</label>
            <input
              id="org_id"
              type="text"
              value={formData.org_id}
              onChange={(e) => setFormData({ ...formData, org_id: e.target.value })}
              className={errors.org_id ? styles.inputError : ''}
              disabled={loading}
              placeholder="6a0b0ebf031ca00001453eb0"
            />
            {errors.org_id && <span className={styles.error}>{errors.org_id}</span>}
          </div>

          <div className={styles.formGroup}>
            <label>Роли *</label>
            <div className={styles.checkboxGroup}>
              <label>
                <input
                  type="checkbox"
                  checked={formData.role_ids.includes('admin')}
                  onChange={(e) => handleRoleChange('admin', e.target.checked)}
                  disabled={loading}
                />
                Администратор
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={formData.role_ids.includes('user')}
                  onChange={(e) => handleRoleChange('user', e.target.checked)}
                  disabled={loading}
                />
                Пользователь
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={formData.role_ids.includes('viewer')}
                  onChange={(e) => handleRoleChange('viewer', e.target.checked)}
                  disabled={loading}
                />
                Просмотр
              </label>
            </div>
            {errors.role_ids && <span className={styles.error}>{errors.role_ids}</span>}
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
