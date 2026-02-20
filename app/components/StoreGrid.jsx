"use client";

import { useEffect, useMemo, useState } from "react";
import { createLocal, updateLocal, deleteLocal } from "../../api/locales";
import { uploadToImgBB } from "../api/imgbb";
import { CATEGORIES, resolveCategory } from "../data/categories";

const defaultLogo = "/assets/images/logocompleto.png";
const fallbackCategories = CATEGORIES;

export default function StoreGrid({
  stores = [],
  isLoading = false,
  loadError = "",
  emptyMessage = "No hay locales registrados.",
  categories = [],
  onLocalCreated = () => {},
} = {}) {
  const isDevEnv = process.env.NODE_ENV !== "production";

  const [selectedStore, setSelectedStore] = useState(null);

  const [formData, setFormData] = useState({
    nombre_local: "",
    actividad: "",
    numero_local: "",
    planta: "",
    categoria: categories[0]?.label || fallbackCategories[0]?.label || "",
    fotoFile: null,
  });

  const [formMessage, setFormMessage] = useState("");
  const [formHasError, setFormHasError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState("");

  // edición
  const [editingStore, setEditingStore] = useState(null);
  const [editData, setEditData] = useState({
    nombre_local: "",
    actividad: "",
    numero_local: "",
    planta: "",
    categoria: "",
  });

  const formCategories = useMemo(
    () => (categories.length > 0 ? categories : fallbackCategories),
    [categories]
  );

  const isFormValid =
    formData.nombre_local.trim() &&
    formData.actividad.trim() &&
    formData.numero_local.trim() &&
    formData.planta.trim() &&
    formData.categoria.trim();

  useEffect(() => {
    if (!formData.categoria.trim() && formCategories.length > 0) {
      setFormData((prev) => ({
        ...prev,
        categoria:
          formCategories[0]?.label || fallbackCategories[0]?.label || "",
      }));
    }
  }, [formCategories, formData.categoria]);

  useEffect(() => {
    if (!selectedStore) return;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelectedStore(null);
        setEditingStore(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedStore]);

  const getStoreImageUrl = (store) => {
    if (!store) return defaultLogo;

    const rawPhoto = store.foto || store.fotoUrl;
    if (!rawPhoto) return defaultLogo;

    if (rawPhoto.startsWith("http") || rawPhoto.startsWith("https"))
      return rawPhoto;
    return defaultLogo;
  };

  // ORDEN SECUENCIAL POR NÚMERO (extrae dígitos de "L-10", "Local 10", "10", etc.)
  const sortedStores = useMemo(() => {
    const toNumber = (val) => {
      const digits =
        String(val ?? "")
          .match(/\d+/g)
          ?.join("") || "";
      return digits ? parseInt(digits, 10) : Number.POSITIVE_INFINITY;
    };

    return [...stores].sort((a, b) => {
      const numA = toNumber(a?.numeroLocal);
      const numB = toNumber(b?.numeroLocal);

      if (numA !== numB) return numA - numB;

      const plantaA = String(a?.planta ?? "");
      const plantaB = String(b?.planta ?? "");
      return plantaA.localeCompare(plantaB, "es", { sensitivity: "base" });
    });
  }, [stores]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, fotoFile: file }));
    setUploadedUrl("");

    if (!file) return;

    setIsUploadingImage(true);
    try {
      const url = await uploadToImgBB(file);
      setUploadedUrl(url);
    } catch (error) {
      setFormMessage("Error al subir a ImgBB.");
      setFormHasError(true);
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleAddStore = async (event) => {
    event.preventDefault();
    setFormMessage("");
    setFormHasError(false);

    if (!isDevEnv || !isFormValid || isSubmitting) return;

    setIsSubmitting(true);

    try {
      const resolvedCategory = resolveCategory(formData.categoria);

      const created = await createLocal({
        nombre_local: formData.nombre_local.trim(),
        actividad: formData.actividad.trim(),
        numero_local: formData.numero_local.trim(),
        planta: formData.planta.trim(),
        categoria: resolvedCategory.label,
        foto: uploadedUrl || "",
      });

      const mapped = {
        id: created.id,
        nombreLocal: created.nombre_local,
        actividad: created.actividad,
        numeroLocal: created.numero_local,
        planta: created.planta,
        foto: uploadedUrl || created.foto,
        fotoUrl: uploadedUrl || created.foto,
        categoriaId: resolvedCategory.id,
        categoria: resolvedCategory.label,
      };

      onLocalCreated(mapped);
      setFormMessage("¡Local agregado con foto!");

      setFormData({
        nombre_local: "",
        actividad: "",
        numero_local: "",
        planta: "",
        categoria: formCategories[0]?.label || "",
        fotoFile: null,
      });
      setUploadedUrl("");
    } catch (error) {
      setFormMessage("Error al guardar.");
      setFormHasError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- EDITAR / ELIMINAR ---
  const startEdit = (store) => {
    setEditingStore(store);
    setEditData({
      nombre_local: store?.nombreLocal || "",
      actividad: store?.actividad || "",
      numero_local: String(store?.numeroLocal || ""),
      planta: store?.planta || "",
      categoria: store?.categoria || "",
    });
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (!editingStore) return;

    try {
      const resolvedCategory = resolveCategory(editData.categoria);

      await updateLocal(editingStore.id, {
        nombre_local: editData.nombre_local.trim(),
        actividad: editData.actividad.trim(),
        numero_local: editData.numero_local.trim(),
        planta: editData.planta.trim(),
        categoria: resolvedCategory.label,
      });

      window.location.reload();
    } catch (err) {
      setFormMessage("Error al actualizar.");
      setFormHasError(true);
    }
  };

  const handleDelete = async (store) => {
    if (!store) return;

    const ok = confirm(
      `¿Eliminar "${store.nombreLocal}" (Local ${store.numeroLocal})?`
    );
    if (!ok) return;

    try {
      await deleteLocal(store.id);

      window.location.reload();
    } catch (err) {
      setFormMessage("Error al eliminar.");
      setFormHasError(true);
    }
  };

  return (
    <div id="locales" className="py-8 bg-gray-50">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold gradient-text">Locales</h2>

        {isLoading && (
          <p className="text-sm text-gray-500">Cargando locales...</p>
        )}
        {!isLoading && loadError && (
          <p className="text-sm text-red-500">{loadError}</p>
        )}

        <div className="grid grid-cols-2 gap-4 mt-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {sortedStores.map((store) => (
            <button
              key={store.id}
              onClick={() => setSelectedStore(store)}
              className="text-left transition-transform focus:outline-none hover:scale-[1.02] overflow-hidden rounded-3xl bg-white shadow-sm border border-gray-100"
            >
              <div className="relative w-full h-32 sm:h-36 bg-gray-100 overflow-hidden">
                <img
                  src={getStoreImageUrl(store)}
                  alt={store.nombreLocal || "Local"}
                  className="absolute inset-0 w-full h-full object-cover object-center"
                  loading="lazy"
                  crossOrigin="anonymous"
                  onError={(e) => {
                    e.currentTarget.src = defaultLogo;
                    e.currentTarget.onerror = null;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />
              </div>

              <div className="p-4">
                <span className="block text-[10px] font-semibold uppercase text-[#1d1d99] truncate">
                  {store.categoria}
                </span>
                <span className="block text-xs font-semibold text-gray-500 truncate">
                  Local {store.numeroLocal}
                </span>
                <span
                  className="block mt-1 text-sm font-bold text-gray-900 truncate"
                  title={store.nombreLocal}
                >
                  {store.nombreLocal}
                </span>
              </div>
            </button>
          ))}
        </div>

        {!isLoading && !loadError && stores.length === 0 && (
          <p className="mt-6 text-sm text-gray-500">{emptyMessage}</p>
        )}

        {isDevEnv && (
          <div className="p-6 mt-10 bg-white border border-gray-200 border-dashed shadow-sm rounded-2xl">
            <h3 className="mb-2 text-lg font-semibold text-gray-900">
              Agregar local (solo desarrollo)
            </h3>
            <p className="mb-4 text-xs text-gray-500">
              Las fotos se guardan en ImgBB para siempre.
            </p>

            <form
              onSubmit={handleAddStore}
              className="grid gap-4 md:grid-cols-2"
            >
              <input
                name="nombre_local"
                placeholder="Nombre comercial"
                value={formData.nombre_local}
                onChange={handleChange}
                className="search-input"
                required
              />
              <input
                name="actividad"
                placeholder="Actividad"
                value={formData.actividad}
                onChange={handleChange}
                className="search-input"
                required
              />
              <select
                name="categoria"
                value={formData.categoria}
                onChange={handleChange}
                className="search-input"
              >
                {formCategories.map((cat) => (
                  <option key={cat.id} value={cat.label}>
                    {cat.label}
                  </option>
                ))}
              </select>
              <input
                name="numero_local"
                placeholder="Número Local (ej: 10)"
                value={formData.numero_local}
                onChange={handleChange}
                className="search-input"
                required
              />
              <input
                name="planta"
                placeholder="Planta (Alta/Baja)"
                value={formData.planta}
                onChange={handleChange}
                className="search-input"
                required
              />

              <div className="md:col-span-2">
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Foto del local
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>

              {isUploadingImage && (
                <p className="text-xs font-bold text-blue-500 animate-pulse">
                  Subiendo a ImgBB...
                </p>
              )}

              {uploadedUrl && (
                <div className="flex items-center gap-4 p-2 rounded-lg md:col-span-2 bg-green-50">
                  <img
                    src={uploadedUrl}
                    className="object-cover w-16 h-16 border border-green-200 rounded-full"
                    alt="Vista previa"
                  />
                  <p className="text-sm font-medium text-green-700">
                    ¡Foto lista!
                  </p>
                </div>
              )}

              {formMessage && (
                <p
                  className={`text-sm md:col-span-2 ${
                    formHasError ? "text-red-500" : "text-emerald-600"
                  }`}
                >
                  {formMessage}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting || isUploadingImage}
                className="md:col-span-2 bg-[#0ACEE5] text-white py-2 rounded-full font-bold hover:bg-[#09bccf] disabled:bg-gray-300 transition-colors"
              >
                {isSubmitting ? "Guardando..." : "Agregar local"}
              </button>
            </form>
          </div>
        )}
      </div>

      {/* MODAL */}
      {selectedStore && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 duration-200 bg-black/60 animate-in fade-in"
          onClick={() => {
            setSelectedStore(null);
            setEditingStore(null);
          }}
        >
          <div
            className="relative w-full max-w-xl mx-auto overflow-hidden transition-all transform bg-white shadow-2xl rounded-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full overflow-hidden h-80 sm:h-96 rounded-t-3xl bg-gray-100">
              <img
                src={getStoreImageUrl(selectedStore)}
                alt={selectedStore.nombreLocal}
                className="absolute inset-0 w-full h-full object-cover object-top"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src = defaultLogo;
                  e.currentTarget.onerror = null;
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />
            </div>

            <div className="p-6 space-y-4">
              <div className="text-center sm:text-left">
                <h3 className="text-2xl font-bold text-gray-900">
                  {selectedStore.nombreLocal}
                </h3>
                <p className="text-lg text-gray-600">
                  {selectedStore.actividad}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 border border-gray-100 rounded-xl bg-gray-50">
                  <p className="text-xs font-bold tracking-wider text-gray-400 uppercase">
                    Ubicación
                  </p>
                  <p className="mt-1 text-sm font-semibold text-gray-800">
                    Local {selectedStore.numeroLocal}
                  </p>
                  <p className="text-xs text-gray-500">
                    Planta {selectedStore.planta}
                  </p>
                </div>

                <div className="p-4 border border-gray-100 rounded-xl bg-gray-50">
                  <p className="text-xs font-bold tracking-wider text-gray-400 uppercase">
                    Categoría
                  </p>
                  <p className="mt-1 text-sm font-semibold text-gray-800">
                    {selectedStore.categoria}
                  </p>
                </div>
              </div>

              {/* BOTONES DEV */}
              {isDevEnv && !editingStore && (
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => startEdit(selectedStore)}
                    className="w-full rounded-full border border-gray-200 py-2 font-semibold text-gray-700 hover:bg-gray-50"
                  >
                    Editar
                  </button>

                  <button
                    onClick={() => handleDelete(selectedStore)}
                    className="w-full rounded-full bg-red-500 py-2 font-semibold text-white hover:bg-red-600"
                  >
                    Eliminar
                  </button>
                </div>
              )}

              {/* FORM EDIT */}
              {isDevEnv && editingStore && (
                <form onSubmit={handleSaveEdit} className="grid gap-3">
                  <input
                    value={editData.nombre_local}
                    onChange={(e) =>
                      setEditData((p) => ({
                        ...p,
                        nombre_local: e.target.value,
                      }))
                    }
                    className="search-input"
                    placeholder="Nombre"
                    required
                  />
                  <input
                    value={editData.actividad}
                    onChange={(e) =>
                      setEditData((p) => ({ ...p, actividad: e.target.value }))
                    }
                    className="search-input"
                    placeholder="Actividad"
                    required
                  />
                  <input
                    value={editData.numero_local}
                    onChange={(e) =>
                      setEditData((p) => ({
                        ...p,
                        numero_local: e.target.value,
                      }))
                    }
                    className="search-input"
                    placeholder="Número (ej: 10)"
                    required
                  />
                  <input
                    value={editData.planta}
                    onChange={(e) =>
                      setEditData((p) => ({ ...p, planta: e.target.value }))
                    }
                    className="search-input"
                    placeholder="Planta (Alta/Baja)"
                    required
                  />

                  <select
                    value={editData.categoria}
                    onChange={(e) =>
                      setEditData((p) => ({ ...p, categoria: e.target.value }))
                    }
                    className="search-input"
                  >
                    {formCategories.map((cat) => (
                      <option key={cat.id} value={cat.label}>
                        {cat.label}
                      </option>
                    ))}
                  </select>

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setEditingStore(null)}
                      className="rounded-full border border-gray-200 py-2 font-semibold text-gray-700 hover:bg-gray-50"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="rounded-full bg-[#0ACEE5] py-2 font-bold text-white hover:bg-[#09bccf]"
                    >
                      Guardar
                    </button>
                  </div>
                </form>
              )}

              {/* LISTO */}
              {!editingStore && (
                <button
                  onClick={() => {
                    setSelectedStore(null);
                    setEditingStore(null);
                  }}
                  className="w-full rounded-full bg-[#0ACEE5] py-3 font-bold text-white hover:bg-[#09bccf] transition-colors shadow-lg shadow-cyan-500/30"
                >
                  Listo
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
