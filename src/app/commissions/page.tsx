'use client';

import { useEffect, useState } from 'react';

import { Commission } from '@/types/commission';
import CommissionCard from '@/components/commissionComponent/CommissionCard';
import axios from 'axios';
import { useAuthStore } from '@/context/stores/authStore';

export default function CommissionsPage() {
  const { token } = useAuthStore();
  const [commissions, setCommissions] = useState<Commission[]>([]);

  useEffect(() => {
    if (!token) return;

    const fetchCommissions = async () => {
      try {
        const res = await axios.get(
          'https://commission-backend-11px.onrender.com/commissions/all',
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setCommissions(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCommissions();
  }, [token]);

  if (!token) return <p>Please login to see commissions</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Commissions</h1>
      <div className="grid gap-4">
        {commissions.map((c) => (
          <CommissionCard key={c.id} commission={c} />
        ))}
      </div>
    </div>
  );
}
