import Providers from '@/providers'
import { useAuthStore } from '@/stores/auth'

import { useEffect, useState } from 'react'
import { DevSettings } from 'react-native'

import { loadAsync } from 'expo-font'
import { Slot } from 'expo-router'
import { getItemAsync } from 'expo-secure-store'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'

import { tokens } from '@tamagui.config'
import { ToastViewport } from '@tamagui/toast'

import { useAppLinking } from '@/hooks/use-app-linking'

import { PreventBackHandler, Toast } from '@/components'

import { getProfile } from '@/services/auth'

SplashScreen.preventAutoHideAsync()

SplashScreen.setOptions({
  duration: 1000,
  fade: true,
})

export default function RootLayout() {
  const [storybookEnabled, setStorybookEnabled] = useState(
    !!process.env.EXPO_PUBLIC_STORYBOOK_ENABLED,
  )

  const { setUser, setIsAuthenticated } = useAuthStore()

  const [loaded, setLoaded] = useState(false)

  useAppLinking()

  useEffect(() => {
    const initial = async () => {
      setLoaded(false)
      const jwt = await getItemAsync('session')
      if (jwt) {
        const profile = await getProfile(jwt)

        if (profile) {
          setUser(profile)
          setIsAuthenticated(true)
        }
      }

      await loadAsync({
        Inter_400Regular: require('@assets/fonts/Inter_18pt-Regular.ttf'),
        Inter_500Medium: require('@assets/fonts/Inter_18pt-Medium.ttf'),
        Inter_600SemiBold: require('@assets/fonts/Inter_18pt-SemiBold.ttf'),
        Inter_700Bold: require('@assets/fonts/Inter_18pt-Bold.ttf'),
      })

      SplashScreen.hide()
      setLoaded(true)
    }

    initial()

    if (__DEV__) {
      DevSettings.addMenuItem('Toggle Storybook', () => {
        setStorybookEnabled((prev) => !prev)
      })
    }
  }, [setIsAuthenticated, setUser])

  if (!loaded) {
    return null
  }

  const render = () => {
    if (__DEV__ && storybookEnabled) {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const AppEntryPoint = require('@storybook').default
      return <AppEntryPoint />
    }

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: tokens.color.white.val }}>
        <GestureHandlerRootView>
          <StatusBar />
          <PreventBackHandler>
            <Slot />
          </PreventBackHandler>
          <ToastViewport />
          <Toast />
        </GestureHandlerRootView>
      </SafeAreaView>
    )
  }

  return <Providers>{render()}</Providers>
}
