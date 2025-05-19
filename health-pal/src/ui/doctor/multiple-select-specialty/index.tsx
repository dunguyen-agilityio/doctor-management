import { router, useLocalSearchParams } from 'expo-router'

import { ScrollView } from 'tamagui'

import { SPECIALTY_LIST } from '@app/constants/specialty'

import Chip from '@app/components/chip'

const MultipleSelectSpecialty = () => {
  const params = useLocalSearchParams<{ specialty: string[] }>()

  if (typeof params.specialty === 'string') {
    params.specialty = [params.specialty]
  }

  const handleSelect = (value: string) => {
    if (value === 'all') {
      params.specialty = ['all']
    } else if (!params.specialty.includes(value)) {
      params.specialty = params.specialty.filter((item) => item !== 'all')
      params.specialty.push(value)
    } else {
      params.specialty = params.specialty.filter((item) => item !== value)
    }

    if (params.specialty.length === 0) {
      params.specialty = ['all']
    }

    router.setParams(params)
  }

  return (
    <ScrollView horizontal style={{ flexGrow: 0 }} showsHorizontalScrollIndicator={false}>
      <Chip
        marginLeft={24}
        onSelect={handleSelect}
        value="all"
        active={params.specialty.includes('all')}>
        All
      </Chip>
      {SPECIALTY_LIST.map(({ name, value }, index) => (
        <Chip
          key={value}
          onSelect={handleSelect}
          value={value}
          active={params.specialty.includes(value)}
          marginLeft={8}
          marginRight={index === SPECIALTY_LIST.length - 1 ? 24 : 0}>
          {name}
        </Chip>
      ))}
    </ScrollView>
  )
}

export default MultipleSelectSpecialty
