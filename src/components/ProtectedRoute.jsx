import { Navigate, useLocation } from 'react-router-dom'
import { useAppStore } from '../store/useAppStore'

export default function ProtectedRoute({ children, adminOnly = false }) {
  const { isAuthenticated, user } = useAppStore()
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (adminOnly && user?.role !== 'admin' && user?.uid !== 'admin_test') {
    // Basic fallback for mock admin testing
    return <Navigate to="/portfolio" replace />
  }

  return children
}
