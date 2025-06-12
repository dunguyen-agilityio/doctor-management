import { ReviewData } from '@/models/review'

import { StyleSheet } from 'react-native'

import { Text, XStack, YStack } from '@/components/common'

import CloudinaryImage from '../cloudinary-image'
import Stars from '../stars'

const ReviewCard = ({ name, rating, comment, image }: ReviewData) => {
  const avatar = image ? { uri: image } : require('@assets/images/user01.png')

  return (
    <YStack>
      <YStack gap={12}>
        <XStack gap={10} alignItems="center">
          <CloudinaryImage source={avatar} style={styles.avatar} />
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
