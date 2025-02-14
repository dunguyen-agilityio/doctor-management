import { ReactElement } from 'react';

import { NavigationContainer } from '@react-navigation/native';

import { RenderOptions, render } from '@testing-library/react-native';

const AllTheProviders = ({ children }: { children: ReactElement }) => {
  return <NavigationContainer>{children}</NavigationContainer>;
};

const customRender = (ui: ReactElement, options?: RenderOptions) =>
  render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react-native';

export { customRender as render };
