import { TouchableOpacityProps } from 'react-native-gesture-handler';

import React, { memo } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { COLOR } from '@/constants';

import Text from '../Text';

interface CategoryItemProps extends TouchableOpacityProps {
  isActive?: boolean;
  onPressItem?: (id: string) => void;
  id: string;
  marginRight?: number;
  marginLeft?: number;
}

const CategoryItem = ({
  isActive,
  id,
  style,
  children,
  marginLeft = 0,
  marginRight = 0,
  onPressItem,
  ...props
}: CategoryItemProps) => {
  const handlePress = () => {
    onPressItem?.(id);
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        isActive && styles.buttonActive,
        { marginLeft, marginRight },
        style,
      ]}
      onPress={handlePress}
      {...props}
    >
      <Text variant="body1" style={isActive && { fontWeight: '500' }}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

export default memo(CategoryItem);

const styles = StyleSheet.create({
  buttonActive: {
    backgroundColor: COLOR.LIGHT_GREEN_10,
    borderWidth: 1,
    borderColor: COLOR.GREEN,
  },
  button: {
    backgroundColor: COLOR.LIGHT_GRAY,
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
