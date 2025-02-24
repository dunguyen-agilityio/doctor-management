import { useNavigation } from '@react-navigation/native';

import HomeScreen from '@/screens/Home';

import { CATEGORIES, ROUTES } from '@/constants';

import { fireEvent, render } from '@/utils/test-utils';

describe('HomeScreen', () => {
  const mockNavigate = jest.fn();
  const [{ name: categoryName, id: categoryId }] = CATEGORIES;

  beforeEach(() => {
    (useNavigation as jest.Mock).mockReturnValue({ navigate: mockNavigate });
  });

  it('renders all main components', () => {
    const { getByText, getByPlaceholderText } = render(<HomeScreen />);

    expect(getByText('All Food')).toBeTruthy(); // Checks header title in FoodsContainer
    expect(getByPlaceholderText('Search for healthy food')).toBeTruthy(); // Search input
  });

  it('navigates to search screen when search input is focused', () => {
    const { getByPlaceholderText } = render(<HomeScreen />);

    fireEvent(getByPlaceholderText('Search for healthy food'), 'focus');

    expect(mockNavigate).toHaveBeenCalledWith(ROUTES.SEARCH, {
      autoFocus: true,
    });
  });

  it('navigates to search screen with category filter when a category is selected', () => {
    const { getByText } = render(<HomeScreen />);

    fireEvent.press(getByText(categoryName));

    expect(mockNavigate).toHaveBeenCalledWith(ROUTES.SEARCH, {
      category: categoryId,
    });
  });
});
