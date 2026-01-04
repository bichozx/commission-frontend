// src/components/commission/LevelView.tsx
'use client';

import ParticipantCard from '../commissionComponent/ParticipanCard';
import { useCommissionStore } from '@/context/stores/commissionStore';

export default function LevelView() {
  const { participants, currentLevel, setCurrentLevel } = useCommissionStore();

  // Filtrar participantes por nivel
  const levelParticipants = participants.filter(
    (p) => p.level === currentLevel
  );

  // Calcular estadísticas del nivel
  const levelStats = {
    totalParticipants: levelParticipants.length,
    totalCommission: levelParticipants.reduce(
      (sum, p) => sum + p.totalCommission,
      0
    ),
    averageCommission:
      levelParticipants.length > 0
        ? levelParticipants.reduce((sum, p) => sum + p.totalCommission, 0) /
          levelParticipants.length
        : 0,
  };

  return (
    <div className="space-y-6">
      {/* Selector de nivel */}
      <div className="flex space-x-2">
        {[1, 2, 3, 4, 5].map((level) => (
          <button
            key={level}
            onClick={() => setCurrentLevel(level)}
            className={`px-4 py-2 rounded ${
              currentLevel === level
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            Nivel {level}
          </button>
        ))}
      </div>

      {/* Estadísticas del nivel */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm text-gray-500">Total Participantes</h3>
          <p className="text-2xl font-bold">{levelStats.totalParticipants}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm text-gray-500">Comisión Total</h3>
          <p className="text-2xl font-bold text-green-600">
            ${levelStats.totalCommission.toLocaleString()}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm text-gray-500">Comisión Promedio</h3>
          <p className="text-2xl font-bold">
            $
            {levelStats.averageCommission.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
        </div>
      </div>

      {/* Lista de participantes del nivel */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">
            Participantes - Nivel {currentLevel}
          </h2>
          <span className="text-gray-500">
            {levelParticipants.length} participantes
          </span>
        </div>

        {levelParticipants.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No hay participantes en este nivel
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {levelParticipants.map((participant) => (
              <ParticipantCard key={participant.id} participant={participant} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
