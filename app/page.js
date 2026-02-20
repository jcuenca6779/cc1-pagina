import Link from "next/link";
import Image from "next/image";
import Hero from "./components/Hero";
import HomeServices from "./components/HomeServices";
import HomeVisitHours from "./components/HomeVisitHours";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Hero />

      <main className="flex-1 bg-gray-50">
        {/* Intro */}
        <section className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold gradient-text">
            Directorio comercial CC1
          </h1>
          <p className="mt-3 text-sm text-gray-600">
            Bienvenido a la plataforma informativa del Centro Comercial Uno
            (CC1). Aquí encuentras locales, servicios y actividades del espacio.
          </p>
        </section>

        {/* Servicios */}
        <section className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <HomeServices />
        </section>

        {/* Horarios */}
        <HomeVisitHours />

        {/* Edificio CC1 */}
        <section className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-3xl bg-white shadow-sm border border-gray-100">
            {/* Imagen */}
            <div className="relative h-[420px] sm:h-[520px]">
              <Image
                src="/assets/images/cc1-interior.webp"
                alt="Edificio CC1"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Contenido */}
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900">
                El edificio CC1
              </h2>

              <p className="mt-2 text-sm text-gray-600">
                El Centro Comercial Uno (CC1) en Portoviejo es uno de los
                primeros centros comerciales de la ciudad. Ofrece una variedad
                de tiendas, restaurantes y servicios. Es un punto de encuentro
                para locales y visitantes.
              </p>

              {/* Información práctica */}
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {/* Información general */}
                <div className="rounded-2xl bg-gray-50 p-4">
                  <h3 className="text-sm font-semibold text-gray-900">
                    Información general
                  </h3>

                  <div className="mt-2 space-y-2 text-sm text-gray-600">
                    <p>
                      <span className="font-semibold text-gray-900">
                        Dirección:
                      </span>{" "}
                      Calle 10 de Agosto, entre Francisco Pacheco y García
                      Moreno, Portoviejo, Ecuador
                    </p>

                    <p>
                      <span className="font-semibold text-gray-900">
                        Horarios de atención:
                      </span>{" "}
                      Lunes a Sábado: 09:00 a 19:00, Domingo: 09:00 a 13:00
                    </p>

                    <p>
                      <span className="font-semibold text-gray-900">
                        Horario de apertura para los comerciantes:
                      </span>{" "}
                      Lunes a Domingo: 08:30
                    </p>

                    <p>
                      <span className="font-semibold text-gray-900">
                        Control de apertura de los locales:
                      </span>{" "}
                      Lunes a Sábado: 09:30 a 19:00, Domingo: 09:30 a 14:00
                    </p>
                  </div>
                </div>

                {/* Servicios y facilidades */}
                <div className="rounded-2xl bg-gray-50 p-4">
                  <h3 className="text-sm font-semibold text-gray-900">
                    Servicios y facilidades
                  </h3>

                  <ul className="mt-2 grid gap-2 text-sm text-gray-600 sm:grid-cols-2">
                    <li className="rounded-2xl bg-white px-4 py-3 border border-gray-100">
                      Patio de comidas
                    </li>
                    <li className="rounded-2xl bg-white px-4 py-3 border border-gray-100">
                      Parqueadero privado
                    </li>
                    <li className="rounded-2xl bg-white px-4 py-3 border border-gray-100">
                      Ascensor
                    </li>
                    <li className="rounded-2xl bg-white px-4 py-3 border border-gray-100">
                      Escaleras eléctricas
                    </li>
                    <li className="rounded-2xl bg-white px-4 py-3 border border-gray-100">
                      Baños / servicios sanitarios
                    </li>
                    <li className="rounded-2xl bg-white px-4 py-3 border border-gray-100">
                      Seguridad
                    </li>
                    <li className="rounded-2xl bg-white px-4 py-3 border border-gray-100">
                      Cajero Banco del Pacífico
                    </li>
                    <li className="rounded-2xl bg-white px-4 py-3 border border-gray-100">
                      Cajero Banco Internacional
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Botón */}
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
    </div>
  );
}
