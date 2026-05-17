'use client'

import Image from 'next/image'
import Link from 'next/link'
import { SidebarSection } from './SidebarSection'
import type { NavigationSection } from '@/lib/types'
import { Profile } from '@/lib/types/database'
import { useAuth } from '@/components/AuthProvider'

interface SidebarProps {
  navigation: NavigationSection[]
  currentSlug?: string
  profile?: Profile | null
}

export function Sidebar({ navigation, currentSlug, profile }: SidebarProps) {
  const { signOut } = useAuth()

  return (
    <aside className="flex flex-col h-full w-64 shrink-0 border-r border-neutral-200 bg-white">
      <div className="flex items-center justify-center h-14 px-5 border-b border-neutral-200 shrink-0">
        <Link href="/">
          <Image
            src="/images/logos/logo-lynz-white.png"
            alt="Lynz"
            width={120}
            height={32}
            className="object-contain"
            priority
          />
        </Link>
      </div>

      <div className="shrink-0 px-3 pt-3 pb-2">
        <Link
          href="/assets/logotipos"
          className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-xs font-medium text-neutral-500 border border-neutral-200 hover:border-neutral-400 hover:text-neutral-900 hover:bg-neutral-50 transition-all duration-150"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="3" width="20" height="14" rx="2" />
            <path d="M8 21h8M12 17v4" />
          </svg>
          Ativos da Marca
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar py-3 px-3">
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
            <div className="w-7 h-7 rounded-full bg-neutral-900 flex items-center justify-center text-[10px] font-bold text-white select-none shrink-0 uppercase">
              {profile?.name?.[0] || profile?.email?.[0] || 'U'}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-medium text-neutral-900 truncate">
                {profile?.name || 'Usuário'}
              </span>
              {profile?.role === 'admin' ? (
                <Link 
                  href="/settings"
                  className="text-[10px] text-neutral-400 hover:text-neutral-900 transition-colors truncate underline underline-offset-2"
                >
                  Configurações
                </Link>
              ) : (
                <span className="text-[10px] text-neutral-400 truncate uppercase tracking-wider">
                  {profile?.role || 'Staff'}
                </span>
              )}
            </div>
          </div>
          <button
            aria-label="Sair"
            onClick={signOut}
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
