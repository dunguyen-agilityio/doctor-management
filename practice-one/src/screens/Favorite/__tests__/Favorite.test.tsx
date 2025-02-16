import React from 'react';

import { NavigationContainer, useFocusEffect } from '@react-navigation/native';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react-native';

import FavoriteScreen from '@/screens/Favorite';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useFocusEffect: jest.fn(),
}));

describe('FavoriteScreen', () => {
  let queryClient: QueryClient;

  const renderWithProviders = () =>
    render(
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <FavoriteScreen />
        </NavigationContainer>
      </QueryClientProvider>,
    );

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('match snapshot', () => {
    const tree = renderWithProviders().toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('calls useFocusEffect when screen is focused', () => {
    renderWithProviders();

    expect(useFocusEffect).toHaveBeenCalled();
  });
});
