import { useFocusEffect } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import FavoriteScreen from '@/screens/Favorite';

import { render } from '@/utils/test-utils';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useFocusEffect: jest.fn(),
}));

describe('FavoriteScreen', () => {
  let queryClient: QueryClient;

  const renderWithProviders = () =>
    render(
      <QueryClientProvider client={queryClient}>
        <FavoriteScreen />
      </QueryClientProvider>,
    );

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('match snapshot', () => {
    const tree = renderWithProviders().toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('calls useFocusEffect when screen is focused', () => {
    renderWithProviders();

    expect(useFocusEffect).toHaveBeenCalled();
  });
});
