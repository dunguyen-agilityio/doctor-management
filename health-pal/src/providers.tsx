import { DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { QueryClientProvider } from '@tanstack/react-query'

import { ToastProvider } from '@tamagui/toast'
import { PortalProvider, TamaguiProvider } from 'tamagui'

import { tamaguiConfig } from '@/tamagui.config'

import { AppLoadingProvider, SessionProvider } from './contexts'
import { queryClient } from './react-query.config'

const Providers = ({ children }: React.PropsWithChildren) => {
  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  )
}

export default Providers
