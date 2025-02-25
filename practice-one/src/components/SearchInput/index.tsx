import { forwardRef, useImperativeHandle, useRef } from 'react';
import {
  Pressable,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';

import { COLOR } from '@/constants';

import { debounce } from '@/utils/debounce';

import { SearchIcon } from '../icons';

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

  return (
    <Pressable onPress={onPress}>
      <View style={styles.container} testID="search-input">
        <TextInput
          {...otherProps}
          ref={inputRef}
          placeholder="Search for healthy food"
          placeholderTextColor={COLOR.SECONDARY}
          style={styles.input}
          onChangeText={debouncedChangeText}
          value={query}
        />
        <View style={styles.iconSearch}>
          <SearchIcon />
        </View>
      </View>
    </Pressable>
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
  },
});
