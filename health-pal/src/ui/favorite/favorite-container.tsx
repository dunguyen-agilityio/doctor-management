import { Stack } from 'tamagui'

import { useAddFavorite } from '@app/hooks/use-add-favorite'
import { useRemoveFavorite } from '@app/hooks/use-remove-favorite'
import { FAVORITE_TYPES } from '@app/types/favorite'

import { tokens } from '@/tamagui.config'

import FavoriteButton from './favorite-button'

interface FavoriteContainerProps {
  favoriteId?: string
  type: FAVORITE_TYPES
  itemId: number
  itemDocId: string
  itemName: string
}

const COLORS = {
  [FAVORITE_TYPES.DOCTOR]: tokens.color.primary.val,
  [FAVORITE_TYPES.HOSPITAL]: tokens.color.white.val,
}

const FavoriteContainer = ({
  children,
  ...props
}: React.PropsWithChildren<FavoriteContainerProps>) => {
  const { favoriteId, type, itemId, itemName } = props

  const { mutate: removeFavorite, isPending: removeFavPending } = useRemoveFavorite(type, itemName)

  const { mutate: addFavorite, isPending: addFavPending } = useAddFavorite(type, itemName)

  const handleFavorite = () => {
    if (favoriteId) {
      removeFavorite(favoriteId)
      return
    }

    addFavorite(itemId)
  }

  const disabled = !!removeFavPending || !!addFavPending

  return (
    <Stack position="relative">
      <Stack
        position="absolute"
        borderRadius={12}
        inset={0}
        opacity={disabled ? 0.85 : 1}
        backgroundColor="$shadow1"
        zIndex={disabled ? 1000 : 0}
      />
      <FavoriteButton
        color={COLORS[type]}
        position="absolute"
        top={6}
        right={6}
        zIndex={100}
        onPress={handleFavorite}
        {...props}
      />
      {children}
    </Stack>
  )
}

export default FavoriteContainer
