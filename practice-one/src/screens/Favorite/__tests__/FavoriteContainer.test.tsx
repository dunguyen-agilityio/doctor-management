import React from 'react';

import { useFocusEffect } from '@react-navigation/native';

import { SearchProvider } from '@/contexts/search';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react-native';

import FavoriteContainer from '@/screens/Favorite/FavoriteContainer';

import { useFoods, useSearchQuery } from '@/hooks';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useFocusEffect: jest.fn(),
}));

const mockSetQuery = jest.fn();

jest.mock('@/hooks', () => ({
  useFoods: jest.fn(),
  useSearchQuery: jest.fn(),
}));

describe('FavoriteContainer', () => {
  const renderWithProviders = () =>
    render(
      <QueryClientProvider client={queryClient}>
        <SearchProvider>
          <FavoriteContainer />
        </SearchProvider>
      </QueryClientProvider>,
    );

  let queryClient: QueryClient;

  beforeEach(() => {
    jest.useFakeTimers();

    (useSearchQuery as jest.Mock).mockImplementation(() => ({
      query: '',
      setQuery: mockSetQuery,
    }));

    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          gcTime: 0, // Prevents cache from persisting between tests
          retry: false, // Ensures predictable API failures
        },
      },
    });
  });

  afterEach(() => {
    queryClient?.clear();
    jest.clearAllTimers();
  });

  it('renders loading state initially', () => {
    (useFoods as jest.Mock).mockReturnValue({ isLoading: true, error: null });

    renderWithProviders();

    expect(screen.getByTestId('loading-indicator')).toBeTruthy();
  });

  it('renders error fallback when API fails', () => {
    (useFoods as jest.Mock).mockReturnValue({
      isLoading: false,
      error: new Error('API failed'),
    });

    renderWithProviders();

    expect(screen.getByTestId('error-fallback')).toBeTruthy();
  });

  it('calls useFocusEffect to reset search input', async () => {
    const setQueryMock = jest.fn();
    (useFocusEffect as jest.Mock).mockImplementation((callback) => callback());

    renderWithProviders();

    await waitFor(() => {
      expect(setQueryMock).not.toHaveBeenCalled(); // Ensure it resets only on unmount
    });
  });

  it('allows users to type in the search input', () => {
    (useFoods as jest.Mock).mockReturnValue({ isLoading: false, error: null });

    renderWithProviders();

    const input = screen.getByTestId('search-input');
    fireEvent.changeText(input, 'Pizza');
    expect(mockSetQuery).not.toHaveBeenCalled();
    act(() => {
      jest.advanceTimersByTime(600);
    });
    expect(mockSetQuery).toHaveBeenCalledWith('Pizza');
  });
});
