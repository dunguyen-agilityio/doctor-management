import { Text } from 'react-native'

import { NativeStackNavigationOptions } from '@react-navigation/native-stack'
import { QueryClientProvider } from '@tanstack/react-query'
import { Redirect, Stack } from 'expo-router'

import Header from '@app/components/header'
import { useSession } from '@app/contexts/auth-context'
import { queryClient } from '@app/react-query.config'

enum APP_ROUTES {
  TAB = '(tabs)',
  FAVORITE = 'favorite',
  NOTIFICATION = 'notification',
  DOCTOR_DETAILS = 'doctors/details/[id]',
  DOCTOR_LIST = 'doctors/[specialty]',
  BOOKING = 'booking',
  CLINICS = 'clinics/index',
  CLINIC_DETAILS = 'clinics/[id]',
}

const TITLES: Record<APP_ROUTES, string> = {
  [APP_ROUTES.DOCTOR_DETAILS]: 'Doctors Details',
  [APP_ROUTES.DOCTOR_LIST]: 'All Doctors',
  [APP_ROUTES.FAVORITE]: 'Favorites',
  [APP_ROUTES.NOTIFICATION]: 'Notification',
  [APP_ROUTES.TAB]: '',
  [APP_ROUTES.BOOKING]: 'Booking Appointment',
  [APP_ROUTES.CLINICS]: 'All Clinics',
  [APP_ROUTES.CLINIC_DETAILS]: 'Clinic Details',
}

const screenOptions: NativeStackNavigationOptions = {
  header: ({ navigation, route }) => {
    const title = TITLES[route.name as APP_ROUTES]
    return title ? <Header title={title} onBack={navigation.goBack} /> : null
  },
}

export default function AppLayout() {
  const { session, isLoading } = useSession()

  if (isLoading) {
    return <Text>Loading...</Text>
  }

  if (!session) {
    return <Redirect href="/login" />
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Stack screenOptions={screenOptions}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </QueryClientProvider>
  )
}
