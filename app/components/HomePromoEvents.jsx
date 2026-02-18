'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Tag, Calendar, Store } from 'lucide-react'

const ITEMS = [
  {
    id: 'promociones',
    title: 'Promociones',
    description: 'Siempre tendremos algo para ti en tu sección favorita. ¡No te resistas!',
    href: '/',
    icon: Tag,
    image: '/assets/images/cc1dron.jpeg',
  },
  {
    id: 'eventos',
    title: 'Eventos',
    description: '¿Buscas planes? Descubre lo que tenemos para ti.',
    href: '/',
    icon: Calendar,
    image: '/assets/images/cc1dron.jpeg',
  },
  {
    id: 'locales',
    title: 'Locales',
    description: 'Nuestro gran mix comercial te sorprenderá.',
    href: '/locales',
    icon: Store,
    image: '/assets/images/cc1dron.jpeg',
  },
]

export default function HomePromoEvents() {
  return (
    <section className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <h2 className="mb-8 text-3xl font-bold text-center text-gray-900">
        Próximos eventos
      </h2>

      <div className="grid gap-6 md:grid-cols-3">
        {ITEMS.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className="group relative block overflow-hidden rounded-2xl bg-gray-200 aspect-[4/3] min-h-[240px]"
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
              <h3 className="text-xl font-bold">{item.title}</h3>
              <p className="mt-1 text-sm opacity-90 line-clamp-2">{item.description}</p>
              <span className="mt-4 inline-flex items-center justify-center w-fit rounded-full border-2 border-white px-4 py-2 text-sm font-semibold transition-colors group-hover:bg-white group-hover:text-gray-900">
                Conoce más
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
