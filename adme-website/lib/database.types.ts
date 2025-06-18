export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      contact_inquiries: {
        Row: {
          id: string
          name: string
          email: string
          company: string | null
          phone: string | null
          subject: string | null
          message: string
          status: 'new' | 'contacted' | 'converted' | 'closed'
          priority: 'low' | 'medium' | 'high'
          assigned_to: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          company?: string | null
          phone?: string | null
          subject?: string | null
          message: string
          status?: 'new' | 'contacted' | 'converted' | 'closed'
          priority?: 'low' | 'medium' | 'high'
          assigned_to?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          company?: string | null
          phone?: string | null
          subject?: string | null
          message?: string
          status?: 'new' | 'contacted' | 'converted' | 'closed'
          priority?: 'low' | 'medium' | 'high'
          assigned_to?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          company_name: string | null
          phone: string | null
          role: 'client' | 'admin' | 'developer'
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          company_name?: string | null
          phone?: string | null
          role?: 'client' | 'admin' | 'developer'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          company_name?: string | null
          phone?: string | null
          role?: 'client' | 'admin' | 'developer'
          created_at?: string
          updated_at?: string
        }
      }
      projects: {
        Row: {
          id: string
          client_id: string | null
          title: string
          description: string | null
          status: 'inquiry' | 'proposal' | 'in_progress' | 'completed' | 'cancelled'
          budget_range: string | null
          start_date: string | null
          deadline: string | null
          completed_date: string | null
          service_type: string | null
          requirements: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          client_id?: string | null
          title: string
          description?: string | null
          status?: 'inquiry' | 'proposal' | 'in_progress' | 'completed' | 'cancelled'
          budget_range?: string | null
          start_date?: string | null
          deadline?: string | null
          completed_date?: string | null
          service_type?: string | null
          requirements?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          client_id?: string | null
          title?: string
          description?: string | null
          status?: 'inquiry' | 'proposal' | 'in_progress' | 'completed' | 'cancelled'
          budget_range?: string | null
          start_date?: string | null
          deadline?: string | null
          completed_date?: string | null
          service_type?: string | null
          requirements?: Json | null
          created_at?: string
          updated_at?: string
        }
      }
      services: {
        Row: {
          id: string
          name: string
          description: string | null
          short_description: string | null
          price_range: string | null
          duration_estimate: string | null
          features: string[] | null
          is_active: boolean
          display_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          short_description?: string | null
          price_range?: string | null
          duration_estimate?: string | null
          features?: string[] | null
          is_active?: boolean
          display_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          short_description?: string | null
          price_range?: string | null
          duration_estimate?: string | null
          features?: string[] | null
          is_active?: boolean
          display_order?: number
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
} 