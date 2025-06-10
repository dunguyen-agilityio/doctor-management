import { useAuthStore } from '@app/stores/auth'

export const useSession = () => {
  const { user, isAuthenticated, signIn, signOut, setUser } = useAuthStore()

  return { session: { user, isAuthenticated }, signIn, signOut, setUser }
}
