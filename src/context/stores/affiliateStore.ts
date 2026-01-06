/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';
import { updateParticipant } from '@/services/commissionservice';

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

interface AffiliateState {
  loading: boolean;
  error: string | null;

  /**
   * Asigna un afiliado padre a un afiliado existente
   * El backend recalcula nivel y comisión
   */
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
