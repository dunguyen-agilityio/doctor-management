import { Link } from 'expo-router'

import { SPECIALTY_LIST } from '@app/constants/specialty'

import { XStack, YStack } from '@theme/stack'

import SessionHeader from '@app/components/session-header'

import Specialty from './specialty'

const Specialties = () => {
  return (
    <YStack gap={10}>
      <SessionHeader
        title="Categories"
        seeAllWrapper={({ children }) => (
          <Link href={{ pathname: '/doctors/[specialty]', params: { specialty: 'all' } }}>
            {children}
          </Link>
        )}
      />
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
    </YStack>
  )
}

export default Specialties
