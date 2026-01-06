'use client';

import { useEffect, useState } from 'react';

import { AffiliateLevel } from '@/types/hirerachy';
import LevelView from '@/components/commission/LevelView';
import ParticipantCard from '@/components/commissionComponent/ParticipanCard';
import ParticipantForm from '@/components/commission/ParticipanForm';
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
    fetchAffiliatesByLevel,
    selectParticipant,
    selectedParticipant,
  } = useCommissionStore();

  const [showAddForm, setShowAddForm] = useState(false);
  const [viewMode, setViewMode] = useState<'hierarchy' | 'levels'>('hierarchy');

  /* -------- Helpers -------- */
  const safeLevel = (lvl: number | null): AffiliateLevel | undefined => {
    return lvl === 1 || lvl === 2 || lvl === 3 ? lvl : undefined;
  };

  /* -------- Auth init -------- */
  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  /* -------- Data loading -------- */
  useEffect(() => {
    if (!token || !userId) {
      router.push('/login');
      return;
    }

    const loadData = async () => {
      try {
        if (viewMode === 'hierarchy') {
          await fetchHierarchyData(userId, token);
        } else {
          //await fetchAffiliatesByLevel(token, safeLevel(level));
        }
      } catch (err) {
        console.error('Error loading data:', err);
      }
    };

    loadData();
  }, [
    token,
    userId,
    viewMode,
    level,
    fetchHierarchyData,
    fetchAffiliatesByLevel,
    router,
  ]);

  /* -------- Actions -------- */
  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  /* -------- UI states -------- */
  if (loading && participants.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Cargando datos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        <p>Error: {error}</p>
        <button
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
          onClick={() => {
            if (!token || !userId) return;

            if (viewMode === 'hierarchy') {
              fetchHierarchyData(userId, token);
            } else {
              fetchAffiliatesByLevel(token, safeLevel(level));
            }
          }}
        >
          Reintentar
        </button>
      </div>
    );
  }

  /* -------- Render -------- */
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      {/* <header className="bg-white shadow px-6 py-4 flex justify-between">
        <h1 className="text-xl font-bold">Dashboard de Comisiones</h1>
        <button onClick={handleLogout}>Cerrar sesión</button>
      </header> */}
      <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-gray-900">
            Dashboard de Comisiones
          </h1>
          <p className="text-sm text-gray-500">
            {userId ? `Usuario ID: ${userId.slice(0, 8)}...` : ''}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {level !== null && level < 3 && (
            <button
              onClick={() => {
                setShowAddForm(true);
                selectParticipant(null);
              }}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            >
              + Nuevo Afiliado
            </button>
          )}

          <button
            onClick={handleLogout}
            className="px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded"
          >
            Cerrar sesión
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6">
        {/* View selector */}
        <div className="flex gap-4 mb-6">
          <button onClick={() => setViewMode('hierarchy')}>
            Vista jerárquica
          </button>
          <button onClick={() => setViewMode('levels')}>
            Vista por niveles
          </button>
        </div>

        {/* Content */}
        {viewMode === 'hierarchy' ? (
          participants.map((p) => (
            <ParticipantCard
              key={p.id}
              participant={p}
              onEdit={() => {
                selectParticipant(p);
                setShowAddForm(true);
              }}
            />
          ))
        ) : (
          <LevelView />
        )}
      </main>

      {/* Modal */}
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
