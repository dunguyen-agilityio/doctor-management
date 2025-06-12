import { ShieldTick } from '@/icons'
import { formatShortTime } from '@/utils/date'
import { useFormContext } from 'react-hook-form'

import dayjs from 'dayjs'
import { router } from 'expo-router'

import { YStack } from 'tamagui'

import { ROUTES } from '@/constants'

import { Button, Heading, Text } from '@/components/common'
import Modal from '@/components/common/modal'

import { BOOKING_TABS, BookingForm } from '@/types/booking'
import { ModalRef } from '@/types/modal'

import { queryClient } from '@react-query.config'

type Props = {
  ref?: React.RefObject<ModalRef | null>
}

export const CreateBookingSuccessModal = ({ ref }: Readonly<Props>) => {
  const { watch } = useFormContext<BookingForm>()

  const date = dayjs(watch('date'))
  const formattedDate = date.format('YYYY-MM-DD')
  const formattedTime = formatShortTime(date)

  const handleDone = async () => {
    await queryClient.invalidateQueries({ queryKey: ['bookings', BOOKING_TABS.UPCOMING] })
    router.replace(ROUTES.BOOKINGS)
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
          {`Your appointment with Dr. David Patel is confirmed for ${formattedDate}, at ${formattedTime}.`}
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
