import { forwardRef, useImperativeHandle, useRef } from 'react';
import { StyleSheet, TextInput, TextInputProps, View } from 'react-native';

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Image } from 'expo-image';

import { APP_ICONS, COLOR } from '@/constants';

import { debounce } from '@/utils/debounce';

import Button from '../Button';

interface SearchInputProps extends TextInputProps {
  onSearch?: (value: string) => void;
  query?: string;
}

const SearchInput = (
  { onSearch, onPress, query, ...otherProps }: SearchInputProps,
  ref: React.ForwardedRef<Pick<TextInput, 'focus' | 'clear'>>,
) => {
  const inputRef = useRef<TextInput>(null);

  useImperativeHandle(
    ref,
    () => ({
      focus: () => inputRef.current?.focus(),
      clear: () => {
        return inputRef.current?.clear();
      },
    }),
    [],
  );

  const debouncedChangeText = debounce((value: string) => {
    onSearch?.(value);
  }, 500);

  const handleClear = () => {
    onSearch?.('');
    inputRef.current?.clear();
  };

  return (
    <View style={styles.container} testID="search-input">
      <Image source={APP_ICONS.SEARCH} style={styles.iconSearch} />
      <TextInput
        {...otherProps}
        ref={inputRef}
        placeholder="Search for healthy food"
        placeholderTextColor={COLOR.SECONDARY}
        style={styles.input}
        defaultValue={query}
        onChangeText={debouncedChangeText}
      />
      {query && (
        <Button
          variant="icon"
          width={12}
          onPress={handleClear}
          style={styles.clearButton}
          backgroundColor="transparent"
          testID="clear-button"
        >
          <MaterialIcons name="clear" size={12} color={COLOR.RED} />
        </Button>
      )}
    </View>
  );
};

export default forwardRef(SearchInput);

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    backgroundColor: COLOR.LIGHT_PURPLE,
    borderRadius: 15,
    marginTop: 14,
    marginHorizontal: 16,
    height: 46,
  },
  input: {
    fontSize: 13,
    fontWeight: '400',
    paddingVertical: 14,
    paddingHorizontal: 60,
    color: COLOR.BLACK,
  },
  iconSearch: {
    position: 'absolute',
    left: 21,
    top: '50%',
    transform: [{ translateY: -10 }],
    width: 24,
    height: 24,
  },
  clearButton: {
    position: 'absolute',
    right: 16,
    top: '50%',
    transform: [{ translateY: '-50%' }],
  },
});
