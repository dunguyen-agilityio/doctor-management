import { useMutation } from '@tanstack/react-query'

import { useToastController } from '@tamagui/toast'

import { removeFavorite } from '@app/services/favorite'

import { FAVORITE_TYPES } from '@app/types/favorite'

import { queryClient } from '@app/react-query.config'

import { useRequireAuth } from './use-require-auth'

export const useRemoveFavorite = (type: FAVORITE_TYPES, itemName: string) => {
  const { session } = useRequireAuth()
  const { id: userId } = session.user
  const toast = useToastController()

  const handleMutation = (favoriteId: string) => {
    return removeFavorite(favoriteId)
  }

  return useMutation({
    mutationFn: handleMutation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites', type, userId] })
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
