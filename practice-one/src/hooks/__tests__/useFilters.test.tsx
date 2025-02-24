import { renderHook } from '@/utils/test-utils';

import { useFilters } from '@/hooks/useFilters';

import FiltersProvider from '@/contexts/filters';

describe('useFilters', () => {
  it('returns filters and setFilters when inside FiltersProvider', () => {
    const wrapper = ({ children }: React.PropsWithChildren) => (
      <FiltersProvider>{children}</FiltersProvider>
    );

    const { result } = renderHook(() => useFilters(), { wrapper });

    expect(result.current.filters).toBeTruthy();
    expect(result.current.setFilters).toBeTruthy();
  });
});
