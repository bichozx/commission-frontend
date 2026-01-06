/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Affiliate,
  UpdateAffiliateDto,
  updateAffiliate,
} from '@/services/affiliate';

import { UpdateAffiliateFormProps } from '@/types/hirerachy';
import { useAuthStore } from '@/context/stores/authStore';
import { useState } from 'react';

export default function UpdateAffiliateForm({
  affiliate,
  onClose,
  onUpdated,
}: UpdateAffiliateFormProps) {
  const { token } = useAuthStore();

  type AffiliateStatus = 'ACTIVE' | 'INACTIVE';

  const initialStatus: AffiliateStatus =
    affiliate.status === 'INACTIVE' ? 'INACTIVE' : 'ACTIVE';

  const [formData, setFormData] = useState({
    level: affiliate.level,
    commissionRate: affiliate.commissionRate ?? 0,
    status: initialStatus,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!token) {
      setError('No autenticado');
      return;
    }

    try {
      setLoading(true);
      const updated = await updateAffiliate(affiliate.id, formData, token);
      console.log('🚀 ~ handleSubmit ~ affiliate:', affiliate);
      if (onUpdated) onUpdated(updated);
      onClose();
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Error actualizando afiliado');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Actualizar Afiliado</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nivel */}
          <div>
            <label className="block text-sm font-medium mb-1">Nivel</label>
            <input
              type="number"
              min={1}
              max={4}
              value={formData.level}
              onChange={(e) =>
                setFormData({ ...formData, level: Number(e.target.value) })
              }
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Comisión */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Comisión (%)
            </label>
            <input
              type="number"
              min={0}
              max={100}
              step={0.1}
              value={formData.commissionRate}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  commissionRate: Number(e.target.value),
                })
              }
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Estado */}
          <div>
            <label className="block text-sm font-medium mb-1">Estado</label>
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  status: e.target.value as 'ACTIVE' | 'INACTIVE',
                })
              }
              className="w-full p-2 border rounded"
            >
              <option value="ACTIVE">Activo</option>
              <option value="INACTIVE">Inactivo</option>
            </select>
          </div>

          {error && <p className="text-red-600">{error}</p>}

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
              className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
            >
              {loading ? 'Actualizando...' : 'Actualizar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
