export async function loginService(email: string, password: string) {
  const res = await fetch(
    'https://commission-backend-11px.onrender.com/auth/login',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    }
  );

  if (!res.ok) throw await res.json();

  const data = await res.json();

  return {
    token: data.access_token,
    userAffiliateId: data.affiliate.id,
    level: data.affiliate.level ?? 1,
  };
}

import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface RegisterAffiliatePayload {
  email: string;
  password: string;
  name: string;
}

export async function registerAffiliate(
  data: RegisterAffiliatePayload,
  token: string
) {
  const res = await axios.post(`${API_URL}/auth/register-affiliate`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
}
