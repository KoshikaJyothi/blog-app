import { Navigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { Loading } from './Common'

export const ProtectedRoute = ({ children, requiredRole = null }) => {
  const { isAuthenticated, user, initialized } = useAuthStore()

  // Wait for auth initialization
  if (!initialized) {
    return <Loading text="Checking authentication..." />
  }
  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  // If a specific role is required and user doesn't have it, redirect to unauthorized
  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/unauthorized" replace />
  }

  return children
}

export const PublicRoute = ({ children }) => {
  const { isAuthenticated, initialized } = useAuthStore()

  // Wait for auth initialization
  if (!initialized) {
    return <Loading text="Loading..." />
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return children
}
