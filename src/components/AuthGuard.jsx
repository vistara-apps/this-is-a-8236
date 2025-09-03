import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Loader2 } from 'lucide-react'

const AuthGuard = ({ children, fallback = null }) => {
  const { isAuthenticated, loading, initializing } = useAuth()

  // Show loading spinner while initializing
  if (initializing || loading) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-accent mx-auto mb-4" />
          <p className="text-dark-text-secondary">Loading...</p>
        </div>
      </div>
    )
  }

  // Show fallback or redirect if not authenticated
  if (!isAuthenticated) {
    return fallback || <AuthRequired />
  }

  // Render children if authenticated
  return children
}

const AuthRequired = () => {
  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center">
      <div className="max-w-md w-full mx-auto p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-dark-text mb-4">
            Authentication Required
          </h1>
          <p className="text-dark-text-secondary mb-6">
            Please sign in to access this page.
          </p>
          <button
            onClick={() => window.location.href = '/login'}
            className="btn-primary w-full"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  )
}

export default AuthGuard
