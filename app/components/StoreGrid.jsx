'use client'

import { useEffect, useMemo, useState } from 'react'
import { createLocal, resolveFotoUrl } from '../../api/locales'
import { isCloudinaryEnabled, uploadToCloudinary } from '../../api/cloudinary'
import { CATEGORIES, resolveCategory } from '../data/categories'

const defaultLogo = '/assets/images/logocompleto.png'
const fallbackCategories = CATEGORIES

export default function StoreGrid({
  stores = [],
  isLoading = false,
  loadError = '',
  emptyMessage = 'No hay locales registrados.',
  categories = [],
  onLocalCreated = () => {},
} = {}) {
  const [selectedStore, setSelectedStore] = useState(null)
  const [formData, setFormData] = useState({
    nombre_local: '',
    actividad: '',
    numero_local: '',
    planta: '',
    categoria: categories[0]?.label || fallbackCategories[0]?.label || '',
    fotoFile: null,
  })
  const [formMessage, setFormMessage] = useState('')
  const [formHasError, setFormHasError] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isUploadingImage, setIsUploadingImage] = useState(false)
  const [cloudinaryUrl, setCloudinaryUrl] = useState('')
  const [cloudinaryVariants, setCloudinaryVariants] = useState({
    optimized: '',
    cropped: '',
  })
  const [cloudinaryError, setCloudinaryError] = useState('')
  const [cloudinaryPublicId, setCloudinaryPublicId] = useState('')

  const isDevEnv = process.env.NODE_ENV !== 'production'
  const formCategories = useMemo(
    () => (categories.length > 0 ? categories : fallbackCategories),
    [categories]
  )
  const isFormValid =
    formData.nombre_local.trim() &&
    formData.actividad.trim() &&
    formData.numero_local.trim() &&
    formData.planta.trim() &&
    formData.categoria.trim()

  useEffect(() => {
    if (!formData.categoria.trim() && formCategories.length > 0) {
      setFormData((prev) => ({
        ...prev,
        categoria: formCategories[0]?.label || fallbackCategories[0]?.label || '',
      }))
    }
  }, [formCategories, formData.categoria])

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

  const buildCloudinaryVariant = (url, transform) => {
    const marker = '/upload/'
    if (!url || !url.includes(marker)) {
      return url
    }

    return url.replace(marker, `/upload/${transform}/`)
  }

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0] || null
    setFormData((prev) => ({
      ...prev,
      fotoFile: file,
    }))
    setCloudinaryUrl('')
    setCloudinaryVariants({ optimized: '', cropped: '' })
    setCloudinaryError('')

    if (!file || !isCloudinaryEnabled) {
      return
    }

    setIsUploadingImage(true)

    try {
      const publicId = cloudinaryPublicId.trim()
      const result = await uploadToCloudinary(
        file,
        publicId ? { publicId } : undefined
      )
      setCloudinaryUrl(result.secure_url)
      setCloudinaryVariants({
        optimized: buildCloudinaryVariant(result.secure_url, 'f_auto,q_auto'),
        cropped: buildCloudinaryVariant(
          result.secure_url,
          'c_auto,g_auto,w_500,h_500'
        ),
      })
    } catch (error) {
      setCloudinaryError('No se pudo subir la imagen a Cloudinary.')
    } finally {
      setIsUploadingImage(false)
    }
  }

  const handleAddStore = async (event) => {
    event.preventDefault()
    setFormMessage('')
    setFormHasError(false)

    if (!isDevEnv || !isFormValid || isSubmitting) {
      return
    }

    setIsSubmitting(true)

    try {
      const resolvedCategory = resolveCategory(formData.categoria)
      const created = await createLocal({
        nombre_local: formData.nombre_local.trim(),
        actividad: formData.actividad.trim(),
        numero_local: formData.numero_local.trim(),
        planta: formData.planta.trim(),
        categoria: resolvedCategory.label,
        fotoFile: formData.fotoFile,
      })

      const mapped = {
        id: created.id,
        nombreLocal: created.nombre_local,
        actividad: created.actividad,
        numeroLocal: created.numero_local,
        planta: created.planta,
        foto: created.foto,
        fotoUrl: cloudinaryUrl || resolveFotoUrl(created.foto),
        categoriaId: resolvedCategory.id,
        categoria: resolvedCategory.label,
      }

      onLocalCreated(mapped)
      setFormMessage('Local agregado en desarrollo.')
      setFormHasError(false)
      setFormData({
        nombre_local: '',
        actividad: '',
        numero_local: '',
        planta: '',
        categoria: formCategories[0]?.label || fallbackCategories[0]?.label || '',
        fotoFile: null,
      })
      setCloudinaryUrl('')
      setCloudinaryVariants({ optimized: '', cropped: '' })
    } catch (error) {
      setFormMessage('No se pudo crear el local. Verifica el backend.')
      setFormHasError(true)
    } finally {
      setIsSubmitting(false)
    }
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
          <p className="text-sm text-gray-500">{emptyMessage}</p>
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
                <span className="text-[10px] font-semibold uppercase tracking-wide text-[#1d1d99]">
                  {resolveCategory(store.categoria || store.categoriaId).label}
                </span>
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
                  Se guarda en la base de datos de desarrollo.
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
                Categoria
                <select
                  name="categoria"
                  value={formData.categoria}
                  onChange={handleChange}
                  className="search-input mt-2"
                  required
                >
                  {formCategories.map((cat) => (
                    <option key={cat.id} value={cat.label}>
                      {cat.label}
                    </option>
                  ))}
                </select>
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
                Public ID Cloudinary (opcional)
                <input
                  type="text"
                  name="cloudinary_public_id"
                  value={cloudinaryPublicId}
                  onChange={(event) => setCloudinaryPublicId(event.target.value)}
                  className="search-input mt-2"
                  placeholder="ej: local-cc1"
                />
              </label>

              <label className="text-sm font-semibold text-gray-600 md:col-span-2">
                Foto o logo (opcional)
                <input
                  type="file"
                  name="foto"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="search-input mt-2"
                />
              </label>

              {isUploadingImage && (
                <p className="text-sm text-gray-500 md:col-span-2">
                  Subiendo imagen...
                </p>
              )}

              {cloudinaryError && (
                <p className="text-sm text-red-500 md:col-span-2">
                  {cloudinaryError}
                </p>
              )}

              {cloudinaryUrl && (
                <div className="md:col-span-2">
                  <p className="text-sm text-gray-500">Vista previa:</p>
                  <div className="mt-2 h-28 w-28 overflow-hidden rounded-xl bg-gray-100">
                    <img
                      src={cloudinaryUrl}
                      alt="Vista previa del logo"
                      className="h-full w-full object-contain"
                      loading="lazy"
                    />
                  </div>
                  {cloudinaryVariants.optimized && cloudinaryVariants.cropped && (
                    <div className="mt-3 grid gap-3 sm:grid-cols-2">
                      <div className="rounded-xl bg-gray-100 p-2">
                        <p className="text-xs font-semibold text-gray-500">
                          Optimizada
                        </p>
                        <img
                          src={cloudinaryVariants.optimized}
                          alt="Version optimizada"
                          className="mt-2 h-24 w-full object-contain"
                          loading="lazy"
                        />
                      </div>
                      <div className="rounded-xl bg-gray-100 p-2">
                        <p className="text-xs font-semibold text-gray-500">
                          Recorte automatico
                        </p>
                        <img
                          src={cloudinaryVariants.cropped}
                          alt="Version recortada"
                          className="mt-2 h-24 w-full object-contain"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {formMessage && (
                <p
                  className={`text-sm md:col-span-2 ${
                    formHasError ? 'text-red-500' : 'text-emerald-600'
                  }`}
                >
                  {formMessage}
                </p>
              )}

              <div className="flex justify-end md:col-span-2">
                <button
                  type="submit"
                  disabled={!isFormValid || isSubmitting}
                  className="rounded-full bg-[#0ACEE5] px-6 py-2 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:bg-gray-300"
                >
                  {isSubmitting ? 'Guardando...' : 'Agregar local'}
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
            className="relative mx-auto flex h-full w-full max-w-xl flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-2xl sm:my-6 sm:h-[calc(100vh-4rem)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative h-52 w-full overflow-hidden bg-gradient-to-br from-white via-gray-50 to-slate-100 sm:h-64">
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
              <div className="relative z-10 flex h-full items-center justify-center">
                <div className="h-32 w-32 overflow-hidden rounded-full border-4 border-[#0ACEE5] bg-white shadow-2xl sm:h-40 sm:w-40">
                  <img
                    src={selectedStore.fotoUrl || defaultLogo}
                    alt={`Logo de ${selectedStore.nombreLocal}`}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="absolute left-5 top-5 z-10 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-gray-700 shadow-sm">
                  {resolveCategory(selectedStore.categoria || selectedStore.categoriaId).label}
                </span>
                <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-gray-700 shadow-sm">
                  Local {selectedStore.numeroLocal}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedStore(null)}
                className="absolute right-5 top-5 z-10 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-gray-700 shadow-sm transition hover:bg-white"
              >
                Cerrar
              </button>
            </div>

            <div className="flex-1 space-y-5 overflow-y-auto px-5 py-5 sm:px-6">
              <div>
                <h3
                  id="store-overlay-title"
                  className="text-2xl font-semibold text-gray-900"
                >
                  {selectedStore.nombreLocal}
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  {selectedStore.actividad}
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-gray-50 p-4">
                  <p className="text-xs font-semibold text-gray-500">Categoria</p>
                  <p className="text-sm font-semibold text-gray-900">
                    {resolveCategory(selectedStore.categoria || selectedStore.categoriaId).label}
                  </p>
                </div>
                <div className="rounded-2xl bg-gray-50 p-4">
                  <p className="text-xs font-semibold text-gray-500">Ubicacion</p>
                  <p className="text-sm text-gray-800">
                    Planta: {selectedStore.planta}
                  </p>
                  <p className="text-sm text-gray-800">
                    Local: {selectedStore.numeroLocal}
                  </p>
                </div>
              </div>

              <div className="rounded-2xl bg-gray-50 p-4">
                <p className="text-xs font-semibold text-gray-500">Resumen</p>
                <p className="text-sm text-gray-700">
                  {selectedStore.actividad}
                </p>
              </div>
            </div>

            <div className="border-t border-gray-100 px-5 py-4 sm:px-6">
              <button
                type="button"
                onClick={() => setSelectedStore(null)}
                className="w-full rounded-full bg-[#0ACEE5] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#08b7cc]"
              >
                Listo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
