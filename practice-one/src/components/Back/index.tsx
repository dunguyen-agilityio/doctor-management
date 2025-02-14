import { memo } from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';

interface BackProps {
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
  onPress?: () => void;
}

const Back = ({
  top = 0,
  left = 0,
  right = 0,
  bottom = 0,
  onPress,
}: BackProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image
        source={require('@/assets/icons/back.png')}
        style={[styles.icon, { top, left, right, bottom }]}
      />
    </TouchableOpacity>
  );
};

export default memo(Back);

const styles = StyleSheet.create({
  icon: {
    position: 'absolute',
  },
});
