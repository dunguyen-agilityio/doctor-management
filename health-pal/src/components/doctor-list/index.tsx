import { use } from 'react'

import { FlatList } from 'react-native-gesture-handler'

import { XStack } from '@theme'

import { DoctorContext } from '@app/contexts/doctor'
import { Doctor, DoctorData } from '@app/models/doctor'
import { formatDoctor } from '@app/utils/doctor'

import DoctorCard from '../doctor-card'

const ItemSeparatorComponent = () => <XStack height={8} />

const keyExtractor = (item: Doctor) => item.documentId

const renderItem = ({ item }: { item: DoctorData }) => <DoctorCard {...formatDoctor(item)} />

const DoctorList = () => {
  const doctors = use(DoctorContext)

  return (
    <FlatList
      style={{ paddingHorizontal: 24 }}
      data={doctors}
      keyExtractor={keyExtractor}
      ItemSeparatorComponent={ItemSeparatorComponent}
      renderItem={renderItem}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    />
  )
}

export default DoctorList
