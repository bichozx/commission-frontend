/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { Participant } from '@/types/hirerachy';

interface ParticipantCardProps {
  participant: Participant;
  level?: number;
  onEdit?: (participant: Participant) => void;
}

export default function ParticipantCard({
  participant,
  level = 0,
  onEdit,
}: ParticipantCardProps) {
  return (
    <div
      className="p-4 border rounded bg-white shadow mb-4"
      style={{ marginLeft: level * 1.5 + 'rem' }} // Indentación por nivel
    >
      <div className="flex justify-between items-start">
        {/* Info principal */}
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-lg">{participant.name}</h3>
            <span className="px-2 py-0.5 text-xs bg-gray-200 rounded">
              Nivel {participant.level}
            </span>
          </div>

          {participant.email && (
            <p className="text-sm text-gray-500 mt-1">{participant.email}</p>
          )}

          <p className="text-sm text-green-600 mt-2">
            Total ganado: ${participant.totalEarned.toLocaleString()}
          </p>

          <p className="text-sm text-gray-500">
            Referidos directos: {participant.children?.length || 0}
          </p>
        </div>

        {/* Botón de Editar */}
        {/* {onEdit && (
          <button
            onClick={() => onEdit(participant)}
            className="ml-4 px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Editar
          </button>
        )} */}
      </div>

      {/* Hijos */}
      {participant.children?.length > 0 && (
        <div className="mt-4 space-y-2">
          {participant.children.map((child) => (
            <ParticipantCard
              key={child.id}
              participant={child}
              level={level + 1}
              //onEdit={onEdit} // cada hijo llama a la misma función con su participante
            />
          ))}
        </div>
      )}
    </div>
  );
}
