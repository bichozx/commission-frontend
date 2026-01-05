/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Participant } from '@/types/hirerachy';
import { registerAffiliate } from '@/services/autService';
import { useAuthStore } from '@/context/stores/authStore';
import { useCommissionStore } from '@/context/stores/commissionStore';
import { useState } from 'react';

interface ParticipantFormProps {
  onClose: () => void;
  participant: Participant | null; // 👈 AFILIADO PADRE
}

export default function ParticipantForm({
  onClose,
  participant,
}: ParticipantFormProps) {
  const token = useAuthStore((state) => state.token);
  const affiliateId = useAuthStore((state) => state.userId); // afiliado logueado
  const { fetchHierarchyData } = useCommissionStore();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const parentAffiliateId = participant?.id ?? affiliateId ?? null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!token || !parentAffiliateId) {
      setError('No autenticado o afiliado inválido');
      return;
    }

    try {
      setLoading(true);

      await registerAffiliate(
        {
          ...formData,
        },
        token
      );

      // 🔁 refrescar árbol desde el padre
      await fetchHierarchyData(parentAffiliateId, token);

      onClose();
    } catch (err: any) {
      setError(
        err?.response?.data?.message ?? 'Error registrando el nuevo afiliado'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Registrar Nuevo Afiliado</h2>

        {participant && (
          <p className="text-sm text-gray-500 mb-3">
            Afiliado padre:{' '}
            <strong>
              {participant.name} (Nivel {participant.level})
            </strong>
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Nombre completo
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Contraseña</label>
            <input
              type="password"
              required
              minLength={8}
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full p-2 border rounded"
            />
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <div className="flex justify-end space-x-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-50"
            >
              {loading ? 'Registrando…' : 'Registrar Afiliado'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
