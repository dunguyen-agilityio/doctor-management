import { CATEGORIES } from '@/constants';

import { IFood } from '@/types';

import { fireEvent, render, waitFor } from '@/utils/test-utils';

import { MOCK_FOOD_LIST } from '@/mocks/food';

import FoodInfo from './index';

jest.mock('@/services/food', () => ({
  getFoodById: jest.fn(),
}));

describe('FoodInfo Component', () => {
  const food = MOCK_FOOD_LIST[0];
  const { id: categoryValue, name: categoryName } = CATEGORIES[0];
  const mockFood = {
    ...food,
    ingredients: food.ingredients.slice(0, 2),
    category: categoryValue,
    desc: 'A nutritious vegetable that is great for health and vision. A nutritious vegetable that is great for health and vision. A nutritious vegetable that is great for health and vision. A nutritious vegetable that is great for health and vision.',
  };
  const { name, ingredients } = mockFood;

  const renderComponent = (food = mockFood) => render(<FoodInfo food={food} />);

  it('renders correctly with all props', async () => {
    const { getByText } = renderComponent();

    await waitFor(() => {
      expect(getByText(name)).toBeTruthy();
      expect(getByText(categoryName)).toBeTruthy();
      expect(getByText(`${ingredients[0].value} cal`)).toBeTruthy();
      expect(getByText(ingredients[0].name)).toBeTruthy();
    });
  });

  it('truncates description and expands on toggle', async () => {
    const { getByText } = renderComponent();
    await waitFor(() => {
      expect(
        getByText(/A nutritious vegetable that is great for health.../),
      ).toBeTruthy();
    });

    fireEvent.press(getByText('\bRead more.'));
    expect(
      getByText(/A nutritious vegetable that is great for health and vision./),
    ).toBeTruthy();

    fireEvent.press(getByText('\bRead less.'));
    expect(
      getByText(/A nutritious vegetable that is great for health.../),
    ).toBeTruthy();
  });

  it('shows only two ingredients initially and expands on toggle', async () => {
    const food = {
      ...mockFood,
      ingredients: [...ingredients, { id: '3', name: 'Cucumber', value: 100 }],
    } as IFood;
    const { getByText, queryByText } = renderComponent(food);

    await waitFor(() => {
      expect(getByText(ingredients[0].name)).toBeTruthy();
      expect(getByText(ingredients[1].name)).toBeTruthy();
    });

    expect(queryByText('Cucumber')).toBeFalsy();

    fireEvent.press(getByText('\bSee all'));
    expect(getByText('Cucumber')).toBeTruthy();

    fireEvent.press(getByText('\bSee less.'));
    expect(queryByText('Cucumber')).toBeFalsy();
  });
});
