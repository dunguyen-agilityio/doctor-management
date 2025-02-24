import { Text } from '@/components';
import FoodsContainer from '@/components/FoodsContainer';

import { fireEvent, render } from '@/utils/test-utils';

import { useFoods } from '@/hooks/useFood';

import { MOCK_FOODS } from '@/mocks/foods';

// Mock useFoods hook
jest.mock('@/hooks/useFood', () => ({
  useFoods: jest.fn(),
}));

describe('FoodsContainer', () => {
  it('renders correctly', () => {
    (useFoods as jest.Mock).mockReturnValue({
      isLoading: false,
      data: [],
      fetchNextPage: jest.fn(),
    });

    const { getByTestId } = render(<FoodsContainer />);
    expect(getByTestId('foods-container')).toBeTruthy();
  });

  it('displays fallback component while loading', () => {
    (useFoods as jest.Mock).mockReturnValue({
      isLoading: true,
      data: [],
      fetchNextPage: jest.fn(),
    });

    const { getByText } = render(
      <FoodsContainer Fallback={<Text>Loading...</Text>} />,
    );
    expect(getByText('Loading...')).toBeTruthy();
  });

  it('calls fetchNextPage when end reached', () => {
    const mockFetchNextPage = jest.fn();
    (useFoods as jest.Mock).mockReturnValue({
      isLoading: false,
      data: MOCK_FOODS,
      fetchNextPage: mockFetchNextPage,
    });

    const { getByTestId } = render(<FoodsContainer />);

    fireEvent(getByTestId('foods-list'), 'onEndReached');

    expect(mockFetchNextPage).toHaveBeenCalled();
  });
});
