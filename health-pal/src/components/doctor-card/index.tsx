import { memo } from 'react'

import { Image } from 'expo-image'
import { Link } from 'expo-router'

import { Separator, Stack } from 'tamagui'

import { Heading, Text, XStack, YStack } from '@theme'

import LocationOutline from '@icons/location-outline'

import useMediaQuery from '@app/hooks/use-media-query'
import { TDoctorCard } from '@app/models/doctor'
import { FAVORITE_TYPES, TFavorite } from '@app/types/favorite'
import FavoriteButton from '@app/ui/favorite/favorite-button'

import Stars from '../stars'

interface DoctorCardProps extends TDoctorCard, TFavorite {
  actionable?: boolean
}

const DoctorCard = ({
  avatar,
  name,
  specialty,
  address,
  reviewCounter = 0,
  rating = 0,
  documentId,
  favoriteId,
  actionable = true,
}: DoctorCardProps) => {
  const { width, height } = useMediaQuery({ h: 133, full: true })

  const renderContent = () => (
    <XStack
      padding={12}
      paddingRight={0}
      borderWidth={0.5}
      borderRadius={12}
      borderColor="$grey100"
      shadowColor="$black"
      shadowOffset={{ width: 4, height: 4 }}
      shadowOpacity={0.1}
      gap={12}
      shadowRadius={12}
      elevation={3}
      pointerEvents="none">
      <Image source={avatar} style={{ width: 110, height: 110, borderRadius: 12 }} />
      <YStack paddingRight={12} flex={1}>
        <XStack justifyContent="space-between" alignItems="center">
          <Heading>{name}</Heading>
        </XStack>
        <Separator marginVertical={8} />
        <YStack gap={actionable ? 0 : 8}>
          <Text size="small" fontWeight="600">
            {specialty}
          </Text>
          <XStack alignItems="center" gap="$sm" overflow="hidden">
            <LocationOutline />
            <Text size="small" width={200} numberOfLines={1}>
              {address}
            </Text>
          </XStack>
        </YStack>
        {actionable && (
          <XStack alignItems="center">
            <Stars color="#feb052" stars={rating} max={1} flexDirection="row-reverse" size={15} />
            <Separator vertical marginHorizontal={8} height={13} />
            <Text size="extraSmall">{`${reviewCounter} Reviews`}</Text>
          </XStack>
        )}
      </YStack>
    </XStack>
  )

  if (!actionable) return renderContent()

  return (
    <Stack position="relative">
      <FavoriteButton
        variant="secondary"
        data={documentId}
        {...(actionable && { position: 'absolute', zIndex: 100, top: 6, right: 6 })}
        type={FAVORITE_TYPES.DOCTOR}
        favoriteId={favoriteId}
      />
      <Link
        style={{ width, height }}
        href={{ pathname: '/doctors/details/[id]', params: { id: documentId } }}>
        {renderContent()}
      </Link>
    </Stack>
  )
}

export default memo(DoctorCard)
