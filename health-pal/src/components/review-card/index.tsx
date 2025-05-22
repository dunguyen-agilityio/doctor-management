import { StyleSheet } from 'react-native'

import { Image } from 'expo-image'

import { Text, XStack, YStack } from '@theme'

import { ReviewData } from '@app/models/review'

import Stars from '../stars'

const ReviewCard = ({ name, rating, comment, image }: ReviewData) => {
  return (
    <YStack>
      <YStack gap={12}>
        <XStack gap={10} alignItems="center">
          <Image source={image} style={styles.avatar} />
          <YStack gap="$sm">
            <Text size="large" fontWeight="700">
              {name}
            </Text>
            <Stars size={12} stars={rating} />
          </YStack>
        </XStack>
        <Text size="small" color="$grey500" marginTop={5}>
          {comment}
        </Text>
      </YStack>
    </YStack>
  )
}

const styles = StyleSheet.create({
  avatar: {
    width: 56,
    height: 56,
    backgroundColor: 'red',
    borderRadius: 56,
  },
})

export default ReviewCard
