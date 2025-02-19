import { Text } from 'react-native';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { render, screen } from '@/utils/test-utils';

import { useFoods } from '@/hooks';

import HomeContainer from '../HomeContainer';

jest.mock('@/hooks', () => ({
  useFoods: jest.fn(),
}));

describe('HomeContainer', () => {
  let mockQueryClient: QueryClient;

  beforeEach(() => {
    mockQueryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
          gcTime: 0,
        },
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderWithProviders = () =>
    render(
      <QueryClientProvider client={mockQueryClient}>
        <HomeContainer>
          <Text testID="child-content">Content Loaded</Text>
        </HomeContainer>
      </QueryClientProvider>,
    );

  it('renders children when there is no error or loading state', () => {
    (useFoods as jest.Mock).mockReturnValue({ isLoading: false, error: null });

    renderWithProviders();

    expect(screen.getByTestId('child-content')).toBeTruthy();
  });

  it('shows Loading component when loading', () => {
    (useFoods as jest.Mock).mockReturnValue({ isLoading: true, error: null });

    renderWithProviders();

    expect(screen.getByTestId('food-skeleton')).toBeTruthy();
  });

  it('displays ErrorFallback component when an error occurs', () => {
    (useFoods as jest.Mock).mockReturnValue({
      isLoading: false,
      error: new Error('Network Error'),
    });

    renderWithProviders();

    expect(screen.getByTestId('error-fallback')).toBeTruthy();
  });
});
