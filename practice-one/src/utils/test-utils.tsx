import { RenderOptions, render } from '@testing-library/react-native';

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

export * from '@testing-library/react-native';

export { customRender as render };
