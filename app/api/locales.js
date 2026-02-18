const API_URL = 'http://localhost:3000'; // Ajusta a tu URL real

export const getLocales = async () => {
  const res = await fetch(`${API_URL}/locales`);
  return res.json();
};

export const createLocal = async (data) => {
  const res = await fetch(`${API_URL}/locales`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const deleteLocal = async (id) => {
  const res = await fetch(`${API_URL}/locales/${id}`, {
    method: 'DELETE',
  });
  return res.json();
};