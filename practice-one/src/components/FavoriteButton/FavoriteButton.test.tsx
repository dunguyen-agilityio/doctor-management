import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react-native';

import FavoriteButton from '@/components/FavoriteButton';

import { updateFood } from '@/services';

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

  it('calls the mutation function when clicked', async () => {
    jest.spyOn(queryClient, 'getQueryData').mockReturnValue({
      id: '123',
      favorite: 0,
    });

    renderComponent(false);
    const button = screen.getByText('Add to Favorites');

    fireEvent.press(button);

    await waitFor(() => expect(updateFood).toHaveBeenCalled());
  });

  it('shows loading indicator when the mutation is pending', async () => {
    jest.spyOn(queryClient, 'getQueryData').mockReturnValue({
      id: '123',
      favorite: 0,
    });

    (updateFood as jest.Mock).mockImplementation(
      () => new Promise((resolve) => setTimeout(resolve, 1000)),
    );

    renderComponent(false);
    const button = screen.getByText('Add to Favorites');

    fireEvent.press(button);

    await waitFor(() =>
      expect(screen.getByTestId('activity-indicator')).toBeTruthy(),
    );
  });

  it('updates the text after a successful mutation', async () => {
    (updateFood as jest.Mock).mockResolvedValue({});

    renderComponent(false);
    const button = screen.getByText('Add to Favorites');

    fireEvent.press(button);

    expect(await screen.findByText('UnFavorites')).toBeTruthy();
  });

  it('matches snapshot', () => {
    const tree = renderComponent(false).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
