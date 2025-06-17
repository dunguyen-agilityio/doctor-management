import { router } from 'expo-router'

import { YStack } from 'tamagui'

import { ROUTES } from '@/constants'

import { Button, Header, Text } from '@/components'

const NotFoundScreen = () => {
  return (
    <YStack flex={1} backgroundColor="$background">
      <Header
        title="Page Not Found"
        onBack={() => {
          if (router.canGoBack()) {
            router.back()
            return
          }
          router.replace(ROUTES.HOME)
        }}
      />
      <YStack flex={1} gap={14} justifyContent="center" alignItems="center" paddingHorizontal={48}>
        <Text size="extraLarge" fontWeight="bold" color="$color">
          404 - Page Not Found
        </Text>
        <Text size="medium" textAlign="center">
          Sorry, the page you&apos;re looking for doesn&apos;t exist.
        </Text>
        <Button width="100%" onPress={() => router.replace(ROUTES.HOME)}>
          Go to Home
        </Button>
      </YStack>
    </YStack>
  )
}

export default NotFoundScreen
