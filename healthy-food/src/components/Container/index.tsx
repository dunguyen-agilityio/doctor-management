import { memo } from 'react';
import { StyleSheet, View, type ViewStyle } from 'react-native';

import { COLOR } from '@/constants';

const Container = ({
  children,
  testID,
  ...props
}: React.PropsWithChildren<ViewStyle & { testID?: string }>) => {
  return (
    <View style={[styles.container, props]} testID={testID}>
      {children}
    </View>
  );
};

export default memo(Container);

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.WHITE,
    flex: 1,
  },
});
