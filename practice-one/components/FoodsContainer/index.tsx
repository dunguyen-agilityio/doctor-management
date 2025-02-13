import { useContext } from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';

import { FoodsContext } from '@contexts/foods';

import { FoodsList } from '@components';
import { FoodsListProps } from '@components/FoodsList';

import { COLORS } from '@constants';

interface FoodsContainerProps extends ViewProps {
  slotProps?: { list: Partial<FoodsListProps> };
  ListTitleComponent?: React.ReactNode;
}

const FoodsContainer = ({
  slotProps,
  ListTitleComponent,
}: FoodsContainerProps) => {
  const { foods } = useContext(FoodsContext);
  const { list } = slotProps ?? {};
  console.log('rerender');

  return (
    <View style={styles.container}>
      {ListTitleComponent}
      <FoodsList {...list} foods={foods} style={styles.list} />
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
});
