import { InputProps } from 'tamagui'

import Search from '@icons/search'

import Input from '../input'

const SearchInput = ({ ...props }: InputProps) => {
  return (
    <Input
      leftIcon={Search}
      enterKeyHint="search"
      keyboardType="web-search"
      returnKeyType="search"
      clearButtonMode="always"
      {...props}
    />
  )
}

export default SearchInput
