import Image from 'next/image'

export default function Hero() {
  return (
    <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
      {/* Imagen de fondo */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&h=800&fit=crop"
          alt="Comercio y negocios"
          fill
          className="object-cover"
          priority
        />
        {/* Overlay azul/negro semitransparente */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-black/70"></div>
      </div>

      {/* Contenido centrado */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
        {/* Logotipo blanco grande */}
        <div className="mb-6">
          <div className="bg-white/20 backdrop-blur-sm px-12 py-6 rounded-lg border border-white/30">
            <h1 className="text-4xl md:text-6xl font-bold text-white">
              LOGO CC1
            </h1>
          </div>
        </div>

        {/* Texto elegante en cursiva */}
        <p className="text-2xl md:text-3xl lg:text-4xl text-white italic font-light tracking-wide">
          ¡La capital del Comercio!
        </p>
      </div>
    </div>
  )
}
