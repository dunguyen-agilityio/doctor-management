import { MOCK_USER } from '@/mocks/user'
import { useAuthStore } from '@/stores/auth'
import { renderHook } from '@utils-test'

import { router } from 'expo-router'

import { useRequireAuth } from '../use-require-auth'

// Mock router
jest.mock('expo-router', () => ({
  router: {
    replace: jest.fn(),
  },
}))

// Mock Zustand store
jest.mock('@/stores/auth', () => ({
  useAuthStore: jest.fn(),
}))

describe('useRequireAuth', () => {
  const mockReplace = router.replace as jest.Mock
  const mockSetUser = jest.fn()
  const mockSignIn = jest.fn()
  const mockSignOut = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should redirect to login if not authenticated', () => {
    ;(useAuthStore as unknown as jest.Mock).mockReturnValue({
      user: null,
      isAuthenticated: false,
      signIn: mockSignIn,
      signOut: mockSignOut,
      setUser: mockSetUser,
    })

    renderHook(() => useRequireAuth())

    expect(mockReplace).toHaveBeenCalledWith('/(auth)/login')
  })

  it('should not redirect if user is authenticated', () => {
    ;(useAuthStore as unknown as jest.Mock).mockReturnValue({
      user: MOCK_USER,
      isAuthenticated: true,
      signIn: mockSignIn,
      signOut: mockSignOut,
      setUser: mockSetUser,
    })

    renderHook(() => useRequireAuth())

    expect(mockReplace).not.toHaveBeenCalled()
  })

  it('should return session and auth functions', () => {
    ;(useAuthStore as unknown as jest.Mock).mockReturnValue({
      user: MOCK_USER,
      isAuthenticated: true,
      signIn: mockSignIn,
      signOut: mockSignOut,
      setUser: mockSetUser,
    })

    const { result } = renderHook(() => useRequireAuth())

    expect(result.current.session).toEqual({ user: MOCK_USER, isAuthenticated: true })
    expect(result.current.signIn).toBe(mockSignIn)
    expect(result.current.signOut).toBe(mockSignOut)
    expect(result.current.setUser).toBe(mockSetUser)
  })
})
