import { Stack } from 'tamagui'

import { HospitalCard } from '@app/components'
import ErrorState from '@app/components/error'
import HospitalListSkeleton from '@app/components/skeleton/hospital-list-skeleton'
import { useFavoriteHospitals } from '@app/hooks/use-favorite'
import useHospitals from '@app/hooks/use-hospitals'
import HospitalList from '@app/ui/hospital/hospital-list'

const ItemSeparatorComponent = () => <Stack width={16} />

const NearbyMedicalCenters = () => {
  const { data, isLoading, error, refetch } = useHospitals()

  const { isLoading: isFavLoading } = useFavoriteHospitals()

  if (isLoading || isFavLoading) {
    return <HospitalListSkeleton horizontal count={2} />
  }

  if (error || !data) {
    return (
      <ErrorState
        title="Error Loading Favorites"
        message={`We couldn't load your favorite Hospital. Please try again.`}
        onRetry={refetch}
      />
    )
  }

  const { data: hospitals } = data

  return (
    <HospitalList
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
          {...item}
        />
      )}
    />
  )
}

export default NearbyMedicalCenters
