import { render, screen } from '@utils/test-utils';
import React from 'react';
import { FoodsProps } from '../index';

import { MOCK_FOODS } from '@__mock__';
import { FoodsList } from '@components';

function setup(props: FoodsProps) {
  return render(<FoodsList {...props} />);
}

describe('Component', () => {
  it('renders correctly', () => {
    const component = setup({ foods: MOCK_FOODS });

    expect(component).toMatchSnapshot();

    MOCK_FOODS.forEach(({ name }) => {
      if (name) expect(screen.getByText(name)).toBeTruthy();
    });

    // const item = MOCK_FOODS[1];
    // if (item.name) {
    //   const select = component.getByText(item.name);
    //   if (select) {
    //     fireEvent.press(select);
    //     expect(mockFoodOnPress).toHaveBeenCalledWith(item.id);
    //   }
    // }
  });
});
