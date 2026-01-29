export const metadata = {
  title: 'Contactos - CC1',
  description: 'Canales de contacto del directorio comercial CC1.',
}

export default function ContactoPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <section className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold gradient-text">Contactos</h1>
        <p className="mt-3 text-sm text-gray-600">
          Usa estos canales para informacion y soporte.
        </p>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900">Atencion</h2>
            <div className="mt-3 space-y-2 text-sm text-gray-600">
              <p>Direccion: Av. Comercio 123, Portoviejo</p>
              <p>Telefono: (05) 000-0000</p>
              <p>Correo: contacto@cc1.ec</p>
              <p>Horario: Lunes a viernes 08:00 - 17:00</p>
            </div>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900">Escribenos</h2>
            <p className="mt-2 text-sm text-gray-600">
              Envia tu consulta a nuestro correo y responderemos pronto.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href="mailto:contacto@cc1.ec"
                className="rounded-full bg-[#0ACEE5] px-5 py-2 text-sm font-semibold text-white"
              >
                Escribir correo
              </a>
              <a
                href="tel:+59350000000"
                className="rounded-full border border-gray-200 px-5 py-2 text-sm font-semibold text-gray-600"
              >
                Llamar
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
