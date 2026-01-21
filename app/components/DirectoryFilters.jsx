'use client'

import { Search, ChevronDown } from 'lucide-react'
import { useState } from 'react'

export default function DirectoryFilters() {
  const [selectedCategory, setSelectedCategory] = useState('Todas las categorías')
  const [selectedLetter, setSelectedLetter] = useState(null)

  const categories = [
    'Todas las categorías',
    'Restaurantes',
    'Tiendas',
    'Servicios',
    'Entretenimiento',
    'Belleza y Salud'
  ]

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

  return (
    <div className="bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Título de Sección */}
        <h2 className="text-3xl font-bold text-cyan-600 mb-6">
          Novedades y Noticias
        </h2>

        {/* Barra de Herramientas */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          {/* Input de búsqueda */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Buscar local..."
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Dropdown de Categorías */}
          <div className="relative md:w-64">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
          </div>
        </div>

        {/* Filtro Alfabético */}
        <div className="flex flex-wrap gap-2">
          {alphabet.map((letter) => (
            <button
              key={letter}
              onClick={() => setSelectedLetter(selectedLetter === letter ? null : letter)}
              className={`w-10 h-10 flex items-center justify-center border rounded text-sm font-medium transition-colors duration-200 ${
                selectedLetter === letter
                  ? 'bg-blue-700 text-white border-blue-700'
                  : 'bg-white text-gray-600 border-gray-300 hover:border-gray-400'
              }`}
            >
              {letter}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
