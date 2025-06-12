import { User } from '@/models/user'
import { useAuthStore } from '@/stores/auth'

import { useEffect } from 'react'

import { router } from 'expo-router'

export const useRequireAuth = (redirectTo = '/login') => {
  const { user, isAuthenticated, signIn, signOut, setUser } = useAuthStore()

  useEffect(() => {
    if (!isAuthenticated || !user) {
      router.replace('/(auth)/login')
    }
  }, [isAuthenticated, redirectTo, user])

  return { session: { user: user as User, isAuthenticated }, signIn, signOut, setUser }
}
