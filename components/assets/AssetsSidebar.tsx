'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { ASSET_NAV_ITEMS } from './nav-items'

const cn = (...inputs: Parameters<typeof clsx>) => twMerge(clsx(...inputs))

export function AssetsSidebar() {
  const pathname = usePathname()

  return (
    <aside className="flex flex-col w-56 shrink-0 h-screen border-r border-neutral-200 bg-white px-3 py-5">
      {/* Logo + nome */}
      <div className="flex items-center gap-2.5 px-1">
        <Image
          src="/images/logos/logo-lynz-coral.png"
          alt="Lynz"
          width={80}
          height={22}
          priority
        />
        <span className="text-xs font-semibold text-neutral-700 leading-tight">
          Brand Assets
        </span>
      </div>

      {/* Link Voltar */}
      <div className="mt-3 px-1">
        <Link
          href="/"
          className="text-xs text-neutral-400 hover:text-neutral-700 flex items-center gap-1 transition-colors"
        >
          <span>←</span>
          <span>Voltar</span>
        </Link>
      </div>

      {/* Separador */}
      <div className="border-t border-neutral-100 my-4" />

      {/* Nav items */}
      <nav className="flex flex-col gap-0.5">
        {ASSET_NAV_ITEMS.map((item) => {
          const href = `/assets/${item.slug}`
          const isActive = pathname === href || pathname.startsWith(`${href}/`)

          return (
            <Link
              key={item.slug}
              href={href}
              className={cn(
                'flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors',
                isActive
                  ? 'bg-neutral-100 text-neutral-900 font-medium'
                  : 'text-neutral-500 hover:text-neutral-900'
              )}
            >
              <span className="text-base w-5 text-center select-none">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
