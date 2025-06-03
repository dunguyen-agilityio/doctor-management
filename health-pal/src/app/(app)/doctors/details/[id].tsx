import { useRef } from 'react'
import { GestureResponderEvent } from 'react-native'

import { Stack, router, useLocalSearchParams } from 'expo-router'

import { APP_TITLES } from '@app/constants/route'

import { Button, Heading, Text, XStack, YStack } from '@theme'

import Medal from '@icons/medal'
import Messages from '@icons/messages'
import Star from '@icons/star'
import TwoUser from '@icons/two-user'

import {
  ButtonWithUpcoming,
  LoadingIndicator,
  ReviewCard,
  SessionHeader,
  Stat,
} from '@app/components'
import ErrorState from '@app/components/error'
import Header from '@app/components/header'
import { useAddFavorite } from '@app/hooks/use-add-favorite'
import useDoctor from '@app/hooks/use-doctor'
import { useRemoveFavorite } from '@app/hooks/use-remove-favorite'
import { useFavoritesStore } from '@app/stores/favorite'
import { FAVORITE_TYPES } from '@app/types/favorite'
import { ModalRef } from '@app/types/modal'
import { APP_ROUTES } from '@app/types/route'
import DoctorCard from '@app/ui/doctor/doctor-card'
import { FavoriteButton } from '@app/ui/favorite'
import RemoveFavoriteModal from '@app/ui/favorite/remove-favorite-confirm-modal'
import { formatDoctor } from '@app/utils/doctor'
import { formatReview } from '@app/utils/review'

const Details = () => {
  const params = useLocalSearchParams<{ id: string }>()
  const { data, isLoading, error, refetch } = useDoctor(params.id)
  const { mutate: removeFavorite, isPending: removeFavPending } = useRemoveFavorite(
    FAVORITE_TYPES.DOCTOR,
    data?.name || '',
  )

  const { mutate: addFavorite, isPending: addFavPending } = useAddFavorite(
    FAVORITE_TYPES.DOCTOR,
    data?.name || '',
  )

  const confirmRef = useRef<ModalRef>(null)

  const doctorId = data?.id

  const favoriteId = useFavoritesStore((state) =>
    doctorId ? state.favoriteDoctors[doctorId] : undefined,
  )

  if (isLoading) return <LoadingIndicator />

  if (!data || error) {
    return (
      <ErrorState
        title="Doctor Not Available"
        message="The doctor you're looking for no longer exists or is unavailable."
        onRetry={refetch}
      />
    )
  }

  const { bio, documentId, name, id, summary, reviews } = data

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
      pathname: '/booking',
      params: {
        doctorId: documentId,
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
          <DoctorCard {...formatDoctor(data)} showReview={false} />
          <XStack justifyContent="space-between">
            <Stat
              title="patients"
              value={`${summary?.patients.toLocaleString()}+`}
              icon={<TwoUser />}
            />
            <Stat title="experience" value={`${summary?.experience}+`} icon={<Medal />} />
            <Stat title="rating" value={summary?.rating} icon={<Star />} />
            <Stat
              title="reviews"
              value={`${summary?.reviews.toLocaleString()}+`}
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
            <SessionHeader
              title="Reviews"
              seeAllWrapper={({ children }) => (
                <ButtonWithUpcoming variant="text">{children}</ButtonWithUpcoming>
              )}
            />

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
      <RemoveFavoriteModal onConfirm={handleRemove} ref={confirmRef}>
        <DoctorCard {...formatDoctor(data)} />
      </RemoveFavoriteModal>
    </>
  )
}

export default Details
