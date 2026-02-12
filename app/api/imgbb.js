// src/api/imgbb.js
const API_KEY = '1fd6a2b464f2a15e2287ecb6c5d4c20e'; // ← Tu key

export const uploadToImgBB = async (file) => {
  const formData = new FormData();
  formData.append('image', file);
  formData.append('expiration', 15552000); // ← 180 días (máximo permitido)

  try {
    const response = await fetch(`https://api.imgbb.com/1/upload?key=${API_KEY}&name=${file.name}`, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    if (!data.success) {
      console.error('Error completo de ImgBB:', data);
      throw new Error(data.error?.message || 'Fallo al subir imagen');
    }

    const url = data.data.url;
    console.log('=== URL GUARDADA EN BD ===');
    console.log(url);
    console.log('Delete URL (guárdala si quieres):', data.data.delete_url);

    return url;
  } catch (err) {
    console.error('Error al subir a ImgBB:', err);
    throw err;
  }
};