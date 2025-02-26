import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  ViewStyle,
} from 'react-native';
import { StyleProp } from 'react-native';

import { COLOR } from '@/constants';

interface ButtonProps extends PressableProps {
  variant?: 'contained' | 'outlined' | 'icon';
  isLoading?: boolean;
  width?: ViewStyle['width'];
  backgroundColor?: string;
  style?: StyleProp<ViewStyle>;
}

const ICON_SIZE = 20;

const Button: React.FC<ButtonProps> = ({
  children,
  isLoading = false,
  style,
  variant = 'contained',
  width,
  backgroundColor = COLOR.LIGHT_GREEN,
  ...props
}) => {
  const isIcon = variant === 'icon';

  return (
    <Pressable
      {...props}
      style={({ pressed }) => [
        styles.base,
        styles[variant],
        { width, backgroundColor, opacity: pressed ? 0.8 : 1 },
        isIcon && {
          height: width ?? ICON_SIZE,
          width: width ?? ICON_SIZE,
          aspectRatio: 1,
          paddingVertical: 0,
          paddingHorizontal: 0,
        },
        style,
      ]}
      accessibilityRole="button"
      disabled={props.disabled || isLoading}
    >
      {isLoading ? (
        <ActivityIndicator
          testID="loading-indicator"
          size="small"
          color={COLOR.GREEN}
        />
      ) : typeof children === 'string' ? (
        <Text style={styles.text}>{children}</Text>
      ) : (
        children
      )}
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  base: {
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contained: {
    backgroundColor: COLOR.LIGHT_GREEN,
  },
  outlined: {
    borderWidth: 2,
    borderColor: COLOR.LIGHT_GREEN,
    backgroundColor: 'transparent',
  },
  icon: {
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});
