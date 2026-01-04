import {
  addParticipant,
  deleteParticipant,
  fetchHierarchy,
  updateParticipant,
} from '@/services/commissionservice';

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Participant } from '@/types/hirerachy';
import { buildHierarchy } from '@/services/hierarchyUtils';
// src/context/stores/commissionStore.ts
import { create } from 'zustand';

interface CommissionState {
  participants: Participant[];
  currentLevel: number;
  loading: boolean;
  error: string | null;
  selectedParticipant: Participant | null;

  // Actions
  fetchParticipants: (userId: string, token: string) => Promise<void>;
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
  currentLevel: 1,
  loading: false,
  error: null,
  selectedParticipant: null,

  fetchParticipants: async (userId: string, token: string) => {
    set({ loading: true, error: null });
    try {
      const data = await fetchHierarchy(userId, token);
      const hierarchy = buildHierarchy(data);
      set({ participants: hierarchy, loading: false });
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
