import { Fragment, memo } from 'react'

import { Image } from 'expo-image'

import { Card, Separator, YStack } from 'tamagui'

import { Heading, Text, XStack } from '@theme'

import LocationOutline from '@icons/location-outline'

import Stars from '@app/components/stars'
import { TDoctorCard } from '@app/models/doctor'
import { useFavoritesStore } from '@app/stores/favorite'
import { FAVORITE_TYPES } from '@app/types/favorite'
import FavoriteButton from '@app/ui/favorite/favorite-button'

interface DoctorCardProps extends TDoctorCard {
  showReview?: boolean
  wrapper?: (props: React.PropsWithChildren<{ id: string }>) => React.ReactNode
}

const DoctorCard = ({
  avatar,
  name,
  specialty,
  address,
  reviewCounter = 0,
  rating = 0,
  documentId,
  showReview = true,
  id,
  wrapper,
}: DoctorCardProps) => {
  const favoriteId = useFavoritesStore((state) => state.favoriteDoctors[id])

  const content = (
    <Card
      elevate
      bordered
      flexDirection="row"
      padding={12}
      paddingRight={0}
      borderWidth={0.5}
      borderRadius={12}
      position="relative"
      borderColor="$grey100"
      shadowColor="$black"
      shadowOffset={{ width: 4, height: 4 }}
      shadowOpacity={0.1}
      gap={12}
      shadowRadius={12}
      elevation={3}
      pointerEvents="none">
      <Card.Header padding={0}>
        <Image
          source={avatar}
          style={{ width: 110, height: 110, borderRadius: 12 }}
          testID="avatar-img"
        />
      </Card.Header>
      <Card.Footer flex={1} paddingVertical={0} marginVertical={0}>
        {showReview && (
          <FavoriteButton
            favoriteId={favoriteId}
            type={FAVORITE_TYPES.DOCTOR}
            itemId={id}
            itemName={name}
            top={0}
            right={6}
            position="absolute"
            zIndex={1000}
          />
        )}
        <YStack paddingRight={12} flex={1}>
          <XStack justifyContent="space-between" alignItems="center">
            <Heading>{name}</Heading>
          </XStack>
          <Separator marginVertical={8} />
          <YStack gap={showReview ? 0 : 8}>
            <Text size="small" fontWeight="600">
              {specialty}
            </Text>
            <XStack alignItems="center" gap="$sm" overflow="hidden">
              <LocationOutline />
              <Text size="small" width={200} numberOfLines={1} testID="address-text">
                {address}
              </Text>
            </XStack>
          </YStack>
          {showReview && (
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

  const Container = wrapper ?? Fragment

  if (wrapper) {
    return <Container id={documentId}>{content}</Container>
  }

  return content
}

export default memo(DoctorCard)
