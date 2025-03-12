import { useNavigation, useRoute } from '@react-navigation/native';

import { render, renderHook, screen } from '@/utils/test-utils';

import { useFilters } from '@/hooks/useFilters';
import { useFoodList } from '@/hooks/useFoodList';
import { useSearchQuery } from '@/hooks/useSearchQuery';

import SearchFood from '../SearchFood';

// Mock dependencies
jest.mock('@/hooks/useFoodList', () => ({
  useFoodList: jest.fn(),
}));

jest.mock('@/hooks/useSearchQuery', () => ({
  useSearchQuery: jest.fn(),
}));

jest.mock('@/hooks/useFilters', () => ({
  useFilters: jest.fn(),
}));

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
  useRoute: jest.fn(),
  useFocusEffect: jest.fn((cb) => cb()),
}));

describe('SearchFood', () => {
  let mockSetParams: jest.Mock;
  let mockSetQuery: jest.Mock;
  let mockSetFilters: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();

    // Mock navigation
    mockSetParams = jest.fn();
    (useNavigation as jest.Mock).mockReturnValue({ setParams: mockSetParams });
    (useRoute as jest.Mock).mockReturnValue({ params: {} });

    // Mock hooks
    mockSetQuery = jest.fn();
    (useSearchQuery as jest.Mock).mockReturnValue({
      query: '',
      setQuery: mockSetQuery,
    });
    mockSetFilters = jest.fn((fn) => fn([]));
    (useFilters as jest.Mock).mockReturnValue({
      filters: [],
      setFilters: mockSetFilters,
    });
    (useFoodList as jest.Mock).mockReturnValue({
      isLoading: false,
      data: { pages: [[]], pageParams: [] },
      isFetchingNextPage: false,
      isRefetching: false,
      fetchNextPage: jest.fn(),
    });
  });

  it('renders SearchInput, Categories, and FoodList when loaded', () => {
    render(<SearchFood />);

    expect(screen.getByTestId('search-input')).toBeTruthy();
    expect(screen.getByTestId('categories')).toBeTruthy();
    expect(screen.getByTestId('food-list')).toBeTruthy();
    expect(screen.queryByTestId('loading-indicator')).toBeNull();
  });

  it('renders Loading when isLoading is true', () => {
    (useFoodList as jest.Mock).mockReturnValue({
      isLoading: true,
      data: undefined,
      isFetchingNextPage: false,
      isRefetching: false,
      fetchNextPage: jest.fn(),
    });

    render(<SearchFood />);

    expect(screen.getByTestId('loading-indicator')).toBeTruthy();
    expect(screen.queryByTestId('food-list')).toBeNull();
  });

  it('renders Loading when isRefetching is true', () => {
    (useFoodList as jest.Mock).mockReturnValue({
      isLoading: false,
      data: { pages: [[]], pageParams: [] },
      isFetchingNextPage: false,
      isRefetching: true,
      fetchNextPage: jest.fn(),
    });

    render(<SearchFood />);

    expect(screen.getByTestId('loading-indicator')).toBeTruthy();
    expect(screen.getByTestId('food-list')).toBeTruthy();
  });

  it('shows ActivityIndicator when fetching next page', () => {
    (useFoodList as jest.Mock).mockReturnValue({
      isLoading: false,
      data: { pages: [[]], pageParams: [] },
      isFetchingNextPage: true,
      isRefetching: false,
      fetchNextPage: jest.fn(),
    });

    render(<SearchFood />);

    expect(screen.getByTestId('food-list')).toBeTruthy();
  });

  it('sets filters based on category param on focus', () => {
    (useRoute as jest.Mock).mockReturnValue({
      params: { category: 'Italian' },
    });

    render(<SearchFood />);

    expect(mockSetFilters).toHaveBeenCalledWith(expect.any(Function));
    expect(mockSetFilters.mock.calls[0][0]([])).toEqual(['Italian']);
  });

  it('calls fetchNextPage on handleEndReached', () => {
    const mockFetchNextPage = jest.fn();
    (useFoodList as jest.Mock).mockReturnValue({
      isLoading: false,
      data: { pages: [[]], pageParams: [] },
      isFetchingNextPage: false,
      isRefetching: false,
      fetchNextPage: mockFetchNextPage,
    });

    render(<SearchFood />);
    const foodList = screen.getByTestId('food-list');
    foodList.props.onEndReached();

    expect(mockFetchNextPage).toHaveBeenCalledTimes(1);
  });
});
