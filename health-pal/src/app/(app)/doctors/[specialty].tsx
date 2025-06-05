import { useEffect, useRef } from 'react'

import { router, useLocalSearchParams } from 'expo-router'
import { TextInput } from 'react-native-gesture-handler'

import { SearchInput, YStack } from '@app/components'

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

  const searchRef = useRef<TextInput>(null)

  useEffect(() => {
    if (searching === 'true') {
      searchRef.current?.focus()
    }
  }, [searching])

  const handleChangeSpecialty = (values: string[]) => {
    router.setParams({ specialty: values })
  }

  const handleChangeQuery = (value: string) => {
    router.setParams({ query: value })
  }

  return (
    <YStack gap="$md" flex={1}>
      <YStack paddingHorizontal={24} maxHeight={40}>
        <SearchInput
          placeholder="Search doctor..."
          value={query}
          onChangeText={handleChangeQuery}
          ref={searchRef}
          tabIndex={0}
          aria-describedby="Enter a name to filter doctors"
          aria-label="Search for doctors by name"
        />
      </YStack>
      <YStack>
        <MultipleSelectSpecialty values={specialty} onChange={handleChangeSpecialty} />
      </YStack>
      <DoctorContainer query={query} specialty={specialty} />
    </YStack>
  )
}

export default DoctorListScreen
