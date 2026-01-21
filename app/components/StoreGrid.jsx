export default function StoreGrid() {
  // Datos de ejemplo para las tarjetas
  const stores = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    name: `Local ${i + 1}`,
  }))

  return (
    <div className="bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Título de Sección */}
        <h2 className="text-3xl font-bold text-cyan-600 mb-8">
          Locales
        </h2>

        {/* Grid de Tarjetas */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {stores.map((store) => (
            <div
              key={store.id}
              className="bg-white border border-gray-300 rounded-lg p-4 aspect-square flex flex-col items-center justify-center hover:shadow-md transition-shadow duration-200 cursor-pointer"
            >
              {/* Logo placeholder */}
              <div className="w-16 h-16 bg-gray-200 rounded-full mb-3 flex items-center justify-center">
                <span className="text-gray-500 text-xs font-bold">
                  LOGO
                </span>
              </div>
              {/* Nombre del local */}
              <span className="text-sm text-gray-700 font-medium text-center">
                {store.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
