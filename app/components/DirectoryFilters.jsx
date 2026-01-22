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
    <div className="py-8 bg-gray-50">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Título de Sección */}
        <h2 className="text-3xl font-bold gradient-text">
          Novedades y Noticias
        </h2>

        {/* Barra de Herramientas */}
        <div className="flex flex-col gap-4 mb-6 md:flex-row">
          {/* Input de búsqueda */}
          <div className="relative flex-1">
            <Search className="absolute text-gray-400 transform -translate-y-1/2 left-4 top-1/2" size={20} />
            <input
              type="text"
              placeholder="Buscar local..."
              className="search-input"
            />
          </div>

          {/* Dropdown de Categorías */}
          <div className="relative md:w-64">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="category-select"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute text-gray-400 transform -translate-y-1/2 pointer-events-none right-4 top-1/2" size={20} />
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
  ? 'bg-[#1d1d99] text-white border-[#1d1d99]'
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
