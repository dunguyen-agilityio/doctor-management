import React from 'react';

import { NavigationContainer } from '@react-navigation/native';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render } from '@testing-library/react-native';

import HomeScreen from '@/screens/Home';

import { ROUTES } from '@/constants';

const mockNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

describe('HomeScreen', () => {
  let queryClient: QueryClient;

  const renderWithProviders = () =>
    render(
      <NavigationContainer>
        <QueryClientProvider client={queryClient}>
          <HomeScreen />
        </QueryClientProvider>
      </NavigationContainer>,
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

  it('navigates to the Search screen when SearchInput is focused', () => {
    const { getByTestId } = renderWithProviders();

    fireEvent(getByTestId('search-input'), 'focus');

    expect(mockNavigate).toHaveBeenCalledWith(ROUTES.SEARCH);
  });
});
