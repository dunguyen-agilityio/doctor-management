import { Controller, FormProvider, useForm } from 'react-hook-form'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import dayjs from 'dayjs'
import { router, useLocalSearchParams } from 'expo-router'
import { DateType } from 'react-native-ui-datepicker'

import { useAppLoading } from '@app/hooks'
import { useRequireAuth } from '@app/hooks/use-require-auth'

import { Button, DatePicker, Heading, YStack } from '@app/components'
import BookingTime from '@app/components/booking-time'

import { CreateBookingSuccessModal } from '@app/ui/booking/create-booking-success-modal'
import ReloadTimeSlotConfirmModal from '@app/ui/booking/reload-time-slot'

import { addBooking, getBookingAvailable, updateBooking } from '@app/services/booking'

import { BookingForm, ModalRef } from '@app/types'

import { getDefaultDate } from '@app/utils/date'

type BookingScreenParams = {
  doctorId: string
  bookingId: string
  date: string
  time: string
}

const Booking = () => {
  const setAppLoading = useAppLoading()
  const { session } = useRequireAuth()
  const [available, setAvailable] = useState<Record<string, boolean>>({})
  const params = useLocalSearchParams<BookingScreenParams>()

  const cancelConfirmRef = useRef<ModalRef>(null)
  const reloadTimeSlotConfirmRef = useRef<ModalRef>(null)

  const { jwt } = session

  const {
    doctorId: doctId,
    bookingId: bookingIdParam,
    date: defaultDate = getDefaultDate(),
    time: timeParam = '',
  } = params

  const methods = useForm<BookingForm>({
    defaultValues: { time: timeParam, date: defaultDate, documentId: bookingIdParam },
  })

  const { control, formState, getValues, setValue, handleSubmit, watch } = methods

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

  const date = watch('date')

  useEffect(() => {
    getAvailable(dayjs(date))
  }, [getAvailable, date])

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
        setValue('documentId', data.documentId)
        cancelConfirmRef.current?.open()
        router.setParams({ ...params, time, date: formattedDate })
      } else {
        reloadTimeSlotConfirmRef.current?.open()
        await getAvailable()
      }

      setAppLoading(false)
    }
  }

  const minDate = useMemo(() => getDefaultDate(), [])

  const disabledDates = useCallback((date: DateType) => [0, 6].includes(dayjs(date).day()), [])

  const disabled =
    !formState.isDirty ||
    Object.keys(formState.errors).length > 1 ||
    (getValues('time') === timeParam && dayjs(defaultDate).isSame(getValues('date'), 'date'))

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
                  disabledDates={disabledDates}
                />
              )}
            />
          </YStack>

          <Controller
            control={control}
            name="time"
            rules={{ required: 'Field is required!' }}
            render={({ field: { onChange, value } }) => (
              <BookingTime
                available={available}
                onChange={onChange}
                value={value}
                current={timeParam}
                date={watch('date')}
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
          <Button flex={1} onPress={handleSubmit(onSubmit)} disabled={disabled}>
            Confirm
          </Button>
        </YStack>
      </YStack>
    </YStack>
  )
}

export default Booking
