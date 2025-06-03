import { Link } from 'expo-router'

import { ScrollView } from 'tamagui'

import { XStack, YStack } from '@theme/stack'

import { SearchInput, SessionHeader } from '@app/components'
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
            }}>
            <SearchInput placeholder="Search doctor..." editable={false} />
          </Link>
        </XStack>
        <DoctorBanner />
        <YStack gap={10}>
          <SessionHeader
            title="Categories"
            seeAllWrapper={({ children }) => (
              <Link href={{ pathname: '/doctors/[specialty]', params: { specialty: 'all' } }}>
                {children}
              </Link>
            )}
          />
          <YStack paddingHorizontal="$md">
            <Specialties />
          </YStack>
          <YStack gap={10} marginTop={16}>
            <SessionHeader
              title="Nearby Medical Centers"
              seeAllWrapper={({ children }) => <Link href={'/hospitals'}>{children}</Link>}
            />
            <NearbyMedicalCenters />
          </YStack>
        </YStack>
      </YStack>
    </ScrollView>
  )
}

export default Home
