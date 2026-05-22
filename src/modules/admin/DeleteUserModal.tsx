'use client'

import styles from './DeleteUserModal.module.css'
import type { User } from './AdminPanel'

type Props = {
  user: User
  onClose: () => void
  onConfirmDelete: () => void
}

export function DeleteUserModal({ user, onClose, onConfirmDelete }: Props) {
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>Удалить пользователя</h2>
          <button className={styles.closeBtn} onClick={onClose}>
            ✕
          </button>
        </div>

        <div className={styles.content}>
          <p className={styles.warning}>Вы уверены, что хотите удалить этого пользователя?</p>
          <div className={styles.userInfo}>
            <p>
              <strong>Username:</strong> {user.username}
            </p>
            <p>
              <strong>Имя:</strong> {user.full_name}
            </p>
            {user.phone_number && (
              <p>
                <strong>Телефон:</strong> {user.phone_number}
              </p>
            )}
            {user.org_name && (
              <p>
                <strong>Организация:</strong> {user.org_name}
              </p>
            )}
          </div>
        </div>

        <div className={styles.actions}>
          <button className={styles.cancelBtn} onClick={onClose}>
            Отмена
          </button>
          <button className={styles.deleteBtn} onClick={onConfirmDelete}>
            Удалить
          </button>
        </div>
      </div>
    </div>
  )
}
