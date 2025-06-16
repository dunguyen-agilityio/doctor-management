import { Stack, StackProps } from 'tamagui'

import DoctorCardSkeleton from './doctor-card-skeleton'

const DoctorListSkeleton = ({
  horizontal = false,
  count = 5,
  gap = '$sm',
}: {
  horizontal?: boolean
  count?: number
} & StackProps) => {
  return (
    <Stack
      testID="doctor-list-skeleton"
      flexDirection={horizontal ? 'row' : 'column'}
      gap={gap}
      paddingHorizontal="$md">
      {[...Array(count).keys()].map((v) => (
        <DoctorCardSkeleton key={v} />
      ))}
    </Stack>
  )
}

export default DoctorListSkeleton
