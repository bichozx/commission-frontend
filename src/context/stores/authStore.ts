import { AuthState } from '@/types/affiliate';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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
