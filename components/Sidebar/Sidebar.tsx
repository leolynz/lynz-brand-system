'use client'

import Image from 'next/image'
import { SidebarSection } from './SidebarSection'
import type { NavigationSection } from '@/lib/types'

interface SidebarProps {
  navigation: NavigationSection[]
  currentSlug?: string
}

export function Sidebar({ navigation, currentSlug }: SidebarProps) {
  return (
    <aside className="flex flex-col h-full w-64 shrink-0 border-r border-neutral-200 bg-white">
      <div className="flex items-center justify-center h-14 px-5 border-b border-neutral-200 shrink-0">
        <Image
          src="/images/logos/logo-lynz-white.png"
          alt="Lynz"
          width={120}
          height={32}
          className="object-contain"
          priority
        />
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
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-7 h-7 rounded-full bg-neutral-200 flex items-center justify-center text-xs font-medium text-neutral-600 select-none shrink-0">
              L
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-medium text-neutral-900 truncate">Perfil</span>
              <span className="text-xs text-neutral-400 truncate">Configurações</span>
            </div>
          </div>
          <button
            aria-label="Sair"
            onClick={() => alert('Logout (não implementado)')}
            className="text-xs text-neutral-400 hover:text-neutral-900 transition-colors cursor-pointer shrink-0"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16,17 21,12 16,7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
          </button>
        </div>
      </div>
    </aside>
  )
}
