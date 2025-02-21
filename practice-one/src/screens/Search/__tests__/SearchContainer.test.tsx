import { Text } from 'react-native';

import { render, screen } from '@/utils/test-utils';

import { useFoods } from '@/hooks';

import SearchContainer from '../SearchContainer';

jest.mock('@/hooks', () => ({
  ...jest.requireActual('@/hooks'),
  useFoods: jest.fn(),
}));

describe('SearchContainer', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderWithProviders = () =>
    render(
      <SearchContainer>
        <Text testID="child-content">Content Loaded</Text>
      </SearchContainer>,
    );

  it('renders children when there is no error or loading state', () => {
    (useFoods as jest.Mock).mockReturnValue({ isLoading: false, error: null });

    renderWithProviders();

    expect(screen.getByTestId('child-content')).toBeTruthy();
  });

  it('shows Loading component when loading', () => {
    (useFoods as jest.Mock).mockReturnValue({ isLoading: true, error: null });

    renderWithProviders();

    expect(screen.getByTestId('loading-indicator')).toBeTruthy();
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
