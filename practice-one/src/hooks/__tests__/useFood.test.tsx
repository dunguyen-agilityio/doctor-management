import { jest } from '@jest/globals';

import { Text } from 'react-native';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { FoodOptions, getFoods } from '@/services';

import { render, screen, waitFor } from '@/utils/test-utils';

import { MOCK_FOODS } from '@/mocks';

import { FoodsDispatchContext } from '@/contexts/foods';

import { useFoods } from '../useFood';

jest.mock('@/services', () => ({
  getFoods: jest.fn(),
}));

const queryClient = new QueryClient();

const TestComponent = ({ options }: { options: FoodOptions }) => {
  const { data, isLoading, isError } = useFoods(options);

  if (isLoading) return <Text>Loading...</Text>;
  if (isError) return <Text>Error</Text>;
  return <Text>{data ? data.length : 0}</Text>;
};

describe('useFoods Hook', () => {
  it('should fetch foods and dispatch to context', async () => {
    (getFoods as jest.Mock<typeof getFoods>).mockResolvedValue(MOCK_FOODS);

    const dispatch = jest.fn();
    const options = { categories: ['fruit'], query: 'apple' };

    render(
      <FoodsDispatchContext.Provider value={dispatch}>
        <QueryClientProvider client={queryClient}>
          <TestComponent options={options} />
        </QueryClientProvider>
      </FoodsDispatchContext.Provider>,
    );

    await waitFor(() => expect(getFoods).toHaveBeenCalledWith(options));
    await waitFor(() =>
      expect(dispatch).toHaveBeenCalledWith({
        type: 'GET_FOODS',
        payload: MOCK_FOODS,
      }),
    );

    // Check if the foods are rendered
    await waitFor(() =>
      expect(screen.getByText(String(MOCK_FOODS.length))).toBeTruthy(),
    );
  });
});
