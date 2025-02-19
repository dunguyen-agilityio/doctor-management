import { Text } from 'react-native';

import FoodsContainer from '@/components/FoodsContainer';
import { FoodsListProps } from '@/components/FoodsList';

import { render } from '@/utils/test-utils';

import { MOCK_FOODS } from '@/mocks';

import { FoodsContext } from '@/contexts/foods';

describe('FoodsContainer', () => {
  const [{ name: name1 }, { name: name2 }] = MOCK_FOODS;

  it('renders correctly with food items', () => {
    const { getByText } = render(
      <FoodsContext.Provider value={{ foods: MOCK_FOODS }}>
        <FoodsContainer />
      </FoodsContext.Provider>,
    );

    expect(getByText(name1)).toBeTruthy();
    expect(getByText(name2)).toBeTruthy();
  });

  it('renders without crashing when foods list is empty', () => {
    const { queryByText } = render(
      <FoodsContext.Provider value={{ foods: [] }}>
        <FoodsContainer />
      </FoodsContext.Provider>,
    );

    expect(queryByText(name1)).toBeNull();
    expect(queryByText(name2)).toBeNull();
  });

  it('renders ListTitleComponent when provided', () => {
    const { getByText } = render(
      <FoodsContext.Provider value={{ foods: MOCK_FOODS }}>
        <FoodsContainer ListTitleComponent={<Text>Food List</Text>} />
      </FoodsContext.Provider>,
    );

    expect(getByText('Food List')).toBeTruthy();
  });

  it('passes slotProps correctly to FoodsList', () => {
    const slotProps: Partial<FoodsListProps> = { horizontal: true };

    const { getByTestId } = render(
      <FoodsContext.Provider value={{ foods: MOCK_FOODS }}>
        <FoodsContainer slotProps={{ list: slotProps }} />
      </FoodsContext.Provider>,
    );

    expect(getByTestId('foods-list').props).toEqual(
      expect.objectContaining({ horizontal: true }),
    );
  });
});
