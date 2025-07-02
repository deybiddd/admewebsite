'use client'

import { ReactNode } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { hasAnyRole } from '@/lib/auth-helpers'
import { Database } from '@/lib/database.types'

type Profile = Database['public']['Tables']['profiles']['Row']

interface ProtectedRouteProps {
  children: ReactNode
  requireAuth?: boolean
  requiredRoles?: Profile['role'][]
  fallback?: ReactNode
  loadingComponent?: ReactNode
}

export default function ProtectedRoute({ 
  children, 
  requireAuth = true,
  requiredRoles = [],
  fallback,
  loadingComponent
}: ProtectedRouteProps) {
  const { user, profile, loading } = useAuth()

  // Show loading state
  if (loading) {
    return loadingComponent || (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  // Check authentication requirement
  if (requireAuth && !user) {
    return fallback || (
      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6 text-center">
        <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.314 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-300 mb-2">
          Authentication Required
        </h3>
        <p className="text-yellow-700 dark:text-yellow-400">
          You need to sign in to access this content.
        </p>
      </div>
    )
  }

  // Check role requirements
  if (requiredRoles.length > 0 && !hasAnyRole(profile, requiredRoles)) {
    return fallback || (
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 text-center">
        <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-red-800 dark:text-red-300 mb-2">
          Access Denied
        </h3>
        <p className="text-red-700 dark:text-red-400">
          You don't have permission to access this content.
        </p>
        <p className="text-sm text-red-600 dark:text-red-500 mt-2">
          Required roles: {requiredRoles.join(', ')}
        </p>
      </div>
    )
  }

  // Render children if all checks pass
  return <>{children}</>
}

// Convenience components for common use cases
export function AdminOnly({ children, fallback }: { children: ReactNode; fallback?: ReactNode }) {
  return (
    <ProtectedRoute requiredRoles={['admin']} fallback={fallback}>
      {children}
    </ProtectedRoute>
  )
}

export function DeveloperOnly({ children, fallback }: { children: ReactNode; fallback?: ReactNode }) {
  return (
    <ProtectedRoute requiredRoles={['developer']} fallback={fallback}>
      {children}
    </ProtectedRoute>
  )
}

export function AdminOrDeveloper({ children, fallback }: { children: ReactNode; fallback?: ReactNode }) {
  return (
    <ProtectedRoute requiredRoles={['admin', 'developer']} fallback={fallback}>
      {children}
    </ProtectedRoute>
  )
}

export function AuthenticatedOnly({ children, fallback }: { children: ReactNode; fallback?: ReactNode }) {
  return (
    <ProtectedRoute requireAuth={true} fallback={fallback}>
      {children}
    </ProtectedRoute>
  )
} 