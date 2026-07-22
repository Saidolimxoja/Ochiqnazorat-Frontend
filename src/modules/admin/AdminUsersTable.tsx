'use client'

import styles from './AdminUsersTable.module.css'
import type { User } from './AdminPanel'

type Props = {
  users: User[]
  onDeleteClick: (user: User) => void
  onToggleBlock: (user: User) => void
}

export function AdminUsersTable({ users, onDeleteClick, onToggleBlock }: Props) {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Пользователь</th>
            <th>Телефон</th>
            <th>Организация</th>
            <th>Роли</th>
            <th>Статус</th>
            <th>Создан</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan={6} className={styles.emptyRow}>
                Пользователи не найдены
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user.id}>
                <td>
                  <div className={styles.userCell}>
                    <span className={styles.userName}>{user.full_name}</span>
                    <span className={styles.userLogin}>@{user.username}</span>
                  </div>
                </td>
                <td>{user.phone_number || '—'}</td>
                <td>{user.org_name || '—'}</td>
                <td>
                  <div className={styles.rolesCell}>
                    {user.roles && user.roles.length > 0 ? (
                      user.roles.map((role) => (
                        <span key={role.name_of_role} className={styles.roleTag}>
                          {role.name_of_role}
                        </span>
                      ))
                    ) : (
                      <span className={styles.muted}>—</span>
                    )}
                  </div>
                </td>
                <td>
                  <span
                    className={`${styles.status} ${user.is_blocked ? styles.blocked : styles.active}`}
                  >
                    {user.is_blocked ? 'Заблокирован' : 'Активен'}
                  </span>
                </td>
                <td>{new Date(user.created_at).toLocaleDateString('ru-RU')}</td>
                <td>
                  <div className={styles.actionsCell}>
                    <button
                      className={user.is_blocked ? styles.unblockBtn : styles.blockBtn}
                      onClick={() => onToggleBlock(user)}
                    >
                      {user.is_blocked ? 'Разблокировать' : 'Блокировать'}
                    </button>
                    <button className={styles.deleteBtn} onClick={() => onDeleteClick(user)}>
                      Удалить
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
