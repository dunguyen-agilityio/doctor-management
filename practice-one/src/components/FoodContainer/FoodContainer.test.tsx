import { Text } from '@/components';
import FoodContainer from '@/components/FoodContainer';

import { fireEvent, render } from '@/utils/test-utils';

import { useFoodList } from '@/hooks/useFoodList';

import { MOCK_FOOD_LIST } from '@/mocks/food';

// Mock useFoodList hook
jest.mock('@/hooks/useFoodList', () => ({
  useFoodList: jest.fn(),
}));

describe('FoodContainer', () => {
  it('renders correctly', () => {
    (useFoodList as jest.Mock).mockReturnValue({
      isLoading: false,
      data: [],
      fetchNextPage: jest.fn(),
    });

    const { getByTestId } = render(<FoodContainer />);
    expect(getByTestId('food-container')).toBeTruthy();
  });

  it('displays fallback component while loading', () => {
    (useFoodList as jest.Mock).mockReturnValue({
      isLoading: true,
      data: [],
      fetchNextPage: jest.fn(),
    });

    const { getByText } = render(
      <FoodContainer Fallback={<Text>Loading...</Text>} />,
    );
    expect(getByText('Loading...')).toBeTruthy();
  });

  it('calls fetchNextPage when end reached', () => {
    const mockFetchNextPage = jest.fn();
    (useFoodList as jest.Mock).mockReturnValue({
      isLoading: false,
      data: MOCK_FOOD_LIST,
      fetchNextPage: mockFetchNextPage,
    });

    const { getByTestId } = render(<FoodContainer />);

    fireEvent(getByTestId('food-list'), 'onEndReached');

    expect(mockFetchNextPage).toHaveBeenCalled();
  });
});
