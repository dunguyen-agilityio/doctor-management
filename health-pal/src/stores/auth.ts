import { create } from 'zustand'

import { getItemAsync } from 'expo-secure-store'

import { Session, User } from '@app/models/user'
import { setStorageItemAsync } from '@app/utils/storage'

type AuthState = {
  session: Session | null
  isLoading: boolean
  signIn: (session: Session) => void
  signOut: () => void
  setUser: (user: User) => void
  hydrate: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
  session: null,
  isLoading: true,
  signIn: (session: Session) => {
    set({ session, isLoading: false })
    setStorageItemAsync('session', JSON.stringify(session))
  },
  signOut: () => {
    set({ session: null, isLoading: false })
    setStorageItemAsync('session', null)
  },
  setUser: (user: User) =>
    set((state) => {
      const newSession = { ...state.session, user } as Session
      setStorageItemAsync('session', newSession ? JSON.stringify(newSession) : null)
      return { session: newSession, isLoading: false }
    }),
  hydrate: async () => {
    try {
      const value = await getItemAsync('session')
      set({ session: value ? JSON.parse(value) : null, isLoading: false })
    } catch (error) {
      console.error('Failed to hydrate session from SecureStore:', error)
      set({ session: null, isLoading: false })
    }
  },
}))
