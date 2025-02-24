import { render } from '@/utils/test-utils';

import { MOCK_FOODS } from '@/mocks/foods';

import FoodsList from './index';

describe('FoodsList Component', () => {
  const [{ name: name1 }, { name: name2 }] = MOCK_FOODS;

  it('renders correctly with default props', () => {
    const { getByText, getByTestId } = render(<FoodsList foods={MOCK_FOODS} />);

    // Check if the FlatList is rendered
    const flatList = getByTestId('foods-list');
    expect(flatList).toBeTruthy();

    // Check if the Food components are rendered
    expect(getByText(name1)).toBeTruthy();
    expect(getByText(name2)).toBeTruthy();
  });

  it('renders correctly with horizontal layout', () => {
    const { getByTestId } = render(<FoodsList foods={MOCK_FOODS} horizontal />);

    // Check if the FlatList has horizontal layout
    const flatList = getByTestId('foods-list');
    expect(flatList.props.horizontal).toBe(true);
  });
});
