'use client'

import { useState } from 'react'
import { Profile } from '@/lib/types/database'
import { updateUserRole, deleteUser } from './actions'

interface UserListProps {
  users: Profile[]
  currentUserId: string
}

export function UserList({ users, currentUserId }: UserListProps) {
  const [loading, setLoading] = useState<string | null>(null)

  const handleRoleChange = async (userId: string, newRole: 'admin' | 'staff') => {
    setLoading(userId)
    try {
      await updateUserRole(userId, newRole)
    } catch (error) {
      alert('Erro ao atualizar papel')
    } finally {
      setLoading(null)
    }
  }

  const handleDelete = async (userId: string) => {
    if (userId === currentUserId) {
      alert('Você não pode excluir sua própria conta')
      return
    }

    if (!confirm('Tem certeza que deseja excluir este usuário?')) return

    setLoading(userId)
    try {
      await deleteUser(userId)
    } catch (error) {
      alert('Erro ao excluir usuário')
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="divide-y divide-neutral-200">
      {users.map((user) => (
        <div key={user.id} className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-sm font-medium text-neutral-600">
              {user.name?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || '?'}
            </div>
            <div>
              <p className="text-sm font-medium text-neutral-900">
                {user.name || 'Sem nome'}
                {user.id === currentUserId && (
                  <span className="ml-2 text-[10px] bg-neutral-900 text-white px-1.5 py-0.5 rounded-full uppercase">
                    Você
                  </span>
                )}
              </p>
              <p className="text-xs text-neutral-500">{user.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <select
              value={user.role || 'staff'}
              onChange={(e) => handleRoleChange(user.id, e.target.value as 'admin' | 'staff')}
              disabled={loading === user.id || user.id === currentUserId}
              className="text-xs border border-neutral-200 rounded px-2 py-1 bg-white focus:outline-none focus:ring-2 focus:ring-neutral-900 disabled:opacity-50"
            >
              <option value="staff">Staff</option>
              <option value="admin">Admin</option>
            </select>

            <button
              onClick={() => handleDelete(user.id)}
              disabled={loading === user.id || user.id === currentUserId}
              className="text-xs text-red-500 hover:text-red-700 font-medium disabled:opacity-50"
            >
              {loading === user.id ? '...' : 'Excluir'}
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
