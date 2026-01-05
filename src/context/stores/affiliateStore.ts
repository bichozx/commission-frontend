/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';
import { updateParticipant } from '@/services/commissionservice';

export interface Affiliate {
  id: string;
  userId: string;
  level: number;
  parentId?: string | null;
  commissionRate: number;
  status: 'active' | 'inactive';
  totalEarned: number;
}

interface AffiliateState {
  loading: boolean;
  error: string | null;

  assignParent: (
    affiliateId: string,
    parentId: string,
    token: string
  ) => Promise<void>;
}

export const useAffiliateStore = create<AffiliateState>((set) => ({
  loading: false,
  error: null,

  assignParent: async (affiliateId, parentId, token) => {
    set({ loading: true, error: null });

    try {
      await updateParticipant(affiliateId, { parentId }, token);

      set({ loading: false });
    } catch (error: any) {
      set({
        error: error.message || 'Error asignando referidor',
        loading: false,
      });
      throw error;
    }
  },
}));
