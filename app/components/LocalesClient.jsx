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

  const handleLocalUpdated = (updatedStore) => {
    setStores((prev) =>
      prev.map((s) => (s.id === updatedStore.id ? { ...s, ...updatedStore } : s))
    )
  }

  const hasFilters =
    Boolean(searchTerm.trim()) ||
    Boolean(selectedLetter) ||
    (selectedCategoryId && selectedCategoryId !== ALL_CATEGORIES_OPTION.id)

  const emptyMessage = hasFilters
    ? 'No hay locales con los filtros seleccionados.'
    : 'No hay locales registrados.'

  const defaultLogo = '/assets/images/logocompleto.png'
  const getStoreImageUrl = (store) => {
    if (!store) return defaultLogo
    const url = store.fotoUrl || store.foto
    if (!url) return defaultLogo
    if (url.startsWith('http')) return url
    return store.fotoUrl || defaultLogo
  }

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
        onLocalUpdated={handleLocalUpdated}
      />

      {/* Sección: ver todas las fotos subidas al backend */}
      {stores.length > 0 && (
        <section className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8 bg-white border-t border-gray-100">
          <h2 className="mb-4 text-xl font-bold text-gray-800">Fotos subidas al backend</h2>
          <p className="mb-6 text-sm text-gray-500">
            Todas las imágenes que devuelve el backend para cada local. Haz clic en una para abrir la URL en una pestaña nueva.
          </p>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {stores.map((store) => {
              const imgUrl = getStoreImageUrl(store)
              const hasPhoto = imgUrl && imgUrl !== defaultLogo
              return (
                <a
                  key={store.id}
                  href={hasPhoto ? imgUrl : undefined}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex flex-col rounded-xl border bg-gray-50 overflow-hidden transition hover:shadow-md ${!hasPhoto ? 'pointer-events-none opacity-75' : ''}`}
                >
                  <div className="aspect-square bg-gray-200 flex items-center justify-center">
                    <img
                      src={imgUrl}
                      alt={store.nombreLocal || 'Local'}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = defaultLogo
                        e.currentTarget.onerror = null
                      }}
                    />
                  </div>
                  <div className="p-2 text-center">
                    <p className="text-xs font-medium text-gray-700 truncate">{store.nombreLocal || 'Sin nombre'}</p>
                    <p className="text-[10px] text-gray-400">Local {store.numeroLocal}</p>
                    {hasPhoto && (
                      <p className="text-[10px] text-cyan-600 truncate mt-1" title={imgUrl}>
                        Ver URL
                      </p>
                    )}
                  </div>
                </a>
              )
            })}
          </div>
        </section>
      )}
    </div>
  )
}

