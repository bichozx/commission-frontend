import { AffiliateLevel, Participant } from '@/types/hirerachy';
import {
  buildParticipantTree,
  flattenParticipants,
} from '@/services/tree.utils';
import { getAffiliateTree, getAffiliatesByLevel } from '@/services/affiliate';

import { create } from 'zustand';
import { normalizeAffiliate } from '../../../mapper/affiliate.mapper';

interface CommissionState {
  participants: Participant[];
  flatParticipants: Participant[];
  loading: boolean;
  error: string | null;
  selectedParticipant: Participant | null;

  fetchHierarchyData: (userId: string, token: string) => Promise<void>;
  fetchAffiliatesByLevel: (
    token: string,
    level?: AffiliateLevel
  ) => Promise<void>;
  selectParticipant: (p: Participant | null) => void;
}

export const useCommissionStore = create<CommissionState>((set) => ({
  participants: [],
  flatParticipants: [],
  loading: false,
  error: null,
  selectedParticipant: null,

  async fetchHierarchyData(userId, token) {
    set({ loading: true, error: null });
    try {
      const rawTree = await getAffiliateTree(userId, token);
      const normalized = normalizeAffiliate(rawTree);
      const root = buildParticipantTree(normalized);
      set({
        participants: [root],
        flatParticipants: flattenParticipants(root),
        loading: false,
      });
    } catch (e) {
      set({ error: 'Error cargando jerarquía', loading: false });
    }
  },

  async fetchAffiliatesByLevel(token, level) {
    set({ loading: true, error: null });
    try {
      const data = await getAffiliatesByLevel(token, level);
      const participants = data
        .map(normalizeAffiliate)
        .map((a) => buildParticipantTree(a));

      set({ participants, flatParticipants: participants, loading: false });
    } catch {
      set({ error: 'Error cargando afiliados', loading: false });
    }
  },

  selectParticipant: (p) => set({ selectedParticipant: p }),
}));
