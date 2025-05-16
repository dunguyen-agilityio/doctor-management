import SearchInput from '@app/components/search-input'
import Categories from '@app/ui/home/categories'
import DoctorBanner from '@app/ui/home/doctor-banner'
import NearbyMedicalCenters from '@app/ui/home/nearby-edical-enters'

import { ScrollView } from 'tamagui'

import { YStack } from '@theme/stack'

const Home = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
      <YStack flex={1} px="$md" gap="$md" overflow="visible">
        <SearchInput placeholder="Search doctor..." />
        <DoctorBanner />
        <Categories />
        <NearbyMedicalCenters />
      </YStack>
    </ScrollView>
  )
}

export default Home
