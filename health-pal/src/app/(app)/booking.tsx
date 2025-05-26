import { Controller, useForm } from 'react-hook-form'

import { useCallback, useEffect, useRef, useState } from 'react'

import dayjs from 'dayjs'
import { useLocalSearchParams } from 'expo-router'
import { ScrollView } from 'react-native-gesture-handler'

import { Button, Heading, Text, XStack, YStack } from '@theme'

import { DatePicker } from '@app/components'
import TimeButton from '@app/components/time-button'
import { useSession } from '@app/contexts'
import { useAppLoading } from '@app/hooks'
import { queryClient } from '@app/react-query.config'
import { addBooking, getBookingAvailable, updateBooking } from '@app/services/booking'
import { BOOKING_TABS, BookingForm } from '@app/types/booking'
import { ModalRef } from '@app/types/modal'
import { CreateBookingSuccessModal } from '@app/ui/booking/create-booking-success-modal'
import ReloadTimeSlotConfirmModal from '@app/ui/booking/reload-time-slot'
import { formatTime } from '@app/utils/date'

const getTomorrow = () => {
  const now = dayjs(new Date())
  const tomorrow = now.set('date', now.get('date') + 1)
  return tomorrow
}

type BookingScreenParams = {
  doctorId: string
  bookingId: string
  date: string
  time: string
}

const Booking = () => {
  const setAppLoading = useAppLoading()
  const { session } = useSession()
  const [available, setAvailable] = useState<Record<string, boolean>>({})
  const params = useLocalSearchParams<BookingScreenParams>()

  const cancelConfirmRef = useRef<ModalRef>(null)
  const reloadTimeSlotConfirmRef = useRef<ModalRef>(null)

  const jwt = session?.jwt

  const {
    doctorId: doctId,
    bookingId,
    date: defaultDate = getTomorrow(),
    time: timeParam = '',
  } = params

  const { control, watch, setValue, handleSubmit } = useForm<BookingForm>({
    defaultValues: { time: timeParam, date: defaultDate },
  })

  const date = dayjs(watch('date'))
  const time = watch('time')

  const formattedValue = dayjs(date).format('MMM DD, YYYY')

  const formattedDate = date.format('YYYY-MM-DD')

  const getAvailable = useCallback(async () => {
    if (formattedDate) {
      setAppLoading(true)
      const { available, doctorId } = await getBookingAvailable(doctId, formattedDate)
      setAvailable(available)
      setValue('doctor', doctorId)
      setAppLoading(false)
    }
  }, [doctId, formattedDate, setAppLoading, setValue])

  useEffect(() => {
    getAvailable()
  }, [getAvailable])

  const onSubmit = async ({ date, doctor, time }: BookingForm) => {
    if (jwt) {
      setAppLoading(true)
      const formattedDate = dayjs(date).format('YYYY-MM-DD')

      const payload = {
        doctor,
        time,
        date: formattedDate,
        ...(bookingId && { documentId: bookingId }),
      }

      const action = bookingId ? updateBooking : addBooking

      const { data } = await action(payload, jwt)

      if (data) {
        cancelConfirmRef.current?.open()
        queryClient.invalidateQueries({ queryKey: ['bookings', BOOKING_TABS.UPCOMING] })
      } else {
        reloadTimeSlotConfirmRef.current?.open()
        getAvailable()
      }

      setAppLoading(false)
    }
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {date && time && (
        <ReloadTimeSlotConfirmModal
          ref={reloadTimeSlotConfirmRef}
          date={formattedValue}
          time={time}
          onReload={getAvailable}
        />
      )}
      <CreateBookingSuccessModal
        date={formattedValue}
        time={formatTime(time ?? '', ':')}
        ref={cancelConfirmRef}
      />
      <YStack paddingHorizontal={24} flex={1}>
        <YStack flex={1} gap={32}>
          <YStack gap={8}>
            <Heading>Select Date</Heading>
            <Controller
              control={control}
              name="date"
              render={({ field: { onChange, value } }) => (
                <DatePicker date={value} minDate={getTomorrow()} onChange={onChange} />
              )}
            />
          </YStack>

          <Controller
            control={control}
            name="time"
            rules={{ required: 'Field is required!' }}
            render={({ field: { onChange, value }, fieldState: { error } }) => {
              return (
                <YStack gap={8}>
                  <XStack justifyContent="space-between" alignItems="center">
                    <Heading>Select Hour</Heading>
                    <Text size="extraSmall" color="red">
                      {error?.message}
                    </Text>
                  </XStack>
                  <XStack justifyContent="space-between" gap={14} flexWrap="wrap">
                    {TIMES.map((time) => (
                      <TimeButton
                        value={time}
                        key={time}
                        onSelect={onChange}
                        disabled={!available[time] && timeParam !== time}
                        color={value === time ? '$white' : '$primary'}
                        backgroundColor={value === time ? '$primary' : '$grey50'}
                        disabledStyle={{ opacity: 0.5, backgroundColor: '$grey300' }}
                      />
                    ))}
                  </XStack>
                </YStack>
              )
            }}
          />
        </YStack>
        <XStack
          height={96}
          padding={24}
          width="100%"
          borderTopColor="$grey200"
          borderTopWidth={0.5}>
          <Button flex={1} onPress={handleSubmit(onSubmit)}>
            Confirm
          </Button>
        </XStack>
      </YStack>
    </ScrollView>
  )
}

export default Booking

const TIMES = [
  '09:00:00',
  '09:30:00',
  '10:00:00',
  '10:30:00',
  '11:00:00',
  '11:30:00',
  '15:00:00',
  '15:30:00',
  '16:00:00',
  '16:30:00',
  '17:00:00',
  '17:30:00',
]
