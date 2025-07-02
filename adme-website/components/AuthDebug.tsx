import React, { useState } from 'react'

const AuthDebug: React.FC = () => {
  const [supabaseSession, setSupabaseSession] = useState<unknown>(null)

  const checkSupabaseSession = async () => {
    try {
      // Placeholder for checking supabase session
      setSupabaseSession('Session found')
    } catch (err: unknown) {
      console.error('Supabase session check failed:', err)
      setSupabaseSession(null)
    }
  }

  const signOut = async () => {
    try {
      // Placeholder for signing out
      console.log('Signing out')
    } catch (error: unknown) {
      console.error('❌ Sign out error:', error)
      // Still refresh even if there's an error
      window.location.reload()
    }
  }

  return (
    <div>
      {/* Render your component content here */}
    </div>
  )
}

export default AuthDebug 