import { StyleSheet, Text, View, ViewProps } from 'react-native';

import { useFoods } from '@hooks';

import { Loading } from '@components';

import { COLORS } from '@constants';

import { FilterState, useFilterStore } from '@stores/filter';

const FoodsContainer = ({
  children,
  favorite,
  getQuery,
  style,
}: React.PropsWithChildren<
  ViewProps & { favorite?: 0 | 1; getQuery: (state: FilterState) => string }
>) => {
  const query = useFilterStore(getQuery);
  const categories = useFilterStore(({ categories }) => categories);
  const { isError, isLoading } = useFoods({ query, favorite, categories });

  if (isError) {
    return <Text>Error</Text>;
  }

  return (
    <View style={[styles.container, style]}>
      {children}
      {isLoading && <Loading />}
    </View>
  );
};

export default FoodsContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
});
