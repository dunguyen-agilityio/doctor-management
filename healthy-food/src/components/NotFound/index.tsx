import { StyleSheet, View } from 'react-native';

import { Image } from 'expo-image';

import { COLOR } from '@/theme';

import { APP_ICON } from '@/icons';

import Text from '../Text';

const NO_FOOD_FOUND_DESCRIPTION = `You don't save any food. Go ahead, search\nand save your favorite food`;
const NO_FOOD_FOUND_TITLE = 'No Food Found';

const NotFound = ({
  description = NO_FOOD_FOUND_DESCRIPTION,
  image = (
    <Image
      source={APP_ICON.NOT_FOUND}
      testID="not-found-image"
      style={styles.image}
    />
  ),
  title = NO_FOOD_FOUND_TITLE,
}: {
  title?: string;
  description?: string;
  image?: React.ReactNode;
}) => {
  return (
    <View testID="not-found" style={styles.container}>
      <View style={styles.header}>
        {image}
        <Text
          variant="title1"
          color={COLOR.TERTIARY}
          style={{ fontWeight: 500 }}
        >
          {title}
        </Text>
      </View>

      <Text variant="body1" color={COLOR.GRAY} style={styles.description}>
        {description}
      </Text>
    </View>
  );
};

export default NotFound;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    width: '100%',
  },
  header: {
    gap: 24,
    alignItems: 'center',
  },
  description: {
    textAlign: 'center',
    lineHeight: 22,
    letterSpacing: -0.24,
  },
  image: {
    width: 96,
    height: 96,
  },
});
