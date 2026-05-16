'use client'

import Link from 'next/link'
import { clsx } from 'clsx'

interface SidebarItemProps {
  label: string
  slug: string
  isActive: boolean
}

export function SidebarItem({ label, slug, isActive }: SidebarItemProps) {
  return (
    <Link
      href={`/docs/${slug}`}
      aria-current={isActive ? 'page' : undefined}
      className={clsx(
        'block px-3 py-1.5 rounded-md text-sm transition-colors duration-150',
        isActive
          ? 'bg-neutral-900 text-white font-medium'
          : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
      )}
    >
      {label}
    </Link>
  )
}
