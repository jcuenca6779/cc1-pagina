import Footer from "../components/Footer";

export const metadata = {
  title: "Contactos - CC1",
  description: "Canales de contacto del directorio comercial CC1.",
};

export default function ContactoPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 bg-gray-50">
        <section className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold gradient-text">Contactos</h1>

          <p className="mt-3 text-sm text-gray-600">
            Usa estos canales para informacion y soporte.
          </p>

          {/* Tarjetas principales */}
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {/* Atención */}
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900">Atencion</h2>

              <div className="mt-3 space-y-2 text-sm text-gray-600">
                <p>
                  <span className="font-semibold text-gray-900">
                    Direccion:
                  </span>{" "}
                  Centro Comercial Uno (CC1), Portoviejo
                </p>
                <p>
                  <span className="font-semibold text-gray-900">Telefono:</span>{" "}
                  (05) 000-0000
                </p>
                <p>
                  <span className="font-semibold text-gray-900">Correo:</span>{" "}
                  contacto@cc1.ec
                </p>
                <p>
                  <span className="font-semibold text-gray-900">Horario:</span>{" "}
                  Lunes a viernes 08:00 - 17:00
                </p>
              </div>

              <div className="mt-5">
                <a
                  href="mailto:contacto@cc1.ec"
                  className="rounded-full bg-[#0ACEE5] px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#08b7cc]"
                >
                  Escribir correo
                </a>
              </div>
            </div>

            {/* Escribenos */}
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900">
                Escribenos
              </h2>

              <p className="mt-2 text-sm text-gray-600">
                Dejanos tus datos y tu consulta. Responderemos pronto.
              </p>

              <form className="mt-4 grid gap-3">
                <div className="grid gap-3 sm:grid-cols-2">
                  <input
                    className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none focus:border-[#0ACEE5]"
                    placeholder="Nombre"
                  />
                  <input
                    className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none focus:border-[#0ACEE5]"
                    placeholder="Telefono"
                  />
                </div>

                <input
                  type="email"
                  className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none focus:border-[#0ACEE5]"
                  placeholder="Correo"
                />

                <input
                  className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none focus:border-[#0ACEE5]"
                  placeholder="Asunto"
                />

                <textarea
                  rows={4}
                  className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none focus:border-[#0ACEE5]"
                  placeholder="Mensaje"
                />

                <button
                  type="button"
                  className="mt-1 rounded-full bg-[#0ACEE5] px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#08b7cc]"
                >
                  Enviar mensaje
                </button>
              </form>
            </div>
          </div>

          {/* Ubicación */}
          <div className="mt-12">
            <h2 className="text-3xl font-bold text-center text-gray-900">
              Siempre cerca de ti
            </h2>

            <p className="mt-2 text-sm text-center text-gray-600">
              Encuentranos facilmente en Portoviejo.
            </p>

            <div className="mt-6 overflow-hidden rounded-3xl bg-white shadow-sm">
              <iframe
                title="Ubicación CC1"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.1387982823044!2d-80.45742172414288!3d-1.0574723354206876!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x902b8d4a075fd00d%3A0xf78ef6bcd36d5ea1!2sCentro%20Comercial%20Uno%20CC1!5e0!3m2!1ses-419!2sec!4v1770783463923!5m2!1ses-419!2sec"
                className="w-full h-[420px] border-0"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
