import { Stack, StackProps } from 'tamagui'

import HospitalCardSkeleton from './hospital-card-skeleton'

const HospitalListSkeleton = ({
  horizontal = false,
  count = 5,
  gap = 16,
  ...props
}: {
  horizontal?: boolean
  count?: number
} & StackProps) => {
  return (
    <Stack
      flexDirection={horizontal ? 'row' : 'column'}
      gap={gap}
      aria-label="Loading hospitals"
      accessibilityHint="Hospital list is currently being loaded"
      role="progressbar"
      testID="hospital-skeleton"
      {...props}>
      {[...Array(count).keys()].map((v, idx) => (
        <HospitalCardSkeleton
          marginLeft={horizontal ? (idx === 0 ? 24 : 0) : undefined}
          key={v}
          width={horizontal ? 232 : 'auto'}
        />
      ))}
    </Stack>
  )
}

export default HospitalListSkeleton
