import { RouteProp } from '@react-navigation/native'
import {
  NativeStackHeaderProps,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack'
import { Stack } from 'expo-router'

import { APP_TITLES } from '@app/constants/route'

import Header from '@app/components/header'
import { APP_ROUTES, AppParamList } from '@app/types/route'
import { DoctorDetailHeader } from '@app/ui/doctor'

const renderDoctorHeader = ({ navigation, route }: NativeStackHeaderProps) => (
  <DoctorDetailHeader
    goBack={navigation.goBack}
    id={(route as RouteProp<AppParamList, APP_ROUTES.DOCTOR_DETAILS>).params.id}
  />
)

const screenOptions: NativeStackNavigationOptions = {
  header: ({ navigation, route }) => {
    const title = APP_TITLES[route.name as APP_ROUTES]
    return title ? <Header title={title} onBack={navigation.goBack} /> : null
  },
}

const DoctorLayout = () => {
  return (
    <Stack screenOptions={screenOptions}>
      <Stack.Screen
        name={APP_ROUTES.DOCTOR_DETAILS}
        options={{
          header: renderDoctorHeader,
        }}
      />
      <Stack.Screen name={APP_ROUTES.DOCTOR_LIST} />
    </Stack>
  )
}

export default DoctorLayout
