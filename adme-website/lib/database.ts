import { createClientComponentClient, createServerComponentClient } from './supabase'
import { Database } from './database.types'
import { cookies } from 'next/headers'

type Tables = Database['public']['Tables']
type Profile = Tables['profiles']['Row']
type Service = Tables['services']['Row']
type Project = Tables['projects']['Row']
type ContactInquiry = Tables['contact_inquiries']['Row']

// Client-side database operations
export class DatabaseClient {
  private supabase = createClientComponentClient()

  // Profile operations
  async getProfile(userId: string): Promise<Profile | null> {
    const { data, error } = await this.supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()

    if (error) {
      console.error('Error fetching profile:', error)
      return null
    }
    return data
  }

  async updateProfile(userId: string, updates: Tables['profiles']['Update']): Promise<Profile | null> {
    const { data, error } = await this.supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single()

    if (error) {
      console.error('Error updating profile:', error)
      return null
    }
    return data
  }

  async createProfile(profile: Tables['profiles']['Insert']): Promise<Profile | null> {
    const { data, error } = await this.supabase
      .from('profiles')
      .insert(profile)
      .select()
      .single()

    if (error) {
      console.error('Error creating profile:', error)
      return null
    }
    return data
  }

  // Service operations
  async getServices(): Promise<Service[]> {
    const { data, error } = await this.supabase
      .from('services')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true })

    if (error) {
      console.error('Error fetching services:', error)
      return []
    }
    return data || []
  }

  async getService(id: string): Promise<Service | null> {
    const { data, error } = await this.supabase
      .from('services')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error('Error fetching service:', error)
      return null
    }
    return data
  }

  // Project operations
  async getProjects(clientId?: string): Promise<Project[]> {
    let query = this.supabase.from('projects').select('*')
    
    if (clientId) {
      query = query.eq('client_id', clientId)
    }

    const { data, error } = await query.order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching projects:', error)
      return []
    }
    return data || []
  }

  async createProject(project: Tables['projects']['Insert']): Promise<Project | null> {
    const { data, error } = await this.supabase
      .from('projects')
      .insert(project)
      .select()
      .single()

    if (error) {
      console.error('Error creating project:', error)
      return null
    }
    return data
  }

  async updateProject(id: string, updates: Tables['projects']['Update']): Promise<Project | null> {
    const { data, error } = await this.supabase
      .from('projects')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error updating project:', error)
      return null
    }
    return data
  }

  // Contact inquiry operations
  async createContactInquiry(inquiry: Tables['contact_inquiries']['Insert']): Promise<ContactInquiry | null> {
    const { data, error } = await this.supabase
      .from('contact_inquiries')
      .insert(inquiry)
      .select()
      .single()

    if (error) {
      console.error('Error creating contact inquiry:', error)
      return null
    }
    return data
  }

  async getContactInquiries(): Promise<ContactInquiry[]> {
    const { data, error } = await this.supabase
      .from('contact_inquiries')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching contact inquiries:', error)
      return []
    }
    return data || []
  }

  async updateContactInquiry(id: string, updates: Tables['contact_inquiries']['Update']): Promise<ContactInquiry | null> {
    const { data, error } = await this.supabase
      .from('contact_inquiries')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error updating contact inquiry:', error)
      return null
    }
    return data
  }

  // Authentication helpers
  async getCurrentUser() {
    const { data: { user }, error } = await this.supabase.auth.getUser()
    if (error) {
      console.error('Error getting current user:', error)
      return null
    }
    return user
  }

  async signOut() {
    const { error } = await this.supabase.auth.signOut()
    if (error) {
      console.error('Error signing out:', error)
    }
  }
}

// Server-side database operations
export class ServerDatabaseClient {
  private supabase: ReturnType<typeof createServerComponentClient>

  constructor(cookieStore: ReturnType<typeof cookies>) {
    this.supabase = createServerComponentClient(cookieStore)
  }

  async getProfile(userId: string): Promise<Profile | null> {
    const { data, error } = await this.supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()

    if (error) {
      console.error('Error fetching profile:', error)
      return null
    }
    return data
  }

  async getServices(): Promise<Service[]> {
    const { data, error } = await this.supabase
      .from('services')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true })

    if (error) {
      console.error('Error fetching services:', error)
      return []
    }
    return data || []
  }

  async getCurrentUser() {
    const { data: { user }, error } = await this.supabase.auth.getUser()
    if (error) {
      console.error('Error getting current user:', error)
      return null
    }
    return user
  }
}

// Export singleton instance for client-side usage
export const db = new DatabaseClient() 