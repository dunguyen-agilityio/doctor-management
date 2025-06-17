import { MOCK_USER } from '@/mocks/user'
import { Session } from '@/models/user'
import { useAuthStore } from '@/stores/auth'
import { setStorageItemAsync } from '@/utils/storage'
import { act } from '@utils-test'

jest.mock('@/utils/storage', () => ({
  setStorageItemAsync: jest.fn(),
}))

describe('useAuthStore', () => {
  const session: Session = {
    jwt: 'fake-jwt-token',
    user: {
      ...MOCK_USER,
      id: 1,
      email: 'test@example.com',
      name: 'Test User',
    },
  }

  beforeEach(() => {
    useAuthStore.setState({ user: null, isAuthenticated: false })
    jest.clearAllMocks()
  })

  it('should sign in and set session correctly', () => {
    act(() => {
      useAuthStore.getState().signIn(session)
    })

    const { user, isAuthenticated } = useAuthStore.getState()

    expect(user).toEqual(session.user)
    expect(isAuthenticated).toBe(true)
    expect(setStorageItemAsync).toHaveBeenCalledWith('session', 'fake-jwt-token')
  })

  it('should sign out and clear session', () => {
    useAuthStore.setState({ user: session.user, isAuthenticated: true })

    act(() => {
      useAuthStore.getState().signOut()
    })

    const { user, isAuthenticated } = useAuthStore.getState()

    expect(user).toBeNull()
    expect(isAuthenticated).toBe(false)
    expect(setStorageItemAsync).toHaveBeenCalledWith('session', null)
  })

  it('should update user with setUser', () => {
    useAuthStore.setState({ user: session.user })

    act(() => {
      useAuthStore.getState().setUser({ name: 'Updated Name' })
    })

    expect(useAuthStore.getState().user?.name).toBe('Updated Name')
    expect(useAuthStore.getState().user?.email).toBe('test@example.com')
  })

  it('should update isAuthenticated with setIsAuthenticated', () => {
    act(() => {
      useAuthStore.getState().setIsAuthenticated(true)
    })

    expect(useAuthStore.getState().isAuthenticated).toBe(true)
  })
})
