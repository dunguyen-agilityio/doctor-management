import { Hospital as HospitalIcon, Routing } from '@/icons'
import LocationOutline from '@/icons/location-outline'
import { Hospital } from '@/models/hospital'
import { useFavoritesStore } from '@/stores/favorite'

import { useRef } from 'react'

import { Card, CardProps, Separator, ViewProps, XStack } from 'tamagui'

import { useAddFavorite } from '@/hooks/use-add-favorite'
import { useRemoveFavorite } from '@/hooks/use-remove-favorite'

import { CloudinaryImage, Heading, Stars, Text } from '@/components'

import FavoriteButton from '@/ui/favorite/favorite-button'
import RemoveFavoriteModal from '@/ui/favorite/remove-favorite-confirm-modal'

import { FAVORITE_TYPES } from '@/types/favorite'
import { ModalRef } from '@/types/modal'

type HospitalExtend = {
  marginLeft?: number
  marginRight?: number
  marginBottom?: number
  width?: ViewProps['width']
}

type HospitalCardProps = Hospital & HospitalExtend & Omit<CardProps, 'id'>

const HospitalCard = ({
  image = require('@assets/images/banner01.webp'),
  address,
  name,
  rating = 4.2,
  reviewCounter = 23,
  type = 'Hospital',
  id,
  width = 'auto',
  marginBottom,
  marginLeft,
  marginRight,
  ...props
}: HospitalCardProps) => {
  const favoriteId = useFavoritesStore((state) => state.favoriteHospitals[id])

  const { mutate: removeFavorite, isPending: removeFavPending } = useRemoveFavorite(
    FAVORITE_TYPES.HOSPITAL,
    name,
  )

  const { mutate: addFavorite, isPending: addFavPending } = useAddFavorite(
    FAVORITE_TYPES.HOSPITAL,
    name,
  )

  const confirmRef = useRef<ModalRef>(null)

  const handleFavorite = () => {
    if (favoriteId) {
      confirmRef.current?.open()
      return
    }

    addFavorite(id)
  }

  const handleRemove = () => {
    confirmRef.current?.close()
    removeFavorite(favoriteId)
  }

  const renderCard = (extend: HospitalExtend, hasFavorite = false) => (
    <Card
      elevate
      bordered
      borderRadius="$2"
      overflow="hidden"
      elevation={3}
      shadowColor="$black"
      testID="hospital-card"
      disabled={!addFavPending || removeFavPending}
      disabledStyle={{ opacity: 0.8 }}
      width={width}
      shadowOffset={{ width: 4, height: 4 }}
      {...props}
      {...extend}>
      <Card.Header padding={0}>
        <CloudinaryImage
          source={{ uri: image?.url }}
          style={{ height: 120 }}
          tabIndex={0}
          aria-label={`Image of ${name}`}
          role="img"
        />
        <FavoriteButton
          favoriteId={favoriteId}
          itemId={id}
          itemName={name}
          type={FAVORITE_TYPES.HOSPITAL}
          top={6}
          right={6}
          position="absolute"
          {...(hasFavorite && {
            testID: 'favorite-button',
            onPress: handleFavorite,
            tabIndex: 0,
            'aria-label': favoriteId ? `Remove ${name} from favorites` : `Add ${name} to favorites`,
            accessibilityHint: favoriteId
              ? 'Removes this hospital from your favorites'
              : 'Adds this hospital to your favorites',
          })}
          role="button"
        />
      </Card.Header>

      <Card.Footer padding={12} paddingTop={8} gap="$sm" flexDirection="column" tabIndex={0}>
        <Heading size="small" numberOfLines={1}>
          {name}
        </Heading>

        <XStack alignItems="center" gap="$sm">
          <LocationOutline testID="location-icon" />
          <Text size="extraSmall" numberOfLines={1}>
            {address}
          </Text>
        </XStack>

        <XStack alignItems="center" gap="$sm">
          <Stars stars={rating} max={1} />
          <Text size="extraSmall">{`(${reviewCounter} Reviews)`}</Text>
        </XStack>

        <Separator backgroundColor="$grey200" />

        <XStack justifyContent="space-between">
          <XStack alignItems="center" gap="$sm">
            <Routing testID="routing-icon" />
            <Text size="extraSmall">2.5 km/40min</Text>
          </XStack>

          <XStack alignItems="center" gap="$sm">
            <HospitalIcon testID="hospital-icon" />
            <Text size="extraSmall">{type}</Text>
          </XStack>
        </XStack>
      </Card.Footer>
    </Card>
  )

  const content = (
    <>
      {renderCard({ width, marginBottom, marginLeft, marginRight }, true)}
      {favoriteId && (
        <RemoveFavoriteModal onConfirm={handleRemove} ref={confirmRef}>
          {renderCard({ width: 'auto' })}
        </RemoveFavoriteModal>
      )}
    </>
  )

  return content
}

export default HospitalCard
