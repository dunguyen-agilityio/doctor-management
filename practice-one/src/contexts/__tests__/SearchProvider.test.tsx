import { fireEvent, render } from '@testing-library/react-native';

import { useContext } from 'react';
import { Button, View } from 'react-native';

import { Text } from '@/components';

import SearchProvider, {
  SearchActionContext,
  SearchContext,
} from '@/contexts/search';

describe('SearchProvider', () => {
  it('provides an initial empty query', () => {
    const TestComponent = () => {
      const query = useContext(SearchContext);
      return <Text>{query}</Text>;
    };

    const { getByText } = render(
      <SearchProvider>
        <TestComponent />
      </SearchProvider>,
    );

    expect(getByText('')).toBeTruthy();
  });

  it('updates the query when setQuery is called', () => {
    const TestComponent = () => {
      const query = useContext(SearchContext);
      const setQuery = useContext(SearchActionContext);

      return (
        <View>
          <Text>{query}</Text>
          <Button onPress={() => setQuery('apple')} title="Update Query" />
        </View>
      );
    };

    const { getByText } = render(
      <SearchProvider>
        <TestComponent />
      </SearchProvider>,
    );

    const button = getByText('Update Query');
    fireEvent.press(button);

    expect(getByText('apple')).toBeTruthy();
  });
});
