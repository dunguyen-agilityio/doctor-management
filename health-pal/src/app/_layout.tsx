import { Stack } from 'expo-router'
import { useEffect, useState } from 'react'
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter'

import * as SplashScreen from 'expo-splash-screen'
import { DevSettings } from 'react-native'

import Providers from '@app/providers'

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync()

// Set the animation options. This is optional.
SplashScreen.setOptions({
  duration: 1000,
  fade: true,
})

let AppEntryPoint = Stack

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

  if (storybookEnabled) {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    AppEntryPoint = require('@/.storybook').default
  }

  return (
    <Providers>
      <AppEntryPoint />
    </Providers>
  )
}
