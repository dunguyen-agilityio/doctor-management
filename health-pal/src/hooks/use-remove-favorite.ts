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

  return useMutation({
    mutationFn: (favoriteId: string) => removeFavorite(favoriteId, jwt!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites', type, user!.id] })
      toast.show('Removed from Favorites', {
        message: `${itemName} has been removed from your favorites.`,
        backgroundColor: '$yellow3',
        color: '$yellow10',
        duration: 3000,
        native: true,
      })
    },
    onError: () => {
      toast.show('Action Failed', {
        message: 'Failed to remove favorite. Please try again.',
        native: true,
        demo: true,
        color: '$red10',
        backgroundColor: '$red3',
      })
    },
  })
}
