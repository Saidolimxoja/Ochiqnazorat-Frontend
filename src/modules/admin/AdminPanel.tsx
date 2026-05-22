'use client'

import { useEffect, useState } from 'react'
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

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async () => {
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
  }

  const filteredUsers = users.filter(
    (user) =>
      (user.username?.toLowerCase().includes(searchQuery.toLowerCase()) || false) ||
      (user.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) || false),
  )

  const handleCreateUser = async (newUser: User) => {
    setUsers([...users, newUser])
    setShowCreateModal(false)
  }

  const handleDeleteUser = async (userId: string) => {
    try {
      await usersApiClient.deleteUser(userId)
      setUsers(users.filter((u) => u.id !== userId))
      setShowDeleteModal(false)
      setSelectedUser(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка удаления пользователя')
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
        <AdminUsersTable users={filteredUsers} onDeleteClick={handleOpenDeleteModal} />
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
          onConfirmDelete={() => handleDeleteUser(selectedUser.id)}
        />
      )}
    </div>
  )
}
