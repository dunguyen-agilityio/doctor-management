import { getItemAsync } from 'expo-secure-store'

import { FAVORITE_TYPES } from '@/types/favorite'

import { addFavorite, fetchFavoritesByType, removeFavorite } from '../favorite'
import { apiClient } from '../http-client'

jest.mock('../http-client', () => ({
  apiClient: {
    get: jest.fn(),
    post: jest.fn(),
    delete: jest.fn(),
  },
}))

jest.mock('expo-secure-store', () => ({
  ...jest.requireActual('expo-secure-store'),
  getItemAsync: jest.fn(),
}))

describe('Favorites API', () => {
  const jwt = 'mock_token'
  const userId = 1

  beforeEach(() => {
    ;(getItemAsync as jest.Mock).mockResolvedValueOnce(jwt)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  const mockDoctorFavorite = {
    id: 1,
    documentId: 'doc-1',
    type: FAVORITE_TYPES.DOCTOR,
    doctor: { name: 'Dr. Jane Doe' },
    hospital: null,
  }

  const mockHospitalFavorite = {
    id: 2,
    documentId: 'doc-2',
    type: FAVORITE_TYPES.HOSPITAL,
    doctor: null,
    hospital: { name: 'Sunrise Hospital' },
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('fetches doctor favorites', async () => {
    ;(apiClient.get as jest.Mock).mockResolvedValueOnce({ data: [mockDoctorFavorite] })

    const result = await fetchFavoritesByType(userId, FAVORITE_TYPES.DOCTOR)

    expect(apiClient.get).toHaveBeenCalled()
    expect(result).toEqual([mockDoctorFavorite])
  })

  it('fetches hospital favorites', async () => {
    ;(apiClient.get as jest.Mock).mockResolvedValueOnce({ data: [mockHospitalFavorite] })

    const result = await fetchFavoritesByType(userId, FAVORITE_TYPES.HOSPITAL)

    expect(apiClient.get).toHaveBeenCalled()
    expect(result).toEqual([mockHospitalFavorite])
  })

  it('adds a doctor to favorites', async () => {
    const mockResponse = { success: true }
    ;(apiClient.post as jest.Mock).mockResolvedValueOnce(mockResponse)

    const result = await addFavorite({ itemId: 42, type: FAVORITE_TYPES.DOCTOR }, userId, jwt)

    expect(apiClient.post).toHaveBeenCalledWith('favorites', {
      jwt,
      body: {
        data: {
          doctor: 42,
          users_permissions_user: userId,
          type: FAVORITE_TYPES.DOCTOR,
        },
      },
    })
    expect(result).toEqual(mockResponse)
  })

  it('removes a favorite', async () => {
    const mockResponse = { success: true }
    ;(apiClient.delete as jest.Mock).mockResolvedValueOnce(mockResponse)

    const result = await removeFavorite('123')

    expect(apiClient.delete).toHaveBeenCalledWith('favorites/123', { jwt })
    expect(result).toEqual(mockResponse)
  })
})
