import { useFavoritesStore } from '@/stores/favorite'
import { renderHook, waitFor } from '@utils-test'

import { fetchFavoritesByType } from '@/services/favorite'

import { FAVORITE_TYPES } from '@/types'

import { useFavoriteDoctors, useFavoriteHospitals } from '../use-favorite'
import { useRequireAuth } from '../use-require-auth'

jest.mock('../use-require-auth')
jest.mock('@/services/favorite')
jest.mock('@/stores/favorite')

const mockSetFavoriteDoctors = jest.fn()
const mockSetFavoriteHospitals = jest.fn()

describe('useFavoriteDoctors', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(useRequireAuth as jest.Mock).mockReturnValue({
      session: { user: { id: 'user123' }, isAuthenticated: true },
    })
    ;(useFavoritesStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector({
        setFavoriteDoctors: mockSetFavoriteDoctors,
      }),
    )
    ;(fetchFavoritesByType as jest.Mock).mockResolvedValue([
      {
        doctor: { id: 'doc1', name: 'Dr. John' },
        documentId: 'fav1',
      },
    ])
  })

  it('fetches and sets favorite doctors correctly', async () => {
    const { result } = renderHook(() => useFavoriteDoctors())

    await waitFor(() => expect(result.current.data).toBeDefined())

    expect(fetchFavoritesByType).toHaveBeenCalledWith('user123', FAVORITE_TYPES.DOCTOR)
    expect(mockSetFavoriteDoctors).toHaveBeenCalledWith({ doc1: 'fav1' })
    expect(result.current.data).toEqual([
      {
        id: 'doc1',
        name: 'Dr. John',
        favoriteId: 'fav1',
      },
    ])
  })
})

describe('useFavoriteHospitals', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(useRequireAuth as jest.Mock).mockReturnValue({
      session: { user: { id: 'user123' }, isAuthenticated: true },
    })
    ;(useFavoritesStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector({
        setFavoriteHospitals: mockSetFavoriteHospitals,
      }),
    )
    ;(fetchFavoritesByType as jest.Mock).mockResolvedValue([
      {
        hospital: { id: 'hosp1', name: 'Hospital A' },
        documentId: 'fav2',
      },
    ])
  })

  it('fetches and sets favorite hospitals correctly', async () => {
    const { result } = renderHook(() => useFavoriteHospitals())

    await waitFor(() => expect(result.current.data).toBeDefined())

    expect(fetchFavoritesByType).toHaveBeenCalledWith('user123', FAVORITE_TYPES.HOSPITAL)
    expect(mockSetFavoriteHospitals).toHaveBeenCalledWith({ hosp1: 'fav2' })
    expect(result.current.data).toEqual([
      {
        id: 'hosp1',
        name: 'Hospital A',
        favoriteId: 'fav2',
      },
    ])
  })
})
