/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/commission/CommissionStats.tsx
'use client';

interface CommissionStatsProps {
  participants: any[];
  levelStats?: any;
  viewMode: 'hierarchy' | 'levels';
}

export default function CommissionStats({
  participants,
  levelStats = {},
  viewMode,
}: CommissionStatsProps) {
  const totalParticipants = participants.length;

  // Calcular total de comisiones de todos los participantes
  const totalCommission = participants.reduce(
    (sum, p) => sum + (p.totalCommission || 0),
    0
  );

  // Calcular comisión promedio
  const averageCommission =
    totalParticipants > 0 ? totalCommission / totalParticipants : 0;

  // Si estamos en modo niveles, mostrar estadísticas por nivel
  const hasLevelStats = Object.keys(levelStats).length > 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-sm text-gray-500 font-medium">
          Participantes Totales
        </h3>
        <p className="text-3xl font-bold mt-2">{totalParticipants}</p>
        <p className="text-xs text-gray-400 mt-1">En jerarquía completa</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-sm text-gray-500 font-medium">Comisión Total</h3>
        <p className="text-3xl font-bold text-green-600 mt-2">
          ${totalCommission.toLocaleString()}
        </p>
        <p className="text-xs text-gray-400 mt-1">
          Suma de todas las comisiones
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-sm text-gray-500 font-medium">Comisión Promedio</h3>
        <p className="text-3xl font-bold mt-2">
          $
          {averageCommission.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>
        <p className="text-xs text-gray-400 mt-1">Por participante</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-sm text-gray-500 font-medium">Vista Actual</h3>
        <p className="text-3xl font-bold mt-2 capitalize">
          {viewMode === 'hierarchy' ? 'Jerárquica' : 'Por Niveles'}
        </p>
        <p className="text-xs text-gray-400 mt-1">
          {viewMode === 'levels' && hasLevelStats
            ? `3 niveles disponibles`
            : 'Estructura completa'}
        </p>
      </div>
    </div>
  );
}
