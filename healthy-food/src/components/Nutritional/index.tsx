import { StyleSheet, View } from 'react-native';

import type { TNutritional } from '@/types';

import { COLOR } from '@/theme';

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
          <Text
            variant="body6"
            color={COLOR.PRIMARY}
            textTransform="capitalize"
          >
            {title}
          </Text>
          <Text variant="body4" color={COLOR.SECONDARY}>{`${value}g`}</Text>
        </View>
      ))}
    </View>
  );
};

export default Nutritional;

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
