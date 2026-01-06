'use client';

import { AffiliateLevel, Participant } from '@/types/hirerachy';

export interface ParticipantCardProps {
  participant: Participant;
  onEdit?: () => void;
  compact?: boolean;
}

export default function ParticipantCard({
  participant,
  onEdit,
  compact = false,
}: ParticipantCardProps) {
  const { id, name, email, level, totalEarned, children = [] } = participant;

  const levelStyles: Record<number, string> = {
    1: 'bg-blue-100 text-blue-800',
    2: 'bg-green-100 text-green-800',
    3: 'bg-purple-100 text-purple-800',
  };

  return (
    <div
      className={`bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow ${
        compact ? '' : 'mb-4'
      }`}
    >
      <div className="flex justify-between items-start">
        {/* Info principal */}
        <div className="flex-1">
          {/* Nombre + Nivel */}
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-lg">{name}</h3>
            <span
              className={`px-2 py-0.5 text-xs rounded font-medium ${levelStyles[level]}`}
            >
              Nivel {level}
            </span>
          </div>

          {/* Email */}
          {email && <p className="text-gray-500 text-sm mt-1">{email}</p>}

          {/* Métricas */}
          <div className="mt-3 grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-500">Total ganado</p>
              <p className="text-lg font-bold text-green-600">
                ${totalEarned.toLocaleString()}
              </p>
            </div>

            {!compact && (
              <div>
                <p className="text-xs text-gray-500">Referidos directos</p>
                <p className="font-medium">{children.length}</p>
              </div>
            )}
          </div>
        </div>

        {/* Editar */}
        {/* {onEdit && (
          <button
            onClick={onEdit}
            className="ml-3 px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded text-gray-700 transition-colors"
          >
            Editar
          </button>
        )} */}
      </div>

      {/* Footer */}
      <div className="mt-4 pt-3 border-t border-gray-100">
        <p className="text-xs text-gray-400">ID: {id.slice(0, 8)}...</p>
      </div>
    </div>
  );
}
