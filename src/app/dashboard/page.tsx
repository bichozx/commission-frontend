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

export default function DashboardPage() {
  const router = useRouter();
  const { token, userId, initializeAuth, logout } = useAuthStore();
  const {
    participants,
    loading,
    error,
    fetchParticipants,
    selectParticipant,
    selectedParticipant,
  } = useCommissionStore();

  const [showAddForm, setShowAddForm] = useState(false);
  const [viewMode, setViewMode] = useState<'hierarchy' | 'levels'>('hierarchy');

  // Inicializar auth
  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  // Cargar participantes
  useEffect(() => {
    if (!token || !userId) {
      router.push('/login');
      return;
    }
    fetchParticipants(userId, token);
  }, [token, userId, router, fetchParticipants]);

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
            onClick={() => fetchParticipants(userId!, token!)}
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
          <h1 className="text-2xl font-bold text-gray-900">
            Dashboard de Comisiones
          </h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowAddForm(true)}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              + Nuevo Participante
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-gray-600 hover:text-gray-900"
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
              className={`px-4 py-2 rounded ${
                viewMode === 'hierarchy'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              Vista Jerárquica
            </button>
            <button
              onClick={() => setViewMode('levels')}
              className={`px-4 py-2 rounded ${
                viewMode === 'levels'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              Vista por Niveles
            </button>
          </div>
        </div>

        {/* Estadísticas generales */}

        {/* Vista seleccionada */}
        {viewMode === 'hierarchy' ? (
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Jerarquía Completa</h2>
            <div className="space-y-4">
              {participants.map((p) => (
                <ParticipantCard key={p.id} participant={p} />
              ))}
            </div>
          </div>
        ) : (
          <LevelView />
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
