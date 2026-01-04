// // src/components/commission/LevelView.tsx
// 'use client';

// import ParticipantCard from '../commissionComponent/ParticipanCard';
// import { useCommissionStore } from '@/context/stores/commissionStore';

// export default function LevelView() {
//   const { participants, currentLevel, setCurrentLevel } = useCommissionStore();
//   console.log('🚀 ~ LevelView ~ currentLevel:', currentLevel);
//   console.log('🚀 ~ LevelView ~ participants:', participants);

//   // Filtrar participantes por nivel
//   const levelParticipants = participants.filter(
//     (p) => p.level === currentLevel
//   );

//   // Calcular estadísticas del nivel
//   const levelStats = {
//     totalParticipants: levelParticipants.length,
//     totalCommission: levelParticipants.reduce(
//       (sum, p) => sum + p.totalCommission,
//       0
//     ),
//     averageCommission:
//       levelParticipants.length > 0
//         ? levelParticipants.reduce((sum, p) => sum + p.totalCommission, 0) /
//           levelParticipants.length
//         : 0,
//   };

//   return (
//     <div className="space-y-6">
//       {/* Selector de nivel */}
//       <div className="flex space-x-2">
//         {[1, 2, 3, 4, 5].map((level) => (
//           <button
//             key={level}
//             onClick={() => setCurrentLevel(level)}
//             className={`px-4 py-2 rounded ${
//               currentLevel === level
//                 ? 'bg-blue-600 text-white'
//                 : 'bg-gray-100 hover:bg-gray-200'
//             }`}
//           >
//             Nivel {level}
//           </button>
//         ))}
//       </div>

//       {/* Estadísticas del nivel */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         <div className="bg-white p-4 rounded-lg shadow">
//           <h3 className="text-sm text-gray-500">Total Participantes</h3>
//           <p className="text-2xl font-bold">{levelStats.totalParticipants}</p>
//         </div>
//         <div className="bg-white p-4 rounded-lg shadow">
//           <h3 className="text-sm text-gray-500">Comisión Total</h3>
//           <p className="text-2xl font-bold text-green-600">
//             ${levelStats.totalCommission.toLocaleString()}
//           </p>
//         </div>
//         <div className="bg-white p-4 rounded-lg shadow">
//           <h3 className="text-sm text-gray-500">Comisión Promedio</h3>
//           <p className="text-2xl font-bold">
//             $
//             {levelStats.averageCommission.toLocaleString(undefined, {
//               minimumFractionDigits: 2,
//               maximumFractionDigits: 2,
//             })}
//           </p>
//         </div>
//       </div>

//       {/* Lista de participantes del nivel */}
//       <div className="space-y-4">
//         <div className="flex justify-between items-center">
//           <h2 className="text-xl font-bold">
//             Participantes - Nivel {currentLevel}
//           </h2>
//           <span className="text-gray-500">
//             {levelParticipants.length} participantes
//           </span>
//         </div>

//         {levelParticipants.length === 0 ? (
//           <div className="text-center py-8 text-gray-500">
//             No hay participantes en este nivel
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//             {levelParticipants.map((participant) => (
//               <ParticipantCard key={participant.id} participant={participant} />
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// src/components/commission/LevelView.tsx
'use client';

import ParticipantCard from '../commissionComponent/ParticipanCard';
import { useAuthStore } from '@/context/stores/authStore';
import { useCommissionStore } from '@/context/stores/commissionStore';
import { useEffect } from 'react';

export default function LevelView() {
  const {
    participants,
    currentLevel,
    totalCommissions,
    levelStats,
    totalAmount,
    setCurrentLevel,
    fetchLevelStats,
  } = useCommissionStore();

  const { token, userId } = useAuthStore(); // Necesitarás importar useAuthStore

  // Cargar estadísticas por nivel al montar
  useEffect(() => {
    if (token && userId) {
      fetchLevelStats(userId, token);
    }
  }, [token, userId, fetchLevelStats]);

  console.log('🚀 ~ LevelView ~ currentLevel:', currentLevel);
  console.log('🚀 ~ LevelView ~ levelStats:', levelStats);
  console.log('🚀 ~ LevelView ~ participants:', participants);

  // Filtrar participantes por nivel (de la jerarquía)
  const levelParticipants = participants.filter(
    (p) => p.level === currentLevel
  );

  // Usar estadísticas del nivel actual
  const currentLevelStats = levelStats[currentLevel] || {
    count: 0,
    totalAmount: 0,
    percentage: 0,
    description: '',
  };

  return (
    <div className="space-y-6">
      {/* Selector de nivel */}
      <div className="flex space-x-2">
        {[1, 2, 3].map((level) => (
          <button
            key={level}
            onClick={() => setCurrentLevel(level)}
            className={`px-4 py-2 rounded transition-colors ${
              currentLevel === level
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
            }`}
          >
            Nivel {level}
            {levelStats[level] && (
              <span className="ml-2 text-xs opacity-75">
                ${levelStats[level].totalAmount.toLocaleString()}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Estadísticas generales */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Resumen General</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-sm text-gray-500">Comisiones Totales</h3>
            <p className="text-2xl font-bold">{totalCommissions}</p>
          </div>
          <div>
            <h3 className="text-sm text-gray-500">Monto Total</h3>
            <p className="text-2xl font-bold text-green-600">
              ${totalAmount.toLocaleString()}
            </p>
          </div>
          <div>
            <h3 className="text-sm text-gray-500">Nivel Actual</h3>
            <p className="text-2xl font-bold">Nivel {currentLevel}</p>
          </div>
        </div>
      </div>

      {/* Estadísticas del nivel actual */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm text-gray-500">Transacciones</h3>
          <p className="text-2xl font-bold">{currentLevelStats.count}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm text-gray-500">Monto Total</h3>
          <p className="text-2xl font-bold text-green-600">
            ${currentLevelStats.totalAmount.toLocaleString()}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm text-gray-500">Porcentaje</h3>
          <p className="text-2xl font-bold">{currentLevelStats.percentage}%</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm text-gray-500">Descripción</h3>
          <p className="text-lg">{currentLevelStats.description}</p>
        </div>
      </div>

      {/* Lista de participantes del nivel (de la jerarquía) */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">
            Participantes - Nivel {currentLevel}
          </h2>
          <span className="text-gray-500">
            {levelParticipants.length} participantes en jerarquía
          </span>
        </div>

        {levelParticipants.length === 0 ? (
          <div className="text-center py-8 text-gray-500 bg-white rounded-lg shadow">
            No hay participantes en este nivel de la jerarquía
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
