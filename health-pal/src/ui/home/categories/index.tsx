import SessionHeader from '@app/components/session-header'

import { Text, View } from 'react-native'

import { SvgProps } from 'react-native-svg'

import { XStack, YStack } from '@theme/stack'

import {
  Cardiologist,
  Dentistry,
  Gastroenterology,
  GeneralMedicine,
  Laboratory,
  Neurology,
  Pulmonology,
  Vaccination,
} from '@icons'

import Category from './category'

type TCategory = {
  icon: (props: SvgProps) => React.JSX.Element
  name: string
  value: string
  color: string
}

const CATEGORIES_LIST: TCategory[] = [
  { name: 'Dentistry', value: 'dentistry', icon: Dentistry, color: '#DC9497' },
  { name: 'Cardiology', value: 'cardiology', icon: Cardiologist, color: '#93C19E' },
  { name: 'Pulmonology', value: 'pulmonology', icon: Pulmonology, color: '#F5AD7E' },
  { name: 'General', value: 'general', icon: GeneralMedicine, color: '#ACA1CD' },
  { name: 'Neurology', value: 'neurology', icon: Neurology, color: '#4D9B91' },
  { name: 'Gastroenterology', value: 'gastroenterology', icon: Gastroenterology, color: '#352261' },
  { name: 'Laboratory', value: 'laboratory', icon: Laboratory, color: '#DEB6B5' },
  { name: 'Vaccination', value: 'vaccination', icon: Vaccination, color: '#89CCDB' },
]

const Categories = () => {
  return (
    <YStack gap={10}>
      <SessionHeader title="Categories" />
      <YStack gap={16}>
        <XStack justifyContent="space-between">
          {CATEGORIES_LIST.slice(0, 4).map((item) => (
            <Category {...item} key={item.value} onPress={() => {}} />
          ))}
        </XStack>
        <XStack justifyContent="space-between">
          {CATEGORIES_LIST.slice(4).map((item) => (
            <Category {...item} key={item.value} onPress={() => {}} />
          ))}
        </XStack>
      </YStack>
    </YStack>
  )
}

export default Categories
