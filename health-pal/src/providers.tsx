import tamaguiConfig from '@/tamagui.config'
import { DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { TamaguiProvider } from 'tamagui'

const Providers = ({ children }: React.PropsWithChildren) => {
  return (
    <TamaguiProvider config={tamaguiConfig} defaultTheme="light">
      <ThemeProvider value={DefaultTheme}>{children}</ThemeProvider>
    </TamaguiProvider>
  )
}

export default Providers
