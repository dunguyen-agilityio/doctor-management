import Medal from '@/icons/medal'
import Messages from '@/icons/messages'
import Star from '@/icons/star'
import TwoUser from '@/icons/two-user'
import { useFavoritesStore } from '@/stores/favorite'
import { formatDoctor } from '@/utils/doctor'
import { formatReview } from '@/utils/review'

import { useRef } from 'react'
import { GestureResponderEvent } from 'react-native'

import { Stack, router, useLocalSearchParams } from 'expo-router'

import { tokens } from '@tamagui.config'

import { ROUTES } from '@/constants'
import { APP_TITLES } from '@/constants/route'

import { useAddFavorite } from '@/hooks/use-add-favorite'
import useDoctor from '@/hooks/use-doctor'
import { useRemoveFavorite } from '@/hooks/use-remove-favorite'

import {
  Button,
  ButtonWithUpcoming,
  Heading,
  LoadingIndicator,
  ReviewCard,
  Stat,
  Text,
  XStack,
  YStack,
} from '@/components'
import ErrorState from '@/components/error'
import Header from '@/components/header'

import DoctorCard from '@/ui/doctor/doctor-card'
import { FavoriteButton } from '@/ui/favorite'
import RemoveFavoriteModal from '@/ui/favorite/remove-favorite-confirm-modal'

import { FAVORITE_TYPES } from '@/types/favorite'
import { ModalRef } from '@/types/modal'
import { APP_ROUTES } from '@/types/route'

const Details = () => {
  const params = useLocalSearchParams<{ id: string }>()
  const { data, isLoading, error, isFetching, refetch } = useDoctor(params.id)
  const doctor = data ? formatDoctor(data) : null

  const { mutate: removeFavorite, isPending: removeFavPending } = useRemoveFavorite(
    FAVORITE_TYPES.DOCTOR,
    doctor?.name || '',
  )

  const { mutate: addFavorite, isPending: addFavPending } = useAddFavorite(
    FAVORITE_TYPES.DOCTOR,
    doctor?.name || '',
  )

  const confirmRef = useRef<ModalRef>(null)

  const doctorId = doctor?.id

  const favoriteId = useFavoritesStore((state) =>
    doctorId ? state.favoriteDoctors[doctorId] : undefined,
  )

  if (isLoading || isFetching)
    return (
      <YStack flex={1}>
        <LoadingIndicator />
      </YStack>
    )

  if (!doctor || !data || error) {
    return (
      <YStack flex={1} paddingTop="45%">
        <ErrorState
          title="Doctor Not Available"
          message="The doctor you're looking for no longer exists or is unavailable."
          onRetry={async () => {
            await refetch()
          }}
        />
      </YStack>
    )
  }

  const { bio, documentId, name, id } = doctor

  const { reviews, summary } = data
  const { experience, patients, rating, reviews: reviewCounter } = summary

  const handleFavorite = (e: GestureResponderEvent) => {
    e.preventDefault()

    if (favoriteId) {
      confirmRef.current?.open()
      return
    }

    addFavorite(id)
  }

  const handleRemove = () => {
    confirmRef.current?.close()
    removeFavorite(favoriteId!)
  }

  const navigateBooking = () => {
    router.navigate({
      pathname: ROUTES.BOOKING,
      params: {
        doctorId: id,
        doctorDocId: documentId,
      },
    })
  }

  const renderIcon = () => {
    if (isLoading || error || !data) return null

    return (
      <FavoriteButton
        favoriteId={favoriteId}
        itemId={id}
        itemName={name}
        type={FAVORITE_TYPES.DOCTOR}
        size={20}
        disabledStyle={{ backgroundColor: '$shadow1' }}
        onPress={handleFavorite}
        disabled={addFavPending || removeFavPending}
        aria-label={favoriteId ? `Remove ${name} from favorites` : `Add ${name} to favorites`}
        accessibilityHint={
          favoriteId
            ? 'Removes this doctor from your favorites'
            : 'Adds this doctor to your favorites'
        }
        role="button"
      />
    )
  }

  const review = reviews[0]

  return (
    <>
      <Stack.Screen
        options={{
          header: ({ navigation }) => (
            <Header title={APP_TITLES[APP_ROUTES.DOCTOR_DETAILS]} onBack={navigation.goBack}>
              <Button position="absolute" variant="icon" right={24} paddingHorizontal={0}>
                {renderIcon()}
              </Button>
            </Header>
          ),
        }}
      />
      <YStack flex={1} gap={16}>
        <YStack gap={16} flex={1} paddingHorizontal={24}>
          <DoctorCard {...doctor} actionable={false} showReview={false} />
          <XStack justifyContent="space-between">
            <Stat title="patients" value={`${patients.toLocaleString()}+`} icon={<TwoUser />} />
            <Stat title="experience" value={`${experience}+`} icon={<Medal />} />
            <Stat title="rating" value={rating} icon={<Star fill={tokens.color.primary.val} />} />
            <Stat
              title="reviews"
              value={`${reviewCounter.toLocaleString()}+`}
              icon={<Messages />}
            />
          </XStack>
          <YStack gap="$sm">
            <Heading size="extraLarge" fontWeight="600">
              About me
            </Heading>
            <Text>{bio}</Text>
          </YStack>

          <YStack gap="$sm">
            <Heading size="extraLarge" fontWeight="600">
              Working Time
            </Heading>
            <Text size="small">Monday-Friday, 08.00 AM-18.00 PM</Text>
          </YStack>
          <YStack flex={1} gap="$sm">
            <XStack alignItems="center" justifyContent="space-between">
              <Heading size="extraLarge" fontWeight="600">
                Reviews
              </Heading>
              <ButtonWithUpcoming variant="text">See All</ButtonWithUpcoming>
            </XStack>
            <ReviewCard {...formatReview(review)} />
          </YStack>
        </YStack>
        <XStack
          paddingVertical={24}
          height={96}
          width="100%"
          borderTopWidth={0.5}
          paddingHorizontal={24}
          borderTopColor="$grey200">
          <Button onPress={navigateBooking} flex={1}>
            Book Appointment
          </Button>
        </XStack>
      </YStack>
      {favoriteId && (
        <RemoveFavoriteModal onConfirm={handleRemove} ref={confirmRef}>
          <DoctorCard actionable={false} {...doctor} />
        </RemoveFavoriteModal>
      )}
    </>
  )
}

export default Details
