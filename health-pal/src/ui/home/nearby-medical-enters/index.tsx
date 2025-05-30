import { Link } from 'expo-router'

import { Stack } from 'tamagui'

import { YStack } from '@theme'

import { LoadingIndicator, SessionHeader } from '@app/components'
import ErrorState from '@app/components/error'
import { useFavoriteHospitals } from '@app/hooks/use-favorite'
import useHospitals from '@app/hooks/use-hospitals'
import HospitalList from '@app/ui/hospital/hospital-list'

const ItemSeparatorComponent = () => <Stack width={16} />

const seeAllWrapper = ({ children }: React.PropsWithChildren) => (
  <Link href={'/hospitals'}>{children}</Link>
)

const NearbyMedicalCenters = () => {
  const { data, isLoading, error, refetch } = useHospitals()

  const { isLoading: isFavLoading } = useFavoriteHospitals()

  const renderHospitalList = () => {
    if (isLoading || isFavLoading) {
      return <LoadingIndicator />
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

    return (
      <HospitalList
        ItemSeparatorComponent={ItemSeparatorComponent}
        horizontal
        data={data.data}
        estimatedItemSize={232}
      />
    )
  }

  return (
    <YStack gap={10}>
      <SessionHeader title="Nearby Medical Centers" seeAllWrapper={seeAllWrapper} />
      {renderHospitalList()}
    </YStack>
  )
}

export default NearbyMedicalCenters
