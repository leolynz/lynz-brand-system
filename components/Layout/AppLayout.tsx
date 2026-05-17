import { Sidebar } from '@/components/Sidebar/Sidebar'
import type { NavigationSection } from '@/lib/types'
import { createClient } from '@/lib/supabase/server'

interface AppLayoutProps {
  children: React.ReactNode
  navigation: NavigationSection[]
  currentSlug?: string
}

export async function AppLayout({ children, navigation, currentSlug }: AppLayoutProps) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  const { data: profile } = user 
    ? await supabase.from('profiles').select('*').eq('id', user.id).single()
    : { data: null }

  return (
    <div className="flex h-screen overflow-hidden bg-white">
      <Sidebar 
        navigation={navigation} 
        currentSlug={currentSlug} 
        profile={profile}
      />
      {children}
    </div>
  )
}
