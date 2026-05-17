import { createClient } from '@supabase/supabase-js'
import { Database } from '../types/database'
import { getSupabaseConfig } from './config'

export function createAdminClient() {
  const { url, serviceRoleKey } = getSupabaseConfig()

  return createClient<Database>(
    url,
    serviceRoleKey,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    }
  )
}
