import { RelativePathString, Stack, router } from 'expo-router'

import Header from '@app/components/header'

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
          header: ({ route, navigation: { canGoBack, goBack } }) => {
            const handleBack = () => {
              if (route.params && 'from' in route.params) {
                router.navigate(route.params.from as RelativePathString)
                return
              }

              if (canGoBack()) goBack()

              router.push('/sign-up')
            }

            return <Header title="Fill Your Profile" onBack={handleBack} />
          },
        }}
      />
    </Stack>
  )
}

export default AuthLayout
