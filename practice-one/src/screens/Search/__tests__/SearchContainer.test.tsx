import SearchContainer from '@/screens/Search/SearchContainer';

import { render } from '@/utils/test-utils';

import FiltersProvider from '@/contexts/filters';
import SearchProvider from '@/contexts/search';

describe('SearchContainer', () => {
  it('renders FoodContainer match snapshot', () => {
    const tree = render(
      <SearchProvider>
        <FiltersProvider>
          <SearchContainer />
        </FiltersProvider>
      </SearchProvider>,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
