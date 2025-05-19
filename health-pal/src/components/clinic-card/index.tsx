import { Image } from 'expo-image'

import { Card, Separator } from 'tamagui'

import { Heading } from '@theme/heading'
import { XStack, YStack } from '@theme/stack'
import { Text } from '@theme/text'

import { Hospital, Routing } from '@icons'
import LocationOutline from '@icons/location-outline'

import Stars from '@app/components/stars'
import useMediaQuery from '@app/hooks/use-media-query'
import { Clinic } from '@app/models/clinic'

interface ClinicCardProps extends Clinic {
  w?: number
  px?: number
}

const ClinicCard = ({
  image = require('@/assets/images/banner01.webp'),
  address,
  name,
  rating = 0,
  reivewCouter = 0,
  w = 342,
  type,
  px,
}: ClinicCardProps) => {
  const { width } = useMediaQuery({ w, px })

  return (
    <Card elevate bordered width={width} borderRadius="$2" overflow="hidden" shadowColor="$white">
      <Card.Header padding={0}>
        <Image source={image?.url} style={{ height: 120, objectFit: 'contain' }} />
      </Card.Header>

      <Card.Footer padding={12} paddingTop={8}>
        <YStack gap="$sm">
          <Heading size="small">{name}</Heading>

          <XStack alignItems="center" gap="$sm">
            <LocationOutline />
            <Text size="extraSmall">{address}</Text>
          </XStack>

          <XStack alignItems="center" gap="$sm">
            <Stars stars={rating} max={1} />
            <Text size="extraSmall">{`(${reivewCouter} Reviews)`}</Text>
          </XStack>

          <Separator backgroundColor="$grey200" marginVertical={12} />

          <XStack justifyContent="space-between">
            <XStack alignItems="center" gap="$sm">
              <Routing />
              <Text size="extraSmall">2.5 km/40min</Text>
            </XStack>

            <XStack alignItems="center" gap="$sm">
              <Hospital />
              <Text size="extraSmall">{type}</Text>
            </XStack>
          </XStack>
        </YStack>
      </Card.Footer>
    </Card>
  )
}

export default ClinicCard
