import { Stack } from 'expo-router'

import { YStack } from 'tamagui'

import Logo from '@icons/logo'

const renderAuthHeader = () => (
  <YStack paddingTop={32}>
    <Logo />
  </YStack>
)

const AuthLayout = ({ children, ...s }: React.PropsWithChildren) => {
  return (
    <Stack
      screenOptions={{
        header: renderAuthHeader,
      }}
      initialRouteName="login">
      <Stack.Screen name="login" />
      <Stack.Screen name="sign-up" />
    </Stack>
  )
}

export default AuthLayout
