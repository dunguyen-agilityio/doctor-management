import FoodCard from '@/components/FoodCard';

import { fireEvent, render, screen } from '@/utils/test-utils';

import { MOCK_FOODS } from '@/mocks/foods';

const mockOnPress = jest.fn();

describe('FoodCard Component', () => {
  const { nutritional, name, id, weight, ...rest } = MOCK_FOODS[0];
  const { calories } = nutritional;
  const foodProps = {
    ...rest,
    name,
    id,
    calories,
    weight,
    onPress: mockOnPress,
  };

  it('renders correctly with given props', () => {
    render(<FoodCard {...foodProps} />);

    expect(screen.getByText(name)).toBeTruthy();
    expect(screen.getByText(`${calories} cal/${weight} kg`)).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    render(<FoodCard {...foodProps} />);

    const pressable = screen.getByText(name);
    fireEvent.press(pressable);

    expect(mockOnPress).toHaveBeenCalledWith(id);
  });
});
