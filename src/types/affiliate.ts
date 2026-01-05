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
