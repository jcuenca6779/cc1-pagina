export const API_URL = (
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'
).replace(/\/$/, '')

export type LocalRecord = {
  id: number
  nombre_local: string
  actividad: string
  numero_local: string
  planta: string
  foto: string | null
}

export type LocalCreateInput = {
  nombre_local: string
  actividad: string
  numero_local: string
  planta: string
  fotoFile?: File | null
}

export type LocalUpdateInput = {
  nombre_local: string
  actividad: string
  numero_local: string
  planta: string
}

export const resolveFotoUrl = (foto?: string | null): string | null => {
  if (!foto) {
    return null
  }

  if (/^https?:\/\//.test(foto)) {
    return foto
  }

  return `${API_URL}/uploads/${foto}`
}

const parseJson = async (response: Response) => {
  if (!response.ok) {
    throw new Error('Request failed')
  }

  return response.json()
}

export const getLocales = async (): Promise<LocalRecord[]> => {
  const response = await fetch(`${API_URL}/locales`, {
    cache: 'no-store',
  })
  return parseJson(response)
}

export const createLocal = async (
  payload: LocalCreateInput
): Promise<LocalRecord> => {
  const formData = new FormData()
  formData.append('nombre_local', payload.nombre_local)
  formData.append('actividad', payload.actividad)
  formData.append('numero_local', payload.numero_local)
  formData.append('planta', payload.planta)

  if (payload.fotoFile) {
    formData.append('foto', payload.fotoFile)
  }

  const response = await fetch(`${API_URL}/locales`, {
    method: 'POST',
    body: formData,
  })

  return parseJson(response)
}

export const updateLocal = async (
  id: number,
  payload: LocalUpdateInput
): Promise<{ mensaje: string }> => {
  const response = await fetch(`${API_URL}/locales/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  return parseJson(response)
}

export const updateLocalFoto = async (
  id: number,
  fotoFile: File
): Promise<{ mensaje: string; foto: string }> => {
  const formData = new FormData()
  formData.append('foto', fotoFile)

  const response = await fetch(`${API_URL}/locales/${id}/foto`, {
    method: 'PUT',
    body: formData,
  })

  return parseJson(response)
}

export const deleteLocal = async (id: number): Promise<{ mensaje: string }> => {
  const response = await fetch(`${API_URL}/locales/${id}`, {
    method: 'DELETE',
  })

  return parseJson(response)
}
