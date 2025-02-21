import { Text } from 'react-native';

import { render, screen } from '@/utils/test-utils';

import { useFoods } from '@/hooks';

import HomeContainer from '../HomeContainer';

jest.mock('@/hooks', () => ({
  useFoods: jest.fn(),
}));

describe('HomeContainer', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const setup = () =>
    render(
      <HomeContainer>
        <Text testID="child-content">Content Loaded</Text>
      </HomeContainer>,
    );

  it('renders children when there is no error or loading state', () => {
    (useFoods as jest.Mock).mockReturnValue({ isLoading: false, error: null });

    setup();

    expect(screen.getByTestId('child-content')).toBeTruthy();
  });

  it('shows Loading component when loading', () => {
    (useFoods as jest.Mock).mockReturnValue({ isLoading: true, error: null });

    setup();

    expect(screen.getByTestId('food-skeleton')).toBeTruthy();
  });

  it('displays ErrorFallback component when an error occurs', () => {
    (useFoods as jest.Mock).mockReturnValue({
      isLoading: false,
      error: new Error('Network Error'),
    });

    setup();

    expect(screen.getByTestId('error-fallback')).toBeTruthy();
  });
});
