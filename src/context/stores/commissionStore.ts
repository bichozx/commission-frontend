/* eslint-disable @typescript-eslint/no-explicit-any */
import { AffiliateLevel, Participant } from '@/types/hirerachy';
import {
  addParticipant,
  deleteParticipant,
  updateParticipant,
} from '@/services/commissionservice';
import { affiliateTree, getAffiliatesByLevel } from '@/services/affiliate';

import { Affiliate } from './affiliateStore';
import { LevelStats } from '@/types/commission';
import { create } from 'zustand';

interface CommissionState {
  participants: Participant[];
  flatParticipants: Participant[];
  currentLevel: AffiliateLevel;
  levelStats: Record<number, LevelStats>;
  totalCommissions: number;
  totalEarned: number;
  totalAmount: number;
  loading: boolean;
  error: string | null;
  selectedParticipant: Participant | null;

  fetchHierarchyData: (userId: string, token: string) => Promise<void>;
  fetchAffiliatesByLevel: (
    token: string,
    level?: AffiliateLevel
  ) => Promise<void>;
  setCurrentLevel: (level: AffiliateLevel) => void;
  selectParticipant: (participant: Participant | null) => void;
  addNewParticipant: (
    participantData: Partial<Participant>,
    token: string
  ) => Promise<void>;
  updateExistingParticipant: (
    id: string,
    participantData: Partial<Participant>,
    token: string
  ) => Promise<void>;
  removeParticipant: (id: string, token: string) => Promise<void>;
}

export const useCommissionStore = create<CommissionState>((set, get) => {
  // Convierte un Affiliate en Participant
  const mapAffiliateToParticipant = (
    affiliate: Affiliate,
    parentId?: string
  ): Participant => ({
    id: affiliate.id,
    name: affiliate.user?.name ?? '',
    email: affiliate.user?.email ?? '',
    level: affiliate.level,
    totalEarned: Number(affiliate.totalEarned ?? 0),
    totalCommission: Number(affiliate.commissionRate ?? 0),
    parentId,
    children: [],
    affiliate: {
      ...affiliate,
      name: '',
      email: '',
    }, // guardamos el objeto original
  });

  // Aplana un árbol de Participants
  const flattenTree = (root: Participant): Participant[] => {
    const result: Participant[] = [];
    const traverse = (node: Participant) => {
      result.push({ ...node, children: [] });
      node.children.forEach(traverse);
    };
    traverse(root);
    return result;
  };

  // Construye hijos recursivamente
  const buildChildren = (node: Participant, affiliateNode: Affiliate) => {
    node.children = affiliateNode.children.map((child) => {
      const childNode = mapAffiliateToParticipant(child, node.id);
      buildChildren(childNode, child);
      return childNode;
    });
  };

  return {
    participants: [],
    flatParticipants: [],
    currentLevel: 1,
    levelStats: {},
    totalCommissions: 0,
    totalEarned: 0,
    totalAmount: 0,
    loading: false,
    error: null,
    selectedParticipant: null,

    fetchHierarchyData: async (userId, token) => {
      set({ loading: true, error: null });
      try {
        const treeData: Affiliate = await affiliateTree(userId, token);
        if (!treeData) {
          set({ participants: [], flatParticipants: [], loading: false });
          return;
        }

        const rootNode = mapAffiliateToParticipant(treeData);
        buildChildren(rootNode, treeData);
        const flatParticipants = flattenTree(rootNode);

        set({ participants: [rootNode], flatParticipants, loading: false });
      } catch (err: any) {
        set({ error: err.message ?? 'Error desconocido', loading: false });
      }
    },

    fetchAffiliatesByLevel: async (token, level) => {
      set({ loading: true, error: null });
      try {
        const data: Affiliate[] = await getAffiliatesByLevel(token, level);
        const participants = data.map((a) => mapAffiliateToParticipant(a));
        set({ participants, flatParticipants: participants, loading: false });
      } catch (err: any) {
        set({ error: err.message ?? 'Error desconocido', loading: false });
      }
    },

    setCurrentLevel: (level) => set({ currentLevel: level }),

    selectParticipant: (participant) =>
      set({ selectedParticipant: participant }),

    addNewParticipant: async (participantData, token) => {
      set({ loading: true });
      try {
        const newAffiliate = await addParticipant(participantData, token);
        const mapped = mapAffiliateToParticipant(newAffiliate);
        set((state) => ({
          participants: [...state.participants, mapped],
          flatParticipants: [...state.flatParticipants, mapped],
          loading: false,
        }));
      } catch (err: any) {
        set({ error: err.message ?? 'Error desconocido', loading: false });
        throw err;
      }
    },

    updateExistingParticipant: async (id, participantData, token) => {
      set({ loading: true });
      try {
        const updatedAffiliate = await updateParticipant(
          id,
          participantData,
          token
        );
        const updatedParticipant = mapAffiliateToParticipant(updatedAffiliate);
        set((state) => ({
          participants: state.participants.map((p) =>
            p.id === id ? { ...p, ...updatedParticipant } : p
          ),
          flatParticipants: state.flatParticipants.map((p) =>
            p.id === id ? { ...p, ...updatedParticipant } : p
          ),
          selectedParticipant: null,
          loading: false,
        }));
      } catch (err: any) {
        set({ error: err.message ?? 'Error desconocido', loading: false });
        throw err;
      }
    },

    removeParticipant: async (id, token) => {
      set({ loading: true });
      try {
        await deleteParticipant(id, token);
        set((state) => ({
          participants: state.participants.filter((p) => p.id !== id),
          flatParticipants: state.flatParticipants.filter((p) => p.id !== id),
          loading: false,
        }));
      } catch (err: any) {
        set({ error: err.message ?? 'Error desconocido', loading: false });
        throw err;
      }
    },
  };
});
