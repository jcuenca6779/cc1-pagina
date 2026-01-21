'use client'

import Link from 'next/link'

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
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16 relative">
          {/* Logo */}
          <div className="flex-shrink-0 absolute left-0">
            <Link href="/" className="block">
              <div className="bg-gray-200 px-6 py-2 rounded text-gray-700 font-bold text-lg hover:bg-gray-300 transition-colors">
                LOGO CC1
              </div>
            </Link>
          </div>

          {/* Menú Central - Centrado */}
          <div className="hidden md:flex md:items-center md:space-x-6 lg:space-x-8 mx-auto">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 font-medium hover:text-blue-600 transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Menú móvil - Hamburguesa (opcional, simplificado) */}
        <div className="md:hidden pb-4">
          <div className="flex flex-wrap gap-2">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 font-medium hover:text-blue-600 transition-colors duration-200 text-sm"
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
