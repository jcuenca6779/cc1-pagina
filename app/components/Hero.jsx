import Image from 'next/image'

export default function Hero() {
  return (
    <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
      {/* Imagen de fondo */}
      <div className="absolute inset-0">
        <Image
          src="/assets/images/cc1dron.jpeg"
          alt="Comercio y negocios"
          fill
          className="object-cover"
          priority
        />
        {/* Overlay azul/negro semitransparente */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-black/70"></div>
      </div>

      {/* Contenido centrado */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4">
        {/* Logotipo blanco grande */}
        <div className="mb-6">
          <div className="px-12 py-6 ">
             <Image
                          src="/assets/images/logominimocc1blanco.png"
                          alt="Logo PortoComercio EP"
                          width={420}
                          height={460}
                          priority
                        />
          </div>
        </div>

        {/* Texto elegante en cursiva */}
        <p className="text-2xl italic font-light tracking-wide text-white md:text-3xl lg:text-4xl">
          ¡La capital del Comercio!
        </p>
      </div>
    </div>
  )
}
