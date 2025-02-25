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

const Button: React.FC<ButtonProps> = ({
  children,
  isLoading = false,
  style,
  variant = 'contained',
  width = '100%',
  backgroundColor = COLOR.LIGHT_GREEN,
  ...props
}) => {
  return (
    <Pressable
      {...props}
      style={({ pressed }) => [
        styles.base,
        styles[variant],
        { width, backgroundColor, opacity: pressed ? 0.8 : 1 },
        variant === 'icon' && { height: width, aspectRatio: 1 },
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
