'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { User, Session, AuthError } from '@supabase/supabase-js'
import { createClientComponentClient } from '@/lib/supabase'
import { Database } from '@/lib/database.types'

type Profile = Database['public']['Tables']['profiles']['Row']

interface AuthContextType {
  user: User | null
  profile: Profile | null
  session: Session | null
  loading: boolean
  signUp: (email: string, password: string, userData?: { full_name?: string; company_name?: string }) => Promise<{ user: User | null; error: AuthError | null }>
  signIn: (email: string, password: string) => Promise<{ user: User | null; error: AuthError | null }>
  signOut: () => Promise<void>
  updateProfile: (updates: Partial<Profile>) => Promise<Profile | null>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  
  const supabase = createClientComponentClient()

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession()
      if (error) {
        console.error('Error getting session:', error)
      } else {
        setSession(session)
        setUser(session?.user ?? null)
        
        if (session?.user) {
          await fetchProfile(session.user.id)
        }
      }
      setLoading(false)
    }

    getInitialSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session)
        setUser(session?.user ?? null)
        
        if (session?.user) {
          await fetchProfile(session.user.id)
        } else {
          setProfile(null)
        }
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [supabase.auth])

  const fetchProfile = async (userId: string) => {
    setLoading(true); // Ensure loading is set
    try {
      console.log('[fetchProfile] Fetching profile for userId:', userId)
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) {
        console.error('[fetchProfile] Error fetching profile:', error, 'userId:', userId, 'message:', error.message, 'details:', error.details)
        // If profile doesn't exist, try to create it
        if (error.code === 'PGRST116' || error.message?.toLowerCase().includes('no rows')) {
          console.log('Profile not found, attempting to create one...')
          await createMissingProfile(userId)
        } else {
          setProfile(null)
        }
      } else if (!data) {
        // If no data returned, treat as missing profile
        console.log('Profile data is null, attempting to create one...')
        await createMissingProfile(userId)
      } else {
        setProfile(data)
      }
    } catch (error) {
      console.error('[fetchProfile] Exception:', error, 'userId:', userId)
      setProfile(null)
    } finally {
      setLoading(false)
    }
  }

  const createMissingProfile = async (userId: string) => {
    try {
      const { data: userData } = await supabase.auth.getUser()
      if (userData.user) {
        const { data, error } = await supabase
          .from('profiles')
          .insert({
            id: userId,
            email: userData.user.email || '',
            full_name: userData.user.user_metadata?.full_name || '',
            company_name: userData.user.user_metadata?.company_name || null,
            role: 'client',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          })
          .select()
          .single()

        if (error) {
          console.error('Error creating profile:', error)
        } else {
          console.log('Profile created successfully:', data)
          setProfile(data)
        }
      }
    } catch (error) {
      console.error('Error creating missing profile:', error)
    }
  }

  const signUp = async (email: string, password: string, userData?: { full_name?: string; company_name?: string }) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: userData?.full_name || '',
          company_name: userData?.company_name || '',
        },
      },
    })

    // Immediately create profile after successful sign-up
    if (data?.user && !error) {
      await createMissingProfile(data.user.id)
    }

    return { user: data?.user ?? null, error }
  }

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    return { user: data?.user ?? null, error }
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error('Error signing out:', error)
    }
  }

  const updateProfile = async (updates: Partial<Profile>): Promise<Profile | null> => {
    if (!user) {
      console.error('[updateProfile] No user found when updating profile')
      return null
    }
    try {
      console.log('[updateProfile] Updating profile for userId:', user.id, 'with updates:', updates)
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id)
        .select()
        .single()

      if (error) {
        console.error('[updateProfile] Error updating profile:', error, 'userId:', user.id, 'message:', error.message, 'details:', error.details)
        return null
      }

      setProfile(data)
      return data
    } catch (error) {
      console.error('[updateProfile] Exception:', error, 'userId:', user.id)
      return null
    }
  }

  const value = {
    user,
    profile,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    updateProfile,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 