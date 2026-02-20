// api/locales.js (o .ts)

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

// EDITAR
export async function updateLocal(id, payload) {
  const res = await fetch(`${API_URL}/locales/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  if (!res.ok) throw new Error("No se pudo actualizar el local");
  return res.json();
}

// ELIMINAR
export async function deleteLocal(id) {
  const res = await fetch(`${API_URL}/locales/${id}`, {
    method: "DELETE",
    cache: "no-store",
  });

  if (!res.ok) throw new Error("No se pudo eliminar el local");
  return true;
}
