import { RenderOptions, render, renderHook } from '@testing-library/react-native'

import { NavigationContainer } from '@react-navigation/native'

import { ToastViewport } from '@tamagui/toast'

import Providers from '@app/providers'

const AllTheProviders = ({ children }: React.PropsWithChildren) => {
  return (
    <NavigationContainer>
      <Providers>
        <ToastViewport />
        {children}
      </Providers>
    </NavigationContainer>
  )
}

const customRender = (ui: React.ReactElement, options?: RenderOptions) =>
  render(ui, { wrapper: AllTheProviders, ...options })

const customRenderHook: typeof renderHook = (renderCallback, options) =>
  renderHook(renderCallback, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react-native'

export { customRender as render, customRenderHook as renderHook }
