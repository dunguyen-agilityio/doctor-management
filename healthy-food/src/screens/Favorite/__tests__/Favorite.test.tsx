import FavoriteScreen from '@/screens/Favorite';

import { fireEvent, render } from '@/utils/test-utils';

import { useFavorite } from '@/hooks/useFavorite';

import { MOCK_FOOD_LIST } from '@/mocks/food';

jest.mock('@/hooks/useFavorite', () => ({
  useFavorite: jest.fn(),
}));

describe('FavoriteScreen', () => {
  it('renders Loading when isLoading is true', () => {
    (useFavorite as jest.Mock).mockReturnValue({
      isLoading: true,
      favorites: [],
      displayFavorites: [],
      searchByName: jest.fn(),
    });

    const { getByTestId } = render(<FavoriteScreen />);
    expect(getByTestId('loading-indicator')).toBeTruthy();
  });

  it('renders NotFound when there are no favorites', () => {
    (useFavorite as jest.Mock).mockReturnValue({
      isLoading: false,
      favorites: [],
      displayFavorites: [],
      searchByName: jest.fn(),
    });

    const { getByTestId } = render(<FavoriteScreen />);
    expect(getByTestId('not-found')).toBeTruthy();
  });

  it('renders SearchInput and FoodList when there are favorites', () => {
    (useFavorite as jest.Mock).mockReturnValue({
      isLoading: false,
      favorites: MOCK_FOOD_LIST,
      displayFavorites: MOCK_FOOD_LIST,
      searchByName: jest.fn(),
    });

    const { getByPlaceholderText, getByTestId } = render(<FavoriteScreen />);

    expect(getByPlaceholderText('Search for healthy food')).toBeTruthy();
    expect(getByTestId('food-list')).toBeTruthy();
  });

  it('calls searchByName when text is entered', () => {
    jest.useFakeTimers();
    const mockSearchByName = jest.fn();

    (useFavorite as jest.Mock).mockReturnValue({
      isLoading: false,
      favorites: MOCK_FOOD_LIST,
      displayFavorites: MOCK_FOOD_LIST,
      searchByName: mockSearchByName,
    });

    const { getByPlaceholderText } = render(<FavoriteScreen />);
    const searchInput = getByPlaceholderText('Search for healthy food');
    fireEvent.changeText(searchInput, 'Apple');
    jest.advanceTimersByTime(500);

    expect(mockSearchByName).toHaveBeenCalledWith('Apple');
  });
});
