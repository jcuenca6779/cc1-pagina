'use client'

import { useEffect, useMemo, useState } from 'react'
import DirectoryFilters from './DirectoryFilters'
import StoreGrid from './StoreGrid'
import { getLocales, resolveFotoUrl } from '../../api/locales'

const DEFAULT_CATEGORIES = ['Comercio', 'Moda', 'Tecnologia', 'Servicios', 'Gastronomia']

const deriveCategory = (actividad = '') => {
  const value = actividad.toLowerCase()

  if (value.includes('moda') || value.includes('ropa') || value.includes('textil')) {
    return 'Moda'
  }
  if (
    value.includes('tec') ||
    value.includes('comput') ||
    value.includes('cel') ||
    value.includes('telefono')
  ) {
    return 'Tecnologia'
  }
  if (value.includes('servicio') || value.includes('repar')) {
    return 'Servicios'
  }
  if (
    value.includes('comida') ||
    value.includes('restaur') ||
    value.includes('cafe') ||
    value.includes('panader')
  ) {
    return 'Gastronomia'
  }

  return 'Comercio'
}

const mapApiItem = (item) => ({
  id: item.id,
  nombreLocal: item.nombre_local,
  actividad: item.actividad,
  numeroLocal: item.numero_local,
  planta: item.planta,
  foto: item.foto,
  fotoUrl: resolveFotoUrl(item.foto),
  categoria: deriveCategory(item.actividad),
})

export default function LocalesClient({ initialApiLocales = null, initialError = '' } = {}) {
  const hasInitial = Array.isArray(initialApiLocales)
  const [stores, setStores] = useState(() =>
    hasInitial ? initialApiLocales.map(mapApiItem) : []
  )
  const [isLoading, setIsLoading] = useState(!hasInitial)
  const [loadError, setLoadError] = useState(initialError)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Todas las categorias')
  const [selectedLetter, setSelectedLetter] = useState(null)

  useEffect(() => {
    if (hasInitial) {
      return
    }

    const loadStores = async () => {
      setIsLoading(true)
      setLoadError('')

      try {
        const data = await getLocales()
        setStores(data.map(mapApiItem))
      } catch (error) {
        setLoadError('No se pudo cargar los locales. Verifica el backend.')
      } finally {
        setIsLoading(false)
      }
    }

    loadStores()
  }, [hasInitial])

  const categories = useMemo(() => {
    const set = new Set()
    stores.forEach((store) => {
      if (store.categoria) {
        set.add(store.categoria)
      }
    })

    let list = Array.from(set)
    if (list.length === 0) {
      list = DEFAULT_CATEGORIES.slice()
    }

    list.sort()
    return ['Todas las categorias', ...list]
  }, [stores])

  const formCategories = useMemo(
    () => categories.filter((cat) => cat !== 'Todas las categorias'),
    [categories]
  )

  useEffect(() => {
    if (!categories.includes(selectedCategory)) {
      setSelectedCategory('Todas las categorias')
    }
  }, [categories, selectedCategory])

  const filteredStores = useMemo(() => {
    const term = searchTerm.trim().toLowerCase()

    return stores.filter((store) => {
      if (
        selectedCategory &&
        selectedCategory !== 'Todas las categorias' &&
        store.categoria !== selectedCategory
      ) {
        return false
      }

      if (selectedLetter) {
        const firstLetter = (store.nombreLocal || '').trim().charAt(0).toUpperCase()
        if (firstLetter !== selectedLetter) {
          return false
        }
      }

      if (term) {
        const haystack = `${store.nombreLocal} ${store.actividad} ${store.numeroLocal} ${store.categoria}`
          .toLowerCase()
          .trim()
        if (!haystack.includes(term)) {
          return false
        }
      }

      return true
    })
  }, [stores, searchTerm, selectedCategory, selectedLetter])

  const handleLetterToggle = (letter) => {
    setSelectedLetter((prev) => (prev === letter ? null : letter))
  }

  const handleLocalCreated = (newStore) => {
    setStores((prev) => [newStore, ...prev])
  }

  const hasFilters =
    Boolean(searchTerm.trim()) ||
    Boolean(selectedLetter) ||
    (selectedCategory && selectedCategory !== 'Todas las categorias')

  const emptyMessage = hasFilters
    ? 'No hay locales con los filtros seleccionados.'
    : 'No hay locales registrados.'

  return (
    <div className="min-h-screen flex flex-col">
      <DirectoryFilters
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        selectedLetter={selectedLetter}
        onLetterChange={handleLetterToggle}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />
      <StoreGrid
        stores={filteredStores}
        isLoading={isLoading}
        loadError={loadError}
        emptyMessage={emptyMessage}
        categories={formCategories}
        onLocalCreated={handleLocalCreated}
      />
    </div>
  )
}
