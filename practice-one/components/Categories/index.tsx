import { StyleSheet, FlatList, View } from 'react-native';
import React, { memo } from 'react';

import { COLORS } from '@constants';
import { ICategory } from '@types';
import { Button } from '@components/common';
import { CATEGORIES } from '@constants';

export interface ICategories {
  onSelect: (ids: number[]) => void;
  select: number[];
}

const Categories = ({ select, onSelect }: ICategories) => {
  const handlePressTag = (id: number) => {
    const newTags = select.includes(id)
      ? select.filter((item) => item !== id)
      : [...select, id];
    onSelect(newTags);
  };

  const handleItemSeparatorComponent = () => <View style={styles.item} />;

  const handleKeyExtractor = (item: ICategory) => item.id + '';

  const handleRenderItem = ({
    item,
    index,
  }: {
    item: ICategory;
    index: number;
  }) => {
    const { id, name } = item;
    const isActive = select.includes(id);

    return (
      <Button
        label={name}
        type={isActive ? 'active' : 'default'}
        customStyle={{
          ...styles.tag,
          ...(isActive && { ...styles.active }),
          ...(index == 0 && { marginLeft: 16 }),
          ...(index == CATEGORIES.length - 1 && { marginRight: 16 }),
        }}
        onPress={() => handlePressTag(id)}
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={CATEGORIES}
        showsHorizontalScrollIndicator={false}
        horizontal
        ItemSeparatorComponent={handleItemSeparatorComponent}
        keyExtractor={handleKeyExtractor}
        renderItem={handleRenderItem}
      />
    </View>
  );
};

export default memo(Categories);

const styles = StyleSheet.create({
  container: {
    height: 26,
    marginTop: 16,
  },
  item: {
    marginLeft: 7,
  },
  tag: {
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  active: {
    backgroundColor: 'rgba(28, 195, 121, 0.1)',
    borderWidth: 1,
    borderColor: COLORS.GREEN,
  },
});
