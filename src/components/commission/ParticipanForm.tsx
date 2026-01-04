/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/commission/ParticipantForm.tsx
'use client';

import { useAuthStore } from '@/context/stores/authStore';
import { useCommissionStore } from '@/context/stores/commissionStore';
import { useState } from 'react';

interface ParticipantFormProps {
  onClose: () => void;
  participant?: any; // Para modo edición
}

export default function ParticipantForm({
  onClose,
  participant,
}: ParticipantFormProps) {
  const { token } = useAuthStore();
  const { addNewParticipant, updateExistingParticipant, loading } =
    useCommissionStore();

  const [formData, setFormData] = useState({
    name: participant?.name || '',
    email: participant?.email || '',
    commissionPercentage: participant?.commissionPercentage || 10,
    level: participant?.level || 1,
    parentId: participant?.parentId || '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Nombre es requerido';
    if (!formData.email.trim()) newErrors.email = 'Email es requerido';
    if (!/^\S+@\S+\.\S+$/.test(formData.email))
      newErrors.email = 'Email inválido';
    if (
      formData.commissionPercentage < 0 ||
      formData.commissionPercentage > 100
    ) {
      newErrors.commissionPercentage = 'Comisión debe ser entre 0 y 100%';
    }
    if (formData.level < 1) newErrors.level = 'Nivel debe ser mayor a 0';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm() || !token) return;

    try {
      if (participant) {
        await updateExistingParticipant(participant.id, formData, token);
      } else {
        await addNewParticipant(formData, token);
      }
      onClose();
    } catch (error) {
      console.error('Error saving participant:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">
          {participant ? 'Editar Participante' : 'Nuevo Participante'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nombre</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full p-2 border rounded"
              disabled={loading}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full p-2 border rounded"
              disabled={loading}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Porcentaje de Comisión (%)
            </label>
            <input
              type="number"
              min="0"
              max="100"
              step="0.5"
              value={formData.commissionPercentage}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  commissionPercentage: parseFloat(e.target.value),
                })
              }
              className="w-full p-2 border rounded"
              disabled={loading}
            />
            {errors.commissionPercentage && (
              <p className="text-red-500 text-sm">
                {errors.commissionPercentage}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Nivel</label>
            <select
              value={formData.level}
              onChange={(e) =>
                setFormData({ ...formData, level: parseInt(e.target.value) })
              }
              className="w-full p-2 border rounded"
              disabled={loading}
            >
              {[1, 2, 3, 4, 5].map((level) => (
                <option key={level} value={level}>
                  Nivel {level}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded hover:bg-gray-50"
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Guardando...' : participant ? 'Actualizar' : 'Crear'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
