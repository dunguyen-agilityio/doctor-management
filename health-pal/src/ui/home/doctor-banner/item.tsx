import React from 'react'

import { Image } from 'expo-image'

import { YStack } from 'tamagui'

import { Heading, Text } from '@theme'

const Item = () => {
  return (
    <YStack
      position="relative"
      h={163}
      w={336}
      borderRadius={12}
      paddingLeft={12}
      paddingTop={32}
      gap="$sm">
      <Image
        source={require('@/assets/images/banner01.webp')}
        style={{ position: 'absolute', inset: 0 }}
      />
      <Heading color="$white">{`Looking for\nSpecialist Doctors?`}</Heading>
      <Text
        size="extraSmall"
        color="$white"
        fontWeight="400">{`Schedule an appointment with\nour top doctors.`}</Text>
    </YStack>
  )
}

export default Item
