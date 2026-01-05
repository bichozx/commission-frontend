import {
  addParticipant,
  deleteParticipant,
  fetchCommissionsByLevel,
  updateParticipant,
} from '@/services/commissionservice';

import { Participant } from '@/types/hirerachy';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { affiliateTree } from '@/services/affiliate';
import { create } from 'zustand';

interface CommissionState {
  // Para jerarquía
  participants: Participant[];
  flatParticipants: Participant[];

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
  totalEarned: number;
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
  totalEarned: 0,
  totalAmount: 0,
  loading: false,
  error: null,
  selectedParticipant: null,

  fetchHierarchyData: async (userId: string, token: string) => {
    set({ loading: true, error: null });

    try {
      const tree = await affiliateTree(userId, token);

      if (!tree) {
        set({ participants: [], flatParticipants: [], loading: false });
        return;
      }

      // 2️⃣ Normalizar árbol en Participant
      const normalizeNode = (node: any, parentId?: string): Participant => ({
        id: node.id,
        name: node.name,
        email: node.email || '',
        level: node.level,
        totalEarned: node.totalEarned ?? 0,
        totalCommission: node.totalCommission ?? 0,
        parentId: parentId ?? undefined,
        children:
          node.children?.map((child: any) => normalizeNode(child, node.id)) ||
          [],
      });

      const rootNode: Participant = normalizeNode(tree);

      const flatParticipants: Participant[] = [];
      const traverse = (node: Participant) => {
        flatParticipants.push({ ...node, children: [] });
        node.children.forEach(traverse);
      };
      traverse(rootNode);

      // 4️⃣ Guardar en el estado
      set({
        participants: [rootNode],
        flatParticipants,
        loading: false,
      });

      console.table(
        flatParticipants.map((p) => ({
          name: p.name,
          level: p.level,
          totalEarned: p.totalEarned,
          totalCommission: p.totalCommission,
        }))
      );
    } catch (error: any) {
      console.error('❌ fetchHierarchyData error:', error);
      set({ error: error.message, loading: false });
    }
  },

  fetchLevelStats: async (userId: string, token: string) => {
    set({ loading: true, error: null });
    try {
      const data = await fetchCommissionsByLevel(userId, token);

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
