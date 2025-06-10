import { create } from 'zustand'

import { Session, User } from '@app/models/user'
import { setStorageItemAsync } from '@app/utils/storage'

type AuthState = {
  user: Session['user'] | null
  isAuthenticated?: boolean
  signIn: (session: Session) => void
  signOut: () => void
  setUser: (user: Partial<Session['user']>) => void
  setIsAuthenticated: (isAuthenticated: boolean) => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,

  isAuthenticated: false,
  signIn: ({ jwt, user }: Session) => {
    set({ user, isAuthenticated: true })
    setStorageItemAsync('session', jwt)
  },
  signOut: () => {
    set({ user: null, isAuthenticated: false })
    setStorageItemAsync('session', null)
  },
  setUser: (user: Partial<User>) =>
    set((prev) => ({
      user: {
        ...prev.user,
        ...user,
      } as Session['user'],
    })),
  setIsAuthenticated: (isAuthenticated: boolean) =>
    set({
      isAuthenticated,
    }),
}))
