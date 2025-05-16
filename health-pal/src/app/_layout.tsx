import { SessionProvider } from '@app/contexts/auth-context'
import AppLoadingProvider from '@app/contexts/loading'
import Providers from '@app/providers'

import { useEffect, useState } from 'react'
import { DevSettings } from 'react-native'

import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  useFonts,
} from '@expo-google-fonts/inter'
import { Slot } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { SafeAreaView } from 'react-native-safe-area-context'

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
        <SessionProvider>
          <AppLoadingProvider>
            <Slot />
          </AppLoadingProvider>
        </SessionProvider>
      </SafeAreaView>
    )
  }

  return <Providers>{render()}</Providers>
}
