import { AffiliateStatus } from '@/services/hierarchyUtils';

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface AuthState {
  token: string | null;
  userId: string | null;
  level: number | null;
  user: any | null;
  isInitialized: boolean;

  // Actions
  login: (token: string, userId: string, level: number, user?: any) => void;
  logout: () => void;
  initializeAuth: () => void;
  setAuth: (token: string, userId: string, level: number, user?: any) => void;
  clearAuth: () => void;
}

export interface AffiliateUser {
  name: string;
  email: string;
}

export interface Affiliate {
  id: string;
  userId: string;
  level: number;
  commissionRate?: number;
  totalEarned: number;
  status: AffiliateStatus;
  parentId?: string;

  name?: string;
  email?: string;
  user?: AffiliateUser;

  children: Affiliate[];
}
