'use client'

import { useCallback, useEffect, useState } from 'react'
import styles from './AdminPanel.module.css'
import { AdminUsersTable } from './AdminUsersTable'
import { CreateUserModal } from './CreateUserModal'
import { DeleteUserModal } from './DeleteUserModal'
import { usersApiClient, type UserResponse } from '@/shared/api/users-api-client'

export type User = UserResponse

export function AdminPanel() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const loadUsers = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await usersApiClient.getUsers(1, 100)
      setUsers(response.data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка загрузки пользователей')
      console.error('Failed to load users:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const response = await usersApiClient.getUsers(1, 100)
        if (!cancelled) setUsers(response.data)
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Ошибка загрузки пользователей')
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  const filteredUsers = users.filter(
    (user) =>
      (user.username?.toLowerCase().includes(searchQuery.toLowerCase()) || false) ||
      (user.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) || false),
  )

  const handleCreateUser = async () => {
    setShowCreateModal(false)
    await loadUsers()
  }

  const handleDeleteUser = async (userId: string, reason: string) => {
    try {
      await usersApiClient.deleteUser(userId, reason)
      setUsers(users.filter((u) => u.id !== userId))
      setShowDeleteModal(false)
      setSelectedUser(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка удаления пользователя')
    }
  }

  const handleToggleBlock = async (user: User) => {
    try {
      setError(null)
      const updated = user.is_blocked
        ? await usersApiClient.unblockUser(user.id)
        : await usersApiClient.blockUser(user.id)
      setUsers((prev) =>
        prev.map((u) => (u.id === user.id ? { ...u, is_blocked: updated.is_blocked } : u)),
      )
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка изменения статуса')
    }
  }

  const handleOpenDeleteModal = (user: User) => {
    setSelectedUser(user)
    setShowDeleteModal(true)
  }

  return (
    <div className={styles.adminPanel}>
      <div className={styles.header}>
        <h1 className={styles.title}>Администратор</h1>
        <button className={styles.createBtn} onClick={() => setShowCreateModal(true)}>
          + Добавить пользователя
        </button>
      </div>

      {error && <div className={styles.errorMessage}>{error}</div>}

      <div className={styles.searchBox}>
        <input
          type="text"
          placeholder="Поиск по имени или username..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={styles.searchInput}
        />
      </div>

      {loading ? (
        <div className={styles.loadingMessage}>Загрузка пользователей...</div>
      ) : (
        <AdminUsersTable
          users={filteredUsers}
          onDeleteClick={handleOpenDeleteModal}
          onToggleBlock={handleToggleBlock}
        />
      )}

      {showCreateModal && (
        <CreateUserModal
          onClose={() => setShowCreateModal(false)}
          onCreateUser={handleCreateUser}
          onError={setError}
        />
      )}

      {showDeleteModal && selectedUser && (
        <DeleteUserModal
          user={selectedUser}
          onClose={() => {
            setShowDeleteModal(false)
            setSelectedUser(null)
          }}
          onConfirmDelete={(reason) => handleDeleteUser(selectedUser.id, reason)}
        />
      )}
    </div>
  )
}
