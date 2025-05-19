import { Text } from 'react-native'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Redirect, Stack } from 'expo-router'

import { useSession } from '@app/contexts/auth-context'

// Create a client
const queryClient = new QueryClient()

export default function AppLayout() {
  const { session, isLoading } = useSession()

  // You can keep the splash screen open, or render a loading screen like we do here.
  if (isLoading) {
    return <Text>Loading...</Text>
  }

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (!session) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/login" />
  }

  // This layout can be deferred because it's not the root layout.
  return (
    <QueryClientProvider client={queryClient}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="favorite" />
        <Stack.Screen name="notification" />
        <Stack.Screen
          name="doctors/details/[id]"
          options={{
            headerTitle: 'Doctors Details',
            headerShadowVisible: false,
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="doctors/[specialty]"
          options={{
            headerTitle: 'All Doctors',
            headerShadowVisible: false,
            headerTitleAlign: 'center',
          }}
        />
      </Stack>
    </QueryClientProvider>
  )
}
