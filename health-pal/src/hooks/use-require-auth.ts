import { useEffect } from 'react'

import { router } from 'expo-router'

import { Session } from '@app/models/user'
import { useAuthStore } from '@app/stores/auth'

export function useRequireAuth(redirectTo = '/login') {
  const { session, isLoading, signIn, signOut, setUser } = useAuthStore()

  useEffect(() => {
    if (!isLoading && !session?.jwt) {
      router.replace('/(auth)/login')
    }
  }, [session, isLoading, redirectTo])

  return { session: session as Session, isLoading, signIn, signOut, setUser }
}
