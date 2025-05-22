import React from 'react'
import { FlatListProps } from 'react-native'

import { FlatList } from 'react-native-gesture-handler'

import { Clinic } from '@app/models/clinic'

interface HospitalProps extends FlatListProps<Clinic> {}

const keyExtractor = (item: Clinic) => item.documentId

const HospitalList = ({ ...otherProps }: HospitalProps) => {
  return (
    <FlatList
      {...otherProps}
      keyExtractor={keyExtractor}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 16 }}
    />
  )
}

export default HospitalList
