'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Building2,
  Info,
  Baby,
  Calendar,
  UtensilsCrossed,
  Sparkles,
} from 'lucide-react'

const FILTERS = [
  { id: 'cc1', label: 'CC1' },
  { id: 'capilla', label: 'Capilla' },
  { id: 'salones', label: 'Salones de eventos' },
  { id: 'oficinas', label: 'Oficinas' },
]

const SERVICES = [
  {
    id: 'banos',
    filter: 'cc1',
    icon: Building2,
    title: 'Baños',
    description: 'Contamos con baños en planta baja y planta alta para tu comodidad.',
  },
  {
    id: 'banos-familiares',
    filter: 'cc1',
    icon: Sparkles,
    title: 'Baños familiares',
    description: 'Para que nadie se quede sin espacio.',
  },
  {
    id: 'cambiadores',
    filter: 'cc1',
    icon: Baby,
    title: 'Cambiadores de bebés',
    description: 'Para los padres que tienen urgencias inesperadas.',
  },
  {
    id: 'capilla',
    filter: 'capilla',
    icon: Building2,
    title: 'Capilla',
    description: 'Los visitantes pueden tener acceso a la capilla ubicada en planta baja.',
  },
  {
    id: 'isla-info',
    filter: 'cc1',
    icon: Info,
    title: 'Isla de información',
    description: 'El punto de información se encuentra en planta alta.',
  },
  {
    id: 'lactario',
    filter: 'cc1',
    icon: Baby,
    title: 'Lactario',
    description: 'Tranquilidad y comodidad para las mamás.',
  },
  {
    id: 'salones',
    filter: 'salones',
    icon: Calendar,
    title: 'Salones de eventos',
    description: 'Espacios para eventos corporativos y celebraciones.',
  },
  {
    id: 'oficinas',
    filter: 'oficinas',
    icon: Building2,
    title: 'Oficinas',
    description: 'Espacios para profesionales y empresas en el centro comercial.',
  },
  {
    id: 'patio-comidas',
    filter: 'cc1',
    icon: UtensilsCrossed,
    title: 'Patio de comidas',
    description: 'Variedad de opciones gastronómicas en un solo lugar.',
  },
  {
    id: 'otros',
    filter: 'cc1',
    icon: null,
    title: 'También contamos con:',
    description: 'Rampas para discapacitados, parqueaderos para bicicletas y zonas de descanso.',
  },
]

export default function HomeServices() {
  const [activeFilter, setActiveFilter] = useState('cc1')

  const filteredServices =
    activeFilter === 'cc1'
      ? SERVICES
      : SERVICES.filter((s) => s.filter === activeFilter)

  return (
    <section className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8 bg-white rounded-3xl shadow-sm">
      <h2 className="text-3xl font-bold text-center text-[#1d1d99] border-b-4 border-[#1d1d99] pb-2 w-fit mx-auto">
        Servicios
      </h2>

      <div className="flex flex-wrap justify-center gap-2 mt-8">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            onClick={() => setActiveFilter(f.id)}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-colors ${
              activeFilter === f.id
                ? 'bg-[#0ACEE5] text-white'
                : 'bg-white text-[#1d1d99] border-2 border-[#1d1d99] hover:bg-gray-50'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="grid gap-6 mt-10 sm:grid-cols-2 lg:grid-cols-3">
        {filteredServices.map((service) => {
          const Icon = service.icon
          return (
            <div
              key={service.id}
              className="p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-md transition-shadow"
            >
              {Icon && (
                <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-xl bg-[#0ACEE5]/20 text-[#0ACEE5]">
                  <Icon size={24} />
                </div>
              )}
              <h3 className="text-lg font-bold text-gray-900">{service.title}</h3>
              <p className="mt-2 text-sm text-gray-600">{service.description}</p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
