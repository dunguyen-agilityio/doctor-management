import { useContext } from 'react';
import { Button, View } from 'react-native';

import { Text } from '@/components';

import { fireEvent, render } from '@/utils/test-utils';

import FiltersProvider, {
  FiltersActionContext,
  FiltersContext,
} from '@/contexts/filters';

describe('FiltersProvider', () => {
  it('updates filters when setFilters is called', () => {
    const TestComponent = () => {
      const filters = useContext(FiltersContext);
      const setFilters = useContext(FiltersActionContext);

      return (
        <View>
          <Text>{filters.join(', ')}</Text>
          <Button
            onPress={() => setFilters(['vegan', 'gluten-free'])}
            title="Update Filters"
          />
        </View>
      );
    };

    const { getByText } = render(
      <FiltersProvider>
        <TestComponent />
      </FiltersProvider>,
    );

    const button = getByText('Update Filters');
    fireEvent.press(button);

    expect(getByText('vegan, gluten-free')).toBeTruthy();
  });
});
