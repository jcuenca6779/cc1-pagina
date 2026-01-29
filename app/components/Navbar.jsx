'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname()
  const menuItems = [
    { name: 'Inicio', href: '/' },
    { name: 'Locales', href: '/locales' },
    { name: 'Contactenos', href: '/contacto' },
  ]

  const isActiveRoute = (href) => {
    if (href === '/') {
      return pathname === '/'
    }

    return pathname.startsWith(href)
  }

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="relative flex items-center h-16">
          
          {/* Logo */}
          <div className="absolute left-0 flex-shrink-0">
            <Link href="/" className="block">
              <div className="px-2 py-1 transition-colors rounded hover:bg-gray-100">
                <Image
                  src="/assets/images/logocompleto.png"
                  alt="Logo CC1"
                  width={160}
                  height={50}
                  priority
                />
              </div>
            </Link>
          </div>

          {/* Menu central */}
          <div className="hidden mx-auto md:flex md:items-center md:space-x-6 lg:space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`group relative inline-flex items-center pb-1 font-medium transition-colors duration-200 ${
                  isActiveRoute(item.href)
                    ? 'text-blue-600'
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                <span className="relative z-10">{item.name}</span>
                <span
                  className={`absolute left-0 right-0 -bottom-0.5 h-0.5 rounded-full bg-blue-600 transition-transform duration-200 ${
                    isActiveRoute(item.href)
                      ? 'scale-x-100'
                      : 'scale-x-0 group-hover:scale-x-100'
                  } origin-left`}
                />
              </Link>
            ))}
          </div>
        </div>

        {/* Menu movil */}
        <div className="pb-4 md:hidden">
          <div className="flex flex-wrap gap-3">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`group relative inline-flex items-center pb-1 text-sm font-medium transition-colors ${
                  isActiveRoute(item.href)
                    ? 'text-blue-600'
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                <span className="relative z-10">{item.name}</span>
                <span
                  className={`absolute left-0 right-0 -bottom-0.5 h-0.5 rounded-full bg-blue-600 transition-transform duration-200 ${
                    isActiveRoute(item.href)
                      ? 'scale-x-100'
                      : 'scale-x-0 group-hover:scale-x-100'
                  } origin-left`}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
