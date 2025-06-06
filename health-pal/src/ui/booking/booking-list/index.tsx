import { FlashList } from '@shopify/flash-list'

import { StyleSheet } from 'react-native'

import { useQuery } from '@tanstack/react-query'

import { BOOKING_EMPTY } from '@app/constants'

import { Empty, ErrorState } from '@app/components'
import BookingListSkeleton from '@app/components/skeleton/booking-list-skeleton'

import { getBookings } from '@app/services/booking'

import { BOOKING_TABS } from '@app/types/booking'
import { StrapiPagination } from '@app/types/strapi'

import { BookingData, BookingKey } from '@app/models/booking'
import { formatBooking } from '@app/utils/booking'
import { keyExtractor } from '@app/utils/list'
import { getMediaQuery } from '@app/utils/media-query'

import BookingCard from '../booking-card'

const bookingPromises: Record<BOOKING_TABS, () => Promise<StrapiPagination<BookingData>>> = {
  [BOOKING_TABS.CANCELED]: () =>
    getBookings({ filters: [{ key: BookingKey.type, query: BOOKING_TABS.CANCELED }] }),
  [BOOKING_TABS.COMPLETED]: () =>
    getBookings({ filters: [{ key: BookingKey.type, query: BOOKING_TABS.COMPLETED }] }),
  [BOOKING_TABS.UPCOMING]: () =>
    getBookings({ filters: [{ key: BookingKey.type, query: BOOKING_TABS.UPCOMING }] }),
}

const BookingList = ({ type }: { type: BOOKING_TABS }) => {
  const { width } = getMediaQuery({ full: true, width: 342, px: 24 })

  const { isLoading, isFetching, data, error, refetch } = useQuery({
    queryKey: ['bookings', type],
    queryFn: bookingPromises[type],
  })

  const renderItem = ({ item }: { item: BookingData }) => <BookingCard {...formatBooking(item)} />

  if (isLoading || isFetching) {
    return <BookingListSkeleton type={type} />
  }

  if (error || !data) {
    return (
      <ErrorState
        message={error?.message ?? 'Failed to fetch!'}
        aria-label="Error loading bookings"
        accessibilityHint="Failed to load bookings, press retry to try again"
        onRetry={refetch}
      />
    )
  }

  const ListEmptyComponent = (
    <Empty
      {...BOOKING_EMPTY[type]}
      aria-label={`No ${type.toLowerCase()} bookings`}
      accessibilityHint={`No ${type.toLowerCase()} bookings available`}
    />
  )

  return (
    <FlashList
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      data={data.data}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.contentContainerStyle}
      ListEmptyComponent={ListEmptyComponent}
      estimatedItemSize={width}
      aria-label={`${type} bookings list`}
      accessibilityHint={`List of ${type.toLowerCase()} bookings`}
      role="list"
    />
  )
}

export default BookingList

const styles = StyleSheet.create({
  contentContainerStyle: { paddingHorizontal: 24 },
})
