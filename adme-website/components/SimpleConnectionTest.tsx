'use client'

import { useState } from 'react'

export default function SimpleConnectionTest() {
  const [showDetails, setShowDetails] = useState(false)
  const [isRunning, setIsRunning] = useState(false)
  
  // Check environment variables
  const hasUrl = !!process.env.NEXT_PUBLIC_SUPABASE_URL
  const hasKey = !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
  const testManualConnection = async () => {
    console.log('🔄 Manual connection test started...')
    setShowDetails(true)
    setIsRunning(true)
    
    try {
      // Step 1: Import and create client
      console.log('📦 Importing Supabase client...')
      const { createClientComponentClient } = await import('@/lib/supabase')
      const supabase = createClientComponentClient()
      console.log('✅ Supabase client created successfully')
      
      // Step 2: Test auth connection
      console.log('🔐 Testing auth connection...')
      const { data, error } = await supabase.auth.getSession()
      console.log('📊 Auth check result:', { 
        hasSession: !!data.session, 
        userEmail: data.session?.user?.email || 'None',
        error: error?.message || 'None'
      })
      
      // Step 3: Test database connection
      console.log('🗄️ Testing database connection...')
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('count', { count: 'exact', head: true })
      
      console.log('📈 Database test result:', {
        success: !profileError,
        error: profileError?.message || 'None',
        expectedError: profileError?.code === 'PGRST116' ? 'Yes (tables not created)' : 'No'
      })
      
      console.log('🎉 Connection test completed! Check results above.')
      
    } catch (error: any) {
      console.error('❌ Manual connection test failed:', error)
      console.log('🔍 Error details:', {
        message: error.message,
        name: error.name,
        stack: error.stack?.substring(0, 200) + '...'
      })
    } finally {
      setIsRunning(false)
    }
  }

  return (
    <div className="fixed bottom-4 left-4 bg-gray-900 bg-opacity-90 text-white p-4 rounded-lg text-xs max-w-sm">
      <h3 className="font-bold mb-2">🔗 Simple Status</h3>
      <div className="space-y-1">
        <div>
          Environment: {' '}
          <span className={hasUrl && hasKey ? 'text-green-400' : 'text-red-400'}>
            {hasUrl && hasKey ? '✓ OK' : '✗ Missing vars'}
          </span>
        </div>
        
        <div>
          Status: {' '}
          <span className="text-blue-400">
            Ready for testing
          </span>
        </div>
        
        <button 
          onClick={testManualConnection}
          disabled={isRunning}
          className={`mt-2 px-2 py-1 rounded text-xs w-full ${
            isRunning 
              ? 'bg-yellow-600 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isRunning ? '🔄 Testing...' : 'Test Connection'}
        </button>
        
        {showDetails && (
          <div className="mt-2 text-xs text-gray-300 border-t border-gray-600 pt-2">
            <div className="font-bold text-yellow-400">📋 Instructions:</div>
            <div>1. Open Console (F12)</div>
            <div>2. Look for colored emoji logs</div>
            <div>3. Check connection results</div>
          </div>
        )}
      </div>
    </div>
  )
} 