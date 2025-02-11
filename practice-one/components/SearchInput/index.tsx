import { StyleSheet, TextInput, View } from 'react-native';
import React, { useCallback, useRef } from 'react';

import { COLORS } from '@constants';
import { Input } from '@components/common';
import { SearchIcon } from '@constants';

import { useFilterStore } from '@stores/filter';

interface SearchInputProps {
  onFocus?: () => void;
}

const SearchInput = ({ onFocus }: SearchInputProps) => {
  const ref = useRef<TextInput>(null);

  const { query, setFilter } = useFilterStore();

  const handleChangeQuery = useCallback(
    (query: string) => {
      setFilter({ query });
    },
    [setFilter],
  );

  return (
    <View style={styles.container}>
      <Input
        field="search"
        onChangeText={handleChangeQuery}
        value={query}
        placeholder="Search for healthy food"
        ref={ref}
        onFocus={onFocus}
      />

      <View style={styles.iconSearch}>
        <SearchIcon />
      </View>
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    backgroundColor: COLORS.LIGHT_PURPLE,
    borderRadius: 15,
    zIndex: 1,
    marginTop: 14,
    marginHorizontal: 16,
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
