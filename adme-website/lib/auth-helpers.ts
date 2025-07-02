import { User } from '@supabase/supabase-js'
import { Database } from './database.types'

type Profile = Database['public']['Tables']['profiles']['Row']

/**
 * Check if user has a specific role
 */
export function hasRole(profile: Profile | null, role: Profile['role']): boolean {
  return profile?.role === role
}

/**
 * Check if user has any of the specified roles
 */
export function hasAnyRole(profile: Profile | null, roles: Profile['role'][]): boolean {
  return profile ? roles.includes(profile.role) : false
}

/**
 * Check if user is admin
 */
export function isAdmin(profile: Profile | null): boolean {
  return hasRole(profile, 'admin')
}

/**
 * Check if user is client
 */
export function isClient(profile: Profile | null): boolean {
  return hasRole(profile, 'client')
}

/**
 * Check if user is developer
 */
export function isDeveloper(profile: Profile | null): boolean {
  return hasRole(profile, 'developer')
}

/**
 * Check if user has admin or developer access
 */
export function hasAdminAccess(profile: Profile | null): boolean {
  return hasAnyRole(profile, ['admin', 'developer'])
}

/**
 * Get user display name (full name or email fallback)
 */
export function getUserDisplayName(user: User | null, profile: Profile | null): string {
  if (!user) return 'Guest'
  return profile?.full_name || user.email || 'Unknown User'
}

/**
 * Check if profile is complete (has required fields)
 */
export function isProfileComplete(profile: Profile | null): boolean {
  if (!profile) return false
  return !!(profile.full_name && profile.email)
}

/**
 * Get profile completion percentage
 */
export function getProfileCompletion(profile: Profile | null): number {
  if (!profile) return 0
  
  const fields = [
    profile.full_name,
    profile.email,
    profile.company_name,
    profile.phone,
    profile.avatar_url
  ]
  
  const completedFields = fields.filter(field => field && field.trim() !== '').length
  return Math.round((completedFields / fields.length) * 100)
}

/**
 * Format user role for display
 */
export function formatRole(role: Profile['role']): string {
  switch (role) {
    case 'admin':
      return 'Administrator'
    case 'developer':
      return 'Developer'
    case 'client':
      return 'Client'
    default:
      return 'Unknown'
  }
}

/**
 * Get role badge color for UI
 */
export function getRoleBadgeColor(role: Profile['role']): string {
  switch (role) {
    case 'admin':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
    case 'developer':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
    case 'client':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
  }
} 