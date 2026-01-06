/* eslint-disable @typescript-eslint/no-explicit-any */

import { AffiliateLevel, Participant } from '@/types/hirerachy';
import {
  addParticipant,
  deleteParticipant,
  updateParticipant,
} from '@/services/commissionservice';

import { LevelStats } from '@/types/commission';
import axios from 'axios';
import { create } from 'zustand';

const API_URL = 'https://commission-backend-11px.onrender.com';

// Tipo de afiliado del backend
export interface Affiliate {
  id: string;
  userId: string;
  level: number;
  commissionRate?: number;
  totalEarned: number;
  status?: string;
  name?: string;
  email?: string;
  parentId?: string;
  user?: { name: string; email: string };
  children: Affiliate[]; // ✅ nunca never[]
}

export interface UpdateAffiliateDto {
  level?: number;
  commissionRate?: number;
  status?: string;
}

// --- Servicios ---
export async function affiliateTree(
  affiliateId: string,
  token: string
): Promise<Affiliate> {
  const res = await axios.get(`${API_URL}/affiliates/tree/${affiliateId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

export async function createAffiliate(
  data: { userId: string; parentId?: string },
  token: string
): Promise<Affiliate> {
  const res = await axios.post(`${API_URL}/affiliates`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

export async function updateAffiliate(
  affiliateId: string,
  data: UpdateAffiliateDto,
  token: string
): Promise<Affiliate> {
  const res = await axios.put(`${API_URL}/affiliates/${affiliateId}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

export async function getAffiliatesByLevel(
  token: string,
  level?: number
): Promise<Affiliate[]> {
  const params = level !== undefined ? { level } : {};
  const res = await axios.get(`${API_URL}/affiliates/`, {
    headers: { Authorization: `Bearer ${token}` },
    params,
  });

  // Map seguro: aseguramos todos los campos esperados
  const affiliates: Affiliate[] = res.data.map((a: any) => ({
    id: a.id,
    userId: a.userId,
    level: a.level,
    totalEarned: parseFloat(a.totalEarned ?? 0),
    commissionRate: parseFloat(a.commissionRate ?? 0),
    status: a.status ?? 'active',
    name: a.user?.name ?? '',
    email: a.user?.email ?? '',
    parentId: a.parentId,
    user: { name: a.user?.name ?? '', email: a.user?.email ?? '' },
    children: a.children ?? [],
  }));

  return affiliates;
}

// --- Map Affiliate -> Participant ---
export function mapAffiliateToParticipant(
  affiliate: Affiliate,
  parentId?: string
): Participant {
  return {
    id: affiliate.id,
    name: affiliate.name ?? affiliate.user?.name ?? '',
    email: affiliate.email ?? affiliate.user?.email ?? '',
    level: affiliate.level,
    totalEarned: Number(affiliate.totalEarned ?? 0),
    totalCommission: Number(affiliate.commissionRate ?? 0),
    parentId,
    children: [], // se llenará recursivamente en buildChildren
    affiliate: {
      ...affiliate,
      name: affiliate.name ?? affiliate.user?.name ?? '',
      email: affiliate.email ?? affiliate.user?.email ?? '',
      user: affiliate.user ?? { name: '', email: '' },
      children: affiliate.children, // ✅ ya es Affiliate[]
    },
  };
}

// --- Zustand Store ---
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
    participantData: Partial<Affiliate>,
    token: string
  ) => Promise<void>;
  updateExistingParticipant: (
    id: string,
    participantData: Partial<Affiliate>,
    token: string
  ) => Promise<void>;
  removeParticipant: (id: string, token: string) => Promise<void>;
}

export const useCommissionStore = create<CommissionState>((set) => {
  const flattenTree = (root: Participant): Participant[] => {
    const result: Participant[] = [];
    const traverse = (node: Participant) => {
      result.push({ ...node, children: [] });
      node.children.forEach(traverse);
    };
    traverse(root);
    return result;
  };

  const buildChildren = (node: Participant, affiliateNode: Affiliate) => {
    node.children = (affiliateNode.children ?? []).map((child) => {
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
        const treeData = await affiliateTree(userId, token);
        const rootNode = mapAffiliateToParticipant(treeData);
        buildChildren(rootNode, treeData);
        const flatParticipants = flattenTree(rootNode);
        set({ participants: [rootNode], flatParticipants, loading: false });
      } catch (err: unknown) {
        const message =
          err instanceof Error ? err.message : 'Error desconocido';
        set({ error: message, loading: false });
      }
    },

    fetchAffiliatesByLevel: async (token, level) => {
      set({ loading: true, error: null });
      try {
        const data = await getAffiliatesByLevel(token, level);
        const participants = data.map((a) => mapAffiliateToParticipant(a));
        set({ participants, flatParticipants: participants, loading: false });
      } catch (err: unknown) {
        const message =
          err instanceof Error ? err.message : 'Error desconocido';
        set({ error: message, loading: false });
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
      } catch (err: unknown) {
        const message =
          err instanceof Error ? err.message : 'Error desconocido';
        set({ error: message, loading: false });
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
      } catch (err: unknown) {
        const message =
          err instanceof Error ? err.message : 'Error desconocido';
        set({ error: message, loading: false });
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
      } catch (err: unknown) {
        const message =
          err instanceof Error ? err.message : 'Error desconocido';
        set({ error: message, loading: false });
        throw err;
      }
    },
  };
});
