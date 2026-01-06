'use client';

import { useEffect, useMemo } from 'react';

import ParticipantCard from '../commissionComponent/ParticipanCard';
import { useAuthStore } from '@/context/stores/authStore';
import { useCommissionStore } from '@/context/stores/commissionStore';

export default function LevelView() {
  const {
    flatParticipants,
    currentLevel,
    levelStats,
    setCurrentLevel,
    fetchAffiliatesByLevel,
  } = useCommissionStore();

  const { token } = useAuthStore();

  // Cargar afiliados al montar o al cambiar de nivel
  useEffect(() => {
    if (token) {
      fetchAffiliatesByLevel(token, currentLevel as 1 | 2 | 3);
    }
  }, [token, currentLevel, fetchAffiliatesByLevel]);

  // Filtrar participantes por nivel usando useMemo para optimización
  const levelParticipants = useMemo(
    () => flatParticipants.filter((p) => p.level === currentLevel),
    [flatParticipants, currentLevel]
  );

  const stats = levelStats[currentLevel] || {
    count: 0,
    totalAmount: 0,
    percentage: 0,
    description: '',
  };

  return (
    <div className="space-y-6">
      {/* Selector de nivel */}
      <div className="flex space-x-2">
        {[1, 2, 3].map((lvl) => (
          <button
            key={lvl}
            onClick={() => setCurrentLevel(lvl as 1 | 2 | 3)}
            className={`px-4 py-2 rounded transition-colors ${
              currentLevel === lvl
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
            }`}
          >
            Nivel {lvl} (${levelStats[lvl]?.totalAmount.toLocaleString() || 0})
          </button>
        ))}
      </div>

      {/* Estadísticas del nivel */}
      <div className="bg-white rounded-lg shadow p-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <h3 className="text-sm text-gray-500">Participantes</h3>
          <p className="text-2xl font-bold">{stats.count}</p>
        </div>
        <div>
          <h3 className="text-sm text-gray-500">Monto Total</h3>
          <p className="text-2xl font-bold text-green-600">
            ${stats.totalAmount.toLocaleString()}
          </p>
        </div>
        <div>
          <h3 className="text-sm text-gray-500">Porcentaje</h3>
          <p className="text-2xl font-bold">{stats.percentage}%</p>
        </div>
        <div>
          <h3 className="text-sm text-gray-500">Descripción</h3>
          <p>{stats.description}</p>
        </div>
      </div>

      {/* Lista de participantes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {levelParticipants.length === 0 ? (
          <div className="col-span-full text-center py-8 bg-white rounded-lg shadow text-gray-500">
            No hay participantes en este nivel
          </div>
        ) : (
          levelParticipants.map((p) => (
            <ParticipantCard key={p.id} participant={p} />
          ))
        )}
      </div>
    </div>
  );
}
