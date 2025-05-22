import { Link } from 'expo-router'

import { Stack } from 'tamagui'

import { Text, YStack } from '@theme'

import { ClinicCard, LoadingIndicator, SessionHeader } from '@app/components'
import useHospitals from '@app/hooks/use-hospitals'
import { Clinic } from '@app/models/clinic'
import HospitalList from '@app/ui/hospital/hospital-list'

const renderItem = ({ item }: { item: Clinic }) => <ClinicCard w={232} h={252} px={0} {...item} />

const ItemSeparatorComponent = () => <Stack width={16} />

const seeAllWrapper = ({ children }: React.PropsWithChildren) => (
  <Link href={'/clinics'}>{children}</Link>
)

const NearbyMedicalCenters = () => {
  const { data, isLoading, error } = useHospitals()

  if (isLoading) return <LoadingIndicator />

  if (error || !data) {
    return <Text>Error</Text>
  }

  return (
    <YStack gap={10}>
      <SessionHeader title="Nearby Medical Centers" seeAllWrapper={seeAllWrapper} />

      <HospitalList
        renderItem={renderItem}
        ItemSeparatorComponent={ItemSeparatorComponent}
        horizontal
        data={data.data}
      />
    </YStack>
  )
}

export default NearbyMedicalCenters
