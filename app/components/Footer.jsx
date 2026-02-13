'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Facebook, Instagram, Mail, MapPin, Clock } from 'lucide-react'
import { useState } from 'react'

const SOCIAL = [
  { name: 'Facebook', href: '#', icon: Facebook },
  { name: 'Instagram', href: '#', icon: Instagram },
]

const NOSOTROS_LINKS = [
  { label: 'Quiénes somos', href: '/' },
  { label: 'Transparencia', href: '/' },
  { label: 'Contacto', href: '/contacto' },
]

export default function Footer() {
  const [email, setEmail] = useState('')

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email.trim()) setEmail('')
  }

  return (
    <footer className="bg-[#1d1d99] text-white">
      <div className="px-4 py-10 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Síguenos + Suscríbete */}
        <div className="flex flex-col gap-8 pb-10 border-b border-white/20 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold text-white/90">Síguenos</p>
            <div className="flex gap-4 mt-2">
              {SOCIAL.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                  aria-label={s.name}
                >
                  <s.icon size={20} />
                </a>
              ))}
            </div>
          </div>
          <div className="min-w-0 flex-1 md:max-w-sm">
            <p className="text-sm font-semibold text-white/90">Suscríbete</p>
            <form onSubmit={handleSubscribe} className="flex gap-2 mt-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ingresa tu email"
                className="flex-1 min-w-0 rounded-lg border border-white/30 bg-white/10 px-4 py-2 text-sm text-white placeholder-white/60 focus:border-[#0ACEE5] focus:outline-none"
              />
              <button
                type="submit"
                className="flex items-center justify-center rounded-lg bg-[#0ACEE5] p-2 text-white hover:bg-[#09bccf] transition-colors"
                aria-label="Enviar"
              >
                <Mail size={20} />
              </button>
            </form>
          </div>
        </div>

        {/* Columnas: Nosotros, Horarios, Contáctanos */}
        <div className="grid gap-8 py-10 md:grid-cols-3">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white/90">Nosotros</h3>
            <ul className="mt-4 space-y-2">
              {NOSOTROS_LINKS.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-white/80 hover:text-white hover:underline">
                    {link.label} →
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white/90 flex items-center gap-2">
              <Clock size={16} /> Horarios de atención
            </h3>
            <ul className="mt-4 space-y-1 text-sm text-white/80">
              <li>Centro Comercial: Lun-Sáb 10h00-21h00</li>
              <li>Domingo: 10h00-20h00</li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white/90 flex items-center gap-2">
              <MapPin size={16} /> Visítanos
            </h3>
            <p className="mt-4 text-sm text-white/80">
              Portoviejo, Manabí
            </p>
            <Link href="/contacto" className="mt-2 inline-block text-sm text-[#0ACEE5] hover:underline">
              Ver mapa →
            </Link>
          </div>
        </div>

        {/* Logos */}
        <div className="footer-logos">
          <div className="logo portocomercio">
            <Image
              src="/assets/images/logoportocomercio.svg"
              alt="Logo PortoComercio EP"
              width={120}
              height={160}
              priority
            />
          </div>
          <div className="logo-gobierno">
            <Image
              src="/assets/images/logogobierno.svg"
              alt="Escudo GAD Portoviejo"
              width={320}
              height={240}
              priority
            />
          </div>
          <div className="logo-alcaldia">
            <Image
              src="/assets/images/logoalcaldia.svg"
              alt="Logo Alcaldía de Portoviejo"
              width={120}
              height={160}
              priority
            />
          </div>
        </div>

        <div className="text-center pt-6">
          <p className="text-sm text-gray-300">
            © Copyright 2024. PortoComercio EP.
          </p>
        </div>
      </div>
    </footer>
  )
}
