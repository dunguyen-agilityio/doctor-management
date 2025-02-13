import { StyleSheet, Text, View, ViewProps } from 'react-native';

import { useFoods } from '@hooks';

import { Loading } from '@components';

import { COLORS } from '@constants';

import { FoodOptions } from '@services';

interface FoodsContainerProps extends ViewProps {
  options?: FoodOptions;
  fallback?: React.ReactNode;
  emptyContent?: React.ReactNode;
}

const FoodsContainer = ({
  children,
  style,
  options = {},
  fallback = <Loading />,
  ...rest
}: React.PropsWithChildren<FoodsContainerProps>) => {
  const { error, isLoading, data } = useFoods(options);

  if (!isLoading && (error || !data)) {
    return <Text>Error</Text>;
  }

  return (
    <View {...rest} style={[styles.container, style]}>
      {children}
      {isLoading && fallback}
    </View>
  );
};

export default FoodsContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  list: { marginTop: 15 },
  title: {
    fontWeight: '700',
    fontSize: 20,
    marginTop: 22,
    marginLeft: 8,
  },
});
