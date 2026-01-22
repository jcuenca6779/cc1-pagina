export default function StoreGrid() {
  // Datos de ejemplo para las tarjetas
  const stores = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    name: `Local ${i + 1}`,
  }))

  return (
    <div className="py-8 bg-gray-50">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Título de Sección */}
        <h2 className="text-3xl font-bold gradient-text">
          Locales
        </h2>

        {/* Grid de Tarjetas */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {stores.map((store) => (
            <div
              key={store.id}
              className="flex flex-col items-center justify-center p-4 transition-shadow duration-200 bg-white border border-gray-300 rounded-lg cursor-pointer aspect-square hover:shadow-md"
            >
              {/* Logo placeholder */}
              <div className="flex items-center justify-center w-16 h-16 mb-3 bg-gray-200 rounded-full">
                <span className="text-xs font-bold text-gray-500">
                  LOGO
                </span>
              </div>
              {/* Nombre del local */}
              <span className="text-sm font-medium text-center text-gray-700">
                {store.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
