import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { forwardRef, useImperativeHandle, useRef } from 'react';
import { StyleSheet, TextInput, TextInputProps, View } from 'react-native';

import { COLOR } from '@/constants';

import { debounce } from '@/utils/debounce';

import Button from '../Button';
import { APP_ICONS, Icon } from '../Icon';

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
      <View style={styles.iconSearch}>
        <Icon source={APP_ICONS.SEARCH} />
      </View>
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
  },
  clearButton: {
    position: 'absolute',
    right: 16,
    top: '50%',
    transform: [{ translateY: '-50%' }],
  },
});
