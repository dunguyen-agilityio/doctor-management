import React, { memo, ReactNode } from 'react';
import {
  Text,
  TextStyle,
  TextProps as RNTextProps,
  ViewStyle,
} from 'react-native';
import {
  COLORS,
  FONT_SIZES,
  FONT_SIZE_TYPE,
  FONT_WEIGHT_TYPE,
} from '@constants';

export type COLOR_TYPES =
  | 'primary'
  | 'regular'
  | 'white'
  | 'secondary'
  | 'black'
  | 'gray'
  | 'green';

export const TEXT_COLOR = {
  primary: COLORS.PRIMARY,
  regular: COLORS.GRAY,
  white: COLORS.WHITE,
  secondary: COLORS.ORANGE,
  black: COLORS.BLACK,
  gray: COLORS.LIGHT_1_GRAY,
  green: COLORS.DARK_GREEN,
};

export interface TextProps extends RNTextProps {
  color?: COLOR_TYPES;
  textAlign?: boolean;
  fontSize?: FONT_SIZE_TYPE;
  fontWeight?: FONT_WEIGHT_TYPE;
  customStyle?: ViewStyle | TextStyle;
  children?: ReactNode | string;
}

const CustomText = ({
  fontSize = 'm',
  fontWeight,
  color = 'regular',
  onPress,
  children,
  customStyle,
}: TextProps) => {
  return (
    <Text
      onPress={onPress}
      style={[
        {
          fontSize: FONT_SIZES[fontSize] ?? 14,
          fontWeight,
          color: TEXT_COLOR[color],
        },
        { ...customStyle },
      ]}
    >
      {children}
    </Text>
  );
};

export default memo(CustomText);
