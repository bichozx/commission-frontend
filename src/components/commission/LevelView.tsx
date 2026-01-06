'use client';

import { useEffect, useState } from 'react';

import { AffiliateLevel } from '@/types/hirerachy';
import ParticipantCard from '../commissionComponent/ParticipanCard';
import { useAuthStore } from '@/context/stores/authStore';
import { useCommissionStore } from '@/context/stores/commissionStore';

export default function LevelView() {
  const { flatParticipants, fetchAffiliatesByLevel, loading } =
    useCommissionStore();

  const { token } = useAuthStore();
  const [currentLevel, setCurrentLevel] = useState<AffiliateLevel>(1);

  // 🔹 Cargar afiliados cuando cambia el nivel
  useEffect(() => {
    if (!token) return;
    fetchAffiliatesByLevel(token, currentLevel);
  }, [token, currentLevel, fetchAffiliatesByLevel]);

  return (
    <div className="space-y-6">
      {/* Selector de nivel */}
      <div className="flex space-x-2">
        {[1, 2, 3].map((lvl) => (
          <button
            key={lvl}
            onClick={() => setCurrentLevel(lvl as AffiliateLevel)}
            className={`px-4 py-2 rounded transition-colors ${
              currentLevel === lvl
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
            }`}
          >
            Nivel {lvl}
          </button>
        ))}
      </div>

      {/* Estadísticas del nivel */}
      {/* <div className="bg-white rounded-lg shadow p-6 grid grid-cols-1 md:grid-cols-4 gap-4">
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
      </div> */}

      {/* Lista de participantes */}
      {loading ? (
        <p>Cargando afiliados...</p>
      ) : flatParticipants.length === 0 ? (
        <p className="text-gray-500">No hay afiliados en este nivel</p>
      ) : (
        flatParticipants.map((p) => (
          <ParticipantCard key={p.id} participant={p} />
        ))
      )}
    </div>
  );
}
