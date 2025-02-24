import { getFoodList } from '@/services/food';

import { renderHook, waitFor } from '@/utils/test-utils';

import { useFoods } from '@/hooks/useFood';

import { MOCK_FOODS } from '@/mocks/foods';

const [food1, food2] = MOCK_FOODS;

jest.mock('@/services/food', () => ({
  getFoodList: jest.fn(),
}));

describe('useFoods', () => {
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

    const { result } = renderHook(() => useFoods());

    expect(result.current.isLoading).toBe(true);

    expect(result.current.data).toBeUndefined();

    await waitFor(() => expect(result.current.data).toEqual([food1]));

    await result.current.fetchNextPage();
    await waitFor(() => expect(result.current.data).toEqual([food1, food2]));
  });
});
