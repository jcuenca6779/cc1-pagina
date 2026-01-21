export default function Footer() {
  return (
    <footer className="bg-[#0e2d5c] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Contenedor de Logos */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 lg:gap-16 mb-8">
          {/* Logo 1: PortoComercio EP */}
          <div className="flex flex-col items-center">
            <div className="bg-white/10 backdrop-blur-sm px-8 py-6 rounded-lg border border-white/20 mb-2">
              <div className="text-white font-bold text-lg text-center">
                PortoComercio<br />EP
              </div>
            </div>
            <span className="text-xs text-gray-300 mt-2">PortoComercio EP</span>
          </div>

          {/* Logo 2: Escudo de armas / GAD Portoviejo */}
          <div className="flex flex-col items-center">
            <div className="bg-white/10 backdrop-blur-sm w-24 h-24 rounded-full border-2 border-white/20 mb-2 flex items-center justify-center">
              <div className="text-white text-center text-xs font-bold">
                ESCUDO
              </div>
            </div>
            <span className="text-xs text-gray-300 mt-2 text-center max-w-[200px]">
              Gobierno Autónomo<br />Descentralizado...<br />Portoviejo
            </span>
          </div>

          {/* Logo 3: Portoviejo Alcaldía */}
          <div className="flex flex-col items-center">
            <div className="bg-white/10 backdrop-blur-sm px-8 py-6 rounded-lg border border-white/20 mb-2">
              <div className="text-white font-bold text-lg text-center">
                Portoviejo<br />Alcaldía
              </div>
            </div>
            <span className="text-xs text-gray-300 mt-2">Portoviejo Alcaldía</span>
          </div>
        </div>

        {/* Texto de Copyright */}
        <div className="text-center">
          <p className="text-sm text-gray-300">
            © Copyright 2024. PortoComercio EP.
          </p>
        </div>
      </div>
    </footer>
  )
}
