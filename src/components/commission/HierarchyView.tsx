// src/components/commission/HierarchyView.tsx
'use client';

import { Participant } from '@/types/hirerachy';
import ParticipantCard from '../commissionComponent/ParticipanCard';
import { useCommissionStore } from '@/context/stores/commissionStore';

interface HierarchyViewProps {
  participants: Participant[];
}

export default function HierarchyView({ participants }: HierarchyViewProps) {
  const { selectParticipant } = useCommissionStore();

  // Función recursiva para renderizar la jerarquía
  const renderHierarchy = (node: Participant, depth: number = 0) => {
    const hasChildren = node.children && node.children.length > 0;

    return (
      <div key={node.id} className="mb-2">
        <div className="relative">
          {/* Línea vertical para conectar niveles */}
          {depth > 0 && (
            <div className="absolute -left-4 top-1/2 w-4 h-0.5 bg-gray-300"></div>
          )}

          {/* Participante */}
          <div className={`${depth > 0 ? 'ml-6' : ''}`}>
            <ParticipantCard
              participant={{
                ...node,
                children: [],
              }}
              // onEdit={() => {
              //   selectParticipant(node);
              //   // setShowAddForm(true); - Esto se maneja en el padre
              // }}
              //compact={depth > 0}
            />
          </div>

          {/* Hijos recursivamente */}
          {hasChildren && (
            <div className={`mt-2 ${depth > 0 ? 'ml-6' : ''}`}>
              <div className="border-l-2 border-gray-300 pl-4">
                {node.children!.map((child) =>
                  renderHierarchy(child, depth + 1)
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {participants.map((participant) => renderHierarchy(participant))}
    </div>
  );
}
