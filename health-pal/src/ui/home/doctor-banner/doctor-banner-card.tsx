import { Image } from 'expo-image'

import { StackProps } from 'tamagui'

import { Heading, Text, YStack } from '@app/components'

import { TDoctorBanner } from '@app/types/doctor'

const DoctorBannerCard = ({
  title,
  description,
  image = require('@/assets/images/banner01.webp'),
  ...props
}: StackProps & TDoctorBanner) => {
  return (
    <YStack
      {...props}
      alignSelf="center"
      position="relative"
      paddingLeft={12}
      paddingTop={32}
      borderRadius={12}
      overflow="hidden"
      gap="$sm">
      <Image source={image} style={{ position: 'absolute', inset: 0 }} />
      <Heading color="$white">{title}</Heading>
      <Text size="extraSmall" color="$white" fontWeight="400">
        {description}
      </Text>
    </YStack>
  )
}

export default DoctorBannerCard
