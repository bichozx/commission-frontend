/* eslint-disable @typescript-eslint/no-explicit-any */
import { Participant } from '@/types/hirerachy';
import axios from 'axios';

const API_URL = 'https://commission-backend-11px.onrender.com';

export async function affiliateTree(affiliateId: string, token: string) {
  const res = await axios.get(`${API_URL}/affiliates/tree/${affiliateId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
}

export async function createAffiliate(
  data: { userId: string; parentId?: string },
  token: string
) {
  const res = await axios.post(`${API_URL}/affiliates`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
}

export interface UpdateAffiliateDto {
  level?: number; // o string si usas enum como string
  commissionRate?: number;
  status?: string;
}

export interface Affiliate {
  id: string;
  userId: string;
  level: number;
  commissionRate: number;
  status: string;
}

export async function updateAffiliate(
  affiliateId: string,
  data: UpdateAffiliateDto,
  token: string
): Promise<Affiliate> {
  const res = await axios.put(`${API_URL}/affiliates/${affiliateId}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
}

export interface Affiliate {
  id: string;
  userId: string;
  name: string;
  email: string;
  level: number;
  totalEarned: number;
  status: string;
  parentId?: string;
}

// función para obtener afiliados By Level
export async function getAffiliatesByLeve(
  token: string,
  level?: number
): Promise<Affiliate[]> {
  const params = level !== undefined ? { level } : {};
  const response = await axios.get(`${API_URL}/affiliates/`, {
    params,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  // Mapeamos la respuesta para traer solo los campos que realmente vamos a usar
  const affiliates: Affiliate[] = response.data.map((a: any) => ({
    id: a.id,
    userId: a.userId,
    name: a.user?.name || '',
    email: a.user?.email || '',
    level: a.level,
    totalEarned: parseFloat(a.totalEarned) || 0,
    status: a.status,
    parentId: a.parentId,
  }));

  return affiliates;
}

export function mapAffiliateToParticipant(affiliate: any): Participant {
  return {
    id: affiliate.id,
    name: affiliate.user?.name || '', // solo el nombre editable
    email: affiliate.user?.email || '', // solo el email editable
    level: affiliate.level,
    totalEarned: parseFloat(affiliate.totalEarned) || 0,
    totalCommission: 0,
    parentId: affiliate.parentId,
    children: [], // puedes agregar luego si quieres jerarquía
    affiliate: {
      id: affiliate.id,
      userId: affiliate.userId || '', // cuidado con undefined
      level: affiliate.level,
      commissionRate: parseFloat(affiliate.commissionRate) || 0,
      status: affiliate.status,
      totalEarned: parseFloat(affiliate.totalEarned) || 0,
      name: '',
      email: '',
    },
  };
}
