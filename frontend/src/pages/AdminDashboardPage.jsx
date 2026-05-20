import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { userService, adminService } from '../services/api'
import { Button } from '../components/Button'
import { Card, Loading, EmptyState, Alert } from '../components/Common'
import { Modal } from '../components/Modal'
import { useAuthStore } from '../store/authStore'
import toast from 'react-hot-toast'

export const AdminDashboardPage = () => {
  const navigate = useNavigate()
  const { user } = useAuthStore()
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [actionModal, setActionModal] = useState({ isOpen: false, userId: null, action: null })
  const [acting, setActing] = useState(false)

  useEffect(() => {
    if (user?.role !== 'admin') {
      navigate('/')
    } else {
      fetchUsers()
    }
  }, [user, navigate])

  const fetchUsers = async () => {
    try {
      // Note: You may need to add a GET /admin-api/users endpoint to your backend
      setUsers([]) // Placeholder - implement fetching all users from backend
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleBlockUnblock = async () => {
    if (!actionModal.userId || !actionModal.action) return

    setActing(true)
    try {
      const isBlock = actionModal.action === 'block'
      const response = isBlock
        ? await adminService.blockUser(actionModal.userId)
        : await adminService.unblockUser(actionModal.userId)

      toast.success(`User ${isBlock ? 'blocked' : 'unblocked'} successfully`)
      setActionModal({ isOpen: false, userId: null, action: null })
      fetchUsers()
    } catch (err) {
      toast.error(err.response?.data?.message || err.message)
    } finally {
      setActing(false)
    }
  }

  if (loading) return <Loading text="Loading users..." />

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">Manage users and site content</p>
      </div>

      {error && <Alert message={error} type="error" />}

      {users.length === 0 ? (
        <EmptyState message="No users to manage" />
      ) : (
        <div className="grid gap-4">
          {users.map(u => (
            <Card key={u._id} className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-gray-800">{u.name}</h3>
                  <p className="text-sm text-gray-600">{u.email}</p>
                  <p className="text-sm text-gray-500 mt-1">Role: {u.role}</p>
                </div>
                <div className="flex gap-2">
                  {u.isActive ? (
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => setActionModal({ isOpen: true, userId: u._id, action: 'block' })}
                    >
                      Block User
                    </Button>
                  ) : (
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => setActionModal({ isOpen: true, userId: u._id, action: 'unblock' })}
                    >
                      Unblock User
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Modal
        isOpen={actionModal.isOpen}
        title={actionModal.action === 'block' ? 'Block User' : 'Unblock User'}
        confirmText={actionModal.action === 'block' ? 'Block' : 'Unblock'}
        onClose={() => setActionModal({ isOpen: false, userId: null, action: null })}
        onConfirm={handleBlockUnblock}
        type="confirm"
      >
        <p className="text-gray-700">
          Are you sure you want to {actionModal.action} this user?
        </p>
      </Modal>
    </div>
  )
}
