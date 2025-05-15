import { useStorageState } from '@app/hooks/useStorageState'
import { AuthUser } from '@app/models/user'

import { type PropsWithChildren, createContext, use } from 'react'

const AuthContext = createContext<{
  signIn: (user: AuthUser) => void
  signOut: () => void
  session?: AuthUser | null
  isLoading: boolean
}>({
  signIn: () => null,
  signOut: () => null,
  session: null,
  isLoading: false,
})

// This hook can be used to access the user info.
export function useSession() {
  const value = use(AuthContext)
  if (!value) {
    throw new Error('useSession must be wrapped in a <SessionProvider />')
  }

  return value
}

export function SessionProvider({ children }: Readonly<PropsWithChildren>) {
  const [[isLoading, session], setSession] = useStorageState('session')

  return (
    <AuthContext
      value={{
        signIn: (user) => {
          // Perform sign-in logic here
          setSession(user)
        },
        signOut: () => {
          setSession(null)
        },
        session,
        isLoading,
      }}>
      {children}
    </AuthContext>
  )
}
