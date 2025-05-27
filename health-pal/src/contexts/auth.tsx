import { type PropsWithChildren, createContext, use } from 'react'

import { useStorageState } from '@app/hooks/use-storage-state'
import { Session, User } from '@app/models/user'

const AuthContext = createContext<{
  signIn: (user: Session) => void
  signOut: () => void
  session?: Session | null
  isLoading: boolean
  setUser: (user: User) => void
}>({
  signIn: () => null,
  signOut: () => null,
  setUser: () => null,
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
        signIn: setSession,
        signOut: () => setSession(null),
        setUser: (user) => {
          setSession({ jwt: session?.jwt, user } as Session)
        },
        session,
        isLoading,
      }}>
      {children}
    </AuthContext>
  )
}
