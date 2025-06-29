import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || ''
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Chatbot {
  id: string
  name: string
  description: string
  personality: string
  knowledge_base: string
  api_key: string
  status: 'active' | 'inactive'
  created_at: string
  message_count: number
  user_id: string
}

export interface ChatMessage {
  id: string
  chatbot_id: string
  user_message: string
  bot_response: string
  created_at: string
  user_id: string
} 