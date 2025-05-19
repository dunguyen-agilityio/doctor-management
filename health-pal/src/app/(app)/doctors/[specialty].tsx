import { useCallback } from 'react'

import { router, useLocalSearchParams } from 'expo-router'

import { YStack } from '@theme'

import { SearchInput } from '@app/components'
import DoctorCard from '@app/components/doctor-card'
import DoctorList from '@app/components/doctor-list'
import { DoctorData } from '@app/models/doctor'
import { getDoctors } from '@app/services/doctor'
import MultipleSelectSpecialty from '@app/ui/doctor/multiple-select-specialty'
import { formatDoctor } from '@app/utils/doctor'

const DoctorListScreen = () => {
  const params = useLocalSearchParams<{ specialty: string | string[]; name: string }>()

  const { specialty, name } = params

  const getDoctorsPromise = useCallback(() => {
    const specialties = typeof specialty === 'string' ? [specialty] : specialty

    const filters = specialties
      .filter((item) => item !== 'all')
      .map((value) => ({
        key: `filters[specialty][name][$eqi]`,
        query: value,
      }))

    if (name) {
      filters.push({ key: 'filters[users_permissions_user][username][$containsi]', query: name })
    }

    return getDoctors({
      pagination: { page: 1 },
      filters,
    })
  }, [specialty, name])

  const handleSearch = (value: string) => {
    router.setParams({ ...params, name: value })
  }

  const renderItem = useCallback(
    ({ item }: { item: DoctorData }) => <DoctorCard {...formatDoctor(item)} favorite />,
    [],
  )

  return (
    <YStack gap="$md">
      <YStack paddingHorizontal={24} maxHeight={40}>
        <SearchInput placeholder="Search doctor..." onChangeText={handleSearch} />
      </YStack>
      <MultipleSelectSpecialty />
      <DoctorList
        getDoctors={getDoctorsPromise}
        renderItem={renderItem}
        queryKey={['doctors', ...specialty, name]}
      />
    </YStack>
  )
}

export default DoctorListScreen
