import { Button, ButtonProps } from '@theme'

import HeartFill from '@icons/heart-fill'
import HeartOutline from '@icons/heart-outline'

import { FAVORITE_TYPES } from '@app/types/favorite'

import { tokens } from '@/tamagui.config'

const VARIANT_STYLE = {
  [FAVORITE_TYPES.HOSPITAL]: {
    backgroundColor: 'rgba(31, 42, 55, 0.20)',
    padding: 6,
    pressStyle: {
      backgroundColor: 'rgba(31, 42, 55, 0.20)',
    },
  },
  [FAVORITE_TYPES.DOCTOR]: {
    backgroundColor: 'transparent',
  },
} satisfies Record<string, ButtonProps>

const COLOR = {
  [FAVORITE_TYPES.DOCTOR]: tokens.color.primary.val,
  [FAVORITE_TYPES.HOSPITAL]: tokens.color.white.val,
}

type FavoriteButtonProps = {
  color?: string
  size?: number
  type?: FAVORITE_TYPES
  itemId: number
  itemName: string
  favoriteId?: string
} & ButtonProps

const FavoriteButton = ({
  type = FAVORITE_TYPES.DOCTOR,
  color = COLOR[type],
  size = 15,
  itemId,
  itemName,
  favoriteId,
  ...props
}: FavoriteButtonProps) => {
  const renderIcon = () => {
    if (favoriteId) return <HeartFill fill={color} width={size} height={size} />

    return <HeartOutline stroke={color} width={size} height={size} />
  }

  return (
    <Button
      testID="favorite-button"
      {...VARIANT_STYLE[type]}
      width={size}
      height={size}
      variant="icon"
      zIndex={100}
      padding={0}
      {...props}>
      {renderIcon()}
    </Button>
  )
}

export default FavoriteButton
