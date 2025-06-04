import { act, renderHook, waitFor } from '@utils-test'

import { addFavorite } from '@app/services/favorite'

import { FAVORITE_TYPES } from '@app/types/favorite'

import { useAddFavorite } from '../use-add-favorite'

// Mocks
jest.mock('@app/services/favorite', () => ({
  addFavorite: jest.fn(),
}))

const mockShow = jest.fn()

jest.mock('@tamagui/toast', () => ({
  ...jest.requireActual('@tamagui/toast'),
  useToastController: () => ({
    show: mockShow,
  }),
}))

describe('useAddFavorite', () => {
  it('calls addFavorite and shows success toast', async () => {
    ;(addFavorite as jest.Mock).mockResolvedValueOnce({})

    const { result } = renderHook(() => useAddFavorite(FAVORITE_TYPES.DOCTOR, 'Doctor'))

    act(() => {
      result.current.mutate(42)
    })

    await waitFor(() => {
      expect(addFavorite).toHaveBeenCalledWith(
        { itemId: 42, type: FAVORITE_TYPES.DOCTOR },
        123,
        'test-token',
      )
      expect(mockShow).toHaveBeenCalledWith('Added to Favorites', {
        message: 'Doctor has been added to your favorites.',
        duration: 3000,
        type: 'success',
      })
    })
  })

  it('shows error toast when mutation fails', async () => {
    ;(addFavorite as jest.Mock).mockRejectedValueOnce(new Error('Failed'))

    const { result } = renderHook(() => useAddFavorite(FAVORITE_TYPES.HOSPITAL, 'Hospital'))

    act(() => {
      result.current.mutate(99)
    })

    await waitFor(() => {
      expect(mockShow).toHaveBeenCalledWith('Action Failed', {
        message: 'Failed to remove favorite. Please try again.',
        duration: 3000,
        type: 'error',
      })
    })
  })
})
