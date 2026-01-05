/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

const API_URL = 'https://commission-backend-11px.onrender.com';

// Función existente
export async function fetchHierarchy(affiliateId: string, token: string) {
  const res = await axios.get(
    `$localhost:3001/affiliates/tree/${affiliateId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  console.log('🚀 ~ fetchHierarchy ~ res:', res);
  return res.data;
}

// Nuevas funciones CRUD
export async function addParticipant(participantData: any, token: string) {
  const res = await axios.post(`${API_URL}/participants`, participantData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

export async function updateParticipant(
  id: string,

  participantData: any,
  token: string
) {
  const res = await axios.put(
    `${API_URL}/participants/${id}`,
    participantData,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
}

export async function deleteParticipant(id: string, token: string) {
  const res = await axios.delete(`${API_URL}/participants/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

export async function fetchParticipantById(id: string, token: string) {
  const res = await axios.get(`${API_URL}/participants/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

export async function fetchParticipantsByLevel(
  userAffiliateId: string,
  token: string
) {
  const res = await axios.get(
    `${API_URL}/commissions/by-level/${userAffiliateId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data;
}

// NUEVO: Endpoint para comisiones por nivel
export async function fetchCommissionsByLevel(
  affiliateId: string,
  token: string
) {
  const res = await axios.get(
    `${API_URL}/commissions/by-level/${affiliateId}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
}
