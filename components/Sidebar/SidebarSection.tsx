import { SidebarItem } from './SidebarItem'
import type { NavigationSection } from '@/lib/types'

interface SidebarSectionProps {
  section: NavigationSection
  currentSlug?: string
}

export function SidebarSection({ section, currentSlug }: SidebarSectionProps) {
  return (
    <div className="mb-6">
      <p className="px-3 mb-1 text-xs font-semibold tracking-widest uppercase text-neutral-400 select-none">
        {section.title}
      </p>
      <nav>
        {section.items.map((item) => (
          <SidebarItem
            key={item.slug}
            label={item.label}
            slug={item.slug}
            isActive={item.slug === currentSlug}
          />
        ))}
      </nav>
    </div>
  )
}
