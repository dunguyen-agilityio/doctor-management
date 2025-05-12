import { render } from '@/utils/test-utils';

import { MOCK_FOOD_LIST } from '@/mocks/food';

import FoodList from './index';

describe('FoodList Component', () => {
  const [{ name: name1 }, { name: name2 }] = MOCK_FOOD_LIST;

  it('renders correctly with default props', () => {
    const { getByText, getByTestId } = render(
      <FoodList data={MOCK_FOOD_LIST} />,
    );

    // Check if the FlatList is rendered
    const flatList = getByTestId('food-list');
    expect(flatList).toBeTruthy();

    // Check if the Food components are rendered
    expect(getByText(name1)).toBeTruthy();
    expect(getByText(name2)).toBeTruthy();
  });

  it('renders correctly with horizontal layout', () => {
    const { getByTestId } = render(
      <FoodList data={MOCK_FOOD_LIST} horizontal />,
    );

    // Check if the FlatList has horizontal layout
    const flatList = getByTestId('food-list');
    expect(flatList.props.horizontal).toBe(true);
  });
});
