'use client'

import { useEffect, useState } from 'react'
import { createClientComponentClient } from '@/lib/supabase'

export default function SupabaseConnectionTest() {
  const [connectionStatus, setConnectionStatus] = useState<{
    supabase: 'loading' | 'connected' | 'error'
    auth: 'loading' | 'connected' | 'error'
    database: 'loading' | 'connected' | 'error'
    error?: string
  }>({
    supabase: 'loading',
    auth: 'loading', 
    database: 'loading'
  })

  const resetAndTest = () => {
    setConnectionStatus({
      supabase: 'loading',
      auth: 'loading', 
      database: 'loading'
    })
    // Re-run the test
    setTimeout(testConnection, 100)
  }

  useEffect(() => {
    const testConnection = async () => {
      try {
        // Test 1: Environment variables check
        console.log('Checking environment variables...')
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
        const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
        
        if (!supabaseUrl || !supabaseKey) {
          setConnectionStatus(prev => ({ 
            ...prev, 
            supabase: 'error',
            error: 'Missing Supabase environment variables'
          }))
          return
        }
        
        console.log('Environment variables OK:', { 
          url: supabaseUrl?.substring(0, 20) + '...', 
          key: supabaseKey?.substring(0, 20) + '...' 
        })
        
        // Test 2: Create Supabase client
        console.log('Creating Supabase client...')
        const supabase = createClientComponentClient()
        setConnectionStatus(prev => ({ ...prev, supabase: 'connected' }))
        
        // Test 3: Auth connection
        console.log('Testing auth connection...')
        try {
          const { data: authData, error: authError } = await supabase.auth.getSession()
          if (authError) {
            console.error('Auth error:', authError)
            setConnectionStatus(prev => ({ ...prev, auth: 'error', error: `Auth: ${authError.message}` }))
          } else {
            console.log('Auth connection successful:', !!authData.session)
            setConnectionStatus(prev => ({ ...prev, auth: 'connected' }))
          }
        } catch (authErr) {
          console.error('Auth test failed:', authErr)
          setConnectionStatus(prev => ({ ...prev, auth: 'error', error: `Auth failed: ${authErr}` }))
        }
        
        // Test 4: Database connection (try to query profiles table)
        console.log('Testing database connection...')
        try {
          const { data: dbData, error: dbError } = await supabase
            .from('profiles')
            .select('count', { count: 'exact', head: true })
          
          if (dbError) {
            console.error('Database error:', dbError)
            // This is expected if tables don't exist yet
            if (dbError.code === 'PGRST116' || dbError.message.includes('relation "public.profiles" does not exist')) {
              setConnectionStatus(prev => ({ 
                ...prev, 
                database: 'error', 
                error: `Tables not created yet` 
              }))
            } else {
              setConnectionStatus(prev => ({ 
                ...prev, 
                database: 'error', 
                error: `DB: ${dbError.message}` 
              }))
            }
          } else {
            console.log('Database connection successful')
            setConnectionStatus(prev => ({ ...prev, database: 'connected' }))
          }
        } catch (dbErr) {
          console.error('Database test failed:', dbErr)
          setConnectionStatus(prev => ({ 
            ...prev, 
            database: 'error', 
            error: `DB failed: ${dbErr}` 
          }))
        }
        
      } catch (error) {
        console.error('Connection test error:', error)
        setConnectionStatus(prev => ({ 
          ...prev, 
          supabase: 'error',
          error: `Failed: ${error}` 
        }))
      }
    }

    // Add a small delay to ensure the page has loaded
    setTimeout(testConnection, 1000)
  }, [])

  const testConnection = async () => {
    try {
      // Test 1: Environment variables check
      console.log('Checking environment variables...')
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      
      if (!supabaseUrl || !supabaseKey) {
        setConnectionStatus(prev => ({ 
          ...prev, 
          supabase: 'error',
          auth: 'error',
          database: 'error',
          error: 'Missing Supabase environment variables'
        }))
        return
      }
      
      console.log('Environment variables OK')
      setConnectionStatus(prev => ({ ...prev, supabase: 'connected' }))
      
      // Test 2: Auth connection with timeout
      console.log('Testing auth connection...')
      try {
        const authTimeout = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Auth timeout')), 5000)
        )
        
        const supabase = createClientComponentClient()
        const authPromise = supabase.auth.getSession()
        
        const { data: authData, error: authError } = await Promise.race([
          authPromise,
          authTimeout
        ]) as unknown
        
        if (authError) {
          console.error('Auth error:', authError)
          setConnectionStatus(prev => ({ ...prev, auth: 'error', error: `Auth: ${authError.message}` }))
        } else {
          console.log('Auth connection successful:', !!authData.session)
          setConnectionStatus(prev => ({ ...prev, auth: 'connected' }))
        }
      } catch (authErr: any) {
        console.error('Auth test failed:', authErr)
        setConnectionStatus(prev => ({ 
          ...prev, 
          auth: 'error', 
          error: authErr.message?.includes('fetch') ? 'Network/CORS error' : `Auth failed: ${authErr.message}` 
        }))
      }
      
      // Test 3: Database connection with timeout
      console.log('Testing database connection...')
      try {
        const dbTimeout = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Database timeout')), 5000)
        )
        
        const supabase = createClientComponentClient()
        const dbPromise = supabase
          .from('profiles')
          .select('count', { count: 'exact', head: true })
        
        const { data: dbData, error: dbError } = await Promise.race([
          dbPromise,
          dbTimeout
        ]) as unknown
        
        if (dbError) {
          console.error('Database error:', dbError)
          // This is expected if tables don't exist yet
          if (dbError.code === 'PGRST116' || dbError.message?.includes('relation "public.profiles" does not exist')) {
            setConnectionStatus(prev => ({ 
              ...prev, 
              database: 'error', 
              error: `Tables not created yet` 
            }))
          } else {
            setConnectionStatus(prev => ({ 
              ...prev, 
              database: 'error', 
              error: `DB: ${dbError.message}` 
            }))
          }
        } else {
          console.log('Database connection successful')
          setConnectionStatus(prev => ({ ...prev, database: 'connected' }))
        }
      } catch (dbErr: any) {
        console.error('Database test failed:', dbErr)
        setConnectionStatus(prev => ({ 
          ...prev, 
          database: 'error', 
          error: dbErr.message?.includes('fetch') ? 'Network/CORS error' : `DB failed: ${dbErr.message}` 
        }))
      }
      
    } catch (error: any) {
      console.error('Connection test error:', error)
      setConnectionStatus(prev => ({ 
        ...prev, 
        supabase: 'error',
        auth: 'error',
        database: 'error',
        error: error.message?.includes('fetch') ? 'Network/CORS error - Check Supabase URL' : `Failed: ${error.message}` 
      }))
    }
  }

  return (
    <div className="fixed bottom-4 left-4 bg-blue-900 bg-opacity-90 text-white p-4 rounded-lg text-xs max-w-sm">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold">🔗 Connection Test</h3>
        <button 
          onClick={resetAndTest}
          className="bg-blue-600 hover:bg-blue-700 px-2 py-1 rounded text-xs"
        >
          ↻ Retry
        </button>
      </div>
      <div className="space-y-1">
        <div>
          Supabase: {' '}
          <span className={
            connectionStatus.supabase === 'connected' ? 'text-green-400' :
            connectionStatus.supabase === 'error' ? 'text-red-400' : 'text-yellow-400'
          }>
            {connectionStatus.supabase === 'connected' ? '✓ OK' :
             connectionStatus.supabase === 'error' ? '✗ Failed' : '⏳ Testing...'}
          </span>
        </div>
        
        <div>
          Auth: {' '}
          <span className={
            connectionStatus.auth === 'connected' ? 'text-green-400' :
            connectionStatus.auth === 'error' ? 'text-red-400' : 'text-yellow-400'
          }>
            {connectionStatus.auth === 'connected' ? '✓ OK' :
             connectionStatus.auth === 'error' ? '✗ Failed' : '⏳ Testing...'}
          </span>
        </div>
        
        <div>
          Database: {' '}
          <span className={
            connectionStatus.database === 'connected' ? 'text-green-400' :
            connectionStatus.database === 'error' ? 'text-red-400' : 'text-yellow-400'
          }>
            {connectionStatus.database === 'connected' ? '✓ OK' :
             connectionStatus.database === 'error' ? '✗ Failed' : '⏳ Testing...'}
          </span>
        </div>
        
        {connectionStatus.error && (
          <div className="text-red-300 text-xs mt-2 p-2 bg-red-900 bg-opacity-50 rounded">
            {connectionStatus.error}
          </div>
        )}
      </div>
    </div>
  )
} 