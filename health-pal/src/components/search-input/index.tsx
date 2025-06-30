import Search from '@/icons/search'

import { debounce } from 'tamagui'

import { Input, InputProps } from '../common'

const SearchInput = ({ onChangeText, value, ...props }: InputProps) => {
  const handleSearch = debounce((value: string) => {
    onChangeText?.(value)
  }, 500)

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
      onChangeText={handleSearch}
      role="searchbox"
      {...props}
    />
  )
}

export default SearchInput
