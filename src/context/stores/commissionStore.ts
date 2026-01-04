/* eslint-disable @typescript-eslint/no-explicit-any */
// import {
//   addParticipant,
//   deleteParticipant,
//   fetchHierarchy,
//   updateParticipant,
// } from '@/services/commissionservice';

// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { Participant } from '@/types/hirerachy';
// import { buildHierarchy } from '@/services/hierarchyUtils';
// // src/context/stores/commissionStore.ts
// import { create } from 'zustand';

// interface CommissionState {
//   participants: Participant[];
//   currentLevel: number;
//   loading: boolean;
//   error: string | null;
//   selectedParticipant: Participant | null;

//   // Actions
//   fetchParticipants: (userId: string, token: string) => Promise<void>;
//   setCurrentLevel: (level: number) => void;
//   selectParticipant: (participant: Participant | null) => void;
//   addNewParticipant: (participantData: any, token: string) => Promise<void>;
//   updateExistingParticipant: (
//     id: string,
//     participantData: any,
//     token: string
//   ) => Promise<void>;
//   removeParticipant: (id: string, token: string) => Promise<void>;
// }

// export const useCommissionStore = create<CommissionState>((set, get) => ({
//   participants: [],
//   currentLevel: 1,
//   loading: false,
//   error: null,
//   selectedParticipant: null,

//   fetchParticipants: async (userId: string, token: string) => {
//     set({ loading: true, error: null });
//     try {
//       const data = await fetchHierarchy(userId, token);
//       const hierarchy = buildHierarchy(data);
//       set({ participants: hierarchy, loading: false });
//     } catch (error: any) {
//       set({ error: error.message, loading: false });
//     }
//   },

//   setCurrentLevel: (level: number) => {
//     set({ currentLevel: level });
//   },

//   selectParticipant: (participant: Participant | null) => {
//     set({ selectedParticipant: participant });
//   },

//   addNewParticipant: async (participantData: any, token: string) => {
//     set({ loading: true });
//     try {
//       const newParticipant = await addParticipant(participantData, token);
//       set((state) => ({
//         participants: [...state.participants, newParticipant],
//         loading: false,
//       }));
//     } catch (error: any) {
//       set({ error: error.message, loading: false });
//       throw error;
//     }
//   },

//   updateExistingParticipant: async (
//     id: string,
//     participantData: any,
//     token: string
//   ) => {
//     set({ loading: true });
//     try {
//       const updated = await updateParticipant(id, participantData, token);
//       set((state) => ({
//         participants: state.participants.map((p) =>
//           p.id === id ? { ...p, ...updated } : p
//         ),
//         selectedParticipant: null,
//         loading: false,
//       }));
//     } catch (error: any) {
//       set({ error: error.message, loading: false });
//       throw error;
//     }
//   },

//   removeParticipant: async (id: string, token: string) => {
//     set({ loading: true });
//     try {
//       await deleteParticipant(id, token);
//       set((state) => ({
//         participants: state.participants.filter((p) => p.id !== id),
//         loading: false,
//       }));
//     } catch (error: any) {
//       set({ error: error.message, loading: false });
//       throw error;
//     }
//   },
// }));

import {
  addParticipant,
  deleteParticipant,
  fetchCommissionsByLevel,
  fetchHierarchy,
  updateParticipant,
} from '@/services/commissionservice';
import { buildHierarchy, flattenHierarchy } from '@/services/hierarchyUtils';

import { Participant } from '@/types/hirerachy';
import { create } from 'zustand';

interface CommissionState {
  // Para jerarquía
  participants: Participant[];
  flatParticipants: Participant[]; // NUEVO: Lista plana de todos los participantes

  // Para vista por niveles
  currentLevel: number;
  levelStats: {
    [key: number]: {
      count: number;
      totalAmount: number;
      percentage: number;
      description: string;
    };
  };
  totalCommissions: number;
  totalAmount: number;

  // Estado general
  loading: boolean;
  error: string | null;
  selectedParticipant: Participant | null;

  // Actions
  fetchHierarchyData: (userId: string, token: string) => Promise<void>;
  fetchLevelStats: (userId: string, token: string) => Promise<void>;
  setCurrentLevel: (level: number) => void;
  selectParticipant: (participant: Participant | null) => void;
  addNewParticipant: (participantData: any, token: string) => Promise<void>;
  updateExistingParticipant: (
    id: string,
    participantData: any,
    token: string
  ) => Promise<void>;
  removeParticipant: (id: string, token: string) => Promise<void>;
}

export const useCommissionStore = create<CommissionState>((set, get) => ({
  participants: [],
  flatParticipants: [], // NUEVO
  currentLevel: 1,
  levelStats: {},
  totalCommissions: 0,
  totalAmount: 0,
  loading: false,
  error: null,
  selectedParticipant: null,

  // Cargar jerarquía
  fetchHierarchyData: async (userId: string, token: string) => {
    set({ loading: true, error: null });
    try {
      const data = await fetchHierarchy(userId, token);
      const hierarchy = buildHierarchy(data);
      const flatList = flattenHierarchy(hierarchy); // NUEVO

      set({
        participants: hierarchy,
        flatParticipants: flatList, // NUEVO
        loading: false,
      });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  // Cargar estadísticas por nivel (del nuevo endpoint)
  fetchLevelStats: async (userId: string, token: string) => {
    set({ loading: true, error: null });
    try {
      const data = await fetchCommissionsByLevel(userId, token);
      console.log('📊 Datos por nivel del backend:', data);

      // Transformar los datos para que sean más fáciles de usar
      const levelStats = {
        1: data.byLevel?.level1 || {
          count: 0,
          totalAmount: 0,
          percentage: 0,
          description: '',
        },
        2: data.byLevel?.level2 || {
          count: 0,
          totalAmount: 0,
          percentage: 0,
          description: '',
        },
        3: data.byLevel?.level3 || {
          count: 0,
          totalAmount: 0,
          percentage: 0,
          description: '',
        },
      };

      set({
        levelStats,
        totalCommissions: data.totalCommissions || 0,
        totalAmount: data.totalAmount || 0,
        loading: false,
      });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  setCurrentLevel: (level: number) => {
    console.log('🎯 Cambiando nivel a:', level);
    set({ currentLevel: level });
  },

  selectParticipant: (participant: Participant | null) => {
    set({ selectedParticipant: participant });
  },

  addNewParticipant: async (participantData: any, token: string) => {
    set({ loading: true });
    try {
      const newParticipant = await addParticipant(participantData, token);
      set((state) => ({
        participants: [...state.participants, newParticipant],
        loading: false,
      }));
    } catch (error: any) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  updateExistingParticipant: async (
    id: string,
    participantData: any,
    token: string
  ) => {
    set({ loading: true });
    try {
      const updated = await updateParticipant(id, participantData, token);
      set((state) => ({
        participants: state.participants.map((p) =>
          p.id === id ? { ...p, ...updated } : p
        ),
        selectedParticipant: null,
        loading: false,
      }));
    } catch (error: any) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  removeParticipant: async (id: string, token: string) => {
    set({ loading: true });
    try {
      await deleteParticipant(id, token);
      set((state) => ({
        participants: state.participants.filter((p) => p.id !== id),
        loading: false,
      }));
    } catch (error: any) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },
}));
