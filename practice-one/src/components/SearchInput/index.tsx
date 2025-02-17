import {
  forwardRef,
  memo,
  useCallback,
  useImperativeHandle,
  useRef,
} from 'react';
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import { COLORS, SearchIcon } from '@/constants';

import { debounce } from '@/utils/debounce';

const SearchInput = (
  { onChangeText, ...otherProps }: TextInputProps,
  ref: React.ForwardedRef<Pick<TextInput, 'focus' | 'clear'>>,
) => {
  const inputRef = useRef<TextInput>(null);

  useImperativeHandle(ref, () => ({
    focus: handleFocus,
    clear: () => {
      inputRef.current?.clear?.();
    },
  }));

  const handleFocus = () => {
    inputRef?.current?.focus();
  };

  const handleChangeText = useCallback(
    (value: string) => {
      onChangeText && debounce(onChangeText, 500)(value);
    },
    [onChangeText],
  );

  return (
    <TouchableWithoutFeedback onPress={handleFocus}>
      <View style={styles.container}>
        <TextInput
          placeholderTextColor={COLORS.SECONDARY}
          onChangeText={handleChangeText}
          style={styles.input}
          ref={inputRef}
          placeholder="Search for healthy food"
          {...otherProps}
          testID="search-input"
        />

        <View style={styles.iconSearch}>
          <SearchIcon />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default memo(forwardRef(SearchInput));

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    backgroundColor: COLORS.LIGHT_PURPLE,
    borderRadius: 15,
    zIndex: 1,
    marginTop: 14,
    marginHorizontal: 16,
  },
  input: {
    fontSize: 13,
    fontWeight: '400',
    paddingVertical: 14,
    paddingHorizontal: 60,
    color: COLORS.BLACK,
  },
  text: {
    fontSize: 13,
    fontWeight: '400',
    color: COLORS.WARNING,
    paddingVertical: 14,
    paddingHorizontal: 60,
  },
  iconSearch: {
    position: 'absolute',
    left: 21,
    top: '50%',
    transform: [{ translateY: -10 }],
  },
});
