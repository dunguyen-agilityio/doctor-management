import { NativeStackNavigationOptions } from '@react-navigation/native-stack'
import { Redirect, Stack } from 'expo-router'

import { APP_TITLES } from '@app/constants/route'

import { LoadingIndicator } from '@app/components'
import Header from '@app/components/header'
import { useSession } from '@app/contexts/auth-context'
import { APP_ROUTES } from '@app/types/route'

const screenOptions: NativeStackNavigationOptions = {
  header: ({ navigation, route }) => {
    const title = APP_TITLES[route.name as APP_ROUTES]
    return title ? <Header title={title} onBack={navigation.goBack} /> : null
  },
}

export default function AppLayout() {
  const { session, isLoading } = useSession()

  if (isLoading) {
    return <LoadingIndicator />
  }

  if (!session?.jwt) {
    return <Redirect href="/login" />
  }

  return (
    <Stack screenOptions={screenOptions}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  )
}
