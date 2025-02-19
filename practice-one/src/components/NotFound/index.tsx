import { StyleSheet, Text, View } from 'react-native';

import { COLOR } from '@/constants';

import { NotFoundImage } from '../icons';

const NO_FOODS_FOUND_DESCRIPTION = `You don't save any food. Go ahead, search\nand save your favorite food`;
const NO_FOODS_FOUND_TITLE = 'No Foods Found';

const NotFound = ({
  description = NO_FOODS_FOUND_DESCRIPTION,
  image = <NotFoundImage />,
  title = NO_FOODS_FOUND_TITLE,
}: {
  title?: string;
  description?: string;
  image?: React.ReactNode;
}) => {
  return (
    <View testID="not-found-container" style={styles.container}>
      <View testID="not-found-header" style={styles.header}>
        {image}
        <Text style={styles.title}>{title}</Text>
      </View>

      <Text style={styles.description}>{description}</Text>
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
  title: {
    marginTop: 24,
    color: '#696969',
    fontSize: 22,
    fontWeight: '500',
    lineHeight: 31,
  },
  description: {
    fontSize: 13,
    color: COLOR.GRAY,
    textAlign: 'center',
  },
});
