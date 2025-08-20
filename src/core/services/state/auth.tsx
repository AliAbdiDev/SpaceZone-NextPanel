'use client';

import { AuthResponse } from '@/core/assets/types/auth';
import React, { createContext, useContext, ReactNode } from 'react';
import { create } from 'zustand';

type Token = string | null;
interface AuthState {
  token: Token;
  userData: AuthResponse;
  setToken: (newToken: Token) => void;
  clearToken: () => void;
}

const createAuthStore = (initialToken: Token, userData: AuthResponse) =>
  create<AuthState>((set) => ({
    token: initialToken,
    userData,
    setToken: (newToken) => set({ token: newToken }),
    clearToken: () => set({ token: null }),
  }));

// Create a React context to hold the store
const AuthStoreContext = createContext<ReturnType<typeof createAuthStore> | null>(null);

// Provider component to initialize and provide the store
export function AuthProvider({
  initialToken,
  userData,
  children,
}: {
  initialToken: string | null;
  userData: string;
  children: ReactNode;
}) {
  const checkedUserData = JSON.parse(userData || '{}');

  const store = createAuthStore(initialToken, checkedUserData);
  return <AuthStoreContext.Provider value={store}>{children}</AuthStoreContext.Provider>;
}

// Custom hook to access state from the provided store
export function useAuthStore(selector: (state: AuthState) => AuthState): AuthState {
  const store = useContext(AuthStoreContext);
  if (!store) {
    throw new Error('useAuthStore must be used within an AuthProvider');
  }
  return store(selector);
}
