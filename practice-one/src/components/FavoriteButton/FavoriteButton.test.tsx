import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import FavoriteButton from '@/components/FavoriteButton';

import { render, screen } from '@/utils/test-utils';

// Mock the updateFood service
jest.mock('@/services', () => ({
  updateFood: jest.fn(),
}));

describe('FavoriteButton Component', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient();
  });

  const renderComponent = (favorite = false) => {
    return render(
      <QueryClientProvider client={queryClient}>
        <FavoriteButton favorite={favorite} id="123" />
      </QueryClientProvider>,
    );
  };

  it('renders the correct initial text', () => {
    renderComponent(false);
    expect(screen.getByText('Add to Favorites')).toBeTruthy();

    renderComponent(true);
    expect(screen.getByText('UnFavorites')).toBeTruthy();
  });

  it('calls the mutation function when clicked', async () => {});

  it('shows loading indicator when the mutation is pending', async () => {});

  it('updates the text after a successful mutation', async () => {});

  it('matches snapshot', () => {
    const tree = renderComponent(false).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
