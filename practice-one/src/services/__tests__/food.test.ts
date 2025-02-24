import { apiClient } from '@/services/http-client';

import { MOCK_FOOD_LIST } from '@/mocks/food';

import { getFavoriteFoodList, getFoodById, getFoodList } from '../food';

jest.mock('@/services/http-client.ts', () => ({
  apiClient: {
    get: jest.fn(),
    put: jest.fn(),
  },
}));

describe('Food API', () => {
  it('getFavoriteFoodList fetches food list', async () => {
    (apiClient.get as jest.Mock).mockResolvedValue({ data: [] });
    const foods = await getFavoriteFoodList([]);
    expect(foods).toEqual([]);
  });

  it('getFavoriteFoodList fetches food list', async () => {
    (apiClient.get as jest.Mock).mockResolvedValue({ data: MOCK_FOOD_LIST });
    const foods = await getFavoriteFoodList(['1']);
    expect(foods).toEqual(MOCK_FOOD_LIST);
  });

  it('getFoodById fetches a single food item by ID', async () => {
    (apiClient.get as jest.Mock).mockResolvedValue({ data: MOCK_FOOD_LIST[0] });
    const food = await getFoodById('1');
    expect(food).toEqual(MOCK_FOOD_LIST[0]);
  });

  it('fetches food list successfully', async () => {
    const mockFoods = MOCK_FOOD_LIST.slice(0, 2);

    (apiClient.get as jest.Mock).mockResolvedValue({
      data: mockFoods,
      meta: { total: MOCK_FOOD_LIST.length },
    });
    const result = await getFoodList({ page: 1, pageSize: 2, query: 'test' });

    expect(result.data).toEqual(mockFoods);
    expect(result.hasMore).toBe(true);
  });

  it('fetches food list successfully', async () => {
    const mockFoods = MOCK_FOOD_LIST.slice(0, 2);

    (apiClient.get as jest.Mock).mockResolvedValue({
      data: mockFoods,
    });
    const result = await getFoodList({ pageSize: 2, query: 'test' });

    expect(result.data).toEqual(mockFoods);
    expect(result.hasMore).toBe(false);
  });

  it('fetches food list successfully', async () => {
    const mockFoods = MOCK_FOOD_LIST.slice(0, 2);

    (apiClient.get as jest.Mock).mockResolvedValue({
      data: mockFoods,
      meta: { total: 4 },
    });
    const result = await getFoodList({ page: 2, pageSize: 2 });

    expect(result.data).toEqual(mockFoods);
    expect(result.hasMore).toBe(false);
  });
});
