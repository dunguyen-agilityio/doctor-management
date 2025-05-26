import { act, renderHook, waitFor } from '@utils-test'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { addFavorite } from '@app/services/favorite'
import { FAVORITE_TYPES } from '@app/types/favorite'

import { useAddFavorite } from '../use-add-favorite'

// Mocks
jest.mock('@app/services/favorite', () => ({
  addFavorite: jest.fn(),
}))

jest.mock('@app/contexts', () => ({
  useSession: () => ({
    session: {
      jwt: 'test-token',
      user: { id: 123 },
    },
  }),
}))

const mockShow = jest.fn()

jest.mock('@tamagui/toast', () => ({
  useToastController: () => ({
    show: mockShow,
  }),
}))

describe('useAddFavorite', () => {
  const queryClient = new QueryClient()

  const wrapper = ({ children }: any) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('calls addFavorite and shows success toast', async () => {
    ;(addFavorite as jest.Mock).mockResolvedValueOnce({})

    const { result } = renderHook(() => useAddFavorite(FAVORITE_TYPES.DOCTOR, 'Doctor'), {
      wrapper,
    })

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

    const { result } = renderHook(() => useAddFavorite(FAVORITE_TYPES.HOSPITAL, 'Hospital'), {
      wrapper,
    })

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
