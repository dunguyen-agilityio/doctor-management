import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

import { COLOR } from '@/theme';

import Text from '../Text';

interface CategoryItemProps extends TouchableOpacityProps {
  isActive?: boolean;
  onPressItem?: (id: string) => void;
  value: string;
  marginRight?: number;
  marginLeft?: number;
}

const CategoryItem = ({
  isActive,
  value,
  children,
  marginLeft = 0,
  marginRight = 0,
  onPressItem,
  ...props
}: CategoryItemProps) => {
  const handlePress = () => {
    onPressItem?.(value);
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      {...props}
      style={[
        styles.button,
        isActive && styles.buttonActive,
        { marginLeft, marginRight },
        props.style,
      ]}
    >
      <Text variant="body1" style={isActive && { fontWeight: '500' }}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

export default CategoryItem;

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
