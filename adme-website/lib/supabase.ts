import { createClient } from '@supabase/supabase-js'
import { createBrowserClient } from '@supabase/ssr'
import { Database } from './database.types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Client-side Supabase client
export const createClientComponentClient = () =>
  createBrowserClient<Database>(supabaseUrl, supabaseAnonKey)

// Legacy client for backward compatibility
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey) 