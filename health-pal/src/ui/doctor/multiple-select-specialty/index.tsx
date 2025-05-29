import { ScrollView } from 'tamagui'

import { SPECIALTY_LIST } from '@app/constants/specialty'

import Chip from '@app/components/chip'

const MultipleSelectSpecialty = ({
  onChange,
  values: defaultValues,
}: {
  onChange: (value: string[]) => void
  values: string[]
}) => {
  const handleSelect = (value: string) => {
    let values = [...defaultValues]

    if (value === 'all') {
      values = ['all']
    } else if (!values.includes(value)) {
      values = values.filter((item) => item !== 'all')
      values.push(value)
    } else {
      values = values.filter((item) => item !== value)
    }

    if (values.length === 0) {
      values = ['all']
    }

    onChange(values)
  }

  return (
    <ScrollView horizontal style={{ flexGrow: 0 }} showsHorizontalScrollIndicator={false}>
      <Chip
        marginLeft={24}
        onSelect={handleSelect}
        value="all"
        active={defaultValues.includes('all')}>
        All
      </Chip>
      {SPECIALTY_LIST.map(({ name, value }, index) => (
        <Chip
          key={value}
          onSelect={handleSelect}
          value={value}
          active={defaultValues.includes(value)}
          marginLeft={8}
          marginRight={index === SPECIALTY_LIST.length - 1 ? 24 : 0}>
          {name}
        </Chip>
      ))}
    </ScrollView>
  )
}

export default MultipleSelectSpecialty
