import { NativeStackNavigationOptions } from '@react-navigation/native-stack'
import { Stack } from 'expo-router'

import { APP_TITLES } from '@app/constants/route'

import Header from '@app/components/header'

import { APP_ROUTES } from '@app/types/route'

const screenOptions: NativeStackNavigationOptions = {
  header: ({ navigation, route }) => {
    const title = APP_TITLES[route.name as APP_ROUTES]
    return title ? <Header title={title} onBack={navigation.goBack} /> : null
  },
}

const DoctorLayout = () => {
  return (
    <Stack screenOptions={screenOptions}>
      <Stack.Screen name={APP_ROUTES.DOCTOR_LIST} />
    </Stack>
  )
}

export default DoctorLayout
