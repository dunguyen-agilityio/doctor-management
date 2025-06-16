import { Stack } from 'tamagui'

import { useFavoriteHospitals } from '@/hooks/use-favorite'
import { useHospitals } from '@/hooks/use-hospitals'

import { ErrorState } from '@/components'
import HospitalListSkeleton from '@/components/skeleton/hospital-list-skeleton'

import HospitalCard from '@/ui/hospital/hospital-card'
import HospitalList, { HospitalProps } from '@/ui/hospital/hospital-list'

const ItemSeparatorComponent = () => <Stack width={16} />

const HorizontalHospitalList = (props: Partial<HospitalProps>) => {
  const { data, isLoading, error, refetch } = useHospitals()

  const { isLoading: isFavLoading } = useFavoriteHospitals()

  if (isLoading || isFavLoading) {
    return <HospitalListSkeleton horizontal count={2} marginBottom={16} />
  }

  if (error || !data) {
    return (
      <ErrorState
        title="Error Loading Favorites"
        message={`We couldn't load your favorite Hospital. Please try again.`}
        onRetry={refetch}
        aria-label="Error loading nearby hospitals"
        accessibilityHint="Retry loading the hospital list"
        role="alert"
      />
    )
  }

  const { data: hospitals } = data

  return (
    <HospitalList
      {...props}
      ItemSeparatorComponent={ItemSeparatorComponent}
      horizontal
      data={hospitals}
      estimatedItemSize={232}
      estimatedFirstItemOffset={24}
      renderItem={({ item, index }) => (
        <HospitalCard
          marginLeft={index === 0 ? 24 : 0}
          width={232}
          marginRight={index === hospitals.length - 1 ? 24 : 0}
          marginBottom={16}
          {...item}
        />
      )}
    />
  )
}

export default HorizontalHospitalList
