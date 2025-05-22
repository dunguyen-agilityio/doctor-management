import { router } from 'expo-router'

import { YStack } from 'tamagui'

import { Button } from '@theme/button'
import { Heading } from '@theme/heading'
import { Text } from '@theme/text'

import { ShieldTick } from '@icons'

import Modal from '@app/components/modal'
import { queryClient } from '@app/react-query.config'
import { BOOKING_TABS } from '@app/types/booking'
import { ModalRef } from '@app/types/modal'

type Props = {
  ref?: React.RefObject<ModalRef | null>
  date: string
  time: string
}

export function CreateBookingSuccessModal({ ref, date, time }: Readonly<Props>) {
  const handleDone = async () => {
    await queryClient.invalidateQueries({
      queryKey: [`bookings-${BOOKING_TABS.UPCOMING}`],
    })
    router.replace('/(app)/(tabs)/bookings')
    ref?.current?.close()
  }

  const handleClose = () => {
    ref?.current?.close()
  }

  return (
    <Modal ref={ref}>
      <YStack alignItems="center" paddingHorizontal={48} gap={32} paddingVertical={32}>
        <YStack
          h={130}
          width={130}
          borderRadius={130}
          backgroundColor="$lightTeal"
          alignItems="center"
          justifyContent="center">
          <ShieldTick />
        </YStack>

        <Heading size="extraLarge" fontWeight="600">
          Congratulations!
        </Heading>

        <Text size="small" color="$gray10" textAlign="center" maxWidth={252}>
          {`Your appointment with Dr. David Patel is confirmed for ${date}, at ${time}.`}
        </Text>
        <YStack width={'100%'} gap={18}>
          <Button onPress={handleDone}>Done</Button>
          <Button
            variant="outlined"
            borderWidth={0}
            color="$grey500"
            fontWeight="400"
            onPress={handleClose}>
            Edit your appointment
          </Button>
        </YStack>
      </YStack>
    </Modal>
  )
}
