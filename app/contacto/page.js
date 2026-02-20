import ContactForm from "../components/ContactForm";
import Footer from "../components/Footer";

export const metadata = {
  title: "Contactos - CC1",
  description: "Canales de contacto del directorio comercial CC1.",
};

export default function ContactoPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 bg-gray-50">
        <section className="px-4 py-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          {/* Ubicación */}
          <div className="mt-4">
            <h2 className="text-3xl font-bold text-center text-gray-900">
              Siempre cerca de ti
            </h2>

            <p className="mt-0 text-sm text-center text-gray-600">
              Encuéntranos fácilmente en Portoviejo.
            </p>

            <div className="mt-6 overflow-hidden bg-white shadow-sm rounded-3xl">
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

          <h1 className="mt-6 text-3xl font-bold gradient-text">Contactos</h1>
          <p className="mt-0 text-sm text-gray-600">
            Usa estos canales para informacion y soporte.
          </p>

          {/* Tarjetas principales */}
          <div className="grid gap-6 mt-6 md:grid-cols-2">
            {/* Atención */}
            <div className="p-6 bg-white shadow-sm rounded-2xl">
              <h2 className="text-lg font-semibold text-gray-900">Atención</h2>

              <div className="mt-3 space-y-2 text-sm text-gray-600">
                <p>
                  <span className="font-semibold text-gray-900">
                    Dirección:
                  </span>{" "}
                  Calle 10 de Agosto, entre Francisco Pacheco y García Moreno,
                  Portoviejo, Ecuador.
                </p>
                <p>
                  <span className="font-semibold text-gray-900">Teléfono:</span>{" "}
                  (05) 370-0250
                </p>
                <p>
                  <span className="font-semibold text-gray-900">Correo:</span>{" "}
                  info@portocomercio.gob.ec
                </p>
                <p>
                  <span className="font-semibold text-gray-900">Horario:</span>{" "}
                  Lunes a viernes 08:00 - 17:00
                </p>
              </div>
            </div>

            {/* Escribenos */}
            <ContactForm />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
