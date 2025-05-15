import { DefaultTheme, ThemeProvider } from '@react-navigation/native'

import { PortalProvider, TamaguiProvider } from 'tamagui'

import { tamaguiConfig } from '@/tamagui.config'

const Providers = ({ children }: React.PropsWithChildren) => {
  return (
    <TamaguiProvider config={tamaguiConfig} defaultTheme="light">
      <PortalProvider shouldAddRootHost>
        <ThemeProvider value={DefaultTheme}>{children}</ThemeProvider>
      </PortalProvider>
    </TamaguiProvider>
  )
}

export default Providers
