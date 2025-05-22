import { Controller, useForm } from 'react-hook-form'

import React, { useEffect, useRef, useState } from 'react'

import dayjs from 'dayjs'
import { useLocalSearchParams } from 'expo-router'

import { Button, Heading, XStack, YStack } from '@theme'

import { DatePicker } from '@app/components'
import TimeButton from '@app/components/time-button'
import { useSession } from '@app/contexts'
import { useAppLoading } from '@app/hooks'
import { addBooking, getBookingAvailable } from '@app/services/booking'
import { BookingForm } from '@app/types/booking'
import { ModalRef } from '@app/types/modal'
import { CreateBookingSuccessModal } from '@app/ui/booking/create-booking-success-modal'
import { formatTime } from '@app/utils/date'

const getTomorrow = () => {
  const now = dayjs(new Date())
  const tomorrow = now.set('date', now.get('date') + 1)
  return tomorrow
}

const Booking = () => {
  const setAppLoading = useAppLoading()
  const { session } = useSession()
  const [available, setAvailable] = useState<Record<string, boolean>>({})
  const { doctorId: docId } = useLocalSearchParams<{ doctorId: string }>()
  const { control, watch, setValue, handleSubmit } = useForm<BookingForm>({
    defaultValues: { time: '', date: getTomorrow() },
  })

  const date = dayjs(watch('date'))
  const time = watch('time')
  const formattedDate = date.format('YYYY-MM-DD')

  const jwt = session?.jwt

  useEffect(() => {
    const getAvailable = async () => {
      if (formattedDate) {
        setAppLoading(true)
        const { available, doctorId } = await getBookingAvailable(docId, formattedDate)
        setAvailable(available)
        setValue('doctor', doctorId)
        setAppLoading(false)
      }
    }

    getAvailable()
  }, [formattedDate, docId, setValue, setAppLoading])

  const onSubmit = async ({ date, ...rest }: BookingForm) => {
    if (jwt) {
      setAppLoading(true)
      const formattedDate = dayjs(date).format('YYYY-MM-DD')
      const payload = { ...rest, date: formattedDate }
      const { data, error } = await addBooking(payload, jwt)

      if (data) {
        ref.current?.open()
      } else {
        console.log('error', error)
      }

      setAppLoading(false)
    }
  }

  const ref = useRef<ModalRef>(null)

  return (
    <>
      <CreateBookingSuccessModal
        date={dayjs(date).format('MMM DD, YYYY')}
        time={formatTime(time, ':')}
        ref={ref}
      />
      <YStack paddingHorizontal={24} flex={1}>
        <YStack flex={1}>
          <YStack>
            <Heading>Select Date</Heading>
            <Controller
              control={control}
              name="date"
              render={({ field: { onChange, value } }) => (
                <DatePicker date={value} minDate={getTomorow()} onChange={onChange} />
              )}
            />
          </YStack>
          <Controller
            control={control}
            name="time"
            render={({ field: { onChange, value, ref } }) => {
              return (
                <YStack gap="16">
                  <Heading>Select Hour</Heading>
                  <XStack justifyContent="space-between" gap={14} flexWrap="wrap">
                    {TIMES.map((time) => (
                      <TimeButton
                        value={time}
                        key={time}
                        onSelect={onChange}
                        disabled={!available[time]}
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
    </>
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
