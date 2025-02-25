import { SearchInput } from '@/components';

import { fireEvent, render, waitFor } from '@/utils/test-utils';

import { useSearchQuery } from '@/hooks/useSearchQuery';

import withSearch from '../withSearch';

jest.mock('@/hooks/useSearchQuery', () => ({
  useSearchQuery: jest.fn(),
}));

jest.mock('@/hooks/useFilters', () => ({
  useFilters: jest.fn(),
}));

describe('withSearch HOC', () => {
  const WrappedComponent = withSearch(SearchInput);
  let mockSetQuery: jest.Mock;

  beforeEach(() => {
    mockSetQuery = jest.fn();

    (useSearchQuery as jest.Mock).mockImplementation(() => ({
      query: 'test',
      setQuery: mockSetQuery,
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should pass query and onSearch props correctly', () => {
    const { getByDisplayValue } = render(<WrappedComponent />);
    expect(getByDisplayValue('test')).toBeTruthy();
  });

  it('should update query when text changed', async () => {
    jest.useFakeTimers();

    const { getByPlaceholderText } = render(<WrappedComponent />);

    fireEvent.changeText(
      getByPlaceholderText('Search for healthy food'),
      'new value',
    );
    jest.advanceTimersByTime(500);

    await waitFor(() => {
      expect(mockSetQuery).toHaveBeenCalledWith('new value');
    });
  });
});
