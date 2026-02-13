'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Clock, MapPin } from 'lucide-react'

export default function HomeVisitHours() {
  return (
    <>
      {/* Disfruta de nuestras instalaciones */}
      <section className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl min-h-[320px]">
          <Image
            src="/assets/images/cc1dron.jpeg"
            alt="Instalaciones CC1"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 flex items-center justify-center">
            <h2 className="text-3xl font-bold text-white text-center px-4 md:text-4xl drop-shadow-lg">
              Disfruta de nuestras instalaciones
            </h2>
          </div>
        </div>
      </section>

      {/* Visítanos y horarios */}
      <section className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-center text-gray-900 md:text-3xl">
          Visítanos y sé parte de esta gran experiencia
        </h2>

        <div className="flex flex-col items-center mt-10 md:flex-row md:justify-center md:gap-12">
          <div className="flex flex-col items-center p-8 rounded-3xl bg-[#1d1d99] text-white max-w-sm">
            <div className="flex items-center justify-center w-20 h-20 rounded-full bg-white/20 mb-4">
              <Clock size={40} />
            </div>
            <span className="text-lg font-bold uppercase tracking-wide">Horarios</span>
            <div className="mt-4 space-y-3 text-center text-sm">
              <div className="px-4 py-2 rounded-lg bg-white/10">
                <p className="font-semibold">Lunes a sábado</p>
                <p>10h00 - 21h00</p>
              </div>
              <div className="px-4 py-2 rounded-lg bg-white/10">
                <p className="font-semibold">Domingo</p>
                <p>10h00 - 20h00</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center mt-8 md:mt-0 p-8 rounded-3xl bg-gray-100 text-gray-800 max-w-sm">
            <div className="flex items-center justify-center w-20 h-20 rounded-full bg-[#0ACEE5]/20 text-[#0ACEE5] mb-4">
              <MapPin size={40} />
            </div>
            <span className="text-lg font-bold">Visítanos</span>
            <p className="mt-3 text-sm text-center text-gray-600">
              Portoviejo, Manabí
            </p>
            <Link
              href="/contacto"
              className="mt-4 text-sm font-semibold text-[#0ACEE5] hover:underline"
            >
              Ver mapa →
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
