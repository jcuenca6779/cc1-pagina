'use client'

import Link from 'next/link'
import { Wifi, Store, UtensilsCrossed } from 'lucide-react'

const BRANDS = [
  { id: 1, name: 'Comercio local', subtitle: 'Emprendimientos' },
  { id: 2, name: 'Servicios', subtitle: 'Variedad' },
  { id: 3, name: 'Gastronomía', subtitle: 'Sabores' },
]

export default function HomeExperiences() {
  return (
    <section className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8 bg-gray-50">
      <h2 className="text-2xl font-bold text-center text-gray-900 md:text-3xl">
        Experiencias únicas mientras recorres los pasillos
      </h2>

      <div className="grid gap-6 mt-10 sm:grid-cols-3">
        {BRANDS.map((b) => (
          <div
            key={b.id}
            className="flex flex-col items-center justify-center p-8 rounded-2xl bg-white shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-2xl bg-[#0ACEE5]/20 text-[#0ACEE5]">
              <Store size={28} />
            </div>
            <h3 className="text-lg font-bold text-gray-900">{b.name}</h3>
            <p className="text-sm text-gray-500">{b.subtitle}</p>
          </div>
        ))}
      </div>

      <h2 className="mt-16 text-2xl font-bold text-center text-gray-900 md:text-3xl">
        Nuestros Servicios
      </h2>

      {/* Banner destacado tipo Wi-Fi / Información */}
      <div className="relative mt-8 overflow-hidden rounded-3xl bg-[#1d1d99] min-h-[280px]">
        <div className="absolute inset-0 bg-[#1d1d99]/95" />
        <div className="relative z-10 flex flex-col items-center justify-center px-6 py-12 text-center text-white md:flex-row md:gap-12 md:text-left">
          <div className="flex items-center justify-center w-24 h-24 rounded-full bg-white/20 shrink-0">
            <Wifi size={48} />
          </div>
          <div>
            <h3 className="text-2xl font-bold md:text-3xl">WI-FI GRATUITO</h3>
            <p className="mt-2 text-white/90">
              Conéctate y comparte tu experiencia en CC1 Portoviejo.
            </p>
            <p className="mt-1 text-sm text-white/80">
              Pregunta en isla de información por la red y contraseña.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 mt-8 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { icon: UtensilsCrossed, title: 'Patio de comidas', desc: 'Variedad de opciones para todos los gustos.' },
          { icon: Store, title: 'Directorio de locales', desc: 'Encuentra tu tienda o servicio favorito.' },
          { icon: Wifi, title: 'Conectividad', desc: 'Zonas de descanso y Wi-Fi en todo el edificio.' },
        ].map((s, i) => (
          <div
            key={i}
            className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-center w-12 h-12 mb-3 rounded-xl bg-[#0ACEE5]/20 text-[#0ACEE5]">
              <s.icon size={24} />
            </div>
            <h3 className="font-bold text-gray-900">{s.title}</h3>
            <p className="mt-1 text-sm text-gray-600">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
