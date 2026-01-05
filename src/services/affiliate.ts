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
