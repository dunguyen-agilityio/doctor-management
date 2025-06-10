import { NativeStackNavigationOptions } from '@react-navigation/native-stack'
import { Redirect, Stack } from 'expo-router'

import { APP_TITLES } from '@app/constants/route'

import { useSession } from '@app/hooks/use-session'

import Header from '@app/components/header'

import { APP_ROUTES } from '@app/types'

const screenOptions: NativeStackNavigationOptions = {
  header: ({ navigation, route }) => {
    const title = APP_TITLES[route.name as APP_ROUTES]
    return title ? <Header title={title} onBack={navigation.goBack} /> : null
  },
}

export default function AppLayout() {
  const { session } = useSession()

  if (!session.isAuthenticated) {
    return <Redirect href="/login" />
  }

  return (
    <Stack screenOptions={screenOptions}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  )
}
