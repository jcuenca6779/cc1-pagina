import Link from 'next/link'
import Image from 'next/image'
import Hero from './components/Hero'
import HomeServices from './components/HomeServices'
import HomePromoEvents from './components/HomePromoEvents'
import HomeExperiences from './components/HomeExperiences'
import HomeVisitHours from './components/HomeVisitHours'
import Footer from './components/Footer'
import FloatingWhatsApp from './components/FloatingWhatsApp'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Hero />

      <main className="flex-1 bg-gray-50">
        {/* Intro + 3 tarjetas */}
        <section className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold gradient-text">
            Directorio comercial CC1
          </h1>
          <p className="mt-3 text-sm text-gray-600">
            Bienvenido a la plataforma informativa del centro comercial. Aquí
            encuentras locales, servicios y actividades del espacio.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">
                Identidad local
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Reunimos emprendimientos que reflejan el talento y la economía de
                Portoviejo en un solo lugar.
              </p>
            </div>
            <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">
                Servicios y comunidad
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Ofrecemos información clara para visitantes, comerciantes y
                aliados del directorio.
              </p>
            </div>
            <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">
                Experiencia segura
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                El edificio cuenta con espacios ordenados, zonas por piso y
                acompañamiento institucional.
              </p>
            </div>
          </div>
        </section>

        {/* Servicios con filtros y tarjetas */}
        <section className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <HomeServices />
        </section>

        {/* Próximos eventos: Promociones, Eventos, Locales */}
        <HomePromoEvents />

        {/* Experiencias únicas + Nuestros Servicios + banner Wi-Fi */}
        <HomeExperiences />

        {/* Disfruta instalaciones + Visítanos + Horarios */}
        <HomeVisitHours />

        {/* Edificio CC1 */}
        <section className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-3xl bg-white shadow-sm border border-gray-100">
            <div className="relative h-64 sm:h-80">
              <Image
                src="/assets/images/cc1dron.jpeg"
                alt="Edificio CC1"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900">
                El edificio CC1
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Un espacio central que integra comercio, servicios y eventos en
                el corazón de la ciudad.
              </p>
            </div>
          </div>

          <div className="mt-10 flex justify-center">
            <Link
              href="/locales"
              className="rounded-full bg-[#0ACEE5] px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/30 transition hover:bg-[#09bccf]"
            >
              Conoce nuestros locales
            </Link>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  )
}
