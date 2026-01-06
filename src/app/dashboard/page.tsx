'use client';

import { useEffect, useState } from 'react';

import LevelView from '@/components/commission/LevelView';
import ParticipantCard from '@/components/commissionComponent/ParticipanCard';
import ParticipantForm from '@/components/commission/ParticipanForm';
import UpdateAffiliateForm from '@/components/commissionComponent/UpdateAffiliateForm';
import { useAuthStore } from '@/context/stores/authStore';
import { useCommissionStore } from '@/context/stores/commissionStore';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();
  const { token, userId, initializeAuth, logout, level } = useAuthStore();

  const {
    participants,
    loading,
    error,
    fetchHierarchyData,

    selectParticipant,
    selectedParticipant,
    totalEarned,
    totalAmount,
    fetchAffiliatesByLevel,
    levelStats,
  } = useCommissionStore();

  const [showAddForm, setShowAddForm] = useState(false);
  const [viewMode, setViewMode] = useState<'hierarchy' | 'levels'>('hierarchy');

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  useEffect(() => {
    if (!token || !userId) {
      router.push('/login');
      return;
    }

    const loadData = async () => {
      try {
        await fetchHierarchyData(userId, token);
        if (viewMode === 'levels') {
          await fetchAffiliatesByLevel(token, level ?? undefined);
        }
      } catch (err) {
        console.error('Error loading data:', err);
      }
    };

    loadData();
  }, [
    token,
    userId,
    router,
    fetchHierarchyData,
    fetchAffiliatesByLevel,
    viewMode,
  ]);

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
                viewMode === 'hierarchy'
                  ? fetchHierarchyData(userId, token)
                  : fetchAffiliatesByLevel(token, level ?? undefined);
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
            {level !== null && level < 3 && (
              <button
                onClick={() => setShowAddForm(true)}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
              >
                + Nuevo Afiliado
              </button>
            )}

            <button
              onClick={handleLogout}
              className="px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Selector de vista */}
        <div className="mb-6 flex space-x-4">
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

        {/* Estadísticas */}
        <div className="mb-8 bg-white rounded-lg shadow p-6 grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
          <div>
            <h3 className="text-sm text-gray-500">Participantes Totales</h3>
            <p className="text-3xl font-bold mt-2">{participants.length}</p>
          </div>
          <div>
            <h3 className="text-sm text-gray-500">Transacciones</h3>
            <p className="text-3xl font-bold mt-2">{totalEarned}</p>
          </div>
          <div>
            <h3 className="text-sm text-gray-500">Monto Total</h3>
            <p className="text-3xl font-bold text-green-600 mt-2">
              ${totalAmount.toLocaleString()}
            </p>
          </div>
          <div>
            <h3 className="text-sm text-gray-500">Vista Actual</h3>
            <p className="text-3xl font-bold mt-2 capitalize">{viewMode}</p>
          </div>
        </div>

        {/* Jerarquía */}
        {viewMode === 'hierarchy' ? (
          <div className="mt-8 space-y-4">
            {participants.map((p) => (
              <div key={p.id} className="relative">
                <ParticipantCard
                  participant={p}
                  onEdit={() => {
                    selectParticipant(p);
                    setShowAddForm(true);
                  }}
                />
                {p.children.length > 0 && (
                  <div className="ml-8 mt-4 border-l-2 border-gray-300 pl-6">
                    {p.children.map((child) => (
                      <ParticipantCard
                        key={child.id}
                        participant={child}
                        onEdit={() => {
                          selectParticipant(child);
                          setShowAddForm(true);
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <LevelView />
        )}
      </main>

      {/* Modal */}
      {showAddForm && selectedParticipant?.affiliate ? (
        <UpdateAffiliateForm
          affiliate={selectedParticipant.affiliate}
          onClose={() => {
            setShowAddForm(false);
            selectParticipant(null);
          }}
          onUpdated={() => {
            if (token && userId) fetchHierarchyData(userId, token);
            setShowAddForm(false);
            selectParticipant(null);
          }}
        />
      ) : showAddForm ? (
        <ParticipantForm
          participant={selectedParticipant}
          onClose={() => {
            setShowAddForm(false);
            selectParticipant(null);
          }}
        />
      ) : null}
    </div>
  );
}
