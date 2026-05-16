import { Sidebar } from '@/components/Sidebar/Sidebar'
import type { NavigationSection } from '@/lib/types'

interface AppLayoutProps {
  children: React.ReactNode
  navigation: NavigationSection[]
  currentSlug?: string
}

export function AppLayout({ children, navigation, currentSlug }: AppLayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden bg-white">
      <Sidebar navigation={navigation} currentSlug={currentSlug} />
      {children}
    </div>
  )
}
