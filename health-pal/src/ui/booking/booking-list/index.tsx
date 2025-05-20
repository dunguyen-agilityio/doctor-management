import React, { useRef } from 'react'

import { useQuery } from '@tanstack/react-query'
import { FlatList } from 'react-native-gesture-handler'

import { XStack } from '@theme'
import { Text } from '@theme/text'

import { LoadingIndicator } from '@app/components'
import BookingCard from '@app/components/booking-card'
import { BookingData, BookingKey } from '@app/models/booking'
import { getBookings } from '@app/services/booking'
import { BOOKING_TABS } from '@app/types/booking'
import { ModalRef } from '@app/types/modal'
import { StrapiPagination } from '@app/types/strapi'
import { formatBooking } from '@app/utils/booking'

import CancelBookingModal, { CancelBookingParams } from '../cancel-booking-modal'

const bookingPromises: Record<BOOKING_TABS, () => Promise<StrapiPagination<BookingData>>> = {
  [BOOKING_TABS.CANCELED]: () =>
    getBookings({ filters: [{ key: BookingKey.type, query: BOOKING_TABS.CANCELED }] }),
  [BOOKING_TABS.COMPLETED]: () =>
    getBookings({ filters: [{ key: BookingKey.type, query: BOOKING_TABS.COMPLETED }] }),
  [BOOKING_TABS.UPCOMING]: () =>
    getBookings({ filters: [{ key: BookingKey.type, query: BOOKING_TABS.UPCOMING }] }),
}

const keyExtractor = (item: BookingData) => item.documentId

const ItemSeparatorComponent = () => <XStack height={10} />

const BookingList = ({ type }: { type: BOOKING_TABS }) => {
  const { isLoading, data, error } = useQuery({
    queryKey: [`bookings-${type}`],
    queryFn: bookingPromises[type],
    staleTime: Infinity,
  })

  const cancelBookingModalRef = useRef<ModalRef<CancelBookingParams>>(null)

  const isUpcomingTab = type === BOOKING_TABS.UPCOMING

  const handleCancel = (params: CancelBookingParams) => {
    cancelBookingModalRef.current?.open(params)
  }

  const renderItem = ({ item }: { item: BookingData }) => (
    <BookingCard onCancel={isUpcomingTab ? handleCancel : undefined} {...formatBooking(item)} />
  )

  if (isLoading) {
    return <LoadingIndicator />
  }

  if (error || !data) {
    return <Text>{error?.message ?? 'Error'}</Text>
  }

  return (
    <>
      <FlatList
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        data={data.data}
        ItemSeparatorComponent={ItemSeparatorComponent}
        style={{ paddingHorizontal: 24 }}
        contentContainerStyle={{ backgroundColor: '#fff' }}
      />

      {isUpcomingTab && <CancelBookingModal ref={cancelBookingModalRef} />}
    </>
  )
}

export default BookingList
