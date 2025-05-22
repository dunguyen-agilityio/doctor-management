import React from 'react'

import { useToastController } from '@tamagui/toast'

import { Button, ButtonProps } from '@theme'

import HeartFill from '@icons/heart-fill'
import HeartOutline from '@icons/heart-outline'

import { useSession } from '@app/contexts'
import { QUERY_KEY, queryClient } from '@app/react-query.config'
import {
  addClinicFavorite,
  addDoctorFavorite,
  deleteClinicFavorite,
  deleteDoctorFavorite,
} from '@app/services/favorite'
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

type DoctorFavoriteButton = {
  type: FAVORITE_TYPES.DOCTOR
  doctorId: number
  doctorName: string
}

type ClinicFavoriteButton = {
  type: FAVORITE_TYPES.HOSPITAL
  clinicId: number
  clinicName: string
}

type TFavoriteButton = DoctorFavoriteButton | ClinicFavoriteButton

type FavoriteButtonProps = ButtonProps &
  TFavoriteButton & {
    variant?: keyof typeof VARIANT_STYLE
    color?: string
    favoriteId?: string
    size?: number
  }

const { CLINIC_FAVORITE, DOCTOR_FAVORITE } = QUERY_KEY

const FavoriteButton = ({
  favoriteId,
  variant = 'primary',
  color = tokens.color.primary.val,
  size = 15,
  ...props
}: FavoriteButtonProps) => {
  const { session } = useSession()
  const toast = useToastController()

  const renderIcon = () => {
    if (favoriteId) return <HeartFill fill={color} width={size} height={size} />

    return <HeartOutline stroke={color} width={size} height={size} />
  }

  const { jwt, user } = session ?? {}
  const userId = user?.id

  const isDoctor = props.type === FAVORITE_TYPES.DOCTOR
  const dataId = isDoctor ? props.doctorId : props.clinicId
  const dataName = isDoctor ? props.doctorName : props.clinicName
  const queryKey = isDoctor ? DOCTOR_FAVORITE : CLINIC_FAVORITE

  const handleRemove = async () => {
    if (!favoriteId || !jwt) return

    try {
      const deleteFavorite = isDoctor ? deleteDoctorFavorite : deleteClinicFavorite

      await deleteFavorite(favoriteId, jwt)
      toast.show('Removed from Favorites', {
        message: `${dataName} has been removed from your favorites.`,
        backgroundColor: '$yellow3',
        color: '$yellow10',
        duration: 3000,
        native: true,
      })

      await queryClient.invalidateQueries({ queryKey })
    } catch (error) {
      console.log('error', error)

      toast.show('Action Failed', {
        message: 'Failed to remove favorite. Please try again.',
        native: true,
        demo: true,
        color: '$red10',
        backgroundColor: '$red3',
      })
    }
  }

  const handleAdd = async () => {
    if (!jwt || !userId) return

    try {
      const addFavorite = isDoctor ? addDoctorFavorite : addClinicFavorite

      await addFavorite(dataId, userId, jwt)
      await queryClient.invalidateQueries({ queryKey })
      toast.show('Added to Favorites', {
        message: `${dataName} has been added to your favorites.`,
        backgroundColor: '$green3',
        color: '$green10',
        duration: 3000,
        native: true,
      })
    } catch (error) {
      console.log('error', error)
      toast.show('Action Failed', {
        message: 'Failed to remove favorite. Please try again.',
        native: true,
        demo: true,
        color: '$red10',
        backgroundColor: '$red3',
      })
    }
  }

  return (
    <Button
      {...VARIANT_STYLE[variant]}
      onPress={favoriteId ? handleRemove : handleAdd}
      width={size}
      height={size}
      variant="icon"
      {...props}>
      {renderIcon()}
    </Button>
  )
}

export default FavoriteButton
