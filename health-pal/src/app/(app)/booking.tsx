import { formatShortTime, getDateSkippingWeekend, splitTime } from '@/utils/date'
import { Controller, FormProvider, useForm } from 'react-hook-form'

import { useCallback, useMemo, useRef } from 'react'

import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { router, useLocalSearchParams } from 'expo-router'
import { DateType } from 'react-native-ui-datepicker'

import { useToastController } from '@tamagui/toast'

import { useAppLoading } from '@/hooks'
import { useRequireAuth } from '@/hooks/use-require-auth'

import { Button, DatePicker, Heading, LoadingIndicator, YStack } from '@/components'
import BookingTime from '@/components/booking-time'

import { CreateBookingSuccessModal } from '@/ui/booking/create-booking-success-modal'
import ReloadTimeSlotConfirmModal from '@/ui/booking/reload-time-slot'

import { addBooking, getBookingAvailable, updateBooking } from '@/services/booking'

import { BookingForm, ModalRef } from '@/types'

import { queryClient } from '@react-query.config'

type BookingScreenParams = {
  doctorId: string
  doctorDocId: string
  bookingId: string
  date: string
}

const Booking = () => {
  const setAppLoading = useAppLoading()
  const params = useLocalSearchParams<BookingScreenParams>()
  const { session } = useRequireAuth()
  const { id: userId } = session.user

  const createBookingRef = useRef<ModalRef>(null)
  const reloadTimeSlotConfirmRef = useRef<ModalRef>(null)
  const toast = useToastController()

  const { bookingId, doctorId: doctorIdParam, doctorDocId, date: dateParam } = params

  const parseDate = dayjs(dateParam)
  const defaultDate = parseDate.isValid() ? parseDate : getDateSkippingWeekend()

  const methods = useForm<BookingForm>({
    defaultValues: {
      date: defaultDate.isValid() ? defaultDate : getDateSkippingWeekend(),
      documentId: bookingId,
      doctor: parseInt(doctorIdParam, 10),
    },
  })

  const { control, formState, getValues, setValue, handleSubmit, watch } = methods

  const dateString = watch('date').format('YYYY-MM-DD')
  const defaultTime = defaultDate ? formatShortTime(defaultDate) : null

  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ['bookingAvailable', doctorDocId, dateString],
    queryFn: () => getBookingAvailable(doctorDocId, dateString),
  })

  const loading = isLoading || isFetching

  const onSubmit = async ({ date, doctor, documentId }: BookingForm) => {
    setAppLoading(true)
    const formattedDate = date.toISOString()

    const payload = {
      doctor,
      date: formattedDate,
      user: userId,
      ...(documentId && { documentId }),
    }

    const action = documentId ? updateBooking : addBooking

    const { data, error } = await action(payload)

    if (data) {
      setValue('documentId', data.documentId)

      router.setParams({ ...params, date: formattedDate })
      await queryClient.invalidateQueries({
        queryKey: ['bookingAvailable', doctorDocId, dateString],
      })
      createBookingRef.current?.open()
    } else if (error.code === 400) {
      toast.show(`${documentId ? 'Update' : 'Create'} Failed`, {
        message: error.message,
        duration: 3000,
        type: 'error',
      })
    } else {
      reloadTimeSlotConfirmRef.current?.open()
    }

    setAppLoading(false)
  }

  const minDate = useMemo(() => getDateSkippingWeekend(), [])

  const disabledDates = useCallback((date: DateType) => [0, 6].includes(dayjs(date).day()), [])

  const disabled =
    !formState.isDirty ||
    Object.keys(formState.errors).length > 1 ||
    (!!dateParam && dayjs(defaultDate).isSame(getValues('date'), 'hour'))

  const available = data?.available ?? {}

  return (
    <YStack backgroundColor="$white" flex={1}>
      {loading && <LoadingIndicator fullScreen />}
      <FormProvider {...methods}>
        <ReloadTimeSlotConfirmModal ref={reloadTimeSlotConfirmRef} onReload={refetch} />
        <CreateBookingSuccessModal ref={createBookingRef} />
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
            name="date"
            rules={{ required: 'Field is required!' }}
            render={({ field: { onChange, value } }) => (
              <BookingTime
                onChange={(time) => {
                  const { hour, minute } = splitTime(time)
                  const newDate = dayjs(value).set('hour', hour).set('minute', minute)
                  onChange(newDate)
                }}
                value={formatShortTime(value)}
                disable={(time) => {
                  const { hour, minute } = splitTime(time)
                  let clone = dayjs(value)
                  clone = clone.set('hour', hour).set('minute', minute)

                  return (
                    (available[time] === false && defaultTime !== time) ||
                    clone.isBefore(dayjs(), 'minutes')
                  )
                }}
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
