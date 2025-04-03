import { CATEGORIES } from '@/constants';

import { fireEvent, render } from '@/utils/test-utils';

import { COLOR } from '@/theme';

import Categories from './index';

describe('Categories Component', () => {
  it('renders all categories', () => {
    const { getByText } = render(<Categories options={CATEGORIES} />);

    CATEGORIES.forEach((category) => {
      expect(getByText(category.name)).toBeTruthy();
    });
  });

  it('calls onSelect when a category is pressed', () => {
    const mockOnChange = jest.fn();
    const { name, value } = CATEGORIES[0];
    const { getByText } = render(
      <Categories options={CATEGORIES} onChange={mockOnChange} />,
    );

    fireEvent.press(getByText(name));
    expect(mockOnChange).toHaveBeenCalledWith([value]);
  });

  it('applies active styles when a category is selected', () => {
    const { name, value } = CATEGORIES[1];
    const { getByText } = render(
      <Categories options={CATEGORIES} values={[value]} />,
    );

    const activeCategory = getByText(name);

    expect(activeCategory.parent?.parent?.parent?.props.style).toEqual(
      expect.objectContaining({ borderColor: COLOR.GREEN }),
    );
  });
});
