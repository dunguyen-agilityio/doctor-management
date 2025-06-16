import LocationOutline from '@/icons/location-outline'
import { TDoctorCard } from '@/models/doctor'
import { useFavoritesStore } from '@/stores/favorite'

import { memo, useRef } from 'react'

import { Link } from 'expo-router'

import { Card, Separator, XStack, YStack } from 'tamagui'

import { ROUTES } from '@/constants'

import { useAddFavorite } from '@/hooks/use-add-favorite'
import { useRemoveFavorite } from '@/hooks/use-remove-favorite'

import { CloudinaryImage, Heading, Stars, Text } from '@/components'

import FavoriteButton from '@/ui/favorite/favorite-button'
import RemoveFavoriteModal from '@/ui/favorite/remove-favorite-confirm-modal'

import { FAVORITE_TYPES } from '@/types/favorite'
import { ModalRef } from '@/types/modal'

interface DoctorCardProps extends TDoctorCard {
  showReview?: boolean
  actionable?: boolean
}

const DoctorCard = ({
  avatar,
  name,
  specialty,
  address,
  reviewCounter,
  rating,
  showReview = true,
  id,
  actionable = true,
  documentId,
}: DoctorCardProps) => {
  const { mutate: removeFavorite, isPending: removeFavPending } = useRemoveFavorite(
    FAVORITE_TYPES.DOCTOR,
    name,
  )

  const { mutate: addFavorite, isPending: addFavPending } = useAddFavorite(
    FAVORITE_TYPES.DOCTOR,
    name,
  )

  const favoriteId = useFavoritesStore((state) => state.favoriteDoctors[id])

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

  const renderCard = (action = false) => (
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
      disabledStyle={{ opacity: 0.8 }}
      gap={12}
      shadowRadius={12}
      elevation={3}>
      <Card.Header padding={0}>
        <CloudinaryImage
          source={{ uri: avatar }}
          style={{ width: 110, height: 110, borderRadius: 12 }}
          tabIndex={0}
          aria-label={`Image of ${name}`}
          role="img"
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
            {...(action && {
              onPress: handleFavorite,
              'aria-label': favoriteId
                ? `Remove ${name} from favorites`
                : `Add ${name} to favorites`,
              tabIndex: 0,
            })}
            role="button"
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
              <Stars stars={rating} max={1} flexDirection="row-reverse" size={15} />
              <Separator vertical marginHorizontal={8} height={13} />
              <Text size="extraSmall">{`${reviewCounter} Reviews`}</Text>
            </XStack>
          )}
        </YStack>
      </Card.Footer>
    </Card>
  )

  const content = actionable ? (
    <Link
      testID="doctor-link"
      accessibilityLabel={`View doctors at ${name}`}
      accessibilityHint="Shows this doctor in the doctor list"
      role="link"
      disabled={removeFavPending || addFavPending}
      href={{ pathname: ROUTES.DOCTOR, params: { id: documentId } }}>
      {renderCard(true)}
    </Link>
  ) : (
    renderCard(true)
  )

  return (
    <>
      {content}
      {favoriteId && (
        <RemoveFavoriteModal onConfirm={handleRemove} ref={confirmRef}>
          {renderCard()}
        </RemoveFavoriteModal>
      )}
    </>
  )
}

export default memo(DoctorCard)
