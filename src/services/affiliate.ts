import { Affiliate } from '@/types/affiliate';
import axios from 'axios';

const API_URL = 'https://commission-backend-11px.onrender.com';

/* ---------- API ---------- */

export async function getAffiliateTree(
  affiliateId: string,
  token: string
): Promise<Affiliate> {
  const res = await axios.get(`${API_URL}/affiliates/tree/${affiliateId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

export async function getAffiliatesByLevel(
  token: string,
  level?: number
): Promise<Affiliate[]> {
  const res = await axios.get(`${API_URL}/affiliates`, {
    headers: { Authorization: `Bearer ${token}` },
    params: level ? { level } : {},
  });

  return res.data;
}

export async function createAffiliate(
  payload: Partial<Affiliate>,
  token: string
): Promise<Affiliate> {
  const res = await axios.post(`${API_URL}/affiliates`, payload, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

export async function updateAffiliate(
  id: string,
  payload: Partial<Affiliate>,
  token: string
): Promise<Affiliate> {
  const res = await axios.put(`${API_URL}/affiliates/${id}`, payload, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

export async function deleteAffiliate(id: string, token: string) {
  await axios.delete(`${API_URL}/affiliates/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}
