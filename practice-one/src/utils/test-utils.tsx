import {
  RenderOptions,
  render,
  renderHook,
} from '@testing-library/react-native';

import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const AllTheProviders = ({ children }: React.PropsWithChildren) => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>{children}</NavigationContainer>
    </QueryClientProvider>
  );
};

const customRender = (ui: React.ReactElement, options?: RenderOptions) =>
  render(ui, { wrapper: AllTheProviders, ...options });

const customRenderHook: typeof renderHook = (renderCallback, options) =>
  renderHook(renderCallback, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react-native';

export { customRender as render, customRenderHook as renderHook };
