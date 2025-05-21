import { router, useLocalSearchParams } from 'expo-router'

import { Button, Heading, Text, XStack, YStack } from '@theme'

import Medal from '@icons/medal'
import Messages from '@icons/messages'
import Star from '@icons/star'
import TwoUser from '@icons/two-user'

import { LoadingIndicator, SessionHeader } from '@app/components'
import { ButtonWithUpcoming } from '@app/components/button-with-upcoming'
import DoctorCard from '@app/components/doctor-card'
import ReviewCard from '@app/components/review-card'
import useDoctor from '@app/hooks/use-doctor'
import DoctorStat from '@app/ui/doctor/stat'
import { formatDoctor } from '@app/utils/doctor'
import { formatReview } from '@app/utils/review'

const Details = () => {
  const params = useLocalSearchParams<{ id: string }>()
  const { data, isLoading, error } = useDoctor(params.id)

  if (isLoading) return <LoadingIndicator />

  if (!data || error) {
    return <Text>Error</Text>
  }

  const { bio, documentId, summary, reviews } = data.data

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
        <DoctorCard {...formatDoctor(data.data)} actionable={false} />
        <XStack justifyContent="space-between">
          <DoctorStat
            title="patients"
            value={`${summary?.patients.toLocaleString()}+`}
            icon={<TwoUser />}
          />
          <DoctorStat title="experience" value={`${summary?.experience}+`} icon={<Medal />} />
          <DoctorStat title="rating" value={summary?.rating} icon={<Star />} />
          <DoctorStat
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
              <ButtonWithUpcoming variant="outlined" borderWidth={0}>
                {children}
              </ButtonWithUpcoming>
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
