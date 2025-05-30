import { Image } from 'expo-image'

import { Card, Separator } from 'tamagui'

import { Heading } from '@theme/heading'
import { XStack } from '@theme/stack'
import { Text } from '@theme/text'

import { Hospital as HospitalIcon, Routing } from '@icons'
import LocationOutline from '@icons/location-outline'

import Stars from '@app/components/stars'
import { Hospital } from '@app/models/hospital'
import { useFavoritesStore } from '@app/stores/favorite'
import { FAVORITE_TYPES } from '@app/types/favorite'
import FavoriteButton from '@app/ui/favorite/favorite-button'

interface HospitalCardProps extends Hospital {}

const HospitalCard = ({
  image = require('@/assets/images/banner01.webp'),
  address,
  name,
  rating = 4.2,
  reviewCounter = 23,
  type = 'Hospital',
  id,
}: HospitalCardProps) => {
  const favoriteId = useFavoritesStore((state) => state.favoriteHospitals[id])

  return (
    <Card
      elevate
      bordered
      borderRadius="$2"
      overflow="hidden"
      elevation={3}
      shadowColor="$black"
      shadowOffset={{ width: 4, height: 4 }}>
      <Card.Header padding={0}>
        <Image source={image?.url} style={{ height: 120, objectFit: 'contain' }} />
        <FavoriteButton
          favoriteId={favoriteId}
          itemId={id}
          itemName={name}
          type={FAVORITE_TYPES.HOSPITAL}
          top={6}
          right={6}
          position="absolute"
          testID="favorite-button"
        />
      </Card.Header>

      <Card.Footer padding={12} paddingTop={8} gap="$sm" flexDirection="column">
        <Heading size="small" numberOfLines={1}>
          {name}
        </Heading>

        <XStack alignItems="center" gap="$sm">
          <LocationOutline testID="location-icon" />
          <Text size="extraSmall" numberOfLines={1}>
            {address}
          </Text>
        </XStack>

        <XStack alignItems="center" gap="$sm">
          <Stars stars={rating} max={1} />
          <Text size="extraSmall">{`(${reviewCounter} Reviews)`}</Text>
        </XStack>

        <Separator backgroundColor="$grey200" />

        <XStack justifyContent="space-between">
          <XStack alignItems="center" gap="$sm">
            <Routing testID="routing-icon" />
            <Text size="extraSmall">2.5 km/40min</Text>
          </XStack>

          <XStack alignItems="center" gap="$sm">
            <HospitalIcon testID="hospital-icon" />
            <Text size="extraSmall">{type}</Text>
          </XStack>
        </XStack>
      </Card.Footer>
    </Card>
  )
}

export default HospitalCard
