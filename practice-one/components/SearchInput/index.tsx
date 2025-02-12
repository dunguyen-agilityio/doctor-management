import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import { COLORS, SearchIcon } from '@constants';

import { FilterState, useFilterStore } from '@stores/filter';

import { debounce } from '@utils/debounce';

interface SearchInputProps extends TextInputProps {
  onChangeQuery?: (query: string) => void;
  getQuery: (state: FilterState) => string;
  onFocus?: () => void;
}

const SearchInput = (
  { getQuery, onChangeQuery, ...rest }: SearchInputProps,
  ref: React.ForwardedRef<Pick<TextInput, 'focus'>>,
) => {
  const query = useFilterStore(getQuery);
  const inputRef = useRef<TextInput>(null);
  const [value, setValue] = useState(query);

  useImperativeHandle(ref, () => ({
    focus: handleFocus,
  }));

  const handleFocus = () => {
    inputRef?.current?.focus();
  };

  const handleChangeText = useCallback(
    (value: string) => {
      setValue(value);
      if (onChangeQuery) debounce(onChangeQuery, 500)(value);
    },
    [onChangeQuery],
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
          value={value}
          {...rest}
        />

        <View style={styles.iconSearch}>
          <SearchIcon />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default forwardRef(SearchInput);

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
