import { router, useLocalSearchParams } from 'expo-router'

import { debounce } from 'tamagui'

import { InputProps } from '@theme'

import Search from '@icons/search'

import Input from '../input'

const SearchInput = ({ ...props }: InputProps) => {
  const params = useLocalSearchParams()

  const handleSearch = (value: string) => {
    router.setParams({ ...params, query: value, page: '1' })
  }

  return (
    <Input
      testID="input"
      variant="outlined"
      leftIcon={Search}
      enterKeyHint="search"
      keyboardType="web-search"
      returnKeyType="search"
      clearButtonMode="always"
      onChangeText={debounce(handleSearch, 500)}
      {...props}
    />
  )
}

export default SearchInput
