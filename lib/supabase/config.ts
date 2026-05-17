export function getSupabaseConfig() {
  let url = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder'
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder'

  // Remove trailing slash
  if (url.endsWith('/')) {
    url = url.slice(0, -1)
  }

  // Remove /rest/v1
  if (url.endsWith('/rest/v1')) {
    url = url.slice(0, -8)
  }

  return { url, anonKey, serviceRoleKey }
}
