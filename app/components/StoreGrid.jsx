'use client'

import { useEffect, useMemo, useState } from 'react'
import { createLocal, updateLocal, updateLocalFoto, resolveFotoUrl } from '../../api/locales'
import { uploadToImgBB } from '../api/imgbb'
import { CATEGORIES, resolveCategory } from '../data/categories'

const defaultLogo = '/assets/images/logocompleto.png'
const fallbackCategories = CATEGORIES

export default function StoreGrid({
  stores = [],
  isLoading = false,
  loadError = '',
  emptyMessage = 'No hay locales registrados.',
  categories = [],
  onLocalCreated = () => { },
  onLocalUpdated = () => { },
} = {}) {
  const [selectedStore, setSelectedStore] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editFormData, setEditFormData] = useState({
    nombre_local: '',
    actividad: '',
    numero_local: '',
    planta: '',
    categoria: '',
  })
  const [editFotoFile, setEditFotoFile] = useState(null)
  const [editUploadedUrl, setEditUploadedUrl] = useState('')
  const [isUploadingEditPhoto, setIsUploadingEditPhoto] = useState(false)
  const [isSubmittingEdit, setIsSubmittingEdit] = useState(false)
  const [editMessage, setEditMessage] = useState('')
  const [editHasError, setEditHasError] = useState(false)

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

  const [uploadedUrl, setUploadedUrl] = useState('')

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
    if (!selectedStore) return
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        if (isEditing) setIsEditing(false)
        else setSelectedStore(null)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedStore, isEditing])

  // Al abrir edición, rellenar formulario con los datos del local
  useEffect(() => {
    if (selectedStore && isEditing) {
      setEditFormData({
        nombre_local: selectedStore.nombreLocal || '',
        actividad: selectedStore.actividad || '',
        numero_local: selectedStore.numeroLocal || '',
        planta: selectedStore.planta || '',
        categoria: selectedStore.categoria || formCategories[0]?.label || '',
      })
      setEditFotoFile(null)
      setEditUploadedUrl('')
      setEditMessage('')
      setEditHasError(false)
    }
  }, [selectedStore?.id, isEditing])

  // --- FUNCIÓN PARA OBTENER LA IMAGEN ---
  // Prioriza fotoUrl (URL completa del backend o ImgBB) y luego foto (puede ser URL externa)
  const getStoreImageUrl = (store) => {
    if (!store) return defaultLogo;
    const url = store.fotoUrl || store.foto;
    if (!url) return defaultLogo;
    if (url.startsWith('http') || url.startsWith('https')) return url;
    // Si el backend devuelve path relativo, fotoUrl ya debería ser la URL completa
    if (store.fotoUrl) return store.fotoUrl;
    return defaultLogo;
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0] || null
    setFormData((prev) => ({ ...prev, fotoFile: file }))
    setUploadedUrl('')

    if (!file) return

    setIsUploadingImage(true)
    try {
      const url = await uploadToImgBB(file)
      console.log('Imagen subida a ImgBB:', url)
      setUploadedUrl(url)
    } catch (error) {
      setFormMessage('Error al subir a ImgBB.')
      setFormHasError(true)
    } finally {
      setIsUploadingImage(false)
    }
  }

  const handleAddStore = async (event) => {
    event.preventDefault()
    setFormMessage('')
    setFormHasError(false)

    if (!isDevEnv || !isFormValid || isSubmitting) return

    setIsSubmitting(true)

    try {
      const resolvedCategory = resolveCategory(formData.categoria)

      // Enviamos la URL al backend
      const created = await createLocal({
        nombre_local: formData.nombre_local.trim(),
        actividad: formData.actividad.trim(),
        numero_local: formData.numero_local.trim(),
        planta: formData.planta.trim(),
        categoria: resolvedCategory.label,
        foto: uploadedUrl || '', // ENVIAMOS LA URL DE IMGBB
      })

      const mapped = {
        id: created.id,
        nombreLocal: created.nombre_local,
        actividad: created.actividad,
        numeroLocal: created.numero_local,
        planta: created.planta,
        foto: uploadedUrl || created.foto, // Usamos la URL que acabamos de subir
        fotoUrl: uploadedUrl || created.foto,
        categoriaId: resolvedCategory.id,
        categoria: resolvedCategory.label,
      }

      onLocalCreated(mapped)
      setFormMessage('¡Local agregado con foto!')

      setFormData({
        nombre_local: '',
        actividad: '',
        numero_local: '',
        planta: '',
        categoria: formCategories[0]?.label || '',
        fotoFile: null,
      })
      setUploadedUrl('')
    } catch (error) {
      setFormMessage('Error al guardar.')
      setFormHasError(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEditChange = (event) => {
    const { name, value } = event.target
    setEditFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleEditFileChange = async (event) => {
    const file = event.target.files?.[0] || null
    setEditFotoFile(file)
    setEditUploadedUrl('')
    if (!file) return
    setIsUploadingEditPhoto(true)
    try {
      const url = await uploadToImgBB(file)
      setEditUploadedUrl(url)
    } catch {
      setEditMessage('Error al subir la imagen.')
      setEditHasError(true)
    } finally {
      setIsUploadingEditPhoto(false)
    }
  }

  const handleSaveEdit = async (event) => {
    event.preventDefault()
    if (!selectedStore || isSubmittingEdit) return
    setEditMessage('')
    setEditHasError(false)
    setIsSubmittingEdit(true)
    try {
      const resolvedCategory = resolveCategory(editFormData.categoria)
      await updateLocal(selectedStore.id, {
        nombre_local: editFormData.nombre_local.trim(),
        actividad: editFormData.actividad.trim(),
        numero_local: editFormData.numero_local.trim(),
        planta: editFormData.planta.trim(),
        categoria: resolvedCategory.label,
      })
      let newFoto = selectedStore.foto || selectedStore.fotoUrl
      if (editFotoFile) {
        try {
          const res = await updateLocalFoto(selectedStore.id, editFotoFile)
          newFoto = res.foto?.startsWith('http') ? res.foto : (resolveFotoUrl(res.foto) || res.foto)
        } catch {
          setEditMessage('Local actualizado, pero falló la foto.')
          setEditHasError(true)
        }
      }
      const updatedStore = {
        ...selectedStore,
        nombreLocal: editFormData.nombre_local.trim(),
        actividad: editFormData.actividad.trim(),
        numeroLocal: editFormData.numero_local.trim(),
        planta: editFormData.planta.trim(),
        categoria: resolvedCategory.label,
        categoriaId: resolvedCategory.id,
        foto: newFoto,
        fotoUrl: newFoto?.startsWith('http') ? newFoto : (resolveFotoUrl(newFoto) || newFoto),
      }
      onLocalUpdated(updatedStore)
      setSelectedStore(updatedStore)
      setIsEditing(false)
      setEditMessage('Cambios guardados.')
    } catch (error) {
      setEditMessage('Error al actualizar el local.')
      setEditHasError(true)
    } finally {
      setIsSubmittingEdit(false)
    }
  }

  return (
    <div id="locales" className="py-8 bg-gray-50">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold gradient-text">Locales</h2>

        {isLoading && <p className="text-sm text-gray-500">Cargando locales...</p>}
        {!isLoading && loadError && <p className="text-sm text-red-500">{loadError}</p>}

        <div className="grid grid-cols-2 gap-4 mt-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {stores.map((store) => (
            <button
              key={store.id}
              onClick={() => setSelectedStore(store)}
              className="text-left transition-transform store-card aspect-square focus:outline-none hover:scale-105"
            >
              {/* Imagen circular en la tarjeta (antes de abrir el pop-up) */}
              <div className="flex items-center justify-center w-24 h-24 mx-auto mb-3 overflow-hidden bg-gray-200 rounded-full shrink-0">
                <img
                  src={getStoreImageUrl(store)}
                  alt={store.nombreLocal || 'Local'}
                  className="object-cover w-full h-full"
                  crossOrigin="anonymous"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = defaultLogo
                    e.currentTarget.onerror = null
                  }}
                />
              </div>
              <div className="px-2">
                <span className="block text-[10px] font-semibold uppercase text-[#1d1d99]">
                  {store.categoria}
                </span>
                <span className="block text-xs font-semibold text-gray-500">
                  Local {store.numeroLocal}
                </span>
                <span className="block text-sm font-medium text-gray-700 truncate">
                  {store.nombreLocal}
                </span>
              </div>
            </button>
          ))}
        </div>

        {isDevEnv && (
          <div className="p-6 mt-10 bg-white border border-gray-200 border-dashed shadow-sm rounded-2xl">
            <h3 className="mb-2 text-lg font-semibold text-gray-900">Agregar local (solo desarrollo)</h3>
            <p className="mb-4 text-xs text-gray-500">Las fotos se guardan en ImgBB para siempre.</p>

            <form onSubmit={handleAddStore} className="grid gap-4 md:grid-cols-2">
              <input name="nombre_local" placeholder="Nombre comercial" value={formData.nombre_local} onChange={handleChange} className="search-input" required />
              <input name="actividad" placeholder="Actividad" value={formData.actividad} onChange={handleChange} className="search-input" required />
              <select name="categoria" value={formData.categoria} onChange={handleChange} className="search-input">
                {formCategories.map(cat => <option key={cat.id} value={cat.label}>{cat.label}</option>)}
              </select>
              <input name="numero_local" placeholder="Número Local (ej: L-10)" value={formData.numero_local} onChange={handleChange} className="search-input" required />
              <input name="planta" placeholder="Planta" value={formData.planta} onChange={handleChange} className="search-input" required />

              <div className="md:col-span-2">
                <label className="block mb-1 text-sm font-medium text-gray-700">Foto del local</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>

              {isUploadingImage && <p className="text-xs font-bold text-blue-500 animate-pulse">Subiendo a ImgBB...</p>}

              {uploadedUrl && (
                <div className="flex items-center gap-4 p-2 rounded-lg md:col-span-2 bg-green-50">
                  <img src={uploadedUrl} className="object-cover w-16 h-16 border border-green-200 rounded-full" alt="Vista previa" />
                  <p className="text-sm font-medium text-green-700">¡Foto lista!</p>
                </div>
              )}

              {formMessage && (
                <p className={`text-sm md:col-span-2 ${formHasError ? 'text-red-500' : 'text-emerald-600'}`}>
                  {formMessage}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting || isUploadingImage}
                className="md:col-span-2 bg-[#0ACEE5] text-white py-2 rounded-full font-bold hover:bg-[#09bccf] disabled:bg-gray-300 transition-colors"
              >
                {isSubmitting ? 'Guardando...' : 'Agregar local'}
              </button>
            </form>
          </div>
        )}
      </div>

      {selectedStore && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 duration-200 bg-black/60 animate-in fade-in"
          onClick={() => setSelectedStore(null)}
        >
          <div
            className="relative w-full max-w-xl mx-auto overflow-hidden transition-all transform bg-white shadow-2xl rounded-3xl"
            onClick={(e) => e.stopPropagation()}
          >
{/* En el pop-up la imagen ocupa todo el espacio (rectangular, sin círculo) */}
            <div className="relative w-full overflow-hidden h-80 sm:h-96 rounded-t-3xl">
              <img
                src={getStoreImageUrl(selectedStore)}
                alt={selectedStore.nombreLocal}
                className="absolute inset-0 w-full h-full object-cover object-center rounded-none"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src = defaultLogo
                  e.currentTarget.onerror = null
                }}
              />

              {/* DEGRADADO ENCIMA */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />

              {/* CHIPS ARRIBA A LA IZQUIERDA */}
              <div className="absolute z-10 flex gap-2 left-4 top-4">
                <span className="px-3 py-1 text-xs font-semibold text-gray-700 rounded-full shadow-sm bg-white/90">
                  {selectedStore.categoria}
                </span>
                <span className="px-3 py-1 text-xs font-semibold text-gray-700 rounded-full shadow-sm bg-white/90">
                  Local {selectedStore.numeroLocal}
                </span>
              </div>

              {/* BOTÓN CERRAR */}
              <button
                onClick={() => setSelectedStore(null)}
                className="absolute z-10 px-3 py-1 text-xs font-semibold text-gray-700 transition rounded-full shadow-sm right-4 top-4 bg-white/90 hover:bg-white"
              >
                Cerrar
              </button>
            </div>


            <div className="p-6 space-y-4">
              {!isEditing ? (
                <>
                  <div className="text-center sm:text-left">
                    <h3 className="text-2xl font-bold text-gray-900">{selectedStore.nombreLocal}</h3>
                    <p className="text-lg text-gray-600">{selectedStore.actividad}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 border border-gray-100 rounded-xl bg-gray-50">
                      <p className="text-xs font-bold tracking-wider text-gray-400 uppercase">Ubicación</p>
                      <p className="mt-1 text-sm font-semibold text-gray-800">Local {selectedStore.numeroLocal}</p>
                      <p className="text-xs text-gray-500">{selectedStore.planta}</p>
                    </div>
                    <div className="p-4 border border-gray-100 rounded-xl bg-gray-50">
                      <p className="text-xs font-bold tracking-wider text-gray-400 uppercase">Categoría</p>
                      <p className="mt-1 text-sm font-semibold text-gray-800">{selectedStore.categoria}</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setIsEditing(true)}
                      className="flex-1 rounded-full border-2 border-[#0ACEE5] py-3 font-bold text-[#0ACEE5] hover:bg-[#0ACEE5] hover:text-white transition-colors"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => setSelectedStore(null)}
                      className="flex-1 rounded-full bg-[#0ACEE5] py-3 font-bold text-white hover:bg-[#09bccf] transition-colors shadow-lg shadow-cyan-500/30"
                    >
                      Listo
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h3 className="text-lg font-bold text-gray-900">Editar local</h3>
                  <form onSubmit={handleSaveEdit} className="space-y-3">
                    <input name="nombre_local" value={editFormData.nombre_local} onChange={handleEditChange} placeholder="Nombre comercial" className="search-input" required />
                    <input name="actividad" value={editFormData.actividad} onChange={handleEditChange} placeholder="Actividad" className="search-input" required />
                    <select name="categoria" value={editFormData.categoria} onChange={handleEditChange} className="search-input">
                      {formCategories.map((cat) => <option key={cat.id} value={cat.label}>{cat.label}</option>)}
                    </select>
                    <input name="numero_local" value={editFormData.numero_local} onChange={handleEditChange} placeholder="Número local" className="search-input" required />
                    <input name="planta" value={editFormData.planta} onChange={handleEditChange} placeholder="Planta" className="search-input" required />
                    <div>
                      <label className="block mb-1 text-sm font-medium text-gray-700">Cambiar foto (opcional)</label>
                      <input type="file" accept="image/*" onChange={handleEditFileChange} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700" />
                    </div>
                    {isUploadingEditPhoto && <p className="text-xs text-blue-600">Subiendo imagen...</p>}
                    {(editUploadedUrl || editFotoFile) && !isUploadingEditPhoto && <p className="text-xs text-green-600">Nueva foto lista</p>}
                    {editMessage && <p className={`text-sm ${editHasError ? 'text-red-500' : 'text-green-600'}`}>{editMessage}</p>}
                    <div className="flex gap-3 pt-2">
                      <button type="button" onClick={() => setIsEditing(false)} className="flex-1 rounded-full border border-gray-300 py-2 font-medium text-gray-700 hover:bg-gray-50">Cancelar</button>
                      <button type="submit" disabled={isSubmittingEdit || isUploadingEditPhoto} className="flex-1 rounded-full bg-[#0ACEE5] py-2 font-bold text-white hover:bg-[#09bccf] disabled:opacity-50">Guardar</button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}