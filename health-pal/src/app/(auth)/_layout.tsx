import { Stack } from 'expo-router'

import { Header } from '@/components'

const AuthLayout = () => {
  return (
    <Stack initialRouteName="login" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="sign-up" />
      <Stack.Screen
        name="profile-info"
        options={{
          headerShown: true,
          headerShadowVisible: false,
          header: ({ navigation }) => {
            return <Header title="Fill Your Profile" onBack={navigation.goBack} />
          },
        }}
      />
    </Stack>
  )
}

export default AuthLayout
