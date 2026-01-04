// /* eslint-disable @typescript-eslint/no-explicit-any */
// // /* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

// // import { useEffect, useState } from 'react';

import { useEffect, useState } from 'react';

import LevelView from '@/components/commission/LevelView';
import ParticipantCard from '@/components/commissionComponent/ParticipanCard';
import ParticipantForm from '@/components/commission/ParticipanForm';
import { useAuthStore } from '@/context/stores/authStore';
import { useCommissionStore } from '@/context/stores/commissionStore';
import { useRouter } from 'next/navigation';

// // import { Participant } from '@/types/hirerachy';
// // import ParticipantCard from '@/components/commissionComponent/ParticipanCard';
// // import { buildHierarchy } from '@/services/hierarchyUtils';
// // import { fetchHierarchy } from '@/services/commissionService';
// // import { useAuthStore } from '@/context/stores/authStore';
// // import { useRouter } from 'next/navigation';

// // export default function DashboardPage() {
// //   const router = useRouter();
// //   const { token, userId, initializeAuth } = useAuthStore();

// //   const [participants, setParticipants] = useState<Participant[]>([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState('');

// //   // Inicializa auth al montar
// //   useEffect(() => {
// //     initializeAuth();
// //   }, [initializeAuth]);

// //   // Carga jerarquía una vez token y userId estén disponibles
// //   useEffect(() => {
// //     if (!token || !userId) {
// //       router.push('/login');
// //       return;
// //     }

// //     const loadHierarchy = async () => {
// //       try {
// //         const data = await fetchHierarchy(userId, token);
// //         console.log('Data cruda de backend:', data);

// //         const hierarchy = buildHierarchy(data);
// //         setParticipants(hierarchy);
// //         console.log('🚀 Jerarquía lista:', hierarchy);
// //       } catch (err: any) {
// //         setError(err.message || 'Error loading hierarchy');
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     loadHierarchy();
// //   }, [token, userId, router]);

// //   if (loading) return <p className="p-4">Loading...</p>;
// //   if (error) return <p className="p-4 text-red-500">{error}</p>;

// //   return (
// //     <div className="p-6">
// //       <h1 className="text-3xl font-bold mb-6">Commission Dashboard</h1>
// //       <div className="space-y-4">
// //         {participants.map((p) => (
// //           <ParticipantCard key={p.id} participant={p} />
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }

// // components/commissionComponent/ParticipanCard.tsx
// 'use client';

// import { useEffect, useState } from 'react';

// import { Participant } from '@/types/hirerachy';
// import ParticipantCard from '@/components/commissionComponent/ParticipanCard';
// import { buildHierarchy } from '@/services/hierarchyUtils';
// import { fetchHierarchy } from '@/services/commissionService';
// import { useAuthStore } from '@/context/stores/authStore';
// import { useRouter } from 'next/navigation';

// export default function DashboardPage() {
//   const router = useRouter();
//   const { token, userId, initializeAuth } = useAuthStore();

//   const [participants, setParticipants] = useState<Participant[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     initializeAuth();
//   }, [initializeAuth]);

//   useEffect(() => {
//     if (!token || !userId) {
//       router.push('/login');
//       return;
//     }

//     const loadHierarchy = async () => {
//       try {
//         const data = await fetchHierarchy(userId, token);
//         console.log('Data cruda de backend:', data);

//         const hierarchy = buildHierarchy(data);
//         console.log('Jerarquía construida:', hierarchy);
//         setParticipants(hierarchy);
//       } catch (err: any) {
//         setError(err.message || 'Error loading hierarchy');
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadHierarchy();
//   }, [token, userId, router]);

//   if (loading) return <p className="p-4">Loading...</p>;
//   if (error) return <p className="p-4 text-red-500">{error}</p>;

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold mb-6">Commission Dashboard</h1>
//       <div className="space-y-4">
//         {participants.map((p) => (
//           <ParticipantCard key={p.id} participant={p} />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default function DashboardPage() {
//   const router = useRouter();
//   const { token, userId, initializeAuth, logout } = useAuthStore();
//   console.log('🚀 ~ DashboardPage ~ token:', token);
//   const {
//     participants,
//     loading,
//     error,
//     fetchParticipants,
//     selectParticipant,
//     selectedParticipant,
//   } = useCommissionStore();

//   const [showAddForm, setShowAddForm] = useState(false);
//   const [viewMode, setViewMode] = useState<'hierarchy' | 'levels'>('hierarchy');

