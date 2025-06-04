import { useFormContext } from 'react-hook-form'

import dayjs from 'dayjs'
import { router } from 'expo-router'

import { YStack } from 'tamagui'

import { Button, Heading, Text } from '@app/components/common'
import Modal from '@app/components/common/modal'

import { ShieldTick } from '@icons'

import { BookingForm } from '@app/types/booking'
import { ModalRef } from '@app/types/modal'

type Props = {
  ref?: React.RefObject<ModalRef | null>
}

export const CreateBookingSuccessModal = ({ ref }: Readonly<Props>) => {
  const { watch } = useFormContext<BookingForm>()
  const time = watch('time')

  const date = dayjs(watch('date'))
  const formattedDate = date.format('YYYY-MM-DD')

  const handleDone = async () => {
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
          {`Your appointment with Dr. David Patel is confirmed for ${formattedDate}, at ${time}.`}
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
