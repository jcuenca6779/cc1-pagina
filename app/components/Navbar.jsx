'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function Navbar() {
  const menuItems = [
    { name: 'Inicio', href: '/' },
    { name: 'Institución', href: '/institucion' },
    { name: 'Transparencia', href: '/transparencia' },
    { name: 'Servicios en Línea', href: '/servicios' },
    { name: 'Contáctenos', href: '/contacto' },
    { name: 'Encuestas', href: '/encuestas' },
  ]

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

          {/* Menú central */}
          <div className="hidden mx-auto md:flex md:items-center md:space-x-6 lg:space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="font-medium text-gray-700 transition-colors duration-200 hover:text-blue-600"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Menú móvil */}
        <div className="pb-4 md:hidden">
          <div className="flex flex-wrap gap-3">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-gray-700 transition-colors hover:text-blue-600"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
