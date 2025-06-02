import React from 'react'

import { Stack, StackProps } from 'tamagui'

import { BOOKING_TABS } from '@app/types/booking'

import BookingCardSkeleton from './booking-card-skeleton'

const BookingListSkeleton = ({
  count = 4,
  type,
  ...props
}: {
  count?: number
  type: BOOKING_TABS
} & StackProps) => {
  return (
    <Stack flexDirection="column" paddingHorizontal={24} {...props}>
      {[...Array(count).keys()].map((v) => (
        <BookingCardSkeleton key={v} type={type} />
      ))}
    </Stack>
  )
}

export default BookingListSkeleton
