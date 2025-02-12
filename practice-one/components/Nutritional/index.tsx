import { memo, useCallback, useMemo } from 'react';
import { FlatList, StyleSheet, Text, View, ViewStyle } from 'react-native';

import { COLOR, COLORS } from '@constants';

import { TNutritional } from '@types';

interface INutritional {
  title: string;
  value: number;
}

const Nutritional = ({
  nutritional,
  customStyles,
}: {
  nutritional: TNutritional;
  color?: COLOR;
  customStyles?: ViewStyle;
}) => {
  const vi = useMemo(() => {
    return Object.entries(nutritional).map(([x, y]) => ({
      title: x,
      value: y,
    }));
  }, [nutritional]);

  const Item = ({ title, value }: INutritional) => (
    <View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.value}>{`${value}g`}</Text>
    </View>
  );

  const handleItemSeparatorComponent = useCallback(
    () => <View style={{ marginLeft: 40 }} />,
    [],
  );

  const handleRenderItem = useCallback(({ item }: { item: INutritional }) => {
    return <Item {...item} />;
  }, []);

  const handleKeyExtractor = useCallback(
    (item: INutritional) => item.title + '',
    [],
  );

  return (
    <View style={[styles.container, customStyles]}>
      <FlatList
        data={vi}
        horizontal
        renderItem={handleRenderItem}
        ItemSeparatorComponent={handleItemSeparatorComponent}
        keyExtractor={handleKeyExtractor}
      />
    </View>
  );
};

export default memo(Nutritional);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF8EE',
    justifyContent: 'center',
    paddingVertical: 19,
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    textTransform: 'capitalize',
    color: COLORS.PRIMARY,
  },
  value: { fontSize: 24, color: COLORS.SECONDARY },
});
