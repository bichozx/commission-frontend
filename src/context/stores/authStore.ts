/* eslint-disable @typescript-eslint/no-explicit-any */
// import { create } from 'zustand';
// import { persist } from 'zustand/middleware';

// interface AuthState {
//   token: string | null;
//   userId: string | null;
//   level: number | null;
//   login: (token: string, userId: string, level: number) => void;
//   logout: () => void;
//   initializeAuth: () => void;
// }

// export const useAuthStore = create<AuthState>()(
//   persist(
//     (set) => ({
//       token: null,
//       userId: null,
//       level: null,

//       login: (token: string, userId: string, level?: number) => {
//         set({ token, userId, level: level ?? 1 });
//         localStorage.setItem(
//           'auth',
//           JSON.stringify({ token, userId, level: level ?? 1 })
//         );
//       },

//       logout: () => {
//         set({ token: null, userId: null, level: null });
//         localStorage.removeItem('auth');
//       },

//       initializeAuth: () => {
//         const saved = localStorage.getItem('auth');
//         if (saved) {
//           const { token, userId, level } = JSON.parse(saved);
//           set({ token, userId, level });
//         }
//       },
//     }),
//     {
//       name: 'auth-storage',
//     }
//   )
// );

// src/context/stores/authStore.ts - Mejorado
// src/context/stores/authStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
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

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      userId: null,
      level: null,
      user: null,
      isInitialized: false,

      login: (token, userId, level, user) => {
        set({
          token,
          userId,
          level,
          user: user || null,
          isInitialized: true,
        });
      },

      logout: () => {
        set({
          token: null,
          userId: null,
          level: null,
          user: null,
        });
        // Opcional: limpiar localStorage específico
        if (typeof window !== 'undefined') {
          localStorage.removeItem('auth');
        }
      },

      initializeAuth: () => {
        if (typeof window !== 'undefined') {
          const authData = localStorage.getItem('auth');
          if (authData) {
            try {
              const { token, userId, level, user } = JSON.parse(authData);
              set({
                token,
                userId,
                level,
                user: user || null,
                isInitialized: true,
              });
            } catch (error) {
              console.error('Error parsing auth data:', error);
              set({ isInitialized: true });
            }
          } else {
            set({ isInitialized: true });
          }
        }
      },

      setAuth: (token, userId, level, user) => {
        set({
          token,
          userId,
          level,
          user: user || null,
        });
      },

      clearAuth: () => {
        set({
          token: null,
          userId: null,
          level: null,
          user: null,
        });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        token: state.token,
        userId: state.userId,
        level: state.level,
        user: state.user,
      }),
    }
  )
);
