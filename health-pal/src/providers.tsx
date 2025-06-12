import { DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { QueryClientProvider } from '@tanstack/react-query'

import { tamaguiConfig } from '@tamagui.config'
import { ToastProvider } from '@tamagui/toast'
import { PortalProvider, TamaguiProvider } from 'tamagui'

import { queryClient } from '../react-query.config'
import { AppLoadingProvider } from './contexts'

const Providers = ({ children }: React.PropsWithChildren) => {
  return (
    <QueryClientProvider client={queryClient}>
      <TamaguiProvider config={tamaguiConfig} defaultTheme="light">
        <PortalProvider>
          <ToastProvider>
            <ThemeProvider value={DefaultTheme}>
              <AppLoadingProvider>{children}</AppLoadingProvider>
            </ThemeProvider>
          </ToastProvider>
        </PortalProvider>
      </TamaguiProvider>
    </QueryClientProvider>
  )
}

export default Providers
