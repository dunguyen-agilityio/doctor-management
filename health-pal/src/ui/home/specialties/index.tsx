import { SPECIALTY_LIST } from '@/constants'

import { XStack, YStack } from '@/components'

import Specialty from './specialty'

const Specialties = () => {
  return (
    <YStack gap={16}>
      <XStack justifyContent="space-between">
        {SPECIALTY_LIST.slice(0, 4).map((item) => (
          <Specialty {...item} key={item.value} />
        ))}
      </XStack>
      <XStack justifyContent="space-between">
        {SPECIALTY_LIST.slice(4).map((item) => (
          <Specialty {...item} key={item.value} />
        ))}
      </XStack>
    </YStack>
  )
}

export default Specialties
