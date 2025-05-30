import { router, useLocalSearchParams } from 'expo-router'

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
import useDoctor from '@app/hooks/use-doctor'
import DoctorCard from '@app/ui/doctor/doctor-card'
import { formatDoctor } from '@app/utils/doctor'
import { formatReview } from '@app/utils/review'

const Details = () => {
  const params = useLocalSearchParams<{ id: string }>()
  const { data, isLoading, error, refetch } = useDoctor(params.id)

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

  const { bio, documentId, summary, reviews } = data

  const navigateBooking = () => {
    router.navigate({
      pathname: '/booking',
      params: {
        doctorId: documentId,
      },
    })
  }

  const review = reviews[0]

  return (
    <YStack flex={1} gap={16} paddingTop={16}>
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
  )
}

export default Details
