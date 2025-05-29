import { Link } from 'expo-router'

import { ScrollView } from 'tamagui'

import { XStack, YStack } from '@theme/stack'

import { SearchInput } from '@app/components'
import { DoctorBanner, NearbyMedicalCenters, Specialties } from '@app/ui/home'

const Home = () => {
  return (
    <ScrollView
      backgroundColor="$white"
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}>
      <YStack gap="$md" overflow="visible">
        <XStack px="$md">
          <Link
            href={{
              pathname: '/(app)/doctors/[specialty]',
              params: {
                specialty: 'all',
                searching: 'true',
              },
            }}
            style={{ flex: 1 }}>
            <SearchInput placeholder="Search doctor..." editable={false} />
          </Link>
        </XStack>
        <DoctorBanner />
        <YStack px="$md" gap="$md">
          <Specialties />
          <NearbyMedicalCenters />
        </YStack>
      </YStack>
    </ScrollView>
  )
}

export default Home
