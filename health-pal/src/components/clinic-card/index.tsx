import { Image } from 'expo-image'

import { Card, Separator, Stack } from 'tamagui'

import { Heading } from '@theme/heading'
import { XStack, YStack } from '@theme/stack'
import { Text } from '@theme/text'

import { Hospital, Routing } from '@icons'
import LocationOutline from '@icons/location-outline'

import Stars from '@app/components/stars'
import useMediaQuery, { MediaQuery } from '@app/hooks/use-media-query'
import { Clinic } from '@app/models/clinic'
import { FAVORITE_TYPES } from '@app/types/favorite'
import FavoriteButton from '@app/ui/favorite/favorite-button'

import { tokens } from '@/tamagui.config'

interface ClinicCardProps extends Clinic, MediaQuery {
  favoriteId?: string
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
  full,
  h,
  favoriteId,
  id,
  documentId,
}: ClinicCardProps) => {
  const { width, height } = useMediaQuery({ w, px, h, full })

  return (
    <Stack position="relative">
      <FavoriteButton
        color={tokens.color.white.val}
        type={FAVORITE_TYPES.HOSPITAL}
        clinicId={id}
        clinicName={name}
        favoriteId={favoriteId}
        position="absolute"
        zIndex={100}
        top={6}
        right={6}
      />
      <Card
        elevate
        bordered
        width={width}
        height={height}
        borderRadius="$2"
        overflow="hidden"
        shadowColor="$white">
        <Card.Header padding={0}>
          <Image source={image?.url} style={{ height: 120, objectFit: 'contain' }} />
        </Card.Header>

        <Card.Footer padding={12} paddingTop={8}>
          <YStack gap="$sm">
            <Heading size="small" numberOfLines={1}>
              {name}
            </Heading>

            <XStack alignItems="center" gap="$sm">
              <LocationOutline />
              <Text size="extraSmall" numberOfLines={1}>
                {address}
              </Text>
            </XStack>

            <XStack alignItems="center" gap="$sm">
              <Stars stars={rating} max={1} />
              <Text size="extraSmall">{`(${reivewCouter} Reviews)`}</Text>
            </XStack>

            <Separator backgroundColor="$grey200" />

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
    </Stack>
  )
}

export default ClinicCard
