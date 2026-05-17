import { createBrowserClient } from '@supabase/ssr'
import { Database } from '../types/database'
import { getSupabaseConfig } from './config'

export function createClient() {
  const { url, anonKey } = getSupabaseConfig()

  if (typeof window !== 'undefined') {
    console.log('Supabase URL being used:', url)
  }

  return createBrowserClient<Database>(url, anonKey)
}
