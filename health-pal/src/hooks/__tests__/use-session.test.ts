// __tests__/use-session.test.ts
import { useAuthStore } from '@/stores/auth'
import { renderHook } from '@utils-test'

import { useSession } from '../use-session'

jest.mock('@/stores/auth')

describe('useSession', () => {
  const mockSignIn = jest.fn()
  const mockSignOut = jest.fn()
  const mockSetUser = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useAuthStore as unknown as jest.Mock).mockReturnValue({
      user: { id: 'user123', name: 'Alice' },
      isAuthenticated: true,
      signIn: mockSignIn,
      signOut: mockSignOut,
      setUser: mockSetUser,
    })
  })

  it('returns session data and actions from auth store', () => {
    const { result } = renderHook(() => useSession())

    expect(result.current.session.user).toEqual({ id: 'user123', name: 'Alice' })
    expect(result.current.session.isAuthenticated).toBe(true)
    expect(result.current.signIn).toBe(mockSignIn)
    expect(result.current.signOut).toBe(mockSignOut)
    expect(result.current.setUser).toBe(mockSetUser)
  })
})
