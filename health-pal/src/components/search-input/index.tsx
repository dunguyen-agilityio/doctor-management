import { memo } from 'react'

import { router, useLocalSearchParams } from 'expo-router'

import { InputProps } from 'tamagui'

import Search from '@icons/search'

import Input from '../input'

const SearchInput = ({ ...props }: InputProps) => {
  const params = useLocalSearchParams()

  const handleSearch = (value: string) => {
    router.setParams({ ...params, query: value })
  }

  return (
    <Input
      leftIcon={Search}
      enterKeyHint="search"
      keyboardType="web-search"
      returnKeyType="search"
      clearButtonMode="always"
      onChangeText={handleSearch}
      {...props}
    />
  )
}

export default memo(SearchInput)
