import { Categories } from '@/components';

import { CATEGORIES } from '@/constants';

import { fireEvent, render } from '@/utils/test-utils';

import { useFilters } from '@/hooks/useFilters';

import withFilters from '../withFilters';

jest.mock('@/hooks/useFilters', () => ({
  useFilters: jest.fn(),
}));

describe('withFiltersFood HOC', () => {
  const WrappedComponent = withFilters(Categories);

  let mockSetFilters: jest.Mock;

  beforeEach(() => {
    mockSetFilters = jest.fn();

    (useFilters as jest.Mock).mockImplementation(() => ({
      filters: [],
      setFilters: mockSetFilters,
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should toggle category selection', () => {
    const [{ name, id }] = CATEGORIES;
    const { getByText } = render(<WrappedComponent categories={CATEGORIES} />);

    const fruitButton = getByText(name);
    fireEvent.press(fruitButton);
    expect(mockSetFilters).toHaveBeenCalledWith([id]);
  });
});
