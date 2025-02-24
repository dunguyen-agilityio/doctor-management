import { CategoriesWithContext } from '@/hocs/CategoriesWithContext';
import { fireEvent, render } from '@testing-library/react-native';

import { CATEGORIES } from '@/constants';

import { useFilters } from '@/hooks/useFilters';

jest.mock('@/hooks/useFilters', () => ({
  useFilters: jest.fn(),
}));

describe('CategoriesWithContext', () => {
  const [{ id: categoryId, name: categoryName }] = CATEGORIES;

  afterEach(() => {
    (useFilters as jest.Mock).mockClear();
  });

  it('renders categories and handles selection correctly', () => {
    const mockSetFilters = jest.fn();
    (useFilters as jest.Mock).mockReturnValue({
      filters: [],
      setFilters: mockSetFilters,
    });

    const { getByText } = render(<CategoriesWithContext />);

    const category = getByText(categoryName);

    fireEvent.press(category);

    expect(mockSetFilters).toHaveBeenCalledTimes(1);

    expect(mockSetFilters).toHaveBeenCalledWith([categoryId]);
  });

  it('renders categories and handles selection correctly', () => {
    const mockSetFilters = jest.fn();
    (useFilters as jest.Mock).mockReturnValue({
      filters: [categoryId],
      setFilters: mockSetFilters,
    });

    const { getByText } = render(<CategoriesWithContext />);

    const category = getByText(categoryName);

    fireEvent.press(category);

    expect(mockSetFilters).toHaveBeenCalledTimes(1);

    expect(mockSetFilters).toHaveBeenCalledWith([]);
  });
});
