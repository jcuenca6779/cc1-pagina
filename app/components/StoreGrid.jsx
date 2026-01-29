'use client'

import { useEffect, useState } from 'react'

const defaultLogo = '/assets/images/logocompleto.png'
const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'
const apiUrl = apiBaseUrl.replace(/\/$/, '')

export default function StoreGrid() {
  const [stores, setStores] = useState([])
  const [selectedStore, setSelectedStore] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState('')
  const [formData, setFormData] = useState({
    nombre_local: '',
    actividad: '',
    numero_local: '',
    planta: '',
    foto_url: '',
  })
  const [formMessage, setFormMessage] = useState('')

  const isDevEnv = process.env.NODE_ENV !== 'production'
  const isFormValid =
    formData.nombre_local.trim() &&
    formData.actividad.trim() &&
    formData.numero_local.trim() &&
    formData.planta.trim()

  useEffect(() => {
    const loadStores = async () => {
      setIsLoading(true)
      setLoadError('')

      try {
        const response = await fetch(`${apiUrl}/locales`, {
          cache: 'no-store',
        })

        if (!response.ok) {
          throw new Error('No se pudo cargar los locales.')
        }

        const data = await response.json()
        const mapped = data.map((item) => ({
          id: item.id,
          nombreLocal: item.nombre_local,
          actividad: item.actividad,
          numeroLocal: item.numero_local,
          planta: item.planta,
          foto: item.foto,
          fotoUrl: item.foto ? `${apiUrl}/uploads/${item.foto}` : null,
        }))

        setStores(mapped)
      } catch (error) {
        setLoadError('No se pudo cargar los locales. Verifica el backend.')
      } finally {
        setIsLoading(false)
      }
    }

    loadStores()
  }, [])

  useEffect(() => {
    if (!selectedStore) {
      return undefined
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setSelectedStore(null)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedStore])

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleAddStore = (event) => {
    event.preventDefault()
    setFormMessage('')

    if (!isDevEnv || !isFormValid) {
      return
    }

    const newStore = {
      id: Date.now(),
      nombreLocal: formData.nombre_local.trim(),
      actividad: formData.actividad.trim(),
      numeroLocal: formData.numero_local.trim(),
      planta: formData.planta.trim(),
      foto: null,
      fotoUrl: formData.foto_url.trim() || null,
    }

    setStores((prev) => [newStore, ...prev])
    setFormData({
      nombre_local: '',
      actividad: '',
      numero_local: '',
      planta: '',
      foto_url: '',
    })
    setFormMessage('Local agregado en desarrollo (no se guarda).')
  }

  return (
    <div id="locales" className="py-8 bg-gray-50">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Titulo de Seccion */}
        <h2 className="text-3xl font-bold gradient-text">Locales</h2>

        {isLoading && (
          <p className="text-sm text-gray-500">Cargando locales...</p>
        )}

        {!isLoading && loadError && (
          <p className="text-sm text-red-500">{loadError}</p>
        )}

        {!isLoading && !loadError && stores.length === 0 && (
          <p className="text-sm text-gray-500">No hay locales registrados.</p>
        )}

        {!isLoading && !loadError && stores.length > 0 && (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {stores.map((store) => (
              <button
                key={store.id}
                type="button"
                onClick={() => setSelectedStore(store)}
                className="store-card aspect-square text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0ACEE5]/60"
                aria-label={`Ver detalles de ${store.nombreLocal}`}
              >
                <div className="flex items-center justify-center w-16 h-16 mb-3 overflow-hidden bg-gray-200 rounded-full">
                  {store.fotoUrl ? (
                    <img
                      src={store.fotoUrl}
                      alt={`Logo de ${store.nombreLocal}`}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <span className="text-xs font-bold text-gray-500">LOGO</span>
                  )}
                </div>
                <span className="text-xs font-semibold text-gray-500">
                  Local {store.numeroLocal}
                </span>
                <span className="text-sm font-medium text-center text-gray-700">
                  {store.nombreLocal}
                </span>
              </button>
            ))}
          </div>
        )}

        {isDevEnv && (
          <div className="mt-10 rounded-2xl border border-dashed border-gray-200 bg-white p-6">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Agregar local (solo desarrollo)
                </h3>
                <p className="text-sm text-gray-500">
                  Estos datos solo se muestran en tu navegador.
                </p>
              </div>
              <span className="w-fit rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-500">
                DEV
              </span>
            </div>

            <form onSubmit={handleAddStore} className="mt-4 grid gap-4 md:grid-cols-2">
              <label className="text-sm font-semibold text-gray-600">
                Nombre del local
                <input
                  type="text"
                  name="nombre_local"
                  value={formData.nombre_local}
                  onChange={handleChange}
                  className="search-input mt-2"
                  placeholder="Nombre comercial"
                  required
                />
              </label>

              <label className="text-sm font-semibold text-gray-600">
                Actividad
                <input
                  type="text"
                  name="actividad"
                  value={formData.actividad}
                  onChange={handleChange}
                  className="search-input mt-2"
                  placeholder="Actividad del local"
                  required
                />
              </label>

              <label className="text-sm font-semibold text-gray-600">
                Numero de local
                <input
                  type="text"
                  name="numero_local"
                  value={formData.numero_local}
                  onChange={handleChange}
                  className="search-input mt-2"
                  placeholder="Ej: L-13"
                  required
                />
              </label>

              <label className="text-sm font-semibold text-gray-600">
                Planta
                <input
                  type="text"
                  name="planta"
                  value={formData.planta}
                  onChange={handleChange}
                  className="search-input mt-2"
                  placeholder="Planta baja, primer piso..."
                  required
                />
              </label>

              <label className="text-sm font-semibold text-gray-600 md:col-span-2">
                Foto o logo (URL opcional)
                <input
                  type="text"
                  name="foto_url"
                  value={formData.foto_url}
                  onChange={handleChange}
                  className="search-input mt-2"
                  placeholder="https://..."
                />
              </label>

              {formMessage && (
                <p className="text-sm text-emerald-600 md:col-span-2">
                  {formMessage}
                </p>
              )}

              <div className="flex justify-end md:col-span-2">
                <button
                  type="submit"
                  disabled={!isFormValid}
                  className="rounded-full bg-[#0ACEE5] px-6 py-2 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:bg-gray-300"
                >
                  Agregar local
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {selectedStore && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={() => setSelectedStore(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="store-overlay-title"
            className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="space-y-5">
              <div className="relative h-40 w-full overflow-hidden rounded-2xl bg-gray-100">
                <img
                  src={selectedStore.fotoUrl || defaultLogo}
                  alt={`Logo de ${selectedStore.nombreLocal}`}
                  className="h-full w-full object-contain p-6"
                  loading="lazy"
                />
              </div>

              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase text-gray-500">
                    Local {selectedStore.numeroLocal}
                  </p>
                  <h3
                    id="store-overlay-title"
                    className="text-2xl font-semibold text-gray-900"
                  >
                    {selectedStore.nombreLocal}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {selectedStore.actividad}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedStore(null)}
                  className="rounded-full border border-gray-200 px-3 py-1 text-sm text-gray-600 hover:bg-gray-100"
                >
                  Cerrar
                </button>
              </div>

              <div className="flex flex-col gap-4">
                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="text-xs font-semibold text-gray-500">Ubicacion</p>
                  <p className="text-sm text-gray-800">
                    Planta: {selectedStore.planta}
                  </p>
                  <p className="text-sm text-gray-800">
                    Local: {selectedStore.numeroLocal}
                  </p>
                </div>

                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="text-xs font-semibold text-gray-500">Actividad</p>
                  <p className="text-sm text-gray-700">
                    {selectedStore.actividad}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
