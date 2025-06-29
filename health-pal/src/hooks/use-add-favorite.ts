import { useMutation } from '@tanstack/react-query'

import { useToastController } from '@tamagui/toast'

import { addFavorite } from '@/services/favorite'

import { FAVORITE_TYPES } from '@/types/favorite'

import { queryClient } from '@react-query.config'

import { useRequireAuth } from './use-require-auth'

export const useAddFavorite = (type: FAVORITE_TYPES, itemName: string) => {
  const { session } = useRequireAuth()
  const { id: userId } = session.user
  const toast = useToastController()

  const handleMutation = (itemId: number) => {
    return addFavorite({ itemId, type }, userId)
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
