import { memo, useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { COLORS } from '@constants';

import { TNutritional } from '@types';

const Nutritional = ({ nutritional }: { nutritional: TNutritional }) => {
  const nutritionalList = useMemo(() => {
    return Object.entries(nutritional).map(([title, value]) => ({
      title,
      value,
    }));
  }, [nutritional]);

  return (
    <View style={styles.container}>
      {nutritionalList.map(({ title, value }) => (
        <View key={title}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.value}>{`${value}g`}</Text>
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
  title: {
    fontSize: 16,
    textTransform: 'capitalize',
    color: COLORS.PRIMARY,
  },
  value: { fontSize: 24, color: COLORS.SECONDARY },
});
