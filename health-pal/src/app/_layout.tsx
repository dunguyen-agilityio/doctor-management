import { useEffect, useState } from 'react'
import { DevSettings } from 'react-native'

import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter'
import { useFonts } from 'expo-font'
import { Slot } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'

import { ToastViewport } from '@tamagui/toast'

import PreventBackHandler from '@app/components/prevent-back-handler'
import Toast from '@app/components/toast'
import Providers from '@app/providers'

import { tokens } from '@/tamagui.config'

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync()

// Set the animation options. This is optional.
SplashScreen.setOptions({
  duration: 1000,
  fade: true,
})

export default function RootLayout() {
  const [storybookEnabled, setStorybookEnabled] = useState(
    !!process.env.EXPO_PUBLIC_STORYBOOK_ENABLED,
  )

  const [loaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  })

  useEffect(() => {
    if (__DEV__) {
      DevSettings.addMenuItem('Toggle Storybook', () => {
        setStorybookEnabled((prev) => !prev)
      })
    }
  }, [])

  useEffect(() => {
    if (loaded) {
      SplashScreen.hide()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  const render = () => {
    if (storybookEnabled) {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const AppEntryPoint = require('@/.storybook').default
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
