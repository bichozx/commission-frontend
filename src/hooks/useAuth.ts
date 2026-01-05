'use client';

import { useAuthStore } from '@/context/stores/authStore';
import { useEffect } from 'react';

export function useAuth() {
  const { token, userId, level, login, logout, initializeAuth } =
    useAuthStore();

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  useEffect(() => {
    if (token && userId && level !== null) {
      localStorage.setItem('auth', JSON.stringify({ token, userId, level }));
    } else {
      localStorage.removeItem('auth');
    }
  }, [token, userId, level]);

  return {
    token,
    userId,
    level,
    login,
    logout,
    isAuthenticated: !!token && !!userId,
  };
}
