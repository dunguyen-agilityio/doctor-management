import { memo } from 'react';
import {
  Image,
  ImageProps,
  Pressable,
  PressableProps,
  StyleSheet,
} from 'react-native';

interface IconButtonProps extends PressableProps {
  icon: ImageProps['source'];
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
  onPress?: () => void;
  testID?: string;
}

const IconButton = ({
  icon,
  top = 0,
  left = 0,
  right = 0,
  bottom = 0,
  onPress,
  testID = 'icon-button',
}: IconButtonProps) => {
  return (
    <Pressable onPress={onPress} testID={testID}>
      <Image
        source={icon}
        style={[styles.icon, { top, left, right, bottom }]}
      />
    </Pressable>
  );
};

export default memo(IconButton);

const styles = StyleSheet.create({
  icon: {
    position: 'absolute',
  },
});
