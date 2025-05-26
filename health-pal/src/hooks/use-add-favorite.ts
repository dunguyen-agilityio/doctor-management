import { useMutation } from '@tanstack/react-query'

import { useToastController } from '@tamagui/toast'

import { useSession } from '@app/contexts'
import { queryClient } from '@app/react-query.config'
import { addFavorite } from '@app/services/favorite'
import { FAVORITE_TYPES } from '@app/types/favorite'

export const useAddFavorite = (type: FAVORITE_TYPES, itemName: string) => {
  const { session } = useSession()
  const toast = useToastController()

  const { jwt, user } = session ?? {}

  const handleMutation = (itemId: number) => {
    if (!jwt || !user) {
      throw new Error('User session is not available')
    }

    return addFavorite({ itemId, type }, user.id, jwt)
  }

  return useMutation({
    mutationFn: handleMutation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites', type, user!.id] })
      toast.show('Added to Favorites', {
        message: `${itemName} has been added to your favorites.`,
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
