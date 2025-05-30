import { Controller, FormProvider, useForm } from 'react-hook-form'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import dayjs from 'dayjs'
import { useLocalSearchParams } from 'expo-router'

import { Button, Heading, YStack } from '@theme'

import { DatePicker } from '@app/components'
import BookingTime from '@app/components/booking-time'
import { useSession } from '@app/contexts'
import { useAppLoading } from '@app/hooks'
import { queryClient } from '@app/react-query.config'
import { addBooking, getBookingAvailable, updateBooking } from '@app/services/booking'
import { BOOKING_TABS, BookingForm } from '@app/types/booking'
import { ModalRef } from '@app/types/modal'
import { CreateBookingSuccessModal } from '@app/ui/booking/create-booking-success-modal'
import ReloadTimeSlotConfirmModal from '@app/ui/booking/reload-time-slot'
import { getDefaultDate } from '@app/utils/date'

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
    bookingId: bookingIdParam,
    date: defaultDate = getDefaultDate(),
    time: timeParam = '',
  } = params

  const methods = useForm<BookingForm>({
    defaultValues: { time: timeParam, date: defaultDate, documentId: bookingIdParam },
  })
  const { control, setValue, handleSubmit } = methods

  const getAvailable = useCallback(
    async (date = getDefaultDate()) => {
      const formattedDate = date.format('YYYY-MM-DD')

      if (formattedDate) {
        setAppLoading(true)
        const { available, doctorId } = await getBookingAvailable(doctId, formattedDate)
        setAvailable(available)
        setValue('doctor', doctorId)
        setAppLoading(false)
      }
    },
    [doctId, setAppLoading, setValue],
  )

  useEffect(() => {
    getAvailable()
  }, [getAvailable])

  const onSubmit = async ({ date, doctor, time, documentId }: BookingForm) => {
    if (jwt) {
      setAppLoading(true)
      const formattedDate = dayjs(date).format('YYYY-MM-DD')

      const payload = {
        doctor,
        time,
        date: formattedDate,
        ...(documentId && { documentId }),
      }

      const action = documentId ? updateBooking : addBooking

      const { data } = await action(payload, jwt)

      if (data) {
        if (!documentId) {
          setValue('documentId', data.documentId)
        }
        cancelConfirmRef.current?.open()
        queryClient.invalidateQueries({ queryKey: ['bookings', BOOKING_TABS.UPCOMING] })
      } else {
        reloadTimeSlotConfirmRef.current?.open()
        getAvailable()
      }

      setAppLoading(false)
    }
  }

  const minDate = useMemo(() => getDefaultDate(), [])

  return (
    <YStack backgroundColor="$white" flex={1}>
      <FormProvider {...methods}>
        <ReloadTimeSlotConfirmModal ref={reloadTimeSlotConfirmRef} onReload={getAvailable} />
        <CreateBookingSuccessModal ref={cancelConfirmRef} />
      </FormProvider>
      <YStack justifyContent="space-between" flex={1}>
        <YStack flex={1} gap={32} paddingHorizontal={24}>
          <YStack gap={8}>
            <Heading>Select Date</Heading>
            <Controller
              control={control}
              name="date"
              render={({ field: { onChange, value } }) => (
                <DatePicker
                  date={value}
                  minDate={minDate}
                  onChange={onChange}
                  disabledDates={(date) => [0, 6].includes(dayjs(date).day())}
                />
              )}
            />
          </YStack>

          <Controller
            control={control}
            name="time"
            rules={{ required: 'Field is required!' }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <BookingTime
                available={available}
                onChange={onChange}
                value={value ?? timeParam}
                errorMessage={error?.message}
              />
            )}
          />
        </YStack>
        <YStack
          height={96}
          padding={24}
          gap={24}
          width="100%"
          borderTopColor="$grey200"
          borderTopWidth={0.5}>
          <Button flex={1} onPress={handleSubmit(onSubmit)}>
            Confirm
          </Button>
        </YStack>
      </YStack>
    </YStack>
  )
}

export default Booking
