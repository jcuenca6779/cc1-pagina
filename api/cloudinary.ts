const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || ''
const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || ''

export const isCloudinaryEnabled = Boolean(cloudName && uploadPreset)

export type CloudinaryUploadResult = {
  secure_url: string
  public_id: string
}

export type CloudinaryUploadOptions = {
  publicId?: string
}

export const uploadToCloudinary = async (
  file: File,
  options: CloudinaryUploadOptions = {}
): Promise<CloudinaryUploadResult> => {
  if (!isCloudinaryEnabled) {
    throw new Error('Cloudinary no configurado')
  }

  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', uploadPreset)
  if (options.publicId) {
    formData.append('public_id', options.publicId)
  }

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: 'POST',
      body: formData,
    }
  )

  if (!response.ok) {
    throw new Error('Error al subir imagen')
  }

  return response.json()
}
