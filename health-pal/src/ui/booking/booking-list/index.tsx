import React from 'react'
import { StyleSheet } from 'react-native'

import { useQuery } from '@tanstack/react-query'
import { FlatList } from 'react-native-gesture-handler'

import { BOOKING_EMPTY } from '@app/constants'

import { XStack } from '@theme'
import { Text } from '@theme/text'

import { LoadingIndicator } from '@app/components'
import BookingCard from '@app/components/booking-card'
import Empty from '@app/components/empty'
import { BookingData, BookingKey } from '@app/models/booking'
import { getBookings } from '@app/services/booking'
import { BOOKING_TABS } from '@app/types/booking'
import { StrapiPagination } from '@app/types/strapi'
import { formatBooking } from '@app/utils/booking'

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
    queryKey: ['bookings', type],
    queryFn: bookingPromises[type],
  })

  const renderItem = ({ item }: { item: BookingData }) => <BookingCard {...formatBooking(item)} />

  if (isLoading) {
    return <LoadingIndicator />
  }

  if (error || !data) {
    return <Text>{error?.message ?? 'Error'}</Text>
  }

  const ListEmptyComponent = <Empty {...BOOKING_EMPTY[type]} />

  return (
    <FlatList
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      data={data.data}
      ItemSeparatorComponent={ItemSeparatorComponent}
      style={styles.container}
      contentContainerStyle={styles.contentContainerStyle}
      ListEmptyComponent={ListEmptyComponent}
    />
  )
}

export default BookingList

const styles = StyleSheet.create({
  container: { paddingHorizontal: 24 },
  contentContainerStyle: { backgroundColor: '#fff' },
})
