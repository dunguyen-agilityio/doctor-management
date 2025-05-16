import Stars from '@app/components/stars'

import { Image } from 'expo-image'

import { Footprints, Hospital, MapPin } from '@tamagui/lucide-icons'
import { Card } from 'tamagui'

import { Heading } from '@theme/heading'
import { XStack, YStack } from '@theme/stack'
import { Text } from '@theme/text'

const ClinicCard = () => {
  return (
    <Card elevate bordered width={232} borderRadius="$2" overflow="hidden" shadowColor="$white">
      <Card.Header padding={0}>
        <Image source={require('@/assets/images/banner01.webp')} style={{ height: 120 }} />
      </Card.Header>

      <Card.Footer padding={12} paddingTop={8}>
        <YStack gap="$sm">
          <Heading size="small">Sunrise Health Clinic</Heading>

          <XStack alignItems="center" gap="$sm">
            <MapPin size={16} color="#777" />
            <Text size="extraSmall">123 Oak Street, CA 98765</Text>
          </XStack>

          <XStack alignItems="center" gap="$sm">
            <Stars stars={4.5} />
            <Text size="extraSmall">(58 Reviews)</Text>
          </XStack>

          <XStack justifyContent="space-between" backgroundColor={'red'}>
            <XStack alignItems="center" gap="$sm">
              <Footprints size={14} color="#777" />
              <Text size="extraSmall">2.5 km/40min</Text>
            </XStack>

            <XStack alignItems="center" gap="$sm">
              <Hospital size={14} color="#777" />
              <Text size="extraSmall">Hospital</Text>
            </XStack>
          </XStack>
        </YStack>
      </Card.Footer>
    </Card>
  )
}

export default ClinicCard
