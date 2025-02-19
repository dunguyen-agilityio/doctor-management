import { memo } from 'react';
import { StyleSheet, View } from 'react-native';

import { COLOR } from '@/constants';

import { TNutritional } from '@/types';

import Text from '../Text';

const Nutritional = ({ nutritional }: { nutritional: TNutritional }) => {
  const nutritionalList = Object.entries(nutritional).map(([title, value]) => ({
    title,
    value,
  }));

  return (
    <View style={styles.container}>
      {nutritionalList.map(({ title, value }) => (
        <View key={title}>
          <Text variant="body6" color={COLOR.PRIMARY}>
            {title}
          </Text>
          <Text variant="body4" color={COLOR.SECONDARY}>{`${value}g`}</Text>
        </View>
      ))}
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
    flexDirection: 'row',
    gap: 40,
  },
});
