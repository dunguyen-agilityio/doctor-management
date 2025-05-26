import React from 'react'
import { FlatListProps } from 'react-native'

import { FlatList } from 'react-native-gesture-handler'

import { Hospital } from '@app/models/hospital'

interface HospitalProps extends FlatListProps<Hospital> {}

const keyExtractor = (item: Hospital) => item.documentId

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
