import { SidebarSection } from './SidebarSection'
import type { NavigationSection } from '@/lib/types'

interface SidebarProps {
  navigation: NavigationSection[]
  currentSlug?: string
}

export function Sidebar({ navigation, currentSlug }: SidebarProps) {
  return (
    <aside className="flex flex-col h-full w-64 shrink-0 border-r border-neutral-200 bg-white">
      <div className="flex items-center h-14 px-5 border-b border-neutral-200 shrink-0">
        <span className="text-sm font-semibold tracking-tight text-neutral-900">
          Lynz Brand System
        </span>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar py-5 px-3">
        {navigation.map((section) => (
          <SidebarSection
            key={section.category}
            section={section}
            currentSlug={currentSlug}
          />
        ))}
      </div>

      <div className="shrink-0 border-t border-neutral-200 px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-full bg-neutral-200 flex items-center justify-center text-xs font-medium text-neutral-600 select-none">
            L
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-medium text-neutral-900 truncate">Perfil</span>
            <span className="text-xs text-neutral-400 truncate">Configurações</span>
          </div>
        </div>
      </div>
    </aside>
  )
}
