import React, { useRef } from 'react'
import { TextInput } from 'react-native'

import { router, useLocalSearchParams } from 'expo-router'

import { YStack } from '@theme'

import { SearchInput } from '@app/components'
import HospitalContainer from '@app/ui/hospital/hospital-container'

const HospitalScreen = () => {
  const { query = '' } = useLocalSearchParams<{
    query?: string
  }>()

  const searchRef = useRef<TextInput>(null)

  const handleChangeQuery = (value: string) => {
    router.setParams({ query: value, page: 1 })
  }

  return (
    <YStack gap="$md" flex={1}>
      <YStack paddingHorizontal={24} maxHeight={40}>
        <SearchInput
          placeholder="Search doctor..."
          value={query}
          onChangeText={handleChangeQuery}
          ref={searchRef}
        />
      </YStack>
      <HospitalContainer query={query} />
    </YStack>
  )
}

export default HospitalScreen
