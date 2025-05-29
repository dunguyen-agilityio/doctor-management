import { useEffect, useRef } from 'react'

import { router, useLocalSearchParams } from 'expo-router'
import { TextInput } from 'react-native-gesture-handler'

import { YStack } from '@theme'

import { SearchInput } from '@app/components'
import { FlatListRef } from '@app/components/doctor-list'
import { DoctorContainer, MultipleSelectSpecialty } from '@app/ui/doctor'

const DoctorListScreen = () => {
  const {
    specialty = [],
    query,
    searching,
  } = useLocalSearchParams<{
    specialty: string[]
    query: string
    searching?: string
  }>()

  const flatListRef = useRef<FlatListRef>(null)
  const searchRef = useRef<TextInput>(null)

  useEffect(() => {
    if (searching === 'true') {
      searchRef.current?.focus()
    }
  }, [searching])

  const handleChangeSpecialty = (values: string[]) => {
    router.setParams({ specialty: values, page: 1 })
    flatListRef.current?.scrollTop()
  }

  const handleChangeQuery = (value: string) => {
    router.setParams({ query: value, page: 1 })
    flatListRef.current?.scrollTop()
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
      <YStack>
        <MultipleSelectSpecialty values={specialty} onChange={handleChangeSpecialty} />
      </YStack>
      <DoctorContainer ref={flatListRef} query={query} specialty={specialty} />
    </YStack>
  )
}

export default DoctorListScreen
