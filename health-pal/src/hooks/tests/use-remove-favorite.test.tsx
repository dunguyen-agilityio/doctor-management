import { act, renderHook, waitFor } from '@utils-test'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useToastController } from '@tamagui/toast'

import { useSession } from '@app/contexts'
import { removeFavorite } from '@app/services/favorite'
import { FAVORITE_TYPES } from '@app/types/favorite'

import { useRemoveFavorite } from '../use-remove-favorite'

jest.mock('@tanstack/react-query', () => ({
  useMutation: jest.fn(),
  useQueryClient: jest.fn(),
}))

jest.mock('@tamagui/toast', () => ({
  ...jest.requireActual('@tamagui/toast'),
  useToastController: jest.fn(),
}))

jest.mock('@app/contexts', () => ({
  ...jest.requireActual('@app/contexts'),
  useSession: jest.fn(),
}))

jest.mock('@app/services/favorite', () => ({
  removeFavorite: jest.fn(),
}))

describe('useRemoveFavorite', () => {
  const mockJwt = 'abc123'
  const mockUser = { id: 'user1', name: 'John Doe', email: 'john@example.com' }
  const mockSession = { jwt: mockJwt, user: mockUser }
  const mockType = FAVORITE_TYPES.DOCTOR
  const mockItemName = 'Dr. Smith'
  const mockFavoriteId = 'fav1'
  const mockToastShow = jest.fn()
  const mockInvalidateQueries = jest.fn()
  const mockMutate = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useSession as jest.Mock).mockReturnValue({ session: mockSession })
    ;(useToastController as jest.Mock).mockReturnValue({ show: mockToastShow })
    ;(useQueryClient as jest.Mock).mockReturnValue({ invalidateQueries: mockInvalidateQueries })
    ;(useMutation as jest.Mock).mockReturnValue({ mutate: mockMutate })
    ;(removeFavorite as jest.Mock).mockResolvedValue(undefined)
  })

  it('returns mutation object from useMutation', () => {
    const { result } = renderHook(() => useRemoveFavorite(mockType, mockItemName))

    expect(useMutation).toHaveBeenCalledWith({
      mutationFn: expect.any(Function),
      onSuccess: expect.any(Function),
      onError: expect.any(Function),
    })
    expect(result.current.mutate).toBe(mockMutate)
  })

  it('calls removeFavorite with correct arguments when mutate is called', async () => {
    let mutationFn: (id: string) => Promise<void>
    ;(useMutation as jest.Mock).mockImplementation(({ mutationFn: fn }) => {
      mutationFn = fn
      return { mutate: mockMutate }
    })

    renderHook(() => useRemoveFavorite(mockType, mockItemName))

    await act(async () => {
      await mutationFn!(mockFavoriteId)
    })

    expect(removeFavorite).toHaveBeenCalledWith(mockFavoriteId, mockJwt)
  })

  it('invalidates queries and shows success toast on success', async () => {
    let onSuccess: () => void
    ;(useMutation as jest.Mock).mockImplementation(({ onSuccess: success }) => {
      onSuccess = success
      return { mutate: mockMutate }
    })

    const { result } = renderHook(() => useRemoveFavorite(mockType, mockItemName))

    act(() => {
      result.current.mutate(mockFavoriteId)
    })

    await waitFor(() => {
      onSuccess!()
      expect(mockInvalidateQueries).toHaveBeenCalledWith({
        queryKey: ['favorites', mockType, mockUser.id],
      })
      expect(mockToastShow).toHaveBeenCalledWith('Removed from Favorites', {
        message: `${mockItemName} has been removed from your favorites.`,
        duration: 3000,
        type: 'success',
      })
    })
  })

  it('shows error toast on error', async () => {
    const error = new Error('Failed to remove')
    let onError: (err: Error) => void
    ;(useMutation as jest.Mock).mockImplementation(({ onError: err }) => {
      onError = err
      return { mutate: mockMutate }
    })
    ;(removeFavorite as jest.Mock).mockRejectedValue(error)

    const { result } = renderHook(() => useRemoveFavorite(mockType, mockItemName))

    act(() => {
      result.current.mutate(mockFavoriteId)
    })

    await waitFor(() => {
      onError!(error)
      expect(mockToastShow).toHaveBeenCalledWith('Action Failed', {
        message: 'Failed to remove favorite. Please try again.',
        type: 'error',
        duration: 3000,
      })
      expect(mockInvalidateQueries).not.toHaveBeenCalled()
    })
  })

  it('handles null session gracefully', () => {
    ;(useSession as jest.Mock).mockReturnValue({ session: null })

    const { result } = renderHook(() => useRemoveFavorite(mockType, mockItemName))

    expect(useMutation).toHaveBeenCalledWith({
      mutationFn: expect.any(Function),
      onSuccess: expect.any(Function),
      onError: expect.any(Function),
    })

    act(() => {
      result.current.mutate(mockFavoriteId)
    })

    expect(removeFavorite).not.toHaveBeenCalled()
  })
})
