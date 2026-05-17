import Image from 'next/image'
import Link from 'next/link'

export function AuthHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-14 bg-white border-b border-neutral-200 flex items-center px-6">
      <div className="flex items-center justify-between w-full">
        <Link href="/" aria-label="Lynz Home">
          <Image
            src="/images/logos/logo-lynz-coral.png"
            alt="Lynz"
            width={100}
            height={28}
            priority
          />
        </Link>
        <Link
          href="/apps"
          className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors"
        >
          Apps
        </Link>
      </div>
    </header>
  )
}
