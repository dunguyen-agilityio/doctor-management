import { useMutation } from '@tanstack/react-query'

import { useToastController } from '@tamagui/toast'

import { useRequireAuth } from '@app/contexts'
import { queryClient } from '@app/react-query.config'
import { addFavorite } from '@app/services/favorite'
import { FAVORITE_TYPES } from '@app/types/favorite'

export const useAddFavorite = (type: FAVORITE_TYPES, itemName: string) => {
  const { jwt, user } = useRequireAuth().session
  const { id: userId } = user
  const toast = useToastController()

  const handleMutation = (itemId: number) => {
    return addFavorite({ itemId, type }, userId, jwt)
  }

  return useMutation({
    mutationFn: handleMutation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites', type, userId] })
      toast.show('Added to Favorites', {
        message: `${itemName} has been added to your favorites.`,
        duration: 3000,
        type: 'success',
      })
    },
    onError: () => {
      toast.show('Action Failed', {
        message: 'Failed to add favorite. Please try again.',
        type: 'error',
        duration: 3000,
      })
    },
  })
}
