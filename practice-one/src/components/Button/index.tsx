import {
  Pressable,
  PressableProps as RNPressableProps,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { ActivityIndicator } from 'react-native';

import { COLOR } from '@/constants';

interface ButtonProps
  extends RNPressableProps,
    Pick<ViewStyle, 'width' | 'backgroundColor'> {
  variant?: 'contained' | 'outlined' | 'icon';
  isLoading?: boolean;
}

const Button = ({
  children,
  isLoading,
  style,
  variant = 'contained',
  width = '100%',
  backgroundColor = COLOR.LIGHT_GREEN,
  ...props
}: ButtonProps) => {
  const customStyle = [
    styles[variant],
    { width, backgroundColor },
    variant === 'icon' && { height: width },
    style,
  ];

  return (
    <Pressable {...props} style={customStyle} role="button">
      {isLoading ? (
        <ActivityIndicator size="small" color={COLOR.GREEN} />
      ) : (
        children
      )}
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  contained: {
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 16,
  },
  outlined: {},
  icon: {
    borderRadius: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
