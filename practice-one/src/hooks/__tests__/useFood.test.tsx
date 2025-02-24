import { getFoodList } from '@/services/food';

import { renderHook, waitFor } from '@/utils/test-utils';

import { useFoodList } from '@/hooks/useFoodList';

import { MOCK_FOOD_LIST } from '@/mocks/food';

const [food1, food2] = MOCK_FOOD_LIST;

jest.mock('@/services/food', () => ({
  getFoodList: jest.fn(),
}));

describe('useFoodList', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('fetches and paginates food list', async () => {
    (getFoodList as jest.Mock)
      .mockResolvedValueOnce({
        data: [food1],
        nextPage: 2,
        prevPage: undefined,
        hasMore: true,
      })
      .mockResolvedValueOnce({
        data: [food2],
        nextPage: undefined,
        prevPage: 1,
        hasMore: false,
      });

    const { result } = renderHook(() => useFoodList());

    expect(result.current.isLoading).toBe(true);

    expect(result.current.data).toBeUndefined();

    await waitFor(() => expect(result.current.data).toEqual([food1]));

    await result.current.fetchNextPage();
    await waitFor(() => expect(result.current.data).toEqual([food1, food2]));
  });
});
