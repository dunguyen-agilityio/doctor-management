import { Link } from 'expo-router'

import { Stack } from 'tamagui'

import { YStack } from '@theme'

import { ClinicCard, LoadingIndicator, SessionHeader } from '@app/components'
import { ClinicsContext } from '@app/contexts/clinic'
import useHospitals from '@app/hooks/use-hospitals'
import { Clinic } from '@app/models/clinic'
import HospitalList from '@app/ui/hospital/hospital-list'

const renderItem = ({ item }: { item: Clinic }) => <ClinicCard w={232} h={252} px={0} {...item} />

const ItemSeparatorComponent = () => <Stack width={16} />

const NearbyMedicalCenters = () => {
  const { data, isLoading } = useHospitals()

  return (
    <YStack gap={10}>
      <SessionHeader
        title="Nearby Medical Centers"
        seeAllWrapper={({ children }) => <Link href={'/clinics'}>{children}</Link>}
      />
      <ClinicsContext value={data?.data ?? []}>
        {isLoading ? (
          <LoadingIndicator />
        ) : (
          <HospitalList
            renderItem={renderItem}
            ItemSeparatorComponent={ItemSeparatorComponent}
            horizontal
          />
        )}
      </ClinicsContext>
    </YStack>
  )
}

export default NearbyMedicalCenters
