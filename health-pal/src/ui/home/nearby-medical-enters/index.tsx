import { Link } from 'expo-router'

import { Stack } from 'tamagui'

import { YStack } from '@theme'

import { ClinicCard, LoadingIndicator, SessionHeader } from '@app/components'
import ErrorState from '@app/components/error'
import { useSession } from '@app/contexts'
import { useFavoriteHospitals } from '@app/hooks/use-favorite'
import useHospitals from '@app/hooks/use-hospitals'
import { Clinic } from '@app/models/clinic'
import HospitalList from '@app/ui/hospital/hospital-list'

const ItemSeparatorComponent = () => <Stack width={16} />

const seeAllWrapper = ({ children }: React.PropsWithChildren) => (
  <Link href={'/clinics'}>{children}</Link>
)

const NearbyMedicalCenters = () => {
  const { data, isLoading, error, refetch } = useHospitals()
  const { session } = useSession()
  const { jwt, user } = session ?? {}
  const { isLoading: isFavLoading } = useFavoriteHospitals(user!.id, jwt!)

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

    const renderItem = ({ item }: { item: Clinic }) => {
      return <ClinicCard w={232} px={0} {...item} />
    }

    return (
      <HospitalList
        renderItem={renderItem}
        ItemSeparatorComponent={ItemSeparatorComponent}
        horizontal
        data={data.data}
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
