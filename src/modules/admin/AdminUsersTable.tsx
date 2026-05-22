'use client'

import styles from './AdminUsersTable.module.css'
import type { User } from './AdminPanel'

type Props = {
  users: User[]
  onDeleteClick: (user: User) => void
}

export function AdminUsersTable({ users, onDeleteClick }: Props) {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Username</th>
            <th>Имя</th>
            <th>Телефон</th>
            <th>Организация</th>
            <th>Статус</th>
            <th>Дата создания</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan={7} className={styles.emptyRow}>
                Пользователи не найдены
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.username}</td>
                <td>{user.full_name}</td>
                <td>{user.phone_number || '-'}</td>
                <td>{user.org_name || '-'}</td>
                <td>
                  <span className={`${styles.status} ${user.is_blocked ? styles.blocked : styles.active}`}>
                    {user.is_blocked ? 'Заблокирован' : 'Активен'}
                  </span>
                </td>
                <td>{new Date(user.created_at).toLocaleDateString('ru-RU')}</td>
                <td>
                  <button className={styles.deleteBtn} onClick={() => onDeleteClick(user)}>
                    Удалить
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
