'use client'

import { useAuth } from '@/contexts/AuthContext'
import { createClientComponentClient } from '@/lib/supabase'
import { useEffect, useState } from 'react'

export default function AuthDebug() {
  const { user, profile, session, loading, signOut } = useAuth()
  const [supabaseSession, setSupabaseSession] = useState<any>(null)
  const supabase = createClientComponentClient()

  useEffect(() => {
    const checkSupabaseSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()
        if (error) {
          console.error('Direct Supabase session error:', error)
          setSupabaseSession(null)
        } else {
          setSupabaseSession(session)
          console.log('Direct Supabase session check:', session)
        }
      } catch (err) {
        console.error('Supabase session check failed:', err)
        setSupabaseSession(null)
      }
    }
    checkSupabaseSession()
  }, [supabase])

  return (
    <div className="fixed bottom-4 right-4 bg-black bg-opacity-80 text-white p-4 rounded-lg text-xs max-w-sm">
      <h3 className="font-bold mb-2">🔍 Auth Debug</h3>
      <div className="space-y-1">
        <div>Loading: <span className={loading ? 'text-yellow-400' : 'text-green-400'}>{loading.toString()}</span></div>
        <div>User: <span className={user ? 'text-green-400' : 'text-red-400'}>{user ? '✓ Logged in' : '✗ Not logged in'}</span></div>
        <div>Profile: <span className={profile ? 'text-green-400' : 'text-red-400'}>{profile ? '✓ Loaded' : '✗ Missing'}</span></div>
        <div>Session: <span className={session ? 'text-green-400' : 'text-red-400'}>{session ? '✓ Active' : '✗ None'}</span></div>
        <div>Direct Check: <span className={supabaseSession ? 'text-green-400' : 'text-red-400'}>{supabaseSession ? '✓ Active' : '✗ None'}</span></div>
        {user && (
          <div className="text-xs text-gray-300 mt-2">
            Email: {user.email}
          </div>
        )}
        {profile && (
          <div className="text-xs text-gray-300">
            Role: {profile.role}
          </div>
        )}
        <div className="text-xs text-gray-400 mt-2 border-t border-gray-600 pt-2">
          <div>Env URL: {process.env.NEXT_PUBLIC_SUPABASE_URL ? '✓' : '✗'}</div>
          <div>Env Key: {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✓' : '✗'}</div>
        </div>
        {user && (
          <button 
            onClick={async () => {
              try {
                console.log('🔄 Force signing out...')
                
                // Step 1: Sign out from Supabase directly
                const { error } = await supabase.auth.signOut()
                if (error) {
                  console.error('Supabase sign out error:', error)
                } else {
                  console.log('✅ Supabase sign out completed')
                }
                
                // Step 2: Also try the context sign out
                await signOut()
                
                // Step 3: Clear all storage
                console.log('🧹 Clearing all storage...')
                localStorage.clear()
                sessionStorage.clear()
                
                // Step 4: Clear any remaining auth tokens
                const keys = Object.keys(localStorage)
                keys.forEach(key => {
                  if (key.includes('supabase') || key.includes('auth')) {
                    localStorage.removeItem(key)
                  }
                })
                
                console.log('✅ Force sign out completed - refreshing...')
                
                // Force page refresh
                setTimeout(() => {
                  window.location.href = window.location.href
                }, 500)
                
              } catch (error) {
                console.error('❌ Sign out error:', error)
                // Still refresh even if there's an error
                window.location.reload()
              }
            }}
            className="mt-2 bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded text-xs"
          >
            Force Sign Out
          </button>
        )}
      </div>
    </div>
  )
} 