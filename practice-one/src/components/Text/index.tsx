import { useMemo } from 'react';
import {
  Text as RNText,
  TextProps as RNTextProps,
  StyleSheet,
  TextStyle,
} from 'react-native';

import { COLOR } from '@/constants';

import { isInEnum } from '@/utils/enum';

export enum TextColor {
  PRIMARY = 'PRIMARY',
  SECONDARY = 'SECONDARY',
  TERTIARY = 'TERTIARY',
  FOURTH = 'FOURTH',
}

const getTextColor = (color: keyof typeof TextColor) => {
  switch (color) {
    case TextColor.PRIMARY:
      return COLOR.PRIMARY;

    case TextColor.SECONDARY:
      return COLOR.SECONDARY;

    case TextColor.TERTIARY:
      return COLOR.BLACK_BEAN;

    case TextColor.FOURTH:
      return COLOR.DARK_GREEN;
  }
};

interface TextProps extends RNTextProps {
  variant?: keyof typeof styles;
  color?: TextColor | string;
  textTransform?: TextStyle['textTransform'];
}

const Text = ({
  variant = 'base',
  color,
  textTransform,
  style,
  ...props
}: TextProps) => {
  const customStyle = useMemo(() => {
    const textColor = color
      ? isInEnum(TextColor, color)
        ? getTextColor(color)
        : color
      : COLOR.PRIMARY;

    const compose = {
      ...styles.base,
      ...styles[variant],
      color: textColor,
      textTransform,
    };

    return compose;
  }, [color, textTransform, variant]);

  return <RNText style={[customStyle, style]} {...props} />;
};

const styles = StyleSheet.create({
  base: {
    fontWeight: '400',
    fontFamily: 'Manrope',
  },
  main1: {
    fontWeight: '800',
    fontSize: 32,
    textTransform: 'uppercase',
    color: COLOR.PRIMARY,
  },
  main2: {
    fontWeight: '800',
    fontSize: 23,
    lineHeight: 32,
  },
  title1: {
    fontSize: 22,
    fontWeight: '700',
    lineHeight: 30,
  },
  title2: {
    fontSize: 17,
    lineHeight: 23,
    fontWeight: '700',
  },
  title3: {
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 27,
  },
  subtitle1: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 30,
  },
  subtitle2: {
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 23,
  },
  subtitle3: {},
  subtitle4: {
    fontFamily: 'Signika',
    fontSize: 17,
    fontWeight: '600',
    lineHeight: 24,
  },
  subtitle5: {
    fontFamily: 'Signika',
    fontSize: 10,
    fontWeight: '600',
    lineHeight: 14,
    textTransform: 'uppercase',
  },
  subtitle6: {
    fontFamily: 'Signika',
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 20,
  },
  body1: {
    fontSize: 13,
    lineHeight: 18,
  },
  body2: {
    fontSize: 13,
    lineHeight: 22,
  },
  body3: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '500',
  },
  body4: {
    fontSize: 24,
    lineHeight: 33,
  },
  body5: {
    fontWeight: '500',
    fontSize: 11,
    lineHeight: 15,
  },
  body6: {
    fontSize: 16,
    lineHeight: 20,
  },
  body7: {
    fontSize: 15,
    lineHeight: 22,
  },
  body8: {
    fontSize: 15,
    lineHeight: 30,
  },
});

export default Text;
