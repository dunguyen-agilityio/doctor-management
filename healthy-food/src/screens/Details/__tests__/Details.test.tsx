import { useRoute } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';

import Details from '@/screens/Details';

import { StackScreenProps } from '@/types';

import { render, waitFor } from '@/utils/test-utils';

import { MOCK_FOOD_LIST } from '@/mocks/food';

import { ROUTES } from '@/route';

jest.mock('expo-linking', () => ({
  createURL: jest.fn((path) => `${path}`),
}));

jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useQuery: jest.fn(),
}));

jest.mock('@/services/food', () => ({
  getFoodById: jest.fn(),
}));

const mockDetailProps = {
  route: { params: { id: '1' } },
} as StackScreenProps<ROUTES.DETAIL>;

describe('Details Screen', () => {
  const mockFood = MOCK_FOOD_LIST[0];
  const mockRouteParams = { params: { id: '1' } };

  beforeEach(() => {
    (useRoute as jest.Mock).mockReturnValue(mockRouteParams);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('shows loading indicator while fetching data', () => {
    (useQuery as jest.Mock).mockReturnValue({ isLoading: true });

    const { getByTestId } = render(<Details {...mockDetailProps} />);
    expect(getByTestId('detail-skeleton')).toBeTruthy();
  });

  it('displays an error message if fetching fails', async () => {
    (useQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      error: new Error('Fetch failed'),
      data: null,
    });

    const { getByText } = render(<Details {...mockDetailProps} />);
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

    const { getByText } = render(<Details {...mockDetailProps} />);
    await waitFor(() => {
      expect(getByText(name)).toBeTruthy();
      expect(getByText('Add to Favorites')).toBeTruthy();
    });
  });
});
