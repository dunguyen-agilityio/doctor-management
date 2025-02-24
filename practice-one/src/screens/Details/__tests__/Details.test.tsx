import { useNavigation, useRoute } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';

import Details from '@/screens/Details';

import { fireEvent, render, waitFor } from '@/utils/test-utils';

import { MOCK_FOOD_LIST } from '@/mocks/food';

jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useQuery: jest.fn(),
}));

jest.mock('@/services/food', () => ({
  getFoodById: jest.fn(),
}));

describe('Details Screen', () => {
  const mockFood = MOCK_FOOD_LIST[0];
  const mockGoBack = jest.fn();
  const mockRouteParams = { params: { id: '1' } };

  beforeEach(() => {
    (useNavigation as jest.Mock).mockReturnValue({ goBack: mockGoBack });
    (useRoute as jest.Mock).mockReturnValue(mockRouteParams);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('shows loading indicator while fetching data', () => {
    (useQuery as jest.Mock).mockReturnValue({ isLoading: true });

    const { getByTestId } = render(<Details />);
    expect(getByTestId('loading-indicator')).toBeTruthy();
  });

  it('displays an error message if fetching fails', async () => {
    (useQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      error: new Error('Fetch failed'),
      data: null,
    });

    const { getByText } = render(<Details />);
    await waitFor(() => {
      expect(getByText('Fetch failed')).toBeTruthy();
    });
  });

  it('renders food details and favorite button when data is available', async () => {
    (useQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      data: mockFood,
    });

    const { name } = mockFood;

    const { getByText } = render(<Details />);
    await waitFor(() => {
      expect(getByText(name)).toBeTruthy();
      expect(getByText('Add to Favorites')).toBeTruthy();
    });
  });

  it('calls goBack when Back button is pressed', () => {
    (useQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      data: mockFood,
    });

    const { getByTestId } = render(<Details />);
    fireEvent.press(getByTestId('back-button'));

    expect(mockGoBack).toHaveBeenCalled();
  });
});
