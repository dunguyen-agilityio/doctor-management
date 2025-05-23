import { ScrollView } from 'tamagui'

import { XStack, YStack } from '@theme/stack'

import { SearchInput } from '@app/components'
import { FavoriteProvider } from '@app/contexts/favorite'
import { DoctorBanner, NearbyMedicalCenters, Specialties } from '@app/ui/home'

const Home = () => {
  return (
    <ScrollView
      backgroundColor="$white"
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}>
      <YStack gap="$md" overflow="visible">
        <XStack px="$md">
          <SearchInput placeholder="Search doctor..." />
        </XStack>
        <DoctorBanner />
        <YStack px="$md" gap="$md">
          <Specialties />
          <FavoriteProvider>
            <NearbyMedicalCenters />
          </FavoriteProvider>
        </YStack>
      </YStack>
    </ScrollView>
  )
}

export default Home
