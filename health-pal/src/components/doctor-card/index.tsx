import { Image } from 'expo-image'
import { Link } from 'expo-router'

import { Separator } from 'tamagui'

import { Heading, Text, XStack, YStack } from '@theme'

import { HeartFill, HeartOutline } from '@icons'

import useMediaQuery from '@app/hooks/use-media-query'
import { TDoctorCard } from '@app/models/doctor'

import { tokens } from '@/tamagui.config'

import Stars from '../stars'

interface DoctorCardProps extends TDoctorCard {
  favorite?: boolean
}

const DoctorCard = ({
  avatar,
  name,
  specialty,
  address,
  reviewCounter = 0,
  rating = 0,
  documentId,
  favorite = false,
}: DoctorCardProps) => {
  const { width, height } = useMediaQuery({ h: 133, full: true })

  const FavoriteIcon = favorite ? HeartFill : HeartOutline

  return (
    <Link
      style={{ width, height }}
      href={{ pathname: `/(app)/doctors/details/[id]`, params: { id: documentId } }}>
      <XStack
        padding={12}
        borderWidth={0.5}
        borderRadius={12}
        borderColor="$grey100"
        shadowColor="$black"
        shadowOffset={{ width: 4, height: 4 }}
        shadowOpacity={0.1}
        gap={12}
        shadowRadius={12}
        elevation={3}
        pressStyle={{ scale: 0.98 }}
        pointerEvents="none">
        <Image source={avatar} style={{ width: 110, height: 110, borderRadius: 12 }} />
        <YStack>
          <XStack justifyContent="space-between" alignItems="center">
            <Heading>{name}</Heading>
            <FavoriteIcon fill={tokens.color.deepPink.val} width={15} height={15} />
          </XStack>
          <Separator marginVertical={8} />
          <Text size="small" fontWeight="600">
            {specialty}
          </Text>
          <Text numberOfLines={1} size="small">
            {address}
          </Text>
          <XStack alignItems="center">
            <Stars color="#feb052" stars={rating} max={1} flexDirection="row-reverse" size={15} />
            <Separator vertical marginHorizontal={8} height={13} />
            <Text size="extraSmall">{`${reviewCounter} Reviews`}</Text>
          </XStack>
        </YStack>
      </XStack>
    </Link>
  )
}

export default DoctorCard
