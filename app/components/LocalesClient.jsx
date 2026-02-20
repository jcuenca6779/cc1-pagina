'use client'

import { useEffect, useMemo, useState } from 'react'
import DirectoryFilters from './DirectoryFilters'
import StoreGrid from './StoreGrid'
import { getLocales, resolveFotoUrl } from '../../api/locales'
import { ALL_CATEGORIES_OPTION, CATEGORIES, resolveCategory } from '../data/categories'

const inferCategoryName = (item = {}) => {
  const rawCategory =
    item.categoria ||
    item.categoria_nombre ||
    item.categoriaNombre ||
    item.categoria_name ||
    ''

  if (rawCategory) {
    return rawCategory
  }

  const actividad = (item.actividad || '').toLowerCase()

  if (actividad.includes('moda') || actividad.includes('ropa') || actividad.includes('textil')) {
    return 'Moda'
  }
  if (
    actividad.includes('tec') ||
    actividad.includes('comput') ||
    actividad.includes('cel') ||
    actividad.includes('telefono')
  ) {
    return 'Tecnologia'
  }
  if (actividad.includes('servicio') || actividad.includes('repar')) {
    return 'Servicios'
  }
  if (
    actividad.includes('comida') ||
    actividad.includes('restaur') ||
    actividad.includes('cafe') ||
    actividad.includes('panader')
  ) {
    return 'Gastronomia'
  }
  if (
    actividad.includes('belleza') ||
    actividad.includes('peluquer') ||
    actividad.includes('estet') ||
    actividad.includes('spa')
  ) {
    return 'Belleza'
  }
  if (
    actividad.includes('salud') ||
    actividad.includes('farmac') ||
    actividad.includes('medic') ||
    actividad.includes('odont')
  ) {
    return 'Salud'
  }

  return 'Otros'
}

const mapApiItem = (item) => {
  const resolvedCategory = resolveCategory(inferCategoryName(item))

  return {
    id: item.id,
    nombreLocal: item.nombre_local,
    actividad: item.actividad,
    numeroLocal: item.numero_local,
    planta: item.planta,
    foto: item.foto,
    fotoUrl: resolveFotoUrl(item.foto),
    categoriaId: resolvedCategory.id,
    categoria: resolvedCategory.label,
  }
}

export default function LocalesClient({ initialApiLocales = null, initialError = '' } = {}) {
  const hasInitial = Array.isArray(initialApiLocales)
  const [stores, setStores] = useState(() =>
    hasInitial ? initialApiLocales.map(mapApiItem) : []
  )
  const [isLoading, setIsLoading] = useState(!hasInitial)
  const [loadError, setLoadError] = useState(initialError)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategoryId, setSelectedCategoryId] = useState(
    ALL_CATEGORIES_OPTION.id
  )
  const [selectedLetter, setSelectedLetter] = useState(null)

  const categories = useMemo(() => {
    const map = new Map(CATEGORIES.map((category) => [category.id, category]))
    stores.forEach((store) => {
      const resolved = resolveCategory(store.categoria || store.categoriaId)
      if (!map.has(resolved.id)) {
        map.set(resolved.id, resolved)
      }
    })

    return Array.from(map.values())
  }, [stores])

  const filterCategories = useMemo(
    () => [ALL_CATEGORIES_OPTION, ...categories],
    [categories]
  )

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

  useEffect(() => {
    if (!filterCategories.some((cat) => cat.id === selectedCategoryId)) {
      setSelectedCategoryId(ALL_CATEGORIES_OPTION.id)
    }
  }, [filterCategories, selectedCategoryId])

  const filteredStores = useMemo(() => {
    const term = searchTerm.trim().toLowerCase()

    return stores.filter((store) => {
      if (
        selectedCategoryId &&
        selectedCategoryId !== ALL_CATEGORIES_OPTION.id &&
        store.categoriaId !== selectedCategoryId
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
  }, [stores, searchTerm, selectedCategoryId, selectedLetter])

  const handleLetterToggle = (letter) => {
    setSelectedLetter((prev) => (prev === letter ? null : letter))
  }

  const handleLocalCreated = (newStore) => {
    setStores((prev) => [newStore, ...prev])
  }

  const hasFilters =
    Boolean(searchTerm.trim()) ||
    Boolean(selectedLetter) ||
    (selectedCategoryId && selectedCategoryId !== ALL_CATEGORIES_OPTION.id)

  const emptyMessage = hasFilters
    ? 'No hay locales con los filtros seleccionados.'
    : 'No hay locales registrados.'

  return (
    <div className="min-h-screen flex flex-col">
      <DirectoryFilters
        categories={filterCategories}
        selectedCategoryId={selectedCategoryId}
        onCategoryChange={setSelectedCategoryId}
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
        categories={categories}
        onLocalCreated={handleLocalCreated}
      />
    </div>
  )
}

