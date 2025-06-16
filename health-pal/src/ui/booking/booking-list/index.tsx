import { BookingData, BookingKey } from '@/models/booking'
import { formatBooking } from '@/utils/booking'
import { keyExtractor } from '@/utils/list'
import { getMediaQuery } from '@/utils/media-query'
import { FlashList } from '@shopify/flash-list'

import { StyleSheet } from 'react-native'

import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'

import { View } from 'tamagui'

import { BOOKING_EMPTY, WINDOW_SIZE } from '@/constants'

import { useRequireAuth } from '@/hooks/use-require-auth'

import { Empty, ErrorState } from '@/components'
import BookingListSkeleton from '@/components/skeleton/booking-list-skeleton'

import { getBookings } from '@/services/booking'

import { BOOKING_TABS } from '@/types/booking'
import { StrapiPagination } from '@/types/strapi'

import BookingCard from '../booking-card'

const BookingList = ({ type }: { type: BOOKING_TABS }) => {
  const { session } = useRequireAuth()
  const { id: userId } = session.user

  const bookingPromises: Record<BOOKING_TABS, () => Promise<StrapiPagination<BookingData>>> = {
    [BOOKING_TABS.CANCELED]: () =>
      getBookings({ filters: [{ key: BookingKey.type, query: BOOKING_TABS.CANCELED }], userId }),
    [BOOKING_TABS.COMPLETED]: () =>
      getBookings({ filters: [{ key: BookingKey.type, query: BOOKING_TABS.COMPLETED }], userId }),
    [BOOKING_TABS.UPCOMING]: () => {
      const now = dayjs()
      return getBookings({
        filters: [
          { key: BookingKey.type, query: BOOKING_TABS.UPCOMING },
          {
            key: 'filters[date][$gt]',
            query: now.toISOString(),
          },
        ],
        userId,
      })
    },
  }

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
    <View minWidth={WINDOW_SIZE.width - 24 * 2} flex={1}>
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
    </View>
  )
}

export default BookingList

const styles = StyleSheet.create({
  contentContainerStyle: { paddingHorizontal: 24 },
})
