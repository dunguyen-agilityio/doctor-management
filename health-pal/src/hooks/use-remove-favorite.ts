import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useToastController } from '@tamagui/toast'

import { useSession } from '@app/contexts'
import { removeFavorite } from '@app/services/favorite'
import { FAVORITE_TYPES } from '@app/types/favorite'

export const useRemoveFavorite = (type: FAVORITE_TYPES, itemName: string) => {
  const queryClient = useQueryClient()
  const { session } = useSession()
  const toast = useToastController()

  const { jwt, user } = session ?? {}

  const handleMutation = (favoriteId: string) => {
    if (!jwt || !user) {
      throw new Error('User session is not available')
    }
    return removeFavorite(favoriteId, jwt)
  }

  return useMutation({
    mutationFn: handleMutation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites', type, user!.id] })
      toast.show('Removed from Favorites', {
        message: `${itemName} has been removed from your favorites.`,
        duration: 3000,
        type: 'success',
      })
    },
    onError: () => {
      toast.show('Action Failed', {
        message: 'Failed to remove favorite. Please try again.',
        type: 'error',
        duration: 3000,
      })
    },
  })
}
