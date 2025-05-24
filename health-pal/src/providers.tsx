import { DefaultTheme, ThemeProvider } from '@react-navigation/native'

import { ToastProvider } from '@tamagui/toast'
import { PortalProvider, TamaguiProvider } from 'tamagui'

import { tamaguiConfig } from '@/tamagui.config'

import { AppLoadingProvider, SessionProvider } from './contexts'

const Providers = ({ children }: React.PropsWithChildren) => {
  return (
    <TamaguiProvider config={tamaguiConfig} defaultTheme="light">
      <PortalProvider>
        <ToastProvider>
          <ThemeProvider value={DefaultTheme}>
            <AppLoadingProvider>
              <SessionProvider>{children}</SessionProvider>
            </AppLoadingProvider>
          </ThemeProvider>
        </ToastProvider>
      </PortalProvider>
    </TamaguiProvider>
  )
}

export default Providers
