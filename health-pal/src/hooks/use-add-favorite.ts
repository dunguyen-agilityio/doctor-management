import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useToastController } from '@tamagui/toast'

import { useSession } from '@app/contexts'
import { addFavorite } from '@app/services/favorite'
import { FAVORITE_TYPES } from '@app/types/favorite'

export const useAddFavorite = (type: FAVORITE_TYPES, itemName: string) => {
  const queryClient = useQueryClient()
  const { session } = useSession()
  const toast = useToastController()

  const { jwt, user } = session ?? {}

  return useMutation({
    mutationFn: (itemId: number) => addFavorite({ itemId, type }, user!.id, jwt!),
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
