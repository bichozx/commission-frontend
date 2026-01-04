// src/components/commissionComponent/ParticipanCard.tsx
'use client';

// import { Participant } from '@/types/hirerachy';

// interface ParticipantCardProps {
//   participant: Participant;
//   onEdit?: () => void;
//   compact?: boolean;
// }

// export default function ParticipantCard({
//   participant,
//   onEdit,
//   compact = false,
// }: ParticipantCardProps) {
//   const {
//     id,
//     name,
//     email,
//     totalCommission,
//     level,
//     commissionPercentage,
//     totalEarnedFromYou,
//     totalCommissionsFromYou,
//     children = [],
//   } = participant;

//   return (
//     <div
//       className={`bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow ${
//         compact ? '' : 'mb-3'
//       }`}
//     >
//       <div className="flex justify-between items-start">
//         <div className="flex-1">
//           <div className="flex items-center space-x-2">
//             <h3 className="font-bold text-lg">{name}</h3>
//             <span
//               className={`px-2 py-1 text-xs rounded ${
//                 level === 1
//                   ? 'bg-blue-100 text-blue-800'
//                   : level === 2
//                   ? 'bg-green-100 text-green-800'
//                   : level === 3
//                   ? 'bg-purple-100 text-purple-800'
//                   : 'bg-gray-100 text-gray-800'
//               }`}
//             >
//               Nivel {level}
//             </span>
//           </div>

//           {email && <p className="text-gray-600 text-sm mt-1">{email}</p>}

//           <div className="mt-2 grid grid-cols-2 gap-2">
//             <div>
//               <p className="text-xs text-gray-500">Comisión Total</p>
//               <p className="font-bold text-green-600">
//                 ${totalCommission.toLocaleString()}
//               </p>
//             </div>

//             {commissionPercentage !== undefined && (
//               <div>
//                 <p className="text-xs text-gray-500">Porcentaje</p>
//                 <p className="font-medium">{commissionPercentage}%</p>
//               </div>
//             )}

//             {totalEarnedFromYou !== undefined && (
//               <div>
//                 <p className="text-xs text-gray-500">Ganado de ti</p>
//                 <p className="font-medium">
//                   ${totalEarnedFromYou.toLocaleString()}
//                 </p>
//               </div>
//             )}

//             {totalCommissionsFromYou !== undefined && (
//               <div>
//                 <p className="text-xs text-gray-500">Comisiones pagadas</p>
//                 <p className="font-medium">
//                   ${totalCommissionsFromYou.toLocaleString()}
//                 </p>
//               </div>
//             )}
//           </div>

//           {children.length > 0 && !compact && (
//             <div className="mt-3 pt-3 border-t border-gray-100">
//               <p className="text-xs text-gray-500">
//                 Referidos directos: {children.length}
//               </p>
//             </div>
//           )}
//         </div>

//         {onEdit && (
//           <button
//             onClick={onEdit}
//             className="ml-2 px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded text-gray-700 transition-colors"
//             title="Editar participante"
//           >
//             Editar
//           </button>
//         )}
//       </div>

//       <div className="mt-3 pt-3 border-t border-gray-100">
//         <p className="text-xs text-gray-400">ID: {id.substring(0, 8)}...</p>
//       </div>
//     </div>
//   );
// }

import { Participant, ParticipantCardProps } from '@/types/hirerachy';

export default function ParticipantCard({
  participant,
  onEdit,
  compact = false,
}: ParticipantCardProps) {
  const {
    id,
    name,
    email,
    totalCommission,
    level,
    commissionPercentage,
    totalEarnedFromYou,
    totalCommissionsFromYou,
    children = [],
  } = participant;

  return (
    <div
      className={`bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow ${
        compact ? '' : 'mb-3'
      }`}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <h3 className="font-bold text-lg">{name}</h3>
            <span
              className={`px-2 py-1 text-xs rounded ${
                level === 1
                  ? 'bg-blue-100 text-blue-800'
                  : level === 2
                  ? 'bg-green-100 text-green-800'
                  : level === 3
                  ? 'bg-purple-100 text-purple-800'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              Nivel {level}
            </span>
          </div>

          {email && <p className="text-gray-600 text-sm mt-1">{email}</p>}

          <div className="mt-2 grid grid-cols-2 gap-2">
            <div>
              <p className="text-xs text-gray-500">Comisión Total</p>
              <p className="font-bold text-green-600">
                ${totalCommission.toLocaleString()}
              </p>
            </div>

            {commissionPercentage !== undefined && (
              <div>
                <p className="text-xs text-gray-500">Porcentaje</p>
                <p className="font-medium">{commissionPercentage}%</p>
              </div>
            )}

            {totalEarnedFromYou !== undefined && (
              <div>
                <p className="text-xs text-gray-500">Ganado de ti</p>
                <p className="font-medium">
                  ${totalEarnedFromYou.toLocaleString()}
                </p>
              </div>
            )}

            {totalCommissionsFromYou !== undefined && (
              <div>
                <p className="text-xs text-gray-500">Comisiones pagadas</p>
                <p className="font-medium">
                  ${totalCommissionsFromYou.toLocaleString()}
                </p>
              </div>
            )}
          </div>

          {children.length > 0 && !compact && (
            <div className="mt-3 pt-3 border-t border-gray-100">
              <p className="text-xs text-gray-500">
                Referidos directos: {children.length}
              </p>
            </div>
          )}
        </div>

        {onEdit && (
          <button
            onClick={onEdit}
            className="ml-2 px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded text-gray-700 transition-colors"
            title="Editar participante"
          >
            Editar
          </button>
        )}
      </div>

      <div className="mt-3 pt-3 border-t border-gray-100">
        <p className="text-xs text-gray-400">ID: {id.substring(0, 8)}...</p>
      </div>
    </div>
  );
}
