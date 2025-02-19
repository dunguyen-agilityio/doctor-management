import { CATEGORIES } from '@/constants';

import { fireEvent, render } from '@/utils/test-utils';

import { MOCK_FOODS } from '@/mocks';

import FoodInfo from './index';

describe('FoodInfo Component', () => {
  const MOCK_FOOD = MOCK_FOODS[0];
  const defaultProps = {
    ...MOCK_FOOD,
    ingredients: MOCK_FOOD.ingredients.slice(0, 2),
    category: CATEGORIES[0].name,
    desc: 'A nutritious vegetable that is great for health and vision. A nutritious vegetable that is great for health and vision. A nutritious vegetable that is great for health and vision. A nutritious vegetable that is great for health and vision.',
  };
  const { name, category, ingredients } = defaultProps;

  it('renders correctly with all props', () => {
    const { getByText } = render(<FoodInfo {...defaultProps} />);

    expect(getByText(name)).toBeTruthy();
    expect(getByText(category)).toBeTruthy();
    expect(getByText(`${ingredients[0].value} cal`)).toBeTruthy();
    expect(getByText(ingredients[0].name)).toBeTruthy();
  });

  it('truncates description and expands on toggle', () => {
    const { getByText } = render(<FoodInfo {...defaultProps} />);
    expect(
      getByText(/A nutritious vegetable that is great for health.../),
    ).toBeTruthy();

    fireEvent.press(getByText('\bRead more.'));
    expect(
      getByText(/A nutritious vegetable that is great for health and vision./),
    ).toBeTruthy();

    fireEvent.press(getByText('\bRead less.'));
    expect(
      getByText(/A nutritious vegetable that is great for health.../),
    ).toBeTruthy();
  });

  it('shows only two ingredients initially and expands on toggle', () => {
    const { getByText, queryByText } = render(
      <FoodInfo
        {...defaultProps}
        ingredients={[
          ...defaultProps.ingredients,
          { id: '3', name: 'Cucumber', value: 2 },
        ]}
      />,
    );

    expect(getByText(ingredients[0].name)).toBeTruthy();
    expect(getByText(ingredients[1].name)).toBeTruthy();
    expect(queryByText('Cucumber')).toBeFalsy();

    fireEvent.press(getByText('\bSee all'));
    expect(getByText('Cucumber')).toBeTruthy();

    fireEvent.press(getByText('\bSee less.'));
    expect(queryByText('Cucumber')).toBeFalsy();
  });
});
