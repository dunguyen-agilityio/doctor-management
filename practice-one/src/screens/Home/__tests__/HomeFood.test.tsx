import { type FoodListProps } from '@/components/FoodList';

import { render, screen } from '@/utils/test-utils';

import { useFoodList } from '@/hooks/useFoodList';

import { MOCK_FOOD_LIST } from '@/mocks/food';

import HomeFood from '../HomeFood';

// Mock dependencies
jest.mock('@/hooks/useFoodList', () => ({
  useFoodList: jest.fn(),
}));

describe('HomeFood', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders FoodListSkeleton when loading', () => {
    (useFoodList as jest.Mock).mockReturnValue({
      isLoading: true,
      data: undefined,
      isFetchingNextPage: false,
      fetchNextPage: jest.fn(),
    });

    render(<HomeFood />);

    const skeleton = screen.getByTestId('food-list-skeleton');
    expect(skeleton).toBeTruthy();
  });

  it('renders FoodList with data when loaded', () => {
    const mockData = {
      pages: [MOCK_FOOD_LIST],
      pageParams: [undefined],
    };
    const mockFetchNextPage = jest.fn();
    (useFoodList as jest.Mock).mockReturnValue({
      isLoading: false,
      data: mockData,
      isFetchingNextPage: false,
      fetchNextPage: mockFetchNextPage,
    });

    render(<HomeFood />);

    const foodList = screen.getByTestId('food-list');
    expect(foodList).toBeTruthy();
    expect(foodList.props.data).toBe(mockData);
    expect(typeof foodList.props.onEndReached).toBe('function');

    // Test onEndReached
    foodList.props.onEndReached();
    expect(mockFetchNextPage).toHaveBeenCalledTimes(1);
  });

  it('shows FoodListSkeleton as footer when fetching next page', () => {
    const mockData = {
      pages: [MOCK_FOOD_LIST],
      pageParams: [undefined],
    };
    (useFoodList as jest.Mock).mockReturnValue({
      isLoading: false,
      data: mockData,
      isFetchingNextPage: true,
      fetchNextPage: jest.fn(),
    });

    render(<HomeFood />);

    const foodList = screen.getByTestId('food-list');
    const footerSkeleton = screen.getByTestId('food-list-skeleton');
    expect(foodList).toBeTruthy();
    expect(footerSkeleton).toBeTruthy();
  });

  it('passes additional props to FoodList', () => {
    const mockData = {
      pages: [MOCK_FOOD_LIST],
      pageParams: [undefined],
    };
    (useFoodList as jest.Mock).mockReturnValue({
      isLoading: false,
      data: mockData,
      isFetchingNextPage: false,
      fetchNextPage: jest.fn(),
    });

    const extraProps = { testProp: 'value' } as FoodListProps;
    render(<HomeFood {...extraProps} />);

    const foodList = screen.getByTestId('food-list');
    expect(foodList.props.testProp).toBe('value');
  });

  it('does not render footer when not fetching next page', () => {
    const mockData = {
      pages: [MOCK_FOOD_LIST],
      pageParams: [undefined],
    };
    (useFoodList as jest.Mock).mockReturnValue({
      isLoading: false,
      data: mockData,
      isFetchingNextPage: false,
      fetchNextPage: jest.fn(),
    });

    render(<HomeFood />);

    expect(screen.getByTestId('food-list')).toBeTruthy();
    expect(screen.queryByTestId('food-list-skeleton')).toBeNull();
  });

  it('memoizes handleEndReached with useCallback', () => {
    const mockFetchNextPage = jest.fn();
    (useFoodList as jest.Mock).mockReturnValue({
      isLoading: false,
      data: { pages: [[]], pageParams: [] },
      isFetchingNextPage: false,
      fetchNextPage: mockFetchNextPage,
    });

    const { rerender } = render(<HomeFood />);
    const firstRenderFoodList = screen.getByTestId('food-list');
    const firstHandleEndReached = firstRenderFoodList.props.onEndReached;

    rerender(<HomeFood />);
    const secondRenderFoodList = screen.getByTestId('food-list');
    const secondHandleEndReached = secondRenderFoodList.props.onEndReached;

    expect(firstHandleEndReached).toBe(secondHandleEndReached); // Same function instance
    firstHandleEndReached();
    expect(mockFetchNextPage).toHaveBeenCalledTimes(1);
  });
});
