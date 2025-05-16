import SessionHeader from '@app/components/session-header'

import { ScrollView } from 'tamagui'

import { XStack, YStack } from '@theme'

import ClinicCard from './clinic-card'

const NearbyMedicalCenters = () => {
  return (
    <YStack gap={10} paddingBottom={16}>
      <SessionHeader title="Nearby Medical Centers" />
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <XStack gap={16}>
          <ClinicCard />
          <ClinicCard />
        </XStack>
      </ScrollView>
    </YStack>
  )
}

export default NearbyMedicalCenters
