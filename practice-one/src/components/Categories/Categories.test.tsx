import { CATEGORIES, COLOR } from '@/constants';

import { fireEvent, render } from '@/utils/test-utils';

import Categories from './index';

describe('Categories Component', () => {
  it('renders all categories', () => {
    const { getByText } = render(<Categories categories={CATEGORIES} />);

    CATEGORIES.forEach((category) => {
      expect(getByText(category.name)).toBeTruthy();
    });
  });

  it('calls onSelect when a category is pressed', () => {
    const mockOnChange = jest.fn();
    const { name, id } = CATEGORIES[0];
    const { getByText } = render(
      <Categories categories={CATEGORIES} onSelect={mockOnChange} />,
    );

    fireEvent.press(getByText(name));
    expect(mockOnChange).toHaveBeenCalledWith(id);
  });

  it('applies active styles when a category is selected', () => {
    const { name, id } = CATEGORIES[1];
    const { getByText } = render(
      <Categories categories={CATEGORIES} categoriesValue={[id]} />,
    );

    const activeCategory = getByText(name);

    expect(activeCategory.parent?.parent?.parent?.props.style).toEqual(
      expect.objectContaining({ borderColor: COLOR.GREEN }),
    );
  });
});
