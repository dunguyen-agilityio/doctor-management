import { useCallback } from 'react'

import { debounce } from 'tamagui'

import Search from '@icons/search'

import { Input, InputProps } from '../common'

const SearchInput = ({ onChangeText, value, ...props }: InputProps) => {
  const handleSearch = (value: string) => {
    onChangeText?.(value)
  }

  return (
    <Input
      testID="input"
      variant="outlined"
      leftIcon={Search}
      enterKeyHint="search"
      defaultValue={value}
      keyboardType="web-search"
      returnKeyType="search"
      clearButtonMode="always"
      onChangeText={useCallback(debounce(handleSearch, 500), [])}
      role="searchbox"
      {...props}
    />
  )
}

export default SearchInput
