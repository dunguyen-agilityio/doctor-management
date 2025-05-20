import React from 'react'

import { ButtonProps } from 'tamagui'

import { Button } from '@theme'

import HeartFill from '@icons/heart-fill'
import HeartOutline from '@icons/heart-outline'

import { useSession } from '@app/contexts'
import { QUERY_KEY, queryClient } from '@app/react-query.config'
import { addFavorite, deleteFavorite } from '@app/services/favorite'
import { FAVORITE_TYPES } from '@app/types/favorite'

import { tokens } from '@/tamagui.config'

const VARIANT_STYLE = {
  primary: {
    backgroundColor: 'rgba(31, 42, 55, 0.20)',
    padding: 6,
    pressStyle: {
      backgroundColor: 'rgba(31, 42, 55, 0.20)',
    },
  },
  secondary: {
    backgroundColor: 'transparent',
  },
} satisfies Record<string, ButtonProps>

interface FavoriteButtonProps {
  variant?: keyof typeof VARIANT_STYLE
  color?: string
  favoriteId?: string
  type: FAVORITE_TYPES
  data: string
}

const FavoriteButton = ({
  favoriteId,
  variant = 'primary',
  color = tokens.color.primary.val,
  type,
  data,
}: FavoriteButtonProps) => {
  const { session } = useSession()
  const renderIcon = () => {
    if (favoriteId) return <HeartFill fill={color} width={15} height={15} />

    return <HeartOutline stroke={color} width={15} height={15} />
  }

  const { jwt, user } = session ?? {}
  const userId = user?.id

  const { CLINIC_FAVORITE, DOCTOR_FAVORITE } = QUERY_KEY
  const queryKey = type === FAVORITE_TYPES.DOCTOR ? DOCTOR_FAVORITE : CLINIC_FAVORITE

  const handleRemove = async () => {
    if (!favoriteId || !jwt) return

    try {
      await deleteFavorite(favoriteId, jwt)

      await queryClient.invalidateQueries({ queryKey })
    } catch (error) {
      console.log('error', error)
    }
  }

  const handleAdd = async () => {
    if (!jwt || !userId) return

    try {
      await addFavorite(type, data, jwt, userId)
      await queryClient.invalidateQueries({ queryKey })
    } catch (error) {
      console.log('error', error)
    }
  }

  return (
    <Button
      {...VARIANT_STYLE[variant]}
      onPress={favoriteId ? handleRemove : handleAdd}
      position="absolute"
      right={6}
      top={6}
      zIndex={1000}
      width={15}
      height={15}
      variant="icon">
      {renderIcon()}
    </Button>
  )
}

export default FavoriteButton
