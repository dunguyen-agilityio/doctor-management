import React, { useRef } from 'react'
import { TextInput } from 'react-native'

import { router, useLocalSearchParams } from 'expo-router'

import { SearchInput, YStack } from '@/components'

import HospitalContainer from '@/ui/hospital/hospital-container'

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
          placeholder="Search hospital..."
          value={query}
          onChangeText={handleChangeQuery}
          ref={searchRef}
          tabIndex={0}
          accessibilityHint="Enter a name to filter hospitals"
          aria-label="Search for hospitals by name"
          role="searchbox"
        />
      </YStack>
      <HospitalContainer query={query} />
    </YStack>
  )
}

export default HospitalScreen
