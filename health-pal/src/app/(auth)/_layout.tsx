import { Pressable } from 'react-native'

import { Stack, router } from 'expo-router'

import { Heading } from '@theme/heading'
import { XStack } from '@theme/stack'

import Back from '@icons/back'

const AuthLayout = ({ children, ...s }: React.PropsWithChildren) => {
  return (
    <Stack initialRouteName="login" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="sign-up" />
      <Stack.Screen
        initialParams={{ name: '' }}
        name="profile-form"
        options={{
          headerShown: true,
          headerShadowVisible: false,
          header: () => {
            return (
              <XStack alignItems="center" gap="14" paddingHorizontal={24} paddingTop={32}>
                <Pressable onPress={router.back}>
                  <Back />
                </Pressable>
                <Heading size="extraLarge" fontWeight="600">
                  Fill Your Profile
                </Heading>
              </XStack>
            )
          },
        }}
      />
    </Stack>
  )
}

export default AuthLayout
