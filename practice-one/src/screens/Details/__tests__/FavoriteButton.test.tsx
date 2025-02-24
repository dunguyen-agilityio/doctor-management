import { useFavoriteStore } from '@/stores/favorite';
import { fireEvent, render } from '@testing-library/react-native';

import { MOCK_FOODS } from '@/mocks/foods';

import FavoriteButton from '../FavoriteButton';

const useFavorite = useFavoriteStore as unknown as jest.Mock;

// Mock the Zustand store
jest.mock('@/stores/favorite', () => ({
  useFavoriteStore: jest.fn(),
}));

describe('FavoriteButton', () => {
  const mockAddToFavorite = jest.fn();
  const mockRemoveFromFavorite = jest.fn();

  const mockFood = MOCK_FOODS[0];

  it('renders "Add to Favorites" when item is not favorited', () => {
    useFavorite.mockReturnValue({
      favorites: [],
      addToFavorite: mockAddToFavorite,
      removeFromFavorite: mockRemoveFromFavorite,
    });

    const { getByText } = render(<FavoriteButton id="1" food={mockFood} />);
    expect(getByText('Add to Favorites')).toBeTruthy();
  });

  it('renders "Unfavorite" when item is already in favorites', () => {
    useFavorite.mockReturnValue({
      favorites: MOCK_FOODS,
      addToFavorite: mockAddToFavorite,
      removeFromFavorite: mockRemoveFromFavorite,
    });

    const { getByText } = render(<FavoriteButton id="1" food={mockFood} />);
    expect(getByText('Unfavorite')).toBeTruthy();
  });

  it('calls addToFavorite when button is pressed if item is not in favorites', () => {
    useFavorite.mockReturnValue({
      favorites: [],
      addToFavorite: mockAddToFavorite,
      removeFromFavorite: mockRemoveFromFavorite,
    });

    const { getByTestId } = render(<FavoriteButton id="1" food={mockFood} />);
    fireEvent.press(getByTestId('favorite-button'));

    expect(mockAddToFavorite).toHaveBeenCalledWith(mockFood);
  });

  it('calls removeFromFavorite when button is pressed if item is already in favorites', () => {
    useFavorite.mockReturnValue({
      favorites: [{ id: '1', name: 'Apple' }],
      addToFavorite: mockAddToFavorite,
      removeFromFavorite: mockRemoveFromFavorite,
    });

    const { getByTestId } = render(<FavoriteButton id="1" food={mockFood} />);
    fireEvent.press(getByTestId('favorite-button'));

    expect(mockRemoveFromFavorite).toHaveBeenCalledWith('1');
  });
});
