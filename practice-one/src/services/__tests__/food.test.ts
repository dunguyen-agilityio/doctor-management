import { apiClient } from '@/services/http-client';

import { MOCK_FOODS } from '@/mocks';

import { getFoodById, getFoods } from '../food';

jest.mock('@/services/http-client.ts', () => ({
  apiClient: {
    get: jest.fn(),
    put: jest.fn(),
  },
}));

describe('Food API', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('getFoods fetches food list', async () => {
    (apiClient.get as jest.Mock).mockResolvedValue([]);
    const foods = await getFoods();
    expect(foods).toEqual([]);
  });

  it('getFoods fetches food list', async () => {
    (apiClient.get as jest.Mock).mockResolvedValue(MOCK_FOODS);
    const foods = await getFoods({
      categories: ['A'],
      favorite: 1,
      query: 'abc',
    });
    expect(foods).toEqual(MOCK_FOODS);
  });

  it('getFoodById fetches a single food item by ID', async () => {
    (apiClient.get as jest.Mock).mockResolvedValue({
      ...MOCK_FOODS[0],
      favorites: [{ id: '1' }],
    });
    const food = await getFoodById('1');
    expect(food).toEqual({ ...MOCK_FOODS[0], favorite: true, favoriteId: '1' });
  });
});
