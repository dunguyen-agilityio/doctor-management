import { Link } from 'expo-router'

import { ScrollView } from 'tamagui'

import { SearchInput, SessionHeader, XStack, YStack } from '@app/components'

import { DoctorBanner, HorizontalHospitalList, Specialties } from '@app/ui/home'

const Home = () => {
  return (
    <ScrollView
      backgroundColor="$white"
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      accessibilityLabel="Home screen"
      accessibilityHint="Browse doctors, specialties, and medical centers"
      role="main">
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
            tabIndex={0}
            accessibilityHint="Opens the doctor list search screen"
            aria-label="Navigate to doctor list search"
            role="link">
            <SearchInput
              width="100%"
              placeholder="Search doctor..."
              pointerEvents="none"
              editable={false}
            />
          </Link>
        </XStack>
        <DoctorBanner />
        <YStack gap={10}>
          <SessionHeader
            title="Categories"
            seeAllWrapper={({ children }) => (
              <Link
                href={{ pathname: '/doctors/[specialty]', params: { specialty: 'all' } }}
                tabIndex={0}
                role="link"
                aria-label="View all specialties"
                accessibilityHint="Navigates to the doctor list with all specialties">
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
              seeAllWrapper={({ children }) => (
                <Link
                  href="/hospitals"
                  tabIndex={0}
                  role="link"
                  aria-label="View all medical centers"
                  accessibilityHint="Navigates to the doctor list with medical center filter'">
                  {children}
                </Link>
              )}
            />
            <HorizontalHospitalList
              accessibilityLabel="Nearby medical centers"
              accessibilityHint="List of hospitals near your location"
              accessibilityRole="list"
            />
          </YStack>
        </YStack>
      </YStack>
    </ScrollView>
  )
}

export default Home
