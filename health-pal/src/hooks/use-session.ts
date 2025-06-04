import { useAuthStore } from '@app/stores/auth'

export function useSession() {
  const { session, isLoading, signIn, signOut, setUser } = useAuthStore()

  return { session, isLoading, signIn, signOut, setUser }
}
