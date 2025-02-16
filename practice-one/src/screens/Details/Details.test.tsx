import { NavigationContainer } from '@react-navigation/native';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react-native';

import Details from '@/screens/Details';

import { getFoodById } from '@/services/food';

jest.mock('@/services/food', () => ({
  getFoodById: jest.fn(),
}));

const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    goBack: mockNavigate,
  }),
  useRoute: () => ({
    params: { id: 1 },
  }),
}));

describe('Details Screen', () => {
  let queryClient: QueryClient;

  const renderWithProviders = () => {
    return render(
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <Details />
        </NavigationContainer>
      </QueryClientProvider>,
    );
  };

  beforeEach(() => {
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
    queryClient.clear(); // Clears cache after each test
  });

  it('renders loading state initially', () => {
    (getFoodById as jest.Mock).mockImplementation(() => new Promise(() => {}));
    renderWithProviders();
    expect(screen.getByTestId('loading-indicator')).toBeTruthy();
  });

  it('renders food details correctly', async () => {
    (getFoodById as jest.Mock).mockResolvedValue({
      id: 1,
      name: 'Pizza',
      desc: 'Delicious pizza with cheese',
      imgUrl: 'https://example.com/pizza.jpg',
      category: 2,
      color: 'RED',
      ingredients: [{ id: 1, name: 'Cheese', value: 200 }],
      nutritional: { calories: 300, carbs: 40, protein: 15, fat: 10 },
      favorite: 1,
    });

    renderWithProviders();

    await waitFor(() => expect(screen.getByText('Pizza')).toBeTruthy());
    expect(screen.getByText('Delicious pizza with cheese')).toBeTruthy();
    expect(screen.getByTestId('favorite-button')).toBeTruthy();
  });

  it('shows error message on API failure', async () => {
    (getFoodById as jest.Mock).mockRejectedValue(new Error('Network error'));

    renderWithProviders();

    await waitFor(() =>
      expect(screen.getByText(/Something went wrong/i)).toBeTruthy(),
    );
  });

  it('navigates back when back button is pressed', async () => {
    (getFoodById as jest.Mock).mockResolvedValue({
      id: 1,
      name: 'Pizza',
      desc: 'Delicious pizza with cheese',
      imgUrl: 'https://example.com/pizza.jpg',
      category: 2,
      color: 'RED',
      ingredients: [{ id: 1, name: 'Cheese', value: 200 }],
      nutritional: { calories: 300, carbs: 40, protein: 15, fat: 10 },
      favorite: 1,
    });

    renderWithProviders();
    await waitFor(() => expect(screen.getByText('Pizza')).toBeTruthy());

    fireEvent.press(screen.getByTestId('back-button'));
    expect(mockNavigate).toHaveBeenCalled();
  });
});
