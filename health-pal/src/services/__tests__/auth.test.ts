import { getProfile, login, register, updateProfile } from '../auth'
import { apiClient } from '../http-client'

jest.mock('../http-client', () => ({
  apiClient: {
    post: jest.fn(),
    get: jest.fn(),
    put: jest.fn(),
  },
}))

describe('auth services', () => {
  const mockJwt = 'mock.jwt.token'
  const mockUser = { id: 1, name: 'John Doe', nickname: 'jdoe', email: 'john@example.com' }

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('login', () => {
    it('should return session data on success', async () => {
      ;(apiClient.post as jest.Mock).mockResolvedValueOnce({ jwt: mockJwt })
      ;(apiClient.get as jest.Mock).mockResolvedValueOnce(mockUser)

      const result = await login({ email: 'john@example.com', password: 'password' })

      expect(result.data).toEqual({ jwt: mockJwt, user: mockUser })
      expect(result.error).toBeNull()
    })

    it('should return error on failure', async () => {
      ;(apiClient.post as jest.Mock).mockRejectedValueOnce(new Error('Invalid credentials'))

      const result = await login({ email: 'john@example.com', password: 'wrongpass' })

      expect(result.data).toBeNull()
      expect(result.error).toEqual(new Error('Invalid credentials'))
    })
  })

  describe('getProfile', () => {
    it('should return profile when jwt is provided', async () => {
      ;(apiClient.get as jest.Mock).mockResolvedValueOnce(mockUser)

      const result = await getProfile(mockJwt)

      expect(result).toEqual(mockUser)
    })

    it('should return null when no jwt', async () => {
      const result = await getProfile()
      expect(result).toBeNull()
    })
  })

  describe('register', () => {
    it('should return session data on success', async () => {
      const response = { jwt: mockJwt, user: mockUser }
      ;(apiClient.post as jest.Mock).mockResolvedValueOnce(response)

      const result = await register({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password',
        nickname: 'jdoe',
        dateOfBirth: new Date('1990-01-01'),
        gender: 'Male',
        avatar: 1,
        id: 1,
      })

      expect(result.data).toEqual(response)
      expect(result.error).toBeNull()
    })

    it('should return error on failure', async () => {
      ;(apiClient.post as jest.Mock).mockRejectedValueOnce(new Error('Email already exists'))

      const result = await register({
        name: 'Jane Doe',
        email: 'jane@example.com',
        password: 'password',
        nickname: 'jane',
        dateOfBirth: new Date('1990-01-01'),
        gender: 'Female',
        avatar: 2,
        id: 2,
      })

      expect(result.data).toBeNull()
      expect(result.error).toEqual({ message: 'Email already exists' })
    })
  })

  describe('updateProfile', () => {
    it('should return updated user profile on success', async () => {
      ;(apiClient.put as jest.Mock).mockResolvedValueOnce({})
      ;(apiClient.get as jest.Mock).mockResolvedValueOnce(mockUser)

      const result = await updateProfile(
        {
          id: 1,
          name: 'John Doe',
          nickname: 'jdoe',
          dateOfBirth: new Date('1990-01-01'),
          gender: 'Male',
          avatar: 1,
          email: 'john@example.com',
          password: 'password',
        },
        mockJwt,
      )

      expect(result.data).toEqual(mockUser)
      expect(result.error).toBeNull()
    })

    it('should return error on failure', async () => {
      ;(apiClient.put as jest.Mock).mockRejectedValueOnce(new Error('Unauthorized'))

      const result = await updateProfile({ id: 1, nickname: 'jdoe' }, mockJwt)

      expect(result.data).toBeNull()
      expect(result.error).toEqual(new Error('Unauthorized'))
    })
  })
})
