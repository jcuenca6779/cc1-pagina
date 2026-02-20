import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-[#1d1d99] text-white">
      <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
        
        {/* Contenedor de Logos */}
        <div className="footer-logos">
          
          {/* Izquierda: PortoComercio EP */}
          <div className="logo portocomercio">
            <Image
              src="/assets/images/logoportocomercio.svg"
              alt="Logo PortoComercio EP"
              width={120}
              height={160}
              priority
            />
          </div>

          {/* Centro: Escudo / GAD */}
         <div className="logo-gobierno">
  <Image
    src="/assets/images/logogobierno.svg"
    alt="Escudo GAD Portoviejo"
    width={320}
    height={240}
    priority
  />
</div>

          {/* Derecha: Alcaldía */}
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

        {/* Copyright */}
        <div className="text-center">
          <p className="text-sm text-gray-300">
            © Copyright 2024. PortoComercio EP.
          </p>
        </div>
      </div>
    </footer>
  )
}