//   // Inicializar auth
//   useEffect(() => {
//     initializeAuth();
//   }, [initializeAuth]);

//   // Cargar participantes
//   useEffect(() => {
//     if (!token || !userId) {
//       router.push('/login');
//       return;
//     }
//     fetchParticipants(userId, token);
//   }, [token, userId, router, fetchParticipants]);

//   // Manejar logout
//   const handleLogout = () => {
//     logout();
//     router.push('/login');
//   };

//   if (loading && participants.length === 0) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
//           <p className="mt-4">Cargando datos...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center text-red-600">
//           <p>Error: {error}</p>
//           <button
//             onClick={() => fetchParticipants(userId!, token!)}
//             className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
//           >
//             Reintentar
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <header className="bg-white shadow">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
//           <h1 className="text-2xl font-bold text-gray-900">
//             Dashboard de Comisiones
//           </h1>
//           <div className="flex items-center space-x-4">
//             <button
//               onClick={() => setShowAddForm(true)}
//               className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
//             >
//               + Nuevo Participante
//             </button>
//             <button
//               onClick={handleLogout}
//               className="px-4 py-2 text-gray-600 hover:text-gray-900"
//             >
//               Cerrar Sesión
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* Contenido principal */}
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Selector de vista */}
//         <div className="mb-6">
//           <div className="flex space-x-4">
//             <button
//               onClick={() => setViewMode('hierarchy')}
//               className={`px-4 py-2 rounded ${
//                 viewMode === 'hierarchy'
//                   ? 'bg-blue-600 text-white'
//                   : 'bg-gray-200 hover:bg-gray-300'
//               }`}
//             >
//               Vista Jerárquica
//             </button>
//             <button
//               onClick={() => setViewMode('levels')}
//               className={`px-4 py-2 rounded ${
//                 viewMode === 'levels'
//                   ? 'bg-blue-600 text-white'
//                   : 'bg-gray-200 hover:bg-gray-300'
//               }`}
//             >
//               Vista por Niveles
//             </button>
//           </div>
//         </div>

//         {/* Estadísticas generales */}

//         {/* Vista seleccionada */}
//         {viewMode === 'hierarchy' ? (
//           <div className="mt-8">
//             <h2 className="text-xl font-bold mb-4">Jerarquía Completa</h2>
//             <div className="space-y-4">
//               {participants.map((p) => (
//                 <ParticipantCard key={p.id} participant={p} />
//               ))}
//             </div>
//           </div>
//         ) : (
//           <LevelView />
//         )}
//       </main>

//       {/* Modal de formulario */}
//       {showAddForm && (
//         <ParticipantForm
//           participant={selectedParticipant}
//           onClose={() => {
//             setShowAddForm(false);
//             selectParticipant(null);
//           }}
//         />
//       )}
//     </div>
//   );
// }

