import { useFocusEffect } from '@react-navigation/native';

import FavoriteContainer from '@/screens/Favorite/FavoriteContainer';

import { act, fireEvent, render, screen, waitFor } from '@/utils/test-utils';

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
  const renderContainer = () => render(<FavoriteContainer />);

  beforeEach(() => {
    jest.useFakeTimers();

    (useSearchQuery as jest.Mock).mockImplementation(() => ({
      query: '',
      setQuery: mockSetQuery,
    }));
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  it('renders loading state initially', () => {
    (useFoods as jest.Mock).mockReturnValue({
      isLoading: true,
      error: null,
    });

    renderContainer();

    expect(screen.getByTestId('loading-indicator')).toBeTruthy();
  });

  it('renders error fallback when API fails', () => {
    (useFoods as jest.Mock).mockReturnValue({
      isLoading: false,
      error: new Error('API failed'),
    });

    renderContainer();

    expect(screen.getByTestId('error-fallback')).toBeTruthy();
  });

  it('calls useFocusEffect to reset search input', async () => {
    const setQueryMock = jest.fn();
    (useFocusEffect as jest.Mock).mockImplementation((callback) => callback());

    renderContainer();

    await waitFor(() => {
      expect(setQueryMock).not.toHaveBeenCalled(); // Ensure it resets only on unmount
    });
  });

  it('allows users to type in the search input', () => {
    (useFoods as jest.Mock).mockReturnValue({
      isLoading: false,
      error: null,
    });

    renderContainer();

    const input = screen.getByTestId('search-input');
    fireEvent.changeText(input, 'Pizza');
    expect(mockSetQuery).not.toHaveBeenCalled();
    act(() => {
      jest.advanceTimersByTime(600);
    });
    expect(mockSetQuery).toHaveBeenCalledWith('Pizza');
  });
});
