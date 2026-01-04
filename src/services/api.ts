// src/services/api.ts
const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  'https://commission-backend-11px.onrender.com';

export async function fetchCommissions(token: string) {
  const res = await fetch(`${API_URL}/commissions/all`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error(`Error ${res.status}: ${res.statusText}`);
  }

  return res.json();
}