export default function DashboardPage() {
  const router = useRouter();
  const { token, userId, initializeAuth, logout } = useAuthStore();
  console.log('🚀 ~ DashboardPage ~ token:', token);

  const {
    participants,
    loading,
    error,
    fetchHierarchyData,
    fetchLevelStats,
    selectParticipant,
    selectedParticipant,
    totalCommissions,
    totalAmount,
    levelStats,
  } = useCommissionStore();

  const [showAddForm, setShowAddForm] = useState(false);
  const [viewMode, setViewMode] = useState<'hierarchy' | 'levels'>('hierarchy');

  // Inicializar auth
  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  // Cargar datos según el modo de vista
  useEffect(() => {
    if (!token || !userId) {
      router.push('/login');
      return;
    }

    const loadData = async () => {
      try {
        // Siempre cargar la jerarquía
        await fetchHierarchyData(userId, token);

        // Si estamos en modo niveles, también cargar estadísticas por nivel
        if (viewMode === 'levels') {
          await fetchLevelStats(userId, token);
        }
      } catch (err) {
        console.error('Error loading data:', err);
      }
    };

    loadData();
  }, [token, userId, router, fetchHierarchyData, fetchLevelStats, viewMode]);

  // Cargar estadísticas por nivel cuando cambiemos a ese modo
  useEffect(() => {
    if (
      viewMode === 'levels' &&
      token &&
      userId &&
      Object.keys(levelStats).length === 0
    ) {
      fetchLevelStats(userId, token);
    }
  }, [viewMode, token, userId, fetchLevelStats, levelStats]);

  // Manejar logout
  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  if (loading && participants.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4">Cargando datos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-red-600">
          <p>Error: {error}</p>
          <button
            onClick={() => {
              if (token && userId) {
                if (viewMode === 'hierarchy') {
                  fetchHierarchyData(userId, token);
                } else {
                  fetchLevelStats(userId, token);
                }
              }
            }}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Dashboard de Comisiones
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              {userId
                ? `Usuario ID: ${userId.substring(0, 8)}...`
                : 'No autenticado'}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowAddForm(true)}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
            >
              + Nuevo Participante
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Selector de vista */}
        <div className="mb-6">
          <div className="flex space-x-4">
            <button
              onClick={() => setViewMode('hierarchy')}
              className={`px-4 py-2 rounded transition-colors ${
                viewMode === 'hierarchy'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
              }`}
            >
              Vista Jerárquica
            </button>
            <button
              onClick={() => setViewMode('levels')}
              className={`px-4 py-2 rounded transition-colors ${
                viewMode === 'levels'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
              }`}
            >
              Vista por Niveles
            </button>
          </div>
        </div>

        {/* Estadísticas generales */}
        <div className="mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Resumen General</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <h3 className="text-sm text-gray-500">Participantes Totales</h3>
                <p className="text-3xl font-bold mt-2">{participants.length}</p>
              </div>
              <div className="text-center">
                <h3 className="text-sm text-gray-500">Transacciones</h3>
                <p className="text-3xl font-bold mt-2">{totalCommissions}</p>
              </div>
              <div className="text-center">
                <h3 className="text-sm text-gray-500">Monto Total</h3>
                <p className="text-3xl font-bold text-green-600 mt-2">
                  ${totalAmount.toLocaleString()}
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-sm text-gray-500">Vista Actual</h3>
                <p className="text-3xl font-bold mt-2 capitalize">
                  {viewMode === 'hierarchy' ? 'Jerárquica' : 'Por Niveles'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Vista seleccionada */}
        {viewMode === 'hierarchy' ? (
          <div className="mt-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Jerarquía Completa</h2>
              <span className="text-gray-500">
                {participants.length} participantes
              </span>
            </div>

            {participants.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg shadow">
                <p className="text-gray-500">No hay participantes cargados</p>
                <button
                  onClick={() => setShowAddForm(true)}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Agregar primer participante
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {participants.map((p) => (
                  <div key={p.id} className="relative">
                    <ParticipantCard
                      participant={p}
                      // onEdit={() => {
                      //   selectParticipant(p);
                      //   setShowAddForm(true);
                      // }}
                    />

                    {/* Mostrar hijos si existen */}
                    {p.children && p.children.length > 0 && (
                      <div className="ml-8 mt-4 border-l-2 border-gray-300 pl-6">
                        <h4 className="text-sm font-medium text-gray-500 mb-2">
                          Referidos Directos ({p.children.length})
                        </h4>
                        <div className="space-y-3">
                          {p.children.map((child) => (
                            <div key={child.id} className="relative">
                              <div className="absolute -left-6 top-4 w-4 h-0.5 bg-gray-300"></div>
                              <ParticipantCard
                                participant={child}
                                // onEdit={() => {
                                //   selectParticipant(child);
                                //   setShowAddForm(true);
                                // }}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <LevelView />
        )}

        {/* Información de debug (opcional - solo para desarrollo) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-8 p-4 bg-gray-100 rounded-lg">
            <details>
              <summary className="cursor-pointer text-sm text-gray-600">
                Información de Debug
              </summary>
              <div className="mt-2 text-xs">
                <p>
                  <strong>Token:</strong> {token ? '✓ Presente' : '✗ Ausente'}
                </p>
                <p>
                  <strong>User ID:</strong> {userId || 'No disponible'}
                </p>
                <p>
                  <strong>Vista:</strong> {viewMode}
                </p>
                <p>
                  <strong>Participantes:</strong> {participants.length}
                </p>
                <p>
                  <strong>Estadísticas por nivel cargadas:</strong>{' '}
                  {Object.keys(levelStats).length > 0 ? 'Sí' : 'No'}
                </p>
              </div>
            </details>
          </div>
        )}
      </main>

      {/* Modal de formulario */}
      {showAddForm && (
        <ParticipantForm
          participant={selectedParticipant}
          onClose={() => {
            setShowAddForm(false);
            selectParticipant(null);
          }}
        />
      )}
    </div>
  );
}
