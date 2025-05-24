import { memo } from 'react'

import { Image } from 'expo-image'
import { Link } from 'expo-router'

import { Card, Separator, Stack, YStack } from 'tamagui'

import { Heading, Text, XStack } from '@theme'

import LocationOutline from '@icons/location-outline'

import useMediaQuery from '@app/hooks/use-media-query'
import { TDoctorCard } from '@app/models/doctor'
import { useFavoritesStore } from '@app/stores/favorite'
import { FAVORITE_TYPES } from '@app/types/favorite'
import FavoriteButton from '@app/ui/favorite/favorite-button'

import Stars from '../stars'

interface DoctorCardProps extends TDoctorCard {
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
  actionable = true,
  id,
}: DoctorCardProps) => {
  const { width, height } = useMediaQuery({ h: 133, full: true })

  const favoriteId = useFavoritesStore((state) => state.favoriteDoctors[id])

  const renderContent = () => (
    <Card
      elevate
      bordered
      width={width}
      height={height}
      flexDirection="row"
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
      <Card.Header>
        <Image source={avatar} style={{ width: 110, height: 110, borderRadius: 12 }} />
      </Card.Header>
      <Card.Footer flex={1}>
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
      </Card.Footer>
    </Card>
  )

  if (!actionable) return renderContent()

  return (
    <Link
      style={{ position: 'relative' }}
      href={{ pathname: '/doctors/details/[id]', params: { id: documentId } }}>
      <Stack>
        <FavoriteButton
          favoriteId={favoriteId}
          type={FAVORITE_TYPES.DOCTOR}
          itemId={id}
          itemName={name}
          top={6}
          right={6}
          position="absolute"
        />
        {renderContent()}
      </Stack>
    </Link>
  )
}

export default memo(DoctorCard)
